import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { AuthScreen } from './src/auth/AuthScreen';
import { NavigationShell } from './src/navigation/NavigationShell';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <>
      {signedIn ? <NavigationShell /> : <AuthScreen onSuccess={() => setSignedIn(true)} />}
      <StatusBar style="light" />
    </>
  );
}
