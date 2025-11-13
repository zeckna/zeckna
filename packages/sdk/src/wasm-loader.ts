<<<<<<< HEAD
const coreModulePromise = import('@zeckna/core/pkg/zeckna_core.js');

let wasmInitialized = false;
let coreModule: any = null;

async function importCoreModule() {
  const module = await coreModulePromise;
  const exports = (module as any).default || module;
  if (typeof exports.initSync === 'function') {
    exports.initSync();
  }
  return exports;
}

function ensureModule() {
  if (!wasmInitialized || !coreModule) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  return coreModule;
}

=======
import init, {
  ZecknaWallet,
  wasm_generate_seed_phrase,
  wasm_validate_seed_phrase,
  wasm_generate_shielded_address,
  wasm_generate_transparent_address,
  wasm_validate_address,
  wasm_export_view_key,
} from '@zeckna/core';

let wasmInitialized = false;

/**
 * Initialize the WASM module
 * Must be called before using any SDK functions
 */
>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
export async function initWasm(): Promise<void> {
  if (wasmInitialized) {
    return;
  }

<<<<<<< HEAD
  coreModule = await importCoreModule();
  wasmInitialized = true;
}

=======
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
>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
export function isWasmInitialized(): boolean {
  return wasmInitialized;
}

<<<<<<< HEAD
export function ensureWasmInitialized(): void {
  ensureModule();
}

export class ZecknaWallet {
  private inner: any;

  constructor() {
    const module = ensureModule();
    this.inner = new module.ZecknaWallet();
  }

  initialize_new(): Promise<string> {
    return this.inner.initialize_new();
  }

  initialize_from_mnemonic(mnemonic: string): Promise<void> {
    return this.inner.initialize_from_mnemonic(mnemonic);
  }

  generate_new_shielded_address(): any {
    return this.inner.generate_new_shielded_address();
  }

  get_balance(address: string): number {
    return this.inner.get_balance(address);
  }

  create_shielded_transaction(to: string, amount: number, memo?: number[]): any {
    return this.inner.create_shielded_transaction(to, amount, memo);
  }
}

export function wasm_generate_seed_phrase(): string {
  const module = ensureModule();
  return module.wasm_generate_seed_phrase();
}

export function wasm_validate_seed_phrase(phrase: string): boolean {
  const module = ensureModule();
  return module.wasm_validate_seed_phrase(phrase);
}

export function wasm_generate_shielded_address(seed: Uint8Array, account: number): any {
  const module = ensureModule();
  return module.wasm_generate_shielded_address(seed, account);
}

export function wasm_generate_transparent_address(seed: Uint8Array, account: number): any {
  const module = ensureModule();
  return module.wasm_generate_transparent_address(seed, account);
}

export function wasm_validate_address(address: string): string {
  const module = ensureModule();
  return module.wasm_validate_address(address);
}

export function wasm_export_view_key(mnemonic: string, account: number): any {
  const module = ensureModule();
  return module.wasm_export_view_key(mnemonic, account);
}
=======
/**
 * Ensure WASM is initialized, throw if not
 */
export function ensureWasmInitialized(): void {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
}

// Re-export WASM functions
export {
  ZecknaWallet,
  wasm_generate_seed_phrase,
  wasm_validate_seed_phrase,
  wasm_generate_shielded_address,
  wasm_generate_transparent_address,
  wasm_validate_address,
  wasm_export_view_key,
};

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
