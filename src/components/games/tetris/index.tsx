"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const COLS = 10;
const ROWS = 20;
const SPEED = 480;

type Shape = number[][];
type Piece = { shape: Shape; color: string; x: number; y: number };
type Board = (string | null)[][];
type Model = {
  board: Board;
  piece: Piece;
  score: number;
  lines: number;
  status: "playing" | "over";
};

const PIECES: { shape: Shape; color: string }[] = [
  { shape: [[1, 1, 1, 1]], color: "bg-cyan-400" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-amber-300",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "bg-violet-400",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "bg-emerald-400",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "bg-red-400",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "bg-blue-400",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "bg-orange-400",
  },
];

const POINTS = [0, 40, 100, 300, 1200];

const emptyBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array<string | null>(COLS).fill(null));

const rotate = (s: Shape): Shape =>
  s[0].map((_, i) => s.map((row) => row[i]).reverse());

function spawn(): Piece {
  const p = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    shape: p.shape,
    color: p.color,
    x: Math.floor((COLS - p.shape[0].length) / 2),
    y: 0,
  };
}

function collides(board: Board, shape: Shape, x: number, y: number): boolean {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (!shape[r][c]) continue;
      const br = y + r;
      const bc = x + c;
      if (bc < 0 || bc >= COLS || br >= ROWS) return true;
      if (br >= 0 && board[br][bc]) return true;
    }
  }
  return false;
}

function merge(board: Board, p: Piece): Board {
  const next = board.map((row) => [...row]);
  p.shape.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v && p.y + r >= 0) next[p.y + r][p.x + c] = p.color;
    })
  );
  return next;
}

function clearLines(board: Board): { board: Board; cleared: number } {
  const kept = board.filter((row) => row.some((cell) => !cell));
  const cleared = ROWS - kept.length;
  while (kept.length < ROWS)
    kept.unshift(Array<string | null>(COLS).fill(null));
  return { board: kept, cleared };
}

const initModel = (): Model => ({
  board: emptyBoard(),
  piece: spawn(),
  score: 0,
  lines: 0,
  status: "playing",
});

function lock(m: Model): Model {
  const merged = merge(m.board, m.piece);
  const { board, cleared } = clearLines(merged);
  const next = spawn();
  const over = collides(board, next.shape, next.x, next.y);
  return {
    board,
    piece: over ? m.piece : next,
    score: m.score + POINTS[cleared],
    lines: m.lines + cleared,
    status: over ? "over" : "playing",
  };
}

function drop(m: Model): Model {
  if (m.status !== "playing") return m;
  const p = m.piece;
  if (!collides(m.board, p.shape, p.x, p.y + 1)) {
    return { ...m, piece: { ...p, y: p.y + 1 } };
  }
  return lock(m);
}

const HANDLED = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  " ",
]);

function applyKey(m: Model, key: string): Model {
  if (m.status !== "playing") return m;
  const p = m.piece;
  switch (key) {
    case "ArrowLeft":
      return collides(m.board, p.shape, p.x - 1, p.y)
        ? m
        : { ...m, piece: { ...p, x: p.x - 1 } };
    case "ArrowRight":
      return collides(m.board, p.shape, p.x + 1, p.y)
        ? m
        : { ...m, piece: { ...p, x: p.x + 1 } };
    case "ArrowDown":
      return drop(m);
    case "ArrowUp": {
      const rotated = rotate(p.shape);
      for (const dx of [0, -1, 1, -2, 2]) {
        if (!collides(m.board, rotated, p.x + dx, p.y)) {
          return { ...m, piece: { ...p, shape: rotated, x: p.x + dx } };
        }
      }
      return m;
    }
    case " ": {
      let y = p.y;
      while (!collides(m.board, p.shape, p.x, y + 1)) y += 1;
      return lock({ ...m, piece: { ...p, y } });
    }
    default:
      return m;
  }
}

export default function Tetris() {
  const [model, setModel] = useState<Model>(initModel);

  useEffect(() => {
    const id = setInterval(() => setModel(drop), SPEED);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!HANDLED.has(e.key)) return;
      e.preventDefault();
      setModel((m) => applyKey(m, e.key));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const display = model.board.map((row) => [...row]);
  model.piece.shape.forEach((row, r) =>
    row.forEach((v, c) => {
      const br = model.piece.y + r;
      const bc = model.piece.x + c;
      if (v && br >= 0 && br < ROWS && bc >= 0 && bc < COLS)
        display[br][bc] = model.piece.color;
    })
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="card-elevated px-3 py-1.5 font-mono text-sm">
          score {model.score}
        </div>
        <div className="card-elevated px-3 py-1.5 font-mono text-sm">
          lines {model.lines}
        </div>
      </div>

      <div
        className="bg-muted relative grid gap-px rounded-xl p-2"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {display.flat().map((cell, i) => (
          <div
            key={i}
            className={cn(
              "h-5 w-5 rounded-[3px] sm:h-6 sm:w-6",
              cell ?? "bg-foreground/[0.04]"
            )}
          />
        ))}

        {model.status === "over" && (
          <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl backdrop-blur-sm">
            <p className="text-lg font-bold">Game over — {model.score}</p>
            <Button size="sm" onClick={() => setModel(initModel())}>
              Play again
            </Button>
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-center text-xs">
        ← → move · ↑ rotate · ↓ soft drop · space hard drop
      </p>
    </div>
  );
}
