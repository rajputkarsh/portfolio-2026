import { describe, it, expect } from "vitest";
import {
  currentStreak,
  longestStreak,
  summarize,
  type GithubDay,
} from "./contributions";

/** Build a day series from counts; dates are sequential and irrelevant here. */
const days = (...counts: number[]): GithubDay[] =>
  counts.map((count, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count,
  }));

describe("currentStreak", () => {
  it("counts consecutive active days ending today", () => {
    expect(currentStreak(days(0, 1, 1, 1))).toBe(3);
  });

  it("does NOT break when today has no commits yet (anchors on yesterday)", () => {
    expect(currentStreak(days(1, 1, 1, 0))).toBe(3);
  });

  it("breaks once a full day is missed", () => {
    expect(currentStreak(days(1, 1, 1, 0, 0))).toBe(0);
  });

  it("handles all-zero and empty input", () => {
    expect(currentStreak(days(0, 0, 0))).toBe(0);
    expect(currentStreak([])).toBe(0);
  });

  it("stops at the first gap going backwards", () => {
    expect(currentStreak(days(1, 1, 0, 1, 1))).toBe(2);
  });
});

describe("longestStreak", () => {
  it("finds the longest run anywhere in the window", () => {
    expect(longestStreak(days(1, 1, 0, 1, 1, 1, 0, 1))).toBe(3);
  });
  it("is 0 with no activity", () => {
    expect(longestStreak(days(0, 0))).toBe(0);
  });
});

describe("summarize", () => {
  it("totals commits and active days", () => {
    const stats = summarize(days(2, 0, 3, 1), "public");
    expect(stats.total).toBe(6);
    expect(stats.activeDays).toBe(3);
    expect(stats.currentStreak).toBe(2);
    expect(stats.longestStreak).toBe(2);
    expect(stats.source).toBe("public");
  });
});
