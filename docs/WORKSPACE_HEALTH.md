# Workspace Health

**Status:** Baseline recorded; workspace creation pending.

## Current state

Checked 2026-11-27:

- No `package.json` exists.
- No `pnpm-workspace.yaml` exists.
- No `pnpm-lock.yaml` exists.
- No `tsconfig.json`, ESLint config, or Prettier config exists.
- No `apps/`, `packages/`, or source tree exists.
- `pnpm` is installed at `10.26.2`.
- `pnpm config get store-dir` returned `undefined`.
- Git working tree clean; `main` tracks `origin/main`.

## Required workspace contract

Before implementation work:

- Create minimal Expo mobile workspace only; do not create unused packages.
- Use strict TypeScript.
- Add scripts for start, typecheck, lint, test, and format check.
- Generate and commit lockfile with pnpm.
- Keep Expo-managed dependency versions aligned through `npx expo install`.
- Add CI only after local scripts exist and pass.
- Keep secrets, local databases, exports, credentials, and generated native artifacts out of Git.

## P1-02 result

No workspace health failures can be fixed without creating the Expo scaffold. Creating that scaffold is the next implementation task after this baseline record; it must preserve the approved architecture and avoid selecting auth/backend providers.
