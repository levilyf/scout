# Supabase Auth Free Verification

**Checked:** 2027-11-28

## Verified locally

- `@supabase/supabase-js` current npm version: `2.119.2`.
- License: MIT.
- Package is compatible with a provider adapter approach.
- No package installed yet.

## Not verified locally

- Supabase dashboard free-plan limits and billing/card requirements.
- Google OAuth production configuration for Expo Android.
- Supabase JWT verification in Cloudflare Worker/API.
- Account export/deletion behavior and retention.
- Current commercial/open-source terms at launch scale.

## Decision

Do not integrate yet. npm metadata proves package availability and license only. It does not prove zero cost or production security requirements.

## Required owner-side verification

1. Confirm current Supabase Free plan supports expected Scout users/MAU without paid upgrade or hidden usage charge.
2. Confirm email/password and Google provider do not require billing setup.
3. Configure Google OAuth redirect URIs for Expo development and Android production package.
4. Verify Cloudflare API can validate Supabase JWTs using published JWKS or issuer metadata.
5. Define deletion/export flow across Supabase identity and Cloudflare-owned data.
6. Confirm terms permit Scout open-source distribution and intended future use.

Until these pass, keep test adapter and provider-neutral contracts. Do not commit Supabase URL, anon key, service key, OAuth secret, or real credentials.
