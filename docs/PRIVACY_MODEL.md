# Privacy and permissions model

**Status:** Proposed baseline with mandatory authentication accepted.

## 1. Default stance

Scout handles highly sensitive financial information. Private is the default. A friend request, accepted friendship, follow, like, or comment must never silently grant access to financial records.

**Authentication is mandatory.** There is no guest mode. A user must sign up or log in before entering the main app. Authentication proves account access; it does not grant social sharing consent or permission to collect financial data.

## 2. Authentication boundaries

- Signed-out users may access only welcome, sign-up, login, verification, recovery, terms, and privacy pages.
- All finance, social, profile, settings, and notification data routes require an authenticated session.
- Authorization must be enforced by the backend, not only by hidden client routes.
- Session expiry must clear protected UI state and return the user to authentication.
- Cached data must be partitioned by account and protected against display to another signed-in user.
- Sign-out must revoke or invalidate the active session and remove sensitive in-memory state.
- Account deletion must include identity, financial data, social content, backups/retention handling, and a clear completion state.
- Email/password and Google sign-in are the approved methods.
- Authentication provider, secure token storage, Google OAuth configuration, verification requirements, and multi-device session policy remain open.
- Google sign-in must not silently merge two existing Scout accounts based only on an unverified matching email. Account linking requires a verified identity and a clear user-controlled flow.

## 3. Data classes

| Data | Default |
|---|---|
| Username and chosen profile details | Visible according to profile setting |
| Friend relationship | Visible to the parties involved |
| Manually authored friends-only post | Visible to selected audience |
| Individual transaction | Private |
| Spending category totals | Private |
| Account balance and account identifiers | Private |
| Income, debt, and liabilities | Private |
| Raw SMS/notification text | Must never leave the device; ingestion itself requires separate approval |
| Authentication secrets and tokens | Never exposed to other users |

## 4. Sharing permissions

- Sharing must be opt-in and clearly scoped.
- Preview the exact content and audience before publishing.
- One-off sharing must not enable ongoing sharing.
- Ongoing sharing must name the data type, time range, audience, and duration or renewal behavior.
- Users must be able to revoke access.
- Removing a friend should stop future access to friend-only content.
- Revocation cannot guarantee deletion of content another person has already seen or independently captured; explain this honestly.
- Do not include balances, raw messages, account identifiers, or full transaction histories in social payloads.

## 5. Transaction review privacy

- Automatically detected records remain pending until the user confirms them.
- Pending/ignored records must not enter social feeds.
- Only a confirmed record may be offered for sharing, and sharing still requires a separate user action/permission.
- Never infer consent to share from consent to detect or import.
- Avoid collecting more message/notification content than strictly needed.
- The data source, Android permission flow, retention, and on-device parsing design remain open and must be reviewed before implementation.

## 6. Social safety

Before launching a social feed, design:
- Block and report.
- Friend request limits and spam prevention.
- Username impersonation and account recovery protections.
- Comment/reaction controls.
- Content removal and moderation process.
- Rate limits and abuse monitoring that avoid exposing private financial data.
- Account deletion and data export behavior.

## 7. Security requirements

- Enforce authorization on the server, not only in the client UI.
- Use least-privilege access and per-user data isolation.
- Validate ownership for every transaction, post, and friend relationship.
- Protect credentials and session tokens.
- Encrypt network traffic and sensitive stored data using an approved platform-appropriate design.
- Avoid logging financial payloads, raw messages, tokens, or identifiers.
- Use synthetic fixtures in development and tests.
- Define retention, backup, deletion, and incident-response behavior before production.

## 8. Architecture/security decisions

- Local-first behavior with SQLite as the device source of truth is accepted.
- Cloudflare is the only approved backend ecosystem; exact services, remote data layout, and sync protocol remain open.
- Authentication methods are email/password and Google; provider and native session implementation remain open.
- Sync conflict handling, offline deletion semantics, remote backup, and multi-device behavior require an approved design.
- Any financial detection/import source and related Android permissions require separate approval.
- Legal/privacy review is required for India and every additional launch jurisdiction.

Raw SMS/notification text must never leave the device. Do not use production financial data until security, retention, deletion, and privacy requirements are reviewed.
