import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { money, parseMinorUnits } from '../domain/money';
import type { TransactionType } from '../domain/types';
import { Field, PrimaryButton, Screen } from '../ui/primitives';

export function ManualTransactionScreen({ type = 'expense', onSubmit }: { type?: TransactionType; onSubmit?: (input: { type: TransactionType; amountMinor: number; currency: string; description: string }) => void }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  function submit() {
    try {
      const amountMinor = parseMinorUnits(amount);
      if (amountMinor < 0) throw new Error('Amount cannot be negative');
      onSubmit?.({ type, amountMinor: money(amountMinor, 'INR').amountMinor, currency: 'INR', description: description.trim() });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Enter a valid amount');
    }
  }

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Add {type}</Text>
        <Field label="Amount (paise)" keyboardType="number-pad" onChangeText={setAmount} value={amount} />
        <Field label="Description" onChangeText={setDescription} value={description} />
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        <PrimaryButton onPress={submit}>Save {type}</PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  error: { color: colors.danger, ...typography.metadata },
});
