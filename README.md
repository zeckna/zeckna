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
│   ├── core/          # Rust library for Zcash operations
│   ├── sdk/           # TypeScript SDK with WASM bindings
│   ├── mobile/        # React Native mobile app
│   └── ai/            # AI integration layer
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Rust (for building core library)
- React Native development environment

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run mobile app (iOS)
cd packages/mobile
pnpm ios

# Run mobile app (Android)
cd packages/mobile
pnpm android
```

## Development

```bash
# Build specific package
pnpm build:core
pnpm build:sdk
pnpm build:mobile

# Run tests
pnpm test

# Clean build artifacts
pnpm clean
```

## License

MIT

