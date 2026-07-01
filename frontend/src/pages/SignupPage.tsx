import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  encryptData
} from "../utils/encryption";
import {
  generateCodeVerifier,
  generateCodeChallenge
} from "../utils/pkce";

import Logo from "../components/Logo";
import { useGoogleLogin } from "@react-oauth/google";

import {
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaBolt,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaRobot,
  FaEnvelope,
} from "react-icons/fa";

import api from "../services/api";

export default function SignupPage() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState(() => {
    return sessionStorage.getItem("signup_fullName") || "";
  });

  const [acceptedTerms, setAcceptedTerms] = useState(() => {
    return sessionStorage.getItem("signup_acceptedTerms") === "true";
  });

  const [email, setEmail] = useState(() => {
    return sessionStorage.getItem("signup_email") || "";
  });

  const [password, setPassword] = useState(() => {
    return sessionStorage.getItem("signup_password") || "";
  });

  const [confirmPassword, setConfirmPassword] = useState(() => {
    return sessionStorage.getItem("signup_confirmPassword") || "";
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    sessionStorage.setItem("signup_fullName", fullName);
  }, [fullName]);

  useEffect(() => {
    sessionStorage.setItem("signup_email", email);
  }, [email]);

  useEffect(() => {
    sessionStorage.setItem("signup_password", password);
  }, [password]);

  useEffect(() => {
    sessionStorage.setItem("signup_confirmPassword", confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    sessionStorage.setItem("signup_acceptedTerms", String(acceptedTerms));
  }, [acceptedTerms]);

  const clearSignupForm = () => {
    sessionStorage.removeItem("signup_fullName");
    sessionStorage.removeItem("signup_email");
    sessionStorage.removeItem("signup_password");
    sessionStorage.removeItem("signup_confirmPassword");
    sessionStorage.removeItem("signup_acceptedTerms");
  };

  const handleOutlookLogin = async () => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID || "YOUR_MICROSOFT_CLIENT_ID";
    const tenantId = import.meta.env.VITE_MICROSOFT_TENANT_ID || "common";
    if (clientId === "YOUR_MICROSOFT_CLIENT_ID" || clientId === "YOUR_CLIENT_ID" || !clientId) {
      clearSignupForm();
      navigate("/auth/callback/outlook?code=mock_outlook_code");
      return;
    }
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    sessionStorage.setItem("outlook_code_verifier", verifier);

    const redirectUri = encodeURIComponent(import.meta.env.VITE_MICROSOFT_REDIRECT_URI || "http://localhost:5173/auth/callback/outlook");
    const scope = encodeURIComponent("user.read");
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}&state=outlook&code_challenge=${challenge}&code_challenge_method=S256`;
    window.location.href = authUrl;
  };

  const handleYahooLogin = () => {
    const clientId = import.meta.env.VITE_YAHOO_CLIENT_ID || "YOUR_YAHOO_CLIENT_ID";
    if (clientId === "YOUR_YAHOO_CLIENT_ID" || clientId === "YOUR_CLIENT_ID" || !clientId) {
      clearSignupForm();
      navigate("/auth/callback/yahoo?code=mock_yahoo_code");
      return;
    }
    const redirectUri = encodeURIComponent("http://localhost:5173/auth/callback/yahoo");
    const scope = encodeURIComponent("openid profile email");
    const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=yahoo`;
    window.location.href = authUrl;
  };

  const handleGoogleLogin = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        toast.loading("Google authenticating...", { id: "google-signup" });
        const response = await api.post("/api/auth/google", {
          token: tokenResponse.access_token
        });
        const data = response.data;
        if (data.success) {
          localStorage.setItem("session_id", data.session_id);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Google Authentication Successful", { id: "google-signup" });
          clearSignupForm();
          navigate("/dashboard");
        } else {
          toast.error(data.error || "Google login failed.", { id: "google-signup" });
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Google Login Failed", { id: "google-signup" });
      }
    },
    onError: () => {
      toast.error("Google Login Failed");
    }
  });

  const getPasswordStrength = () => {

    if (password.length < 6) {
      return {
        width: "33%",
        text: "Weak",
        color: "bg-red-500",
        textColor: "text-red-500",
      };
    }

    if (password.length < 10) {
      return {
        width: "66%",
        text: "Medium",
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
      };
    }

    return {
      width: "100%",
      text: "Strong",
      color: "bg-[#7ED348]",
      textColor: "text-[#7ED348]",
    };
  };

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!acceptedTerms) {
      toast.error("Please accept the Terms & Conditions and Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {

      setMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

  const encryptedPayload =
    encryptData({
      email,
      full_name: fullName,
      password,
    });

await api.post(
  "/api/auth/signup",
  {
    payload:
      encryptedPayload,
  }
);

      console.log(encryptedPayload);

      toast.success(
      "Welcome to MailMind !"
    );

      clearSignupForm();

      setTimeout(() => {
        navigate("/login");
  }, 1500);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.detail?.message ||
        error?.response?.data?.detail ||
        "Failed to create account."
      );

    }

  };

  return (

    <div
      className="
      min-h-screen
      bg-white
      dark:bg-[#0F172A]
      overflow-hidden
      relative
      "
    >

      {/* BACKGROUND BLOBS */}

      <div
        className="
        absolute
        top-20
        left-10
        w-96
        h-96
        bg-[#009DD1]/20
        blur-[180px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        top-40
        right-10
        w-96
        h-96
        bg-[#7ED348]/20
        blur-[180px]
        rounded-full
        "
      />

      <div
        className="
        absolute
        bottom-20
        left-1/2
        -translate-x-1/2
        w-80
        h-80
        bg-[#97E7F5]/20
        blur-[150px]
        rounded-full
        "
      />

      <div
        className="
        relative
        z-10
        min-h-screen
        max-w-7xl
        mx-auto
        px-6
        py-6
        grid
        lg:grid-cols-2
        gap-12
        items-start
        "
      >

        {/* LEFT SIDE */}

        <div className="lg:pt-0">

          <Link
            to="/"
            className="
            inline-flex
            items-center
            gap-2
            text-[#009DD1]
            hover:text-[#7ED348]
            transition
            mb-8
            "
          >
            <FaArrowLeft />
            Back to Home
          </Link>

          <Logo />

          <div className="mt-8">

            <div
              className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-[#7ED348]/10
              border
              border-[#7ED348]/30
              text-[#7ED348]
              font-semibold
              mb-8
              "
            >
              <FaBolt />
              AI Powered Email Intelligence
            </div>

            <h1
              className="
              text-5xl
              lg:text-6xl
              font-bold
              leading-tight
              text-slate-900
              dark:text-white
              "
            >
              Never Miss

              <span
                className="
                text-[#009DD1]
                "
              >
                {" "}Important Emails{" "}
              </span>

              Again
            </h1>

            <p
              className="
              mt-12
              text-[#7ED348]
              font-semibold
              tracking-widest
              uppercase
              text-sm
              "
            >
              Smart • Fast • Actionable
            </p>

            <p
              className="
              mt-8
              max-w-xl
              text-lg
              leading-relaxed
              text-slate-600
              dark:text-slate-300
              "
            >
              Join thousands of users who
              use MailMind to prioritize
              emails, detect deadlines,
              track opportunities and stay
              productive with AI-powered
              email intelligence.
            </p>

            <div
              className="
              mt-10
              space-y-5
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#009DD1]/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FaRobot className="text-[#009DD1]" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    AI Summaries
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400">
                    Understand emails instantly
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#7ED348]/10
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FaClock className="text-[#7ED348]" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Deadline Tracking
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400">
                    Never miss important dates
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <div
                  className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#97E7F5]/20
                  flex
                  items-center
                  justify-center
                  "
                >
                  <FaShieldAlt className="text-[#009DD1]" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Secure & Private
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400">
                    Your data stays protected
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="mt-6">

          <div
            className="
            bg-white
            dark:bg-slate-900
            border
            border-slate-200
            dark:border-slate-800
            rounded-[32px]
            p-8
            lg:p-10
            shadow-2xl
            "
          >

            <div className="text-center mb-12">

              <h2
                className="
                text-4xl
                font-bold
                text-slate-900
                dark:text-white
                "
              >
                Create Account
              </h2>

              <p
                className="
                mt-6
                text-slate-500
                dark:text-slate-400
                "
              >
                Start your AI-powered email
                productivity journey
              </p>

            </div>

            {/* SOCIAL SIGNUP */}

            <div className="space-y-4 flex flex-col items-center w-full">

              <div className="w-full flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => handleGoogleLogin()}
                  className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-3
                  py-4
                  rounded-2xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  hover:border-[#7ED348]
                  hover:shadow-md
                  hover:shadow-[#7ED348]/20
                  transition-all
                  duration-300
                  "
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <button
                type="button"
                onClick={handleOutlookLogin}
                className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-4
                rounded-2xl
                border
                border-slate-300
                dark:border-slate-700
                hover:border-[#7ED348]
                hover:shadow-md
                hover:shadow-[#7ED348]/20
                transition-all
                duration-300
                "
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M0 0h11v11H0z" />
                  <path fill="#80bb0a" d="M12 0h11v11H12z" />
                  <path fill="#00a1f1" d="M0 12h11v11H0z" />
                  <path fill="#ffb900" d="M12 12h11v11H12z" />
                </svg>

                Continue with Microsoft
              </button>

              <button
                type="button"
                onClick={handleYahooLogin}
                className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                py-4
                rounded-2xl
                border
                border-slate-300
                dark:border-slate-700
                hover:border-[#7ED348]
                hover:shadow-md
                hover:shadow-[#7ED348]/20
                transition-all
                duration-300
                "
              >
                <FaEnvelope
                  className="text-purple-600 text-xl"
                />

                Continue with Yahoo
              </button>

            </div>

            {/* DIVIDER */}

            <div className="relative my-8">

              <div className="border-t border-slate-300 dark:border-slate-700" />

              <span
                className="
                absolute
                left-1/2
                -translate-x-1/2
                -top-3
                px-4
                bg-white
                dark:bg-slate-900
                text-sm
                text-slate-500
                "
              >
                OR
              </span>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSignup}
              className="space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="
                w-full
                bg-slate-100
                dark:bg-slate-800
                border
                border-slate-300
                dark:border-slate-700
                px-4
                py-4
                rounded-xl
                text-slate-900
                dark:text-white
                outline-none
                focus:border-[#7ED348]
                focus:ring-2
                focus:ring-[#7ED348]/20
                "
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full
                bg-slate-100
                dark:bg-slate-800
                border
                border-slate-300
                dark:border-slate-700
                px-4
                py-4
                rounded-xl
                text-slate-900
                dark:text-white
                outline-none
                focus:border-[#7ED348]
                focus:ring-2
                focus:ring-[#7ED348]/20
                "
                required
              />

              {/* PASSWORD */}

              <div>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    bg-slate-100
                    dark:bg-slate-800
                    border
                    border-slate-300
                    dark:border-slate-700
                    px-4
                    py-4
                    rounded-xl
                    text-slate-900
                    dark:text-white
                    outline-none
                    focus:border-[#7ED348]
                    focus:ring-2
                    focus:ring-[#7ED348]/20
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    "
                  >
                    {showPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

                {password.length > 0 && (

                  <div className="mt-3">

                    <div
                      className="
                      w-full
                      h-2
                      rounded-full
                      bg-slate-200
                      dark:bg-slate-700
                      overflow-hidden
                      "
                    >

                      <div
                        className={`
                        h-full
                        ${getPasswordStrength().color}
                        `}
                        style={{
                          width:
                            getPasswordStrength().width,
                        }}
                      />

                    </div>

                    <p
                      className={`
                      mt-2
                      text-sm
                      ${getPasswordStrength().textColor}
                      `}
                    >
                      Password Strength:{" "}
                      {getPasswordStrength().text}
                    </p>

                  </div>

                )}

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="
                    w-full
                    bg-slate-100
                    dark:bg-slate-800
                    border
                    border-slate-300
                    dark:border-slate-700
                    px-4
                    py-4
                    rounded-xl
                    text-slate-900
                    dark:text-white
                    outline-none
                    focus:border-[#7ED348]
                    focus:ring-2
                    focus:ring-[#7ED348]/20
                    "
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                    "
                  >
                    {showConfirmPassword
                      ? <FaEyeSlash />
                      : <FaEye />}
                  </button>

                </div>

                {confirmPassword.length > 0 && (

                  <div className="mt-3">

                    {passwordsMatch ? (

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        text-[#7ED348]
                        "
                      >
                        <FaCheckCircle />

                        <span>
                          Passwords match
                        </span>
                      </div>

                    ) : (

                      <p className="text-red-500">
                        Passwords do not match
                      </p>

                    )}

                  </div>

                )}

              </div>

              {/* TERMS */}

              <label className="flex items-center gap-3 cursor-pointer">

  <div className="relative">

    <input
      type="checkbox"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      required
      className="
      peer
      appearance-none
      w-6
      h-6
      border-2
      border-slate-300
      dark:border-slate-600
      rounded-md
      cursor-pointer
      transition
      checked:bg-[#009DD1]
      checked:border-[#009DD1]
      "
    />

    <svg
      className="
      absolute
      left-1
      top-1
      w-4
      h-4
      text-white
      hidden
      peer-checked:block
      pointer-events-none
      "
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>

  </div>

  <span
    className="
    text-sm
    text-slate-600
    dark:text-slate-300
    "
  >
    I agree to the{" "}
    <Link
      to="/terms"
      className="
      text-[#009DD1]
      hover:text-[#7ED348]
      font-semibold hover:underline
      "
    >
      Terms & Conditions
    </Link>
    {" "}and{" "}
    <Link
      to="/privacy"
      className="
      text-[#009DD1]
      hover:text-[#7ED348]
      font-semibold hover:underline
      "
    >
      Privacy Policy
    </Link>
  </span>

</label>

              <button
                type="submit"
                className="
                w-full
                py-4
                rounded-xl
                text-white
                text-lg
                font-semibold
                bg-gradient-to-r
                from-[#009DD1]
                to-[#7ED348]
                hover:scale-[1.01]
                transition
                "
              >
                Create Account
              </button>

            </form>

            {message && (

              <p
                className="
                text-center
                mt-6
                text-slate-700
                dark:text-slate-300
                "
              >
                {message}
              </p>

            )}

            <p
              className="
              text-center
              mt-8
              text-slate-500
              dark:text-slate-400
              "
            >
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                text-[#009DD1]
                font-medium
                hover:text-[#7ED348]
                "
              >
                Login
              </Link>

            </p>

            <div className="mt-8 text-center text-xs text-slate-400">
              By registering, you agree to our{" "}
              <Link to="/terms" className="text-[#009DD1] hover:underline font-semibold">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-[#009DD1] hover:underline font-semibold">Privacy Policy</Link>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}