import { describe, expect, it } from 'vitest';
import { money } from './money';
import { categoryTotal } from './categories';

describe('category totals', () => {
  it('sums confirmed expense records in category scope', () => {
    const tx = [{ id: '1', ownerUserId: 'u', accountId: 'a', categoryId: 'food', type: 'expense' as const, status: 'confirmed' as const, money: money(500, 'INR'), occurredAt: '' }];
    expect(categoryTotal(tx, 'food', 'INR')).toBe(500);
  });
});
