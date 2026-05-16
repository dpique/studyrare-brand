/**
 * StudyRare Tailwind CSS Preset (Tailwind v3)
 *
 * Derived from tokens.json — do NOT edit color values here. To change colors,
 * edit tokens.json (in this same dir) and run `npm run generate-brand`.
 *
 * Usage in a Tailwind v3 project:
 *   import studyrarePreset from "../../brand/tailwind-preset";
 *   export default { presets: [studyrarePreset], ... }
 *
 * For Tailwind v4 (the StudyRare website), tokens are emitted into the
 * website's `src/app/globals.css` `@theme` block, also generated from tokens.json.
 */

import tokens from "./tokens.json";

const { navy, periwinkle, amber, sage, semantic } = tokens.colors;
const { spacing, shadows, motion } = tokens;

const studyrarePreset = {
  theme: {
    extend: {
      colors: {
        navy,
        periwinkle,
        peri: periwinkle, // shorter alias: bg-peri-500
        amber,
        sage,
        background: semantic.background,
        surface: semantic.surface,
        success: semantic.success,
        error: semantic.error,
        warning: semantic.warning,
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono:  ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: spacing.borderRadius,
        sm: spacing.borderRadiusSm,
        md: spacing.borderRadius,
        lg: spacing.borderRadiusLg,
        xl: spacing.borderRadiusXl,
      },
      maxWidth: {
        container: spacing.containerMaxWidth,
        content: spacing.contentMaxWidth,
      },
      boxShadow: {
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
      },
      transitionTimingFunction: {
        brand: motion.easing,
      },
      transitionDuration: {
        fast: motion.durationFast,
        normal: motion.durationNormal,
        slow: motion.durationSlow,
      },
    },
  },
};

export default studyrarePreset;
