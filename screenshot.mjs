import { mkdir, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const OUT_DIR = join(ROOT, "temporary screenshots");

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error("usage: node screenshot.mjs <url> [label]");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

async function nextIndex() {
  const files = await readdir(OUT_DIR).catch(() => []);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)(?:-[^.]+)?\.png$/);
    if (m) {
      const n = Number(m[1]);
      if (n > max) max = n;
    }
  }
  return max + 1;
}

const index = await nextIndex();
const suffix = label ? `-${label}` : "";
const fileName = `screenshot-${index}${suffix}.png`;
const filePath = join(OUT_DIR, fileName);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(filePath);
} finally {
  await browser.close();
}
