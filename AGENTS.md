# Scout coding-agent instructions

## Mandatory startup reading

At the beginning of every session, read these files in order:

1. docs/MASTER_PLAN.md — product vision, scope, phases, non-goals, acceptance rules.
2. docs/DECISIONS.md — accepted decisions and open approval gates.
3. docs/EXECUTION_BACKLOG.md — ordered tasks; continue the first unblocked task.
4. docs/PROGRESS.md — previous work and exact next action.
5. docs/AGENT_WORKFLOW.md — session, implementation, testing, and reporting process.
6. README.md — repository overview.
7. Relevant detailed specifications before changing that area: PRODUCT_SPEC, PRIVACY_MODEL, ARCHITECTURE, DESIGN_SYSTEM, UI_REFERENCE_SPEC, BUILD_PLAN.

Do not ask the owner what to do next when the backlog contains an unblocked task. Do not ask the owner to repeat decisions already recorded.

## Project rules

- Scout is an India-first, international-ready, free/open-source personal-finance app with a social layer.
- Android-first. Current mobile stack is Expo / React Native / TypeScript.
- Authentication is mandatory. No guest mode.
- Approved sign-in methods: email/password and Google. Supabase Auth Free is selected for identity only; production configuration and limit/security verification remain required.
- Local-first: SQLite is the device source of truth.
- Cloudflare is the only approved backend ecosystem. Specific Cloudflare services and sync design remain open.
- Raw SMS/notification text must never leave the device. Sensitive ingestion itself is not approved until separately decided.
- Money uses integer minor units; INR uses paise. Never use floating-point money arithmetic.
- Detected transactions begin pending and require user review. Pending/ignored items never affect confirmed totals.
- Manual transactions may be confirmed immediately because the user explicitly created them.
- Transaction confirmation never implies social-sharing consent.
- Friendship never grants blanket access to financial records.
- Financial sharing must be explicit, scoped, previewed, revocable, and authorized.
- Use synthetic financial data only. Never commit real statements, messages, credentials, tokens, or personal financial records.
- TypeScript strict mode. Add tests for business rules and security boundaries.
- Follow docs/UI_REFERENCE_SPEC.md for all UI. Recreate real components; never use screenshots as the app UI.

## Autonomy

Choose the next unblocked task from docs/EXECUTION_BACKLOG.md. Make routine, reversible implementation decisions independently and record meaningful choices. Keep changes small and the app buildable.

Ask the owner only for decisions listed as approval gates in docs/DECISIONS.md or for a new material decision affecting privacy, security, architecture, recurring cost, product scope, legal exposure, or destructive operations. When blocked, record the decision and continue independent work.

## Architecture guardrails

- Do not replace SQLite as local source of truth.
- Do not add a backend outside Cloudflare.
- Do not choose an auth provider, Cloudflare service, sync conflict policy, or sensitive data source without approval.
- Keep provider-specific code behind adapters.
- Keep domain logic independent of React Native and vendor SDKs.
- No production auth may be faked with a mock implementation.
- Server authorization is required for remote protected resources; route guards alone are not security.
- No destructive migration or irreversible deletion without explicit approval.

## UI guardrails

- Read docs/UI_REFERENCE_SPEC.md and docs/DESIGN_SYSTEM.md before UI work.
- Follow the 15-screen reference as the visual target.
- Use the approved dark, minimal, monochrome visual language. Functional status colors are allowed only to communicate meaning.
- Do not introduce decorative green/indigo brand accents, gradients, neon, glassmorphism, or generic template dashboards.
- Implement accessible, reusable React Native components.
- Respect Android system bars, safe areas, keyboard behavior, font scaling, and navigation.
- Capture Android screenshots and compare against the reference before calling visual work complete.
- Never claim pixel-perfect without actual viewport-matched comparison.

## Verification and reporting

For every task:
1. Inspect existing code and tests.
2. Implement the smallest coherent change.
3. Add/update tests.
4. Run relevant checks.
5. Update backlog and progress.
6. Commit focused changes where repository workflow permits.
7. Report files changed, commands run, exact results, and remaining issues.

Never claim tests, builds, security reviews, or visual comparisons passed unless actually performed.

## Stop conditions

Stop only the affected task and record an owner decision when:
- Auth provider or production OAuth must be selected.
- A specific Cloudflare product/service or paid vendor must be selected.
- SMS, notification, contacts, location, or bank permissions are being introduced.
- Real bank/payment integrations or real financial data are involved.
- Privacy defaults or financial-sharing scope would change.
- Legal age/jurisdiction decisions are needed.
- A destructive migration, irreversible deletion, or production release is proposed.

Continue unrelated unblocked tasks.
## Mandatory visual reference fidelity

Before any UI implementation or UI change, read `docs/UI_REFERENCE_SPEC.md` and `docs/DESIGN_SYSTEM.md`. The owner explicitly requires the supplied 15-screen reference to be reproduced control-by-control and pixel-by-pixel as closely as Android permits: exact visual hierarchy, copy, colours, cap heights, spacing, margins, radii, borders, alignment, iconography, chart geometry and screen composition. This is an implementation contract, not inspiration.

Do not redesign, simplify, add decorative elements, substitute generic templates, or claim pixel-perfect completion without per-screen screenshot comparison against the canonical 1434 × 1536 reference. Preserve the source image at `docs/reference/scout-15-screen-reference.png`. If it is absent, stop image-based visual sign-off and ask the owner to add the original PNG; never fabricate a replacement. Android-native system bars are the only explicit platform adaptation; do not use fake iOS chrome.
