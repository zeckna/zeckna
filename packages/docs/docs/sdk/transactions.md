---
title: Transaction APIs
sidebar_position: 3
---

The SDK exposes helpers to craft shielded or transparent Zcash transactions. Shielded flows rely on the Rust core’s circuit integrations and return serialized transactions ready for broadcasting.

## Shielded transfer

```ts
import { buildShieldedTransaction } from '@zeckna/sdk/transaction';

const txBytes = await buildShieldedTransaction({
  seedPhrase: mnemonic,
  account: 0,
  recipient: 'zs1...',
  amountZats: 250000, // 0.0025 ZEC
  memo: 'Payment for private goods'
});
```

### Parameters
- `seedPhrase`: 24-word mnemonic used to derive spending and viewing keys.
- `account`: Account index (default 0).
- `recipient`: Shielded recipient address.
- `amountZats`: Amount in zatoshis.
- `memo`: Optional 512-byte memo field.

The function returns a byte array. Submit it to a Zcash node or lightwalletd endpoint.

## Transparent transfer

```ts
import { buildTransparentTransaction } from '@zeckna/sdk/transaction';

const txBytes = await buildTransparentTransaction({
  seedPhrase: mnemonic,
  account: 0,
  recipient: 't1...',
  amountZats: 100000
});
```

Transparent transactions are generated for compatibility with legacy infrastructure. They do not carry privacy guarantees and should be avoided when shielded paths are available.

