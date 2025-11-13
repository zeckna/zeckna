const coreModule = require('@zeckna/core/pkg/zeckna_core.js');

let wasmInitialized = false;
let coreExports: any;

function loadExports() {
  if (coreExports) {
    return coreExports;
  }

  const candidate: any = coreModule;
  const loader = candidate.initSync ? candidate : candidate.default;

  if (typeof loader === 'function') {
    coreExports = loader();
  } else if (loader && typeof loader.initSync === 'function') {
    loader.initSync();
    coreExports = loader;
  } else {
    coreExports = candidate;
  }

  return coreExports;
}

export async function initWasm(): Promise<void> {
  if (!wasmInitialized) {
    loadExports();
    wasmInitialized = true;
  }
}

export function ensureWasmInitialized(): void {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
}

function ensureModule() {
  if (!wasmInitialized) {
    throw new Error('WASM module not initialized. Call initWasm() first.');
  }
  return loadExports();
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

