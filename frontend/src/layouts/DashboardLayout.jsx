import { Box } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function DashboardLayout({ children }) {
    return (
        <Box
            sx={{
                display: "flex",
                background: "#F3F4F6",
                minHeight: "100vh",
            }}
        >
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Header />

                <Box
                    sx={{
                        px:4,
                        pt:3,
                        pb:4,
                        width:"100%",
                        flexGrow:1
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;