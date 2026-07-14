import config from "@/constants/config";

/** Canonical production URL for the portfolio (used by SEO/sitemap/JSON-LD). */
export const SITE_URL = "https://utkarshrajput.com";

export const profile = {
  name: "Utkarsh",
  fullName: "Utkarsh Rajput",
  role: "Full-Stack Developer & Product Engineer",
  headline: "I design & ship products, end to end.",
  summary:
    "A full-stack developer and product engineer — I think in product and business, not just tech, and take ideas from zero to a live, well-crafted product.",
  githubUsername: "rajputkarsh",
  location: "India",
  social: config.social,
} as const;
