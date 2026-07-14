import sharp from "sharp";
import { mkdirSync } from "node:fs";

// Brand mark: full-bleed indigo→violet gradient with a geometric white "U".
// Font-free (drawn as a path) so it rasterizes consistently everywhere.
const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="0.5" stop-color="#6366f1"/>
      <stop offset="1" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <path d="M180 148 L180 280 Q180 372 256 372 Q332 372 332 280 L332 148"
        fill="none" stroke="#ffffff" stroke-width="52"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const buf = Buffer.from(svg);

const targets = [
  { file: "public/icon-192x192.png", size: 192 },
  { file: "public/icon-256x256.png", size: 256 },
  { file: "public/icon-384x384.png", size: 384 },
  { file: "public/icon-512x512.png", size: 512 },
  { file: "public/icon-maskable-512.png", size: 512 },
  { file: "public/apple-touch-icon.png", size: 180 },
  { file: "src/app/icon.png", size: 512 },
  { file: "src/app/apple-icon.png", size: 180 },
];

mkdirSync("public", { recursive: true });

for (const { file, size } of targets) {
  await sharp(buf, { density: 384 }).resize(size, size).png().toFile(file);
  console.log(`✓ ${file} (${size}px)`);
}

console.log("Icons generated.");
