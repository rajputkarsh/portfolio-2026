export type ProductLink = {
  href: string;
  type: "demo" | "source" | "npm";
};

export type Product = {
  slug: string;
  title: string;
  /** One-line summary. Empty when the source only listed a tech stack. */
  description?: string;
  stack?: string[];
  link: ProductLink;
  featured?: boolean;
};

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
  },
  {
    slug: "astronode",
    title: "Astronode — Astrology as a Service",
    description:
      "An astrology API with 130+ endpoints across 7 traditions — birth charts, compatibility, dashas, horary, and forecasts.",
    stack: ["Node.js", "API", "TypeScript"],
    link: { href: "https://astronode.dev/", type: "demo" },
    featured: true,
  },
  {
    slug: "ai-code-editor",
    title: "AI Code Editor",
    description:
      "A web-based code editor with AI assistance, terminal commands, and live preview modes.",
    stack: ["Next.js", "AI", "TypeScript"],
    link: { href: "https://ai-code-editor.utkarsh.app/", type: "demo" },
    featured: true,
  },
  {
    slug: "heera",
    title: "Heera — Project Management Tool",
    stack: ["Next.js", "TanStack Query", "HonoJS", "TypeScript"],
    link: { href: "https://heera.utkarsh.app/", type: "demo" },
    featured: true,
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
  },
  {
    slug: "vii-call",
    title: "Vii Call — Conference Video Calls",
    stack: ["TypeScript", "Next.js", "shadcn/ui", "Stream.io"],
    link: { href: "https://vii-call.utkarsh.app/", type: "demo" },
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
