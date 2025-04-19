import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")); // Usa createRoot da "react-dom/client"
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Vote-chain">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
