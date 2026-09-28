/**
 * Generates the 1200×630 social preview images in public/og/:
 *   home.jpg        – the home page
 *   <slug>.jpg      – one per project, using its first carousel slide
 *
 * Run after changing a project's name, industry, tagline or first slide:
 *   npm run og
 *
 * Needs Google Chrome. Set CHROME_PATH if it isn't in the default macOS location.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/og");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "og-"));
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

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

// Same layer positions as HeroIllustration.tsx (canvas 1174 × 735).
const heroLayers = [
  ["background", 0, 0, 1174],
  ["laptop", 206, 177, 692],
  ["coffee-mug", 868, 535, 213],
  ["steam", 938, 434, 56],
  ["dashboard", 47, 67, 376],
  ["phone", 901, 54, 219],
];

const homeHtml = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss}
  .scene{position:absolute;right:40px;top:120px;width:560px;aspect-ratio:1174/735}
  .scene img{position:absolute}
  h1{position:absolute;left:64px;top:170px;width:560px;font-size:76px;line-height:.98;font-weight:400}
  .role{position:absolute;left:64px;top:430px;font-size:22px;font-weight:600}
</style></head><body>
  <div class="glow" style="width:520px;height:520px;left:-160px;top:-220px;background:rgba(238,104,75,.22)"></div>
  <div class="glow" style="width:560px;height:560px;right:-160px;bottom:-260px;background:rgba(169,184,164,.55)"></div>
  <div class="brand"><img src="${logo}">Maybelle Catolin</div>
  <h1 class="serif">Every vision <em>deserves great Software.</em></h1>
  <p class="role">Senior Software Engineer · Frontend + Mobile</p>
  <div class="scene">${heroLayers
    .map(
      ([name, x, y, width]) =>
        `<img src="${fileUrl(path.join(ROOT, `public/hero/${name}.png`))}" style="left:${(x / 1174) * 100}%;top:${(y / 735) * 100}%;width:${(width / 1174) * 100}%">`,
    )
    .join("")}</div>
  <div class="foot"><b>React · React Native · TypeScript</b><span>Open to new roles · Remote</span></div>
</body></html>`;

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

fs.mkdirSync(OUT, { recursive: true });
await render("home", homeHtml);
for (const project of projects) {
  // Hand Chrome a PNG copy of the WebP slide for reliable decoding in a screenshot pass.
  const slide = path.join(TMP, `${project.slug}-slide.png`);
  await sharp(path.join(ROOT, `public/projects/${project.slug}/01.webp`)).png().toFile(slide);
  await render(project.slug, projectHtml(project, slide));
}
fs.rmSync(TMP, { recursive: true, force: true });
