import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { PrimaryButton, Screen } from './src/ui/primitives';

export default function App() {
  return (
    <Screen>
      <Text>Scout</Text>
      <PrimaryButton>Continue</PrimaryButton>
      <StatusBar style="light" />
    </Screen>
  );
}
