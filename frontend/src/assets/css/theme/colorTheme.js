import { createTheme } from "@mui/material"

const colorTheme = {
    palette: {
        primary: {
            main: "#0D0D0D",
            light: '#7F7F7F',
            calender: "#393939"
        },
        secondary: {
            main: 'rgba(105, 108, 255, 1)',
        },
        dark: {
            main: "#000",
            200: 'rgba(158, 158, 158, 0.12)'
        },
        light: {
            main: "#fff",
            200: "#E5E5E5"
        },
        white:{
            main: "#fff"
        },
        grey: {
            main: "rgba(130, 132, 153, 1)",
            light: "rgba(191, 191, 191, 1)",
            calender: "#E6E6E6",
            200: "#F4F4F4",
            300: "#E5E5E5",
            400: "#FAFAFA",
            500: "#BFBFBF",
            600:"rgba(128, 128, 128, 1)"
        },
        text: {
            main:"#fff",
            primary: 'rgba(50, 71, 92, 1)',
            white:'#fff',
            200: "rgba(130, 132, 153, 1)",
            300: "rgba(50, 71, 92, 0.68)",
            400: " rgba(50, 71, 92, 0.38)",
            500: "rgba(50, 71, 92, 0.87)",
            600: "#F5F5F9",

        },
        green: {
            main: "#64927C"
        },
        orange: {
            main: "rgba(255, 62, 29, 1)"
        },
        lt: {
            fontSize: "16px",
            point: "40px",
            cl: {
                dark: "#FF9500",
                light: "#FFF4E5",
            },
            sl: {
                dark: "#FF0000",
                light: "#FFE5E6"
            },
            pl: {
                dark: "#27D8BA",
                light: "#E9FBF8"
            },
            coff: {
                dark: "#001DFF",
                light: "#E5E8FF"
            },
        }
    }

}

export default colorTheme