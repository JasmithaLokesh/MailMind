import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaBolt,
  FaTasks,
  FaRobot,
  FaChartLine,
  FaClock,
  FaMoon,
  FaSun,
  FaExclamationTriangle,
  FaSpinner,
  FaBriefcase,
  FaEnvelopeOpen
} from "react-icons/fa";

import api from "../services/api";
import { getDashboardStats, getPriorityInbox } from "../services/emailService";
import type { DashboardStats, Email } from "../services/emailService";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [inbox, setInbox] = useState<Email[]>([]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) return;
    
    try {
      const [statsData, inboxData] = await Promise.all([
        getDashboardStats(sessionId),
        getPriorityInbox(sessionId, 5) // Fetch top 5 for dashboard
      ]);
      setStats(statsData);
      setInbox(inboxData.emails);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validateSession = async () => {
      const sessionId = localStorage.getItem("session_id");

      if (!sessionId) {
        navigate("/login");
        return;
      }

      try {
        await api.get(
          `/api/auth/validate-session?session_id=${sessionId}`
        );
        fetchDashboardData();
      } catch {
        localStorage.removeItem("session_id");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    validateSession();
  }, [navigate]);

  let user: any = {};
  try {
    const rawUser = localStorage.getItem("user");
    if (rawUser && rawUser !== "undefined" && rawUser !== "null") {
      user = JSON.parse(rawUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  const initials =
    user?.full_name
      ? user.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
      : "U";

  const handleLogout = async () => {
    try {
      const sessionId = localStorage.getItem("session_id");

      await api.post("/api/auth/logout", {
        session_id: sessionId,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("session_id");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSyncInbox = async () => {
    try {
      setSyncing(true);
      const sessionId = localStorage.getItem("session_id");
      const response = await api.get(
        `/api/gmail/sync?session_id=${sessionId}`
      );

      if (response.data.new_emails_synced === 0) {
          toast.success("Inbox is already up to date");
      } else {
          toast.success(
              `${response.data.new_emails_synced} new email(s) synced`
          );
      }
      
      // Refresh dashboard after sync
      fetchDashboardData();

    } catch (error) {
      console.error(error);
      toast.error("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const card =
    theme === "dark"
      ? "bg-[#1E293B] border border-cyan-500/20"
      : "bg-[#F8FAFC] border border-[#97E7F5] shadow-md";

  function formatMicrosoftEmail(email: string) {
    if (email && email.includes("#EXT#")) {
        return email
            .split("#EXT#")[0]
            .replace("_gmail.com", "@gmail.com")
            .replace("_outlook.com", "@outlook.com")
            .replace("_hotmail.com", "@hotmail.com")
            .replace("_yahoo.com", "@yahoo.com");
    }
    return email || "";
  }

  const getPriorityColor = (score: number | null) => {
    if (score === null) return "text-gray-400";
    if (score >= 80) return "text-red-500";
    if (score >= 50) return "text-yellow-500";
    return "text-green-500";
  };
  
  const getPriorityBorder = (score: number | null) => {
    if (score === null) return "border-gray-500/20";
    if (score >= 80) return "border-red-500/40 border-l-4 border-l-red-500";
    if (score >= 50) return "border-yellow-500/40 border-l-4 border-l-yellow-500";
    return "border-green-500/40 border-l-4 border-l-green-500";
  };

  return (
    <div className={`${theme==="dark"?"bg-[#0F172A] text-white":"bg-white text-[#0F172A]"} min-h-screen flex`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 p-8 lg:p-10 transition-all duration-300 h-screen overflow-y-auto">

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome <span className="text-[#009DD1]">{user.full_name || "User"}</span> 👋
            </h1>
            <p className="mt-2 text-slate-400">
              AI-powered overview of your inbox.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="
              w-14 h-14 rounded-2xl border border-[#97E7F5] bg-white
              dark:bg-slate-800 flex items-center justify-center
              shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300
              "
            >
              {theme === "light" ? (
                <FaMoon size={22} className="text-[#009DD1]" />
              ) : (
                <FaSun size={22} className="text-[#7ED348]" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-12 h-12 rounded-full bg-[#009DD1] text-white font-bold hover:scale-105 transition-all duration-300 shadow-md"
              >
                {initials}
              </button>

              {showProfile && (
                <div className={`${card} absolute right-0 mt-3 w-80 rounded-2xl p-5 z-50`}>
                  <div className="flex items-center gap-3 border-b pb-4 mb-4 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-full bg-[#009DD1] flex items-center justify-center text-white font-bold">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-semibold truncate max-w-[180px]">{user.full_name}</h3>
                      <p className="text-sm text-slate-400 truncate max-w-[180px]">{formatMicrosoftEmail(user.email)}</p>
                    </div>
                  </div>

                  <button onClick={() => navigate('/profile')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-500/10 transition-colors">
                    <FaUser /> Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-8 mb-8 bg-gradient-to-r from-[#009DD1] via-[#97E7F5] to-[#7ED348] text-[#0F172A] shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">MailMind Intelligence Hub</h2>
            <p className="font-medium opacity-90">
              Priority emails, action items, deadlines and AI insights in one place.
            </p>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
            <FaRobot size={150} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
              onClick={handleSyncInbox}
              disabled={syncing}
              className="rounded-xl px-6 py-4 bg-[#009DD1] hover:bg-[#007EA8] text-white font-semibold transition-colors flex items-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
              {syncing ? <FaSpinner className="animate-spin" /> : <FaBolt />}
              {syncing ? "Syncing..." : "Sync Inbox"}
          </button>
          <button onClick={() => navigate('/deadlines')} className="rounded-xl px-6 py-4 bg-[#97E7F5] hover:bg-[#7bcad9] text-[#0F172A] font-semibold transition-colors flex items-center gap-2 shadow-md">
            <FaCalendarAlt /> Review Deadlines
          </button>
          <button onClick={() => navigate('/insights')} className="rounded-xl px-6 py-4 bg-[#7ED348] hover:bg-[#68b338] text-[#0F172A] font-semibold transition-colors flex items-center gap-2 shadow-md">
            <FaRobot /> AI Insights
          </button>
          <button onClick={() => navigate('/spam')} className="rounded-xl px-6 py-4 bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold transition-colors flex items-center gap-2 shadow-md">
            <FaExclamationTriangle /> Spam Mails
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <FaSpinner className="animate-spin text-4xl text-[#009DD1]" />
          </div>
        ) : stats ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaEnvelope className="text-[#009DD1] text-xl" />
                  <span className="text-xs font-semibold px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full">All Time</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Synced</p>
                <h3 className="text-3xl font-bold">{stats.total_emails}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaEnvelopeOpen className="text-yellow-500 text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Unread</p>
                <h3 className="text-3xl font-bold">{stats.unread_emails}</h3>
              </div>

              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaBolt className="text-red-500 text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">High Priority</p>
                <h3 className="text-3xl font-bold">{stats.high_priority}</h3>
              </div>

              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaTasks className="text-[#97E7F5] text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Action Items</p>
                <h3 className="text-3xl font-bold">{stats.pending_action_items}</h3>
              </div>

              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaCalendarAlt className="text-[#7ED348] text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Deadlines</p>
                <h3 className="text-3xl font-bold">{stats.upcoming_deadlines}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaBriefcase className="text-purple-500 text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Recruiter Emails</p>
                <h3 className="text-3xl font-bold">{stats.recruiter_emails}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaExclamationTriangle className="text-orange-500 text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Spam</p>
                <h3 className="text-3xl font-bold">{stats.spam_emails}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Avg Priority</p>
                <h3 className="text-3xl font-bold">{stats.average_priority.toFixed(1)}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaClock className="text-indigo-500 text-xl" />
                  <span className="text-xs font-semibold px-2 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full">Today</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Received</p>
                <h3 className="text-3xl font-bold">{stats.emails_today}</h3>
              </div>
              
              <div className={`${card} rounded-2xl p-5 hover:scale-105 transition-transform duration-300`}>
                <div className="flex justify-between items-start mb-2">
                  <FaClock className="text-teal-500 text-xl" />
                  <span className="text-xs font-semibold px-2 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full">This Week</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Received</p>
                <h3 className="text-3xl font-bold">{stats.emails_this_week}</h3>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className={`${card} rounded-3xl p-8 lg:col-span-2 shadow-sm`}>
                <div className="flex justify-between items-center mb-6">
                   <h2 className="text-2xl font-bold">AI Priority Inbox</h2>
                   <button onClick={() => navigate('/emails')} className="text-sm text-[#009DD1] hover:underline font-medium">View All Emails →</button>
                </div>

                <div className="space-y-4">
                  {inbox.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">
                      <FaEnvelopeOpen className="text-4xl mx-auto mb-3 opacity-50" />
                      <p>No emails found. Sync your inbox to get started.</p>
                    </div>
                  ) : (
                    inbox.map((email) => (
                      <div 
                        key={email.id} 
                        onClick={() => navigate(`/emails/${email.id}`)}
                        className={`p-5 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border ${getPriorityBorder(email.priority_score)} shadow-sm`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-bold text-lg truncate ${!email.is_read ? 'text-[#009DD1]' : ''}`}>
                            {email.subject || "(No Subject)"}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500">{new Date(email.received_at).toLocaleDateString()}</span>
                            {email.priority_score !== null && (
                               <span className={`font-bold ${getPriorityColor(email.priority_score)}`}>
                                 {email.priority_score}
                               </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 truncate">
                          {email.sender}
                        </p>
                        {email.summary && (
                          <p className="text-sm bg-cyan-50 dark:bg-cyan-900/10 p-3 rounded-xl border border-cyan-100 dark:border-cyan-900/30 text-slate-700 dark:text-slate-300">
                            {email.summary}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {email.category && (
                             <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border dark:border-slate-700">
                               {email.category}
                             </span>
                          )}
                          {email.classification && (
                             <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                               {email.classification}
                             </span>
                          )}
                          {email.action_items && (
                             <span className="text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-semibold flex items-center gap-1">
                               <FaTasks /> Action Required
                             </span>
                          )}
                          {email.deadline && (
                             <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold flex items-center gap-1">
                               <FaCalendarAlt /> {new Date(email.deadline).toLocaleDateString()}
                             </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={`${card} rounded-3xl p-8 shadow-sm h-fit`}>
                <h2 className="text-2xl font-bold mb-6">AI Insights</h2>

                <div className="space-y-4">
                  {stats.recruiter_emails > 0 && (
                     <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30">
                       <FaBriefcase className="inline mr-3 text-purple-500" />
                       <span className="font-medium text-slate-700 dark:text-slate-300">
                         {stats.recruiter_emails} recruiter email(s) detected
                       </span>
                     </div>
                  )}
                  {stats.upcoming_deadlines > 0 && (
                     <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                       <FaClock className="inline mr-3 text-green-500" />
                       <span className="font-medium text-slate-700 dark:text-slate-300">
                         {stats.upcoming_deadlines} upcoming deadline(s)
                       </span>
                     </div>
                  )}
                  {stats.spam_emails > 0 && (
                     <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                       <FaExclamationTriangle className="inline mr-3 text-orange-500" />
                       <span className="font-medium text-slate-700 dark:text-slate-300">
                         {stats.spam_emails} spam/phishing email(s) caught
                       </span>
                     </div>
                  )}
                  {stats.pending_action_items > 0 && (
                     <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                       <FaTasks className="inline mr-3 text-red-500" />
                       <span className="font-medium text-slate-700 dark:text-slate-300">
                         {stats.pending_action_items} email(s) require your action
                       </span>
                     </div>
                  )}
                  
                  {stats.total_emails > 0 && (
                     <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                       <FaChartLine className="inline mr-3 text-blue-500" />
                       <span className="font-medium text-slate-700 dark:text-slate-300">
                         Average AI Priority Score: <strong>{stats.average_priority.toFixed(1)}</strong>
                       </span>
                     </div>
                  )}
                  
                  {stats.total_emails === 0 && (
                    <div className="text-center text-slate-500 py-4">
                       No insights yet. Sync your inbox to generate AI insights.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}

      </main>
    </div>
  );
}
