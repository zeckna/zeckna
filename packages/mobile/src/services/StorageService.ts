import EncryptedStorage from 'react-native-encrypted-storage';
import * as Keychain from 'react-native-keychain';
import {AddressType} from '@zeckna/sdk';

const WALLET_INITIALIZED_KEY = 'wallet_initialized';
const WALLET_ADDRESSES_KEY = 'wallet_addresses';
const VIEWING_KEY_KEY = 'wallet_viewing_key';
const LAST_SYNC_HEIGHT_KEY = 'wallet_last_sync_height';

export interface StoredAddress {
  address: string;
  addressType: AddressType;
  account: number;
  label?: string;
  createdAt: string;
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

  /**
   * Clear all wallet data
   */
  static async clearAll(): Promise<void> {
    await EncryptedStorage.clear();
    await this.clearMnemonic();
  }
}