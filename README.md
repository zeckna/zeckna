# Zeckna

A multi-chain, privacy-first wallet and SDK that combines Zcash's shielded transaction capability with the speed and composability of Solana.

## Features

- **Privacy-First**: Shielded Zcash transactions with zk-SNARKs
- **Multi-Chain**: Support for Zcash and Solana
- **Non-Custodial**: Your keys, your coins
- **AI-Enhanced**: Natural language transaction commands
- **Developer SDK**: TypeScript SDK with Rust core

## Project Structure

```
zeckna/
├── packages/
│   ├── core/           # Rust library for Zcash operations (compiled to WASM)
│   ├── sdk/            # TypeScript SDK with WASM bindings + sync helpers
│   ├── mobile/         # React Native mobile app
│   ├── ai/             # AI integration layer (parser/advisor/scheduler)
│   ├── web/            # Next.js marketing site
│   ├── docs/           # Docusaurus documentation
│   └── sync-service/   # Node.js lightwalletd proxy (REST)
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Rust (for building core library)
- React Native development environment

### Installation

```bash
# Install dependencies and bootstrap workspaces
pnpm install

# Build Rust core → WASM bundle
pnpm --filter @zeckna/core run build:unix

# Build TypeScript packages
pnpm --filter @zeckna/sdk build
pnpm --filter @zeckna/ai build

# Start the sync service (REST wrapper around lightwalletd)
pnpm --filter @zeckna/sync-service dev

# Run the marketing site
pnpm --filter @zeckna/web dev

# Serve documentation
pnpm --filter @zeckna/docs start

# Mobile (requires native toolchain)
cd packages/mobile
pnpm ios     # or pnpm android
```

## Development

```
# Core WASM + unit tests
pnpm --filter @zeckna/core test

# SDK tests (requires sync-service URL or mocked responses)
pnpm --filter @zeckna/sdk test

# AI package tests
pnpm --filter @zeckna/ai test

# Mobile Jest tests
pnpm --filter @zeckna/mobile test

# Docs build
pnpm --filter @zeckna/docs build

# Sync service tests
pnpm --filter @zeckna/sync-service test
```

### Sync service configuration

`@zeckna/sync-service` proxies the public `lightwalletd` gRPC API to REST so the mobile app (and the SDK) can
sync shielded balances via viewing keys.

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP port for the sync service | `4000` |
| `LIGHTWALLETD_ENDPOINT` | gRPC endpoint (`host:port`) | `mainnet.lightwalletd.com:9067` |
| `LIGHTWALLETD_TLS_DOMAIN` | TLS domain override | `mainnet.lightwalletd.com` |

The SDK and mobile app look for `ZECKNA_SYNC_URL` to override the base URL (defaults to `http://localhost:4000`).

### Viewing Key Sync Flow

- Export the full viewing key via `wallet.exportFullViewingKey()` (SDK).
- Call the sync-service endpoints:
  - `POST /v1/lightwalletd/balance`
  - `POST /v1/lightwalletd/blocks/since`
- The mobile wallet stores balance metadata and block summaries in `StorageService` and auto-syncs every 60 seconds while active.

## License

MIT

