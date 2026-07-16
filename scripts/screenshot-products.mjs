import puppeteer from "puppeteer";
import sharp from "sharp";
import { mkdirSync } from "node:fs";

// slug → live URL (kept in sync with src/content/products.ts)
const PRODUCTS = [
  ["astroniq", "https://astroniq.app/"],
  ["astronode", "https://astronode.dev/"],
  ["ai-code-editor", "https://ai-code-editor.utkarsh.app/"],
  ["heera", "https://heera.utkarsh.app/"],
  ["web-analytics", "https://analytics.utkarsh.app/"],
  ["code-editor", "https://code-editor.utkarsh.app/"],
  ["autosure", "https://autosure.utkarsh.app/"],
  ["vii-call", "https://vii-call.utkarsh.app/"],
  ["snippet-master", "https://snippet.utkarsh.app/"],
  ["rag-cli", "https://www.npmjs.com/package/rag-cli"],
  ["form-builder", "https://form-builder.utkarsh.app/"],
  ["linkify", "https://shorten.utkarsh.app/"],
  ["ai-image-generator", "https://stable-diffusion.utkarsh.app/"],
  ["web-scraper", "https://github.com/rajputkarsh/crawler-with-elasticsearch"],
  ["matrix-effect", "https://www.npmjs.com/package/matrix-effect-react"],
  ["document-viewer", "https://document-viewer.utkarsh.app/"],
  ["dice-roll", "https://dice-roll.utkarsh.app/"],
  ["windows-11", "https://windows-11.utkarsh.app/"],
  ["music-player", "https://music-player.utkarsh.app/"],
  ["whatsapp-clone", "https://github.com/rajputkarsh/whatsapp-clone"],
  ["food-delivery", "https://food-delivery-69e51.web.app/"],
  ["video-calling", "https://github.com/rajputkarsh/video-calling-nodejs"],
];

const OUT = "public/products";
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Optional: pass slugs to re-capture only those, and WAIT_MS to slow it down.
//   WAIT_MS=9000 node scripts/screenshot-products.mjs music-player autosure
const only = new Set(process.argv.slice(2));
const targets = only.size
  ? PRODUCTS.filter(([slug]) => only.has(slug))
  : PRODUCTS;
const WAIT = Number(process.env.WAIT_MS ?? 3500);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

let ok = 0;
const failed = [];

for (const [slug, url] of targets) {
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1.5,
    });
    await page.setDefaultNavigationTimeout(40000);
    await page
      .goto(url, { waitUntil: "networkidle0" })
      .catch(() => page.goto(url, { waitUntil: "domcontentloaded" }));
    await sleep(WAIT); // let content/animations settle
    const shot = await page.screenshot({ type: "png" });
    await sharp(shot)
      .resize(1200, 750, { fit: "cover", position: "top" })
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
  `\nDone: ${ok}/${targets.length} captured.` +
    (failed.length ? ` Failed: ${failed.join(", ")}` : "")
);
