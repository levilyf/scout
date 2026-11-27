import { StatusBar } from 'expo-status-bar';
import { NavigationShell } from './src/navigation/NavigationShell';

export default function App() {
  return (
    <>
      <NavigationShell />
      <StatusBar style="light" />
    </>
  );
}
