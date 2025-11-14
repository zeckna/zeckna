import {
  Wallet,
  AddressType,
  BlocksSinceResponse,
  ShieldedBalanceResponse,
} from '@zeckna/sdk';
import {StorageService, StoredAddress, SyncedBlockSummary} from './StorageService';
import {SYNC_SERVICE_URL} from '../config';

export class WalletService {
  private wallet: Wallet;
  private latestSyncHeight: number;
  private lastBalance: number;

  constructor() {
    this.wallet = new Wallet();
    this.wallet.setSyncServiceUrl(SYNC_SERVICE_URL);
    this.latestSyncHeight = 0;
    this.lastBalance = 0;
  }

  private toStoredAddress(address: {
    address: string;
    addressType: AddressType;
    account: number;
  }, label?: string): StoredAddress {
    return {
      address: address.address,
      addressType: address.addressType,
      account: address.account,
      label,
      createdAt: new Date().toISOString(),
    };
  }

  private async persistAddress(address: StoredAddress): Promise<void> {
    const existing = await StorageService.getAddresses();
    const updated = [address, ...existing.filter(item => item.address !== address.address)];
    await StorageService.storeAddresses(updated);
  }

  /**
   * Initialize a new wallet
   */
  async initializeNew(): Promise<string> {
    const mnemonic = await this.wallet.initializeNew();
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);

    const primaryShielded = await this.wallet.generateNewShieldedAddress();
    await this.persistAddress(this.toStoredAddress(primaryShielded, 'Primary Shielded'));

    const fvk = await this.wallet.exportFullViewingKey(0);
    await StorageService.storeViewingKey(fvk);
    await StorageService.storeLastSyncStatus('idle', new Date().toISOString());

    return mnemonic;
  }

  /**
   * Initialize wallet from existing mnemonic
   */
  async initializeFromMnemonic(mnemonic: string): Promise<void> {
    await this.wallet.initializeFromMnemonic(mnemonic);
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);

    const storedAddresses = await StorageService.getAddresses();
    if (storedAddresses.length === 0) {
      const shielded = await this.wallet.generateNewShieldedAddress();
      await this.persistAddress(this.toStoredAddress(shielded, 'Primary Shielded'));
    }

    const fvk = await this.wallet.exportFullViewingKey(0);
    await StorageService.storeViewingKey(fvk);
    await StorageService.storeLastSyncStatus('idle', new Date().toISOString());
  }

  /**
   * Restore wallet from storage
   */
  async restoreWallet(): Promise<boolean> {
    const mnemonic = await StorageService.getMnemonic();
    if (!mnemonic) {
      return false;
    }

    try {
      await this.wallet.initializeFromMnemonic(mnemonic);

      const storedAddresses = await StorageService.getAddresses();
      if (storedAddresses.length === 0) {
        const shielded = await this.wallet.generateNewShieldedAddress();
        await this.persistAddress(this.toStoredAddress(shielded, 'Primary Shielded'));
      }

      const fvk = await this.wallet.exportFullViewingKey(0);
      await StorageService.storeViewingKey(fvk);
      await StorageService.storeLastSyncStatus('idle', new Date().toISOString());

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get wallet instance
   */
  getWallet(): Wallet {
    return this.wallet;
  }

  /**
   * Get balance for an address (defaults to primary shielded)
   */
  async getBalance(address?: string): Promise<number> {
    const target = address ?? (await this.getPrimaryAddress())?.address;
    if (!target) {
      return 0;
    }
    return this.wallet.getBalance(target);
  }

  private async fetchBalance(viewingKey: string, primary: StoredAddress): Promise<ShieldedBalanceResponse> {
    return this.wallet.fetchShieldedBalance(primary.address, viewingKey);
  }

  private async fetchIncrementalBlocks(startHeight: number): Promise<BlocksSinceResponse> {
    return this.wallet.fetchBlocksSince(startHeight, 100);
  }

  private async storeSyncedBlocks(blocks: BlocksSinceResponse): Promise<void> {
    if (!blocks.blocks.length) {
      return;
    }

    const syncedAt = new Date().toISOString();
    const summaries: SyncedBlockSummary[] = blocks.blocks.map((block) => ({
      height: Number(block.height),
      hash: block.hash,
      time: typeof block.time === 'number' ? block.time : undefined,
      transactions: block.transactions,
      syncedAt,
    }));

    await StorageService.appendSyncedBlocks(summaries);
  }

  async syncShieldedBalance(): Promise<number> {
    const viewingKey = await StorageService.getViewingKey();
    const primary = await this.getPrimaryAddress();

    if (!viewingKey || !primary) {
      throw new Error('Wallet not initialized for sync');
    }

    await StorageService.storeLastSyncStatus('syncing', new Date().toISOString());

    try {
      const lastHeight = (await StorageService.getLastSyncHeight()) ?? 0;
      const [balance, blocks] = await Promise.all([
        this.fetchBalance(viewingKey, primary),
        this.fetchIncrementalBlocks(lastHeight),
      ]);

      if (blocks.latestHeight) {
        await StorageService.storeLastSyncHeight(blocks.latestHeight);
        this.latestSyncHeight = blocks.latestHeight;
      }

      await this.storeSyncedBlocks(blocks);
      await StorageService.storeLastSyncStatus('idle', new Date().toISOString());
      this.lastBalance = balance.balance.valueZat;

      return balance.balance.valueZat;
    } catch (error) {
      await StorageService.storeLastSyncStatus('error', new Date().toISOString());
      throw error;
    }
  }

  /**
   * Create a shielded transaction
   */
  async createShieldedTransaction(
    toAddress: string,
    amount: number,
    memo?: string
  ) {
    return this.wallet.createShieldedTransaction(toAddress, amount, memo);
  }

  /**
   * Generate and persist a new shielded address
   */
  async generateNewShieldedAddress(label?: string): Promise<StoredAddress> {
    const addr = await this.wallet.generateNewShieldedAddress();
    const stored = this.toStoredAddress(addr, label);
    await this.persistAddress(stored);
    return stored;
  }

  async getAddresses(): Promise<StoredAddress[]> {
    return StorageService.getAddresses();
  }

  async getPrimaryAddress(): Promise<StoredAddress | undefined> {
    const stored = await this.getAddresses();
    return stored[0];
  }

  async getTransactions(): Promise<SyncedBlockSummary[]> {
    return StorageService.getSyncedBlocks();
  }

  async getLastSyncInfo(): Promise<{
    lastHeight: number;
    lastBalance: number;
    status: 'idle' | 'syncing' | 'error';
    updatedAt: string;
  }> {
    const storedHeight = await StorageService.getLastSyncHeight();
    const status = (await StorageService.getLastSyncStatus()) ?? {
      status: 'idle' as const,
      timestamp: new Date(0).toISOString(),
    };

    return {
      lastHeight: this.latestSyncHeight || storedHeight || 0,
      lastBalance: this.lastBalance,
      status: status.status,
      updatedAt: status.timestamp,
    };
  }
}

// Singleton instance
export const walletService = new WalletService();
