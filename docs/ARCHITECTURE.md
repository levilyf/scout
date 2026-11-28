# Scout Architecture Blueprint

**Status:** SQLite local-first and Cloudflare-only constraints are approved. Supabase Auth Free is selected for identity only; production auth setup and Cloudflare service/sync decisions remain gated.  
**Purpose:** Give agents stable technical boundaries without prematurely selecting vendors or creating infrastructure.

## 1. Approved constraints

- Android-first Expo / React Native application.
- Strict TypeScript.
- Local-first application behavior.
- SQLite is the on-device source of truth for the active device's user-owned finance data.
- Cloudflare is the only approved backend ecosystem.
- Raw SMS/notification text must never leave the device.
- All money is represented as integer minor units (paise for INR), never floating point.
- Authentication is mandatory: email/password and Google sign-in.
- No guest access to app data.
- Use synthetic data only during development.

These constraints do not approve a specific Cloudflare product, authentication vendor, sync protocol, or production deployment.

## 2. Proposed system boundaries

### Mobile application
Responsibilities:
- UI and navigation.
- Authentication client adapter.
- Local SQLite persistence.
- Domain calculations and validation.
- Offline-first user workflows.
- Sync queue and conflict presentation.
- Secure handling of credentials and device-only sensitive source data.
- User consent and permission UX.

The UI must not contain database SQL, provider-specific auth logic, or direct Cloudflare request details. Use typed interfaces and adapters.

### Domain layer
Responsibilities:
- Money and currency types.
- Accounts, transactions, categories, budgets, goals, profiles, friends, posts, and permissions.
- Transaction state transitions.
- Validation and business rules.
- Financial aggregations.
- Use-case services independent of React Native and vendor SDKs.

### Local data layer
- SQLite schema and versioned migrations.
- Repositories per domain.
- Account-scoped queries.
- Transaction boundaries for multi-record financial operations.
- Persistence tests and migration tests.
- Local database is authoritative for local user actions and offline state.

### Remote boundary
Cloudflare-only backend ecosystem is the approved constraint. Exact services and responsibilities require an approved architecture decision.

Potential responsibilities to evaluate:
- Auth-adjacent API/session verification.
- Remote user/profile/social data.
- Encrypted sync transport and remote copies of user-owned records.
- Media storage.
- Rate limiting and abuse protection.
- Server-side authorization and audit records.

Do not assume D1, Workers, R2, Durable Objects, or any other specific product is approved until the service selection ADR is accepted.

### Sync engine
Sync is a separate subsystem, not a side effect hidden inside screens.

Requirements:
- Stable IDs generated client-side.
- Per-account sync namespace.
- Outbox for local mutations.
- Retry with bounded exponential backoff and jitter.
- Idempotency keys for remote writes.
- Version/revision metadata.
- Explicit conflict policy per entity.
- Tombstones for deletion propagation.
- Never sync raw SMS/notification text.
- Do not sync secrets or provider tokens as ordinary app records.
- Sign-out/account switch must prevent cross-account queue leakage.
- Offline edits remain usable locally and visibly pending sync.
- Server authorization is required for all remote reads/writes.

Conflict strategy must be documented per entity before sync ships. Do not apply blind last-write-wins to financial transactions or permission changes.

## 3. Suggested workspace boundaries

Preserve the existing repository structure where possible. A possible future shape:

```text
apps/
  mobile/                 Expo / React Native application
packages/
  domain/                 Pure domain types and use cases
  database/               SQLite schema, migrations, repositories
  design-system/          Shared tokens and native UI primitives
  validation/             Shared schemas and validation
  sync/                   Outbox, sync protocol, conflict handling
  api-contracts/           Typed remote contracts
functions/
  cloudflare/              Cloudflare worker entrypoints (only after approval)
docs/
  ...
```

This is a target boundary, not permission to create every package immediately. Introduce a package only when a real dependency boundary exists.

## 4. Domain model baseline

Use stable opaque IDs (UUID/ULID choice can be made as a reversible implementation decision and recorded). Store timestamps in UTC; render in the user's locale/time zone. Store currency explicitly on each money-bearing record.

### User and identity
- User: id, email identity reference, display name, username, avatar reference, created/updated timestamps.
- Profile visibility settings.
- Authentication identities belong to the auth provider, not a homemade password table.

### Account
- id, owner_user_id, name, type, currency, opening balance, opening-balance date, archived_at, created_at, updated_at.
- Manually tracked accounts must never be represented as connected bank accounts.

### Transaction
- id, owner_user_id, account_id, type (expense/income/transfer), amount_minor, currency, category_id, merchant/description, occurred_at, note, status, source, created_at, updated_at, deleted_at.
- Transfers use a paired transfer representation or equivalent invariant so the source and destination are reconciled without counting as income/expense.
- Store original amount and currency. Currency display preference must not rewrite historical records.

### Detection candidate
- id, owner_user_id, source_type, source_reference_hash or safe local reference, amount candidate, merchant candidate, occurred_at candidate, state, confidence metadata, review timestamps.
- Do not store raw message body in remote data.
- Sensitive source payload remains device-only and should be minimized even locally.
- Candidate lifecycle: pending → confirmed OR ignored; edits are applied before confirmation and preserved in audit metadata where appropriate.
- State transitions are idempotent and tested.

### Budget
- id, owner_user_id, name, amount_minor, currency, period, category scope, start/end, created_at, updated_at.

### Savings goal
- id, owner_user_id, name, target amount/currency, target date, status.
- Contributions are separately represented allocations and are not expenses.

### Social
- Profile, friend request/relationship, post, post media reference, reaction, comment, report, block, sharing grant, sharing audit.
- Friendship and sharing grants are separate entities.
- Shared financial data is a minimized snapshot or permission-checked projection, never a direct public transaction record.
- Every sharing grant has scope, audience, fields, period/duration, created_at, revoked_at.

This is a conceptual model. Final schema and migrations require a reviewed data-model task and provider/backend decision.

## 5. Money rules

- INR amount unit: integer paise.
- Never use JS floating-point values for arithmetic or persisted money.
- Parse and format using decimal-safe utilities.
- Currency is mandatory on each account and transaction.
- Do not sum different currencies without an explicit conversion source, timestamp, and display-only conversion policy.
- Transfers do not affect income/expense totals.
- Pending/ignored detections are excluded from all confirmed aggregates.
- Correcting a confirmed transaction must update aggregates exactly once.
- Use tests for rounding, parsing, formatting, large values, and currency mismatch.

## 6. Authentication boundaries

Approved methods: email/password and Google.

Not yet selected:
- Auth provider.
- Native OAuth implementation.
- Secure token storage mechanism.
- Email verification policy.
- Multi-device session/revocation policy.

Requirements:
- Provider SDK behind an adapter.
- No custom password storage.
- Secure native session storage using a platform-appropriate approved library.
- No token in logs, AsyncStorage as plain text, source control, or analytics.
- Google account linking must require verified identity and explicit user-controlled linking.
- Backend authorization on every protected remote resource.
- Route guards are UX, not the security boundary.
- Sign-out clears protected memory, local cache access, and queued requests for the active identity.
- Account deletion includes remote and local data lifecycle.

Do not implement a fake auth provider and call it production authentication. Mock auth may be used only in isolated tests or an explicitly labeled development preview.

## 7. Security and privacy boundaries

- Default private.
- Server validates owner identity and resource ownership.
- Every query is account/user scoped.
- Least privilege for service credentials.
- TLS for remote traffic.
- Approved encryption at rest for local and remote sensitive data.
- No raw financial payloads in logs, crash reports, analytics, or support events.
- No real user financial data in tests or screenshots.
- Do not request SMS, notification, contacts, or bank permissions before feature approval.
- No financial sharing without an explicit grant.
- Revocation must stop future reads.
- Block/report and abuse controls are prerequisites to social release.

## 8. Testing architecture

Required layers:
- Pure unit tests for money, validation, state machines, aggregations, permissions.
- SQLite repository and migration tests.
- Auth adapter and route guard tests.
- Sync outbox, retries, idempotency, conflict, account isolation tests.
- API authorization tests once remote APIs exist.
- React Native component and navigation tests.
- Android end-to-end smoke tests for critical journeys.
- Screenshot regression tests for the 15-screen reference where tooling permits.

No real credentials, bank data, or SMS/notification content in fixtures.

## 9. Architecture decision gates

Create/update ADRs before:
- Selecting auth provider.
- Selecting Cloudflare services.
- Defining remote source-of-truth and sync conflict rules.
- Adding sensitive ingestion permissions.
- Choosing media storage and moderation infrastructure.
- Shipping social financial sharing.
- Making destructive schema changes.

Until an ADR is approved, build provider-independent interfaces, local functionality, synthetic fixtures, and tests that do not lock in the decision.
