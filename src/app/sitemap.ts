import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";
import { GAMES } from "@/content/games";
import { PRODUCTS, isLive } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const top = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/products", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/education", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/games", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  // Offline products are noindex — keep them out of the sitemap too.
  const products = PRODUCTS.filter(isLive).map((p) => ({
    path: `/products/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.8 : 0.6,
  }));

  const games = GAMES.map((g) => ({
    path: `/games/${g.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const entries: MetadataRoute.Sitemap = [...top, ...products, ...games].map(
    (r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })
  );

  // External blog (kept in the nav).
  entries.push({
    url: "https://blogs.utkarshrajput.com",
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  });

  return entries;
}
