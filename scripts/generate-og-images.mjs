/**
 * Generates the 1200×630 social preview images in public/og/:
 *   home.jpg        – a screenshot of the live hero section (stats row hidden)
 *   <slug>.jpg      – one per project, using its first carousel slide
 *
 * Run after changing the hero, or a project's name, industry, tagline or first slide.
 * The home image is captured from a running copy of the site, so start one first
 * (a production server avoids the dev-mode badge):
 *   npm run build && npm run start     # in one terminal
 *   npm run og                          # in another
 *
 * Needs Google Chrome. Set CHROME_PATH if it isn't in the default macOS location,
 * and OG_SITE_URL if the site isn't running on http://localhost:3000.
 */
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/og");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "og-"));
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SITE = process.env.OG_SITE_URL ?? "http://localhost:3000";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Read the few fields we need straight from the TypeScript source (simple string literals),
// so this script runs with plain Node and no TypeScript toolchain.
const source = fs.readFileSync(path.join(ROOT, "features/portfolio/projects.ts"), "utf8");
const field = (block, key) => block.match(new RegExp(`\\n    ${key}:\\s*\\n?\\s*"([^"]*)"`))?.[1] ?? "";
const projects = source
  .split(/\n  \{\n    slug: /)
  .slice(1)
  .map((block) => ({
    slug: block.match(/^"([^"]+)"/)[1],
    name: field(block, "name"),
    industry: field(block, "industry"),
    tagline: field(block, "tagline"),
  }));

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const fileUrl = (file) => `file://${file}`;
const logo = fileUrl(path.join(ROOT, "public/brand/mc-logo.png"));

const baseCss = `
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{background:#f2efe8;color:#1f2723;font-family:"Avenir Next","Helvetica Neue",sans-serif;position:relative;-webkit-font-smoothing:antialiased}
  .glow{position:absolute;border-radius:50%;filter:blur(70px)}
  .brand{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:20px}
  .brand img{width:40px;height:40px;border-radius:9px}
  .kicker{font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b8431f}
  .serif{font-family:Georgia,"Times New Roman",serif;letter-spacing:-.035em}
  em{font-style:italic;color:#ee684b}
  .foot{position:absolute;left:64px;bottom:52px;font-size:17px;color:#4f5652;display:flex;gap:18px}
  .foot b{color:#1f2723}
`;

const projectHtml = (project, slide) => `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}
  .text{position:absolute;left:64px;top:150px;width:470px}
  h1{font-size:${project.name.length > 18 ? 58 : 72}px;line-height:1;font-weight:400;margin-top:16px}
  .tag{font-family:Georgia,serif;font-style:italic;font-size:24px;line-height:1.35;color:#3b4541;margin-top:20px}
  .shot{position:absolute;right:56px;top:128px;width:560px;aspect-ratio:16/10;border-radius:14px;overflow:hidden;
        box-shadow:0 40px 70px -30px rgba(31,39,35,.55),0 12px 24px -12px rgba(31,39,35,.3)}
  .shot img{width:100%;height:100%;object-fit:cover;display:block}
</style></head><body>
  <div class="glow" style="width:480px;height:480px;left:-180px;bottom:-240px;background:rgba(238,104,75,.2)"></div>
  <div class="glow" style="width:520px;height:520px;right:-120px;top:-240px;background:rgba(169,184,164,.5)"></div>
  <div class="brand"><img src="${logo}">Maybelle Catolin</div>
  <div class="text">
    <p class="kicker">${escape(project.industry)}</p>
    <h1 class="serif">${escape(project.name)}</h1>
    <p class="tag">${escape(project.tagline)}</p>
  </div>
  <div class="shot"><img src="${fileUrl(slide)}"></div>
  <div class="foot"><b>Case study</b><span>Senior Software Engineer · Frontend + Mobile</span></div>
</body></html>`;

async function render(name, html) {
  const htmlFile = path.join(TMP, `${name}.html`);
  const shot = path.join(TMP, `${name}.png`);
  fs.writeFileSync(htmlFile, html);
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      `--screenshot=${shot}`,
      fileUrl(htmlFile),
    ],
    { stdio: "ignore" },
  );
  const out = await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, `${name}.jpg`));
  console.log(`${name.padEnd(30)} ${out.width}x${out.height}  ${Math.round(out.size / 1024)} KB`);
}

/** Screenshots the hero of the running site at 1200×630 (rendered at 2× for sharpness). */
async function captureHome() {
  try {
    await fetch(SITE);
  } catch {
    console.warn(`home: skipped, nothing is running at ${SITE} (see the note at the top of this file)`);
    return;
  }
  const port = 9339;
  const chrome = spawn(
    CHROME,
    ["--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(TMP, "chrome")}`, "about:blank"],
    { stdio: "ignore" },
  );
  try {
    let target;
    for (let attempt = 0; attempt < 50 && !target; attempt++) {
      try {
        target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
      } catch {
        await sleep(200);
      }
    }
    if (!target) throw new Error("Chrome didn't start");

    const socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.onopen = resolve;
      socket.onerror = reject;
    });
    let nextId = 0;
    const pending = new Map();
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      pending.get(message.id)?.(message.result);
      pending.delete(message.id);
    };
    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const id = ++nextId;
        pending.set(id, resolve);
        socket.send(JSON.stringify({ id, method, params }));
      });

    await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false });
    // Settle straight into the final state rather than mid-animation.
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
    await send("Page.navigate", { url: SITE });
    await sleep(3500);
    // The stats row would be cut off at the bottom edge; the dev-mode badge isn't part of the site.
    await send("Runtime.evaluate", {
      expression: `document.head.insertAdjacentHTML("beforeend", "<style>ul[aria-label='Career highlights'], nextjs-portal { display: none !important; }</style>")`,
    });
    await sleep(500);
    const { data } = await send("Page.captureScreenshot", { format: "png" });
    socket.close();

    const out = await sharp(Buffer.from(data, "base64"))
      .resize(1200, 630)
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(OUT, "home.jpg"));
    console.log(`${"home".padEnd(30)} ${out.width}x${out.height}  ${Math.round(out.size / 1024)} KB  (from ${SITE})`);
  } finally {
    chrome.kill();
  }
}

fs.mkdirSync(OUT, { recursive: true });
await captureHome();
for (const project of projects) {
  // Hand Chrome a PNG copy of the WebP slide for reliable decoding in a screenshot pass.
  const slide = path.join(TMP, `${project.slug}-slide.png`);
  await sharp(path.join(ROOT, `public/projects/${project.slug}/01.webp`)).png().toFile(slide);
  await render(project.slug, projectHtml(project, slide));
}
fs.rmSync(TMP, { recursive: true, force: true });
