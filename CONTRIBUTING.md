<<<<<<< HEAD
# Contributing to Zeckna

Thank you for your interest in contributing to Zeckna!

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Rust (for building core library)
- React Native development environment (for mobile app)

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm build:core
pnpm build:sdk
pnpm build:mobile
pnpm build:ai
```

### Development

```bash
# Run in development mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Project Structure

- `packages/core/` - Rust library compiled to WASM
- `packages/sdk/` - TypeScript SDK wrapper
- `packages/mobile/` - React Native mobile app
- `packages/ai/` - AI integration layer

## Building Rust Core

```bash
cd packages/core
pnpm build
```

This will compile the Rust code to WASM using `wasm-pack`.

## Running Mobile App

```bash
cd packages/mobile
pnpm start
pnpm ios    # For iOS
pnpm android # For Android
```

## Code Style

- TypeScript: Follow the existing code style
- Rust: Use `cargo fmt` for formatting
- Commits: Use conventional commit messages

## Testing

- Rust: `cargo test` in `packages/core`
- TypeScript: `pnpm test` in respective packages

## Security

- Never commit private keys or seed phrases
- All sensitive data should use encrypted storage
- Review security implications of changes

=======
# Contributing to Zeckna

Thank you for your interest in contributing to Zeckna!

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Rust (for building core library)
- React Native development environment (for mobile app)

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Build specific package
pnpm build:core
pnpm build:sdk
pnpm build:mobile
pnpm build:ai
```

### Development

```bash
# Run in development mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

## Project Structure

- `packages/core/` - Rust library compiled to WASM
- `packages/sdk/` - TypeScript SDK wrapper
- `packages/mobile/` - React Native mobile app
- `packages/ai/` - AI integration layer

## Building Rust Core

```bash
cd packages/core
pnpm build
```

This will compile the Rust code to WASM using `wasm-pack`.

## Running Mobile App

```bash
cd packages/mobile
pnpm start
pnpm ios    # For iOS
pnpm android # For Android
```

## Code Style

- TypeScript: Follow the existing code style
- Rust: Use `cargo fmt` for formatting
- Commits: Use conventional commit messages

## Testing

- Rust: `cargo test` in `packages/core`
- TypeScript: `pnpm test` in respective packages

## Security

- Never commit private keys or seed phrases
- All sensitive data should use encrypted storage
- Review security implications of changes

>>>>>>> 384333b4dbf53ee63ee07036a6e4426406fe2875
