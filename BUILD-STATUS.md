# Build Status

## ✅ Successfully Built (VPS: Ubuntu 22.04)

- Rust toolchain: `rustc 1.91.1`, `cargo 1.91.1`
- Node.js: `v18.20.8`, pnpm: `10.22.0`

### Core Library

1. **@zeckna/core** (Rust → WASM)
   - ✅ Built via `wasm-pack`, output in `packages/core/pkg/`
   - Generated artifacts: `zeckna_core_bg.wasm`, JS bindings, TypeScript declarations
   - Build command: `cd packages/core && ./build.sh`
   - ✅ Unit tests: `pnpm --filter @zeckna/core test`

### TypeScript Packages

1. **@zeckna/sdk** – TypeScript SDK wrapper
   - ✅ Compiled successfully (`pnpm build:sdk`)
   - 📦 Output: `packages/sdk/dist/`
   - 🧪 Jest harness added (`packages/sdk/src/__tests__/keys.test.ts`)
     ```bash
     pnpm --filter @zeckna/core run build:unix || pnpm --filter @zeckna/core run build
     pnpm --filter @zeckna/sdk test
     ```

2. **@zeckna/ai** – AI integration layer
   - ✅ Compiled successfully (`pnpm build:ai`)
   - 📦 Output: `packages/ai/dist/`
   - 🧪 Jest harness added (`packages/ai/src/__tests__/parser.test.ts`)
     ```bash
     pnpm --filter @zeckna/sdk build
     pnpm --filter @zeckna/ai test
     ```

### React Native Mobile App

1. **@zeckna/mobile** – React Native application
   - ⏳ Requires iOS/Android build tooling (Metro, Xcode/Android Studio) on the VPS
   - Dependencies installed (`pnpm --filter @zeckna/mobile install`)
   - 🧪 Jest harness added (`packages/mobile/src/components/__tests__/PrivacyBadge.test.tsx`)
     ```bash
     pnpm --filter @zeckna/mobile test
     ```

## Testing Summary

| Package          | Command                                      | Status |
|------------------|----------------------------------------------|--------|
| `@zeckna/core`   | `pnpm --filter @zeckna/core test`            | ✅ pass |
| `@zeckna/sdk`    | `pnpm --filter @zeckna/sdk test`             | ✅ pass |
| `@zeckna/ai`     | `pnpm --filter @zeckna/ai test`              | ✅ pass |
| `@zeckna/mobile` | `pnpm --filter @zeckna/mobile test`          | ✅ pass |
| `@zeckna/docs`   | `pnpm --filter @zeckna/docs build`           | ✅ pass |
| `@zeckna/sync-service` | `pnpm --filter @zeckna/sync-service build` | ✅ pass |

## Next Steps

1. **Mobile environment setup** (if not already installed)
   ```bash
   cd packages/mobile
   pnpm start            # Metro bundler
   pnpm android          # Requires Android SDK/emulator
   pnpm ios              # Requires macOS + Xcode
   ```

## Notes

- VPS workspace: `/root/zeckna`
- `packages/core/pkg/` contains the publish-ready WASM bundle
- New Jest setups mock native bindings (`react-native-encrypted-storage`, `react-native-keychain`, etc.) so tests run in Node
- SDK loader now binds to the real WASM artefact, enabling end-to-end tests in Node
- Sync service adds REST endpoints for viewing-key sync against public lightwalletd nodes

