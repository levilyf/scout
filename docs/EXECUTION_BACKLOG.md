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
- [x] **P0-02 Documentation consistency:** aligned implementation-status claims across README, PRODUCT_SPEC, DECISIONS, backlog, and PROGRESS with ARCHITECTURE. Verified 2026-11-27; no product decisions changed. Commit `a3ed748`.
- [x] **P0-03 Route inventory:** produced `docs/ROUTE_INVENTORY.md` covering PRODUCT_SPEC routes, auth, parent navigation, state requirements, access rules, and release phase. Verified 2026-11-27; commit `4425f18`.
- [x] **P0-04 Product scope map:** produced `docs/SCOPE_MAP.md` marking MVP, later, proposed/validation-dependent, decision-gated, and prohibited scope. Verified 2026-11-27; commit `c8c0e5b`.
- [x] **P0-05 Baseline CI:** attempted install, typecheck, lint, tests, format check, Expo doctor, and Android checks. All project checks unavailable or failed because no `package.json`, lockfile, source tree, CI, or Android project exists. Verified 2026-11-27; commit `84154dc`.

## Phase 1 — Technical and UI foundation

- [x] **P1-01 Expo/React Native compatibility:** recorded environment and registry baseline in `docs/COMPATIBILITY.md`; scaffold/package alignment and Android/CI validation remain pending scaffold creation. Verified 2026-11-27; commit `439eb06`.
- [x] **P1-02 Workspace health:** recorded missing manifests, workspace, lockfile, scripts, strict TS, lint, format, and CI in `docs/WORKSPACE_HEALTH.md`; recreated minimal Expo workspace and committed lockfile. Verified 2026-11-27; commit `d90f14d`.
- [x] **P1-03 Design tokens:** centralized Scout colors, spacing, radii, typography, elevation, icon sizes, and motion values in `src/design/tokens.ts`. Values follow DESIGN_SYSTEM/UI_REFERENCE_SPEC baseline; final measured tuning remains open. Verified 2026-11-27; commit `ce95610`.
- [x] **P1-04 Typography and icons:** inspected installed dependencies/assets; recorded system sans-serif baseline and deferred single outline icon-family selection in `docs/TYPOGRAPHY_ICONS.md`. Verified 2026-11-27; commit `da107a1`.
- [x] **P1-05 Shared UI primitives:** added typed React Native primitives in `src/ui/primitives.tsx` for screen shell, labels, buttons, fields, cards, dividers, icon buttons, and centered loading/empty/error states. Verified 2026-11-27; commit `396ad83`.
- [x] **P1-06 Navigation shell:** added typed root/tab routes and five-tab Home, Activity, Social, Budgets, Profile shell in `src/navigation/`. Profile remains configurable at route level; final Profile/More decision remains open. Verified 2026-11-27; commit `e971122`.
- [x] **P1-07 Local SQLite foundation:** selected Expo SQLite `15.1.4`; added versioned migration/client in `src/database/` with account-scoped owner IDs and transaction constraints. Repository and migration runtime tests remain pending test foundation. Verified 2026-11-27; commit `90995ac`.
- [x] **P1-08 Domain package:** added typed currency/money, entity IDs, transaction/account types, integer minor-unit validation, currency guards, and formatting in `src/domain/`. Pure tests remain pending P1-09. Verified 2026-11-27; commit `1216834`.
- [x] **P1-09 Test foundation:** added Vitest, domain test conventions, `docs/TESTING.md`, and initial money/ID tests. Repository, component, navigation, and Android smoke tests remain pending their runtime environments. Verified 2026-11-27; commit `1b3f28d`.

## Phase 2 — Authentication and onboarding

- [!] **P2-01 Auth provider decision pack:** owner rejected external managed identity providers. `docs/AUTH_PROVIDER_DECISION.md` now records D-015; exact Cloudflare-compatible identity service remains blocked. Verified 2026-11-27.
- [x] **P2-02 Auth adapter contract:** added provider-independent auth/session types and sign-in, sign-up, Google, verification, recovery, refresh, sign-out, and deletion interfaces in `src/auth/contracts.ts`; added boundary validation tests. No provider SDK or production implementation. Verified 2026-11-27; commit `f35c36c`.
- [~] **P2-03 Login and sign-up UI:** basic test-adapter screen exists in `src/auth/AuthScreen.tsx`; incomplete: Google action, full auth navigation, complete states, and production adapter integration. No production auth or Google SDK. Partial commit `5542355`.
- [~] **P2-04 Recovery and verification UI:** basic test-adapter recovery and verification screens exist in `src/auth/RecoveryScreen.tsx`; incomplete: resend cooldown, open-email action, reset completion, and production provider flow. Partial commit `3d0f429`.
- [x] **P2-05 Protected route guard:** added provider-neutral route state guard with loading, signed-out, expiry-boundary, and protected states plus guard tests in `src/auth/routeGuard.ts`. UI/session persistence integration remains pending. Verified 2026-11-27; commit `515ab1e`.
- [!] **P2-06 Secure session storage:** blocked until exact Cloudflare-compatible identity service and secure native session approach are approved. No provider SDK or token storage added.
- [~] **P2-07 Onboarding:** added profile, username availability, currency, privacy, optional account-name step, completion UI, and owner-scoped SQLite persistence in `src/onboarding/` and migration v4. Still incomplete: authenticated completion routing and production username uniqueness enforcement.
- [~] **P2-08 Auth security tests:** added provider-independent route/session boundary tests in `src/auth/security.test.ts`; incomplete: account linking, token leakage, and local database isolation tests require provider/storage integration.

## Phase 3 — Private finance core

- [x] **P3-01 Data model review:** documented account, category, transaction, transfer, budget, ownership, money, aggregate, deletion, and migration invariants in `docs/DATA_MODEL.md`. No destructive schema change made. Verified 2026-11-27; commit `0660b14`.
- [x] **P3-02 Account management:** added owner-scoped account creation/list repository and migration v2 opening-balance/archive columns in `src/database/accounts.ts` and `src/database/migrations.ts`. Edit/archive UI and balance history remain pending. Verified 2026-11-27; commit `f544060`.
- [x] **P3-03 Categories:** added owner/system category schema migration v3 and owner-scoped create/list repository with expense/income kind validation in `src/database/categories.ts`. Category edit/archive and transaction assignment remain pending. Verified 2026-11-27; commit `ac975e1`.
- [x] **P3-04 Money utilities:** added integer minor-unit parsing, formatting, add/subtract/sum aggregation, safe-integer validation, and currency mismatch guards with tests in `src/domain/money.ts`. Verified 2027-11-28; commit `4e36fa6`.
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
