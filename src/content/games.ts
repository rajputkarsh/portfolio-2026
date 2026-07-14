export type GameMeta = {
  slug: string;
  title: string;
  description: string;
  emoji: string;
};

export const GAMES: GameMeta[] = [
  {
    slug: "2048",
    title: "2048",
    description: "Slide tiles, merge numbers, reach 2048.",
    emoji: "🔢",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Classic X and O — vs a friend or the computer.",
    emoji: "⭕",
  },
  {
    slug: "snakes",
    title: "Snakes",
    description: "Eat, grow, and don't bite yourself.",
    emoji: "🐍",
  },
  {
    slug: "tetris",
    title: "Tetris",
    description: "Stack the falling blocks and clear lines.",
    emoji: "🧱",
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    description: "Clear the field without hitting a mine.",
    emoji: "💣",
  },
  {
    slug: "solitaire",
    title: "Solitaire",
    description: "Klondike — build the foundations to win.",
    emoji: "🃏",
  },
];

export function getGame(slug: string): GameMeta | undefined {
  return GAMES.find((g) => g.slug === slug);
}
