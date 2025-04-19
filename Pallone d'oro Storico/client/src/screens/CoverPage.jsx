import * as React from "react";
import { Button, Typography, Box } from "@mui/material";
import CoverLayout from "../components/CoverLayout";
import { useNavigate } from "react-router-dom";
import getWeb3 from "../utils/getWeb3";
import Election from "../contracts/Election.json";

export default function CoverPage({ setAccount, setContract }) {
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Election.networks[networkId];
        const instance = new web3.eth.Contract(
          Election.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAccount(accounts[0]);
        setContract(instance);
        navigate("/home"); // Assicurati che il routing avvenga dopo che l'account e il contratto sono impostati
      } catch (error) {
        console.error("User denied account access or other error:", error);
      }
    } else {
      console.error("MetaMask not detected.");
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
          height: "100vh",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          color="textPrimary"
          align="center"
          variant="h2"
          marked="center"
          sx={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          VoteChain
        </Typography>
        <Typography
          color="textSecondary"
          align="center"
          variant="h5"
          sx={{
            marginBottom: "40px",
            fontSize: "1.5rem",
          }}
        >
          Per un voto sicuro grazie ad Ethereum blockchain.
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
