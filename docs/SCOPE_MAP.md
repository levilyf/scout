# Scout Product Scope Map

**Status:** Planning contract. Proposed and open items remain unapproved.

## Release 1 — MVP

| Area | Scope | Boundary |
|---|---|---|
| Auth | Email/password and Google UI/contracts; protected access; recovery/verification states | Provider and production OAuth remain approval-gated |
| Onboarding | Profile, username, country/currency, privacy introduction; optional completion steps | No contact upload; no sensitive permissions |
| Navigation/UI | Five-tab shell: Home, Activity, Social, Budgets, Profile; dark reference components | Profile/More final label remains open |
| Accounts | Manual accounts, types, opening balances, edit/archive | Never imply bank connection |
| Finance | Manual income, expense, transfer; categories; activity/details/edit | Integer minor units; transfers excluded from income/expense |
| Home | Confirmed totals, recent activity, quick add, pending-review entry point | No fabricated production data |
| Budgets | Basic confirmed-expense budget creation, progress, detail | No forecast treated as confirmed |
| Privacy/settings | Private defaults, privacy controls, sign-out, export contract foundation | Deletion/retention details remain open |
| Quality | Strict TS, unit/business-rule tests, accessibility baseline, offline/error states | Android screenshot QA when UI exists |

## Later, approved direction

- Savings goals and contributions.
- Recurring schedules and reminders, without auto-confirming expenses.
- Manual CSV/import flow after validation and privacy review.
- Transaction review adapter after source decision; synthetic candidates first.
- Profiles, username discovery, friend requests, block/report.
- Explicit post composer, scoped financial sharing, preview, revocation, audit.
- Feed, reactions, comments after moderation and authorization controls.
- Notifications with safe previews.
- Support, legal, licenses, account deletion lifecycle.

## Proposed or validation-dependent

- Spending insights, trend charts, monthly reports.
- Dashboard customization.
- Challenges.
- Friend comparisons.
- Ongoing category sharing.
- Media in posts.
- User-created categories.
- Narrow launch audience and first user segment.

## Decision-gated / blocked

| Item | Gate |
|---|---|
| Production auth integration | O-001 provider and session strategy |
| Cloud sync/backend | O-002 services/data layout; O-003 conflict policy |
| SMS/notification/bank detection | O-004 source and separate permission approval |
| Social relationship semantics | O-005 |
| Financial sharing scopes | O-006 |
| Final Profile/More tab label | O-007 |
| Age/jurisdiction claims | O-008 |
| Moderated feed/comments release | O-009 |
| Typeface licensing/final tokens | O-010 |
| Export/deletion retention behavior | O-011 |

## Explicit non-goals

- Guest mode.
- Automatic sharing or friendship-based financial access.
- Raw SMS/notification upload.
- Real bank/payment integrations before approval.
- Floating-point money arithmetic.
- Ads, subscriptions, paywalls, lending, investing, trading, or payment execution without owner approval.
- Screenshot images used as application UI.
