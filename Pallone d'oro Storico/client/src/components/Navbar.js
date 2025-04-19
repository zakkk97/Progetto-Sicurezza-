import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("hasRefreshed"); // Rimuove il flag per il refresh
    navigate("/");
    console.log("Logout");
  };

  return (
    <AppBar position="static" sx={{ background: '#000', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} /> {/* Spazio vuoto per allineare il bottone a destra */}
          <Button 
            onClick={handleLogout}
            sx={{
              color: '#fff', // Assicurati che il testo del pulsante sia bianco
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Sfondo trasparente
              borderRadius: 1,
              padding: '6px 12px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Colore di sfondo al passaggio del mouse
              }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
