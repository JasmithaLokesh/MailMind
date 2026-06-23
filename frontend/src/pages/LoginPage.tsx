import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  FaMicrosoft,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaClock,
  FaBriefcase,
  FaBolt,
  FaArrowLeft,
} from "react-icons/fa";
import {
  encryptData
} from "../utils/encryption";

import toast from "react-hot-toast";

import api from "../services/api";
import Logo from "../components/Logo";

export default function LoginPage() {
const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      try {
        toast.loading("Google authenticating...", { id: "google-login" });
        const response = await api.post(
          "/api/auth/google",
          {
            token: tokenResponse.access_token
          }
        );

        const data = response.data;

        if (data.success) {
          localStorage.setItem("session_id", data.session_id);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Google Login Successful", { id: "google-login" });
          navigate("/dashboard");
        } else {
          toast.error("Google Login Failed", { id: "google-login" });
        }

      } catch (error) {
        console.error(error);
        toast.error("Google Login Failed", { id: "google-login" });
      }
    },
    onError: () => {
      toast.error("Google Login Failed");
    }
  });

  const handleOutlookLogin = () => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID || "YOUR_MICROSOFT_CLIENT_ID";
    if (clientId === "YOUR_MICROSOFT_CLIENT_ID" || clientId === "YOUR_CLIENT_ID" || !clientId) {
      navigate("/auth/callback/outlook?code=mock_outlook_code");
      return;
    }
    const redirectUri = encodeURIComponent("http://localhost:5173/auth/callback/outlook");
    const scope = encodeURIComponent("user.read");
    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=${scope}&state=outlook`;
    window.location.href = authUrl;
  };

  const handleYahooLogin = () => {
    const clientId = import.meta.env.VITE_YAHOO_CLIENT_ID || "YOUR_YAHOO_CLIENT_ID";
    if (clientId === "YOUR_YAHOO_CLIENT_ID" || clientId === "YOUR_CLIENT_ID" || !clientId) {
      navigate("/auth/callback/yahoo?code=mock_yahoo_code");
      return;
    }
    const redirectUri = encodeURIComponent("http://localhost:5173/auth/callback/yahoo");
    const scope = encodeURIComponent("openid profile email");
    const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=yahoo`;
    window.location.href = authUrl;
  };

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (
e: React.FormEvent
) => {
e.preventDefault();

try {
  const encryptedPayload =
  encryptData({
    email,
    password,
  });

const response = await api.post(
  "/api/auth/login",
  {
    payload: encryptedPayload
  }
);

  const data = response.data;

  // Backend returns: { success, session_id, details: { user_id, email, full_name } }
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.details?.user_id,
      email: data.details?.email,
      full_name: data.details?.full_name,
    })
  );

  localStorage.setItem(
    "session_id",
    data.session_id
  );

  toast.success("Login successful!");

  setTimeout(() => {
    navigate("/dashboard");
  }, 1000);

} catch (error: any) {

  toast.error(
    error?.response?.data?.detail?.message ||
    error?.response?.data?.detail ||
    "Login failed"
  );

}


};

return (

<div
  className="
  min-h-[calc(100vh-48px)]
  bg-white
  dark:bg-[#0F172A]
  overflow-hidden
  relative
  "
>

  <div className="absolute top-20 left-10 w-96 h-96 bg-[#009DD1]/20 blur-[180px] rounded-full" />
  <div className="absolute top-40 right-10 w-96 h-96 bg-[#7ED348]/20 blur-[180px] rounded-full" />
  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#97E7F5]/20 blur-[150px] rounded-full" />

  <div
    className="
    relative
    z-10
    min-h-[calc(100vh-48px)]
    max-w-7xl
    mx-auto
    px-6
    py-6
    grid
    lg:grid-cols-2
    gap-10
    items-start
    "
  >

    <div>

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

      <div className="mt-4">

        <div
          className="
          mt-4
          inline-flex
          items-center
          gap-2
          px-5
          py-2
          rounded-full
          bg-[#7ED348]/10
          border
          border-[#7ED348]/40
          text-[#7ED348]
          font-semibold
          "
        >
          <FaBolt />
          AI Powered Email Intelligence
        </div>

        <h1
          className="
          mt-8
          text-5xl
          md:text-6xl
          font-bold
          leading-tight
          text-slate-900
          dark:text-white
          "
        >
          Never Miss

          <span className="text-[#009DD1]">
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
          text-lg
          max-w-xl
          text-slate-600
          dark:text-slate-300
          "
        >
          MailMind analyzes your inbox,
          extracts deadlines, summarizes
          conversations and highlights
          important actions automatically.
        </p>

      </div>

      <div className="grid gap-4 mt-10">

        <div className="lg:-mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <FaRobot className="text-[#009DD1] text-2xl" />
          <div>
            <h3 className="font-semibold">
              AI Summaries
            </h3>
            <p className="text-sm text-slate-500">
              Understand emails instantly.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <FaClock className="text-[#7ED348] text-2xl" />
          <div>
            <h3 className="font-semibold">
              Deadline Detection
            </h3>
            <p className="text-sm text-slate-500">
              Never miss important dates.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <FaBriefcase className="text-[#97E7F5] text-2xl" />
          <div>
            <h3 className="font-semibold">
              Interview Tracking
            </h3>
            <p className="text-sm text-slate-500">
              Spot recruiter emails instantly.
            </p>
          </div>
        </div>

      </div>

    </div>

    <div
      className="
      mt-10
      space-y-4
      text-center
      mb-12
      w-full
      max-w-xl
      mx-auto
      bg-white
      dark:bg-slate-900
      border
      border-slate-200
      dark:border-slate-800
      rounded-3xl
      p-8
      md:p-10
      shadow-2xl
      "
    >
      <h2
        className="
        text-4xl
        font-bold
        text-slate-900
        dark:text-white
        align-center
        "
      >
        Welcome Back
      </h2>

      <p
        className="
        mt-4
        mb-8
        text-slate-500
        dark:text-slate-400
        "
      >
        Sign in to your MailMind account
      </p>

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
        transition
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
  transition
  "
>
  <FaMicrosoft
    className="text-[#0078D4] text-xl"
  />

  Continue with Outlook
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
  transition
  "
>
  <FaEnvelope className="text-purple-600 text-xl" />

  Continue with Yahoo
</button>

      <div
        className="
        flex
        items-center
        gap-4
        my-6
        "
      >
        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />

        <span className="text-sm text-slate-500">
          or continue with email
        </span>

        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-700" />
      </div>

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

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

        <div className="flex justify-between items-center">

          <label className="flex items-center gap-3 cursor-pointer">

            <div className="relative">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
                className="
                peer
                appearance-none
                w-6
                h-6
                border-2
                border-slate-300
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
              text-slate-700
              dark:text-slate-300
              font-medium
              "
            >
              Remember Me
            </span>

          </label>

          <Link
            to="/forgot-password"
            className="
            text-[#009DD1]
            hover:text-[#7ED348]
            transition
            font-medium
            "
          >
            Forgot Password?
          </Link>

        </div>

        <button
          type="submit"
          className="
          w-full
          py-4
          rounded-xl
          bg-[#009DD1]
          hover:bg-[#0087b4]
          text-white
          font-semibold
          text-lg
          shadow-lg
          hover:scale-[1.02]
          transition
          "
        >
          Login
        </button>

      </form>

      <p
        className="
        text-center
        mt-8
        text-slate-500
        dark:text-slate-400
        "
      >
        Don't have an account?{" "}

        <Link
          to="/signup"
          className="
          text-[#009DD1]
          hover:text-[#7ED348]
          font-semibold
          "
        >
          Sign Up
        </Link>

      </p>

      <div className="mt-8 text-center text-xs text-slate-400">
        By continuing, you agree to our{" "}
        <Link to="/terms" className="text-[#009DD1] hover:underline font-semibold">Terms of Service</Link>
        {" "}and{" "}
        <Link to="/privacy" className="text-[#009DD1] hover:underline font-semibold">Privacy Policy</Link>
      </div>

    </div>

  </div>

</div>

);
}
