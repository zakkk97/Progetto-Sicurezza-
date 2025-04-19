import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const CandidateForm = ({ contract, web3, currentAccount }) => {
  const [candidateName, setCandidateName] = useState("");

  const handleAddCandidate = async () => {
    if (contract && candidateName) {
      await contract.methods.addCandidate(candidateName).send({
        from: currentAccount,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      setCandidateName("");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <TextField
        label="Nome del Candidato"
        value={candidateName}
        onChange={(e) => setCandidateName(e.target.value)}
        sx={{ mb: 2, input: { color: '#fff' } }} // Colore del testo bianco
      />
      <Button
        variant="contained"
        onClick={handleAddCandidate}
        sx={{
          backgroundColor: "#000", // Sfondo nero
          color: "#fff", // Testo bianco
          '&:hover': {
            backgroundColor: "#333" // Colore di sfondo al passaggio del mouse
          }
        }}
      >
        AGGIUNGI
      </Button>
    </Box>
  );
};

export default CandidateForm;
