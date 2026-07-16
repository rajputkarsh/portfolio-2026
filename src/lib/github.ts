import "server-only";
import { profile } from "@/content/profile";

export type GithubDay = { date: string; count: number };
export type GithubStats = {
  total: number;
  activeDays: number;
  currentStreak: number;
  days: GithubDay[];
  source: "authenticated" | "public";
};

const WINDOW_DAYS = 371;

function dayKey(d: Date) {
  return d.toISOString().split("T")[0];
}

function summarize(
  days: GithubDay[],
  source: GithubStats["source"]
): GithubStats {
  const total = days.reduce((s, d) => s + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;
  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak += 1;
    else break;
  }
  return { total, activeDays, currentStreak, days, source };
}

/** Authenticated commit search — counts commits the token can see (incl. private). */
async function fromCommitSearch(token: string): Promise<GithubStats | null> {
  const since = new Date();
  since.setDate(since.getDate() - WINDOW_DAYS);
  const counts: Record<string, number> = {};
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `https://api.github.com/search/commits?q=author:${profile.githubUsername}+author-date:>=${dayKey(since)}&per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "User-Agent": "portfolio-2026",
          },
          next: { revalidate: 3600 },
        }
      );
      if (!res.ok) break;
      const data: {
        items?: Array<{ commit?: { author?: { date?: string } } }>;
      } = await res.json();
      const items = data.items ?? [];
      for (const item of items) {
        const date = item.commit?.author?.date?.split("T")[0];
        if (date) counts[date] = (counts[date] ?? 0) + 1;
      }
      if (items.length < 100) break;
    }
  } catch {
    return null;
  }
  const days: GithubDay[] = [];
  for (let i = WINDOW_DAYS; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = dayKey(d);
    days.push({ date: key, count: counts[key] ?? 0 });
  }
  return summarize(days, "authenticated");
}

/** Public contribution calendar — no token, but only counts public activity. */
async function fromPublicApi(): Promise<GithubStats | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
      {
        headers: { "User-Agent": "portfolio-2026" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data: { contributions?: Array<{ date: string; count: number }> } =
      await res.json();
    const all = data.contributions ?? [];
    if (all.length === 0) return null;
    const days = all
      .slice(-WINDOW_DAYS)
      .map((c) => ({ date: c.date, count: c.count }));
    return summarize(days, "public");
  } catch {
    return null;
  }
}

/**
 * Real GitHub activity. Prefers the authenticated commit search (includes
 * private-repo commits) when GITHUB_TOKEN is set and non-empty; otherwise
 * falls back to the public contribution calendar. Cached via ISR.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const authed = await fromCommitSearch(token);
    if (authed && authed.total > 0) return authed;
  }
  return fromPublicApi();
}
