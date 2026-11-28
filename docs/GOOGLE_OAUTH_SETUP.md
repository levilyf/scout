# Google OAuth Setup

Supabase adapter uses Expo native callback flow:

- Callback: `scout://auth/callback`
- Browser: `WebBrowser.openAuthSessionAsync`
- Session: Supabase `exchangeCodeForSession`

## App identity

- Expo scheme: `scout`
- Android package: `com.levilyf.scout`

## Dashboard configuration

1. Supabase Authentication → Providers → Google: enable provider.
2. Add Google client ID and client secret from Google Cloud Console.
3. Add Supabase callback URL shown in provider settings to Google OAuth authorized redirect URIs.
4. Add `scout://auth/callback` where Supabase/Google configuration accepts native redirect URIs.
5. Confirm Android app package `com.levilyf.scout` and redirect behavior on a real device/build.

Do not commit Google client secrets. Production OAuth still requires dashboard and Google Cloud configuration.
