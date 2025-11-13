import nock from 'nock';
import { SyncServiceClient } from '../sync';

const BASE_URL = 'http://sync.test';

describe('SyncServiceClient', () => {
  const client = new SyncServiceClient(BASE_URL);

  afterEach(() => {
    nock.cleanAll();
  });

  it('fetches latest block', async () => {
    nock(BASE_URL).get('/v1/lightwalletd/latest-block').reply(200, {
      height: 123,
      hash: 'abc123'
    });

    const block = await client.getLatestBlock();
    expect(block).toEqual({ height: 123, hash: 'abc123' });
  });

  it('fetches shielded balance', async () => {
    nock(BASE_URL)
      .post('/v1/lightwalletd/balance', { address: 'zs1...', viewingKey: 'vk1' })
      .reply(200, {
        address: 'zs1...',
        balance: { valueZat: 42 },
        latestHeight: 123
      });

    const balance = await client.getShieldedBalance('zs1...', 'vk1');
    expect(balance.balance.valueZat).toBe(42);
    expect(balance.latestHeight).toBe(123);
  });

  it('fetches block summaries', async () => {
    nock(BASE_URL)
      .post('/v1/lightwalletd/blocks', { startHeight: 100, endHeight: 101 })
      .reply(200, {
        startHeight: 100,
        endHeight: 101,
        blocks: [{ height: 100, hash: 'hash', transactions: 3 }]
      });

    const summary = await client.getBlockSummaries(100, 101);
    expect(summary.blocks.length).toBe(1);
  });
});

