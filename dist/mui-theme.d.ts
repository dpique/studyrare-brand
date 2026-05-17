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
declare const navy: {
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
}, periwinkle: {
    "50": string;
    "100": string;
    "300": string;
    "500": string;
    "700": string;
}, amber: {
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
}, sage: {
    "50": string;
    "100": string;
    "300": string;
    "500": string;
    "700": string;
};
export declare const studyrareThemeOptions: {
    palette: {
        primary: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        secondary: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        info: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        success: {
            main: string;
            light: string;
            dark: string;
            contrastText: string;
        };
        error: {
            main: string;
        };
        warning: {
            main: string;
        };
        background: {
            default: string;
            paper: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        divider: string;
        grey: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
    };
    typography: {
        fontFamily: string;
        h1: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        h2: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        h3: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        h4: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        h5: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        h6: {
            fontFamily: string;
            fontWeight: number;
            color: string;
        };
        body1: {
            fontFamily: string;
            color: string;
        };
        body2: {
            fontFamily: string;
            color: string;
        };
        button: {
            fontFamily: string;
            fontWeight: number;
            textTransform: "none";
        };
    };
    shape: {
        borderRadius: number;
    };
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: number;
                    textTransform: "none";
                    fontWeight: number;
                    "& .MuiTypography-root": {
                        color: string;
                    };
                };
                containedPrimary: {
                    backgroundColor: string;
                    "&:hover": {
                        backgroundColor: string;
                    };
                };
                containedSecondary: {
                    backgroundColor: string;
                    color: string;
                    border: string;
                    "&:hover": {
                        backgroundColor: string;
                        borderColor: string;
                    };
                };
            };
        };
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: number;
                    border: string;
                    boxShadow: string;
                    backgroundColor: string;
                };
            };
        };
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: string;
                    color: string;
                    boxShadow: string;
                    borderBottom: string;
                    "& .MuiTypography-root": {
                        color: string;
                    };
                    "& .MuiIconButton-root": {
                        color: string;
                    };
                };
            };
        };
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: string;
                    color: string;
                    fontFamily: string;
                    fontSize: string;
                    fontWeight: number;
                    padding: string;
                    borderRadius: number;
                };
                arrow: {
                    color: string;
                };
            };
        };
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: string;
                };
            };
        };
    };
};
export { navy, periwinkle, amber, sage };
