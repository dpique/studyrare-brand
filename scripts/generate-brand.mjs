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
  push("/* Layout */");
  push(`--sr-radius-sm: ${spacing.borderRadiusSm};`);
  push(`--sr-radius-md: ${spacing.borderRadius};`);
  push(`--sr-radius-lg: ${spacing.borderRadiusLg};`);
  push(`--sr-radius-xl: ${spacing.borderRadiusXl};`);
  push("");
  push("/* Shadows */");
  push(`--sr-shadow-sm: ${shadows.sm};`);
  push(`--sr-shadow-md: ${shadows.md};`);
  push(`--sr-shadow-lg: ${shadows.lg};`);
  push("");
  push("/* Motion */");
  push(`--sr-duration-fast: ${motion.durationFast};`);
  push(`--sr-duration-normal: ${motion.durationNormal};`);
  push(`--sr-duration-slow: ${motion.durationSlow};`);
  push(`--sr-easing: ${motion.easing};`);

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

const latexPath = path.join(brandRoot, "foundations-brand.tex");
const canvaPath = path.join(brandRoot, "canva-setup.md");

const targets = [
  ["theme.css",             themeCssPath,   buildThemeCss()],
  ["brand-guide.css",       brandGuidePath, buildBrandGuideCss()],
  ["foundations-brand.tex", latexPath,      buildLatex()],
  ["canva-setup.md",        canvaPath,      buildCanvaSheet()],
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
