<<<<<<< HEAD
import { ZecknaWallet, initWasm, ensureWasmInitialized } from './wasm-loader';
import { generateShieldedAddress, generateTransparentAddress, ZcashAddress, AddressType } from './address';
import { createShieldedTransaction, Transaction } from './transaction';

export interface WalletState {
  mnemonic: string;
  shieldedAddresses: ZcashAddress[];
  transparentAddresses: ZcashAddress[];
  transactions: Transaction[];
}

export class Wallet {
  private wasmWallet: ZecknaWallet;

  constructor() {
    this.wasmWallet = new ZecknaWallet();
  }

  /**
   * Initialize wallet with a new seed phrase
   */
  async initializeNew(): Promise<string> {
    await initWasm();
    ensureWasmInitialized();
    return this.wasmWallet.initialize_new();
  }

  /**
   * Initialize wallet from existing mnemonic
   */
  async initializeFromMnemonic(mnemonic: string): Promise<void> {
    await initWasm();
    ensureWasmInitialized();
    await this.wasmWallet.initialize_from_mnemonic(mnemonic);
  }

  /**
   * Generate a new shielded address
   */
  async generateNewShieldedAddress(): Promise<ZcashAddress> {
    await initWasm();
    ensureWasmInitialized();
    const addr = this.wasmWallet.generate_new_shielded_address();
    return {
      address: addr.address,
      addressType: AddressType.Shielded,
      account: addr.account,
    };
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<number> {
    await initWasm();
    ensureWasmInitialized();
    return this.wasmWallet.get_balance(address);
  }

  /**
   * Create a shielded transaction
   */
  async createShieldedTransaction(
    toAddress: string,
    amount: number,
    memo?: string
  ): Promise<Transaction> {
    return createShieldedTransaction(this.wasmWallet, toAddress, amount, memo);
  }

  /**
   * Get wallet state (simplified - in production would sync with blockchain)
   */
  async getState(): Promise<WalletState> {
    // This is a placeholder - in production, this would sync with lightwalletd
    return {
      mnemonic: '', // Never expose mnemonic in production
      shieldedAddresses: [],
      transparentAddresses: [],
      transactions: [],
    };
  }
}

=======
import { ZecknaWallet, initWasm, ensureWasmInitialized } from './wasm-loader';
import { generateShieldedAddress, generateTransparentAddress, ZcashAddress } from './address';
import { createShieldedTransaction, Transaction } from './transaction';

export interface WalletState {
  mnemonic: string;
  shieldedAddresses: ZcashAddress[];
  transparentAddresses: ZcashAddress[];
  transactions: Transaction[];
}

export class Wallet {
  private wasmWallet: ZecknaWallet;

  constructor() {
    this.wasmWallet = new ZecknaWallet();
  }

  /**
   * Initialize wallet with a new seed phrase
   */
  async initializeNew(): Promise<string> {
    await initWasm();
    ensureWasmInitialized();
    return this.wasmWallet.initialize_new();
  }

  /**
   * Initialize wallet from existing mnemonic
   */
  async initializeFromMnemonic(mnemonic: string): Promise<void> {
    await initWasm();
    ensureWasmInitialized();
    await this.wasmWallet.initialize_from_mnemonic(mnemonic);
  }

  /**
   * Generate a new shielded address
   */
  async generateNewShieldedAddress(): Promise<ZcashAddress> {
    await initWasm();
    ensureWasmInitialized();
    const addr = this.wasmWallet.generate_new_shielded_address();
    return {
      address: addr.address,
      addressType: addr.address_type === 'Shielded' ? 'shielded' : 'transparent',
      account: addr.account,
    };
  }

  /**
   * Get balance for an address
   */
  async getBalance(address: string): Promise<number> {
    await initWasm();
    ensureWasmInitialized();
    return this.wasmWallet.get_balance(address);
  }

  /**
   * Create a shielded transaction
   */
  async createShieldedTransaction(
    toAddress: string,
    amount: number,
    memo?: string
  ): Promise<Transaction> {
    return createShieldedTransaction(this.wasmWallet, toAddress, amount, memo);
  }

  /**
   * Get wallet state (simplified - in production would sync with blockchain)
   */
  async getState(): Promise<WalletState> {
    // This is a placeholder - in production, this would sync with lightwalletd
    return {
      mnemonic: '', // Never expose mnemonic in production
      shieldedAddresses: [],
      transparentAddresses: [],
      transactions: [],
    };
  }
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
