# Scout Agent Progress

## Current state

- Expo / React Native application foundation and local finance vertical slice exist.
- Authentication UI, Supabase adapter/session work, onboarding, SQLite, accounts, categories, transactions, Home, Activity, Budgets, and CSV export are partially implemented.
- P3-05 transaction domain/repository partial; native runtime tests remain.
- P3-06 forms/detail/edit/delete partial.
- P3-07 Activity search now matches stored transaction type, amount, date, category/account IDs, and currency; category detail remains.
- P3-08 Home chart/time filters and full reference widgets remain.
- P3-09 weekly/monthly period-aware budget calculation added with tests; runtime validation remains.
- P3-10 CSV export/share implemented; Android share-sheet validation remains.
- P3-11 pure aggregate, transaction search, and budget-period tests expanded; native persistence tests remain.
- Last recorded local checks: `pnpm test` 19 files / 48 tests passed; `pnpm typecheck` passed; Expo Doctor 20/20 passed (from prior agent session, not rerun in this session).
- Fresh GitHub Actions workflows added for CI and debug APK build. First run status not yet verified.

## Current task

Continue P3-07 Activity cleanup and category detail. Then verify budget-period changes through GitHub Actions and complete P3-11 pure edge-case tests.

## Blockers

- Android emulator/device not available in the prior agent session; native UI, share sheet, and SQLite runtime validation remain unverified.
- Supabase Auth Free is selected for identity only. Google OAuth/dashboard configuration, JWT verification at Cloudflare, free limits, billing requirements, and production readiness remain to be verified.
- Cloudflare service selection and sync conflict policy require an architecture decision before backend implementation.
- Native SQLite runtime tests unavailable in the prior agent session.
- Transaction detection source and sensitive permissions remain unapproved.

## Session log

### 2026-11-28 — continuation after coding-agent token limit
- Reviewed current repository state and corrected stale README claims that said the repo contained documentation only.
- Added pure calendar-period budget calculations: monthly calendar windows and Monday-to-Monday weekly windows.
- Budget progress now calculates independently for each budget and excludes pending, ignored, income, transfer, other-currency, and out-of-period records.
- Added unit tests for period boundaries and financial inclusion/exclusion rules.
- Added fresh GitHub Actions workflows: CI verification and Android debug APK artifact build.
- Fixed Activity search, which previously filtered only transaction type, by adding tested matching for all currently stored searchable fields. Merchant-name search remains impossible until merchant/description is part of the transaction model.
- Set Expo app appearance and Android adaptive-icon background to dark/black.
- Reconciled the Supabase Auth Free selection across agent instructions, README, architecture, build plan, and decision register. Production setup and verification remain pending.
- No local test/build commands were run in this session. Awaiting GitHub Actions execution/results.


### 2026-11-28 — UI implementation continuation
- Replaced the generic text-only bottom navigation with a five-destination icon-and-label tab bar matching the reference composition.
- Added a Settings/Profile hub with identity header and rows for privacy, notifications, appearance, currency, help and about.
- Added Account screen with export, deletion disclosure (explicitly states deletion is not yet wired), sign out, and version label.
- Added Support screen visual shell and FAQ/contact/bug/terms rows; actions are not yet connected and must not be represented as complete.
- Added a Social feed empty state and connected it to the Social tab. It intentionally does not fabricate friends, posts, purchases or financial data.
- Wired Profile, Account, Support and Social routes into the app.
- Changes committed to main in commits: `d3bbb34`, `2db0615`, `3450ccf`, `155d229`.
- Validation limitation: this environment could not resolve github.com from the container, so pnpm install, typecheck, tests and APK build could not be run locally. GitHub Actions status was queried for the app commit but returned no workflow runs at query time.
- UI reference PNG is still not present in the repository. Exact pixel comparison remains blocked until the original PNG is committed at `docs/reference/scout-15-screen-reference.png`.


### 2026-11-28 — Home dashboard implementation
- Replaced the generic Home screen with a dark dashboard layout based on the supplied reference: Scout wordmark, balance visibility toggle, confirmed-balance total, spending trend, line chart, range chips, pending-review card, quick actions and recent activity.
- Chart values are calculated from confirmed INR expense records only. Pending transactions are shown separately and never enter balance or spending totals.
- Added real data-backed pending count and recent transaction rows; empty states are explicit rather than filled with invented demo data.
- Wired Set Budget, Review Pending, and View All actions to existing app routes.
- Home range selector currently updates the selected visual state; chart range aggregation needs implementation before the range controls can be called functionally complete.
- Changes committed: `c7cfcd0` and App route wiring commit recorded in GitHub.
- Validation remains pending: no local install/typecheck/test/APK execution available in this environment; GitHub Actions run status still needs checking.


### 2026-11-28 — Home and Activity visual pass
- Home dashboard: added dynamic chart buckets for 1D, 1W, 1M, 3M and 1Y based on confirmed INR expenses. The range control now changes the data window instead of only changing its selected appearance.
- Activity: rebuilt the list hierarchy with Scout-style header, search field, selected filter chips, date groups, icon containers, right-aligned signed amounts and explicit pending/ignored status metadata.
- Activity search/filter/sort remain data-backed; no merchant logos or vendor names are invented because the current transaction schema does not store them.
- Budget and pending-review actions on Home are wired to existing app routes.
- Commits: `e90eded` (Home chart ranges), `1769803` (Activity visual pass), plus earlier Home commits `c7cfcd0` and `9c402ed`.
- Validation still pending. No successful local typecheck/test/APK build has been run in this environment, and GitHub workflow queries have not returned runs. Treat the current UI as implementation-in-progress, not visually signed off.
