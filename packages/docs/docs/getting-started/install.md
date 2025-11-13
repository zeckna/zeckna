---
title: Install the Toolchain
sidebar_position: 1
---

Zeckna uses pnpm workspaces to manage Rust, TypeScript, and React Native projects. Install the prerequisites before cloning the repository.

## Requirements

- Node.js 18.17 or newer
- pnpm 8 or newer (`corepack enable pnpm` or `npm install -g pnpm`)
- Rust toolchain (via [rustup](https://rustup.rs)) with the `wasm32-unknown-unknown` target
- `wasm-pack` for building the Rust core to WebAssembly
- Xcode and Android Studio if you plan to develop the React Native wallet locally

## Clone and bootstrap

```bash
git clone https://github.com/zeckna/zeckna.git
cd zeckna
pnpm install
```

The install script seeds all workspace dependencies but does not compile the Rust core or React Native binaries yet. Continue with [Workspaces Overview](./workspaces.md) to understand the project layout.

