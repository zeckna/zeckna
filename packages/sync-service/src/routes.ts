import { Router } from 'express';
import { LightwalletdClient, type LightwalletdClientInterface, type CompactBlock } from './lightwalletd.js';
import { logger } from './logger.js';
import { config } from './config.js';

const MAX_BATCH_SIZE = Math.max(config.blockBatchSize, config.maxBlockBatchSize);

function normalizeLimit(limit: number | undefined): number {
  const parsed = Number(limit);
  const defaultSize = Math.min(config.blockBatchSize, MAX_BATCH_SIZE);
  if (!Number.isFinite(parsed)) {
    return defaultSize;
  }
  return Math.min(Math.max(Math.floor(parsed), 1), MAX_BATCH_SIZE);
}

function formatBlock(block: CompactBlock) {
  return {
    height: Number(block.height),
    hash: Buffer.from(block.hash ?? []).toString('base64'),
    time: block.time ? Number(block.time) : undefined,
    transactions: block.vtx.length
  };
}

export const createLightwalletdRouter = (
  client: LightwalletdClientInterface = new LightwalletdClient()
) => {
  const router = Router();

  router.get('/health', async (_req, res) => {
    try {
      const latest = await client.getLatestBlock();
      res.json({ status: 'ok', latestHeight: latest.height });
    } catch (error) {
      logger.warn({ error }, 'Health check degraded');
      res.json({ status: 'degraded', message: (error as Error).message });
    }
  });

  router.get('/v1/lightwalletd/info', async (_req, res) => {
    try {
      const info = await client.getInfo();
      res.json(info);
    } catch (error) {
      logger.error({ error }, 'Failed to fetch lightwalletd info');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  router.get('/v1/lightwalletd/latest-block', async (_req, res) => {
    try {
      const block = await client.getLatestBlock();
      res.json(block);
    } catch (error) {
      logger.error({ error }, 'Failed to fetch latest block');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  router.post('/v1/lightwalletd/balance', async (req, res) => {
    const { address, viewingKey } = req.body ?? {};

    if (!address || !viewingKey) {
      res.status(400).json({ message: 'address and viewingKey are required' });
      return;
    }

    try {
      const [balance, latest] = await Promise.all([
        client.getBalance(address, viewingKey),
        client.getLatestBlock()
      ]);
      res.json({
        address,
        balance: {
          valueZat: Number(balance.valueZat),
          verifiedValueZat: balance.verifiedValueZat ? Number(balance.verifiedValueZat) : undefined,
          spendableValueZat: balance.spendableValueZat ? Number(balance.spendableValueZat) : undefined
        },
        latestHeight: latest.height
      });
    } catch (error) {
      logger.error({ error }, 'Failed to fetch shielded balance');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  router.post('/v1/lightwalletd/blocks', async (req, res) => {
    const { startHeight, endHeight } = req.body ?? {};

    if (!Number.isFinite(startHeight) || !Number.isFinite(endHeight)) {
      res.status(400).json({ message: 'startHeight and endHeight must be numbers' });
      return;
    }

    const numericStart = Number(startHeight);
    const numericEnd = Number(endHeight);

    if (numericStart < 0 || numericEnd < numericStart) {
      res.status(400).json({ message: 'Invalid block range requested' });
      return;
    }

    try {
      const blocks = await client.getBlockRange(numericStart, numericEnd);
      res.json({
        startHeight: numericStart,
        endHeight: numericEnd,
        blocks: blocks.map(formatBlock)
      });
    } catch (error) {
      logger.error({ error }, 'Failed to fetch block range');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  router.post('/v1/lightwalletd/blocks/since', async (req, res) => {
    const { sinceHeight, limit } = req.body ?? {};

    if (!Number.isFinite(sinceHeight) || Number(sinceHeight) < 0) {
      res.status(400).json({ message: 'sinceHeight must be a non-negative number' });
      return;
    }

    try {
      const clampedLimit = normalizeLimit(limit);
      const { startHeight, endHeight, latestHeight, blocks } = await client.getBlocksSince(
        Number(sinceHeight),
        clampedLimit
      );

      res.json({
        startHeight,
        endHeight,
        latestHeight,
        limit: clampedLimit,
        blocks: blocks.map(formatBlock)
      });
    } catch (error) {
      logger.error({ error }, 'Failed to fetch incremental blocks');
      res.status(500).json({ message: (error as Error).message });
    }
  });

  return router;
};

export default createLightwalletdRouter();


