import { SITE_URL, profile } from "@/content/profile";
import { PRODUCTS, isLive } from "@/content/products";
import { EDUCATION } from "@/content/education";

/** Person + WebSite structured data for rich results. */
export function JsonLd() {
  const sameAs = [
    profile.social.github,
    profile.social.linkedin,
    profile.social.twitter,
    profile.social.stackoverflow,
  ].filter(Boolean);

  // Derived from content so the schema can't drift from what's on the page.
  const knowsAbout = [
    ...new Set(PRODUCTS.filter(isLive).flatMap((p) => p.stack ?? [])),
  ].sort();

  const alumniOf = [
    ...new Set(EDUCATION.map((m) => m.institution).filter(Boolean)),
  ].map((name) => ({ "@type": "EducationalOrganization", name }));

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.fullName,
      url: SITE_URL,
      jobTitle: profile.role,
      description: profile.summary,
      address: {
        "@type": "PostalAddress",
        addressCountry: profile.location,
      },
      knowsAbout,
      alumniOf,
      sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${profile.fullName} — Portfolio`,
      url: SITE_URL,
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted (built from local content).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
