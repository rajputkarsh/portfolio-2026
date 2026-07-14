import Link from "next/link";
import { Section } from "@/components/ui/Section";

/** Presentational wrapper for a single game route. */
export function GameShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Link
        href="/games"
        className="text-muted-foreground hover:text-foreground font-mono text-sm transition-colors"
      >
        ← all games
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground mt-2">{description}</p>
      ) : null}
      <div className="mt-8 flex justify-center">{children}</div>
    </Section>
  );
}
