# Typography and Icons

**Status:** Baseline choice recorded; final visual tuning remains open.

## Typography

Use platform system sans-serif for initial implementation:

- Android: system sans-serif.
- iOS: system sans-serif fallback.
- Web: platform sans-serif fallback.

Reason: no font package or license is currently approved; system typography avoids added dependency, licensing risk, and bundle weight. Keep typography centralized in `src/design/tokens.ts`. Revisit after measured screenshot comparison and typeface licensing decision O-010.

## Icons

No icon dependency is installed. Use native text/icon placeholders only while shared primitives are built; do not use emoji as final functional icons. Select one outline icon family before navigation and screen UI implementation. Selection must consider:

- Expo SDK 58 compatibility.
- Android rendering consistency.
- Stroke weight and optical alignment with UI_REFERENCE_SPEC.
- Accessibility labels and touch targets.
- License and bundle cost.

Google sign-in must use the official Google mark when auth UI is implemented. Do not fabricate a Scout-colored Google icon.

## Current inventory

- Fonts: no bundled fonts.
- Icons: no icon package.
- `expo-status-bar`: scaffold dependency only.
- Generated app assets: scaffold defaults; not final brand artwork.

## Acceptance

- No arbitrary font or icon dependency added.
- Tokens provide shared type hierarchy.
- Final icon selection and custom font remain explicit follow-up decisions, not hidden implementation assumptions.
