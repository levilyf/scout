import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AuthScreen } from './src/auth/AuthScreen';
import { guardRoute } from './src/auth/routeGuard';
import { createSessionManager } from './src/auth/sessionManager';
import { secureSessionStore } from './src/auth/secureSession';
import type { AuthSession } from './src/auth/contracts';
import { NavigationShell } from './src/navigation/NavigationShell';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [manager] = useState(() => createSessionManager(secureSessionStore, setSession));

  useEffect(() => { void manager.hydrate().finally(() => setLoading(false)); }, [manager]);
  const route = guardRoute(session, loading);

  return (
    <>
      {route.screen === 'loading' ? null : route.screen === 'protected' ? <NavigationShell onSignOut={() => void manager.clear()} /> : <AuthScreen onSuccess={(nextSession) => void manager.set(nextSession)} />}
      <StatusBar style="light" />
    </>
  );
}
