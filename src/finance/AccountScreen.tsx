import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { parseDisplayAmount } from '../domain/money';
import { Field, PrimaryButton, Screen } from '../ui/primitives';

export function AccountScreen({ onSave }: { onSave?: (account: { name: string; currency: string; openingBalanceMinor: number }) => void }) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState<string | null>(null);
  function save() {
    try {
      if (!name.trim()) throw new Error('Account name is required');
      onSave?.({ name: name.trim(), currency: 'INR', openingBalanceMinor: balance ? parseDisplayAmount(balance) : 0 });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Enter valid account details'); }
  }
  return <Screen><View style={styles.content}><Text style={styles.title}>Add account</Text><Text style={styles.description}>Track a manual account. Scout does not connect to your bank.</Text><Field label="Account name" placeholder="Cash, bank, or card" onChangeText={setName} value={name} /><Field label="Opening balance (INR)" keyboardType="decimal-pad" onChangeText={setBalance} value={balance} />{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}<PrimaryButton onPress={save}>Save account</PrimaryButton></View></Screen>;
}

const styles = StyleSheet.create({ content: { flex: 1, justifyContent: 'center', gap: spacing.sm }, title: { color: colors.primaryText, ...typography.title }, description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md }, error: { color: colors.danger, ...typography.metadata } });
