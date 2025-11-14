import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import type { AddressInfo } from 'node:net';
import { createLightwalletdRouter } from '../routes.js';
import type { LightwalletdClientInterface, CompactBlock } from '../lightwalletd.js';

type BlocksSinceResult = Awaited<ReturnType<LightwalletdClientInterface['getBlocksSince']>>;

function createApp(client: LightwalletdClientInterface) {
  const app = express();
  app.use(express.json());
  app.use(createLightwalletdRouter(client));
  return app;
}

function defaultBlocksSinceResult(): BlocksSinceResult {
  return {
    startHeight: 1,
    endHeight: 1,
    latestHeight: 1,
    blocks: []
  };
}

function createMockClient(overrides: Partial<LightwalletdClientInterface> = {}): LightwalletdClientInterface {
  return {
    async getLatestBlock() {
      return { height: 0, hash: '' };
    },
    async getInfo() {
      return {};
    },
    async getBalance() {
      return { valueZat: 0 };
    },
    async getBlockRange(_startHeight: number, _endHeight: number) {
      return [];
    },
    async getBlocksSince(_sinceHeight: number, _limit: number) {
      return defaultBlocksSinceResult();
    },
    ...overrides
  };
}

test('returns incremental blocks since a given height', async (t) => {
  const mockBlock: CompactBlock = {
    height: 101,
    hash: Buffer.from('block-101'),
    prev_hash: Buffer.from('block-100'),
    vtx: [{ id: 1 }, { id: 2 }],
    time: 1700000000
  };

  const mockClient = createMockClient({
    async getBlocksSince(_sinceHeight: number, limit: number) {
      return {
        startHeight: 101,
        endHeight: 100 + limit,
        latestHeight: 150,
        blocks: [
          mockBlock,
          {
            height: 102,
            hash: Buffer.from('block-102'),
            prev_hash: Buffer.from('block-101'),
            vtx: [],
            time: 1700000100
          }
        ]
      };
    }
  });

  const app = createApp(mockClient);
  const server = app.listen(0);
  t.after(() => server.close());

  await new Promise<void>((resolve) => server.once('listening', resolve));
  const { port } = server.address() as AddressInfo;

  const response = await fetch(`http://127.0.0.1:${port}/v1/lightwalletd/blocks/since`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sinceHeight: 100, limit: 2 })
  });

  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.startHeight, 101);
  assert.equal(body.endHeight, 102);
  assert.equal(body.latestHeight, 150);
  assert.equal(body.limit, 2);
  assert.equal(body.blocks.length, 2);
  assert.equal(body.blocks[0].transactions, mockBlock.vtx.length);
  assert.equal(body.blocks[0].hash, Buffer.from(mockBlock.hash).toString('base64'));
});

test('returns empty list when there are no new blocks', async (t) => {
  const mockClient = createMockClient({
    async getBlocksSince(_sinceHeight: number, _limit: number) {
      return {
        startHeight: 201,
        endHeight: 200,
        latestHeight: 200,
        blocks: []
      };
    }
  });

  const app = createApp(mockClient);
  const server = app.listen(0);
  t.after(() => server.close());

  await new Promise<void>((resolve) => server.once('listening', resolve));
  const { port } = server.address() as AddressInfo;

  const response = await fetch(`http://127.0.0.1:${port}/v1/lightwalletd/blocks/since`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sinceHeight: 200 })
  });

  assert.equal(response.status, 200);
  const body = await response.json();

  assert.equal(body.blocks.length, 0);
  assert.equal(body.startHeight, 201);
  assert.equal(body.endHeight, 200);
  assert.equal(body.latestHeight, 200);
});

test('validates sinceHeight input', async (t) => {
  const app = createApp(createMockClient());
  const server = app.listen(0);
  t.after(() => server.close());

  await new Promise<void>((resolve) => server.once('listening', resolve));
  const { port } = server.address() as AddressInfo;

  const response = await fetch(`http://127.0.0.1:${port}/v1/lightwalletd/blocks/since`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sinceHeight: -1 })
  });

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.message, 'sinceHeight must be a non-negative number');
});


