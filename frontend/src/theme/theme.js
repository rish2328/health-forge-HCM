import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2563EB",
        },
        secondary: {
            main: "#10B981",
        },
        background: {
            default: "#F3F4F6",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111827",
            secondary: "#6B7280",
        },
    },
    typography: {
        fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 14,
                    boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "10px 18px",
                },
            },
        },
    },
});

export default theme;
