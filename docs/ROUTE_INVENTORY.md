# Scout Route Inventory

**Status:** Planning inventory. Routes are contracts, not implemented screens.

## State contract

Every authenticated data route supports loading, empty, error, offline, and session-expired states where relevant. Signed-out routes support loading, validation, provider/network error, and recovery states. Destructive actions require confirmation.

## Route matrix

| Route family | Routes | Auth | Parent | Release |
|---|---|---:|---|---|
| Auth | `/welcome`, `/login`, `/signup`, `/verify-email`, `/forgot-password`, `/reset-password`, `/terms`, `/privacy`, `/auth-error` | No | Auth stack | MVP |
| Onboarding | `/onboarding/profile`, `/onboarding/username`, `/onboarding/region`, `/onboarding/privacy`, `/onboarding/account`, `/onboarding/opening-balance`, `/onboarding/income`, `/onboarding/permissions`, `/onboarding/friends`, `/onboarding/complete` | Yes | Onboarding stack | MVP; optional steps skippable |
| Main tabs | `/home`, `/activity`, `/social`, `/budgets`, `/profile` | Yes | Tab shell | MVP shell; feature phases vary |
| Home | `/home/review`, `/home/review/all`, `/home/review/:candidateId`, `/home/quick-add`, `/home/customize` | Yes | Home | Review later; quick add MVP; customize later |
| Activity | `/activity`, `/activity/search`, `/activity/filters`, `/activity/transaction/:id`, `/activity/expense/new`, `/activity/income/new`, `/activity/transfer/new`, `/activity/transaction/:id/edit`, `/activity/categories`, `/activity/categories/:id`, `/activity/import`, `/activity/import/preview`, `/activity/ignored` | Yes | Activity | Core finance MVP except import/detection-gated |
| Accounts | `/accounts`, `/accounts/new`, `/accounts/:id`, `/accounts/:id/edit`, `/accounts/:id/archive`, `/accounts/type`, `/accounts/:id/opening-balance` | Yes | Profile/Home entry | Finance MVP |
| Budgets | `/budgets`, `/budgets/new`, `/budgets/:id`, `/budgets/:id/edit`, `/insights`, `/reports`, `/goals`, `/goals/new`, `/goals/:id`, `/goals/:id/edit`, `/goals/:id/contributions` | Yes | Budgets | Budgets MVP; goals later |
| Recurring | `/recurring`, `/recurring/new`, `/recurring/:id`, `/recurring/:id/edit`, `/recurring/:id/status`, `/recurring/upcoming` | Yes | Budgets/Profile | Later |
| Social | `/social`, `/social/discover`, `/social/requests`, `/social/profile/me`, `/social/profile/:username`, `/social/profile/edit`, `/social/post/new`, `/social/post/preview`, `/social/post/:id`, `/social/post/:id/comments`, `/social/friends`, `/social/report`, `/social/blocked`, `/social/challenges`, `/social/comparisons` | Yes | Social/Profile | Foundation later; sharing/feed after moderation; challenges/comparisons proposed |
| Notifications | `/notifications`, `/notifications/preferences`, `/notifications/:id` | Yes | Home/Profile | Later |
| Settings | `/profile`, `/settings`, `/settings/personal`, `/settings/security`, `/settings/privacy`, `/settings/sharing`, `/settings/notifications`, `/settings/appearance`, `/settings/currency`, `/settings/sources`, `/settings/licenses`, `/settings/about` | Yes | Profile | MVP settings subset; remaining later |
| Account lifecycle | `/account/export`, `/account/sign-out`, `/account/delete`, `/account/delete/status` | Yes | Settings | Export/sign-out MVP; deletion foundation/later |
| Support/legal | `/support`, `/support/feedback`, `/support/problem`, `/legal/terms`, `/legal/privacy`, `/legal/licenses` | Yes except legal pages may be public | Profile | Later |
| System | `/offline`, `/session-expired`, `/maintenance`, `/restricted`, `/not-found` | Varies | Root | As needed |

## Access rules

- Root redirects signed-out users to `/welcome`, incomplete authenticated users to onboarding, and complete users to `/home`.
- No guest access to finance, social, profile, settings, or notification data.
- Route guards provide UX only; remote authorization remains mandatory.
- Account switching clears protected in-memory state and prevents cross-account local or sync-queue access.
- Pending detection routes never confirm records automatically and never expose them socially.
- `/social/post/preview` must show exact selected fields and audience before publish.
- `/account/delete` requires re-authentication and explicit confirmation.

## Route state minimums

| Route type | Loading | Empty | Error/offline |
|---|---|---|---|
| Auth form | Submit loading/disabled | N/A | Inline validation; provider/network recovery |
| List/feed | Skeleton | Explain next action | Retry; stale local data marked offline |
| Detail/form | Load shell | Not found/archived | Retry; preserve unsent input locally where safe |
| Review queue | Candidate loading | No pending items | Candidate parse/storage error; no silent confirmation |
| Settings/account | Load current values | N/A | Retry without leaking private values |
| Destructive lifecycle | Re-auth loading | N/A | Explain failure; do not claim deletion/export succeeded |
