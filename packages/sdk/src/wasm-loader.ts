import init, { ZecknaWallet, wasm_generate_seed_phrase, wasm_validate_seed_phrase } from '@zeckna/core';

let wasmInitialized = false;

/**
 * Initialize the WASM module
 * Must be called before using any SDK functions
 */
export async function initWasm(): Promise<void> {
  if (wasmInitialized) {
    return;
  }

  try {
    await init();
    wasmInitialized = true;
  } catch (error) {
    throw new Error(`Failed to initialize WASM module: ${error}`);
  }
}

/**
 * Check if WASM module is initialized
 */
export function isWasmInitialized(): boolean {
  return wasmInitialized;
}

/**
 * Ensure WASM is initialized, throw if not
 */
export function ensureWasmInitialized(): void {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
}

// Re-export WASM functions
export { ZecknaWallet, wasm_generate_seed_phrase, wasm_validate_seed_phrase };

