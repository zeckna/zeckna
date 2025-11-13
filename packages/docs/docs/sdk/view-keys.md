---
title: Viewing Keys
sidebar_position: 4
---

Viewing keys allow third parties to monitor incoming and outgoing shielded transactions without enabling spends.

## Export a viewing key

```ts
import { exportViewKey } from '@zeckna/sdk/view-keys';

const viewKey = await exportViewKey({
  seedPhrase: mnemonic,
  account: 0,
  format: 'full' // or 'incoming'
});
```

- **Full viewing key** reveals incoming and outgoing notes.
- **Incoming viewing key** provides read-only access to received notes.

## Use cases

- **Compliance**: share with auditors under NDA to prove payment flows without leaking counterparties publicly.
- **Notifications**: run watcher services that use viewing keys to trigger push notifications or AI-driven budget checks.
- **Multi-party compute**: feed viewing keys into MPC workflows to coordinate shielded treasury spending.

Always transmit viewing keys over encrypted channels and rotate them when policy changes require a narrower blast radius.

