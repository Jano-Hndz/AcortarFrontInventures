import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { CreacionURLAcortar } from "../../helpers/AcortarAPI";
import { getData } from "../../helpers/getData";
import { useAuthStore } from "../../hooks/useAuthStore";
import { AcortarLayout } from "../layout/AcortarLayout";

export const CreacionURLPage = () => {
    const [edit, setEdit] = useState(true);
    const [customUrl, setCustomUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [validarURL, setValidarURL] = useState(false);
    const [FlagLogin, setFlagLogin] = useState(true);
    const { status, user } = useAuthStore();

    const URLBase = "https://acortar-front-inventures.vercel.app/cut/";

    const { URL } = getData();

    const handleCreateUrl = async () => {
        // Validar que no haya espacios en el customUrl (solo si no está vacío)
        if (customUrl.includes(" ")) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "La URL personalizada no puede contener espacios.",
            });
            return;
        }

        if (status === "not-authenticated") {
            setFlagLogin(false);
        }

        let respuesta;

        setLoading(true);

        console.log(FlagLogin);

        if (customUrl.trim() === "") {
            respuesta = await CreacionURLAcortar({
                flagcustomUrl: false,
                customUrl: "",
                FlagLogin: FlagLogin,
                URL: URL,
                user: user,
            });
        } else {
            console.log(1);

            respuesta = await CreacionURLAcortar({
                flagcustomUrl: true,
                customUrl: customUrl,
                FlagLogin: FlagLogin,
                URL: URL,
                user: user,
            });
        }
        console.log(respuesta);

        if (respuesta.save) {
            setLoading(false);
            setEdit(false);
            setGeneratedUrl(respuesta.data);
        } else {
            setValidarURL(true);
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`${URLBase}${generatedUrl}`);
        Swal.fire({
            icon: "success",
            title: "Copiado",
            text: "El enlace ha sido copiado al portapapeles",
            timer: 2000,
            showConfirmButton: false,
        });
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
                {edit ? (
                    <>
                        <Typography
                            variant="h3"
                            gutterBottom
                            textAlign="center"
                        >
                            Personalizar URL
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            textAlign="center"
                            maxWidth={500}
                            mb={2}
                        >
                            Escribe algo para personalizar tu URL. Si no
                            escribes nada, se generará una URL aleatoria por
                            defecto.
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            alignItems="center"
                            gap={2}
                            width="100%"
                            maxWidth={500}
                            mt={2}
                        >
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
                                    value={customUrl}
                                    onChange={(e) => {
                                        setCustomUrl(e.target.value);
                                        setValidarURL(false);
                                    }}
                                    sx={{
                                        flex: 1,
                                        bgcolor: "background.paper",
                                    }}
                                    error={validarURL}
                                    helperText={
                                        validarURL
                                            ? "Esta URL ya está tomada. Por favor, escribe otra."
                                            : ""
                                    }
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateUrl}
                                    startIcon={<AutoFixHighIcon />}
                                    sx={{
                                        flexShrink: 0,
                                        width: { xs: "100%", sm: "auto" },

                                        mt: { xs: 1, sm: 0 },
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Crear URL"
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="h3"
                            gutterBottom
                            textAlign="center"
                        >
                            URL Generada
                        </Typography>

                        <Typography
                            variant="body1"
                            color="textSecondary"
                            textAlign="center"
                            maxWidth={600}
                            mb={3}
                        >
                            ¡Aquí está su nuevo URL acortado! Puede revisar las
                            estadísticas de visitas y renovar el período de
                            disponibilidad desde su panel de control.
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                            width="100%"
                            maxWidth={800}
                            px={{ xs: 2, sm: 0 }}
                        >
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                textAlign="center"
                                sx={{ wordBreak: "break-word" }}
                            >
                                <a
                                    href={`${URLBase}${generatedUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {`${URLBase}${generatedUrl}`}
                                </a>
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCopy}
                                startIcon={<ContentCopyIcon />}
                                sx={{
                                    fontSize: "1.2rem",
                                    padding: "12px 24px",
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                Copiar
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </AcortarLayout>
    );
};
