import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import TicTacToe from "@/components/games/tic-tac-toe";

export const metadata: Metadata = {
  alternates: { canonical: "/games/tic-tac-toe" },
  title: "Tic-Tac-Toe",
  description: "Classic X and O — play a friend or an unbeatable computer.",
};

export default function TicTacToePage() {
  return (
    <GameShell
      title="Tic-Tac-Toe"
      description="Beat a friend, or try your luck against the computer."
    >
      <TicTacToe />
    </GameShell>
  );
}
