# Scout Build Plan

This file summarizes the delivery phases. The detailed, executable task queue lives in docs/EXECUTION_BACKLOG.md. The autonomous session rules live in docs/AGENT_WORKFLOW.md.

## Approved foundation

- Android-first Expo / React Native / TypeScript.
- Mandatory email/password or Google authentication; provider selection remains open.
- Local-first finance data; SQLite is the device source of truth.
- Cloudflare-only backend ecosystem; exact services and sync architecture remain open.
- Integer minor-unit money representation (paise for INR).
- Detected transactions require explicit review.
- Financial sharing is private by default and separate from friendship.
- Raw SMS/notification text must never leave the device.
- UI must follow docs/UI_REFERENCE_SPEC.md.

## Delivery phases

### Phase 0 — Audit and planning
Repository audit, dependency/CI baseline, documentation consistency, route inventory, MVP scope, and decision register.

### Phase 1 — Technical and UI foundation
Expo compatibility, workspace health, design tokens, shared components, navigation shell, SQLite migrations/repositories, domain primitives, and tests.

### Phase 2 — Authentication and onboarding
Provider comparison and owner approval, provider-independent auth adapter, login/signup/recovery/Google UI, secure sessions, protected routes, and onboarding.

### Phase 3 — Private finance core
Accounts, categories, manual transactions, activity, balances, budgets, export, and finance correctness tests.

### Phase 4 — Sync and backend (decision-gated)
Cloudflare service selection, API contracts, sync protocol, conflict rules, remote authorization, and implementation after approval.

### Phase 5 — Transaction review (source approval required)
One approved detection/import source, on-device privacy design, pending review lifecycle, duplicate handling, and permission flow.

### Phase 6 — Social foundation and sharing
Profiles, username search, friend requests, block/report, sharing permissions, posts, feed, and moderation.

### Phase 7 — Additional modules
Savings goals, recurring schedules, notifications, settings, support, legal pages, and full account lifecycle.

### Phase 8 — Release readiness
Visual QA, accessibility, performance, security, privacy/legal review, Android release pipeline, and final acceptance.

## Rules

- Follow the ordered tasks in docs/EXECUTION_BACKLOG.md.
- Do not start a later phase while its prerequisites are incomplete.
- Do not implement proposed features as approved requirements.
- Keep independent work moving when an owner decision blocks one task.
- Update docs/PROGRESS.md after each work session.
- Never claim a check passed unless it was actually run.