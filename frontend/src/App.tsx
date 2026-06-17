import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

import {
  ThemeProvider,
} from "./context/ThemeContext";

function App() {

  return (

    <ThemeProvider>

      <BrowserRouter>

        <ScrollToTop />

        <Toaster
          position="top-right"
        />

        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/signup"
            element={<SignupPage />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

        </Routes>

      </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;