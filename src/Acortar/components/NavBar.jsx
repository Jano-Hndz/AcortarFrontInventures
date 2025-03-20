import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import LinkIcon from "@mui/icons-material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export const NavBar = ({ drawerWidth = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { startLogout, status } = useAuthStore();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDrawer(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Botón de menú en móviles */}
          {isMobile && (
            <IconButton 
              color="inherit" 
              edge="start" 
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Home visible en todos los tamaños */}
          <Button onClick={() => navigate("/")} sx={{ color: "white", ml: 2 }}>
            <Typography variant="button" fontSize={16}>
              Home
            </Typography>
          </Button>

          {/* Opciones en Escritorio */}
          {!isMobile && status === "not-authenticated" && (
            <Button
              onClick={() => navigate("/auth/login")}
              sx={{ color: "white", marginLeft: "auto" }}
            >
              <Typography variant="button" fontSize={16} marginRight={1}>
                Iniciar sesión
              </Typography>
              <LoginIcon />
            </Button>
          )}

          {!isMobile && status === "authenticated" && (
            <>
              <Button
                onClick={() => navigate("/urls-acortados")}
                sx={{ color: "white", marginLeft: "auto" }}
              >
                <Typography variant="button" fontSize={16}>
                  URLs Acortados
                </Typography>
              </Button>
              <Button onClick={startLogout} sx={{ color: "white" }}>
                <Typography variant="button" fontSize={16} marginRight={1}>
                  Cerrar sesión
                </Typography>
                <ExitToAppIcon />
              </Button>
            </>
          )}
        </Toolbar>
      </Container>

      {/* Drawer para móviles */}
      <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {status === "not-authenticated" && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigate("/auth/login")}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Iniciar sesión" />
                </ListItemButton>
              </ListItem>
            )}

            {status === "authenticated" && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleNavigate("/urls-acortados")}>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary="URLs Acortados" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={startLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesión" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
