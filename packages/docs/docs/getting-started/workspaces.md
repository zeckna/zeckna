---
title: Workspace Layout
sidebar_position: 2
---

Zeckna lives in a pnpm monorepo under `packages/`. Each package targets a distinct layer of the stack.

| Package | Description | Key Scripts |
|---------|-------------|-------------|
| `core` | Rust crate compiling to WebAssembly for shielded operations. | `pnpm --filter @zeckna/core build` |
| `sdk` | TypeScript wrapper and WASM loader for Node, web, and React Native clients. | `pnpm --filter @zeckna/sdk build` |
| `mobile` | React Native wallet app. | `pnpm --filter @zeckna/mobile ios` / `android` / `test` |
| `ai` | Natural-language parser, privacy advisor, and agent scheduling. | `pnpm --filter @zeckna/ai test` |
| `web` | Marketing site powered by Next.js. | `pnpm --filter @zeckna/web build` |
| `docs` | Documentation site (Docusaurus). | `pnpm --filter @zeckna/docs build` |

Workspace commands run in **topological order**, so dependencies build first. Use `pnpm -r build` to compile everything, or add the `--filter` flag to target specific packages.

Continue with [Configuration](./configuration.md) to set up environment variables and secrets.

