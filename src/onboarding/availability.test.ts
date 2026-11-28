import { describe, expect, it } from 'vitest';
import { createLocalUsernameAvailability } from './availability';

describe('username availability', () => {
  it('checks normalized local usernames', async () => {
    const availability = createLocalUsernameAvailability(new Set(['scout_user']));
    expect(await availability.check(' Scout_User ')).toBe(false);
    expect(await availability.check('new_user')).toBe(true);
  });
});
