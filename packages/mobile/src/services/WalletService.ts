import {Wallet, AddressType, SyncServiceClient} from '@zeckna/sdk';
import {StorageService, StoredAddress} from './StorageService';
import {SYNC_SERVICE_URL} from '../config';

export class WalletService {
  private wallet: Wallet;
  private syncClient: SyncServiceClient;

  constructor() {
    this.wallet = new Wallet();
    this.syncClient = new SyncServiceClient(SYNC_SERVICE_URL);
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

  async syncShieldedBalance(): Promise<number> {
    const viewingKey = await StorageService.getViewingKey();
    const primary = await this.getPrimaryAddress();

    if (!viewingKey || !primary) {
      throw new Error('Wallet not initialized for sync');
    }

    const result = await this.syncClient.getShieldedBalance(primary.address, viewingKey);
    if (result.latestHeight) {
      await StorageService.storeLastSyncHeight(result.latestHeight);
    }
    return result.balance.valueZat;
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
}

// Singleton instance
export const walletService = new WalletService();
