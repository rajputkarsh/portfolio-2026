export type Cell = "X" | "O" | null;
export type Board = Cell[];

export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinner(
  board: Board
): { winner: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export const isFull = (board: Board) => board.every(Boolean);
export const other = (s: "X" | "O") => (s === "X" ? "O" : "X");

/** Minimax — returns the best move index for `ai`. */
export function bestMove(board: Board, ai: "X" | "O"): number {
  const human = other(ai);

  function score(b: Board, depth: number): number {
    const w = getWinner(b)?.winner;
    if (w === ai) return 10 - depth;
    if (w === human) return depth - 10;
    if (isFull(b)) return 0;
    return NaN;
  }

  function minimax(b: Board, turn: "X" | "O", depth: number): number {
    const s = score(b, depth);
    if (!Number.isNaN(s)) return s;
    const scores = b
      .map((cell, i) => {
        if (cell) return null;
        const next = [...b];
        next[i] = turn;
        return minimax(next, other(turn), depth + 1);
      })
      .filter((v): v is number => v !== null);
    return turn === ai ? Math.max(...scores) : Math.min(...scores);
  }

  let best = -Infinity;
  let move = -1;
  board.forEach((cell, i) => {
    if (cell) return;
    const next = [...board];
    next[i] = ai;
    const value = minimax(next, human, 1);
    if (value > best) {
      best = value;
      move = i;
    }
  });
  return move;
}
