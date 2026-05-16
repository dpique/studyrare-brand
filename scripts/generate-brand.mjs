#!/usr/bin/env node
/**
 * Regenerate brand-derived CSS files from tokens.json.
 *
 * Touches only the delimited block between START_MARKER and END_MARKER in each
 * target file. Hand-written content outside the markers is preserved.
 *
 * Lives at studyrare/brand/scripts/. Reads tokens from the brand kit, writes
 * brand-guide.css (in the kit) and the consuming website's @theme block.
 *
 * Runs automatically via website `prebuild`. Manual: `npm run generate-brand`.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandRoot     = path.join(__dirname, "..");
const studyrareRoot = path.join(brandRoot, "..");

const tokensPath     = path.join(brandRoot, "tokens.json");
const brandGuidePath = path.join(brandRoot, "brand-guide.css");
const globalsPath    = path.join(studyrareRoot, "website/src/app/globals.css");

const START_MARKER = "/* GENERATED: brand-tokens — DO NOT EDIT. Run `npm run generate-brand`. */";
const END_MARKER   = "/* END GENERATED: brand-tokens */";

const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
const { navy, periwinkle, amber, sage, semantic } = tokens.colors;
const { motif, typography, spacing, shadows, motion } = tokens;

function buildGlobalsBlock(indent = "  ") {
  const out = [`${indent}${START_MARKER}`];
  const push = (s) => out.push(`${indent}${s}`);

  for (const [stop, hex] of Object.entries(navy))       push(`--color-navy-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(amber))      push(`--color-amber-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(periwinkle)) push(`--color-periwinkle-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(periwinkle)) push(`--color-peri-${stop}: ${hex};`);
  for (const [stop, hex] of Object.entries(sage))       push(`--color-sage-${stop}: ${hex};`);

  out.push(`${indent}${END_MARKER}`);
  return out;
}

function buildBrandGuideBlock(indent = "  ") {
  const out = [`${indent}${START_MARKER}`];
  const push = (s) => out.push(s === "" ? "" : `${indent}${s}`);

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

  push("/* Typography */");
  push(`--sr-font-serif: ${typography.fontFamily.serif};`);
  push(`--sr-font-sans: ${typography.fontFamily.sans};`);
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

  out.push(`${indent}${END_MARKER}`);
  return out;
}

function patchBetweenMarkers(filePath, replacementLines) {
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.includes(START_MARKER));
  const endIdx   = lines.findIndex((l, i) => i > startIdx && l.includes(END_MARKER));
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`${path.relative(root, filePath)}: GENERATED markers not found.`);
  }
  return [...lines.slice(0, startIdx), ...replacementLines, ...lines.slice(endIdx + 1)].join("\n");
}

function writeIfChanged(filePath, newContent) {
  const current = fs.readFileSync(filePath, "utf8");
  if (current === newContent) return false;
  fs.writeFileSync(filePath, newContent);
  return true;
}

const updates = [
  [globalsPath,    patchBetweenMarkers(globalsPath, buildGlobalsBlock("  "))],
  [brandGuidePath, patchBetweenMarkers(brandGuidePath, buildBrandGuideBlock("  "))],
];

let changed = 0;
for (const [full, content] of updates) {
  const rel = path.relative(studyrareRoot, full);
  if (writeIfChanged(full, content)) {
    changed++;
    console.log(`  regenerated ${rel}`);
  } else {
    console.log(`  ${rel} in sync`);
  }
}
console.log(`brand: ${changed} file(s) regenerated from tokens.json`);
