---
title: AI Agent Overview
sidebar_position: 1
---

Zeckna’s AI layer converts natural language intents into wallet operations. It balances local inference for lightweight commands with cloud providers for heavy planning tasks.

## Components

- **Parser** (`packages/ai/src/parser.ts`): tokenizes user phrases, extracts action verbs, recipients, assets, and amounts.
- **Privacy Advisor** (`packages/ai/src/privacy-advisor.ts`): evaluates intended actions against user policies and privacy heuristics.
- **Transaction Builder** (`packages/ai/src/transaction-builder.ts`): orchestrates RPC calls to the SDK to compile shielded transactions.
- **Scheduler** (`packages/ai/src/scheduler.ts`): queues recurring or delayed tasks and executes them when policies allow.

The AI package ships as a TypeScript library. Integrate it into bots, backend services, or the mobile wallet to provide conversational interactions.

