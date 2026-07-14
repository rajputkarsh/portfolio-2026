import "server-only";
import { profile } from "@/content/profile";

export type GithubDay = { date: string; count: number };
export type GithubStats = {
  total: number;
  activeDays: number;
  currentStreak: number;
  days: GithubDay[];
};

const WINDOW_DAYS = 90;

function dayKey(d: Date) {
  return d.toISOString().split("T")[0];
}

/**
 * Fetches recent commit activity for the profile's GitHub user via the
 * GitHub commit-search API. Returns null when GITHUB_TOKEN is absent or the
 * request fails, so callers can render a graceful fallback. Cached via ISR.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const since = new Date();
  since.setDate(since.getDate() - WINDOW_DAYS);
  const sinceStr = dayKey(since);

  const counts: Record<string, number> = {};
  let total = 0;

  try {
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.github.com/search/commits?q=author:${profile.githubUsername}+author-date:>=${sinceStr}&per_page=100&page=${page}`,
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
        if (!date) continue;
        counts[date] = (counts[date] ?? 0) + 1;
        total += 1;
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

  const activeDays = days.filter((d) => d.count > 0).length;

  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) currentStreak += 1;
    else break;
  }

  return { total, activeDays, currentStreak, days };
}
