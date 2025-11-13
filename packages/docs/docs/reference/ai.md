---
title: AI Reference
sidebar_position: 3
---

The `@zeckna/ai` package exports modular functions for natural language processing, privacy scoring, and scheduling.

```ts
import {
  parseCommand,
  evaluateIntent,
  buildTransactionPipeline,
  scheduleTask
} from '@zeckna/ai';
```

| Function | Description |
|----------|-------------|
| `parseCommand(input)` | Returns structured intent objects extracted from free-form text. |
| `evaluateIntent(args)` | Runs privacy heuristics and policy checks. |
| `buildTransactionPipeline(args)` | Composes parsing, policy, and SDK builders into a pipeline. |
| `scheduleTask(task)` | Persists scheduled transfers or reminders. |

AI modules are framework-agnostic. They can plug into backend APIs, CLI tools, or the mobile wallet, and they interoperate with the SDK by design.

