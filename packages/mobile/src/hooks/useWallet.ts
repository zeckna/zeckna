import {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {walletService} from '../services/WalletService';
import {StorageService, StoredAddress, SyncedBlockSummary} from '../services/StorageService';

const SYNC_INTERVAL_MS = 60 * 1000;

interface SyncState {
  status: 'idle' | 'syncing' | 'error';
  updatedAt: string;
  latestHeight: number;
}

interface SyncOptions {
  force?: boolean;
  errorMessage?: string;
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
  const [transactions, setTransactions] = useState<SyncedBlockSummary[]>([]);
  const addressesRef = useRef<StoredAddress[]>([]);
  const isSyncingRef = useRef(false);

  const refreshTransactions = useCallback(async () => {
    const history = await walletService.getTransactions();
    setTransactions(history);
  }, []);

  const updateSyncInfo = useCallback(async () => {
    const info = await walletService.getLastSyncInfo();
    setSyncState({
      status: info.status,
      updatedAt: info.updatedAt,
      latestHeight: info.lastHeight,
    });
    setSyncError((prev) =>
      info.status === 'error' ? prev ?? 'Failed to sync with network' : null
    );
  }, []);

  const runSync = useCallback(
    async (options: SyncOptions = {}) => {
      const {force = false, errorMessage} = options;
      const hasPrimaryAddress = addressesRef.current.length > 0;

      if (isSyncingRef.current) {
        return;
      }

      if (!force && (!isInitialized || !hasPrimaryAddress)) {
        return;
      }

      isSyncingRef.current = true;
      setSyncState((prev) => ({
        ...prev,
        status: 'syncing',
        updatedAt: new Date().toISOString(),
      }));

      try {
        const bal = await walletService.syncShieldedBalance();
        setBalance(bal);
        setSyncError(null);
      } catch (error) {
        console.error('Error syncing balance:', error);
        setSyncError(errorMessage ?? 'Unable to sync with network');
      } finally {
        await updateSyncInfo();
        await refreshTransactions();
        isSyncingRef.current = false;
      }
    },
    [isInitialized, updateSyncInfo, refreshTransactions]
  );

  const loadAddresses = useCallback(async () => {
    const stored = await walletService.getAddresses();
    addressesRef.current = stored;
    setAddresses(stored);
    setPrimaryAddress(stored[0] ?? null);

    if (stored[0]) {
      await runSync({force: true, errorMessage: 'Unable to fetch shielded balance'});
    } else {
      await updateSyncInfo();
      setTransactions([]);
    }
  }, [runSync, updateSyncInfo]);

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
    await runSync({force: true, errorMessage: 'Unable to refresh balance'});
  }, [runSync]);

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
    refreshTransactions();
  }, [updateSyncInfo, refreshTransactions]);

  useEffect(() => {
    if (!isInitialized || addressesRef.current.length === 0) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const clearTimer = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      intervalId = setInterval(() => {
        runSync();
      }, SYNC_INTERVAL_MS);
    };

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        runSync();
        startTimer();
      } else {
        clearTimer();
      }
    };

    if (AppState.currentState === 'active') {
      runSync();
      startTimer();
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      clearTimer();
      subscription.remove();
    };
  }, [isInitialized, runSync, addresses.length]);

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
    transactions,
    checkWalletInitialized,
    initializeNew,
    initializeFromMnemonic,
    refreshBalance,
    generateNewShieldedAddress,
    wallet: walletService.getWallet(),
  };
}