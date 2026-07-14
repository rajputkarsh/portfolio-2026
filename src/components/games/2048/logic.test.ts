import { describe, it, expect } from "vitest";
import { slide, move, canMove, has2048, type Grid } from "./logic";

describe("2048 slide", () => {
  it("merges an adjacent pair once", () => {
    expect(slide([2, 2, 0, 0])).toEqual({ row: [4, 0, 0, 0], gained: 4 });
  });
  it("compacts gaps before merging", () => {
    expect(slide([2, 0, 2, 0])).toEqual({ row: [4, 0, 0, 0], gained: 4 });
  });
  it("merges two independent pairs", () => {
    expect(slide([2, 2, 2, 2])).toEqual({ row: [4, 4, 0, 0], gained: 8 });
  });
  it("does not chain-merge a freshly merged tile", () => {
    expect(slide([2, 2, 4, 0])).toEqual({ row: [4, 4, 0, 0], gained: 4 });
  });
});

describe("2048 move", () => {
  it("reports moved=false when nothing changes", () => {
    const g: Grid = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ];
    expect(move(g, "left").moved).toBe(false);
    expect(canMove(g)).toBe(false);
  });
  it("slides tiles left and accrues score", () => {
    const g: Grid = [
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const res = move(g, "left");
    expect(res.moved).toBe(true);
    expect(res.gained).toBe(4);
    expect(res.grid[0]).toEqual([4, 0, 0, 0]);
  });
});

describe("2048 win detection", () => {
  it("detects a 2048 tile", () => {
    expect(
      has2048([
        [2048, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    ).toBe(true);
    expect(
      has2048([
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ])
    ).toBe(false);
  });
});
