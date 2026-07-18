import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import Tetris from "@/components/games/tetris";

export const metadata: Metadata = {
  alternates: { canonical: "/games/tetris" },
  title: "Tetris",
  description: "Stack the falling blocks and clear lines.",
};

export default function TetrisPage() {
  return (
    <GameShell title="Tetris" description="Stack the blocks and clear lines.">
      <Tetris />
    </GameShell>
  );
}
