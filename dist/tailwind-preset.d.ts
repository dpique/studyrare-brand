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
declare const studyrarePreset: {
    theme: {
        extend: {
            colors: {
                navy: {
                    "50": string;
                    "100": string;
                    "200": string;
                    "300": string;
                    "400": string;
                    "500": string;
                    "600": string;
                    "700": string;
                    "800": string;
                    "900": string;
                    "950": string;
                };
                periwinkle: {
                    "50": string;
                    "100": string;
                    "300": string;
                    "500": string;
                    "700": string;
                };
                peri: {
                    "50": string;
                    "100": string;
                    "300": string;
                    "500": string;
                    "700": string;
                };
                amber: {
                    "50": string;
                    "100": string;
                    "200": string;
                    "300": string;
                    "400": string;
                    "500": string;
                    "600": string;
                    "700": string;
                    "800": string;
                    "900": string;
                };
                sage: {
                    "50": string;
                    "100": string;
                    "300": string;
                    "500": string;
                    "700": string;
                };
                background: string;
                surface: string;
                success: string;
                error: string;
                warning: string;
            };
            fontFamily: {
                serif: string[];
                sans: string[];
                mono: string[];
            };
            borderRadius: {
                DEFAULT: string;
                sm: string;
                md: string;
                lg: string;
                xl: string;
            };
            maxWidth: {
                container: string;
                content: string;
            };
            boxShadow: {
                sm: string;
                md: string;
                lg: string;
            };
            transitionTimingFunction: {
                brand: string;
            };
            transitionDuration: {
                fast: string;
                normal: string;
                slow: string;
            };
        };
    };
};
export default studyrarePreset;
