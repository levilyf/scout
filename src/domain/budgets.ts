import type { Money } from './types';

export type Budget = { id: string; ownerUserId: string; name: string; limit: Money; period: 'monthly' | 'weekly'; active: boolean };

export function budgetRemaining(limit: Money, confirmedSpend: Money): Money {
  if (limit.currency !== confirmedSpend.currency) throw new Error('Currency mismatch');
  return { currency: limit.currency, amountMinor: (limit.amountMinor - confirmedSpend.amountMinor) as Money['amountMinor'] };
}
