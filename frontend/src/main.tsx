import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.tsx";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import AppToaster from "./components/AppToaster";

createRoot(
  document.getElementById("root")!
).render(

  <StrictMode>

    <ThemeProvider>

      <App />

      <AppToaster />

    </ThemeProvider>

  </StrictMode>

);