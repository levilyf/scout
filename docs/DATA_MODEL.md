# Private Finance Data Model

**Status:** Baseline invariants for P3 finance work. Schema implementation remains incremental.

## Ownership

Every account, category, transaction, budget, and goal record carries `owner_user_id`. Repositories must require active owner ID and include it in every read, update, and delete predicate. IDs are client-generated opaque strings. No cross-user query is valid.

## Account

- `id`, `owner_user_id`, `name`, `type`, `currency`, `opening_balance_minor`, `opening_balance_date`
- `archived_at`, `created_at`, `updated_at`
- Currency required; opening balance stored as integer minor units.
- Archived accounts remain readable for history but reject new transactions.
- Manual account never implies bank connection.

## Category

- `id`, `owner_user_id` (nullable only for immutable system defaults), `name`, `kind`, `created_at`, `updated_at`, `archived_at`
- Expense categories cannot be used for income records and vice versa.
- Category deletion archives or reassigns; never silently removes transaction meaning.

## Transaction

- `id`, `owner_user_id`, `account_id`, `type`, `status`, `amount_minor`, `currency`
- `category_id`, `merchant`, `description`, `occurred_at`, `note`
- `source`, `created_at`, `updated_at`, `deleted_at`
- Amount is non-negative integer minor units; type determines semantic direction.
- Only `confirmed` transactions affect confirmed totals.
- Pending/ignored detections never affect balances, budgets, or analytics.
- Manual entries may start confirmed because user explicitly created them.
- Deletes are account-scoped tombstones once sync exists.

## Transfer

Represent transfer as paired legs with shared `transfer_id`, or equivalent atomic structure:

- Exactly one outgoing and one incoming leg.
- Same owner, currency, absolute amount, and transfer group.
- Neither leg counts as income or expense.
- Create/edit/delete both legs atomically.

## Budget

- `id`, `owner_user_id`, `name`, `amount_minor`, `currency`, `period`
- Category scope and start/end dates, `created_at`, `updated_at`, `archived_at`
- Progress uses confirmed expense transactions only, matching owner/currency/category/date range.

## Invariants

1. No floating-point money arithmetic or storage.
2. No mixed-currency aggregation without explicit conversion policy.
3. Pending/ignored records excluded from confirmed aggregates.
4. Transfer legs excluded from income/expense aggregates.
5. Every mutation is owner-scoped and idempotency-ready.
6. Timestamps stored UTC; display timezone is presentation concern.
7. Deletion must not silently destroy audit/history required by export or sync.

## Migration consequence

Current migration has minimal account/transaction columns. Feature migrations must add fields incrementally, preserve existing rows, and include migration tests. No destructive migration without explicit approval.
