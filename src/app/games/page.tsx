import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumb, gamesItemList } from "@/lib/structured-data";
import { GAMES } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description: "A little arcade — classic games rebuilt in the browser.",
};

export default function GamesPage() {
  return (
    <Section>
      <StructuredData
        data={[
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Games", path: "/games" },
          ]),
          gamesItemList(),
        ]}
      />
      <Reveal>
        <SectionHeading
          eyebrow="// arcade"
          title={
            <>
              Take a <span className="text-gradient">break</span>
            </>
          }
          description="Classic games, rebuilt from scratch. Pick one and play."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {GAMES.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="card-elevated hover-glow group flex aspect-4/3 flex-col justify-between p-6"
            >
              <span className="text-3xl" aria-hidden>
                {game.emoji}
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  {game.title}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {game.description}
                </p>
                <span className="text-primary mt-3 inline-block font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  play →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
