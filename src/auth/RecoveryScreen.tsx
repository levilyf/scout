import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Field, PrimaryButton, Screen } from '../ui/primitives';
import type { AuthAdapter } from './contracts';
import { testAuthAdapter } from './testAdapter';
import { validateEmail } from './validation';

export function RecoveryScreen({ adapter = testAuthAdapter, onBack }: { adapter?: AuthAdapter; onBack?: () => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => { if (!cooldown) return; const timer = setInterval(() => setCooldown((value) => Math.max(0, value - 1)), 1000); return () => clearInterval(timer); }, [cooldown]);

  async function submit() {
    const validationError = validateEmail(email);
    if (validationError) return setError(validationError);
    setError(null);
    if (cooldown) return;
    setLoading(true);
    try {
      await adapter.requestPasswordReset(email.trim().toLowerCase());
      setMessage('If an account matches, we sent a reset link.');
      setCooldown(60);
    } catch {
      setError('Could not send reset link. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text>
      <View style={styles.content}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.description}>Enter your email and we’ll send you a reset link.</Text>
        <Field autoCapitalize="none" keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <PrimaryButton disabled={loading || Boolean(cooldown)} onPress={submit}>{loading ? 'Sending…' : cooldown ? `Resend in ${cooldown}s` : 'Send link'}</PrimaryButton>
      </View>
    </Screen>
  );
}

export function VerificationScreen({ adapter = testAuthAdapter, onVerified }: { adapter?: AuthAdapter; onVerified?: () => void }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function verify() {
    setLoading(true);
    try {
      await adapter.verifyIdentity();
      onVerified?.();
    } catch {
      setMessage('Verification is not complete. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.description}>Open the link we sent, then return here to continue.</Text>
        {message ? <Text accessibilityRole="alert" style={styles.error}>{message}</Text> : null}
        <PrimaryButton disabled={loading} onPress={verify}>{loading ? 'Checking…' : 'I verified my email'}</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { color: colors.secondaryText, ...typography.body, minHeight: 48 },
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
  error: { color: colors.danger, ...typography.metadata },
  message: { color: colors.secondaryText, ...typography.body },
});
