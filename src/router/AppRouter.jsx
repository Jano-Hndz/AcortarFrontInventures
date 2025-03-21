import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useEffect } from "react";
import { useAuthStore } from "../hooks";
import { Box, CircularProgress } from "@mui/material";
import { HomePage } from "../Acortar/pages/HomePage";
import { RedirectPage } from "../Acortar/pages/RedirectPage";
import { CreacionURLPage } from "../Acortar/pages/CreacionURLPage";
import { PanelControlPage } from "../Acortar/pages/PanelControlPage";

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
    const { status } = useAuthStore();

    if (status === "checking") {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return status === "authenticated" ? children : <Navigate to="/" />;
};

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated';

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === "checking") {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/cut/:id" element={<RedirectPage />} />

            <Route path="/acortar" element={<CreacionURLPage />} />

            <Route path="/auth/*" element={<AuthRoutes />} />

            <Route
                path="/paneldecontrol"
                element={
                    <ProtectedRoute>
                        <PanelControlPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};
