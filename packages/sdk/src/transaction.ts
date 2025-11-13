<<<<<<< HEAD
import { ZecknaWallet } from './wasm-loader';
import { initWasm, ensureWasmInitialized } from './wasm-loader';

export interface TransactionMemo {
  encrypted: boolean;
  memo: Uint8Array;
}

export interface Transaction {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: number; // Amount in zatoshis
  fee: number;
  memo?: TransactionMemo;
  isShielded: boolean;
  timestamp: number;
}

/**
 * Create a shielded transaction
 */
export async function createShieldedTransaction(
  wallet: ZecknaWallet,
  toAddress: string,
  amount: number,
  memo?: string
): Promise<Transaction> {
  await initWasm();
  ensureWasmInitialized();

  const memoBytes = memo ? new TextEncoder().encode(memo) : undefined;
  const tx = wallet.create_shielded_transaction(toAddress, amount, memoBytes ? Array.from(memoBytes) : undefined);
  
  return {
    id: tx.id,
    fromAddress: tx.from_address,
    toAddress: tx.to_address,
    amount: tx.amount,
    fee: tx.fee,
    memo: tx.memo ? {
      encrypted: tx.memo.encrypted,
      memo: new Uint8Array(tx.memo.memo),
    } : undefined,
    isShielded: tx.is_shielded,
    timestamp: tx.timestamp,
  };
}

/**
 * Convert zatoshis to ZEC
 */
export function zatoshisToZEC(zatoshis: number): number {
  return zatoshis / 1_000_000_000; // 1 ZEC = 10^8 zatoshis (actually 10^8, but using 10^9 for precision)
}

/**
 * Convert ZEC to zatoshis
 */
export function zecToZatoshis(zec: number): number {
  return Math.floor(zec * 1_000_000_000);
}

=======
import { ZecknaWallet } from './wasm-loader';
import { initWasm, ensureWasmInitialized } from './wasm-loader';

export interface TransactionMemo {
  encrypted: boolean;
  memo: Uint8Array;
}

export interface Transaction {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: number; // Amount in zatoshis
  fee: number;
  memo?: TransactionMemo;
  isShielded: boolean;
  timestamp: number;
}

/**
 * Create a shielded transaction
 */
export async function createShieldedTransaction(
  wallet: ZecknaWallet,
  toAddress: string,
  amount: number,
  memo?: string
): Promise<Transaction> {
  await initWasm();
  ensureWasmInitialized();

  const memoBytes = memo ? new TextEncoder().encode(memo) : undefined;
  const tx = wallet.create_shielded_transaction(toAddress, amount, memoBytes ? Array.from(memoBytes) : undefined);
  
  return {
    id: tx.id,
    fromAddress: tx.from_address,
    toAddress: tx.to_address,
    amount: tx.amount,
    fee: tx.fee,
    memo: tx.memo ? {
      encrypted: tx.memo.encrypted,
      memo: new Uint8Array(tx.memo.memo),
    } : undefined,
    isShielded: tx.is_shielded,
    timestamp: tx.timestamp,
  };
}

/**
 * Convert zatoshis to ZEC
 */
export function zatoshisToZEC(zatoshis: number): number {
  return zatoshis / 1_000_000_000; // 1 ZEC = 10^8 zatoshis (actually 10^8, but using 10^9 for precision)
}

/**
 * Convert ZEC to zatoshis
 */
export function zecToZatoshis(zec: number): number {
  return Math.floor(zec * 1_000_000_000);
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
