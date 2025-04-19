import { Routes, Route } from "react-router-dom"; // Aggiungi questa riga
import { useState } from "react"; // Rimuovi useEffect da qui se non viene usato
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import CoverPage from "./screens/CoverPage";
import Admin from "./screens/Admin";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<CoverPage setAccount={setAccount} setContract={setContract} />} />
          <Route path="/home" element={<Home account={account} contract={contract} />} />
          <Route path="/admin" element={<Admin account={account} contract={contract} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
