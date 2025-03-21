import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { AcortarLayout } from "../layout/AcortarLayout";

export const HomePage = () => {
    const [url, setUrl] = useState("");
    const { status } = useAuthStore();
    const navigate = useNavigate();

    const handleShorten = () => {
        if (!url.trim()) {
            Swal.fire({
                title: "Error",
                text: "No has escrito ninguna URL.",
                icon: "warning",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        if (status === "authenticated") {
            navigate("acortar", {
                state: {
                    URL: url,
                },
            });
        } else if (status === "not-authenticated") {
            Swal.fire({
                title: "Iniciar sesión para más opciones",
                text: "Si inicia sesión, podrá monitorear las visitas de su URL y renovar su periodo de funcionamiento.",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Dirigirse al login",
                cancelButtonText: "Seguir como invitado",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("auth/login");
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate("acortar", {
                        state: {
                            URL: url,
                        },
                    });
                }
            });
        }
    };

    return (
        <AcortarLayout>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="70vh"
                p={2}
            >
                <Typography variant="h3" gutterBottom textAlign="center">
                    Bienvenido al Acortador de Links
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                    maxWidth={500}
                    mb={3}
                >
                    Usar un acortador de enlaces te permite compartir URLs más
                    limpias y fáciles de recordar, además de mejorar la estética
                    de tus publicaciones.
                </Typography>
                <Box
                    display="flex"
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={2}
                    width="100%"
                    maxWidth={800}
                    px={{ xs: 2, sm: 0 }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Pega tu enlace aquí..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        sx={{
                            flex: 1,
                            bgcolor: "background.paper",
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ContentCutIcon />}
                        onClick={handleShorten}
                        sx={{
                            flexShrink: 0,
                            width: { xs: "100%", sm: "auto" },
                            mt: { xs: 1, sm: 0 },
                        }}
                    >
                        Acortar Link
                    </Button>
                </Box>
            </Box>
        </AcortarLayout>
    );
};
