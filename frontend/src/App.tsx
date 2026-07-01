import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import EmailsPage from "./pages/EmailsPage";
import EmailDetailsPage from "./pages/EmailDetailsPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import SpamPage from "./pages/SpamPage";

function App() {

  return (

    <BrowserRouter>

      <ScrollToTop />

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

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/terms"
          element={<TermsPage />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPage />}
        />

        <Route
          path="/auth/callback/:provider"
          element={<OAuthCallbackPage />}
        />

        <Route
          path="/emails"
          element={<EmailsPage />}
        />
        
        <Route
          path="/emails/:id"
          element={<EmailDetailsPage />}
        />

        <Route
          path="/deadlines"
          element={<DeadlinesPage />}
        />

        <Route
          path="/insights"
          element={<InsightsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route
          path="/spam"
          element={<SpamPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;