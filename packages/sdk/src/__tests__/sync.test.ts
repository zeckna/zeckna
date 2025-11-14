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

  it('fetches incremental blocks since a height', async () => {
    nock(BASE_URL)
      .post('/v1/lightwalletd/blocks/since', { sinceHeight: 150, limit: 25 })
      .reply(200, {
        startHeight: 151,
        endHeight: 175,
        latestHeight: 300,
        limit: 25,
        blocks: [
          { height: 151, hash: 'hash151', transactions: 2 },
          { height: 152, hash: 'hash152', transactions: 0 }
        ]
      });

    const result = await client.getBlocksSince(150, 25);
    expect(result.startHeight).toBe(151);
    expect(result.endHeight).toBe(175);
    expect(result.latestHeight).toBe(300);
    expect(result.blocks).toHaveLength(2);
  });

  it('passes through limit when omitted', async () => {
    nock(BASE_URL)
      .post('/v1/lightwalletd/blocks/since', { sinceHeight: 0 })
      .reply(200, { startHeight: 1, endHeight: 0, latestHeight: 0, limit: 100, blocks: [] });

    const result = await client.getBlocksSince(0);
    expect(result.blocks).toHaveLength(0);
  });

  it('validates sinceHeight input', async () => {
    await expect(client.getBlocksSince(-1)).rejects.toThrow('sinceHeight must be a non-negative number');
  });
});

