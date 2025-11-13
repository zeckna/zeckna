---
title: Transaction Pipelines
sidebar_position: 3
---

Pipelines coordinate parsing, policy checks, and transaction building with explicit checkpoints. They help you mix automated steps with human approvals.

## Pipeline lifecycle

1. **Intent capture** – parse the natural language request or structured API payload.
2. **Policy evaluation** – run the privacy advisor; require explicit approval for risky intents.
3. **Transaction assembly** – call the SDK builder to create shielded/transparent payloads.
4. **Execution** – broadcast immediately or schedule via the AI scheduler.
5. **Observability** – stream viewing key events to monitor status and notify stakeholders.

## Example definition

```ts
import { runPipeline } from '@zeckna/ai/transaction-builder';

await runPipeline({
  intent: userIntent,
  mnemonic,
  account: 0,
  broadcast: async (txBytes) => {
    await rpcClient.submitTransaction(txBytes);
  },
  hooks: {
    onPolicyCheck(result) {
      if (result.requiresReview) throw new Error('Policy review required');
    },
    onBroadcastSuccess(hash) {
      console.log('Broadcasted shielded tx', hash);
    }
  }
});
```

Pipelines are pluggable—swap in alternative broadcast hooks or integrate multi-party approvals before final submission.

