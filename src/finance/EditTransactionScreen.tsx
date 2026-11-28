import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import { parseDisplayAmount } from '../domain/money';
import type { TransactionInput } from '../domain/transactions';
import { Field, PrimaryButton, Screen } from '../ui/primitives';

export function EditTransactionScreen({ transaction, onBack, onSave }: { transaction: TransactionInput; onBack?: () => void; onSave?: (transaction: TransactionInput) => void }) {
  const [amount, setAmount] = useState((Number(transaction.money.amountMinor) / 100).toFixed(2));
  const [error, setError] = useState<string | null>(null);
  function save() {
    try { onSave?.({ ...transaction, money: { ...transaction.money, amountMinor: parseDisplayAmount(amount) as never } }); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Enter a valid amount'); }
  }
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><View style={styles.content}><Text style={styles.title}>Edit transaction</Text><Field label="Amount (INR)" keyboardType="decimal-pad" onChangeText={setAmount} value={amount} /><Text style={styles.type}>{transaction.type} · {transaction.status}</Text>{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}<PrimaryButton onPress={save}>Save changes</PrimaryButton></View></Screen>;
}

const styles = StyleSheet.create({
  back: { color: colors.secondaryText, ...typography.body, minHeight: 48 },
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  type: { color: colors.secondaryText, ...typography.body, textTransform: 'capitalize' },
  error: { color: colors.danger, ...typography.metadata },
});
