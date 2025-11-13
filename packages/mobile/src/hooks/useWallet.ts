import {useState, useEffect, useCallback} from 'react';
import {walletService} from '../services/WalletService';
import {StorageService, StoredAddress} from '../services/StorageService';

export function useWallet() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [addresses, setAddresses] = useState<StoredAddress[]>([]);
  const [primaryAddress, setPrimaryAddress] = useState<StoredAddress | null>(null);

  const loadAddresses = useCallback(async () => {
    const stored = await walletService.getAddresses();
    setAddresses(stored);
    setPrimaryAddress(stored[0] ?? null);
    if (stored[0]) {
      const bal = await walletService.getBalance(stored[0].address);
      setBalance(bal);
    }
  }, []);

  const checkWalletInitialized = useCallback(async () => {
    try {
      const initialized = await StorageService.isWalletInitialized();
      setIsInitialized(initialized);
      
      if (initialized) {
        const restored = await walletService.restoreWallet();
        if (restored) {
          await loadAddresses();
        }
      }
    } catch (error) {
      console.error('Error checking wallet initialization:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadAddresses]);

  const initializeNew = useCallback(async () => {
    try {
      const mnemonic = await walletService.initializeNew();
      setIsInitialized(true);
      await loadAddresses();
      return mnemonic;
    } catch (error) {
      console.error('Error initializing wallet:', error);
      throw error;
    }
  }, [loadAddresses]);

  const initializeFromMnemonic = useCallback(async (mnemonic: string) => {
    try {
      await walletService.initializeFromMnemonic(mnemonic);
      setIsInitialized(true);
      await loadAddresses();
    } catch (error) {
      console.error('Error initializing from mnemonic:', error);
      throw error;
    }
  }, [loadAddresses]);

  const refreshBalance = useCallback(async (address?: string) => {
    try {
      const bal = await walletService.getBalance(address ?? primaryAddress?.address);
      setBalance(bal);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, [primaryAddress]);

  const generateNewShieldedAddress = useCallback(async () => {
    const addr = await walletService.generateNewShieldedAddress();
    await loadAddresses();
    return addr;
  }, [loadAddresses]);

  useEffect(() => {
    checkWalletInitialized();
  }, [checkWalletInitialized]);

  return {
    isInitialized,
    isLoading,
    balance,
    addresses,
    primaryAddress,
    checkWalletInitialized,
    initializeNew,
    initializeFromMnemonic,
    refreshBalance,
    generateNewShieldedAddress,
    wallet: walletService.getWallet(),
  };
}