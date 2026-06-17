import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.tsx";

import {
  ThemeProvider,
} from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

createRoot(
  document.getElementById("root")!
).render(

  <StrictMode>

    <ThemeProvider>

      <App />

      <ThemeProvider>

  <App />

 <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,

    style: {
      background: "#1E293B",
      color: "#FFFFFF",
      border: "1px solid #009DD1",
      borderRadius: "8px",
      boxShadow: "none",
      padding: "12px",
      overflow: "hidden"
    },

    success: {
      style: {
        background: "#1E293B",
        color: "#FFFFFF",
        border: "1px solid #7ED348",
        borderRadius: "8px",
        boxShadow: "none",
        overflow: "hidden"
      },
      iconTheme: {
        primary: "#7ED348",
        secondary: "#FFFFFF",
      },
    },

    error: {
      style: {
        background: "#1E293B",
        color: "#FFFFFF",
        border: "1px solid #EF4444",
        borderRadius: "8px",
        boxShadow: "none",
        overflow: "hidden"
      },
      iconTheme: {
        primary: "#EF4444",
        secondary: "#FFFFFF",
      },
    },
  }}
/>

</ThemeProvider>

    </ThemeProvider>

  </StrictMode>

);