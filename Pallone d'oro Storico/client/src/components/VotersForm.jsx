import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

const VotersForm = ({ contract, web3, currentAccount }) => {
  const [voterAddress, setVoterAddress] = useState("");

  const handleAddVoter = async () => {
    if (contract && voterAddress) {
      await contract.methods.addVoter(voterAddress).send({
        from: currentAccount,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      setVoterAddress("");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <TextField
        label="Indirizzo Votante"
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
        sx={{ mb: 2, input: { color: '#fff' } }} // Colore del testo bianco
      />
      <Button
        variant="contained"
        onClick={handleAddVoter}
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

export default VotersForm;
