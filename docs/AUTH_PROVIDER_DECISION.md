# Authentication Provider Decision Pack

**Status:** Owner selected Supabase Auth Free on 2027-11-28. Integration remains gated by free-tier and security verification.

## Constraints

- Email/password and Google sign-in.
- Expo/React Native support.
- Secure sessions, refresh, verification, recovery, account linking, export/deletion.
- No custom password storage.
- No subscription or usage charge at expected Scout launch scale.
- Finance/social API, sync, and data remain Cloudflare-only.

“Free” means current provider terms allow expected launch usage without payment. Recheck pricing and limits before production integration; free tiers can change or require billing setup.

## Candidates

| Provider | Free-tier fit | Email/password + Google | Expo fit | Main risk |
|---|---|---|---|---|
| Firebase Authentication Spark | Strong candidate; verify current limits and whether billing is required for selected features | Yes | Strong Android/Expo ecosystem; native Google flow needs setup | Google/Firebase ecosystem; export/deletion and Cloudflare token verification need design |
| Supabase Auth Free | Strong candidate; verify current MAU/egress limits and billing requirements | Yes | React Native support; native Google OAuth setup needed | Adds Supabase identity dependency; Cloudflare must verify JWTs; free limits may change |
| Clerk Free | Strong candidate for small user base; verify current MAU and commercial terms | Yes | Strong Expo support | Free tier/terms may exclude intended open-source/commercial use; vendor lock-in |
| Auth0 Free | Candidate; verify current MAU, social connections, and password database limits | Yes | OIDC/Auth0 React Native flow | Free-tier limits and configuration complexity; vendor lock-in |
| Cloudflare Access | Poor fit | Google/OIDC strong; public email/password lifecycle unclear | Not consumer-signup focused | Likely needs external identity source; account lifecycle mismatch |

## Recommendation

**Firebase Authentication Spark** is first candidate to verify for a completely free Scout launch because it supports required email/password and Google methods and has mature Android integration. It still requires owner approval after current terms, limits, data export/deletion, and Cloudflare JWT verification are verified.

**Supabase Auth Free** is second candidate if Firebase's current limits or data terms fail. **Clerk** is third for Expo developer experience, but commercial/open-source terms need careful review.

Supabase Auth Free is selected for identity only. No dependency or production configuration added until verification checklist passes.

## Verification checklist before selection

1. Current free-tier limit covers expected launch users and monthly active users.
2. No credit card, paid plan, or hidden charge required for email/password and Google flows.
3. Google OAuth works in Expo Android production builds.
4. Provider JWT can be verified by Cloudflare API without sending finance data to provider.
5. Account linking does not silently merge identities.
6. User export and deletion are supported and documented.
7. Open-source Scout distribution and future commercial use terms are acceptable.
8. Outage, rate limit, abuse, and account recovery behavior are acceptable.

## Owner choice

**Selected: Supabase Auth Free.**

Before integration, verify free-tier limits, billing requirements, Expo Android Google OAuth, Cloudflare JWT verification, export/deletion, and open-source terms. If verification fails, stop integration and reopen provider choice.
