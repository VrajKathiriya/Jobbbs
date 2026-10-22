/**
 * Whole minutes from `from` to `now`. The clock is passed in, never read here.
 * Returns 0 when `from` is in the future (clock skew between sources and us).
 */
export function minutesSince(from: Date, now: Date): number {
  const ms = now.getTime() - from.getTime();
  return ms <= 0 ? 0 : Math.floor(ms / 60_000);
}
