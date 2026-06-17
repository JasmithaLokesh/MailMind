import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Logo from "../components/Logo";

import {
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaBolt,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaRobot,
  FaMicrosoft,
  FaEnvelope,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import api from "../services/api";

export default function SignupPage() {

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

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

    if (password !== confirmPassword) {

      setMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

      const response =
        await api.post(
          "/api/auth/signup",
          {
            email,
            full_name: fullName,
            password,
          }
        );

      console.log(response.data);

      toast.success(
      "Welcome to MailMind !"
    );

      setTimeout(() => {
    window.location.href = "/login";
  }, 1500);

    } catch (error: any) {

      toast.error(
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
                mt-4
                text-slate-500
                dark:text-slate-400
                "
              >
                Start your AI-powered email
                productivity journey
              </p>

            </div>

            {/* SOCIAL SIGNUP */}

            <div className="space-y-4">

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
                transition-all
                duration-300
                "
              >
                <FcGoogle className="text-2xl" />

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
                transition-all
                duration-300
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
      font-medium
      "
    >
      Terms & Conditions
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

          </div>

        </div>

      </div>

    </div>

  );
}