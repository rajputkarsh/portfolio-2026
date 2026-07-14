"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const SIZE = 4;
type Grid = number[][];
type Dir = "left" | "right" | "up" | "down";

const empty = (): Grid =>
  Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));

function addRandom(grid: Grid): Grid {
  const cells: [number, number][] = [];
  grid.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v === 0) cells.push([r, c]);
    })
  );
  if (!cells.length) return grid;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = grid.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function slide(row: number[]): { row: number[]; gained: number } {
  const nums = row.filter((x) => x !== 0);
  const res: number[] = [];
  let gained = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
      const v = nums[i] * 2;
      res.push(v);
      gained += v;
      i++;
    } else {
      res.push(nums[i]);
    }
  }
  while (res.length < SIZE) res.push(0);
  return { row: res, gained };
}

const transpose = (g: Grid): Grid => g[0].map((_, c) => g.map((row) => row[c]));
const reverseRows = (g: Grid): Grid => g.map((row) => [...row].reverse());

function move(
  grid: Grid,
  dir: Dir
): { grid: Grid; gained: number; moved: boolean } {
  let work = grid;
  if (dir === "right") work = reverseRows(work);
  if (dir === "up") work = transpose(work);
  if (dir === "down") work = reverseRows(transpose(work));

  let gained = 0;
  let next = work.map((row) => {
    const s = slide(row);
    gained += s.gained;
    return s.row;
  });

  if (dir === "right") next = reverseRows(next);
  if (dir === "up") next = transpose(next);
  if (dir === "down") next = transpose(reverseRows(next));

  const moved = JSON.stringify(next) !== JSON.stringify(grid);
  return { grid: next, gained, moved };
}

function canMove(grid: Grid): boolean {
  return (["left", "right", "up", "down"] as Dir[]).some(
    (d) => move(grid, d).moved
  );
}

const has2048 = (g: Grid) => g.some((row) => row.some((v) => v >= 2048));

function init(): Grid {
  return addRandom(addRandom(empty()));
}

function tileClass(v: number): string {
  if (v === 0) return "bg-foreground/[0.04]";
  if (v <= 4) return "bg-primary/15 text-foreground";
  if (v <= 16) return "bg-primary/30 text-foreground";
  if (v <= 64) return "bg-primary/50 text-white";
  if (v <= 256) return "bg-primary/70 text-white";
  if (v < 2048) return "bg-primary text-white";
  return "gradient-brand text-white";
}

const KEY_DIR: Record<string, Dir> = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  ArrowDown: "down",
  a: "left",
  d: "right",
  w: "up",
  s: "down",
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(init);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const doMove = useCallback(
    (dir: Dir) => {
      if (over) return;
      setGrid((current) => {
        const { grid: next, gained, moved } = move(current, dir);
        if (!moved) return current;
        const withTile = addRandom(next);
        if (gained) {
          setScore((s) => {
            const ns = s + gained;
            setBest((b) => Math.max(b, ns));
            return ns;
          });
        }
        if (has2048(withTile)) setWon(true);
        if (!canMove(withTile)) setOver(true);
        return withTile;
      });
    },
    [over]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = KEY_DIR[e.key];
      if (!dir) return;
      e.preventDefault();
      doMove(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doMove]);

  function onTouchStart(e: React.TouchEvent) {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) doMove(dx > 0 ? "right" : "left");
    else doMove(dy > 0 ? "down" : "up");
  }

  function restart() {
    setGrid(init());
    setScore(0);
    setWon(false);
    setOver(false);
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex gap-2">
          <div className="card-elevated px-4 py-2 text-center">
            <div className="text-muted-foreground font-mono text-[10px] uppercase">
              score
            </div>
            <div className="text-lg font-bold">{score}</div>
          </div>
          <div className="card-elevated px-4 py-2 text-center">
            <div className="text-muted-foreground font-mono text-[10px] uppercase">
              best
            </div>
            <div className="text-lg font-bold">{best}</div>
          </div>
        </div>
        <Button size="sm" onClick={restart}>
          New game
        </Button>
      </div>

      <div
        className="bg-muted relative touch-none rounded-2xl p-3"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-4 gap-3">
          {grid.flat().map((v, i) => (
            <div
              key={i}
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-lg font-bold tabular-nums transition-colors sm:h-[4.5rem] sm:w-[4.5rem]",
                v >= 1024 ? "text-xl" : "text-2xl",
                tileClass(v)
              )}
            >
              {v || ""}
            </div>
          ))}
        </div>

        {(over || won) && (
          <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-sm">
            <p className="text-2xl font-bold">
              {over ? "Game over" : "You made 2048!"}
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={restart}>
                {over ? "Try again" : "New game"}
              </Button>
              {won && !over && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setWon(false)}
                >
                  Keep going
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-center text-xs">
        Use arrow keys / WASD, or swipe on touch.
      </p>
    </div>
  );
}
