# Account Deletion Lifecycle

**Status:** Provider-independent contract. No remote deletion deployed.

## States

- `requested`: user opened deletion flow.
- `reauth-required`: recent identity proof missing.
- `queued`: reauthenticated; remote/local deletion queued.
- `completed`: deletion confirmed across approved systems.
- `failed`: deletion failed; preserve safe status and retry/help path.

## Rules

- Require recent reauthentication before destructive action.
- Show impact summary before confirmation.
- Stop protected reads/writes once deletion is queued.
- Revoke auth session and clear local protected state.
- Delete Supabase identity through approved provider flow.
- Delete Cloudflare-owned finance/social data and sync metadata.
- Handle backups/retention according to approved privacy policy.
- Never claim deletion completed before all required systems confirm.
- Export remains available before deletion where policy requires.

`src/auth/deletion.ts` contains pure state guards. Remote deletion needs Cloudflare service/API decision and Supabase administrative workflow; never put service keys in mobile app.
