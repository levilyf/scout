# Supabase Auth Configuration Checklist

Project: `xdjpzmbkllhpnzjkmsjh`

## Required dashboard settings

Authentication → URL Configuration:

- Site URL: set to final Scout public URL when known.
- Additional redirect URL:
  ```text
  scout://auth/callback
  ```

Authentication → Providers:

- Email: enable email/password.
- Google: enable only after Google Cloud OAuth client exists.
- Confirm email/password recovery templates use approved redirect values.

Google Cloud OAuth:

- Authorized redirect URI must include Supabase callback URL shown in Supabase provider settings.
- Native app scheme/package: `scout` / `com.levilyf.scout`.
- Never commit client secret.

## Code status

`src/auth/supabase.ts` uses PKCE-style browser callback:

1. `signInWithOAuth({ provider: 'google', redirectTo, skipBrowserRedirect: true })`
2. `WebBrowser.openAuthSessionAsync`
3. `exchangeCodeForSession`
4. SecureStore session persistence

Dashboard configuration and Android runtime test remain required. Do not claim Google login works until real callback succeeds on Android.
