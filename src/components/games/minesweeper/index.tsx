"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type Cell = {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};
type Board = Cell[][];
type Status = "ready" | "playing" | "won" | "lost";

const LEVELS = {
  Easy: { rows: 9, cols: 9, mines: 10 },
  Medium: { rows: 12, cols: 12, mines: 24 },
  Hard: { rows: 14, cols: 14, mines: 40 },
} as const;
type Level = keyof typeof LEVELS;

const NUM_COLOR = [
  "",
  "text-blue-500",
  "text-emerald-500",
  "text-red-500",
  "text-indigo-500",
  "text-amber-500",
  "text-cyan-500",
  "text-fuchsia-500",
  "text-foreground",
];

function makeEmpty(rows: number, cols: number): Board {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );
}

function neighbors(r: number, c: number, rows: number, cols: number) {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push([nr, nc]);
    }
  return out;
}

function plant(
  board: Board,
  mines: number,
  safeR: number,
  safeC: number
): Board {
  const rows = board.length;
  const cols = board[0].length;
  const next = board.map((row) => row.map((c) => ({ ...c })));
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (next[r][c].mine) continue;
    if (Math.abs(r - safeR) <= 1 && Math.abs(c - safeC) <= 1) continue;
    next[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      next[r][c].adjacent = neighbors(r, c, rows, cols).filter(
        ([nr, nc]) => next[nr][nc].mine
      ).length;
  return next;
}

function floodReveal(board: Board, r: number, c: number): Board {
  const rows = board.length;
  const cols = board[0].length;
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const stack: [number, number][] = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = next[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adjacent === 0 && !cell.mine) {
      for (const [nr, nc] of neighbors(cr, cc, rows, cols)) {
        if (!next[nr][nc].revealed) stack.push([nr, nc]);
      }
    }
  }
  return next;
}

const won = (board: Board) =>
  board.every((row) => row.every((c) => c.mine || c.revealed));

export default function Minesweeper() {
  const [level, setLevel] = useState<Level>("Easy");
  const [board, setBoard] = useState<Board>(() =>
    makeEmpty(LEVELS.Easy.rows, LEVELS.Easy.cols)
  );
  const [status, setStatus] = useState<Status>("ready");
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);

  const cfg = LEVELS[level];

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  function reset(next: Level = level) {
    setLevel(next);
    setBoard(makeEmpty(LEVELS[next].rows, LEVELS[next].cols));
    setStatus("ready");
    setFlags(0);
    setTime(0);
  }

  function revealAll(b: Board): Board {
    return b.map((row) => row.map((c) => ({ ...c, revealed: true })));
  }

  function handleReveal(r: number, c: number) {
    if (status === "won" || status === "lost") return;
    if (board[r][c].flagged || board[r][c].revealed) return;

    let working = board;
    if (status === "ready") {
      working = plant(board, cfg.mines, r, c);
      setStatus("playing");
    }

    if (working[r][c].mine) {
      setBoard(revealAll(working));
      setStatus("lost");
      return;
    }

    const next = floodReveal(working, r, c);
    if (won(next)) {
      setBoard(next);
      setStatus("won");
    } else {
      setBoard(next);
    }
  }

  function handleFlag(e: React.MouseEvent, r: number, c: number) {
    e.preventDefault();
    if (status === "won" || status === "lost" || board[r][c].revealed) return;
    const next = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = next[r][c];
    cell.flagged = !cell.flagged;
    setFlags((f) => f + (cell.flagged ? 1 : -1));
    setBoard(next);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(LEVELS) as Level[]).map((l) => (
          <button
            key={l}
            onClick={() => reset(l)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              level === l
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <div className="card-elevated px-3 py-1.5 font-mono text-sm">
          💣 {cfg.mines - flags}
        </div>
        <div className="text-lg font-semibold">
          {status === "won"
            ? "You won! 🎉"
            : status === "lost"
              ? "Boom 💥"
              : ""}
        </div>
        <div className="card-elevated px-3 py-1.5 font-mono text-sm tabular-nums">
          ⏱ {time}
        </div>
      </div>

      <div
        className="bg-muted grid gap-1 rounded-xl p-2"
        style={{ gridTemplateColumns: `repeat(${cfg.cols}, minmax(0, 1fr))` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleReveal(r, c)}
              onContextMenu={(e) => handleFlag(e, r, c)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded text-sm font-bold select-none sm:h-8 sm:w-8",
                cell.revealed
                  ? cell.mine
                    ? "bg-red-500/80 text-white"
                    : "bg-background"
                  : "bg-foreground/10 hover:bg-foreground/15",
                cell.revealed && !cell.mine && NUM_COLOR[cell.adjacent]
              )}
            >
              {cell.flagged && !cell.revealed
                ? "🚩"
                : cell.revealed
                  ? cell.mine
                    ? "💣"
                    : cell.adjacent || ""
                  : ""}
            </button>
          ))
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => reset()}>
          New game
        </Button>
        <p className="text-muted-foreground text-xs">
          Click to reveal · right-click to flag
        </p>
      </div>
    </div>
  );
}
