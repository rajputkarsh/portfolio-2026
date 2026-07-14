import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import Snakes from "@/components/games/snakes";

export const metadata: Metadata = {
  title: "Snakes",
  description: "Eat, grow, and don't bite yourself.",
};

export default function SnakesPage() {
  return (
    <GameShell title="Snakes" description="Eat, grow, and don't bite yourself.">
      <Snakes />
    </GameShell>
  );
}
