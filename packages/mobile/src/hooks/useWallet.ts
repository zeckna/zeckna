<<<<<<< HEAD
import {useState, useEffect, useCallback} from 'react';
import {walletService} from '../services/WalletService';
import {StorageService} from '../services/StorageService';

export function useWallet() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [addresses, setAddresses] = useState<any[]>([]);

  const checkWalletInitialized = useCallback(async () => {
    try {
      const initialized = await StorageService.isWalletInitialized();
      setIsInitialized(initialized);
      
      if (initialized) {
        const restored = await walletService.restoreWallet();
        if (restored) {
          const storedAddresses = await StorageService.getAddresses();
          setAddresses(storedAddresses);
          
          // Get balance for first address if available
          if (storedAddresses.length > 0) {
            const bal = await walletService.getBalance(storedAddresses[0].address);
            setBalance(bal);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet initialization:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initializeNew = useCallback(async () => {
    try {
      const mnemonic = await walletService.initializeNew();
      setIsInitialized(true);
      return mnemonic;
    } catch (error) {
      console.error('Error initializing wallet:', error);
      throw error;
    }
  }, []);

  const initializeFromMnemonic = useCallback(async (mnemonic: string) => {
    try {
      await walletService.initializeFromMnemonic(mnemonic);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing from mnemonic:', error);
      throw error;
    }
  }, []);

  const refreshBalance = useCallback(async (address: string) => {
    try {
      const bal = await walletService.getBalance(address);
      setBalance(bal);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, []);

  useEffect(() => {
    checkWalletInitialized();
  }, [checkWalletInitialized]);

  return {
    isInitialized,
    isLoading,
    balance,
    addresses,
    checkWalletInitialized,
    initializeNew,
    initializeFromMnemonic,
    refreshBalance,
    wallet: walletService.getWallet(),
  };
}

=======
import {useState, useEffect, useCallback} from 'react';
import {walletService} from '../services/WalletService';
import {StorageService} from '../services/StorageService';

export function useWallet() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [addresses, setAddresses] = useState<any[]>([]);

  const checkWalletInitialized = useCallback(async () => {
    try {
      const initialized = await StorageService.isWalletInitialized();
      setIsInitialized(initialized);
      
      if (initialized) {
        const restored = await walletService.restoreWallet();
        if (restored) {
          const storedAddresses = await StorageService.getAddresses();
          setAddresses(storedAddresses);
          
          // Get balance for first address if available
          if (storedAddresses.length > 0) {
            const bal = await walletService.getBalance(storedAddresses[0].address);
            setBalance(bal);
          }
        }
      }
    } catch (error) {
      console.error('Error checking wallet initialization:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const initializeNew = useCallback(async () => {
    try {
      const mnemonic = await walletService.initializeNew();
      setIsInitialized(true);
      return mnemonic;
    } catch (error) {
      console.error('Error initializing wallet:', error);
      throw error;
    }
  }, []);

  const initializeFromMnemonic = useCallback(async (mnemonic: string) => {
    try {
      await walletService.initializeFromMnemonic(mnemonic);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing from mnemonic:', error);
      throw error;
    }
  }, []);

  const refreshBalance = useCallback(async (address: string) => {
    try {
      const bal = await walletService.getBalance(address);
      setBalance(bal);
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, []);

  useEffect(() => {
    checkWalletInitialized();
  }, [checkWalletInitialized]);

  return {
    isInitialized,
    isLoading,
    balance,
    addresses,
    checkWalletInitialized,
    initializeNew,
    initializeFromMnemonic,
    refreshBalance,
    wallet: walletService.getWallet(),
  };
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
