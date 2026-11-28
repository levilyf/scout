import { describe, expect, it } from 'vitest';
import { money } from './money';
import { budgetRemaining } from './budgets';

describe('budget domain', () => {
  it('calculates remaining amount from confirmed spend', () => expect(budgetRemaining(money(10000, 'INR'), money(2500, 'INR')).amountMinor).toBe(7500));
  it('rejects mixed currencies', () => expect(() => budgetRemaining(money(100, 'INR'), money(1, 'USD'))).toThrow('Currency mismatch'));
});
