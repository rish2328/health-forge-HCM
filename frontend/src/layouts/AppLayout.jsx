import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";


const AppLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => { setSidebarOpen(!sidebarOpen); };

    return (
        <Box sx={{ display: "flex", background: "#F3F4F6", minHeight: "100vh" }} >
            <Sidebar open={sidebarOpen} />

            <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", transition: ".3s", overflow: "hidden" }} >
                <Header toggleSidebar={toggleSidebar} />

                <Box sx={{ px: 4, pt: 3, pb: 4, flexGrow: 1 }} > {children} </Box>
            </Box>
        </Box>
    );
}

export default AppLayout;
