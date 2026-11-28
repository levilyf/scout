# Google OAuth Setup

Supabase adapter now uses Expo native callback flow:

- Callback: `Linking.createURL('auth/callback')`
- Browser: `WebBrowser.openAuthSessionAsync`
- Session: Supabase `exchangeCodeForSession`

Required dashboard configuration:

1. Supabase Authentication → Providers → Google: enable provider.
2. Add Google client ID and client secret from Google Cloud Console.
3. Add Supabase callback URL shown in provider settings to Google OAuth authorized redirect URIs.
4. Add Expo development and Android production redirect URLs as required by selected build scheme/package.
5. Confirm Android app scheme and redirect behavior on a real device/build.

Do not commit Google client secrets. This code cannot pass production OAuth until dashboard and Google Cloud configuration exists.
