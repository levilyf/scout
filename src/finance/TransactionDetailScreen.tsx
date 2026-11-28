import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import type { TransactionInput } from '../domain/transactions';
import { formatMoney } from '../domain/money';
import { PrimaryButton, Screen } from '../ui/primitives';

export function TransactionDetailScreen({ transaction, onBack, onEdit }: { transaction: TransactionInput; onBack?: () => void; onEdit?: () => void }) {
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><View style={styles.content}><Text style={styles.title}>Transaction detail</Text><Text style={styles.amount}>{formatMoney(transaction.money)}</Text><View style={styles.details}><Text style={styles.label}>TYPE</Text><Text style={styles.value}>{transaction.type}</Text><Text style={styles.label}>STATUS</Text><Text style={styles.value}>{transaction.status}</Text><Text style={styles.label}>DATE</Text><Text style={styles.value}>{new Date(transaction.occurredAt).toLocaleString()}</Text></View><PrimaryButton onPress={onEdit}>Edit transaction</PrimaryButton></View></Screen>;
}

const styles = StyleSheet.create({
  back: { color: colors.secondaryText, ...typography.body, minHeight: 48 },
  content: { flex: 1, justifyContent: 'center', gap: spacing.sm },
  title: { color: colors.primaryText, ...typography.title },
  amount: { color: colors.primaryText, ...typography.amount, marginVertical: spacing.md },
  details: { borderColor: colors.border, borderRadius: 12, borderWidth: 1, padding: spacing.md, gap: spacing.xs, marginBottom: spacing.md },
  label: { color: colors.mutedText, ...typography.metadata },
  value: { color: colors.primaryText, ...typography.body, marginBottom: spacing.sm, textTransform: 'capitalize' },
});
