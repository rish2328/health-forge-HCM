import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { verifyToken } from "../api/authApi";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                setAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                await verifyToken();
                setAuthenticated(true);
            } 
            catch (error) {
                localStorage.removeItem("access_token");
                setAuthenticated(false);
            } 
            finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
