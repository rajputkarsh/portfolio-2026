"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const GRID = 15;
const SPEED = 120;

type Point = { x: number; y: number };
type Status = "ready" | "playing" | "over";
type State = { snake: Point[]; food: Point; status: Status; score: number };

const eq = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

function randomFood(snake: Point[]): Point {
  while (true) {
    const p = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    if (!snake.some((s) => eq(s, p))) return p;
  }
}

function init(): State {
  const mid = Math.floor(GRID / 2);
  const snake = [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
  return { snake, food: randomFood(snake), status: "ready", score: 0 };
}

export default function Snakes() {
  const [state, setState] = useState<State>(init);
  const [best, setBest] = useState(0);
  const dir = useRef<Point>({ x: 1, y: 0 });
  const pending = useRef<Point>({ x: 1, y: 0 });

  const step = useCallback(() => {
    dir.current = pending.current;
    setState((prev) => {
      if (prev.status !== "playing") return prev;
      const head = {
        x: prev.snake[0].x + dir.current.x,
        y: prev.snake[0].y + dir.current.y,
      };
      if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID) {
        return { ...prev, status: "over" };
      }
      const eating = eq(head, prev.food);
      const body = eating ? prev.snake : prev.snake.slice(0, -1);
      if (body.some((s) => eq(s, head))) {
        return { ...prev, status: "over" };
      }
      const snake = [head, ...body];
      if (eating) {
        const score = prev.score + 1;
        setBest((b) => Math.max(b, score));
        return { snake, food: randomFood(snake), status: "playing", score };
      }
      return { ...prev, snake };
    });
  }, []);

  useEffect(() => {
    if (state.status !== "playing") return;
    const id = setInterval(step, SPEED);
    return () => clearInterval(id);
  }, [state.status, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };
      const nd = map[e.key];
      if (!nd) return;
      e.preventDefault();
      // Ignore direct reversal.
      if (nd.x === -dir.current.x && nd.y === -dir.current.y) return;
      pending.current = nd;
      setState((prev) =>
        prev.status === "ready" ? { ...prev, status: "playing" } : prev
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function restart() {
    dir.current = { x: 1, y: 0 };
    pending.current = { x: 1, y: 0 };
    setState(init());
  }

  const snakeSet = new Set(state.snake.map((p) => `${p.x},${p.y}`));
  const headKey = `${state.snake[0].x},${state.snake[0].y}`;
  const foodKey = `${state.food.x},${state.food.y}`;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="card-elevated px-3 py-1.5 font-mono text-sm">
          score {state.score}
        </div>
        <div className="card-elevated px-3 py-1.5 font-mono text-sm">
          best {best}
        </div>
      </div>

      <div
        className="bg-muted relative grid touch-none gap-px rounded-xl p-2"
        style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID;
          const y = Math.floor(i / GRID);
          const key = `${x},${y}`;
          const isHead = key === headKey;
          const isSnake = snakeSet.has(key);
          const isFood = key === foodKey;
          return (
            <div
              key={i}
              className={cn(
                "h-4 w-4 rounded-[3px] sm:h-5 sm:w-5",
                isHead
                  ? "gradient-brand"
                  : isSnake
                    ? "bg-primary"
                    : isFood
                      ? "bg-accent"
                      : "bg-foreground/[0.04]"
              )}
            />
          );
        })}

        {state.status !== "playing" && (
          <div className="bg-background/80 absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl backdrop-blur-sm">
            <p className="text-lg font-bold">
              {state.status === "over"
                ? `Game over — ${state.score}`
                : "Ready?"}
            </p>
            <Button
              size="sm"
              onClick={
                state.status === "over"
                  ? restart
                  : () => setState((p) => ({ ...p, status: "playing" }))
              }
            >
              {state.status === "over" ? "Play again" : "Start"}
            </Button>
          </div>
        )}
      </div>

      <p className="text-muted-foreground text-center text-xs">
        Arrow keys / WASD to steer.
      </p>
    </div>
  );
}
