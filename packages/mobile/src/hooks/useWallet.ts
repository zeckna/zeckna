import {useState, useEffect, useCallback, useMemo} from 'react';
import {walletService} from '../services/WalletService';
import {StorageService, StoredAddress} from '../services/StorageService';

interface SyncState {
  status: 'idle' | 'syncing' | 'error';
  updatedAt: string;
  latestHeight: number;
}

export function useWallet() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [addresses, setAddresses] = useState<StoredAddress[]>([]);
  const [primaryAddress, setPrimaryAddress] = useState<StoredAddress | null>(null);
  const [syncState, setSyncState] = useState<SyncState>({
    status: 'idle',
    updatedAt: new Date(0).toISOString(),
    latestHeight: 0,
  });
  const [syncError, setSyncError] = useState<string | null>(null);

  const updateSyncInfo = useCallback(async () => {
    const info = await walletService.getLastSyncInfo();
    setSyncState({
      status: info.status,
      updatedAt: info.updatedAt,
      latestHeight: info.lastHeight,
    });
    if (info.status === 'error') {
      setSyncError('Failed to sync with network');
    } else {
      setSyncError(null);
    }
  }, []);

  const loadAddresses = useCallback(async () => {
    const stored = await walletService.getAddresses();
    setAddresses(stored);
    setPrimaryAddress(stored[0] ?? null);

    if (stored[0]) {
      try {
        const bal = await walletService.syncShieldedBalance();
        setBalance(bal);
      } catch (error) {
        console.error('Error syncing balance:', error);
        setSyncError('Unable to fetch shielded balance');
        await StorageService.storeLastSyncStatus('error', new Date().toISOString());
      } finally {
        await updateSyncInfo();
      }
    }
  }, [updateSyncInfo]);

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

  const refreshBalance = useCallback(async () => {
    try {
      const bal = await walletService.syncShieldedBalance();
      setBalance(bal);
      setSyncError(null);
    } catch (error) {
      console.error('Error refreshing balance:', error);
      setSyncError('Unable to refresh balance');
      await StorageService.storeLastSyncStatus('error', new Date().toISOString());
    } finally {
      await updateSyncInfo();
    }
  }, [updateSyncInfo]);

  const generateNewShieldedAddress = useCallback(async () => {
    const addr = await walletService.generateNewShieldedAddress();
    await loadAddresses();
    return addr;
  }, [loadAddresses]);

  useEffect(() => {
    checkWalletInitialized();
  }, [checkWalletInitialized]);

  useEffect(() => {
    updateSyncInfo();
  }, [updateSyncInfo]);

  const hasSyncIssue = useMemo(() => syncState.status === 'error' || !!syncError, [
    syncState.status,
    syncError,
  ]);

  return {
    isInitialized,
    isLoading,
    balance,
    addresses,
    primaryAddress,
    syncState,
    syncError,
    hasSyncIssue,
    checkWalletInitialized,
    initializeNew,
    initializeFromMnemonic,
    refreshBalance,
    generateNewShieldedAddress,
    wallet: walletService.getWallet(),
  };
}