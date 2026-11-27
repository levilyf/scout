import * as SQLite from 'expo-sqlite';
import { migrateDatabase } from './migrations';

let databasePromise: Promise<SQLite.SQLiteDatabase> | undefined;

export function openDatabase(): Promise<SQLite.SQLiteDatabase> {
  databasePromise ??= SQLite.openDatabaseAsync('scout.db').then(async (db) => {
    await migrateDatabase(db);
    return db;
  });
  return databasePromise;
}
