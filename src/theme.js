import {createTheme} from "@mui/material/styles";

const colors = {
    purple: {
        50: "#E6D4E3",
        100: "#DDC6DA",
        200: "#D2B3CD",
        300: "#C39ABD",
        400: "#AF78A7",
        500: "#8C5383",
        600: "#774670",
        700: "#653C5F",
        800: "#563351",
        900: "#563351",
    },
    blue: {
        50: "#ECEDEA",
        100: "#D1D2E0",
        200: "#989FCB",
        300: "#8390C2",
        400: "#6575A1",
        500: "#7181B2",
        600: "#6575A1D6",
        700: "#59698F",
        800: "#4C5A7D",
        900: "#33415A",
    },
    yellow: {
        50: "#FCFBE9",
        100: "#FBF9E4",
        200: "#F9F8DD",
        300: "#F8F6D4",
        400: "#F6F4C9",
        500: "#F4F1BB",
        600: "#EDE88D",
        700: "#E6E065",
        800: "#E1D942",
        900: "#DBD223",
    },
    red: {
        50: "#FFDDC7",
        100: "#FFBDA7",
        200: "#FF9E86",
        300: "#FA7E6A",
        400: "#ED6A5A",
        500: "#DC584F",
        600: "#CB4C46",
        700: "#B94140",
        800: "#A43334",
        900: "#801826",
    },
    green: {
        50: "#D2FFD7",
        100: "#B4FFBA",
        200: "#6BEA7B",
        300: "#4AE061",
        400: "#00C540",
        500: "#00D749",
        600: "#00B136",
        700: "#009D2F",
        800: "#009D2F",
        900: "#007A20",
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            light: colors.purple[300],
            main: colors.purple[500],
            dark: colors.purple[700],
            contrastText: '#fff',
        },
        accent: {
            light: colors.yellow[300],
            main: colors.yellow[500],
            dark: colors.yellow[700],
            contrastText: '#fff',
        },
        secondary: {
            light: colors.blue[300],
            main: colors.blue[500],
            dark: colors.blue[700],
            contrastText: '#fff',
        },
        error: {
            light: colors.red[300],
            main: colors.red[500],
            dark: colors.red[700],
            contrastText: '#fff',
        },
        success: {
            light: colors.green[300],
            main: colors.green[500],
            dark: colors.green[700],
            contrastText: '#fff',
        },
    },

    typography: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 40,
        },
        h2: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 32,
        },
        h3: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 24,
        },
        h4: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 20,
        },
        h5: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 16,
        },
        h6: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 14,
        },
    },
});
