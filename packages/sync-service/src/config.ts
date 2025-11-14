import 'dotenv/config';

const DEFAULT_ENDPOINT = 'mainnet.lightwalletd.com:9067';
const DEFAULT_BLOCK_BATCH_SIZE = 100;
const MAX_BLOCK_BATCH_SIZE = 500;
const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY_MS = 250;

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  port: parseNumber(process.env.PORT, 4000),
  lightwalletdEndpoint: process.env.LIGHTWALLETD_ENDPOINT ?? DEFAULT_ENDPOINT,
  tlsDomain: process.env.LIGHTWALLETD_TLS_DOMAIN ?? DEFAULT_ENDPOINT.split(':')[0],
  blockBatchSize: Math.max(
    1,
    parseNumber(process.env.LIGHTWALLETD_BLOCK_BATCH, DEFAULT_BLOCK_BATCH_SIZE)
  ),
  maxBlockBatchSize: Math.max(
    1,
    parseNumber(process.env.LIGHTWALLETD_BLOCK_MAX, MAX_BLOCK_BATCH_SIZE)
  ),
  retry: {
    attempts: Math.max(
      1,
      parseNumber(process.env.LIGHTWALLETD_RETRY_ATTEMPTS, DEFAULT_RETRY_ATTEMPTS)
    ),
    baseDelayMs: Math.max(
      0,
      parseNumber(process.env.LIGHTWALLETD_RETRY_DELAY_MS, DEFAULT_RETRY_DELAY_MS)
    )
  }
};

