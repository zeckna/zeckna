---
title: Key Management
sidebar_position: 2
---

Zeckna wraps the Rust core’s key derivation helpers to produce seed phrases, spending keys, and viewing keys.

## Generate a mnemonic

```ts
import { generateSeedPhrase, validateSeedPhrase } from '@zeckna/sdk/keys';

const mnemonic = await generateSeedPhrase();
await validateSeedPhrase(mnemonic); // throws if invalid
```

Internally the core uses BIP39 English wordlists seeded by a WASM-safe CSPRNG (`getrandom` with the `js` feature).

## Derive key material

```ts
import { deriveSpendingKey, deriveFullViewingKey } from '@zeckna/sdk/keys';

const spendingKey = await deriveSpendingKey(mnemonic, 0);
const viewingKey = await deriveFullViewingKey(mnemonic, 0);
```

- **Account index** enables multiple accounts per mnemonic (`0` is the default).
- Viewing keys can be shared with auditors or compliance pipelines without exposing spending authority.

## Secure storage

Use the wallet service (`packages/mobile/src/services/StorageService.ts`) or your own encrypted storage provider to persist keys. Never store raw mnemonics on disk; encrypt them with platform-secure keystores or hardware modules.

