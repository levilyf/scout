# Scout Master Plan

**Purpose:** This is the single project-level plan for product, engineering, design, quality, and release. It tells an AI coding agent what Scout is, what to build, in what order, what not to invent, and how to prove work is complete.

**Project:** Scout  
**Tagline:** Know your money.  
**Positioning:** Free, open-source, India-first personal-finance app with a privacy-first social layer and an international-ready foundation.  
**Platform priority:** Android first.  
**Repository:** `levilyf/scout`

## 1. Source-of-truth hierarchy

When documents disagree, use this order:

1. Explicit owner decisions recorded in `docs/DECISIONS.md`.
2. Product and privacy requirements in `docs/PRODUCT_SPEC.md` and `docs/PRIVACY_MODEL.md`.
3. The mandatory screen-by-screen visual contract in `docs/UI_REFERENCE_SPEC.md`.
4. Technical boundaries in `docs/ARCHITECTURE.md`.
5. Execution order and task status in `docs/EXECUTION_BACKLOG.md`.
6. Shared visual tokens in `docs/DESIGN_SYSTEM.md`.
7. This master plan and `AGENTS.md`.

If two approved requirements conflict, do not silently pick one. Record the conflict in `docs/DECISIONS.md` and stop only the affected task. Continue independent work.

## 2. Product vision

Scout helps people understand, organize, and improve their finances. It combines practical personal finance tools with a social layer where people can deliberately share purchases, goals, progress, and financial milestones.

The social layer must not reward overspending, shame people, or expose private financial information. Saving, budgeting, debt reduction, learning, and consistency should be as valued as purchases.

### Product principles

- Private by default.
- User control over automation.
- Financial correctness over visual polish.
- Explainable transaction detection and review.
- Friendship is not financial-data permission.
- Sharing is explicit, scoped, previewable, and revocable.
- No dark patterns, shame loops, or pressure to spend.
- Free and open-source product direction; do not add subscriptions, paywalls, or monetization without approval.
- India-first defaults, but avoid hardcoding assumptions that prevent internationalization.

## 3. Approved product decisions

- Product working name: Scout.
- Tagline: “Know your money.”
- Android-first.
- Mandatory sign-up/login. No guest mode.
- Approved authentication methods: email/password and Google sign-in.
- Users can find people using unique usernames.
- Friend relationships never grant blanket access to financial records.
- Detected transactions begin pending and require user review.
- Pending and ignored detections do not affect confirmed financial totals.
- Manual entries may be confirmed immediately because the user created them.
- Transaction confirmation and social sharing are separate actions.
- Dark, minimal, premium editorial UI based on the supplied 15-screen reference.
- Recreate reference screens with real native components, not screenshot backgrounds.

## 4. Intended users and launch scope

Initial product context is India-first, with INR as the proposed default currency and Android as the first supported platform. Keep money, dates, locale, currency formatting, and text ready for additional countries.

Do not assume a specific age group, financial institution, bank integration, or payment provider until approved.

### First usable release

The first release should prove that a user can:
1. Create an account and securely sign in.
2. Complete basic profile setup.
3. Create and manage manually tracked financial accounts.
4. Add income, expenses, and transfers.
5. Understand confirmed balances and activity.
6. Create and monitor a basic budget.
7. Export their own data.
8. Understand and control privacy settings.

Transaction detection/import and social publishing are later phases because they add permission, privacy, abuse, and data-quality risks.

## 5. Product modules

### Foundation
- Authentication and account lifecycle.
- Profile and unique username.
- Onboarding.
- Navigation and route guards.
- Design system and reusable components.
- Local database, migrations, and account isolation.
- Settings, error handling, accessibility, and telemetry boundaries.

### Personal finance
- Accounts and opening balances.
- Categories.
- Income, expense, and transfer records.
- Activity list, details, search, filters, editing.
- Confirmed balance calculations.
- Budgets and basic insights.
- Data export and account deletion.

### Transaction review
- Detection/import adapter only after an approved source is selected.
- Pending review queue.
- Review, edit, confirm, ignore, restore, report, and duplicate handling.
- On-device handling of any sensitive source content.
- No background detection or sensitive permission requests before approval.

### Savings and recurring
- Savings goals and contributions.
- Recurring schedules and reminders.
- Forecasts remain clearly forecasts; they never become confirmed transactions automatically.
- Schedule these after the private finance core unless owner reprioritizes.

### Social
- Profile discovery by username.
- Friend requests and management.
- Block/report and abuse prevention.
- User-authored posts.
- Optional, explicit purchase or milestone sharing.
- Feed, post details, reactions and comments only after moderation and privacy requirements are ready.

### Platform and account
- Notifications and safe previews.
- Privacy/security controls.
- Appearance and currency.
- Help/support, legal pages, export, sign-out, deletion.
- Offline, loading, empty, error, and session-expired states.

## 6. Navigation baseline

The supplied visual reference shows five bottom destinations: Home, Activity, Social, Budgets, Profile.

Use that as the visual baseline. The final information architecture may expose Settings, Account, Support, and other pages from Profile. Do not add a sixth tab or remove a documented destination without recording the decision.

## 7. Delivery phases

### Phase 0 — Repository and requirements audit
- Inspect current scaffold, dependencies, scripts, workflows, and docs.
- Fix contradictions in documentation.
- Establish decision log, architecture boundaries, backlog, and agent workflow.
- Run existing checks and report actual baseline failures.
- No new backend infrastructure.

**Exit:** repo state understood, docs consistent, baseline checks recorded.

### Phase 1 — Technical foundation
- Confirm Expo/React Native compatibility and supported Android build path.
- Establish design tokens, typography, icon strategy, shared primitives.
- Establish typed route structure, protected route shell, error boundaries.
- Establish local SQLite adapter, migration framework, repositories, and tests.
- Establish domain types and integer-paise money utilities.
- Add test and CI coverage.

**Exit:** app builds, route shell works, local persistence is tested, core design primitives are reusable.

### Phase 2 — Authentication and onboarding
- Implement email/password and Google UI.
- Choose provider only after a documented comparison and owner approval.
- Implement secure native session handling through an adapter.
- Sign-up, login, verification, recovery, logout, account lifecycle.
- Profile, username, currency, privacy introduction, onboarding completion.
- No guest route.

**Exit:** protected route behavior and account isolation pass tests.

### Phase 3 — Private finance foundation
- Accounts and opening balances.
- Categories and transaction domain.
- Manual expense, income, transfer.
- Activity list, details, edit, search, filters.
- Balance and period aggregation rules.
- Budget creation and progress.
- Export and deletion foundations.

**Exit:** finance calculations, persistence, migrations, and data isolation are tested.

### Phase 4 — Transaction review
- Select and approve exactly one first detection/import source.
- Build adapter boundary and permission explanation.
- Implement pending review, edit-before-confirm, confirm, ignore, restore, duplicate handling.
- Verify pending/ignored records never affect confirmed aggregates.
- Keep raw SMS/notification content on-device if such ingestion is ever approved.

**Exit:** user can understand and control every detected record; no sensitive permission without approval.

### Phase 5 — Social foundation
- Profiles, username search, friend requests.
- Friend management, block/report.
- Privacy rules and server authorization.
- Abuse limits and moderation operations.

**Exit:** users cannot access another user's private financial data through friendship or guessed identifiers.

### Phase 6 — Sharing and social feed
- Create post and preview.
- Explicit audience selection.
- Explicit field-level financial sharing.
- Feed, post detail, reactions/comments after moderation controls.
- Revocation and audit trail.
- No auto-publishing.

**Exit:** end-to-end sharing tests prove no data beyond the selected fields/audience is exposed.

### Phase 7 — Completion and release readiness
- Savings goals and recurring features if validated.
- Notifications and safe previews.
- Support/legal/settings completeness.
- Accessibility, performance, security, recovery, offline/sync testing.
- Privacy disclosure and store-readiness review.
- Release build and documented limitations.

**Exit:** release checklist passes; unresolved issues are visible and accepted, not hidden.

## 8. Definition of done

A task is done only when:
- Requirements and acceptance criteria are satisfied.
- Implementation follows existing architecture and design conventions.
- No unrelated behavior is changed.
- Typecheck, lint, relevant tests, and formatting checks have been run.
- UI changes have Android screenshots and visual comparison where applicable.
- Error, loading, empty, disabled, and offline states are handled where relevant.
- Accessibility and privacy implications are checked.
- Documentation and decision log are updated when behavior or architecture changes.
- The agent reports exact files changed, commands run, results, and remaining issues.

“Code written” is not “done.” A green CI badge is not proof that the feature is correct.

## 9. Non-goals and prohibited shortcuts

Until explicitly approved, do not:
- Connect real bank accounts or payment rails.
- Read SMS or notifications.
- Upload raw financial messages.
- Add subscriptions, ads, premium tiers, or payment processing.
- Add lending, investing, trading, or financial advice features.
- Add contact-book uploads or invasive friend suggestions.
- Auto-share transactions or balances.
- Implement public financial profiles.
- Add a second backend ecosystem.
- Replace SQLite as local source of truth.
- Use floating-point arithmetic for money.
- Use screenshot images as UI.
- Hardcode production sample balances or transactions.
- Claim security, compliance, or pixel-perfect status without evidence.

## 10. Owner approval gates

Ask the owner only when a decision is material, hard to reverse, affects privacy/security, changes architecture/data ownership, incurs cost, or changes the product promise.

Examples:
- Authentication provider and Google OAuth configuration.
- Exact Cloudflare services and remote sync design.
- Financial data detection source and Android permissions.
- Legal age policy and launch jurisdictions.
- Friend relationship semantics and financial sharing scopes.
- Destructive migrations, data deletion/retention, and production rollout.

For routine reversible implementation choices, choose the simplest option consistent with the repo, document the choice, and continue.

## 11. Agent's default operating behavior

- Work from the ordered backlog.
- Pick the next unblocked task; do not ask the owner what to do next.
- Read the relevant requirements before coding.
- Make small, coherent commits.
- Keep the project buildable at each milestone.
- Update task status and progress notes after each task.
- Do not start later phases while prerequisites are incomplete.
- If blocked by an owner decision, record the exact decision needed and continue independent tasks.
- Never fabricate successful test results, backend behavior, or visual comparisons.
