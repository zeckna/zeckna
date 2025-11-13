<<<<<<< HEAD
import {Wallet} from '@zeckna/sdk';
import {StorageService} from './StorageService';

export class WalletService {
  private wallet: Wallet;

  constructor() {
    this.wallet = new Wallet();
  }

  /**
   * Initialize a new wallet
   */
  async initializeNew(): Promise<string> {
    const mnemonic = await this.wallet.initializeNew();
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);
    return mnemonic;
  }

  /**
   * Initialize wallet from existing mnemonic
   */
  async initializeFromMnemonic(mnemonic: string): Promise<void> {
    await this.wallet.initializeFromMnemonic(mnemonic);
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);
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
   * Get balance for an address
   */
  async getBalance(address: string): Promise<number> {
    return this.wallet.getBalance(address);
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
   * Generate a new shielded address
   */
  async generateNewShieldedAddress() {
    return this.wallet.generateNewShieldedAddress();
  }
}

// Singleton instance
export const walletService = new WalletService();

=======
import {Wallet} from '@zeckna/sdk';
import {StorageService} from './StorageService';

export class WalletService {
  private wallet: Wallet;

  constructor() {
    this.wallet = new Wallet();
  }

  /**
   * Initialize a new wallet
   */
  async initializeNew(): Promise<string> {
    const mnemonic = await this.wallet.initializeNew();
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);
    return mnemonic;
  }

  /**
   * Initialize wallet from existing mnemonic
   */
  async initializeFromMnemonic(mnemonic: string): Promise<void> {
    await this.wallet.initializeFromMnemonic(mnemonic);
    await StorageService.storeMnemonic(mnemonic);
    await StorageService.setWalletInitialized(true);
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
   * Get balance for an address
   */
  async getBalance(address: string): Promise<number> {
    return this.wallet.getBalance(address);
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
   * Generate a new shielded address
   */
  async generateNewShieldedAddress() {
    return this.wallet.generateNewShieldedAddress();
  }
}

// Singleton instance
export const walletService = new WalletService();

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
