import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Field, PrimaryButton, Screen } from '../ui/primitives';
import { validateCurrency, validateDisplayName, validateUsername } from './validation';

export function OnboardingScreen({ onComplete }: { onComplete?: (profile: { displayName: string; username: string; currency: string }) => void }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  function continueStep() {
    const validation = step === 0 ? validateDisplayName(displayName) : step === 1 ? validateUsername(username) : validateCurrency(currency);
    if (validation) return setError(validation);
    setError(null);
    if (step < 2) return setStep(step + 1);
    onComplete?.({ displayName: displayName.trim(), username: username.trim(), currency: currency.trim().toUpperCase() });
  }

  return (
    <Screen>
      <Text style={styles.progress}>STEP {step + 1} OF 3</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Scout.</Text>
        <Text style={styles.description}>Let’s set up your profile.</Text>
        {step === 0 ? <Field label="Display name" onChangeText={setDisplayName} value={displayName} /> : null}
        {step === 1 ? <Field autoCapitalize="none" label="Username" onChangeText={setUsername} value={username} /> : null}
        {step === 2 ? <Field autoCapitalize="characters" label="Currency" onChangeText={setCurrency} value={currency} /> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <PrimaryButton onPress={continueStep}>{step === 2 ? 'Finish' : 'Continue'}</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: { color: colors.mutedText, ...typography.metadata, letterSpacing: 1.2 },
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
  error: { color: colors.danger, ...typography.metadata },
});
