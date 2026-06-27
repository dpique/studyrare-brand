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
const { navy, periwinkle, amber, sage, semantic, error } = tokens.colors;
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

// =============================================================================
// design-system LAB token files — GENERATED into the sibling design-system repo.
// These five *.css files used to be hand-maintained; they are now build artifacts
// of tokens.json so the lab gallery (18+ files) and the published package can
// never drift. Every --var the lab references is reproduced here with the SAME
// name; leaf values come FROM tokens.json, semantic/print aliases are var() maps
// copied verbatim. No-op if the design-system dir is absent.
// =============================================================================
const dsTokensDir = path.join(__dirname, "..", "..", "design-system", "tokens");

const DS_HEADER =
  "GENERATED from ../../brand/tokens.json by brand/scripts/generate-brand.mjs. " +
  "DO NOT EDIT — edit brand/tokens.json and run `npm run generate` in brand/. " +
  "tokens.json is the single source of truth.";

const U = (h) => h.toUpperCase(); // lab CSS uses upper-case hex

// pad a `--name:` so the value column lines up like the hand-written file did
function pad(name, width) {
  return name + " ".repeat(Math.max(1, width - name.length));
}

function buildDsColorsCss() {
  const L = [];
  L.push("/* ============================================================");
  L.push(`   ${DS_HEADER}`);
  L.push("   StudyRare — Color tokens  (design-system LAB)");
  L.push("   SINGLE PALETTE — values sourced from ../../brand/tokens.json (v3).");
  L.push("   Print uses this SAME palette (see the aliases at the bottom — the");
  L.push("   press handles RGB->CMYK at export).");
  L.push(`     deep navy / ink-900  ${U(navy["900"])}   primary text + dark fields`);
  L.push(`     periwinkle-500       ${U(periwinkle["500"])}   the dot field / structural`);
  L.push(`     amber-500            ${U(amber["500"])}   THE accent (CTAs + the one rare dot)`);
  L.push(`     sage / success-500   ${U(sage["500"])}   correct / progress`);
  L.push("   ============================================================ */");
  L.push(":root {");

  L.push("  /* ---- Periwinkle — primary brand hue ---- */");
  for (const [stop, hex] of Object.entries(periwinkle)) {
    const tail = stop === "500" ? " /* logo dots */" : "";
    L.push(`  ${pad(`--periwinkle-${stop}:`, 18)}${U(hex)};${tail}`);
  }
  L.push("");

  L.push("  /* ---- Amber — accent / highlight hue ---- */");
  for (const [stop, hex] of Object.entries(amber)) {
    const tail = stop === "400" ? ' /* logo "Rare" */' : "";
    L.push(`  ${pad(`--amber-${stop}:`, 13)}${U(hex)};${tail}`);
  }
  L.push("");

  L.push("  /* ---- Ink — cool slate-blue neutrals (harmonized with the navy) ---- */");
  for (const [stop, hex] of Object.entries(navy)) {
    L.push(`  ${pad(`--ink-${stop}:`, 11)}${U(hex)};`);
  }
  L.push(`  ${pad("--navy:", 11)}${U(navy["900"])}; /* unified brand navy = #242A45 (secondary navy #343C5A retired) */`);
  L.push("");

  L.push("  /* ---- Indigo retired -> aliased to periwinkle (back-compat only) ---- */");
  L.push(`  --indigo-400: ${U(periwinkle["600"])};`);
  L.push(`  --indigo-500: ${U(periwinkle["700"])};`);
  L.push(`  --indigo-600: ${U(periwinkle["800"])};`);
  L.push("");

  L.push("  /* ---- Semantic status hues (tuned to live beside the brand) ---- */");
  L.push(`  ${pad("--success-50:", 15)}${U(sage["50"])}; /* sage-50 */`);
  L.push(`  ${pad("--success-100:", 15)}${U(sage["100"])}; /* sage-100 */`);
  L.push(`  ${pad("--success-500:", 15)}${U(sage["500"])}; /* sage-500 — correct answer (v3: never generic green) */`);
  L.push(`  ${pad("--success-600:", 15)}${U(sage["600"])};`);
  L.push(`  ${pad("--success-700:", 15)}${U(sage["700"])}; /* sage-700 */`);
  L.push("");
  L.push(`  ${pad("--danger-50:", 14)}${U(error["50"])};`);
  L.push(`  ${pad("--danger-100:", 14)}${U(error["100"])};`);
  L.push(`  ${pad("--danger-500:", 14)}${U(error["500"])}; /* incorrect answer */`);
  L.push(`  ${pad("--danger-600:", 14)}${U(error["600"])};`);
  L.push(`  ${pad("--danger-700:", 14)}${U(error["700"])};`);
  L.push("");
  L.push(`  ${pad("--warning-50:", 15)}${U(amber["50"])};`);
  L.push(`  ${pad("--warning-500:", 15)}${U(amber["500"])};`);
  L.push(`  ${pad("--warning-600:", 15)}${U(amber["600"])};`);
  L.push("");
  L.push(`  ${pad("--info-50:", 12)}${U(periwinkle["50"])};`);
  L.push(`  ${pad("--info-500:", 12)}${U(periwinkle["600"])};`);
  L.push(`  ${pad("--info-600:", 12)}${U(periwinkle["700"])};`);
  L.push("");
  L.push(`  --white: ${U(semantic.surface)};`);
  L.push("");

  L.push("  /* ============================================================");
  L.push("     Semantic aliases — reference these in components, not raw ramps");
  L.push("     ============================================================ */");
  L.push("  /* Brand */");
  L.push("  --brand:            var(--periwinkle-500);");
  L.push("  --brand-strong:     var(--periwinkle-600);");
  L.push("  --brand-stronger:   var(--periwinkle-700);");
  L.push("  --brand-soft:       var(--periwinkle-100);");
  L.push("  --brand-softer:     var(--periwinkle-50);");
  L.push(`  --accent:           var(--amber-500); /* v3 accent = ${U(amber["500"])} */`);
  L.push("  --accent-strong:    var(--amber-600);");
  L.push("  --accent-soft:      var(--amber-100);");
  L.push("");
  L.push("  /* Surfaces */");
  L.push("  --surface-page:     var(--ink-50);");
  L.push("  --surface-card:     var(--white);");
  L.push("  --surface-sunken:   var(--ink-100);");
  L.push("  --surface-raised:   var(--white);");
  L.push("  --surface-inverse:  var(--navy);");
  L.push("  --surface-brand:    var(--periwinkle-500);");
  L.push("  --surface-accent:   var(--amber-400);");
  L.push("");
  L.push("  /* Text */");
  L.push("  --text-strong:      var(--ink-900);");
  L.push("  --text-body:        var(--ink-700);");
  L.push("  --text-muted:       var(--ink-500);");
  L.push("  --text-subtle:      var(--ink-400);");
  L.push("  --text-inverse:     var(--white);");
  L.push("  --text-on-brand:    var(--white);");
  L.push("  --text-on-accent:   var(--ink-900);");
  L.push("  --text-brand:       var(--periwinkle-600);");
  L.push("  --text-link:        var(--periwinkle-600);");
  L.push("");
  L.push("  /* Borders / lines */");
  L.push("  --border-subtle:    var(--ink-100);");
  L.push("  --border-default:   var(--ink-200);");
  L.push("  --border-strong:    var(--ink-300);");
  L.push("  --border-brand:     var(--periwinkle-300);");
  L.push("  --focus-ring:       var(--periwinkle-400);");
  L.push("");
  L.push("  /* Status */");
  L.push("  --correct:          var(--success-500);");
  L.push("  --correct-soft:     var(--success-50);");
  L.push("  --incorrect:        var(--danger-500);");
  L.push("  --incorrect-soft:   var(--danger-50);");
  L.push("  --flag:             var(--amber-500);");
  L.push("  --flag-soft:        var(--amber-50);");
  L.push("");
  L.push("  /* ============================================================");
  L.push('     PRINT / EDITORIAL aliases — the "Foundations Series" names.');
  L.push("     COLLAPSED 2026-06-18: these now alias the single canonical palette");
  L.push("     above — there is NO separate print color set anymore. One palette");
  L.push("     online AND in print; the press handles RGB->CMYK at export. If one");
  L.push("     cover color must match a chip exactly, pin a Pantone/CMYK value for");
  L.push("     that single color at export time — don't fork the palette again.");
  L.push("     ============================================================ */");
  L.push("  --navy-900: var(--ink-900); /* deepest — hero/cover fields */");
  L.push("  --navy-700: var(--ink-700); /* connector lines on navy, secondary */");
  L.push("  --navy-500: var(--ink-500); /* muted text on light */");
  L.push("  --peri-200: var(--periwinkle-200); /* light tint — header rules, fills */");
  L.push("  --peri-300: var(--periwinkle-300); /* small / secondary motif dots */");
  L.push("  --peri-400: var(--periwinkle-400); /* bullets, soft dividers */");
  L.push("  --peri-500: var(--periwinkle-500); /* primary motif dot */");
  L.push("  --peri-600: var(--periwinkle-600); /* mid — emphasis on light */");
  L.push("  --peri-700: var(--periwinkle-700); /* eyebrow text on light */");
  L.push("  --amber-rare: var(--amber-500); /* THE rare-disease signal dot — one per composition */");
  L.push("  --amber-deep: var(--amber-600); /* deeper accent / hover */");
  L.push("  --sage:      var(--success-500); /* affirmation — answer keys, \"correct\" prose */");
  L.push("  --sage-soft: var(--success-50);");
  L.push("");
  L.push("  /* Semantic print roles */");
  L.push("  --series-rare: var(--amber-rare); /* the single standout node */");
  L.push("  --affirm:      var(--sage);");
  L.push("}");
  L.push("");
  return L.join("\n");
}

function buildDsTypographyCss() {
  const F = typography.fontFamily;
  const L = [];
  L.push("/* ============================================================");
  L.push(`   ${DS_HEADER}`);
  L.push("   StudyRare — Typography tokens");
  L.push("   Schibsted Grotesk (display/headings) · Nunito (wordmark) ·");
  L.push("   Nunito Sans (body/UI) · IBM Plex Mono (data) · Newsreader (editorial)");
  L.push("   ============================================================ */");
  L.push(":root {");
  L.push("  /* ---- Families ---- */");
  L.push(`  --font-display:  ${F.display}; /* headlines — warm grotesk, conventional double-story 'g' */`);
  L.push(`  --font-wordmark: ${F.wordmark}; /* the literal StudyRare logotype only */`);
  L.push(`  --font-body:    ${F.sans};`);
  L.push(`  --font-mono:    ${F.mono};`);
  L.push("  /* Editorial serif — scoped to long-form READING passages in print (workbook body");
  L.push("     prose, pull-quotes) and elegant italics. Headlines/display use Schibsted Grotesk");
  L.push("     (--font-display); the wordmark stays Nunito (--font-wordmark). Newsreader is a real");
  L.push("     webfont, so screen and print match. Iowan Old Style / Georgia were Pages/Word");
  L.push("     defaults, not a brand choice — deliberately not used. */");
  L.push(`  --font-editorial: ${F.editorial};`);
  L.push("");
  L.push("  /* ---- Weights ---- */");
  L.push(`  --fw-regular:  ${typography.fontWeight.normal}; /* @kind font */`);
  L.push(`  --fw-medium:   ${typography.fontWeight.medium}; /* @kind font */`);
  L.push(`  --fw-semibold: ${typography.fontWeight.semibold}; /* @kind font */`);
  L.push(`  --fw-bold:     ${typography.fontWeight.bold}; /* @kind font */`);
  L.push(`  --fw-extra:    ${typography.fontWeight.extrabold}; /* @kind font */`);
  L.push(`  --fw-black:    ${typography.fontWeight.black}; /* @kind font */`);
  L.push("");
  L.push("  /* ---- Type scale (1.250 major-third, 16px base) ---- */");
  const sizeComments = {
    "2xs": "/* 11px — micro labels */",
    xs: "/* 12px */",
    sm: "/* 14px */",
    base: "/* 16px — body */",
    md: "/* 18px — lead body */",
    lg: "/* 20px */",
    xl: "/* 24px */",
    "2xl": "/* 30px */",
    "3xl": "/* 38px */",
    "4xl": "/* 48px */",
    "5xl": "/* 60px */",
  };
  for (const [k, v] of Object.entries(typography.fontSize)) {
    L.push(`  ${pad(`--text-${k}:`, 13)}${pad(`${v};`, 11)}${sizeComments[k] || ""}`.replace(/\s+$/, ""));
  }
  L.push("");
  L.push("  /* ---- Line heights ---- */");
  L.push(`  --leading-tight:   ${typography.lineHeight.tight};`);
  L.push(`  --leading-snug:    ${typography.lineHeight.snug};`);
  L.push(`  --leading-normal:  ${typography.lineHeight.normal};`);
  L.push(`  --leading-relaxed: ${typography.lineHeight.relaxed}; /* long-form explanations */`);
  L.push("");
  L.push("  /* ---- Letter spacing ---- */");
  L.push(`  --tracking-tight:  ${typography.letterSpacing.tight};`);
  L.push(`  --tracking-snug:   ${typography.letterSpacing.snug};`);
  L.push(`  --tracking-normal: ${typography.letterSpacing.normal};`);
  L.push(`  --tracking-wide:   ${typography.letterSpacing.wide};`);
  L.push(`  --tracking-caps:   ${typography.letterSpacing.caps}; /* eyebrows / overlines */`);
  L.push("");
  L.push("  /* ---- Semantic roles ---- */");
  L.push("  --display-font:   var(--font-display);");
  L.push("  --display-weight: var(--fw-extra);");
  L.push("  --heading-font:   var(--font-display);");
  L.push("  --heading-weight: var(--fw-bold);");
  L.push("  --body-font:      var(--font-body);");
  L.push("  --eyebrow-weight: var(--fw-bold);");
  L.push("}");
  L.push("");
  return L.join("\n");
}

function buildDsFontsCss() {
  const L = [];
  L.push("/* ============================================================");
  L.push(`   ${DS_HEADER}`);
  L.push("   StudyRare webfonts.");
  L.push("   Schibsted Grotesk — headlines & display (warm grotesk, conventional double-story 'g';");
  L.push("                    approachable but credible — the brand's authority voice). Weights 600–800.");
  L.push("   Nunito         — the literal StudyRare WORDMARK only (closest match to the logotype:");
  L.push("                    rounded humanist sans, double-story 'a'). SUBSTITUTION.");
  L.push("   Nunito Sans    — body & UI text everywhere (long-form legible)");
  L.push("   Newsreader     — EDITORIAL serif, scoped to long-form READING passages in print");
  L.push("                    (warm, modern; lovely italics)");
  L.push("   IBM Plex Mono  — data, gene symbols, variant nomenclature, sequences");
  L.push("   ============================================================ */");
  L.push("@import url('https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&family=Nunito:wght@600;700;800;900&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap');");
  L.push("");
  return L.join("\n");
}

function buildDsSpacingCss() {
  const L = [];
  L.push("/* ============================================================");
  L.push(`   ${DS_HEADER}`);
  L.push("   StudyRare — Spacing, radii, sizing tokens");
  L.push("   4px base grid.");
  L.push("   ============================================================ */");
  L.push(":root {");
  L.push("  /* ---- Spacing scale (4px base) ---- */");
  const spaceComments = {
    "0": "",
    "1": "/* 4 */",
    "2": "/* 8 */",
    "3": "/* 12 */",
    "4": "/* 16 */",
    "5": "/* 20 */",
    "6": "/* 24 */",
    "8": "/* 32 */",
    "10": "/* 40 */",
    "12": "/* 48 */",
    "16": "/* 64 */",
    "20": "/* 80 */",
    "24": "/* 96 */",
  };
  for (const [k, v] of Object.entries(spacing.scale)) {
    const c = spaceComments[k] || "";
    L.push(`  ${pad(`--space-${k}:`, 13)}${c ? pad(`${v};`, 10) : `${v};`}${c}`.replace(/\s+$/, ""));
  }
  L.push("");
  L.push("  /* ---- Radii — soft, rounded to echo the logo's circular dots ---- */");
  L.push(`  --radius-xs:   ${spacing.radius.xs};`);
  L.push(`  --radius-sm:   ${spacing.radius.sm};`);
  L.push(`  --radius-md:   ${spacing.radius.md};`);
  L.push(`  --radius-lg:   ${spacing.radius.lg};`);
  L.push(`  --radius-xl:   ${spacing.radius.xl};`);
  L.push(`  --radius-2xl:  ${spacing.radius["2xl"]};`);
  L.push(`  --radius-pill: ${spacing.radius.pill};`);
  L.push(`  --radius-circle: ${spacing.radius.circle};`);
  L.push("");
  L.push("  /* ---- Container widths ---- */");
  L.push(`  --container-sm:  ${spacing.container.sm};`);
  L.push(`  --container-md:  ${spacing.container.md};  /* reading column for explanations */`);
  L.push(`  --container-lg:  ${spacing.container.lg};`);
  L.push(`  --container-xl:  ${spacing.container.xl};`);
  L.push("");
  L.push("  /* ---- Control sizing ---- */");
  L.push(`  --control-h-sm: ${spacing.controlHeight.sm};`);
  L.push(`  --control-h-md: ${spacing.controlHeight.md};`);
  L.push(`  --control-h-lg: ${spacing.controlHeight.lg};`);
  L.push("");
  L.push("  /* ---- Motion ---- */");
  L.push(`  --ease-standard: ${motion.easeStandard}; /* @kind other */`);
  L.push(`  --ease-out:      ${motion.easeOut}; /* @kind other */`);
  L.push("  /* gentle overshoot for playful confirmations */");
  L.push(`  --ease-spring:   ${motion.easeSpring}; /* @kind other */`);
  L.push(`  --dur-fast:   ${motion.durationFast}; /* @kind other */`);
  L.push(`  --dur-normal: ${motion.durationNormal}; /* @kind other */`);
  L.push(`  --dur-slow:   ${motion.durationSlow}; /* @kind other */`);
  L.push("}");
  L.push("");
  return L.join("\n");
}

function buildDsElevationCss() {
  const L = [];
  L.push("/* ============================================================");
  L.push(`   ${DS_HEADER}`);
  L.push("   StudyRare — Elevation (shadows) & focus");
  L.push("   Soft, cool-tinted shadows (navy-blue base, never pure black)");
  L.push("   so cards feel gently lifted off the slate page.");
  L.push("   ============================================================ */");
  L.push(":root {");
  L.push(`  --shadow-xs:  ${shadows.xs};`);
  L.push(`  --shadow-sm:  ${shadows.sm};`);
  L.push(`  --shadow-md:  ${shadows.md};`);
  L.push(`  --shadow-lg:  ${shadows.lg};`);
  L.push(`  --shadow-xl:  ${shadows.xl};`);
  L.push("");
  L.push("  /* Branded glow — used on primary CTAs and the active question dot */");
  L.push(`  --shadow-brand: ${shadows.brand};`);
  L.push(`  --shadow-accent: ${shadows.accent};`);
  L.push("");
  L.push("  /* Inset for sunken wells (answer fields, code blocks) */");
  L.push(`  --shadow-inset: ${shadows.inset};`);
  L.push("");
  L.push("  /* Focus ring (keyboard) */");
  L.push(`  --ring: ${shadows.ring};`);
  L.push(`  --ring-danger: ${shadows.ringDanger};`);
  L.push("}");
  L.push("");
  return L.join("\n");
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

// Also emit the design-system LAB token CSS, if that sibling repo is present.
// (No-op when building the published package in isolation.)
function buildDesignSystemTokens() {
  if (!fs.existsSync(dsTokensDir)) return [];
  return [
    ["design-system/tokens/colors.css",     path.join(dsTokensDir, "colors.css"),     buildDsColorsCss()],
    ["design-system/tokens/typography.css", path.join(dsTokensDir, "typography.css"), buildDsTypographyCss()],
    ["design-system/tokens/fonts.css",      path.join(dsTokensDir, "fonts.css"),      buildDsFontsCss()],
    ["design-system/tokens/spacing.css",    path.join(dsTokensDir, "spacing.css"),    buildDsSpacingCss()],
    ["design-system/tokens/elevation.css",  path.join(dsTokensDir, "elevation.css"),  buildDsElevationCss()],
  ];
}

const allTargets = [...targets, ...buildDesignSystemTokens()];

let changed = 0;
for (const [label, full, content] of allTargets) {
  if (writeIfChanged(full, content)) {
    changed++;
    console.log(`  regenerated ${label}`);
  } else {
    console.log(`  ${label} in sync`);
  }
}
console.log(`brand: ${changed} file(s) regenerated from tokens.json`);
