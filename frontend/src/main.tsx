import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import {
  ThemeProvider,
} from "./context/ThemeContext";

import AppToaster from "./components/AppToaster";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(
  document.getElementById("root")!
).render(

    <ThemeProvider>

      <GoogleOAuthProvider
        clientId={
          import.meta.env.VITE_GOOGLE_CLIENT_ID ||
          "882563737356-bdd7v01bct0kq4baaajlrmfnoj2demhm.apps.googleusercontent.com"
        }
      >
        <App />
      </GoogleOAuthProvider>

      <AppToaster />

    </ThemeProvider>

);