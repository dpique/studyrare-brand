/**
 * StudyRare Material-UI Theme
 *
 * Derived from tokens.json — do NOT edit color values here. To change colors,
 * edit tokens.json (in this same dir) and run `npm run generate-brand`.
 *
 * Usage:
 *   import { createTheme } from "@mui/material/styles";
 *   import { studyrareThemeOptions } from "@studyrare/brand/mui-theme";
 *   const theme = createTheme(studyrareThemeOptions);
 */
import tokens from "../tokens.json";
const { navy, periwinkle, amber, sage, semantic } = tokens.colors;
// Read font stacks from tokens.json instead of duplicating here. tokens.json
// stores them in CSS-ready form (with quotes around multi-word families).
const SERIF = tokens.typography.fontFamily.serif;
const SANS = tokens.typography.fontFamily.sans;
export const studyrareThemeOptions = {
    palette: {
        primary: {
            main: navy[700],
            light: navy[400],
            dark: navy[900],
            contrastText: "#ffffff",
        },
        secondary: {
            main: amber[400],
            light: amber[200],
            dark: amber[600],
            contrastText: navy[900],
        },
        info: {
            main: periwinkle[500],
            light: periwinkle[300],
            dark: periwinkle[700],
            contrastText: navy[900],
        },
        success: {
            main: sage[500],
            light: sage[300],
            dark: sage[700],
            contrastText: "#ffffff",
        },
        error: { main: semantic.error },
        warning: { main: amber[500] },
        background: {
            default: semantic.background,
            paper: semantic.surface,
        },
        text: {
            primary: navy[900],
            secondary: navy[500],
        },
        divider: navy[100],
        grey: {
            50: navy[50],
            100: navy[100],
            200: navy[200],
            300: navy[300],
            400: navy[400],
            500: navy[500],
            600: navy[600],
            700: navy[700],
            800: navy[800],
            900: navy[900],
        },
    },
    typography: {
        fontFamily: SANS,
        // Serif (Source Serif 4) reserved for h1 — the featured hero / page-title
        // moment. Everything else uses Inter sans to match the website's vibe.
        // This dials back the textbook-y serif feel; serif now signals "this is
        // THE thing on the page," not "every heading I see."
        h1: { fontFamily: SERIF, fontWeight: 700, color: navy[900] },
        h2: { fontFamily: SANS, fontWeight: 700, color: navy[900] },
        h3: { fontFamily: SANS, fontWeight: 600, color: navy[900] },
        h4: { fontFamily: SANS, fontWeight: 600, color: navy[900] },
        h5: { fontFamily: SANS, fontWeight: 600, color: navy[900] },
        h6: { fontFamily: SANS, fontWeight: 600, color: navy[900] },
        body1: { fontFamily: SANS, color: navy[700] },
        body2: { fontFamily: SANS, color: navy[500] },
        button: { fontFamily: SANS, fontWeight: 600, textTransform: "none" },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: "none",
                    fontWeight: 600,
                    // Typography inside a Button inherits the Button's text color.
                    // Critical for filled buttons (contrastText white) where the
                    // theme's body1/body2 colors would otherwise render invisible.
                    "& .MuiTypography-root": { color: "inherit" },
                },
                containedPrimary: {
                    backgroundColor: navy[700],
                    "&:hover": { backgroundColor: navy[800] },
                },
                containedSecondary: {
                    backgroundColor: amber[400],
                    color: navy[900],
                    "&:hover": { backgroundColor: amber[500] },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: `1px solid ${navy[100]}`,
                    boxShadow: "none",
                    backgroundColor: semantic.background,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    // Light navbar — matches the studyrare.com marketing site
                    // (white bg + navy text + subtle navy-100 border-bottom).
                    // Prior version had navy-900 bg + white text. Switched to light
                    // for cross-app visual consistency 2026-05-16.
                    backgroundColor: semantic.surface,
                    color: navy[900],
                    boxShadow: "none",
                    borderBottom: `1px solid ${navy[100]}`,
                    // Typography and Buttons inside an AppBar inherit the AppBar's
                    // navy text color. Without these overrides, MUI's typography
                    // variants apply their own hardcoded color and can fight the
                    // intended cascade.
                    "& .MuiTypography-root": { color: "inherit" },
                    "& .MuiIconButton-root": { color: "inherit" },
                    // NOTE: NOT forcing `color: inherit` on .MuiButton-root here so
                    // that `<Button color="secondary">` (the amber Sign Out / Log In
                    // CTAs) can keep their explicit navy-900 contrastText against
                    // amber bg — they style themselves via containedSecondary.
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: navy[900],
                    color: "#ffffff",
                    fontFamily: SANS,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    padding: "6px 10px",
                    borderRadius: 6,
                },
                arrow: {
                    color: navy[900],
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: SANS,
                    // Menu items in serif-context menus (e.g., navbar brand-switcher)
                    // can override this per-instance via sx. Defaults to sans for
                    // typical UI affordance use.
                },
            },
        },
    },
};
export { navy, periwinkle, amber, sage };
