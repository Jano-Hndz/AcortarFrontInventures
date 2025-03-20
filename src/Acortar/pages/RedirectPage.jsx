import { useParams } from "react-router-dom";

import {
    Box,
    CircularProgress,
} from "@mui/material";
import { AcortarLayout } from '../layout/AcortarLayout';

export const RedirectPage = () => {
    const { id } = useParams();

    console.log(id);

    return (
        <AcortarLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "70vh"
                }}
            >
                <CircularProgress />
            </Box>
        </AcortarLayout>
    );
};

