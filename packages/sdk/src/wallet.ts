import { ZecknaWallet, initWasm, ensureWasmInitialized } from './wasm-loader';
import { ZcashAddress, AddressType } from './address';
import { createShieldedTransaction, Transaction } from './transaction';
import { SyncServiceClient, BlocksSinceResponse, ShieldedBalanceResponse } from './sync';

export interface WalletState {
  mnemonic: string;
  shieldedAddresses: ZcashAddress[];
  transparentAddresses: ZcashAddress[];
  transactions: Transaction[];
}

export class Wallet {
  private wasmWallet: ZecknaWallet;
  private syncClient: SyncServiceClient;

  constructor() {
    this.wasmWallet = new ZecknaWallet();
    this.syncClient = new SyncServiceClient();
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
   * Export the full viewing key for an account (default 0)
   */
  async exportFullViewingKey(account: number = 0): Promise<string> {
    await initWasm();
    ensureWasmInitialized();
    const key = this.wasmWallet.export_full_viewing_key(account);
    return key;
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
    amount: number | bigint,
    memo?: string
  ): Promise<Transaction> {
    const value = typeof amount === 'bigint' ? Number(amount) : amount;
    return createShieldedTransaction(this.wasmWallet, toAddress, value, memo);
  }

  /**
   * Configure sync service endpoint (for testing / environment overrides)
   */
  setSyncServiceUrl(url: string) {
    this.syncClient = new SyncServiceClient(url);
  }

  /**
   * Fetch shielded balance via sync service using the provided viewing key.
   */
  async fetchShieldedBalance(address: string, viewingKey: string): Promise<ShieldedBalanceResponse> {
    return this.syncClient.getShieldedBalance(address, viewingKey);
  }

  /**
   * Fetch incremental blocks since a given height.
   */
  async fetchBlocksSince(sinceHeight: number, limit?: number): Promise<BlocksSinceResponse> {
    return this.syncClient.getBlocksSince(sinceHeight, limit);
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

