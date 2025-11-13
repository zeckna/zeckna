---
title: Mobile Build Targets
sidebar_position: 3
---

The React Native application is configured for both iOS and Android using Expo-less bare workflows.

## Development commands

```bash
pnpm --filter @zeckna/mobile start        # Metro bundler
pnpm --filter @zeckna/mobile ios          # Run on iOS simulator
pnpm --filter @zeckna/mobile android      # Run on Android emulator
pnpm --filter @zeckna/mobile test         # Jest unit tests
```

Metro is configured to pick up the WASM bundle produced by `@zeckna/core`. Always run the core build first when changing Rust code:

```bash
pnpm --filter @zeckna/core run build
pnpm --filter @zeckna/sdk build
```

## Release checklist

- Configure app identifiers and bundle IDs.
- Provide App Store / Play Store icons and splash screens.
- Ensure biometric prompts wrap sensitive flows (send, export keys).
- Run end-to-end smoke tests on real devices before shipping.

