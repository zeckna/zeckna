import { initWasm, ensureWasmInitialized, wasm_generate_shielded_address, wasm_generate_transparent_address, wasm_validate_address } from './wasm-loader';
import { mnemonicToSeed } from './keys';

export enum AddressType {
  Shielded = 'shielded',
  Transparent = 'transparent',
}

export interface ZcashAddress {
  address: string;
  addressType: AddressType;
  account: number;
}

/**
 * Generate a shielded Zcash address from mnemonic
 */
export async function generateShieldedAddress(mnemonic: string, account: number = 0): Promise<ZcashAddress> {
  await initWasm();
  ensureWasmInitialized();

  const seed = await mnemonicToSeed(mnemonic);
  const seedArray = new Uint8Array(seed);
  
  const addr = wasm_generate_shielded_address(seedArray, account);
  return {
    address: addr.address,
    addressType: AddressType.Shielded,
    account: addr.account,
  };
}

/**
 * Generate a transparent Zcash address from mnemonic
 */
export async function generateTransparentAddress(mnemonic: string, account: number = 0): Promise<ZcashAddress> {
  await initWasm();
  ensureWasmInitialized();

  const seed = await mnemonicToSeed(mnemonic);
  const seedArray = new Uint8Array(seed);
  
  const addr = wasm_generate_transparent_address(seedArray, account);
  return {
    address: addr.address,
    addressType: AddressType.Transparent,
    account: addr.account,
  };
}

/**
 * Validate a Zcash address format
 */
export async function validateAddress(address: string): Promise<AddressType | null> {
  await initWasm();
  ensureWasmInitialized();

  try {
    const result = wasm_validate_address(address);
    return result === 'shielded' ? AddressType.Shielded : AddressType.Transparent;
  } catch {
    return null;
  }
}

/**
 * Check if an address is shielded
 */
export async function isShieldedAddress(address: string): Promise<boolean> {
  const type = await validateAddress(address);
  return type === AddressType.Shielded;
}

