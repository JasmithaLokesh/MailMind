import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import api from "../services/api";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      console.log(response.data);

      setMessage(
        "Login successful!"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data
        )
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error: any) {

      setMessage(
        error?.response?.data?.detail ||
        "Login failed"
      );

    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur border border-slate-800 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-8">

          <h1 className="text-5xl font-bold text-white">
            MailMind
          </h1>

          <p className="text-slate-400 mt-2">
            Your AI Email Copilot
          </p>

        </div>

        <div className="grid grid-cols-2 mb-8 rounded-xl overflow-hidden">

          <div className="bg-violet-600 text-white py-3 text-center font-semibold">
            Sign In
          </div>

          <Link
            to="/signup"
            className="bg-slate-800 text-white py-3 text-center hover:bg-slate-700 transition"
          >
            Sign Up
          </Link>

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
              setEmail(
                e.target.value
              )
            }
            className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 outline-none"
            required
          />

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
                className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
              />

              <label className="text-slate-300">
                Remember Me
              </label>

            </div>

            <button
              type="button"
              className="text-violet-400 hover:text-violet-300"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition py-4 rounded-xl text-white font-semibold text-lg"
          >
            Login
          </button>

        </form>

        {message && (

          <p
            className={`text-center mt-6 font-medium ${
              message.includes("successful")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>

        )}

        <p className="text-center mt-6 text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-violet-400 hover:text-violet-300"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>

  );
}