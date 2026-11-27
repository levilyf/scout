import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Field, PrimaryButton, Screen } from '../ui/primitives';
import { testUsernameAvailability, type UsernameAvailability } from './availability';
import { validateCurrency, validateDisplayName, validateUsername } from './validation';

const steps = ['profile', 'username', 'currency', 'privacy', 'complete'] as const;

type Profile = { displayName: string; username: string; currency: string; privacyAcknowledged: boolean };

export function OnboardingScreen({ onComplete, availability = testUsernameAvailability }: { onComplete?: (profile: Profile) => void; availability?: UsernameAvailability }) {
  const [profile, setProfile] = useState<Profile>({ displayName: '', username: '', currency: 'INR', privacyAcknowledged: false });
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const current = steps[step];

  async function continueStep() {
    const validation = current === 'profile' ? validateDisplayName(profile.displayName) : current === 'username' ? validateUsername(profile.username) : current === 'currency' ? validateCurrency(profile.currency) : null;
    if (validation) return setError(validation);
    if (current === 'username' && !(await availability.check(profile.username.trim()))) return setError('Username is not available');
    if (current === 'privacy' && !profile.privacyAcknowledged) return setError('Please acknowledge Scout privacy defaults');
    setError(null);
    if (current === 'complete') return onComplete?.({ ...profile, currency: profile.currency.toUpperCase() });
    setStep(step + 1);
  }

  return (
    <Screen>
      <Text style={styles.progress}>STEP {step + 1} OF {steps.length}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{current === 'complete' ? 'You’re ready.' : 'Welcome to Scout.'}</Text>
        <Text style={styles.description}>{current === 'privacy' ? 'Your finance data stays private unless you choose to share it.' : current === 'complete' ? 'You can change these choices later in Settings.' : 'Let’s set up your profile.'}</Text>
        {current === 'profile' ? <Field label="Display name" onChangeText={(value) => setProfile({ ...profile, displayName: value })} value={profile.displayName} /> : null}
        {current === 'username' ? <Field autoCapitalize="none" label="Username" onChangeText={(value) => setProfile({ ...profile, username: value })} value={profile.username} /> : null}
        {current === 'currency' ? <Field autoCapitalize="characters" label="Currency" onChangeText={(value) => setProfile({ ...profile, currency: value })} value={profile.currency} /> : null}
        {current === 'privacy' ? <Text style={styles.privacy}>Scout never shares transactions, balances, or detected records without a separate action from you.</Text> : null}
        {current === 'complete' ? <Text style={styles.summary}>{profile.displayName} · @{profile.username} · {profile.currency.toUpperCase()}</Text> : null}
        {current === 'privacy' ? <PrimaryButton onPress={() => setProfile({ ...profile, privacyAcknowledged: true })}>{profile.privacyAcknowledged ? 'Privacy acknowledged' : 'Keep my data private'}</PrimaryButton> : null}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <PrimaryButton onPress={continueStep}>{current === 'complete' ? 'Enter Scout' : 'Continue'}</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: { color: colors.mutedText, ...typography.metadata, letterSpacing: 1.2 },
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
  privacy: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
  summary: { color: colors.primaryText, ...typography.body, marginBottom: spacing.md },
  error: { color: colors.danger, ...typography.metadata },
});
