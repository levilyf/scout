# Scout product specification

**Status:** Product discovery draft. Explicit owner decisions are marked **Accepted**. Proposed details remain subject to validation.

## 1. Product thesis

Scout is an India-first personal finance app with a social layer. It helps people understand and manage their money, then lets them selectively share purchases, spending insights, savings progress, and financial milestones with friends.

The social layer should make healthy money habits interesting without turning financial disclosure or spending pressure into the product's reward system.

## 2. Accepted product decisions

- Working product name: Scout.
- Android-first project scaffold exists.
- **An account and authentication are mandatory. There is no guest mode.**
- **Accepted sign-in methods: email and password, plus Google sign-in.**
- Users must sign up or log in before accessing the app's main features or financial/social data.
- Users can find/add friends using a unique username.
- Friends can see only activity the owner intentionally shares or explicitly permits.
- Automatically detected expenses enter a review step and do not immediately affect confirmed totals.
- On app open, pending detected expenses should be surfaced for review without blocking access to the rest of the app.
- The user can count/confirm a detection, edit it before confirming, or ignore it.
- Manually entered expenses can be counted immediately because the user explicitly created them.
- Premium, minimal, dark editorial visual direction based on the in-chat social-feed reference.
- The user's ideas are early product input; planning must refine them rather than blindly implementing every suggestion.

## 3. Authentication and account lifecycle

### Mandatory access
- First launch routes to Welcome, then Sign up or Log in.
- No guest/anonymous mode.
- Main app routes require a valid authenticated session.
- Signed-out users cannot access finance records, friend lists, social feed, or private profile data.
- A session expiry returns the user to authentication without exposing cached private screens.
- Local cached data must be protected and associated with the correct authenticated account.

### Authentication screens
- Welcome / product introduction.
- Sign up with email and password.
- Log in with email and password.
- Continue with Google on both sign-up and login; Google must create or authenticate the same Scout account identity safely.
- Email or identity verification.
- Forgot password / account recovery.
- Reset password.
- Terms and privacy consent where legally required.
- Sign out confirmation.

### Open authentication decisions
- Whether Google sign-in is implemented through the selected provider's native OAuth flow or another approved approach.
- Whether email verification is required before full use.
- Authentication provider and native mobile session strategy.
- Age eligibility and parental/guardian considerations.
- Multi-device session management.

Do not choose an authentication provider or implement a method before the owner approves it. Mandatory login is accepted; the specific method is not.

## 4. Proposed product areas

### Personal finance
- Accounts, transactions, categories, income, expenses, transfers.
- Spending summaries and budgets.
- Recurring payments and savings goals, subject to MVP validation.
- INR and Indian payment habits are important discovery areas.

### Transaction review
Proposed state model:
- `pending`: detected, not yet accepted into confirmed finance data.
- `confirmed`: user chose to count it.
- `ignored`: user chose not to count it; retain a recoverable review record.
- `corrected`: user edited details before confirming.

Rules:
- Pending and ignored items do not affect confirmed spending, balances, budgets, or analytics.
- Confirmation is idempotent; reviewing the same detection twice must not double-count it.
- Duplicate detection needs a clear review/correction path.
- Dismissal must not silently confirm an item.
- Do not show the same dismissed prompt repeatedly without a meaningful reason.
- Manual entries can be confirmed immediately.
- The precise data source (SMS, notification, manual import, provider integration, or other) is **Open**. Do not request sensitive permissions until approved.

### Social layer
Proposed capabilities:
- User profile with unique username.
- Search/discover by username.
- Friend request, accept, reject, remove, block, and report.
- Feed of posts or activity users choose to share.
- Optional likes/reactions and comments, subject to safety and moderation design.
- Optional spending category summaries, purchase posts, savings milestones, and challenges.
- Comparison features only when both sides explicitly opt in and the comparison is meaningful.

A friend relationship must never grant blanket access to private financial records.

## 5. App navigation and page inventory

This is the planned page map, not a claim that all pages belong in the first release. Every screen must have loading, empty, error, and offline states where relevant.

### A. Signed-out experience
1. **Welcome**: concise value proposition, privacy reassurance, Sign up and Log in actions.
2. **Sign up**: create account and accept required terms.
3. **Log in**: authenticate existing account.
4. **Verify identity**: verify email/phone or chosen identity method.
5. **Forgot password**: request recovery.
6. **Reset password**: complete recovery.
7. **Terms of service**: legal document.
8. **Privacy policy**: data collection, processing, sharing, retention, deletion.
9. **Authentication error**: recover from network, credential, verification, or provider failures.

### B. First-run onboarding (authenticated, before main tabs)
1. **Profile setup**: display name, unique username, optional avatar.
2. **Username availability**: check and resolve collisions; explain allowed characters.
3. **Country and currency**: India/INR default proposed; user can change if supported.
4. **Privacy introduction**: explain private-by-default finance and separate social sharing.
5. **Create first account**: choose account type and display name.
6. **Opening balance**: optional amount and as-of date; explain its effect.
7. **Income setup**: optional monthly income estimate; never require it.
8. **Notification/permission primer**: explain a permission before requesting it; only show if the related feature is approved.
9. **Find friends**: optional username search; never upload contacts without separate explicit consent.
10. **Onboarding complete**: enter the app.

Users should be able to skip optional setup and finish it later. Do not block app use because they have not entered income, budgets, friends, or an opening balance.

### C. Main app tabs
Proposed bottom navigation:
- **Home**
- **Activity**
- **Social**
- **Budgets**
- **More**

The exact tab order and whether Budgets is a top-level tab remain open for usability testing. A prominent global add action may create an expense, income, or transfer.

### D. Home
1. **Home dashboard**: confirmed balance summary, income/expense overview, spending trend, budget snapshot, recent transactions, upcoming recurring items.
2. **Pending review entry point**: count/badge of detected items waiting for review.
3. **Expense review sheet/page**: detected item details, source/time, Count, Ignore, Edit.
4. **Review all**: batch review queue with individual decisions.
5. **Detection detail**: inspect a single candidate and possible duplicate.
6. **Quick add**: create expense, income, or transfer.
7. **Dashboard customization**: reorder/hide supported widgets, if validated.

Pending review should be visible on app entry when items exist, but must not be an unskippable blocking modal. Use a clear review sheet or inbox prompt and allow the user to continue.

### E. Activity and transactions
1. **Transaction activity list**: confirmed transactions, grouped by date.
2. **Transaction detail**: amount, type, category, account, date, merchant, notes, attachments if supported.
3. **Add expense**.
4. **Add income**.
5. **Add transfer**.
6. **Edit transaction**.
7. **Search transactions**.
8. **Filter and sort**: date, type, category, account, amount.
9. **Categories list**.
10. **Category detail**: transactions and period totals.
11. **Import data**: CSV/manual statement import only if approved.
12. **Import preview and mapping**: validation and duplicate review.
13. **Export data**: user-requested export with clear file handling.
14. **Ignored detections**: review, restore, or permanently delete ignored candidates.

Transfers must not be counted as income or expenses. Moving money between a user's own accounts must not inflate spending.

### F. Accounts
1. **Accounts overview**.
2. **Account detail**: balance, account activity, account settings.
3. **Add account**.
4. **Edit account**.
5. **Archive account** with impact explanation.
6. **Account type selection**: cash, bank, credit card, other supported types.
7. **Opening balance adjustment** with audit history.

Do not imply a bank connection exists when an account is only manually tracked.

### G. Budgets and insights
1. **Budgets overview**.
2. **Create budget**.
3. **Edit budget**.
4. **Budget detail**: limit, confirmed spend, remaining amount, category activity.
5. **Spending insights**: trends and category breakdowns based only on confirmed data.
6. **Monthly report/recap**.
7. **Savings goals overview**.
8. **Create/edit goal**.
9. **Goal detail and contributions**.

Goal contributions are allocations, not expenses. Actual transfers between accounts remain transfers.

### H. Recurring payments
1. **Recurring overview**.
2. **Recurring detail**.
3. **Add recurring item**.
4. **Edit recurring item**.
5. **Mark paid, skipped, or cancelled**.
6. **Upcoming payments calendar/list**.

A predicted recurring payment is not a confirmed transaction. Never auto-create a confirmed expense just because a due date arrives.

### I. Social
1. **Social feed**: friend-shared posts and activity.
2. **Discover people**: search by exact username; suggested users only if designed without invasive contact scraping.
3. **Friend requests inbox**: received and sent requests.
4. **Friend profile**: public profile fields and content explicitly shared with the viewer.
5. **My profile**: avatar, display name, username, bio, shared posts.
6. **Edit profile**.
7. **Create post**: text, optional image, optional explicitly selected transaction or milestone fields.
8. **Post preview and audience**: show exactly what is shared and with whom.
9. **Post detail**: reactions and comments.
10. **Comments/replies**.
11. **Shared activity settings**: individual scopes, audience, preview, revocation.
12. **Friend management**: remove, block, unblock.
13. **Report content/user**.
14. **Challenges**: only if designed around healthy, non-shaming behavior.
15. **Friend comparisons**: only with mutual opt-in and carefully defined anonymization/visibility.

Never publish automatically merely because a transaction was detected or confirmed. Confirmation and social sharing are separate actions.

### J. Notifications and inbox
1. **Notifications inbox**: friend requests, reactions, comments, shared milestones, product alerts.
2. **Notification preferences**.
3. **Pending review reminders**.
4. **Notification detail/deep link**.

Financial details must not appear in lock-screen notification text by default. User can choose a safer notification preview setting.

### K. More, settings and account
1. **More hub**.
2. **Settings overview**.
3. **Personal details**.
4. **Security and sessions**.
5. **Privacy controls**.
6. **Sharing permissions**.
7. **Notification preferences**.
8. **Theme and appearance**.
9. **Currency and regional settings**.
10. **Data export**.
11. **Connected sources and permissions** (only if integrations are approved).
12. **Blocked users**.
13. **Help and support**.
14. **Feedback and report a problem**.
15. **About Scout**.
16. **Terms of service**.
17. **Privacy policy**.
18. **Open-source licenses**.
19. **Sign out**.
20. **Delete account**: re-authentication, impact summary, confirmation, deletion status.

### L. System and exceptional states
- Offline mode and sync status.
- Session expired.
- No internet / retry.
- Permission denied or revoked.
- Empty states for every list.
- Loading skeletons.
- Recoverable and unrecoverable errors.
- Maintenance/update required.
- Account suspended or restricted, with appeal/help path if applicable.
- Rate limit reached.
- Content removed or unavailable.
- Deleted account / signed-out state.

## 6. Proposed sharing model

Default to private. Users may choose to share:
- A single purchase or transaction post.
- A spending category summary for a selected period.
- A savings goal or milestone.
- A manually written financial update.

Do not expose by default:
- Account balances.
- Bank/account identifiers.
- Raw SMS or notification content.
- Full transaction history.
- Precise location or merchant details.
- Income, debt, or other sensitive financial details.

Ongoing category sharing is **Open**. It requires a separate, understandable permission for each scope, with preview, revocation, and an audit trail.

## 7. Product principles

1. Privacy before virality.
2. Financial correctness before animation.
3. User control before automation.
4. No shame, coercion, or pressure to spend.
5. Saving, debt reduction, budgeting, and financial learning should be as shareable and celebrated as purchases.
6. Explain detected data and why Scout classified it.
7. Never confuse an expected recurring payment with a confirmed transaction.

## 8. Release sequencing

Do not build every page at once. Suggested sequence:
1. Authentication, account lifecycle, onboarding, design system, and navigation.
2. Private finance foundation: accounts, manual transactions, categories, activity.
3. Transaction review for one approved detection/import source.
4. Budgets, insights, recurring items, savings goals based on validation.
5. Social foundation: profiles, usernames, friend requests, block/report.
6. Explicitly shared posts, feed, comments/reactions after moderation and privacy controls.
7. Polish, accessibility, security review, backup/export, account deletion, release readiness.

## 9. Open product questions

Resolve one at a time:
- India-first launch context with an international-ready foundation is accepted; exact first user segment remains open.
- Authentication provider, verification requirements, and native session handling.
- Whether the product is primarily finance-first or social-first.
- First-release transaction data source and Android permission approach.
- Exact friend-sharing scopes and whether friends are mutual connections.
- Final bottom-tab order.
- Which optional finance modules belong in the first release.
- Legal age eligibility and launch requirements.

## 10. Success measures

- Users understand pending vs confirmed transactions.
- Low duplicate and misclassification rates.
- Users can explain and change what friends can see.
- Users feel safe sharing without pressure to spend.
- Meaningful repeat use for financial management, not only social engagement.
- Retention and trust matter more than raw feed time.
