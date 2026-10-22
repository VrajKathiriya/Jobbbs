import { describe, expect, it } from 'vitest';
import { minutesSince } from '../src/index.ts';

const now = new Date('2026-10-22T10:00:00Z');

describe('minutesSince', () => {
  it('counts whole minutes', () => {
    expect(minutesSince(new Date('2026-10-22T09:57:00Z'), now)).toBe(3);
  });

  it('rounds partial minutes down', () => {
    expect(minutesSince(new Date('2026-10-22T09:58:30Z'), now)).toBe(1);
  });

  it('returns 0 for a time in the future', () => {
    expect(minutesSince(new Date('2026-10-22T10:05:00Z'), now)).toBe(0);
  });
});
