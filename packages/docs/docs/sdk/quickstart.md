---
title: SDK Quickstart
sidebar_position: 1
---

The TypeScript SDK provides async wrappers around the Rust core’s WebAssembly bindings.

## Install

```bash
pnpm add @zeckna/sdk
pnpm add @zeckna/core    # installed automatically when using the monorepo
```

If you consume the SDK outside the monorepo, run `pnpm --filter @zeckna/core run build` first to generate the WASM bundle.

## Generate a seed phrase

```ts
import { generateSeedPhrase } from '@zeckna/sdk/keys';

const mnemonic = await generateSeedPhrase();
console.log(mnemonic); // 24-word BIP39 phrase
```

## Derive addresses

```ts
import { generateShieldedAddress, generateTransparentAddress } from '@zeckna/sdk/keys';

const shielded = await generateShieldedAddress(mnemonic, 0);
const transparent = await generateTransparentAddress(mnemonic, 0);
```

## Build a transaction

```ts
import { buildShieldedTransaction } from '@zeckna/sdk/transaction';

const tx = await buildShieldedTransaction({
  seedPhrase: mnemonic,
  recipient: shielded,
  amountZats: 100000, // 0.001 ZEC
  memo: 'Private test transfer'
});
```

Transactions return a serialized payload ready for broadcast via your preferred relay or lightwalletd endpoint.

