import { describe, expect, it } from 'vitest';
import { addMoney, formatMoney, money, parseMinorUnits, subtractMoney, sumMoney } from './money';
import { asEntityId, asMinorUnits } from './types';

describe('money domain', () => {
  it('adds and subtracts integer minor units', () => {
    expect(addMoney(money(1250, 'INR'), money(250, 'INR')).amountMinor).toBe(1500);
    expect(subtractMoney(money(1250, 'INR'), money(250, 'INR')).amountMinor).toBe(1000);
  });

  it('parses integer minor-unit input and rejects decimal text', () => {
    expect(parseMinorUnits('  1250 ')).toBe(1250);
    expect(() => parseMinorUnits('12.50')).toThrow('Amount must be an integer minor-unit value');
  });

  it('sums same-currency values', () => {
    expect(sumMoney([money(100, 'INR'), money(250, 'INR')], 'INR').amountMinor).toBe(350);
  });

  it('rejects unsafe or fractional minor units', () => {
    expect(() => asMinorUnits(1.5)).toThrow('Minor units must be a safe integer');
    expect(() => asMinorUnits(Number.MAX_SAFE_INTEGER + 1)).toThrow('Minor units must be a safe integer');
  });

  it('rejects mixed currencies', () => {
    expect(() => addMoney(money(100, 'INR'), money(100, 'USD'))).toThrow('Currency mismatch');
  });

  it('formats paise as INR', () => {
    expect(formatMoney(money(12345, 'INR'))).toContain('123.45');
  });

  it('rejects empty entity IDs', () => {
    expect(() => asEntityId('  ')).toThrow('Entity ID cannot be empty');
  });
});
