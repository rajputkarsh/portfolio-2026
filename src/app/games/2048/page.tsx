import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import Game2048 from "@/components/games/2048";

export const metadata: Metadata = {
  alternates: { canonical: "/games/2048" },
  title: "2048",
  description: "Slide tiles, merge numbers, and reach 2048.",
};

export default function Game2048Page() {
  return (
    <GameShell title="2048" description="Slide, merge, and reach 2048.">
      <Game2048 />
    </GameShell>
  );
}
