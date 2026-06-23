import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import api from "../services/api";
import { encryptData } from "../utils/encryption";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    if (password.length < 6) {
      return { width: "33%", text: "Weak", color: "bg-red-500", textColor: "text-red-500" };
    }
    if (password.length < 10) {
      return { width: "66%", text: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500" };
    }
    return { width: "100%", text: "Strong", color: "bg-[#7ED348]", textColor: "text-[#7ED348]" };
  };

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid password reset token.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const encryptedPayload = encryptData({ token, password });
      
      const response = await api.post("/api/auth/reset-password", {
        payload: encryptedPayload
      });

      toast.success(response.data.message || "Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.detail?.message || "Failed to reset password.");
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
          Reset Password
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Create a new password below for your MailMind account.
        </p>

        {!token ? (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            Error: No reset token was found in the URL. Please verify your reset link.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-4 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#7ED348] focus:ring-2 focus:ring-[#7ED348]/20"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-3">
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrength().color}`}
                      style={{ width: getPasswordStrength().width }}
                    />
                  </div>
                  <p className={`mt-2 text-sm ${getPasswordStrength().textColor}`}>
                    Password Strength: {getPasswordStrength().text}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-4 rounded-xl text-slate-900 dark:text-white outline-none focus:border-[#7ED348] focus:ring-2 focus:ring-[#7ED348]/20"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {confirmPassword.length > 0 && (
                <div className="mt-3">
                  {passwordsMatch ? (
                    <div className="flex items-center gap-2 text-[#7ED348]">
                      <FaCheckCircle /> Passwords match
                    </div>
                  ) : (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !passwordsMatch}
              className="w-full py-4 rounded-xl bg-[#009DD1] hover:bg-[#0087b4] text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
