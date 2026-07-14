import { SITE_URL, profile } from "@/content/profile";

/** Person + WebSite structured data for rich results. */
export function JsonLd() {
  const sameAs = [
    profile.social.github,
    profile.social.linkedin,
    profile.social.twitter,
    profile.social.stackoverflow,
  ].filter(Boolean);

  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.fullName,
      url: SITE_URL,
      jobTitle: profile.role,
      description: profile.summary,
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
