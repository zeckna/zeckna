import { Router } from 'express';
import { LightwalletdClient } from './lightwalletd.js';
import { logger } from './logger.js';

const router = Router();
const client = new LightwalletdClient();

router.get('/health', async (_req, res) => {
  try {
    const latest = await client.getLatestBlock();
    res.json({ status: 'ok', latestHeight: latest.height });
  } catch (error) {
    logger.error({ error }, 'Health check failed');
    res.status(503).json({ status: 'error', message: (error as Error).message });
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

  if (typeof startHeight !== 'number' || typeof endHeight !== 'number') {
    res.status(400).json({ message: 'startHeight and endHeight must be numbers' });
    return;
  }

  try {
    const blocks = await client.getBlockRange(startHeight, endHeight);
    res.json({
      startHeight,
      endHeight,
      blocks: blocks.map((block) => ({
        height: Number(block.height),
        hash: Buffer.from(block.hash ?? []).toString('base64'),
        time: block.time ? Number(block.time) : undefined,
        transactions: block.vtx.length
      }))
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch block range');
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;

