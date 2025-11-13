---
title: Secure Storage
sidebar_position: 2
---

Seed phrases and spending keys must stay encrypted. The mobile storage service provides a unified interface.

## Storage layers

1. **Platform key store** – preferred path for iOS (Keychain) and Android (Keystore).
2. **Encrypted file fallback** – AES-GCM encrypted blobs when secure storage APIs are unavailable.
3. **Viewing key cache** – optional, for fast balance checks and notifications.

## Usage

```ts
import { StorageService } from '../services/StorageService';

await StorageService.initialize();
await StorageService.saveMnemonic(mnemonic);

const restored = await StorageService.getMnemonic();
```

Rotate encryption keys periodically and wipe local storage on logout or device compromise. Pair storage events with biometric or hardware security checks for sensitive operations.

