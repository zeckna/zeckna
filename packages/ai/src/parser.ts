<<<<<<< HEAD
/**
 * Natural language command parser for wallet operations
 * Uses simple pattern matching for local processing, falls back to cloud API for complex queries
 */

export interface ParsedCommand {
  action: 'send' | 'receive' | 'balance' | 'transaction' | 'schedule' | 'unknown';
  amount?: number;
  recipient?: string;
  memo?: string;
  date?: Date;
  threshold?: number;
  confidence: number;
}

/**
 * Simple local parser for common commands
 * Returns null if command is too complex for local parsing
 */
export function parseCommandLocal(command: string): ParsedCommand | null {
  const lowerCommand = command.toLowerCase().trim();
  
  // Simple pattern matching for common commands
  const sendPattern = /send\s+(\d+(?:\.\d+)?)\s+(?:zec|zcash)?\s+to\s+([a-z0-9]+)/i;
  const balancePattern = /(?:show|what'?s?|check)\s+(?:my\s+)?balance/i;
  const schedulePattern = /send\s+(\d+(?:\.\d+)?)\s+(?:zec|zcash)?\s+to\s+([a-z0-9]+)\s+(?:on|next|at)\s+(.+)/i;
  
  // Check for send command
  const sendMatch = lowerCommand.match(sendPattern);
  if (sendMatch) {
    return {
      action: 'send',
      amount: parseFloat(sendMatch[1]),
      recipient: sendMatch[2],
      confidence: 0.8,
    };
  }
  
  // Check for balance query
  if (balancePattern.test(lowerCommand)) {
    return {
      action: 'balance',
      confidence: 0.9,
    };
  }
  
  // Check for scheduled transaction
  const scheduleMatch = lowerCommand.match(schedulePattern);
  if (scheduleMatch) {
    const date = parseDate(scheduleMatch[3]);
    return {
      action: 'schedule',
      amount: parseFloat(scheduleMatch[1]),
      recipient: scheduleMatch[2],
      date: date || undefined,
      confidence: date ? 0.7 : 0.5,
    };
  }
  
  // If no simple pattern matches, return null to use cloud API
  return null;
}

/**
 * Parse date from natural language
 */
function parseDate(dateStr: string): Date | null {
  const lower = dateStr.toLowerCase();
  const today = new Date();
  
  // Simple date parsing
  if (lower.includes('tomorrow')) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  
  if (lower.includes('next friday')) {
    const nextFriday = new Date(today);
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday;
  }
  
  // Try to parse as ISO date
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  return null;
}

/**
 * Parse command using cloud API (OpenAI/Anthropic)
 * This is a placeholder - in production, implement actual API calls
 */
export async function parseCommandCloud(
  command: string,
  apiKey?: string
): Promise<ParsedCommand> {
  // Placeholder implementation
  // In production, this would call OpenAI or Anthropic API
  
  if (!apiKey) {
    throw new Error('API key required for cloud parsing');
  }
  
  // For now, return a basic structure
  // In production, implement actual API integration
  return {
    action: 'unknown',
    confidence: 0.5,
  };
}

/**
 * Main parser function - tries local first, falls back to cloud
 */
export async function parseCommand(
  command: string,
  useCloud: boolean = false,
  apiKey?: string
): Promise<ParsedCommand> {
  // Try local parsing first
  if (!useCloud) {
    const localResult = parseCommandLocal(command);
    if (localResult && localResult.confidence > 0.7) {
      return localResult;
    }
  }
  
  // Fall back to cloud parsing for complex commands
  if (useCloud && apiKey) {
    return parseCommandCloud(command, apiKey);
  }
  
  // If local parsing failed and cloud is not available, return unknown
  const localResult = parseCommandLocal(command);
  return localResult || {
    action: 'unknown',
    confidence: 0.0,
  };
}

=======
/**
 * Natural language command parser for wallet operations
 * Uses simple pattern matching for local processing, falls back to cloud API for complex queries
 */

export interface ParsedCommand {
  action: 'send' | 'receive' | 'balance' | 'transaction' | 'schedule' | 'unknown';
  amount?: number;
  recipient?: string;
  memo?: string;
  date?: Date;
  threshold?: number;
  confidence: number;
}

/**
 * Simple local parser for common commands
 * Returns null if command is too complex for local parsing
 */
export function parseCommandLocal(command: string): ParsedCommand | null {
  const lowerCommand = command.toLowerCase().trim();
  
  // Simple pattern matching for common commands
  const sendPattern = /send\s+(\d+(?:\.\d+)?)\s+(?:zec|zcash)?\s+to\s+([a-z0-9]+)/i;
  const balancePattern = /(?:show|what'?s?|check)\s+(?:my\s+)?balance/i;
  const schedulePattern = /send\s+(\d+(?:\.\d+)?)\s+(?:zec|zcash)?\s+to\s+([a-z0-9]+)\s+(?:on|next|at)\s+(.+)/i;
  
  // Check for send command
  const sendMatch = lowerCommand.match(sendPattern);
  if (sendMatch) {
    return {
      action: 'send',
      amount: parseFloat(sendMatch[1]),
      recipient: sendMatch[2],
      confidence: 0.8,
    };
  }
  
  // Check for balance query
  if (balancePattern.test(lowerCommand)) {
    return {
      action: 'balance',
      confidence: 0.9,
    };
  }
  
  // Check for scheduled transaction
  const scheduleMatch = lowerCommand.match(schedulePattern);
  if (scheduleMatch) {
    const date = parseDate(scheduleMatch[3]);
    return {
      action: 'schedule',
      amount: parseFloat(scheduleMatch[1]),
      recipient: scheduleMatch[2],
      date: date || undefined,
      confidence: date ? 0.7 : 0.5,
    };
  }
  
  // If no simple pattern matches, return null to use cloud API
  return null;
}

/**
 * Parse date from natural language
 */
function parseDate(dateStr: string): Date | null {
  const lower = dateStr.toLowerCase();
  const today = new Date();
  
  // Simple date parsing
  if (lower.includes('tomorrow')) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  
  if (lower.includes('next friday')) {
    const nextFriday = new Date(today);
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday;
  }
  
  // Try to parse as ISO date
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }
  
  return null;
}

/**
 * Parse command using cloud API (OpenAI/Anthropic)
 * This is a placeholder - in production, implement actual API calls
 */
export async function parseCommandCloud(
  command: string,
  apiKey?: string
): Promise<ParsedCommand> {
  // Placeholder implementation
  // In production, this would call OpenAI or Anthropic API
  
  if (!apiKey) {
    throw new Error('API key required for cloud parsing');
  }
  
  // For now, return a basic structure
  // In production, implement actual API integration
  return {
    action: 'unknown',
    confidence: 0.5,
  };
}

/**
 * Main parser function - tries local first, falls back to cloud
 */
export async function parseCommand(
  command: string,
  useCloud: boolean = false,
  apiKey?: string
): Promise<ParsedCommand> {
  // Try local parsing first
  if (!useCloud) {
    const localResult = parseCommandLocal(command);
    if (localResult && localResult.confidence > 0.7) {
      return localResult;
    }
  }
  
  // Fall back to cloud parsing for complex commands
  if (useCloud && apiKey) {
    return parseCommandCloud(command, apiKey);
  }
  
  // If local parsing failed and cloud is not available, return unknown
  const localResult = parseCommandLocal(command);
  return localResult || {
    action: 'unknown',
    confidence: 0.0,
  };
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
