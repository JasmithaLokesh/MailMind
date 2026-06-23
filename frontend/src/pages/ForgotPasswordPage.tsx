import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import api from "../services/api";
import { encryptData } from "../utils/encryption";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setResetLink("");

    try {
      const encryptedPayload = encryptData({ email });
      
      const response = await api.post("/api/auth/forgot-password", {
        payload: encryptedPayload
      });

      const data = response.data;
      toast.success(data.message || "Reset link sent successfully!");

      if (data.details?.token) {
        setResetLink(`http://localhost:5173/reset-password?token=${data.details.token}`);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.detail?.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] overflow-hidden relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#009DD1]/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ED348]/20 blur-[180px] rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md">
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#009DD1] hover:text-[#7ED348] transition mb-6"
          >
            <FaArrowLeft /> Back to Login
          </Link>
          <Logo />
        </div>

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Forgot Password?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Enter your email address and we'll send you a secure link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-4 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#7ED348] focus:ring-2 focus:ring-[#7ED348]/20"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#009DD1] hover:bg-[#0087b4] text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {resetLink && (
          <div className="mt-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold">
              <FaClock /> Developer Testing Notice:
            </div>
            <p>A mock email was triggered. You can use the link below to verify reset password flow:</p>
            <a
              href={resetLink}
              className="block font-semibold underline break-all text-[#009DD1] hover:text-[#7ED348]"
            >
              {resetLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
