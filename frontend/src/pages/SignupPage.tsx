import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from "react-icons/fa";
import api from "../services/api";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const [message, setMessage] = useState("");

  const getPasswordStrength = () => {

    if (password.length < 6) {
      return {
        text: "Weak",
        color: "text-red-400"
      };
    }

    if (password.length < 10) {
      return {
        text: "Medium",
        color: "text-yellow-400"
      };
    }

    return {
      text: "Strong",
      color: "text-green-400"
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

      const response = await api.post(
        "/api/auth/signup",
        {
          email,
          full_name: fullName,
          password,
        }
      );

      console.log(response.data);

      setMessage(
        "Signup successful!"
      );

      // Clear form after success
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error: any) {

      setMessage(
        error?.response?.data?.detail ||
        "Signup failed"
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

          <Link
            to="/login"
            className="bg-slate-800 text-white py-3 text-center hover:bg-slate-700 transition"
          >
            Sign In
          </Link>

          <div className="bg-violet-600 text-white py-3 text-center font-semibold">
            Sign Up
          </div>

        </div>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 outline-none"
            required
          />

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

          {/* Password */}

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

            {password.length > 0 && (

              <p
                className={`mt-2 text-sm ${getPasswordStrength().color}`}
              >
                Password Strength:{" "}
                {getPasswordStrength().text}
              </p>

            )}

          </div>

          {/* Confirm Password */}

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
                className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </button>

            </div>

            {passwordsMatch && (

              <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">

                <FaCheckCircle />

                <span>
                  Passwords match
                </span>

              </div>

            )}

          </div>

          <div className="flex items-center gap-3">

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
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition py-4 rounded-xl text-white font-semibold text-lg"
          >
            Create Account
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

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-violet-400 hover:text-violet-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}