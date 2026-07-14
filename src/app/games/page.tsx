import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Games",
  description: "A little arcade — games built for fun, rewritten in Tailwind.",
};

const GAMES = [
  "2048",
  "Tic-Tac-Toe",
  "Snakes",
  "Tetris",
  "Minesweeper",
  "Solitaire",
];

export default function GamesPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="// arcade"
          title={
            <>
              Take a <span className="text-gradient">break</span>
            </>
          }
          description="Games I built for fun — being rewritten in Tailwind and lazy-loaded in Phase 4."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {GAMES.map((g) => (
            <Card key={g} className="flex aspect-4/3 flex-col justify-end">
              <span className="text-muted-foreground font-mono text-xs">
                play
              </span>
              <h3 className="text-lg font-semibold">{g}</h3>
            </Card>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
