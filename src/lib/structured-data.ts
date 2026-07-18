import { SITE_URL, profile } from "@/content/profile";
import { PRODUCTS } from "@/content/products";
import { GAMES } from "@/content/games";

type Crumb = { name: string; path: string };

export function breadcrumb(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function productsItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products by Utkarsh",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: p.link.href,
        ...(p.description ? { description: p.description } : {}),
        ...(p.stack?.length ? { keywords: p.stack.join(", ") } : {}),
        author: { "@type": "Person", name: profile.fullName },
      },
    })),
  };
}

/** SoftwareApplication schema for a single product detail page. */
export function productSchema(product: {
  slug: string;
  title: string;
  description?: string;
  stack?: string[];
  link: { href: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/${product.slug}`,
    sameAs: product.link.href,
    image: `${SITE_URL}/products/${product.slug}.webp`,
    ...(product.description ? { description: product.description } : {}),
    ...(product.stack?.length ? { keywords: product.stack.join(", ") } : {}),
    author: { "@type": "Person", name: profile.fullName, url: SITE_URL },
  };
}

export function gamesItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Games by Utkarsh",
    itemListElement: GAMES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Game",
        name: g.title,
        description: g.description,
        url: `${SITE_URL}/games/${g.slug}`,
      },
    })),
  };
}
