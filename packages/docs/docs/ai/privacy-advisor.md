---
title: Privacy Advisor
sidebar_position: 2
---

The Privacy Advisor scores planned actions and recommends mitigations when they violate user-defined policies.

## Policy inputs

- **Address allowlists / denylists**
- **Transaction value limits**
- **Geofencing / jurisdiction filters**
- **Metadata sensitivity (memo fields, categories)**

## Example usage

```ts
import { evaluateIntent } from '@zeckna/ai/privacy-advisor';

const decision = await evaluateIntent({
  intent: {
    type: 'transfer',
    asset: 'ZEC',
    amountZats: 500000,
    recipient: 'zs1...',
    memo: 'Monthly payroll'
  },
  policy: {
    maxAmountZats: 1000000,
    restrictedRecipients: []
  }
});

if (decision.requiresReview) {
  // escalate to a human or queue for policy approval
}
```

The advisor returns contextual suggestions (e.g., “use shielded recipient”, “split transfer into multiple outputs”) that the UI can surface to end users or compliance operators.

