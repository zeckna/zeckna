import { initWasm } from '../wasm-loader';
import { generateSeedPhrase, validateSeedPhrase, createSeedPhrase } from '../keys';
import { generateShieldedAddress, generateTransparentAddress } from '../address';

describe('SDK key management and addresses', () => {
  beforeAll(async () => {
    await initWasm();
  });

  it('generates a valid 24-word seed phrase', async () => {
    const phrase = await generateSeedPhrase();
    const words = phrase.trim().split(/\s+/);
    expect(words).toHaveLength(24);
    await expect(validateSeedPhrase(phrase)).resolves.toBe(true);
  });

  it('creates seed phrase bundle with validity flag', async () => {
    const result = await createSeedPhrase();
    expect(result.phrase.split(/\s+/)).toHaveLength(24);
    expect(result.isValid).toBe(true);
  });

  it('derives shielded and transparent addresses from mnemonic', async () => {
    const mnemonic = await generateSeedPhrase();
    await expect(validateSeedPhrase(mnemonic)).resolves.toBe(true);

    const shielded = await generateShieldedAddress(mnemonic, 0);
    const transparent = await generateTransparentAddress(mnemonic, 0);

    expect(shielded.address).toMatch(/^z[1s]/i);
    expect(transparent.address).toMatch(/^t[1m]/i);
    expect(shielded.account).toBe(0);
    expect(transparent.account).toBe(0);
  });
});
