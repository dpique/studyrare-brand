#!/usr/bin/env node
/**
 * Regenerate brand-derived CSS files from tokens.json.
 *
 * Outputs (both written to the brand kit root, shipped as part of the npm package):
 *
 *   theme.css        — Tailwind v4 `@theme { ... }` block with brand color
 *                       variables (`--color-navy-50`, etc.). Consumers import
 *                       via `@import "studyrare-brand/theme.css"` in any CSS
 *                       file that Tailwind processes.
 *
 *   brand-guide.css  — Standalone `:root { --sr-* }` custom properties.
 *                       Consumers that aren't on Tailwind v4 import this
 *                       (HTML, email templates, PDFs, etc.).
 *
 * Run via: `npm run generate` (in this dir) or by anyone editing tokens.json.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandRoot = path.join(__dirname, "..");

const tokensPath     = path.join(brandRoot, "tokens.json");
const themeCssPath   = path.join(brandRoot, "theme.css");
const brandGuidePath = path.join(brandRoot, "brand-guide.css");

const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
const { navy, periwinkle, amber, sage, semantic } = tokens.colors;
const { motif, typography, spacing, shadows, motion } = tokens;

function buildThemeCss() {
  const lines = [
    "/* GENERATED from tokens.json — DO NOT EDIT. Edit tokens.json and run `npm run generate`. */",
    "/* Tailwind v4 @theme block — consumers @import this file. */",
    "",
    "@theme {",
  ];
  for (const [stop, hex] of Object.entries(navy))       lines.push(`  --color-navy-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(amber))      lines.push(`  --color-amber-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(periwinkle)) lines.push(`  --color-periwinkle-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(periwinkle)) lines.push(`  --color-peri-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(sage))       lines.push(`  --color-sage-${stop}: ${hex};`);
  lines.push(`  --font-display: ${typography.fontFamily.display};`);
  lines.push(`  --font-sans: ${typography.fontFamily.sans};`);
  lines.push(`  --font-mono: ${typography.fontFamily.mono};`);
  for (const [k, v] of Object.entries(spacing.radius)) lines.push(`  --radius-${k}: ${v};`);
  for (const [k, v] of Object.entries(shadows))        lines.push(`  --shadow-${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v};`);
  lines.push(`  --ease-standard: ${motion.easeStandard};`);
  lines.push(`  --ease-out: ${motion.easeOut};`);
  lines.push(`  --ease-spring: ${motion.easeSpring};`);
  lines.push("}", "");
  return lines.join("\n");
}

function buildBrandGuideCss() {
  const lines = [
    "/**",
    " * StudyRare Brand Guide — Standalone CSS Variables",
    " * GENERATED from tokens.json. DO NOT EDIT — edit tokens.json instead.",
    " *",
    " * Import for HTML, email templates, PDFs, anything that doesn't read Tailwind.",
    " * Usage:  @import url('studyrare-brand/brand-guide.css');",
    " *         .my-button { background: var(--sr-amber-400); color: var(--sr-navy-900); }",
    " */",
    "",
    ":root {",
  ];
  const push = (s) => lines.push(s === "" ? "" : `  ${s}`);

  push("/* Navy palette - Structure, trust, professionalism */");
  for (const [stop, hex] of Object.entries(navy)) push(`--sr-navy-${stop}: ${hex};`);
  push("");
  push("/* Periwinkle palette - The dot field, structural connective color */");
  for (const [stop, hex] of Object.entries(periwinkle)) push(`--sr-peri-${stop}: ${hex};`);
  push("");
  push("/* Amber palette - CTAs, action, the rare signal */");
  for (const [stop, hex] of Object.entries(amber)) push(`--sr-amber-${stop}: ${hex};`);
  push("");
  push("/* Sage palette - Progress, correct, affirmation */");
  for (const [stop, hex] of Object.entries(sage)) push(`--sr-sage-${stop}: ${hex};`);
  push("");
  push("/* Semantic tokens */");
  push(`--sr-bg: ${semantic.background};`);
  push(`--sr-surface: ${semantic.surface};`);
  push(`--sr-surface-elevated: ${semantic.surfaceElevated};`);
  push(`--sr-fg: ${semantic.foreground};`);
  push(`--sr-fg-secondary: ${semantic.foregroundSecondary};`);
  push(`--sr-fg-muted: ${semantic.foregroundMuted};`);
  push(`--sr-primary: ${semantic.primary};`);
  push(`--sr-primary-fg: ${semantic.primaryForeground};`);
  push(`--sr-secondary: ${semantic.secondary};`);
  push(`--sr-secondary-fg: ${semantic.secondaryForeground};`);
  push(`--sr-accent: ${semantic.accent};`);
  push(`--sr-accent-fg: ${semantic.accentForeground};`);
  push(`--sr-muted: ${semantic.muted};`);
  push(`--sr-muted-fg: ${semantic.mutedForeground};`);
  push(`--sr-border: ${semantic.border};`);
  push(`--sr-success: ${semantic.success};`);
  push(`--sr-error: ${semantic.error};`);
  push(`--sr-warning: ${semantic.warning};`);
  push("");
  push("/* Dot motif spec */");
  push(`--sr-motif-field: ${motif.fieldColor};`);
  push(`--sr-motif-signal: ${motif.signalColor};`);
  push(`--sr-motif-bg-dark: ${motif.backgroundDark};`);
  push(`--sr-motif-bg-light: ${motif.backgroundLight};`);
  push("");
  push("/* Typography (v3: Schibsted Grotesk headings / Nunito Sans body / IBM Plex Mono) */");
  push(`--sr-font-display: ${typography.fontFamily.display};`);
  push(`--sr-font-heading: ${typography.fontFamily.display};`);
  push(`--sr-font-sans: ${typography.fontFamily.sans};`);
  push(`--sr-font-body: ${typography.fontFamily.sans};`);
  push(`--sr-font-mono: ${typography.fontFamily.mono};`);
  push("");
  push("/* Type scale */");
  for (const [k, v] of Object.entries(typography.fontSize)) push(`--sr-text-${k}: ${v};`);
  push("");
  push("/* Line heights */");
  for (const [k, v] of Object.entries(typography.lineHeight)) push(`--sr-leading-${k}: ${v};`);
  push("");
  push("/* Letter spacing */");
  for (const [k, v] of Object.entries(typography.letterSpacing)) push(`--sr-tracking-${k}: ${v};`);
  push("");
  push("/* Spacing scale (4px grid) */");
  for (const [k, v] of Object.entries(spacing.scale)) push(`--sr-space-${k}: ${v};`);
  push("");
  push("/* Radii */");
  for (const [k, v] of Object.entries(spacing.radius)) push(`--sr-radius-${k}: ${v};`);
  push("");
  push("/* Control heights + containers */");
  for (const [k, v] of Object.entries(spacing.controlHeight)) push(`--sr-control-h-${k}: ${v};`);
  for (const [k, v] of Object.entries(spacing.container)) push(`--sr-container-${k}: ${v};`);
  push("");
  push("/* Shadows + rings */");
  for (const [k, v] of Object.entries(shadows)) push(`--sr-shadow-${k.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${v};`);
  push("");
  push("/* Motion */");
  push(`--sr-duration-fast: ${motion.durationFast};`);
  push(`--sr-duration-normal: ${motion.durationNormal};`);
  push(`--sr-duration-slow: ${motion.durationSlow};`);
  push(`--sr-ease-standard: ${motion.easeStandard};`);
  push(`--sr-ease-out: ${motion.easeOut};`);
  push(`--sr-ease-spring: ${motion.easeSpring};`);

  lines.push("}", "");
  return lines.join("\n");
}

function writeIfChanged(filePath, newContent) {
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (current === newContent) return false;
  fs.writeFileSync(filePath, newContent);
  return true;
}

// v3: emit a LaTeX brand file (for the Foundations books) and a Canva setup sheet.
function buildLatex() {
  const hx = (h) => h.replace("#", "").toUpperCase();
  return [
    "% GENERATED from tokens.json — DO NOT EDIT. StudyRare brand colors for XeLaTeX books.",
    "% \\input this in a book preamble (e.g. books/_template/foundations.cls).",
    "\\RequirePackage{xcolor}",
    `\\definecolor{srnavy}{HTML}{${hx(navy["900"])}}`,
    `\\definecolor{srnavy2}{HTML}{${hx(semantic.primary)}}`,
    `\\definecolor{srperi}{HTML}{${hx(periwinkle["500"])}}`,
    `\\definecolor{sramber}{HTML}{${hx(amber["500"])}}`,
    `\\definecolor{srsage}{HTML}{${hx(sage["500"])}}`,
    `\\definecolor{srpage}{HTML}{${hx(semantic.background)}}`,
    "% Fonts (fontspec/xelatex): \\newfontfamily\\srheading{Schibsted Grotesk};",
    "%   \\setmainfont{Nunito Sans}; \\setmonofont{IBM Plex Mono}",
    "",
  ].join("\n");
}

function buildCanvaSheet() {
  return [
    "# Canva Brand Kit — GENERATED from tokens.json",
    "",
    "## Fonts",
    "- Headings: **Schibsted Grotesk** (upload the .ttf — not in Canva's library)",
    "- Body: **Nunito Sans** (in Canva's library)",
    "- Code / gene names: **IBM Plex Mono** (in Canva's library; apply by hand)",
    "",
    "## Colors (set these, delete any others)",
    `- Deep navy ${navy["900"]}`,
    `- Navy ${semantic.primary}`,
    `- Periwinkle ${periwinkle["500"]}`,
    `- Amber ${amber["500"]}`,
    `- Sage ${sage["500"]}`,
    `- Light page ${semantic.background}`,
    "",
  ].join("\n");
}

// v3: emit a SELF-CONTAINED style guide — values baked from tokens, images inlined,
// fonts via CDN. Works from a double-click (file://); still regenerated from tokens.json.
function buildStyleGuide() {
  const F = typography.fontFamily;
  let logo = "";
  try { logo = "data:image/png;base64," + fs.readFileSync(path.join(brandRoot, "assets/logo.png")).toString("base64"); } catch {}
  let mark = "";
  try { mark = fs.readFileSync(path.join(brandRoot, "assets/series-mark.svg"), "utf8"); } catch {}
  const sw = (label, hex) => `<div class="sw"><div class="chip" style="background:${hex}"></div><div class="meta"><div class="nm">${label}</div><div class="hx">${hex}</div></div></div>`;
  const ramp = (obj, name) => Object.entries(obj).map(([k, v]) => sw(name + "-" + k, v)).join("");
  const sem = Object.entries(semantic).map(([k, v]) => sw(k, v)).join("");
  const scale = Object.entries(typography.fontSize).map(([k, v]) =>
    `<div style="display:flex;align-items:baseline;gap:14px;padding:5px 0;border-top:1px dashed ${navy['100']}"><span style="font-family:${F.mono};font-size:11px;color:${navy['500']};width:54px">${k}</span><span style="font-size:${v};font-family:${F.display};font-weight:700;color:${navy['900']}">${v}</span></div>`).join("");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>StudyRare Design System</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* GENERATED from tokens.json by generate-brand.mjs — self-contained. Do not hand-edit. */
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${F.sans};background:${semantic.background};color:${semantic.foreground};line-height:1.6;padding:0 0 80px}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px}
header{background:${navy['900']};color:#fff;padding:34px 0 30px;margin-bottom:8px}
header .wrap{display:flex;align-items:center;gap:18px}
header img{width:74px;height:74px;border-radius:50%;box-shadow:0 6px 20px rgba(0,0,0,.3)}
header h1{font-family:${F.display};font-weight:800;font-size:28px;letter-spacing:-.02em}
header p{color:${periwinkle['300']};font-size:13px;margin-top:3px;font-family:${F.mono}}
.live{background:${amber['100']};border-left:4px solid ${amber['500']};color:${amber['700']};padding:12px 16px;border-radius:8px;font-size:13.5px;margin:22px 0 8px}
h2{font-family:${F.display};font-weight:700;font-size:13px;letter-spacing:.09em;text-transform:uppercase;color:${periwinkle['700']};margin:36px 0 14px;border-bottom:1px solid ${semantic.border};padding-bottom:8px}
.grid{display:grid;gap:10px}
.ramp{grid-template-columns:repeat(auto-fill,minmax(96px,1fr))}
.semantic{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.sw{border:1px solid ${semantic.border};border-radius:10px;overflow:hidden;background:#fff;font-size:11px}
.sw .chip{height:54px}.sw .meta{padding:6px 8px}.sw .nm{font-weight:700;color:${navy['900']}}
.sw .hx{font-family:${F.mono};color:${navy['500']};font-size:10.5px;text-transform:uppercase}
.type{background:#fff;border:1px solid ${semantic.border};border-radius:12px;padding:20px 22px;margin-bottom:12px}
.type .lab{font-family:${F.mono};font-size:11px;color:${navy['500']};text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px}
.marks{display:flex;gap:22px;align-items:center}
.marks .box{height:96px;width:96px;background:${navy['900']};border-radius:12px;display:grid;place-items:center;padding:12px}
.marks .box svg{width:100%;height:100%}
.btn{font-family:${F.display};font-weight:700;border:none;background:${semantic.accent};color:${navy['900']};padding:11px 20px;border-radius:999px;cursor:pointer}
.badge{font-family:${F.display};font-size:12px;font-weight:700;padding:4px 11px;border-radius:999px}
.gc{background:${periwinkle['100']};color:${periwinkle['700']}}.mg{background:${amber['100']};color:${amber['700']}}
.row{display:flex;flex-wrap:wrap;gap:14px;align-items:center}
.card{background:${semantic.surface};border:1px solid ${semantic.border};border-radius:14px;padding:16px 18px}
footer{margin-top:40px;font-size:12.5px;color:${navy['500']};border-top:1px solid ${semantic.border};padding-top:16px}
code{font-family:${F.mono};font-size:12.5px;background:${navy['50']};padding:1px 6px;border-radius:5px}
</style></head>
<body>
<header><div class="wrap"><img src="${logo}" alt="StudyRare"><div><h1>StudyRare Design System</h1><p>single source of truth · tokens.json</p></div></div></header>
<div class="wrap">
<div class="live">⚡ <b>Generated from <code>tokens.json</code></b> via <code>npm run generate</code>. Every value is baked from that one file — edit a token, regenerate, this updates. Self-contained.</div>
<h2>Brand marks</h2><div class="marks"><div class="box"><img src="${logo}" style="width:100%;border-radius:50%" alt="logo"></div><div class="box">${mark}</div><div style="font-size:13px;color:${navy['500']}">Left: company logo (arc).<br>Right: Foundations <b>series</b> mark (diamond).</div></div>
<h2>Color — Periwinkle</h2><div class="grid ramp">${ramp(periwinkle, "peri")}</div>
<h2>Color — Amber</h2><div class="grid ramp">${ramp(amber, "amber")}</div>
<h2>Color — Navy / Ink</h2><div class="grid ramp">${ramp(navy, "navy")}</div>
<h2>Color — Sage</h2><div class="grid ramp">${ramp(sage, "sage")}</div>
<h2>Semantic tokens</h2><div class="grid semantic">${sem}</div>
<h2>Typography</h2>
<div class="type"><div class="lab">Display · ${typography.headingFont} · headings</div><div style="font-family:${F.display};font-weight:800;font-size:34px;color:${navy['900']}">Phenylketonuria</div></div>
<div class="type"><div class="lab">Body · ${typography.bodyFont}</div><div style="font-family:${F.sans};font-size:16px;color:${navy['700']}">Deficiency of phenylalanine hydroxylase causes phenylalanine to accumulate.</div></div>
<div class="type"><div class="lab">Mono · gene / variant</div><div style="font-family:${F.mono};font-size:15px;color:${navy['900']}">PAH · NM_000277.3:c.1222C&gt;T</div></div>
<div class="type"><div class="lab">Type scale</div>${scale}</div>
<h2>Components</h2><div class="row"><button class="btn">Start question set →</button><span class="badge gc">ABGC</span><span class="badge mg">ABMGG</span><div class="card">A card surface.</div></div>
<h2>Who consumes this</h2>
<div style="font-size:14px;line-height:1.9">🌐 <b>Website</b> · ❓ <b>QBank</b> (mui-theme) · 📘 <b>Books</b> (foundations-brand.tex) · 🎨 <b>Canva</b> (canva-setup.md) · 🤖 <b>claude.ai skill</b> — all derive from <code>tokens.json</code>.</div>
<footer>StudyRare brand v${tokens.version} · edit <code>brand/tokens.json</code> + run <code>npm run generate</code> to change anything.</footer>
</div></body></html>`;
}

const latexPath = path.join(brandRoot, "foundations-brand.tex");
const canvaPath = path.join(brandRoot, "canva-setup.md");
const styleGuidePath = path.join(brandRoot, "style-guide.html");

const targets = [
  ["theme.css",             themeCssPath,   buildThemeCss()],
  ["brand-guide.css",       brandGuidePath, buildBrandGuideCss()],
  ["foundations-brand.tex", latexPath,      buildLatex()],
  ["canva-setup.md",        canvaPath,      buildCanvaSheet()],
  ["style-guide.html",      styleGuidePath, buildStyleGuide()],
];

let changed = 0;
for (const [label, full, content] of targets) {
  if (writeIfChanged(full, content)) {
    changed++;
    console.log(`  regenerated ${label}`);
  } else {
    console.log(`  ${label} in sync`);
  }
}
console.log(`brand: ${changed} file(s) regenerated from tokens.json`);
