<<<<<<< HEAD
import {parseCommand, ParsedCommand} from './parser';
import {Wallet} from '@zeckna/sdk';
import {zecToZatoshis} from '@zeckna/sdk';

export interface TransactionIntent {
  toAddress: string;
  amount: number; // in zatoshis
  memo?: string;
  isShielded: boolean;
}

/**
 * Build transaction intent from natural language command
 */
export async function buildTransactionFromCommand(
  command: string,
  wallet: Wallet,
  useCloud: boolean = false,
  apiKey?: string
): Promise<TransactionIntent | null> {
  const parsed = await parseCommand(command, useCloud, apiKey);
  
  if (parsed.action !== 'send' && parsed.action !== 'schedule') {
    return null;
  }
  
  if (!parsed.amount || !parsed.recipient) {
    return null;
  }
  
  // Validate recipient address
  // In production, this would check if address exists or resolve it
  const toAddress = parsed.recipient;
  
  // Convert amount to zatoshis
  const amount = zecToZatoshis(parsed.amount);
  
  // Default to shielded transactions for privacy
  const isShielded = true;
  
  return {
    toAddress,
    amount,
    memo: parsed.memo,
    isShielded,
  };
}

/**
 * Validate transaction intent before execution
 */
export function validateTransactionIntent(intent: TransactionIntent): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!intent.toAddress || intent.toAddress.length < 10) {
    errors.push('Invalid recipient address');
  }
  
  if (intent.amount <= 0) {
    errors.push('Amount must be greater than zero');
  }
  
  if (intent.amount < 10000) {
    errors.push('Amount is too small (minimum fee)');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

=======
import {parseCommand, ParsedCommand} from './parser';
import {Wallet} from '@zeckna/sdk';
import {zecToZatoshis} from '@zeckna/sdk';

export interface TransactionIntent {
  toAddress: string;
  amount: number; // in zatoshis
  memo?: string;
  isShielded: boolean;
}

/**
 * Build transaction intent from natural language command
 */
export async function buildTransactionFromCommand(
  command: string,
  wallet: Wallet,
  useCloud: boolean = false,
  apiKey?: string
): Promise<TransactionIntent | null> {
  const parsed = await parseCommand(command, useCloud, apiKey);
  
  if (parsed.action !== 'send' && parsed.action !== 'schedule') {
    return null;
  }
  
  if (!parsed.amount || !parsed.recipient) {
    return null;
  }
  
  // Validate recipient address
  // In production, this would check if address exists or resolve it
  const toAddress = parsed.recipient;
  
  // Convert amount to zatoshis
  const amount = zecToZatoshis(parsed.amount);
  
  // Default to shielded transactions for privacy
  const isShielded = true;
  
  return {
    toAddress,
    amount,
    memo: parsed.memo,
    isShielded,
  };
}

/**
 * Validate transaction intent before execution
 */
export function validateTransactionIntent(intent: TransactionIntent): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!intent.toAddress || intent.toAddress.length < 10) {
    errors.push('Invalid recipient address');
  }
  
  if (intent.amount <= 0) {
    errors.push('Amount must be greater than zero');
  }
  
  if (intent.amount < 10000) {
    errors.push('Amount is too small (minimum fee)');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
