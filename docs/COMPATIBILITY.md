# Expo / React Native Compatibility

**Status:** Baseline recommendation; no app scaffold installed yet.

## Environment baseline

Checked 2026-11-27:

- Node: `v24.18.0`
- npm: `11.19.0`
- pnpm: `10.26.2`
- `expo`: not globally installed
- `gradle`: not installed
- `adb`: installed

## Registry snapshot

`npm view` reported:

- Expo: `58.1.0`
- Expo Router: `58.0.33`
- React Native: `0.88.1`
- React: `19.3.1`
- TypeScript: `7.0.2`

These are registry snapshots, not approved project pins. Expo SDK must select its matching React and React Native versions through `create-expo-app`/Expo install tooling. Do not independently pin React Native or upgrade across SDKs.

## Recommendation

Use the current stable Expo SDK available when scaffold creation starts, generated with `create-expo-app`, then use `npx expo install` for Expo-managed dependencies. Pin the generated versions in `package.json` and commit the lockfile. Use TypeScript strict mode.

Keep Android builds managed by Expo until native requirements force prebuild. Validate with `npx expo-doctor`, TypeScript, lint, tests, and an Android smoke build after scaffold creation.

## Blockers and risks

- No `package.json`, Expo app, lockfile, Android project, or CI exists to validate.
- `npx expo --version` could not complete within 60 seconds while attempting temporary package installation; this is not an app failure.
- Node 24 compatibility with selected Expo SDK remains unverified. Prefer the Expo-supported Node LTS version documented for the selected SDK if validation rejects Node 24.
- Android SDK/Gradle compatibility remains unverified because no project exists and `gradle` is absent.

## Acceptance for P1-01

Complete after scaffold creation confirms:

1. Expo SDK, React, React Native, Expo Router, and TypeScript versions align.
2. `npx expo-doctor` passes or documented warnings are accepted.
3. Android build path works on supported environment.
4. Strict TypeScript and package scripts exist.
5. No provider, backend, or sensitive permission dependency is introduced.
