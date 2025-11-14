import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Buffer } from 'node:buffer';
import {
  credentials,
  loadPackageDefinition,
  ClientReadableStream
} from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import type { PackageDefinition } from '@grpc/proto-loader';
import { config } from './config.js';
import { logger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, '../proto/service.proto');

const loaderOptions: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [path.join(__dirname, '../proto')]
};

const packageDefinition: PackageDefinition = protoLoader.loadSync(PROTO_PATH, loaderOptions);
const protoDescriptor = loadPackageDefinition(packageDefinition) as any;

export type CompactBlock = {
  height: string | number;
  hash: Buffer;
  prev_hash: Buffer;
  vtx: any[];
  time: string | number;
  sapling_tree?: Buffer;
};

type BlockID = {
  height: string | number;
  hash: Buffer;
};

type Balance = {
  valueZat: string | number;
  verifiedValueZat?: string | number;
  spendableValueZat?: string | number;
};

interface CompactTxStreamerClient {
  GetLatestBlock(
    request: Record<string, never>,
    callback: (err: Error | null, response: BlockID) => void
  ): void;
  GetLightdInfo(
    request: Record<string, never>,
    callback: (err: Error | null, response: any) => void
  ): void;
  GetBalance(
    request: { address: string; viewing_key: string },
    callback: (err: Error | null, response: Balance) => void
  ): void;
  GetBlockRange(request: { start: BlockID; end: BlockID }): ClientReadableStream<CompactBlock>;
}

export interface LightwalletdClientInterface {
  getLatestBlock(): Promise<{ height: number; hash: string }>;
  getInfo(): Promise<any>;
  getBalance(address: string, viewingKey: string): Promise<Balance>;
  getBlockRange(startHeight: number, endHeight: number): Promise<CompactBlock[]>;
  getBlocksSince(
    sinceHeight: number,
    limit: number
  ): Promise<{
    startHeight: number;
    endHeight: number;
    latestHeight: number;
    blocks: CompactBlock[];
  }>;
}

export class LightwalletdClient implements LightwalletdClientInterface {
  private client: CompactTxStreamerClient;

  constructor() {
    const tlsCredentials = credentials.createSsl();
    const service = protoDescriptor.cash.z.wallet.sdk.rpc;

    this.client = new service.CompactTxStreamer(
      config.lightwalletdEndpoint,
      tlsCredentials
    );

    logger.info(
      { endpoint: config.lightwalletdEndpoint },
      'Connected to lightwalletd endpoint'
    );
  }

  private async callWithRetry<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const attempts = Math.max(1, config.retry.attempts);
    const baseDelay = Math.max(0, config.retry.baseDelayMs);
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        logger.warn({ error, attempt, operation }, 'lightwalletd call failed');

        if (attempt === attempts) {
          throw error;
        }

        const delay = baseDelay * attempt;
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // This should never be hit, but TypeScript expects a return.
    throw lastError instanceof Error ? lastError : new Error('Unknown lightwalletd error');
  }

  async getLatestBlock(): Promise<{ height: number; hash: string }> {
    return this.callWithRetry('GetLatestBlock', () => new Promise((resolve, reject) => {
      this.client.GetLatestBlock({}, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          height: Number(response.height),
          hash: Buffer.from(response.hash ?? []).toString('base64')
        });
      });
    }));
  }

  async getInfo(): Promise<any> {
    return this.callWithRetry('GetLightdInfo', () => new Promise((resolve, reject) => {
      this.client.GetLightdInfo({}, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    }));
  }

  async getBalance(address: string, viewingKey: string): Promise<Balance> {
    return this.callWithRetry('GetBalance', () => new Promise((resolve, reject) => {
      this.client.GetBalance({ address, viewing_key: viewingKey }, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    }));
  }

  async getBlockRange(startHeight: number, endHeight: number): Promise<CompactBlock[]> {
    return this.callWithRetry('GetBlockRange', () => new Promise((resolve, reject) => {
      const blocks: CompactBlock[] = [];

      const stream = this.client.GetBlockRange({
        start: { height: startHeight, hash: Buffer.alloc(0) },
        end: { height: endHeight, hash: Buffer.alloc(0) }
      });

      stream.on('data', (block) => {
        blocks.push(block);
      });

      stream.on('error', (err) => {
        reject(err);
      });

      stream.on('end', () => resolve(blocks));
    }));
  }

  async getBlocksSince(sinceHeight: number, limit: number) {
    const startHeight = sinceHeight + 1;
    const latest = await this.getLatestBlock();

    if (startHeight > latest.height) {
      return {
        startHeight,
        endHeight: startHeight - 1,
        latestHeight: latest.height,
        blocks: [] as CompactBlock[]
      };
    }

    const normalizedLimit = Math.max(1, limit);
    const endHeight = Math.min(startHeight + normalizedLimit - 1, latest.height);
    const blocks = await this.getBlockRange(startHeight, endHeight);

    return {
      startHeight,
      endHeight,
      latestHeight: latest.height,
      blocks
    };
  }
}

