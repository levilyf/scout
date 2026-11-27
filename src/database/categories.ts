import type { SQLiteDatabase } from 'expo-sqlite';
import { asEntityId, type EntityId } from '../domain/types';

export type CategoryKind = 'expense' | 'income';
export type Category = { id: EntityId; ownerUserId: EntityId | null; name: string; kind: CategoryKind; archivedAt: string | null };

export async function createCategory(
  db: SQLiteDatabase,
  input: { id: EntityId; ownerUserId: EntityId; name: string; kind: CategoryKind },
): Promise<Category> {
  const name = input.name.trim();
  if (!name) throw new Error('Category name cannot be empty');
  await db.runAsync(
    'INSERT INTO categories (id, owner_user_id, name, kind, archived_at, created_at, updated_at) VALUES (?, ?, ?, ?, NULL, ?, ?)',
    input.id, input.ownerUserId, name, input.kind, new Date().toISOString(), new Date().toISOString(),
  );
  return { id: input.id, ownerUserId: input.ownerUserId, name, kind: input.kind, archivedAt: null };
}

export async function listCategories(db: SQLiteDatabase, ownerUserId: EntityId, kind?: CategoryKind): Promise<Category[]> {
  const rows = await db.getAllAsync<{ id: string; owner_user_id: string | null; name: string; kind: CategoryKind; archived_at: string | null }>(
    kind
      ? 'SELECT id, owner_user_id, name, kind, archived_at FROM categories WHERE (owner_user_id = ? OR owner_user_id IS NULL) AND kind = ? AND archived_at IS NULL ORDER BY name'
      : 'SELECT id, owner_user_id, name, kind, archived_at FROM categories WHERE (owner_user_id = ? OR owner_user_id IS NULL) AND archived_at IS NULL ORDER BY name',
    ...(kind ? [ownerUserId, kind] : [ownerUserId]),
  );
  return rows.map((row) => ({ id: asEntityId(row.id), ownerUserId: row.owner_user_id ? asEntityId(row.owner_user_id) : null, name: row.name, kind: row.kind, archivedAt: row.archived_at }));
}
