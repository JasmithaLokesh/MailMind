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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white">
            MailMind
          </h1>

          <p className="text-slate-400 mt-2">
            Your AI Email Copilot
          </p>
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
            className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white outline-none focus:border-cyan-500"
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
              className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white outline-none focus:border-cyan-500"
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
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(
                    !rememberMe
                  )
                }
                className="h-5 w-5 accent-cyan-600 rounded"
              />

              <span className="text-slate-300">
                Remember Me
              </span>

            </label>

            <button
              type="button"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Forgot Password?
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 transition py-4 rounded-xl font-semibold text-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-8 text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}