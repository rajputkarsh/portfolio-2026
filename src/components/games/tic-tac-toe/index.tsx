"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import {
  bestMove,
  getWinner,
  isFull,
  other,
  type Board,
  type Cell,
} from "./logic";

type Mode = "1p" | "2p";

const EMPTY: Board = Array(9).fill(null);

export default function TicTacToe() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<Board>(EMPTY);
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [result, setResult] = useState<Cell | "draw" | null>(null);
  const [line, setLine] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });

  const aiSymbol = other(playerSymbol);

  function finish(b: Board) {
    const w = getWinner(b);
    if (w) {
      setResult(w.winner);
      setLine(w.line);
      setScores((s) => ({
        ...s,
        [w.winner as "X" | "O"]: s[w.winner as "X" | "O"] + 1,
      }));
    } else if (isFull(b)) {
      setResult("draw");
      setScores((s) => ({ ...s, draw: s.draw + 1 }));
    }
  }

  function aiMove(b: Board) {
    const move = bestMove(b, aiSymbol);
    if (move < 0) return;
    const next = [...b];
    next[move] = aiSymbol;
    setBoard(next);
    if (getWinner(next) || isFull(next)) finish(next);
    else setTurn(playerSymbol);
  }

  function handleClick(i: number) {
    if (result || board[i]) return;
    if (mode === "1p" && turn !== playerSymbol) return;

    const next = [...board];
    next[i] = turn;
    setBoard(next);

    if (getWinner(next) || isFull(next)) {
      finish(next);
      return;
    }

    const nextTurn = other(turn);
    setTurn(nextTurn);
    if (mode === "1p" && nextTurn === aiSymbol) {
      setTimeout(() => aiMove(next), 350);
    }
  }

  function newRound() {
    setBoard(EMPTY);
    setResult(null);
    setLine([]);
    setTurn("X");
    // If human chose O in 1p, AI (X) opens.
    if (mode === "1p" && playerSymbol === "O") {
      setTimeout(() => aiMove(EMPTY), 350);
    }
  }

  function chooseMode(m: Mode) {
    setMode(m);
    setBoard(EMPTY);
    setResult(null);
    setLine([]);
    setTurn("X");
    setScores({ X: 0, O: 0, draw: 0 });
  }

  function startAsSymbol(symbol: "X" | "O") {
    setPlayerSymbol(symbol);
    setBoard(EMPTY);
    setResult(null);
    setLine([]);
    setTurn("X");
    if (symbol === "O") setTimeout(() => aiMove(EMPTY), 350);
  }

  // --- Mode selection ---
  if (!mode) {
    return (
      <div className="card-elevated flex w-full max-w-sm flex-col gap-4 p-8 text-center">
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          select mode
        </p>
        <Button onClick={() => chooseMode("1p")}>1 Player (vs computer)</Button>
        <Button variant="secondary" onClick={() => chooseMode("2p")}>
          2 Players
        </Button>
      </div>
    );
  }

  const status = result
    ? result === "draw"
      ? "It's a draw!"
      : `${result} wins!`
    : mode === "1p"
      ? turn === playerSymbol
        ? "Your turn"
        : "Computer thinking…"
      : `${turn}'s turn`;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      {/* Scores */}
      <div className="flex w-full items-stretch gap-2 text-center">
        {(["X", "draw", "O"] as const).map((k) => (
          <div key={k} className="card-elevated flex-1 py-3">
            <div className="text-primary font-mono text-xs uppercase">
              {k === "draw" ? "Draw" : k}
            </div>
            <div className="text-2xl font-bold">{scores[k]}</div>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium" aria-live="polite">
        {status}
      </p>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const win = line.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={!!cell || !!result}
              aria-label={`cell ${i + 1}`}
              className={cn(
                "flex h-20 w-20 items-center justify-center rounded-xl text-4xl font-bold transition-colors sm:h-24 sm:w-24",
                win
                  ? "gradient-brand text-white"
                  : "bg-muted hover:bg-muted/70",
                cell === "X" && !win && "text-primary",
                cell === "O" && !win && "text-accent"
              )}
            >
              {cell}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button size="sm" onClick={newRound}>
          New round
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setMode(null)}>
          Change mode
        </Button>
      </div>

      {mode === "1p" && !result && board.every((c) => !c) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Play as</span>
          <button
            onClick={() => startAsSymbol("X")}
            className={cn(
              "rounded-md px-2 py-0.5 font-mono",
              playerSymbol === "X"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground"
            )}
          >
            X
          </button>
          <button
            onClick={() => startAsSymbol("O")}
            className={cn(
              "rounded-md px-2 py-0.5 font-mono",
              playerSymbol === "O"
                ? "bg-accent/15 text-accent"
                : "text-muted-foreground"
            )}
          >
            O
          </button>
        </div>
      )}
    </div>
  );
}
