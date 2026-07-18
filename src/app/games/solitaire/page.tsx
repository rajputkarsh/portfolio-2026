import type { Metadata } from "next";
import { GameShell } from "@/components/games/GameShell";
import Solitaire from "@/components/games/solitaire";

export const metadata: Metadata = {
  alternates: { canonical: "/games/solitaire" },
  title: "Solitaire",
  description: "Klondike solitaire — build the foundations to win.",
};

export default function SolitairePage() {
  return (
    <GameShell
      title="Solitaire"
      description="Klondike — build all four foundations from Ace to King."
    >
      <Solitaire />
    </GameShell>
  );
}
