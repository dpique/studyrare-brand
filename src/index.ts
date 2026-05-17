/**
 * StudyRare Brand Package
 *
 * Centralized brand system for all StudyRare projects.
 *
 * Exports:
 *   - tokens:           Raw design tokens (JSON-compatible object)
 *   - tailwindPreset:   Tailwind CSS preset (for tailwind.config.ts)
 *   - studyrareThemeOptions: MUI theme options (for createTheme())
 *   - navy, amber:      Color objects for direct use
 *
 * Standalone files (import directly):
 *   - brand-guide.css:  CSS custom properties for any project
 *   - tokens.json:      Machine-readable tokens for tooling/CI
 */

export { studyrareThemeOptions, navy, periwinkle, amber, sage } from "./mui-theme";
export { default as tailwindPreset } from "./tailwind-preset";

import tokens from "../tokens.json";
export { tokens };
