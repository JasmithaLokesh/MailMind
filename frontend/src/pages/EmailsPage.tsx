import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSpinner,
  FaEnvelopeOpen,
  FaEnvelope,
  FaCalendarAlt,
  FaTasks,
  FaArrowLeft
} from "react-icons/fa";

import api from "../services/api";
import { getPriorityInbox } from "../services/emailService";
import type { Email } from "../services/emailService";

export default function EmailsPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<Email[]>([]);
  const [total, setTotal] = useState(0);
  
  const [page, setPage] = useState(0);
  const limit = 20;

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("priority");

  const fetchEmails = async () => {
    setLoading(true);
    const sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      navigate("/login");
      return;
    }
    
    try {
      const offset = page * limit;
      const data = await getPriorityInbox(sessionId, limit, offset, {
        search: search || undefined,
        category: category || undefined,
        priority: priority || undefined,
        sort_by: sort,
      });
      setEmails(data.emails);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [page, category, priority, sort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchEmails();
  };

  const getPriorityColor = (score: number | null) => {
    if (score === null) return "text-gray-400";
    if (score >= 80) return "text-red-500";
    if (score >= 50) return "text-yellow-500";
    return "text-green-500";
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={`${theme==="dark"?"bg-[#0F172A] text-white":"bg-white text-[#0F172A]"} min-h-screen flex`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main
        className="
        flex-1
        px-6
        py-8
        lg:px-8
        lg:py-10
        transition-all
        duration-300
        h-screen
        overflow-y-auto
        "
      >
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-2 text-[#009DD1] hover:text-[#7ED348] font-medium mb-6 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Emails</h1>
          <div className="text-slate-500 font-medium">{total} total emails</div>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 min-w-[250px] relative">
            <input 
              type="text" 
              placeholder="Search by subject, sender, category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#009DD1] transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          <select 
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(0); }}
            className="px-4 py-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="PRIMARY">Primary</option>
            <option value="PROMOTIONS">Promotions</option>
            <option value="UPDATES">Updates</option>
          </select>

          <select 
            value={priority}
            onChange={(e) => { setPriority(e.target.value); setPage(0); }}
            className="px-4 py-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority (80+)</option>
            <option value="medium">Medium Priority (50-79)</option>
            <option value="low">Low Priority (&lt;50)</option>
          </select>

          <select 
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(0); }}
            className="px-4 py-3 rounded-xl border dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
          >
            <option value="priority">Sort by Priority</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        {/* EMAIL LIST */}
        <div
          className="
          w-full
          bg-slate-50
          dark:bg-slate-800
          rounded-2xl
          border
          dark:border-slate-700
          overflow-hidden
          shadow-sm
          "
          >
          {loading ? (
            <div className="flex justify-center items-center h-64">
               <FaSpinner className="animate-spin text-4xl text-[#009DD1]" />
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
               <FaEnvelopeOpen className="text-5xl mx-auto mb-4 opacity-50" />
               <p className="text-xl">No emails found matching your filters.</p>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-700">
              {emails.map((email) => (
                <div 
                  key={email.id}
                  onClick={() => navigate(`/emails/${email.id}`)}
                  className="p-5 hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors flex flex-col md:flex-row items-start gap-6"
                >
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className={`
                        font-bold
                        text-lg
                        truncate
                        w-full
                        ${!email.is_read ? "text-[#009DD1]" : ""}
                        `}
                        >
                        {email.subject || "(No Subject)"}
                      </h3>
                      {!email.is_read && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#009DD1]"></span>
                      )}
                    </div>
                    <p
                      className="
                      text-sm
                      text-slate-600
                      dark:text-slate-400
                      mb-2
                      truncate
                      w-full
                      "
                      >
                      {email.sender}
                    </p>
                    <p
                      className="
                      text-sm
                      text-slate-500
                      dark:text-slate-500
                      truncate
                      w-full
                      "
                      >
                      {email.summary || email.body.substring(0, 100) + '...'}
                    </p>
                  </div>
                  
                  <div
                    className="
                    w-[150px]
                    min-w-[150px]
                    ml-4
                    flex
                    flex-col
                    items-end
                    justify-start
                    gap-3
                    flex-shrink-0
                    "
                    >
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                      {new Date(email.received_at).toLocaleDateString()}
                    </span>

                    {email.priority_score !== null && (
                      <div
                        className={`
                        w-[120px]
                        h-[48px]
                        flex
                        items-center
                        justify-center
                        font-bold
                        rounded-xl
                        bg-slate-200
                        dark:bg-slate-900
                        ${getPriorityColor(email.priority_score)}
                        `}
                        >
                        {email.priority_score} Priority
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-medium">
              Page {page + 1} of {totalPages}
            </span>
            <button 
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
