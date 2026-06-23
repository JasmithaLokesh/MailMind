import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

export default function OAuthCallbackPage() {
  const { provider } = useParams<{ provider: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCode = async () => {
      const code = searchParams.get("code");
      
      if (!code) {
        toast.error("Authorization code not found.");
        navigate("/login");
        return;
      }

      try {
        toast.loading(`Authenticating with ${provider}...`, { id: "oauth-exchange" });
        
        const response = await api.post(`/api/auth/${provider}`, {
          code: code
        });
        
        const data = response.data;
        
        if (data.success) {
          localStorage.setItem("session_id", data.session_id);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          sessionStorage.removeItem("signup_fullName");
          sessionStorage.removeItem("signup_email");
          sessionStorage.removeItem("signup_password");
          sessionStorage.removeItem("signup_confirmPassword");
          sessionStorage.removeItem("signup_acceptedTerms");
          
          toast.success("Successfully logged in!", { id: "oauth-exchange" });
          navigate("/dashboard");
        } else {
          toast.error(data.error || "Authentication failed.", { id: "oauth-exchange" });
          navigate("/login");
        }
      } catch (error: any) {
        console.error("OAuth Callback Error:", error);
        toast.error(
          error?.response?.data?.detail || "An error occurred during authentication.", 
          { id: "oauth-exchange" }
        );
        navigate("/login");
      }
    };

    exchangeCode();
  }, [provider, searchParams, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#009DD1]/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ED348]/20 blur-[180px] rounded-full" />
      
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Sleek rotating loader */}
        <div className="w-16 h-16 border-4 border-[#009DD1] border-t-transparent rounded-full animate-spin" />
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
          Securing your {provider} session...
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          This will take only a moment. Please do not close this window.
        </p>
      </div>
    </div>
  );
}
