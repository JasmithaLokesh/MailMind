import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import {
  encryptData
} from "../utils/encryption";
import {
FaEye,
FaEyeSlash,
FaRobot,
FaClock,
FaBriefcase,
FaBolt,
FaArrowLeft,
} from "react-icons/fa";

import toast from "react-hot-toast";

import api from "../services/api";
import Logo from "../components/Logo";

export default function LoginPage() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const handleGoogleLogin = () => {
toast("Google Login Coming Soon");
};

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

await api.post(
  "/api/auth/login",
  {
    payload:
      encryptedPayload,
  }
);

  localStorage.setItem(
    "user",
    JSON.stringify(encryptedPayload)
  );

  localStorage.setItem(
    "session_id",
    encryptedPayload
  );

  toast.success("Login successful!");

  setTimeout(() => {
    navigate("/dashboard");
  }, 1000);

} catch (error: any) {

  toast.error(
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
        mt-10
        onClick={handleGoogleLogin}
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
        <span className="text-lg">
          <FcGoogle className="text-2xl" />
        </span>

        Continue with Google
      </button>

      <button
  type="button"
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

          <button
            type="button"
            className="
            text-[#009DD1]
            hover:text-[#7ED348]
            transition
            font-medium
            "
          >
            Forgot Password?
          </button>

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

    </div>

  </div>

</div>

);
}
