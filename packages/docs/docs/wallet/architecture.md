---
title: Wallet Architecture
sidebar_position: 1
---

The React Native wallet orchestrates UI flows on top of the SDK and AI services. Key layers:

- **Storage service** (`packages/mobile/src/services/StorageService.ts`): wraps secure storage (Keychain/Keystore) with fallback encryption.
- **Wallet service** (`packages/mobile/src/services/WalletService.ts`): bridges the SDK, AI pipeline, and app state.
- **Hooks** (`packages/mobile/src/hooks/useWallet.ts`): supply components with reactive wallet state.
- **Screens** (`packages/mobile/src/screens`) for onboarding, dashboard, send/receive, and settings.

Data flows through the wallet service, which handles seed phrases, viewing keys, balances, and transaction history. AI suggestions and privacy badges surface in the UI via shared context.

