export function validateDisplayName(value: string): string | null {
  if (!value.trim()) return 'Display name is required';
  return null;
}

export function validateUsername(value: string): string | null {
  const username = value.trim();
  if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return 'Use 3–24 letters, numbers, or underscores';
  return null;
}

export function validateCurrency(value: string): string | null {
  if (!/^[A-Z]{3}$/.test(value.trim().toUpperCase())) return 'Use a three-letter currency code';
  return null;
}
