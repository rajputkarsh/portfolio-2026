import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/education", "/games"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
