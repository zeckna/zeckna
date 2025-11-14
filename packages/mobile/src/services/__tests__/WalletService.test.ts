import {walletService} from '../WalletService';
import {StorageService} from '../StorageService';

let mockFetchShieldedBalance = jest.fn();
let mockFetchBlocksSince = jest.fn();

jest.mock('@zeckna/sdk', () => ({
  AddressType: {Shielded: 'shielded', Transparent: 'transparent'},
  Wallet: jest.fn().mockImplementation(() => ({
    initializeNew: jest.fn(),
    initializeFromMnemonic: jest.fn(),
    generateNewShieldedAddress: jest.fn().mockResolvedValue({
      address: 'zs1primary',
      addressType: 'shielded',
      account: 0,
    }),
    exportFullViewingKey: jest.fn().mockResolvedValue('vk1'),
    setSyncServiceUrl: jest.fn(),
    fetchShieldedBalance: (...args: unknown[]) =>
      mockFetchShieldedBalance(...(args as [string, string])),
    fetchBlocksSince: (...args: unknown[]) =>
      mockFetchBlocksSince(...(args as [number, number | undefined])),
    getBalance: jest.fn().mockResolvedValue(0),
  })),
  SyncServiceClient: jest.fn().mockImplementation(() => ({
    getShieldedBalance: jest.fn(),
    getBlocksSince: jest.fn(),
  })),
}));

describe('WalletService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchShieldedBalance = jest.fn();
    mockFetchBlocksSince = jest.fn();
  });

  it('syncs shielded balance and stores sync metadata', async () => {
    mockFetchShieldedBalance.mockResolvedValue({
      address: 'zs1primary',
      balance: {valueZat: 123, verifiedValueZat: 100},
      latestHeight: 250,
    });
    mockFetchBlocksSince.mockResolvedValue({
      startHeight: 201,
      endHeight: 250,
      latestHeight: 250,
      limit: 100,
      blocks: [],
    });

    jest.spyOn(StorageService, 'getViewingKey').mockResolvedValue('vk1');
    jest.spyOn(StorageService, 'getAddresses').mockResolvedValue([
      {
        address: 'zs1primary',
        addressType: 'shielded',
        account: 0,
        label: 'Primary Shielded',
        createdAt: new Date().toISOString(),
      },
    ]);
    jest.spyOn(StorageService, 'getLastSyncHeight').mockResolvedValue(200);
    const statusSpy = jest
      .spyOn(StorageService, 'storeLastSyncStatus')
      .mockResolvedValue();
    const heightSpy = jest
      .spyOn(StorageService, 'storeLastSyncHeight')
      .mockResolvedValue();

    const balance = await walletService.syncShieldedBalance();

    expect(balance).toBe(123);
    expect(statusSpy).toHaveBeenNthCalledWith(
      1,
      'syncing',
      expect.any(String),
    );
    expect(heightSpy).toHaveBeenCalledWith(250);
    expect(statusSpy).toHaveBeenLastCalledWith('idle', expect.any(String));
  });

  it('marks sync status as error when balance fetch fails', async () => {
    mockFetchShieldedBalance.mockRejectedValue(new Error('network down'));
    mockFetchBlocksSince.mockResolvedValue({
      startHeight: 1,
      endHeight: 0,
      latestHeight: 0,
      limit: 100,
      blocks: [],
    });

    jest.spyOn(StorageService, 'getViewingKey').mockResolvedValue('vk1');
    jest.spyOn(StorageService, 'getAddresses').mockResolvedValue([
      {
        address: 'zs1primary',
        addressType: 'shielded',
        account: 0,
        label: 'Primary Shielded',
        createdAt: new Date().toISOString(),
      },
    ]);
    jest.spyOn(StorageService, 'getLastSyncHeight').mockResolvedValue(0);
    const statusSpy = jest
      .spyOn(StorageService, 'storeLastSyncStatus')
      .mockResolvedValue();

    await expect(walletService.syncShieldedBalance()).rejects.toThrow(
      'network down',
    );
    expect(statusSpy).toHaveBeenNthCalledWith(
      1,
      'syncing',
      expect.any(String),
    );
    expect(statusSpy).toHaveBeenLastCalledWith('error', expect.any(String));
  });
});

