import * as React from "react";
import { Box, useTheme} from "@mui/material";

export function Footer(props) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        ...props.sx,
        backgroundColor: theme.palette.grey[200],
        px: 6,
        pt: 6,
        pb: 1,
      }}
    >
     
    </Box>
  );
}
