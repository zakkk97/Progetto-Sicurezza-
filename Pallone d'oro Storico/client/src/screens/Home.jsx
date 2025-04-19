import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Vote from "./Vote";
import Admin from "./Admin";
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../utils/getWeb3";

export default function Home() {
  const [role, setRole] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [electionState, setElectionState] = useState(0);

  // Check if the page has already been refreshed
  const sessionRefreshed = sessionStorage.getItem("hasRefreshed");

  const loadWeb3 = useCallback(async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      setWeb3(web3);
      setCurrentAccount(accounts[0]);
      setContract(instance);
      console.log("Web3 initialized");
    } catch (error) {
      console.error("Error initializing web3:", error);
    }
  }, []);

  const getRole = useCallback(async () => {
    if (contract) {
      try {
        const user = await contract.methods.getRole(currentAccount).call();
        setRole(parseInt(user));
        console.log("Role obtained:", user);
      } catch (error) {
        console.error("Error getting role:", error);
      }
    }
  }, [contract, currentAccount]);

  const getElectionState = useCallback(async () => {
    if (contract) {
      try {
        const state = await contract.methods.electionState().call();
        setElectionState(parseInt(state));
        console.log("Election state:", state);
      } catch (error) {
        console.error("Error getting election state:", error);
      }
    }
  }, [contract]);

  useEffect(() => {
    loadWeb3();
  }, [loadWeb3]);

  useEffect(() => {
    if (contract) {
      getRole();
      getElectionState();
    }
  }, [contract, getRole, getElectionState]);

  useEffect(() => {
    if (loading && !hasRefreshed && !sessionRefreshed) {
      // Set the flag to indicate the page has been refreshed
      sessionStorage.setItem("hasRefreshed", "true");
      setHasRefreshed(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 secondi
    } else if (role !== null) {
      // Ensure loading is set to false only after role is obtained
      setLoading(false);
    }
  }, [loading, hasRefreshed, sessionRefreshed, role]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        height: "100vh",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          Attendi stai per essere collegato...
        </Box>
      ) : (
        <Box>
          {role === 1 && (
            <Admin
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
            />
          )}

          {role === 2 && (
            <Vote
              role={role}
              contract={contract}
              web3={web3}
              currentAccount={currentAccount}
              electionState={electionState}
            />
          )}

          {role === 3 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              Unauthorized User
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
