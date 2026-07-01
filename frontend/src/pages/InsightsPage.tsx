import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaRobot,
  FaChartBar,
  FaExclamationCircle,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaClock,
  FaArrowLeft
} from "react-icons/fa";

import { getDashboardStats } from "../services/emailService";
import type { DashboardStats } from "../services/emailService";

export default function InsightsPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const sessionId = localStorage.getItem("session_id");
      if (!sessionId) {
        navigate("/login");
        return;
      }
      
      try {
        const data = await getDashboardStats(sessionId);
        setStats(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load insights");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

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
        <div className="flex justify-between items-center mb-10 border-b dark:border-slate-700 pb-6">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <FaRobot className="text-[#009DD1]" /> AI Insights
            </h1>
            <p className="text-slate-500 mt-2">Deep analytics and intelligent patterns from your inbox.</p>
          </div>
        </div>

        {loading || !stats ? (
          <div className="flex justify-center items-center h-64">
             <FaSpinner className="animate-spin text-4xl text-[#009DD1]" />
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* High Level Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400">
                  <FaChartBar className="text-3xl" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Average Priority</p>
                  <p className="text-3xl font-extrabold">{stats.average_priority.toFixed(1)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-red-500/20 rounded-full text-red-600 dark:text-red-400">
                  <FaExclamationCircle className="text-3xl" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">High Priority</p>
                  <p className="text-3xl font-extrabold">{stats.high_priority}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-green-500/20 rounded-full text-green-600 dark:text-green-400">
                  <FaCheckCircle className="text-3xl" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Action Items</p>
                  <p className="text-3xl font-extrabold">{stats.pending_action_items}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 p-6 rounded-3xl flex items-center gap-4">
                <div className="p-4 bg-purple-500/20 rounded-full text-purple-600 dark:text-purple-400">
                  <FaEnvelopeOpenText className="text-3xl" />
                </div>
                <div>
                  <p className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Unread Mails</p>
                  <p className="text-3xl font-extrabold">{stats.unread_emails}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Inbox Flow */}
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaClock className="text-[#009DD1]" /> Inbox Velocity
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Emails Today</span>
                      <span className="font-bold">{stats.emails_today}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#009DD1] to-blue-500 h-3 rounded-full" style={{ width: `${Math.min((stats.emails_today / 50) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Emails This Week</span>
                      <span className="font-bold">{stats.emails_this_week}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full" style={{ width: `${Math.min((stats.emails_this_week / 200) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">Total Analyzed</span>
                      <span className="font-bold">{stats.total_emails}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-[#7ED348] to-green-500 h-3 rounded-full" style={{ width: `100%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorization */}
              <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Categorization</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-700 text-center">
                    <div className="text-4xl font-bold text-indigo-500 mb-2">{stats.recruiter_emails}</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase">Recruiter Emails</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-700 text-center">
                    <div className="text-4xl font-bold text-orange-500 mb-2">{stats.upcoming_deadlines}</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase">Upcoming Deadlines</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border dark:border-slate-700 text-center col-span-2">
                    <div className="text-4xl font-bold text-red-500 mb-2">{stats.spam_emails}</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase">Blocked Spam & Promotions</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
