import EncryptedStorage from 'react-native-encrypted-storage';
import * as Keychain from 'react-native-keychain';
import {AddressType} from '@zeckna/sdk';

const WALLET_INITIALIZED_KEY = 'wallet_initialized';
const WALLET_ADDRESSES_KEY = 'wallet_addresses';
const VIEWING_KEY_KEY = 'wallet_viewing_key';
const LAST_SYNC_HEIGHT_KEY = 'wallet_last_sync_height';
const LAST_SYNC_STATUS_KEY = 'wallet_last_sync_status';
const SYNCED_BLOCKS_KEY = 'wallet_synced_blocks';

export interface StoredAddress {
  address: string;
  addressType: AddressType;
  account: number;
  label?: string;
  createdAt: string;
}

export interface SyncedBlockSummary {
  height: number;
  hash: string;
  time?: number;
  transactions: number;
  syncedAt: string;
}

export class StorageService {
  /**
   * Store wallet initialization status
   */
  static async setWalletInitialized(initialized: boolean): Promise<void> {
    await EncryptedStorage.setItem(WALLET_INITIALIZED_KEY, JSON.stringify(initialized));
  }

  /**
   * Check if wallet is initialized
   */
  static async isWalletInitialized(): Promise<boolean> {
    try {
      const value = await EncryptedStorage.getItem(WALLET_INITIALIZED_KEY);
      return value ? JSON.parse(value) : false;
    } catch {
      return false;
    }
  }

  /**
   * Store mnemonic securely in keychain
   */
  static async storeMnemonic(mnemonic: string): Promise<void> {
    await Keychain.setGenericPassword('zeckna_mnemonic', mnemonic, {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  }

  /**
   * Retrieve mnemonic from keychain
   */
  static async getMnemonic(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword();
      return credentials ? credentials.password : null;
    } catch {
      return null;
    }
  }

  /**
   * Clear mnemonic from keychain
   */
  static async clearMnemonic(): Promise<void> {
    await Keychain.resetGenericPassword();
  }

  static async storeViewingKey(viewingKey: string): Promise<void> {
    await EncryptedStorage.setItem(VIEWING_KEY_KEY, viewingKey);
  }

  static async getViewingKey(): Promise<string | null> {
    try {
      return await EncryptedStorage.getItem(VIEWING_KEY_KEY);
    } catch {
      return null;
    }
  }

  static async storeLastSyncHeight(height: number): Promise<void> {
    await EncryptedStorage.setItem(LAST_SYNC_HEIGHT_KEY, JSON.stringify(height));
  }

  static async getLastSyncHeight(): Promise<number | null> {
    try {
      const value = await EncryptedStorage.getItem(LAST_SYNC_HEIGHT_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  /**
   * Store wallet addresses
   */
  static async storeAddresses(addresses: StoredAddress[]): Promise<void> {
    await EncryptedStorage.setItem(WALLET_ADDRESSES_KEY, JSON.stringify(addresses));
  }

  /**
   * Get stored wallet addresses
   */
  static async getAddresses(): Promise<StoredAddress[]> {
    try {
      const value = await EncryptedStorage.getItem(WALLET_ADDRESSES_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  }

  static async storeLastSyncStatus(status: 'idle' | 'syncing' | 'error', timestamp: string): Promise<void> {
    await EncryptedStorage.setItem(
      LAST_SYNC_STATUS_KEY,
      JSON.stringify({ status, timestamp })
    );
  }

  static async getLastSyncStatus(): Promise<{ status: 'idle' | 'syncing' | 'error'; timestamp: string } | null> {
    try {
      const value = await EncryptedStorage.getItem(LAST_SYNC_STATUS_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  static async appendSyncedBlocks(blocks: SyncedBlockSummary[], maxEntries: number = 200): Promise<void> {
    if (blocks.length === 0) {
      return;
    }

    const existing = await this.getSyncedBlocks();
    const merged = new Map<number, SyncedBlockSummary>();

    [...blocks, ...existing].forEach((block) => {
      merged.set(block.height, block);
    });

    const sorted = Array.from(merged.values())
      .sort((a, b) => b.height - a.height)
      .slice(0, maxEntries);

    await EncryptedStorage.setItem(SYNCED_BLOCKS_KEY, JSON.stringify(sorted));
  }

  static async getSyncedBlocks(): Promise<SyncedBlockSummary[]> {
    try {
      const value = await EncryptedStorage.getItem(SYNCED_BLOCKS_KEY);
      return value ? JSON.parse(value) : [];
    } catch {
      return [];
    }
  }

  /**
   * Clear all wallet data
   */
  static async clearAll(): Promise<void> {
    await EncryptedStorage.clear();
    await this.clearMnemonic();
  }
}