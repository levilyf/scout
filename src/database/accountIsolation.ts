import type { Account } from '../domain/types';

export function accountsForOwner(accounts: Account[], ownerUserId: string): Account[] {
  return accounts.filter((account) => account.ownerUserId === ownerUserId);
}
