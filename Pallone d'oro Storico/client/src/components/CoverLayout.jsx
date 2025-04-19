import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import soccerBackground from "../assets/soccer-background.jpg"; // Assicurati di avere questa immagine nella cartella assets
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const CoverLayoutRoot = styled("section")(({ theme }) => ({
  color: theme.palette.text.primary,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${soccerBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  [theme.breakpoints.up("sm")]: {
    minHeight: 500,
    maxHeight: 1300,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
}));

function CoverLayout(props) {
  const { children } = props;

  return (
    <CoverLayoutRoot>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
          zIndex: 1,
        }}
      >
        {children}
      </Container>
    </CoverLayoutRoot>
  );
}

CoverLayout.propTypes = {
  children: PropTypes.node,
};

export default function CoverPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          navigate("/home");
        } else {
          console.error("Nessun account trovato.");
        }
      } catch (error) {
        console.error("Accesso all'account negato o altro errore:", error);
      }
    } else {
      console.error("MetaMask non rilevato.");
    }
  };

  return (
    <CoverLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography
          color="white"
          align="center"
          variant="h2"
          marked="center"
          sx={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          Candidato al Pallone d'Oro Storico
        </Typography>
        <Typography
          color="white"
          align="center"
          variant="h5"
          sx={{
            marginBottom: "40px",
            fontSize: "1.5rem",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
          }}
        >
          Vota in sicurezza grazie alla blockchain di Ethereum.
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          sx={{
            fontSize: "1.5rem",
            padding: "1rem 2rem",
            backgroundColor: "black",
            color: "white",
            '&:hover': {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
          }}
          onClick={handleLogin}
        >
          <b>CLICCA QUI PER ACCEDERE</b>
        </Button>
      </Box>
    </CoverLayout>
  );
}
