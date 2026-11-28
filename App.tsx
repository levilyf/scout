import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AuthScreen } from './src/auth/AuthScreen';
import { OnboardingScreen } from './src/onboarding/OnboardingScreen';
import { openDatabase } from './src/database/client';
import { loadOnboarding, saveOnboarding, type OnboardingRecord } from './src/onboarding/persistence';
import { guardRoute } from './src/auth/routeGuard';
import { createSessionManager } from './src/auth/sessionManager';
import { secureSessionStore } from './src/auth/secureSession';
import type { AuthSession } from './src/auth/contracts';
import { NavigationShell } from './src/navigation/NavigationShell';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [initialProfile, setInitialProfile] = useState<Partial<Omit<OnboardingRecord, 'accountName'>> & { accountName?: string } | undefined>();
  const [loading, setLoading] = useState(true);
  const [manager] = useState(() => createSessionManager(secureSessionStore, setSession));

  useEffect(() => {
    void manager.hydrate().then(async (nextSession) => {
      if (nextSession) {
        const profile = await loadOnboarding(await openDatabase(), nextSession.user.id);
        setInitialProfile(profile ? { ...profile, accountName: profile.accountName ?? '' } : undefined);
        setOnboarded(Boolean(profile));
      }
    }).finally(() => setLoading(false));
  }, [manager]);
  const route = guardRoute(session, loading);

  return (
    <>
      {route.screen === 'loading' ? null : route.screen !== 'protected' ? <AuthScreen onSuccess={(nextSession) => { setOnboarded(false); void manager.set(nextSession); }} /> : !onboarded ? <OnboardingScreen initialProfile={initialProfile} onComplete={(profile) => void openDatabase().then((db) => saveOnboarding(db, { ...profile, ownerUserId: route.session.user.id, accountName: profile.accountName || null })).then(() => setOnboarded(true))} /> : <NavigationShell onSignOut={() => { setOnboarded(false); setInitialProfile(undefined); void manager.clear(); }} />}
      <StatusBar style="light" />
    </>
  );
}
