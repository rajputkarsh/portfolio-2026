import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import Minesweeper from "@/components/games/minesweeper";

export const metadata: Metadata = {
  alternates: { canonical: "/games/minesweeper" },
  title: "Minesweeper",
  description: "Clear the field without hitting a mine.",
};

export default function MinesweeperPage() {
  return (
    <GameShell
      title="Minesweeper"
      description="Clear every safe cell without detonating a mine."
    >
      <Minesweeper />
    </GameShell>
  );
}
