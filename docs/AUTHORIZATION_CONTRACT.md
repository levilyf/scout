# Remote Authorization Contract

**Status:** Provider-independent contract. No backend deployed.

Every Cloudflare-protected request must validate the Supabase JWT signature using trusted issuer/JWKS configuration, then validate expiry, issuer, audience, and resource ownership. Route guards are UX only.

## Required checks

1. Parse bearer token.
2. Verify signature against trusted Supabase issuer keys.
3. Verify `iss` exact expected issuer.
4. Verify `exp` is in the future.
5. Verify expected audience.
6. Use `sub` as authenticated user ID.
7. Compare authenticated user ID with resource owner ID.
8. Reject missing, malformed, expired, wrong-issuer, wrong-audience, and cross-user requests.

`src/auth/authorization.ts` contains pure ownership/expiry/audience helpers. Signature/JWKS verification belongs at remote boundary after Cloudflare service selection and API implementation.
