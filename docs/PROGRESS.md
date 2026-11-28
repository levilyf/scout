# Scout Agent Progress

## Current state

- Fresh UI requirements read before recent screen refinement.
- Auth/onboarding foundations and first finance vertical slice exist.
- P3-05 transaction domain/repository baseline exists.
- P3-06 manual form, Home, Activity, accounts, budgets, detail/edit/delete screens exist.
- Finance aggregate rules now have pure tests.
- `pnpm test`: 18 files, 47 tests passed.
- `pnpm typecheck` passes.

## Current task

**P3-11 — Finance test suite**, partial. Aggregate rules covered; repository runtime, opening balances, edits/deletes, and transfer persistence tests remain blocked/runtime-dependent.

## Blockers

- Android/native SQLite runtime unavailable.
- Supabase Google provider/dashboard configuration.
- Cloudflare service selection before remote authorization/deletion.

## Session log

### 2027-11-28 — finance aggregate tests
- Added `src/domain/aggregates.ts`.
- Added tests proving pending/ignored exclusion and transfer exclusion from balance delta.
- `pnpm typecheck`: passed.
- `pnpm test`: 18 files, 47 tests passed.
