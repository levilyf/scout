# Scout Decision Register

This file is the canonical record of owner decisions. Agents must update it when a decision is made. Never silently convert a proposal into an accepted decision.

## Status meanings

- **Accepted:** owner-approved; implement within stated boundaries.
- **Proposed:** recommended, not yet approved.
- **Open:** requires a decision before dependent work.
- **Rejected:** do not implement unless explicitly reconsidered.

## Accepted decisions

| ID | Decision | Constraints / notes |
|---|---|---|
| D-001 | Product working name is Scout | Tagline: “Know your money.” |
| D-002 | Android-first | Approved mobile stack is Expo / React Native; repository audit found scaffold absent and recreation remains pending. |
| D-003 | Mandatory authentication | No guest mode. |
| D-004 | Email/password and Google sign-in | Provider and native OAuth strategy remain open. |
| D-005 | Username-based friend discovery | No automatic financial visibility from friendship. |
| D-006 | Explicit financial sharing | Sharing must be scoped, previewed, revocable, and separate from transaction confirmation. |
| D-007 | Detected transactions require review | Pending/ignored never affect confirmed totals; manual entries may be confirmed immediately. |
| D-008 | Premium minimal dark visual direction | Supplied 15-screen image is the visual reference; implement native components, not screenshots. |
| D-009 | Local-first with SQLite as device source of truth | Local actions persist locally first; remote sync is a separate concern. |
| D-010 | Cloudflare-only backend ecosystem | Exact Cloudflare services and remote data responsibilities remain open. |
| D-011 | Raw SMS/notification text must never leave device | Any future ingestion requires separate approval and on-device processing/minimization. |
| D-012 | Integer minor units for money | INR calculations/storage use paise; no floating-point money arithmetic. |
| D-013 | Free/open-source direction | No subscriptions, ads, paywalls, or monetization without owner approval. |
| D-014 | India-first, international-ready | INR proposed default; currency and locale must not be hardcoded globally. |
| D-015 | External managed identity allowed for identity only | Owner allows external managed identity only if service is completely free for Scout's expected use; finance/social backend and data remain Cloudflare-only. Do not build custom password storage. Provider selection remains open. |

## Open decisions

| ID | Decision needed | Why it matters | Safe work that can continue |
|---|---|---|---|
| O-001 | Authentication provider | Account creation, Google OAuth, session lifecycle, verification | Auth interfaces, mock adapters in tests, screen UI, route contracts |
| O-002 | Cloudflare services and remote data layout | API, remote persistence, media, auth verification, sync | Local SQLite, domain layer, API contracts, threat model |
| O-003 | Sync protocol and conflict policy | Offline edits, multi-device behavior, deletion | Outbox interface and local sync metadata design |
| O-004 | First transaction detection/import source | Android permissions and reliability | Manual finance flows, generic detection interface, synthetic candidates |
| O-005 | Friend relationship semantics | Mutual friends vs follow model affects UX and schema | Profile UI and provider-independent relationship concepts |
| O-006 | Financial sharing scopes | Which fields, audiences, periods, and duration can be shared | One-off post composer prototype with synthetic fields; no live sharing |
| O-007 | Final bottom navigation labels/order | Reference says Profile; product draft says More | Build tab shell behind a central route config; do not hardcode deep links |
| O-008 | Age eligibility and launch jurisdictions | Legal/privacy requirements | Avoid collecting unnecessary age data; prepare compliance checklist |
| O-009 | Social moderation operations | Required before comments/feed release | Block/report UX and threat modeling |
| O-010 | Typeface and final measured design tokens | Licensing and screenshot fidelity | Use existing system font temporarily; centralize tokens |
| O-011 | Data export format and deletion/backup retention | Privacy and account lifecycle | Define export contract and deletion state machine |
| O-012 | Product launch audience | Prioritization and onboarding copy | Build India-first core without assuming narrow demographics |

## Rejected / prohibited until reconsidered

- Guest/anonymous access to main app.
- Automatic sharing of transactions or balances.
- Friendship as blanket permission to financial data.
- Uploading raw SMS/notification text.
- Floating-point arithmetic for money.
- Screenshot-as-UI.
- Unapproved bank/payment integrations.
- Unapproved subscriptions, ads, lending, investing, or payment execution.

## Decision procedure

1. Agent identifies the exact decision and dependent work.
2. Agent records options, trade-offs, recommendation, reversibility, privacy/security impact, and cost.
3. Agent asks the owner one focused question only when the decision blocks safe progress.
4. After owner approval, agent updates this register and every affected specification.
5. Agent resumes the backlog without asking the owner to repeat the decision.

Routine reversible choices should be made by the agent and recorded as implementation notes, not escalated.
