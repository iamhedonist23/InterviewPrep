// The app's single, consistent "what day is it" rule. There is no per-user
// timezone stored anywhere in the schema, so UTC is used as the canonical
// day boundary everywhere a "calendar day" matters (daily challenges,
// streaks). This means a user near the UTC day boundary may see their day
// roll over at a slightly unexpected local time, but it guarantees every
// server, cron job, and user gets the exact same, unambiguous answer to
// "which day is this activity on" — the alternative (per-request local time)
// is what actually causes the classic off-by-one-day streak bugs.

// Truncates a Date to UTC midnight, so two Dates on the same UTC calendar
// day always compare equal.
export function utcDayStart(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function isSameUtcDay(a: Date, b: Date): boolean {
  return utcDayStart(a).getTime() === utcDayStart(b).getTime();
}

export function utcDaysBetween(earlier: Date, later: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((utcDayStart(later).getTime() - utcDayStart(earlier).getTime()) / msPerDay);
}

export function todayUtc(): Date {
  return utcDayStart(new Date());
}
