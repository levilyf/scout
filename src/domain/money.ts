import { asMinorUnits, type Currency, type MinorUnits, type Money } from './types';

export function money(amountMinor: number, currency: Currency): Money {
  return { amountMinor: asMinorUnits(amountMinor), currency };
}

export function parseMinorUnits(value: string): number {
  const normalized = value.trim();
  if (!/^[-+]?\d+$/.test(normalized)) throw new Error('Amount must be an integer minor-unit value');
  return asMinorUnits(Number(normalized));
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return money(left.amountMinor + right.amountMinor, left.currency);
}

export function subtractMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  return money(left.amountMinor - right.amountMinor, left.currency);
}

export function sumMoney(values: Money[], currency: Currency): Money {
  return values.reduce((total, value) => addMoney(total, value), money(0, currency));
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
