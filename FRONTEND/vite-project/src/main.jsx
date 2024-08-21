import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/main";
import "./index.css";
import { BrowserRouter, Route, Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
