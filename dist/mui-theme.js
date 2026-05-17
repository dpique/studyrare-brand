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
const SERIF = '"Source Serif 4", Georgia, serif';
const SANS = '"Inter", system-ui, -apple-system, sans-serif';
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
        h1: { fontFamily: SERIF, fontWeight: 700, color: navy[900] },
        h2: { fontFamily: SERIF, fontWeight: 700, color: navy[900] },
        h3: { fontFamily: SERIF, fontWeight: 600, color: navy[900] },
        h4: { fontFamily: SERIF, fontWeight: 600, color: navy[900] },
        h5: { fontFamily: SERIF, fontWeight: 600, color: navy[900] },
        h6: { fontFamily: SERIF, fontWeight: 600, color: navy[900] },
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
                    backgroundColor: navy[900],
                    color: "#ffffff",
                    boxShadow: "none",
                },
            },
        },
    },
};
export { navy, periwinkle, amber, sage };
