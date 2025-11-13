# Zeckna Setup Guide

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/zeckna/zeckna.git
   cd zeckna
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build the project**
   ```bash
   pnpm build
   ```

## Building Rust Core

The Rust core library needs to be compiled to WASM before the SDK can be used.

### Prerequisites for Rust Core

- Rust toolchain (install from https://rustup.rs/)
- wasm-pack: `cargo install wasm-pack`

### Build Steps

```bash
cd packages/core
pnpm build
```

This will:
1. Compile Rust code to WASM
2. Generate TypeScript bindings
3. Output to `pkg/` directory

## Setting Up React Native

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Setup

```bash
cd packages/mobile
pnpm install
```

### iOS Setup

```bash
cd ios
pod install
cd ..
pnpm ios
```

### Android Setup

```bash
pnpm android
```

## Environment Variables

Create `.env` files as needed:

- `packages/mobile/.env` - Mobile app configuration
- `packages/ai/.env` - AI service API keys (optional)

## Troubleshooting

### WASM Build Issues

- Ensure Rust is installed: `rustc --version`
- Install wasm-pack: `cargo install wasm-pack`
- Clean and rebuild: `cd packages/core && cargo clean && pnpm build`

### React Native Issues

- Clear cache: `pnpm start --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- For iOS: `cd ios && pod install`

### pnpm Workspace Issues

- Ensure pnpm is installed: `pnpm --version`
- Clear pnpm store: `pnpm store prune`
- Reinstall: `rm -rf node_modules && pnpm install`

