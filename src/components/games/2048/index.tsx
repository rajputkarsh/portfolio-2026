"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import {
  addRandom,
  canMove,
  has2048,
  init,
  move,
  tileClass,
  type Dir,
  type Grid,
} from "./logic";

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
