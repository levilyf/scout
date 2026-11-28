import { describe, expect, it } from 'vitest';
import { accountsForOwner } from './accountIsolation';
import { asEntityId } from '../domain/types';

describe('database account isolation', () => {
  it('returns only records owned by requested user', () => {
    const accounts = [
      { id: asEntityId('a'), ownerUserId: asEntityId('user-a'), name: 'A', currency: 'INR', createdAt: '', updatedAt: '' },
      { id: asEntityId('b'), ownerUserId: asEntityId('user-b'), name: 'B', currency: 'INR', createdAt: '', updatedAt: '' },
    ];
    expect(accountsForOwner(accounts, 'user-a').map((account) => account.id)).toEqual(['a']);
  });
});
