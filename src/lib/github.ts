import "server-only";
import { profile } from "@/content/profile";
import { summarize, type GithubDay, type GithubStats } from "./contributions";

export type { GithubDay, GithubStats };

const WINDOW_DAYS = 371;

function dayKey(d: Date) {
  return d.toISOString().split("T")[0];
}

const CHUNK_DAYS = 30;
const MAX_PAGES_PER_CHUNK = 4;

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

/**
 * Authenticated commit search — counts commits the token can see (incl. private
 * repos), which the public contribution graph often misses.
 *
 * Queried in ~monthly chunks and sorted by author-date so we stay under the
 * search API's 1000-result ceiling and never lose recent commits (which would
 * silently zero out the current streak). `total_count` per chunk gives an exact
 * total even when we don't page through every item.
 */
async function fromCommitSearch(token: string): Promise<GithubStats | null> {
  const counts: Record<string, number> = {};
  let total = 0;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-2026",
  };

  try {
    for (let offset = 0; offset < WINDOW_DAYS; offset += CHUNK_DAYS) {
      const to = dayKey(daysAgo(offset));
      const from = dayKey(
        daysAgo(Math.min(offset + CHUNK_DAYS - 1, WINDOW_DAYS))
      );
      const query = `author:${profile.githubUsername}+author-date:${from}..${to}`;

      for (let page = 1; page <= MAX_PAGES_PER_CHUNK; page++) {
        const res = await fetch(
          `https://api.github.com/search/commits?q=${query}&sort=author-date&order=desc&per_page=100&page=${page}`,
          { headers, next: { revalidate: 3600 } }
        );
        if (!res.ok) break;
        const data: {
          total_count?: number;
          items?: Array<{ commit?: { author?: { date?: string } } }>;
        } = await res.json();

        if (page === 1) total += data.total_count ?? 0;

        const items = data.items ?? [];
        for (const item of items) {
          const date = item.commit?.author?.date?.split("T")[0];
          if (date) counts[date] = (counts[date] ?? 0) + 1;
        }
        if (items.length < 100) break;
      }
    }
  } catch {
    return null;
  }

  if (total === 0) return null; // nothing found → let the public source try

  const days: GithubDay[] = [];
  for (let i = WINDOW_DAYS; i >= 0; i--) {
    const key = dayKey(daysAgo(i));
    days.push({ date: key, count: counts[key] ?? 0 });
  }

  // `total` from total_count is exact; the per-day counts are what we paged in.
  return { ...summarize(days, "authenticated"), total };
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

    const today = dayKey(new Date());
    const days = all
      .filter((c) => c.date <= today) // drop any future-dated padding
      .slice(-WINDOW_DAYS)
      .map((c) => ({ date: c.date, count: c.count }));

    return summarize(days, "public");
  } catch {
    return null;
  }
}

/**
 * Real GitHub activity. Prefers the authenticated commit search (includes
 * private-repo commits) when GITHUB_TOKEN is set; otherwise falls back to the
 * public contribution calendar. Cached via ISR.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    const authed = await fromCommitSearch(token);
    if (authed && authed.total > 0) return authed;
  }
  return fromPublicApi();
}
