import { describe, it, expect } from "vitest";
import { getWinner, bestMove, type Board } from "./logic";

describe("tic-tac-toe getWinner", () => {
  it("detects a winning row", () => {
    const board: Board = ["X", "X", "X", null, "O", null, "O", null, null];
    expect(getWinner(board)?.winner).toBe("X");
    expect(getWinner(board)?.line).toEqual([0, 1, 2]);
  });
  it("detects a winning diagonal", () => {
    const board: Board = ["O", "X", null, "X", "O", null, null, null, "O"];
    expect(getWinner(board)?.winner).toBe("O");
  });
  it("returns null with no winner", () => {
    expect(
      getWinner([null, null, null, null, null, null, null, null, null])
    ).toBeNull();
  });
});

describe("tic-tac-toe minimax", () => {
  it("takes an immediate win", () => {
    // O to move; O at 0,1 → wins at 2.
    const board: Board = ["O", "O", null, "X", "X", null, null, null, null];
    expect(bestMove(board, "O")).toBe(2);
  });
  it("blocks the opponent's winning move", () => {
    // O to move; X threatens 0,1 → O must block at 2.
    const board: Board = ["X", "X", null, "O", null, null, null, null, null];
    expect(bestMove(board, "O")).toBe(2);
  });
  it("returns a legal move on an empty board", () => {
    const board: Board = Array(9).fill(null);
    const move = bestMove(board, "X");
    expect(move).toBeGreaterThanOrEqual(0);
    expect(move).toBeLessThanOrEqual(8);
  });
});
