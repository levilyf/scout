import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../design/tokens';
import type { TransactionInput } from '../domain/transactions';
import { openDatabase } from '../database/client';
import { listTransactions } from '../database/transactions';
import { exportAndShareTransactions } from './exportFile';
import { CenteredState, PrimaryButton, Screen } from '../ui/primitives';

export function ExportScreen({ ownerUserId, onBack }: { ownerUserId: string; onBack?: () => void }) {
  const [transactions, setTransactions] = useState<TransactionInput[] | null>(null);
  useEffect(() => { void openDatabase().then((db) => listTransactions(db, ownerUserId)).then(setTransactions); }, [ownerUserId]);
  if (!transactions) return <Screen><CenteredState loading title="Preparing export" /></Screen>;
  return <Screen><Text accessibilityRole="button" onPress={onBack} style={styles.back}>‹ Back</Text><View style={styles.content}><Text style={styles.title}>Export data</Text><Text style={styles.description}>Create CSV containing your transaction records. Scout keeps export action user-controlled.</Text><Text style={styles.count}>{transactions.length} transaction records</Text><PrimaryButton onPress={() => Alert.alert('Export transactions?', 'CSV file will be prepared and shared using your device.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Export', onPress: () => void exportAndShareTransactions(transactions).catch((error: unknown) => Alert.alert('Export failed', error instanceof Error ? error.message : 'Try again.')) }])}>Export CSV</PrimaryButton></View></Screen>;
}

const styles = StyleSheet.create({ back: { color: colors.secondaryText, ...typography.body, minHeight: 48 }, content: { flex: 1, justifyContent: 'center', gap: spacing.sm }, title: { color: colors.primaryText, ...typography.title }, description: { color: colors.secondaryText, ...typography.body, marginBottom: spacing.md }, count: { color: colors.mutedText, ...typography.metadata, marginBottom: spacing.md } });
