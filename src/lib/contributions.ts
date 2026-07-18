/** Pure contribution-stat helpers (no server-only deps, so they're testable). */

export type GithubDay = { date: string; count: number };

export type GithubStats = {
  total: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  days: GithubDay[];
  source: "authenticated" | "public";
};

/**
 * Consecutive active days ending "now".
 *
 * A quiet **today** does not break the streak — you simply may not have
 * committed yet. The streak only breaks once a full day is missed, so when
 * today is empty we anchor on yesterday instead.
 */
export function currentStreak(days: GithubDay[]): number {
  if (days.length === 0) return 0;

  let i = days.length - 1;
  if (days[i].count === 0) i -= 1; // today not logged yet → anchor on yesterday

  let streak = 0;
  for (; i >= 0 && days[i].count > 0; i--) streak += 1;
  return streak;
}

/** Heat level class for a day's contribution count. */
export function levelClass(count: number): string {
  if (count <= 0) return "bg-foreground/[0.06]";
  if (count <= 2) return "bg-primary/30";
  if (count <= 5) return "bg-primary/55";
  if (count <= 9) return "bg-primary/80";
  return "bg-primary";
}

/** Longest run of consecutive active days anywhere in the window. */
export function longestStreak(days: GithubDay[]): number {
  let best = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      run += 1;
      if (run > best) best = run;
    } else {
      run = 0;
    }
  }
  return best;
}

export function summarize(
  days: GithubDay[],
  source: GithubStats["source"]
): GithubStats {
  return {
    total: days.reduce((sum, d) => sum + d.count, 0),
    activeDays: days.filter((d) => d.count > 0).length,
    currentStreak: currentStreak(days),
    longestStreak: longestStreak(days),
    days,
    source,
  };
}
