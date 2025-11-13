import {ParsedCommand} from './parser';
import {TransactionIntent, buildTransactionFromCommand} from './transaction-builder';
import {Wallet} from '@zeckna/sdk';

export interface ScheduledTransaction {
  id: string;
  intent: TransactionIntent;
  scheduledDate: Date;
  executed: boolean;
  createdAt: Date;
}

/**
 * Schedule a transaction based on natural language command
 */
export async function scheduleTransaction(
  command: string,
  wallet: Wallet,
  useCloud: boolean = false,
  apiKey?: string
): Promise<ScheduledTransaction | null> {
  const parsed = await parseCommand(command, useCloud, apiKey);
  
  if (parsed.action !== 'schedule' || !parsed.date) {
    return null;
  }
  
  const intent = await buildTransactionFromCommand(command, wallet, useCloud, apiKey);
  if (!intent) {
    return null;
  }
  
  return {
    id: generateId(),
    intent,
    scheduledDate: parsed.date,
    executed: false,
    createdAt: new Date(),
  };
}

/**
 * Check and execute scheduled transactions
 */
export async function executeScheduledTransactions(
  scheduled: ScheduledTransaction[],
  wallet: Wallet
): Promise<ScheduledTransaction[]> {
  const now = new Date();
  const executed: ScheduledTransaction[] = [];
  
  for (const transaction of scheduled) {
    if (!transaction.executed && transaction.scheduledDate <= now) {
      try {
        await wallet.createShieldedTransaction(
          transaction.intent.toAddress,
          transaction.intent.amount,
          transaction.intent.memo
        );
        transaction.executed = true;
        executed.push(transaction);
      } catch (error) {
        console.error('Failed to execute scheduled transaction:', error);
      }
    }
  }
  
  return executed;
}

/**
 * Generate unique ID for scheduled transaction
 */
function generateId(): string {
  return `scheduled_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

