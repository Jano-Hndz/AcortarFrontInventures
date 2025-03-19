import * as React from 'react';
import Box from '@mui/material/Box';
import { useAuthStore } from "../../hooks/useAuthStore";
import { AppBar, Container,Toolbar,Typography,useTheme,Button} from '@mui/material';
import VeraMono from '../../fonts/VeraMono.ttf'
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export const NavBar = ({ drawerWidth = 0 }) =>{
  const theme = useTheme();
  const { startLogout, user } = useAuthStore();
  const navigate = useNavigate();


return (
  <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Box display='flex' px={2}>
          <Button
            onClick={() => navigate("/")}
            sx={{ my: 2, color: 'white' }}
          >
            <Typography variant="button" fontSize={16}>
              Home
            </Typography>
          </Button>

          <Button
            onClick={startLogout}
            sx={{ my: 2, color: 'white',  marginLeft: 'auto'}}
          >
            <Typography variant="button" fontSize={16} marginRight={1} >
              Cerrar sesión
            </Typography>
            <ExitToAppIcon />

          </Button>
        </Box>

      </Container>
    </AppBar>
  </>
)
}