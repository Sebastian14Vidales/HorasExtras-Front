import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <NextUIProvider>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </NextUIProvider>
  
);
