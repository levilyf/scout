# Scout

**Know your money.**

Scout is a free, open-source, India-first personal-finance app with a privacy-first social layer. It helps people understand and manage their money, then selectively share purchases, goals, progress, and financial milestones with friends.

The repository contains an active Expo / React Native implementation plus product and engineering specifications. Features remain in progress; documentation describes intended behavior and is not proof that every flow is production-ready.

## Product direction

- Android-first, international-ready foundation.
- Mandatory authentication; no guest mode.
- Email/password and Google sign-in use the selected Supabase Auth Free identity provider; production configuration and limit/security verification remain pending.
- Local-first finance data with SQLite as the device source of truth.
- Cloudflare is the only approved backend ecosystem; exact services and sync design remain open.
- Username-based friend discovery.
- Explicit, scoped, previewable, revocable social sharing.
- Detected expenses require user review before affecting confirmed totals.
- Raw SMS/notification text must never leave the device.
- Premium, minimal, dark editorial UI based on the approved 15-screen reference.

## Start here (AI coding agents)

Read these in order before doing work:

1. AGENTS.md
2. docs/MASTER_PLAN.md
3. docs/DECISIONS.md
4. docs/EXECUTION_BACKLOG.md
5. docs/PROGRESS.md
6. docs/AGENT_WORKFLOW.md
7. docs/ARCHITECTURE.md

Then read the relevant detailed specs:
- docs/PRODUCT_SPEC.md
- docs/PRIVACY_MODEL.md
- docs/DESIGN_SYSTEM.md
- docs/UI_REFERENCE_SPEC.md
- docs/BUILD_PLAN.md

## Current status

- Expo / React Native foundation and first local finance vertical slice exist. Authentication provider setup, native validation, finance edge cases, backend, and social modules remain incomplete.
- Product requirements and visual direction are documented.
- Production authentication, finance engine, transaction persistence, sync, and social backend must be verified in code before being described as implemented.
- No real financial data or sensitive integrations are approved for development.
- The next agent task is P3-07: Activity cleanup and category detail, followed by budget and finance test cleanup in docs/EXECUTION_BACKLOG.md.

## Core principles

1. Privacy by default.
2. User control over automation.
3. Financial correctness over visual polish.
4. Friendship does not grant access to financial data.
5. No automatic sharing, pressure to spend, or shame-based comparisons.
6. Use synthetic fixtures only.

## Development

No package manager, lockfile, CI, or build scripts currently exist. Recreate the minimal Expo foundation only after documenting compatibility choices; do not claim builds pass until commands run.

This is not a production-ready financial application. Do not connect real bank accounts, ingest real financial messages, or use real personal financial data during development.