export const SIZE = 4;
export type Grid = number[][];
export type Dir = "left" | "right" | "up" | "down";

export const empty = (): Grid =>
  Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));

export function addRandom(grid: Grid): Grid {
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

export function slide(row: number[]): { row: number[]; gained: number } {
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

export const transpose = (g: Grid): Grid =>
  g[0].map((_, c) => g.map((row) => row[c]));
export const reverseRows = (g: Grid): Grid =>
  g.map((row) => [...row].reverse());

export function move(
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

export function canMove(grid: Grid): boolean {
  return (["left", "right", "up", "down"] as Dir[]).some(
    (d) => move(grid, d).moved
  );
}

export const has2048 = (g: Grid) => g.some((row) => row.some((v) => v >= 2048));

export function init(): Grid {
  return addRandom(addRandom(empty()));
}

export function tileClass(v: number): string {
  if (v === 0) return "bg-foreground/[0.04]";
  if (v <= 4) return "bg-primary/15 text-foreground";
  if (v <= 16) return "bg-primary/30 text-foreground";
  if (v <= 64) return "bg-primary/50 text-white";
  if (v <= 256) return "bg-primary/70 text-white";
  if (v < 2048) return "bg-primary text-white";
  return "gradient-brand text-white";
}
