import { Directory, File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { exportTransactionsCsv } from './export';
import type { TransactionInput } from '../domain/transactions';

export async function exportAndShareTransactions(transactions: TransactionInput[]): Promise<void> {
  const directory = new Directory(Paths.cache, 'scout-exports');
  directory.create({ idempotent: true, intermediates: true });
  const file = new File(directory, 'scout-transactions.csv');
  file.write(exportTransactionsCsv(transactions));
  if (!(await Sharing.isAvailableAsync())) throw new Error('Sharing unavailable on this device');
  await Sharing.shareAsync(file.uri, { mimeType: 'text/csv', dialogTitle: 'Export Scout transactions' });
}
