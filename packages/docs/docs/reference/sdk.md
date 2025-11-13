---
title: SDK Reference
sidebar_position: 2
---

`@zeckna/sdk` is a TypeScript package that re-exports high-level functions from the WASM core.

## Key exports

```ts
import {
  generateSeedPhrase,
  validateSeedPhrase,
  generateShieldedAddress,
  buildShieldedTransaction,
  exportViewKey
} from '@zeckna/sdk';
```

| Function | Description |
|----------|-------------|
| `generateSeedPhrase()` | Returns a 24-word BIP39 mnemonic. |
| `generateShieldedAddress(mnemonic, account)` | Produces a shielded address for the account index. |
| `buildShieldedTransaction(opts)` | Returns serialized bytes for broadcasting. |
| `exportViewKey(opts)` | Derives a full or incoming viewing key. |

### Testing

The SDK uses Jest via `ts-jest`. Tests live under `packages/sdk/src/__tests__`.

```bash
pnpm --filter @zeckna/sdk test
```

Run `pnpm --filter @zeckna/core run build` first to guarantee the WASM bundle is available for tests.

