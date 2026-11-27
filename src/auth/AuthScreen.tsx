import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { Field, PrimaryButton, Screen } from '../ui/primitives';
import type { AuthSession } from './contracts';
import { testAuthAdapter } from './testAdapter';
import { normalizeEmail, validateEmail, validatePassword } from './validation';

type Mode = 'login' | 'signup';

export function AuthScreen({ mode = 'login', onSuccess }: { mode?: Mode; onSuccess?: (session: AuthSession) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isLogin = mode === 'login';

  async function submit() {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setError(emailError ?? passwordError);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const session = isLogin
        ? await testAuthAdapter.signIn({ email: normalizeEmail(email), password })
        : { user: await testAuthAdapter.signUp({ email: normalizeEmail(email), password }), expiresAt: new Date(Date.now() + 3600000).toISOString() };
      onSuccess?.(session);
    } catch {
      setError('Authentication failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.wordmark}>SCOUT</Text>
        <Text style={styles.tagline}>KNOW YOUR MONEY.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>{isLogin ? 'Welcome back.' : 'Create account.'}</Text>
        <Text style={styles.description}>{isLogin ? 'Log in to your Scout account.' : 'Join Scout and take control of your finances.'}</Text>
        <Field autoCapitalize="none" autoComplete="email" keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
        <Field autoComplete="password" label="Password" onChangeText={setPassword} secureTextEntry value={password} />
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <PrimaryButton disabled={loading} onPress={submit}>{loading ? 'Loading…' : isLogin ? 'Log in' : 'Sign up'}</PrimaryButton>
        <Text style={styles.separator}>or</Text>
        <PrimaryButton disabled={loading} onPress={async () => { setLoading(true); setError(null); try { const session = await testAuthAdapter.signInWithGoogle(); onSuccess?.(session); } catch { setError('Google sign-in failed. Try again.'); } finally { setLoading(false); } }}>Continue with Google</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: spacing.xl },
  wordmark: { color: colors.primaryText, ...typography.wordmark },
  tagline: { color: colors.mutedText, ...typography.metadata, letterSpacing: 1.2, marginTop: spacing.xxs },
  form: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md },
  error: { color: colors.danger, ...typography.metadata, marginBottom: spacing.xs },
  separator: { color: colors.mutedText, ...typography.metadata, textAlign: 'center' },
});
