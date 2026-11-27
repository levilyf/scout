# Scout Execution Backlog

**Purpose:** Persistent ordered queue for an AI coding agent. Pick the first unblocked task. Do not ask the owner what to do next.

## Status key
- [ ] Not started
- [~] In progress
- [x] Completed and verified
- [!] Blocked by an owner decision or external dependency

Update this file after every task. Include commit/PR reference and actual test results in the task notes or progress log.

## Phase 0 — Audit and planning

- [x] **P0-01 Repository audit:** inspected all files, dependencies, workflows, build scripts, Expo compatibility, and current CI. Repository contains documentation only; app scaffold, package manifests, lockfile, tests, workflows, and build scripts are absent. Baseline checks unavailable. Verified 2026-11-27; commit `8a7764e`.
- [x] **P0-02 Documentation consistency:** aligned implementation-status claims across README, PRODUCT_SPEC, DECISIONS, backlog, and PROGRESS with ARCHITECTURE. Verified 2026-11-27; no product decisions changed. Commit `TBD`.
- [ ] **P0-03 Route inventory:** produce a route matrix for every page in PRODUCT_SPEC, including auth requirement, parent navigation, empty/loading/error/offline states, and release phase.
- [ ] **P0-04 Product scope map:** mark every feature MVP, later phase, proposed, or blocked. Do not silently promote proposed features.
- [ ] **P0-05 Baseline CI:** run install, typecheck, lint, tests, format check, and Android build where feasible. Record failures without claiming success.

## Phase 1 — Technical and UI foundation

- [ ] **P1-01 Expo/React Native compatibility:** verify Expo SDK, React Native, TypeScript, React, router, Android Gradle and CI compatibility; propose minimal compatible upgrades if required.
- [ ] **P1-02 Workspace health:** verify pnpm workspace, lockfile, scripts, strict TS, lint, format, and CI.
- [ ] **P1-03 Design tokens:** centralize colors, spacing, radii, typography, elevation, icon sizes, and motion values from UI_REFERENCE_SPEC.
- [ ] **P1-04 Typography and icons:** inspect installed fonts/licensing and icon dependencies; propose the smallest coherent choice, record it, and avoid arbitrary mixing.
- [ ] **P1-05 Shared UI primitives:** screen shell, safe area, buttons, fields, labels, cards, dividers, icon buttons, loading/empty/error states.
- [ ] **P1-06 Navigation shell:** define typed routes and five-tab shell matching the reference. Keep the Profile/More decision configurable until approved.
- [ ] **P1-07 Local SQLite foundation:** select a compatible Expo SQLite integration, implement versioned migrations, repository boundaries, account namespace, and migration tests.
- [ ] **P1-08 Domain package:** implement currency/money types, IDs, timestamps, validation primitives, and pure tests.
- [ ] **P1-09 Test foundation:** unit, component, repository, navigation, and Android smoke-test conventions.

## Phase 2 — Authentication and onboarding

- [ ] **P2-01 Auth provider decision pack:** compare suitable providers for Expo/React Native, email/password, Google sign-in, Cloudflare backend compatibility, pricing/free tier, account linking, session security, export/deletion, and vendor lock-in. Record recommendation in DECISIONS; do not integrate until approved.
- [ ] **P2-02 Auth adapter contract:** define provider-independent sign-in, sign-up, Google, verification, recovery, refresh, sign-out, and account deletion interfaces.
- [ ] **P2-03 Login and sign-up UI:** reproduce reference screens and all states with test adapter only.
- [ ] **P2-04 Recovery and verification UI:** implement verification, resend cooldown, forgot/reset password, and errors.
- [ ] **P2-05 Protected route guard:** no guest bypass; handle loading, expired session, logout, and account switch.
- [ ] **P2-06 Secure session storage:** implement only after provider and storage approach are approved.
- [ ] **P2-07 Onboarding:** profile, unique username, country/currency, privacy introduction, optional account setup, completion.
- [ ] **P2-08 Auth security tests:** route protection, account linking, token leakage prevention, session expiry, local data isolation.

## Phase 3 — Private finance core

- [ ] **P3-01 Data model review:** account, category, transaction, transfer, opening balance, audit metadata. Document invariants before migration.
- [ ] **P3-02 Account management:** create/edit/archive, account types, opening balances, balance history.
- [ ] **P3-03 Categories:** defaults, user categories if approved, category assignment and management.
- [ ] **P3-04 Money utilities:** parse/format/add/subtract/aggregate using integer minor units; multi-currency safeguards.
- [ ] **P3-05 Transaction domain:** expense, income, transfer, validation, idempotency, edit/delete rules.
- [ ] **P3-06 Manual transaction forms:** add expense, income, transfer, edit, details.
- [ ] **P3-07 Activity:** grouped list, search, filters, sorting, category details.
- [ ] **P3-08 Home dashboard:** confirmed totals only, trend and quick actions with real local data.
- [ ] **P3-09 Budgets:** create/edit/archive, progress and period calculations from confirmed expenses.
- [ ] **P3-10 Export:** local export contract, user confirmation, safe file handling.
- [ ] **P3-11 Finance test suite:** money edge cases, transfers, opening balance, edits, deletions, aggregate correctness, account isolation.

## Phase 4 — Sync and backend foundation (decision-gated)

- [ ] **P4-01 Cloudflare architecture decision:** evaluate Workers/API, D1 or other approved persistence, R2/media, Durable Objects if needed, security boundaries, cost, limits, and operational complexity. No service is assumed approved.
- [ ] **P4-02 Sync protocol decision:** define outbox, idempotency, versioning, conflict rules, tombstones, retry, account switching, and deletion propagation.
- [ ] **P4-03 API contracts:** typed request/response schemas and authorization requirements.
- [ ] **P4-04 Cloudflare implementation:** only after P4-01 approval; implement minimal required services, environment separation, secrets, migrations, and tests.
- [ ] **P4-05 Sync implementation:** local-first outbox, retry, conflict handling, offline indicators, per-account isolation.
- [ ] **P4-06 Security tests:** authorization, cross-user isolation, replay, idempotency, revocation, deletion.

## Phase 5 — Transaction review (source approval required)

- [ ] **P5-01 Source decision:** compare manual CSV import, notification access, SMS access, or other viable sources for reliability, Android restrictions, privacy, and policy. Recommend one first source.
- [ ] **P5-02 On-device privacy design:** if any message/notification source is approved, raw content remains on device and is minimized; no raw content upload or logging.
- [ ] **P5-03 Detection adapter and candidate model:** synthetic fixtures first; pending/confirmed/ignored lifecycle.
- [ ] **P5-04 Review queue UI:** approve/count, edit, ignore, restore, report, duplicate handling.
- [ ] **P5-05 Review correctness tests:** no double count, no silent approval, no pending/ignored aggregation, no automatic social sharing.
- [ ] **P5-06 Permission education and Android integration:** only after explicit owner approval and policy/security review.

## Phase 6 — Social foundation and sharing

- [ ] **P6-01 Relationship model decision:** mutual friend vs follow semantics and block behavior.
- [ ] **P6-02 Profile and username search:** unique username, rate limiting, privacy-aware discovery.
- [ ] **P6-03 Friend requests:** send, accept, reject, cancel, remove, block, unblock.
- [ ] **P6-04 Reports and moderation:** user/content reports, rate limits, content removal, operational process.
- [ ] **P6-05 Sharing model decision:** field-level scope, audience, duration, preview, revocation, audit.
- [ ] **P6-06 Post composer:** text and optional media; financial fields opt-in one by one.
- [ ] **P6-07 Feed and post detail:** server-authorized content projection; never fetch private transaction records for display.
- [ ] **P6-08 Reactions/comments:** only after abuse prevention, blocking, reporting, and moderation controls.
- [ ] **P6-09 Social privacy tests:** unauthorized access, revocation, friend removal, block, audience leakage, deleted content.

## Phase 7 — Additional modules

- [ ] **P7-01 Savings goals and contributions.**
- [ ] **P7-02 Recurring schedules and reminders; predictions never auto-confirm transactions.**
- [ ] **P7-03 Notifications inbox and safe preview settings.**
- [ ] **P7-04 Settings, appearance, currency, privacy, sessions, blocked users.**
- [ ] **P7-05 Support, feedback, legal pages, licenses.**
- [ ] **P7-06 Complete account export, deletion, retention, and backup lifecycle.**

## Phase 8 — Release readiness

- [ ] **P8-01 Visual QA:** screenshot all reference screens at matching Android viewports and compare geometry, typography, spacing, colors, and states.
- [ ] **P8-02 Accessibility:** screen reader, font scaling, contrast, touch targets, keyboard/focus.
- [ ] **P8-03 Performance:** startup, lists, database, image loading, memory, offline behavior.
- [ ] **P8-04 Security review:** auth, local storage, sync, API authorization, privacy, logging, secrets.
- [ ] **P8-05 Legal/privacy readiness:** jurisdiction and age policy, privacy disclosures, permission rationale, retention/deletion.
- [ ] **P8-06 Release pipeline:** signed Android build, versioning, release notes, rollback and crash monitoring.
- [ ] **P8-07 Final acceptance:** run complete CI and critical end-to-end journeys; publish known limitations.

## Current next task

Start with **P0-01 Repository audit**. Do not jump to feature implementation before the audit and architecture boundaries are understood.
