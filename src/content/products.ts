export type ProductLink = {
  href: string;
  type: "demo" | "source" | "npm";
};

/**
 * Case-study copy for the product detail page (`/products/<slug>`).
 * Every field is optional — the page renders only the sections you fill in.
 *
 * To flesh out a product, add:
 *   caseStudy: {
 *     role: "Design, engineering & deployment",
 *     timeline: "2025",
 *     problem: "What was broken / who it's for.",
 *     build:   "What you actually built and the key decisions.",
 *     outcome: "The measurable result — users, latency, revenue, time saved.",
 *     highlights: ["Notable detail", "Another one"],
 *   }
 */
export type CaseStudy = {
  role?: string;
  timeline?: string;
  problem?: string;
  build?: string;
  /** Leave empty until you have a real, verifiable result — don't guess. */
  outcome?: string;
  highlights?: string[];
};

export type Product = {
  slug: string;
  title: string;
  /** One-line summary. Empty when the source only listed a tech stack. */
  description?: string;
  stack?: string[];
  link: ProductLink;
  featured?: boolean;
  /**
   * "offline" when the hosted demo no longer responds (4xx/5xx). Offline
   * products stay listed as portfolio history but are de-indexed, dropped from
   * the sitemap and structured data, and never render a live link — a dead
   * link costs more in credibility and crawl budget than the page gains.
   */
  status?: "live" | "offline";
  caseStudy?: CaseStudy;
};

export const isLive = (p: Product) => p.status !== "offline";

/**
 * Sourced from the live portfolio (utkarshrajput.com/projects). Descriptions
 * are shown only where the source provided prose; otherwise the stack is the
 * primary content. Enrich freely with outcomes/impact/screenshots.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "astroniq",
    title: "Astroniq",
    description:
      "An astrology-based AI chatbot that understands you and answers questions personalised to your chart — plus numerology, tarot, and premium reports.",
    stack: ["Next.js", "AI", "TypeScript"],
    link: { href: "https://astroniq.app/", type: "demo" },
    featured: true,
    caseStudy: {
      role: "Product, design & full-stack engineering",
      problem:
        "Astrology apps tend to hand you a generic daily horoscope or bury you in jargon. Neither actually helps you understand why you are the way you are.",
      build:
        "A conversational AI that reads your birth chart and answers questions in plain language — layered with numerology, tarot and long-form premium reports.",
      outcome: "",
    },
  },
  {
    slug: "astronode",
    title: "Astronode — Astrology as a Service",
    description:
      "An astrology API with 130+ endpoints across 7 traditions — birth charts, compatibility, dashas, horary, and forecasts.",
    stack: ["Node.js", "API", "TypeScript"],
    link: { href: "https://astronode.dev/", type: "demo" },
    featured: true,
    caseStudy: {
      role: "API design & backend engineering",
      problem:
        "Building anything astrology-related means implementing ephemeris maths, house systems and several traditions from scratch — months of work before you ship a single feature.",
      build:
        "Astrology as a service: 130+ endpoints spanning 7 traditions, all returning one consistent JSON shape — birth charts, compatibility, dashas, horary and forecasts.",
      outcome: "",
    },
  },
  {
    slug: "ai-code-editor",
    title: "AI Code Editor",
    description:
      "A web-based code editor with AI assistance, terminal commands, and live preview modes.",
    stack: ["Next.js", "AI", "TypeScript"],
    link: { href: "https://ai-code-editor.utkarsh.app/", type: "demo" },
    featured: true,
    caseStudy: {
      role: "Product & full-stack engineering",
      problem:
        "Prototyping in the browser usually means juggling an editor, a terminal and a preview tab — every context switch breaks flow.",
      build:
        "A web-based editor that folds AI assistance, terminal commands and live preview into a single surface, so writing, running and seeing the result happen in one place.",
      outcome: "",
    },
  },
  {
    slug: "heera",
    title: "Heera — Project Management Tool",
    stack: ["Next.js", "TanStack Query", "HonoJS", "TypeScript"],
    link: { href: "https://heera.utkarsh.app/", type: "demo" },
    featured: true,
    caseStudy: {
      role: "Product & full-stack engineering",
      problem:
        "Small teams outgrow shared spreadsheets quickly, but full project suites bring more process and cost than they're worth.",
      build:
        "A focused project management tool — workspaces, projects and tasks — built on a typed end-to-end stack with TanStack Query on the client and Hono on the edge.",
      outcome: "",
    },
  },
  {
    slug: "web-analytics",
    title: "Web Analytics",
    stack: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "WebSockets",
      "PostgreSQL",
    ],
    link: { href: "https://analytics.utkarsh.app/", type: "demo" },
  },
  {
    slug: "code-editor",
    title: "Code Editor",
    stack: ["TypeScript", "Next.js", "Tailwind CSS", "Convex", "Lemon Squeezy"],
    link: { href: "https://code-editor.utkarsh.app/", type: "demo" },
  },
  {
    slug: "autosure",
    title: "AutoSure",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "Google Generative AI",
      "TypeScript",
      "Supabase",
    ],
    link: { href: "https://autosure.utkarsh.app/", type: "demo" },
    status: "offline", // host returns 403
  },
  {
    slug: "vii-call",
    title: "Vii Call — Conference Video Calls",
    stack: ["TypeScript", "Next.js", "shadcn/ui", "Stream.io"],
    link: { href: "https://vii-call.utkarsh.app/", type: "demo" },
    status: "offline", // host returns 500
  },
  {
    slug: "snippet-master",
    title: "Snippet Master",
    description:
      "Save all your snippets in one place with tags — find, search, and filter by tag.",
    link: { href: "https://snippet.utkarsh.app/", type: "demo" },
  },
  {
    slug: "rag-cli",
    title: "CLI-based Chatbot (rag-cli)",
    description: "A CLI tool for chatting with your documents and images.",
    stack: ["CLI", "RAG"],
    link: { href: "https://www.npmjs.com/package/rag-cli", type: "npm" },
  },
  {
    slug: "form-builder",
    title: "Drag & Drop Form Builder",
    stack: ["Next.js", "Radix UI", "Tailwind CSS", "Prisma", "MySQL"],
    link: { href: "https://form-builder.utkarsh.app/", type: "demo" },
  },
  {
    slug: "linkify",
    title: "Linkify",
    stack: ["Next.js", "MongoDB", "AWS"],
    link: { href: "https://shorten.utkarsh.app/", type: "demo" },
  },
  {
    slug: "ai-image-generator",
    title: "AI Image Generator",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "DALL·E"],
    link: { href: "https://stable-diffusion.utkarsh.app/", type: "demo" },
  },
  {
    slug: "web-scraper",
    title: "Web Scraper (ElasticSearch)",
    stack: ["React", "Bootstrap", "ElasticSearch", "Node.js", "Express"],
    link: {
      href: "https://github.com/rajputkarsh/crawler-with-elasticsearch",
      type: "source",
    },
  },
  {
    slug: "matrix-effect",
    title: "Matrix Effect",
    description: "An NPM package for React.",
    stack: ["React", "NPM"],
    link: {
      href: "https://www.npmjs.com/package/matrix-effect-react",
      type: "npm",
    },
  },
  {
    slug: "document-viewer",
    title: "Document Viewer",
    stack: ["React", "Firebase"],
    link: { href: "https://document-viewer.utkarsh.app/", type: "demo" },
  },
  {
    slug: "dice-roll",
    title: "Dice Roll Game",
    stack: ["React", "Redux Toolkit"],
    link: { href: "https://dice-roll.utkarsh.app/", type: "demo" },
    status: "offline", // host returns 404
  },
  {
    slug: "windows-11",
    title: "Windows 11",
    stack: ["React", "Tailwind CSS", "Firebase", "Workbox"],
    link: { href: "https://windows-11.utkarsh.app/", type: "demo" },
  },
  {
    slug: "music-player",
    title: "Music Player (Spotify)",
    stack: ["Next.js", "Tailwind CSS"],
    link: { href: "https://music-player.utkarsh.app/", type: "demo" },
  },
  {
    slug: "whatsapp-clone",
    title: "WhatsApp Clone",
    stack: ["React", "Tailwind CSS", "Firebase"],
    link: {
      href: "https://github.com/rajputkarsh/whatsapp-clone",
      type: "source",
    },
  },
  {
    slug: "food-delivery",
    title: "Food Delivery UI",
    stack: ["React", "Tailwind CSS", "Firebase"],
    link: { href: "https://food-delivery-69e51.web.app/", type: "demo" },
  },
  {
    slug: "video-calling",
    title: "Video Calling App",
    stack: ["Node.js", "Socket.IO", "PeerJS"],
    link: {
      href: "https://github.com/rajputkarsh/video-calling-nodejs",
      type: "source",
    },
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);
export const OTHER_PRODUCTS = PRODUCTS.filter((p) => !p.featured);

export const getProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);

/** Other products, ranked by shared stack so "related" is actually related. */
export function relatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  const stack = new Set(current?.stack ?? []);
  return (
    PRODUCTS.filter((p) => p.slug !== slug)
      .map((p) => ({
        p,
        score: (p.stack ?? []).filter((t) => stack.has(t)).length,
      }))
      // Live products first — recommending an archived demo is a dead end for
      // the reader. With 19 live products, archived ones effectively never
      // surface here, but the ordering keeps it correct if that ratio changes.
      .sort(
        (a, b) => Number(isLive(b.p)) - Number(isLive(a.p)) || b.score - a.score
      )
      .slice(0, limit)
      .map(({ p }) => p)
  );
}
