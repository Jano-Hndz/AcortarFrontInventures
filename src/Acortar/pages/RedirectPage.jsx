import { useParams } from "react-router-dom";
import { RedirigirURL } from "../../helpers/AcortarAPI";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { AcortarLayout } from "../layout/AcortarLayout";

export const RedirectPage = () => {
    const { id } = useParams();
    const [disponible, setDisponible] = useState(null);

    useEffect(() => {
        const handleRedirection = async () => {
            try {
                const { disponible, URLOriginal } = await RedirigirURL({ urlid: id });
                setDisponible(disponible);
                
                if (disponible) {
                    window.location.href = URLOriginal;
                }
            } catch (error) {
                console.error("Error", error);
                setDisponible(false);
            }
        };

        handleRedirection();
    }, [id]);

    return (
        <AcortarLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "70vh",
                }}
            >
                {disponible === null ? (
                    <CircularProgress />
                ) : disponible === false ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: "gray" }} />
                        <Typography variant="h6" color="gray">
                            Link no disponible
                        </Typography>
                    </Box>
                ) : null}
            </Box>
        </AcortarLayout>
    );
};

