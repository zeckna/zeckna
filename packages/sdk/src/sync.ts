import fetch from 'cross-fetch';

const DEFAULT_BASE_URL = process.env.ZECKNA_SYNC_URL ?? 'http://localhost:4000';

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export interface ShieldedBalanceResponse {
  address: string;
  balance: {
    valueZat: number;
    verifiedValueZat?: number;
    spendableValueZat?: number;
  };
  latestHeight?: number;
}

export interface BlockSummary {
  height: number;
  hash: string;
  time?: number;
  transactions: number;
}

export interface BlocksSinceResponse {
  startHeight: number;
  endHeight: number;
  latestHeight: number;
  limit: number;
  blocks: BlockSummary[];
}

export class SyncServiceClient {
  private baseUrl: string;

  constructor(baseUrl: string = DEFAULT_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async getLatestBlock(): Promise<{ height: number; hash: string }> {
    return request<{ height: number; hash: string }>(
      `${this.baseUrl}/v1/lightwalletd/latest-block`
    );
  }

  async getLightdInfo(): Promise<any> {
    return request(`${this.baseUrl}/v1/lightwalletd/info`);
  }

  async getShieldedBalance(address: string, viewingKey: string): Promise<ShieldedBalanceResponse> {
    return request<ShieldedBalanceResponse>(`${this.baseUrl}/v1/lightwalletd/balance`, {
      method: 'POST',
      body: JSON.stringify({ address, viewingKey })
    });
  }

  async getBlockSummaries(startHeight: number, endHeight: number): Promise<{
    startHeight: number;
    endHeight: number;
    blocks: Array<{ height: number; hash: string; time?: number; transactions: number }>;
  }> {
    return request(`${this.baseUrl}/v1/lightwalletd/blocks`, {
      method: 'POST',
      body: JSON.stringify({ startHeight, endHeight })
    });
  }

  async getBlocksSince(sinceHeight: number, limit?: number): Promise<BlocksSinceResponse> {
    if (sinceHeight < 0 || !Number.isFinite(sinceHeight)) {
      throw new Error('sinceHeight must be a non-negative number');
    }

    return request<BlocksSinceResponse>(`${this.baseUrl}/v1/lightwalletd/blocks/since`, {
      method: 'POST',
      body: JSON.stringify({
        sinceHeight,
        ...(Number.isFinite(limit) ? { limit } : {})
      })
    });
  }
}

