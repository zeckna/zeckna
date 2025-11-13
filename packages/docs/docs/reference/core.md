---
title: Core (Rust) Reference
sidebar_position: 1
---

The `@zeckna/core` package wraps the Rust library compiled via `wasm-pack`. Key modules:

| Module | Description |
|--------|-------------|
| `keys.rs` | Mnemonic generation, spending key derivation, viewing key export. |
| `address.rs` | Shielded and transparent address creation. |
| `transaction.rs` | Transaction builders for shielded and transparent outputs. |
| `wallet.rs` | In-memory wallet state management helpers. |
| `ffi.rs` | WebAssembly bindings exposed to JavaScript. |

### Build commands

```bash
pnpm --filter @zeckna/core run build:unix   # uses bash script
pnpm --filter @zeckna/core run build        # PowerShell script fallback
cargo test --package zeckna-core
```

The resulting WASM bundle lives in `packages/core/pkg`. It exports an `initSync` and default async initializer. The SDK’s WASM loader handles both paths automatically.

