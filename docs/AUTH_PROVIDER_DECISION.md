# Authentication Provider Decision Pack

**Status:** Owner allows external managed identity only when completely free for expected Scout use. Finance/social backend and data remain Cloudflare-only. Provider selection remains open.

## Non-negotiable requirements

- Email/password and Google sign-in.
- Expo/React Native support with secure native session handling.
- Provider SDK behind adapter; no provider logic in domain/UI.
- Verified identity and explicit account linking.
- Session refresh/revocation and account deletion/export support.
- Server-side authorization for protected Cloudflare resources.
- No custom password table or homemade password hashing.
- No tokens in logs, plain AsyncStorage, analytics, or source control.
- Free/open-source product direction; recurring cost needs approval.

## Candidates

| Candidate | Strengths | Risks / open verification |
|---|---|---|
| Cloudflare Zero Trust Access | Cloudflare ecosystem alignment; strong workforce/API access controls | Consumer mobile auth UX, email/password signup, Google account lifecycle, and user account deletion need verification; may not fit public consumer app |
| Clerk | Polished Expo/React Native auth UI and social login; provider handles password/session security | External backend/auth dependency conflicts with Cloudflare-only direction unless explicitly approved; pricing, export, deletion, and lock-in need current verification |
| Auth0 | Mature email/password, Google, OAuth/OIDC, sessions, enterprise controls | External vendor; Expo native flow and free-tier limits need current verification; cost and lock-in |
| Supabase Auth | Email/password, Google, mobile SDK, export-friendly primitives | Adds Supabase ecosystem beside Cloudflare; remote auth/data boundary and pricing need approval |
| Firebase Authentication | Mature Google/email auth and Android integration | Adds Google Firebase ecosystem; Cloudflare-only constraint, Expo setup, export/deletion, and vendor coupling need approval |
| Custom auth on Cloudflare | Maximum ecosystem control | Rejected for password storage/security complexity; would violate architecture rule against homemade password storage unless using a separately approved identity service |

## Recommendation

Do not integrate a provider yet. First owner decision: whether “Cloudflare-only backend ecosystem” permits an external identity provider. If no, evaluate a Cloudflare-compatible managed identity product that supports consumer email/password and Google flows; do not build password auth manually.

If external identity providers are approved, compare Clerk, Auth0, Supabase Auth, and Firebase using current vendor documentation and owner-approved cost/privacy criteria. No candidate is selected by this document.

## Adapter contract regardless of provider

```text
signUp(email, password)
signIn(email, password)
signInWithGoogle()
verifyIdentity()
resendVerification()
requestPasswordReset(email)
refreshSession()
signOut()
requestAccountDeletion()
```

Adapter output must expose provider-neutral user ID, session state, expiry, and verification state. Provider tokens remain inside auth/session infrastructure.

## Decision outcome

Owner chose **A with zero-cost constraint**: external managed identity is allowed for identity only, provided expected Scout usage is completely free. All finance/social backend services and data remain Cloudflare-only. Do not build custom password storage.
