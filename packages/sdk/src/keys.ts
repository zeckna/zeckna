<<<<<<< HEAD
import { initWasm, ensureWasmInitialized, wasm_generate_seed_phrase, wasm_validate_seed_phrase } from './wasm-loader';
import * as bip39 from 'bip39';

export interface SeedPhraseResult {
  phrase: string;
  isValid: boolean;
}

/**
 * Generate a new BIP39 seed phrase
 */
export async function generateSeedPhrase(): Promise<string> {
  await initWasm();
  ensureWasmInitialized();
  return wasm_generate_seed_phrase();
}

/**
 * Validate a seed phrase
 */
export async function validateSeedPhrase(phrase: string): Promise<boolean> {
  await initWasm();
  ensureWasmInitialized();
  
  // Also validate with bip39 library for additional checks
  try {
    return bip39.validateMnemonic(phrase) && wasm_validate_seed_phrase(phrase);
  } catch {
    return false;
  }
}

/**
 * Generate and validate a seed phrase
 */
export async function createSeedPhrase(): Promise<SeedPhraseResult> {
  const phrase = await generateSeedPhrase();
  const isValid = await validateSeedPhrase(phrase);
  return { phrase, isValid };
}

/**
 * Convert mnemonic to seed bytes
 */
export function mnemonicToSeed(mnemonic: string, passphrase?: string): Promise<Buffer> {
  return bip39.mnemonicToSeed(mnemonic, passphrase);
}

=======
import { initWasm, ensureWasmInitialized, wasm_generate_seed_phrase, wasm_validate_seed_phrase } from './wasm-loader';
import * as bip39 from 'bip39';

export interface SeedPhraseResult {
  phrase: string;
  isValid: boolean;
}

/**
 * Generate a new BIP39 seed phrase
 */
export async function generateSeedPhrase(): Promise<string> {
  await initWasm();
  ensureWasmInitialized();
  return wasm_generate_seed_phrase();
}

/**
 * Validate a seed phrase
 */
export async function validateSeedPhrase(phrase: string): Promise<boolean> {
  await initWasm();
  ensureWasmInitialized();
  
  // Also validate with bip39 library for additional checks
  try {
    return bip39.validateMnemonic(phrase) && wasm_validate_seed_phrase(phrase);
  } catch {
    return false;
  }
}

/**
 * Generate and validate a seed phrase
 */
export async function createSeedPhrase(): Promise<SeedPhraseResult> {
  const phrase = await generateSeedPhrase();
  const isValid = await validateSeedPhrase(phrase);
  return { phrase, isValid };
}

/**
 * Convert mnemonic to seed bytes
 */
export function mnemonicToSeed(mnemonic: string, passphrase?: string): Promise<Buffer> {
  return bip39.mnemonicToSeed(mnemonic, passphrase);
}

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
