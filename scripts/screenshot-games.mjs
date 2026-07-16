import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

// Captures each game's board from the running app (default: prod on :3100).
//   BASE_URL=http://localhost:3100 node scripts/screenshot-games.mjs [slugs...]
const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const ALL = [
  "2048",
  "tic-tac-toe",
  "snakes",
  "tetris",
  "minesweeper",
  "solitaire",
];
const only = new Set(process.argv.slice(2));
const games = only.size ? ALL.filter((s) => only.has(s)) : ALL;

const OUT = "public/games";
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let ok = 0;
const failed = [];

for (const slug of games) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);
    await page.goto(`${BASE}/games/${slug}`, { waitUntil: "networkidle0" });
    await sleep(2500); // let the board render / animations start
    const el = await page.$("#game-capture");
    if (!el) throw new Error("no #game-capture element");
    const shot = await el.screenshot({ type: "png" });
    await sharp(shot)
      .resize(1200, 750, { fit: "contain", background: "#0b1020" })
      .webp({ quality: 82 })
      .toFile(`${OUT}/${slug}.webp`);
    ok += 1;
    console.log(`✓ ${slug}`);
  } catch (err) {
    failed.push(slug);
    console.log(`✗ ${slug} — ${err.message.split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(
  `\nDone: ${ok}/${games.length} captured.` +
    (failed.length ? ` Failed: ${failed.join(", ")}` : "")
);
