import { useEffect, useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from "@mui/material/styles";
import gbImage from '../assets/GB.jpg'; // Importa l'immagine

import Candidate from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import VotersForm from "../components/VotersForm";

const SoccerBackgroundBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
    url(${gbImage})`, // Usa l'immagine importata
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
}));

export default function Admin({ role, contract, web3, currentAccount }) {
  const [electionState, setElectionState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [open, setOpen] = useState(false);

  const preDefinedCandidates = useMemo(() => [
    "Messi",
    "CR7",
    "Mbappe",
    "R9",
    "Maradona",
    "Pelé"
  ], []);

  const getCandidates = useCallback(async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidateDetails(i).call();
        temp.push({ name: candidate[0], votes: candidate[1] });
      }
      setCandidates(temp);
      setLoading(false);
    }
  }, [contract]);

  const getElectionState = useCallback(async () => {
    if (contract) {
      const state = await contract.methods.electionState().call();
      setElectionState(parseInt(state));
    }
  }, [contract]);

  const addPreDefinedCandidates = useCallback(async () => {
    if (contract) {
      const count = await contract.methods.candidatesCount().call();
      if (count === 0) {
        for (let candidate of preDefinedCandidates) {
          await contract.methods.addCandidate(candidate).send({
            from: currentAccount,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
        }
        getCandidates(); // Aggiorna la lista dei candidati
      }
    }
  }, [contract, currentAccount, getCandidates, web3.utils, preDefinedCandidates]);

  useEffect(() => {
    getElectionState();
    getCandidates();
    addPreDefinedCandidates();
  }, [contract, getElectionState, getCandidates, addPreDefinedCandidates]);

  const handleEnd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    if (electionState === 0) {
      try {
        if (contract) {
          await contract.methods.startElection().send({
            from: currentAccount,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
          getElectionState();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (electionState === 1) {
      try {
        if (contract) {
          await contract.methods.endElection().send({
            from: currentAccount,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
          getElectionState();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    setOpen(false);
  };

  return (
    <SoccerBackgroundBox>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box>
          <Grid container spacing={4} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "8px", color: "#fff" }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
                  Stato delle Elezioni
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {electionState === 0 && "Le elezioni non sono iniziate"}
                  {electionState === 1 && "Elezioni in corso"}
                  {electionState === 2 && "Elezioni terminate"}
                </Typography>
                <Divider sx={{ my: 2, backgroundColor: "#fff" }} />
                {electionState !== 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEnd}
                    startIcon={<AddCircleIcon />}
                    sx={{
                      mt: 2,
                      backgroundColor: "#000", // Sfondo nero
                      color: "#fff", // Testo bianco
                      '&:hover': {
                        backgroundColor: "#333" // Colore di sfondo al passaggio del mouse
                      }
                    }}
                    >
                    
                    {electionState === 0 && "Inizia le votazioni per il candidato al Pallone d'oro"}
                    {electionState === 1 && "Termina le votazioni"}
                  </Button>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 4, backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "8px", color: "#fff" }}>
                <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
                  {electionState === 0 && "Aggiungi Votanti / Candidati"}
                  {electionState === 1 && "Guarda la Live delle Elezioni"}
                  {electionState === 2 && "Risultati delle Elezioni"}
                </Typography>
                <Divider sx={{ mb: 4, backgroundColor: "#fff" }} />
                {electionState === 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <VotersForm
                      contract={contract}
                      web3={web3}
                      currentAccount={currentAccount}
                    />
                    <CandidateForm
                      contract={contract}
                      web3={web3}
                      currentAccount={currentAccount}
                    />
                  </Box>
                )}
                {electionState > 0 && (
                  <Grid container spacing={2} justifyContent="center">
                    {candidates.map((candidate, index) => (
                      <Grid item key={index}>
                        <Candidate
                          id={index}
                          name={candidate.name}
                          voteCount={candidate.votes}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" color="#fff">
                {electionState === 0 && "Vuoi far partire le elezioni?"}
                {electionState === 1 && "Vuoi terminare le elezioni?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleAgree} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </SoccerBackgroundBox>
  );
}
