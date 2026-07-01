import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaSpinner,
  FaRobot,
  FaTags,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaTasks,
  FaCopy,
  FaCheck
} from "react-icons/fa";

import { getEmailDetails } from "../services/emailService";
import type { Email } from "../services/emailService";

export default function EmailDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<Email | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (email?.suggested_reply) {
      navigator.clipboard.writeText(email.suggested_reply);
      setCopied(true);
      toast.success("Suggested Reply copied to clipboard");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  useEffect(() => {
    const fetchEmail = async () => {
      const sessionId = localStorage.getItem("session_id");
      if (!sessionId || !id) {
        navigate("/login");
        return;
      }
      
      try {
        const data = await getEmailDetails(Number(id), sessionId);
        setEmail(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load email details");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmail();
  }, [id, navigate]);

  const card = theme === "dark" ? "bg-[#1E293B] border border-cyan-500/20" : "bg-[#F8FAFC] border border-[#97E7F5] shadow-md";

  const getPriorityColor = (score: number | null) => {
    if (score === null) return "text-gray-400";
    if (score >= 80) return "text-red-500";
    if (score >= 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className={`${theme==="dark"?"bg-[#0F172A] text-white":"bg-white text-[#0F172A]"} min-h-screen flex`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 p-8 lg:p-10 transition-all duration-300 h-screen overflow-y-auto">
        <button 
          onClick={() => navigate('/emails')} 
          className="flex items-center gap-2 text-[#009DD1] hover:text-[#7ED348] font-medium mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <FaSpinner className="animate-spin text-4xl text-[#009DD1]" />
          </div>
        ) : email ? (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* ORIGINAL EMAIL CONTENT */}
            <div className="lg:col-span-2 space-y-6">
              <div className={`${card} rounded-3xl p-8`}>
                <h1 className="text-3xl font-bold mb-4">{email.subject || "(No Subject)"}</h1>
                <div className="flex flex-col sm:flex-row justify-between text-slate-500 dark:text-slate-400 mb-8 border-b dark:border-slate-700 pb-4">
                  <div>
                    <span className="font-semibold text-[#0F172A] dark:text-white">From:</span> {email.sender}
                  </div>
                  <div>
                    {new Date(email.received_at).toLocaleString()}
                  </div>
                </div>
                
                <div className="whitespace-pre-wrap font-sans leading-relaxed text-lg text-slate-800 dark:text-slate-200">
                  {email.body}
                </div>
              </div>
            </div>

            {/* AI REPORT PANEL */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#009DD1] to-[#7ED348] p-1 rounded-3xl">
                <div className={`${theme === 'dark' ? 'bg-[#0F172A]' : 'bg-white'} rounded-[22px] p-6 h-full`}>
                  <div className="flex items-center gap-3 mb-6 border-b dark:border-slate-700 pb-4">
                    <FaRobot className="text-2xl text-[#009DD1]" />
                    <h2 className="text-2xl font-bold">AI Analysis</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Priority Score</h3>
                      <div className={`text-4xl font-extrabold ${getPriorityColor(email.priority_score)}`}>
                        {email.priority_score ?? "N/A"}
                      </div>
                      {email.importance_reason && (
                        <p className="mt-2 text-sm italic text-slate-600 dark:text-slate-400">"{email.importance_reason}"</p>
                      )}
                    </div>

                    {email.summary && (
                      <div>
                        <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Summary</h3>
                        <p className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-sm border dark:border-slate-700">
                          {email.summary}
                        </p>
                      </div>
                    )}

                    {email.action_items && (
                      <div>
                        <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                          <FaTasks /> Action Items
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-xl">
                          {email.action_items.split('\n').map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {email.deadline && (
                      <div>
                        <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                          <FaCalendarAlt /> Detected Deadline
                        </h3>
                        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                          {new Date(email.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    )}

                    {email.suggested_reply && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm text-slate-500 uppercase font-bold tracking-wider">Suggested Reply</h3>
                          <button 
                            onClick={handleCopy}
                            className="text-slate-400 hover:text-[#009DD1] transition-colors p-1"
                            title="Copy to clipboard"
                          >
                            {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
                          </button>
                        </div>
                        <p className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 p-4 rounded-xl text-sm italic">
                          {email.suggested_reply}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Category</h3>
                        <div className="font-medium">{email.category || "N/A"}</div>
                      </div>
                      <div>
                        <h3 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Classification</h3>
                        <div className="font-medium text-purple-500">{email.classification || "N/A"}</div>
                      </div>
                      <div>
                        <h3 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Sentiment</h3>
                        <div className="font-medium">{email.sentiment || "N/A"}</div>
                      </div>
                      {email.classification === "Spam" && (
                        <div className="col-span-2 mt-2 flex items-center gap-2 text-red-500 font-bold bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                          <FaExclamationTriangle /> Warning: Detected as Spam
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 text-xl">
            Email not found.
          </div>
        )}
      </main>
    </div>
  );
}
