# Testing Foundation

## Commands

- `pnpm typecheck` — strict TypeScript.
- `pnpm test` — Vitest tests.
- `pnpm lint` — current strict TypeScript lint baseline.
- `pnpm format:check` — reserved for Prettier after formatter dependency/config is added.

## Test layers

- `src/**/*.test.ts`: pure domain and business-rule tests.
- Database tests: migration/schema/repository tests once Expo SQLite runtime test setup exists.
- Component/navigation tests: add after a React Native test renderer strategy is selected.
- Android smoke tests: run on device/emulator when Android build environment exists.

## Rules

- Test financial invariants and privacy/security boundaries.
- Use synthetic fixtures only.
- Do not log tokens, raw financial messages, or personal records.
- Watch tests fail before implementation for new behavior where test infrastructure permits.
