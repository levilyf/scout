import { asMinorUnits, type Currency, type MinorUnits, type Money } from './types';

export function money(amountMinor: number, currency: Currency): Money {
  return { amountMinor: asMinorUnits(amountMinor), currency };
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return money(left.amountMinor + right.amountMinor, left.currency);
}

export function subtractMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return money(left.amountMinor - right.amountMinor, left.currency);
}

export function assertSameCurrency(left: Money, right: Money): void {
  if (left.currency !== right.currency) throw new Error('Currency mismatch');
}

export function formatMoney(value: Money, locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: value.currency }).format(Number(value.amountMinor) / 100);
}

export function zeroMoney(currency: Currency): Money {
  return money(0, currency);
}

export type { MinorUnits };
