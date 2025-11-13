import {Wallet, AddressType} from '@zeckna/sdk';
import {StorageService, StoredAddress} from './StorageService';

export class WalletService {
  private wallet: Wallet;

  constructor() {
    this.wallet = new Wallet();
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
