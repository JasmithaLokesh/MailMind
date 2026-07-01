import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaCalendarAlt,
  FaCalendarCheck,
  FaExclamationCircle,
  FaArrowLeft
} from "react-icons/fa";

import { getPriorityInbox } from "../services/emailService";
import type { Email } from "../services/emailService";

export default function DeadlinesPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const fetchDeadlines = async () => {
      setLoading(true);
      const sessionId = localStorage.getItem("session_id");
      if (!sessionId) {
        navigate("/login");
        return;
      }
      
      try {
        const data = await getPriorityInbox(sessionId, 100, 0, {
          has_deadline: true,
          sort_by: "date",
        });
        setEmails(data.emails);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load deadlines");
      } finally {
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, [navigate]);

  const calculateDaysRemaining = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    // Reset time to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  const getStatusColor = (days: number) => {
    if (days < 0) return "text-red-600 bg-red-100 dark:bg-red-900/30";
    if (days === 0) return "text-orange-600 bg-orange-100 dark:bg-orange-900/30";
    if (days <= 3) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
    return "text-green-600 bg-green-100 dark:bg-green-900/30";
  };

  const getStatusText = (days: number) => {
    if (days < 0) return `Overdue by ${Math.abs(days)} day(s)`;
    if (days === 0) return "Due Today";
    if (days === 1) return "Due Tomorrow";
    return `Due in ${days} days`;
  };

  return (
    <div className={`${theme==="dark"?"bg-[#0F172A] text-white":"bg-white text-[#0F172A]"} min-h-screen flex`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 p-8 lg:p-10 transition-all duration-300 h-screen overflow-y-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-2 text-[#009DD1] hover:text-[#7ED348] font-medium mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <FaCalendarAlt className="text-[#7ED348]" /> Deadlines
            </h1>
            <p className="text-slate-500 mt-2">AI automatically detects deadlines from your emails.</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl border dark:border-slate-700 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex justify-center items-center h-64">
               <FaSpinner className="animate-spin text-4xl text-[#009DD1]" />
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
               <FaCalendarCheck className="text-5xl mx-auto mb-4 opacity-50" />
               <p className="text-xl">No upcoming deadlines detected.</p>
               <p className="mt-2 text-sm">You are all caught up!</p>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-700">
              {emails.map((email) => {
                if (!email.deadline) return null;
                const daysRemaining = calculateDaysRemaining(email.deadline);
                const isOverdue = daysRemaining < 0;

                return (
                  <div 
                    key={email.id}
                    onClick={() => navigate(`/emails/${email.id}`)}
                    className="p-6 hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors flex flex-col md:flex-row gap-6 items-center"
                  >
                    <div className="flex-1 w-full">
                      <h3 className="font-bold text-xl mb-1 truncate">{email.subject || "(No Subject)"}</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-2">From: {email.sender}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {email.summary}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl min-w-[200px] border dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
                      <div className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">
                        {new Date(email.deadline).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className={`px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-2 ${getStatusColor(daysRemaining)}`}>
                        {isOverdue && <FaExclamationCircle />}
                        {getStatusText(daysRemaining)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
