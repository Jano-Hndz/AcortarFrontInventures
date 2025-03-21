import { useState, useEffect } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    Pagination,
    Typography,
} from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { AcortarLayout } from "../layout/AcortarLayout";
import {
    GetPanelControl,
    RenovarURL,
    DeleteURL,
} from "../../helpers/AcortarAPI";
import CreateIcon from "@mui/icons-material/Create";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useMediaQuery, useTheme } from "@mui/material";

const AccordionItem = ({ Data, setDataAcortadosAcordion }) => {
    const shortURL = `https://acortar-front-inventures.vercel.app/cut/${Data.URLAcortado}`;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleCopyURL = async () => {
        try {
            await navigator.clipboard.writeText(shortURL);
            Swal.fire({
                title: "Copiado",
                text: "La URL acortada ha sido copiada al portapapeles.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo copiar la URL.",
                icon: "error",
            });
        }
    };

    const handleRenovar = async () => {
        try {
            const result = await Swal.fire({
                title: "¿Renovar URL?",
                text: "La fecha de expiración se actualizará a 3 días desde hoy.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí, renovar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const response = await RenovarURL({ id: Data._id });
                const nuevaFechaExpiracion = new Date();
                nuevaFechaExpiracion.setDate(
                    nuevaFechaExpiracion.getDate() + 3
                );

                setDataAcortadosAcordion((prev) =>
                    prev.map((item) =>
                        item._id === Data._id
                            ? { ...item, FechaExperacion: nuevaFechaExpiracion }
                            : item
                    )
                );

                Swal.fire({
                    title: "Renovado",
                    text: "La URL ha sido renovada con una nueva fecha de expiración.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error al renovar URL:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un problema al renovar el URL.",
                icon: "error",
            });
        }
    };

    const handleEliminar = async () => {
        try {
            const result = await Swal.fire({
                title: "¿Eliminar URL?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                await DeleteURL({ id: Data._id });
                setDataAcortadosAcordion((prev) =>
                    prev.filter((item) => item._id !== Data._id)
                );

                Swal.fire({
                    title: "Eliminado",
                    text: "La URL ha sido eliminada correctamente.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error("Error al eliminar URL:", error);
            Swal.fire({
                title: "Error",
                text: "Ocurrió un problema al eliminar el URL.",
                icon: "error",
            });
        }
    };

    return (
        <Accordion
            key={Data._id}
            style={{ border: "1px solid #ef7fa0", width: "75vw" }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${Data._id}-content`}
                id={`panel-${Data._id}-header`}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 2,
                        ml: 2,
                        width: "100%",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            maxWidth: "80%",
                        }}
                    >
                        {isMobile ? Data.URLAcortado : shortURL}
                    </Typography>
                </Box>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        width: "90%",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    title={Data.URLOriginal}
                >
                    URL Original: {Data.URLOriginal}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                    Fecha de Creación:{" "}
                    {new Date(Data.FechaCreacion).toUTCString()} (GMT-0)
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Fecha de Expiración:{" "}
                    {new Date(Data.FechaExperacion).toUTCString()} (GMT-0)
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Vistas: {Data.vistas}
                </Typography>

                <Divider sx={{ width: "100%", my: 2 }} />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            width: { xs: "90%", sm: "auto" },
                            height: "50px",
                        }}
                        onClick={handleCopyURL}
                        startIcon={<ContentCopyIcon />}
                    >
                        Copiar URL
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            width: { xs: "90%", sm: "auto" },
                            height: "50px",
                        }}
                        onClick={handleRenovar}
                        startIcon={<AutorenewIcon />}
                    >
                        Renovar URL
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            width: { xs: "90%", sm: "auto" },
                            height: "50px",
                        }}
                        onClick={handleEliminar}
                        startIcon={<DeleteIcon />}
                    >
                        Eliminar URL
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const PanelControlPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [DataAcortadosAcordion, setDataAcortadosAcordion] = useState([]);

    useEffect(() => {
        async function handlePanelControl() {
            try {
                const respu = await GetPanelControl();
                setIsLoading(false);
                setDataAcortadosAcordion(respu.DataAcortados);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        handlePanelControl();
    }, []);

    return (
        <AcortarLayout>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={5}
                position="relative"
            >
                <Typography variant="h3" fontSize={{ xs: 30, md: 50 }}>
                    Panel de Control
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {isLoading ? (
                    <Box>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        {DataAcortadosAcordion.map((jsonItem) => (
                            <Box key={jsonItem._id} mt={1}>
                                <AccordionItem
                                    Data={jsonItem}
                                    setDataAcortadosAcordion={
                                        setDataAcortadosAcordion
                                    }
                                />
                            </Box>
                        ))}
                    </div>
                )}
            </Box>
        </AcortarLayout>
    );
};
