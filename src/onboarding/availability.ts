export interface UsernameAvailability {
  check(username: string): Promise<boolean>;
}

export const testUsernameAvailability: UsernameAvailability = {
  async check(username) {
    return username.toLowerCase() !== 'scout';
  },
};

export function createLocalUsernameAvailability(existing: Set<string>): UsernameAvailability {
  return { async check(username) { return !existing.has(username.trim().toLowerCase()); } };
}
