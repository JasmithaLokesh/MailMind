import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
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
    <div className="min-h-screen bg-white dark:bg-[#0F172A] flex items-center justify-center px-6 py-10">

      <div
        className="
        w-full
        max-w-xl
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        p-10
        shadow-xl
      "
      >

        {/* Logo */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
            MailMind
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Your AI Email Copilot
          </p>

        </div>

        {/* Form */}

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
              focus:border-[#009DD1]
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
                setPassword(e.target.value)
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
                focus:border-[#009DD1]
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

          {/* Remember Me */}

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
                hover:text-[#0086b3]
                font-medium
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="
              w-full
              bg-[#009DD1]
              hover:bg-[#0086b3]
              transition
              py-4
              rounded-xl
              text-white
              font-semibold
              text-lg
            "
          >
            Login
          </button>

        </form>

        {/* Footer */}

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
            font-medium
            hover:text-[#0086b3]
          "
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}