import { cn } from "@/utils/cn";

/** Brand-ish accent color per technology (falls back to indigo). */
const TECH_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  React: "#61dafb",
  "React.js": "#61dafb",
  "Next.js": "#818cf8",
  Node: "#3fa037",
  "Node.js": "#3fa037",
  Express: "#94a3b8",
  NestJS: "#e0234e",
  Hono: "#e36002",
  Hapi: "#f59e0b",
  "Tailwind CSS": "#38bdf8",
  SCSS: "#cc6699",
  "Material UI": "#0ea5e9",
  Redux: "#764abc",
  Recoil: "#3578e5",
  Zustand: "#a78bfa",
  PostgreSQL: "#4f80e1",
  MongoDB: "#4db33d",
  MySQL: "#5b8bb0",
  Redis: "#dc382d",
  AWS: "#ff9900",
  Firebase: "#ffca28",
  Git: "#f05032",
  GitHub: "#cbd5e1",
  GitLab: "#fc6d26",
  GraphQL: "#e535ab",
  Kafka: "#94a3b8",
  RabbitMQ: "#ff6600",
  ElasticSearch: "#f6b32b",
  AI: "#a78bfa",
};

const FALLBACK = "#6366f1";

export function TechChip({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const color = TECH_COLOR[name] ?? FALLBACK;
  return (
    <span
      className={cn(
        "border-border/70 bg-card/50 text-foreground/90 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm transition-colors",
        className
      )}
      style={{ borderColor: `color-mix(in oklab, ${color} 40%, transparent)` }}
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
      {name}
    </span>
  );
}
