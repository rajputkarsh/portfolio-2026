import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { GAMES } from "@/content/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/products", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/education", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/games", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const games = GAMES.map((g) => ({
    path: `/games/${g.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const entries: MetadataRoute.Sitemap = [...top, ...games].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // External blog (kept in the nav).
  entries.push({
    url: "https://blogs.utkarshrajput.com",
    changeFrequency: "monthly",
    priority: 0.5,
  });

  return entries;
}
