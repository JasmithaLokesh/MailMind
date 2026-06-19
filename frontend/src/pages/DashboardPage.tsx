import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
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
  FaSun
} from "react-icons/fa";

import api from "../services/api";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const sessionId = localStorage.getItem("session_id");

      if (!sessionId) {
        navigate("/login");
        return;
      }

      try {
        await api.get(`/api/auth/validate-session?session_id=${sessionId}`);
      } catch {
        localStorage.removeItem("session_id");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    validateSession();
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const initials =
    user?.full_name?.split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase() || "U";

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

  const card =
    theme === "dark"
      ? "bg-[#1E293B] border border-cyan-500/20"
      : "bg-[#F8FAFC] border border-[#97E7F5] shadow-md";

  return (
    <div className={`${theme==="dark"?"bg-[#0F172A] text-white":"bg-white text-[#0F172A]"} min-h-screen flex`}>
      <Sidebar />

      <main className="flex-1 p-8 lg:p-10">

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
              w-14
              h-14
              rounded-2xl
              border
              border-[#97E7F5]
              bg-white
              dark:bg-slate-800
              flex
              items-center
              justify-center
              shadow-sm
              hover:shadow-md
              hover:scale-105
              transition-all
              duration-300
              "
            >

              {theme === "light" ? (
                <FaMoon
                  size={22}
                  className="text-[#009DD1]"
                />
              ) : (
                <FaSun
                  size={22}
                  className="text-[#7ED348]"
                />
              )}

            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-12 h-12 rounded-full bg-[#009DD1] text-white font-bold"
              >
                {initials}
              </button>

              {showProfile && (
                <div className={`${card} absolute right-0 mt-3 w-80 rounded-2xl p-5 z-50`}>
                  <div className="flex items-center gap-3 border-b pb-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#009DD1] flex items-center justify-center text-white font-bold">
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.full_name}</h3>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </div>

                  <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-500/10">
                    <FaUser /> Profile
                  </button>

                  <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-cyan-500/10">
                    <FaEnvelope /> Account Details
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-red-400"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-8 mb-8 bg-gradient-to-r from-[#009DD1] via-[#97E7F5] to-[#7ED348] text-[#0F172A]">
          <h2 className="text-3xl font-bold mb-2">MailMind Intelligence Hub</h2>
          <p>
            Priority emails, action items, deadlines and AI insights in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className={`${card} rounded-3xl p-6`}><FaEnvelope className="text-[#009DD1] text-2xl mb-4"/><p>Important Emails</p><h3 className="text-4xl font-bold">23</h3></div>
          <div className={`${card} rounded-3xl p-6`}><FaCalendarAlt className="text-[#7ED348] text-2xl mb-4"/><p>Deadlines</p><h3 className="text-4xl font-bold">4</h3></div>
          <div className={`${card} rounded-3xl p-6`}><FaTasks className="text-[#97E7F5] text-2xl mb-4"/><p>Action Items</p><h3 className="text-4xl font-bold">9</h3></div>
          <div className={`${card} rounded-3xl p-6`}><FaBolt className="text-[#009DD1] text-2xl mb-4"/><p>Priority Score</p><h3 className="text-4xl font-bold">87%</h3></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className={`${card} rounded-3xl p-8 lg:col-span-2`}>
            <h2 className="text-2xl font-bold mb-6">AI Priority Inbox</h2>

            <div className="space-y-4">
              {["Google Interview Round 2","Amazon Assessment","Internship Application"].map((mail)=>(
                <div key={mail} className="p-5 rounded-2xl border border-[#009DD1]/20">
                  <p className="font-semibold">{mail}</p>
                  <p className="text-red-400 text-sm">Action Required</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${card} rounded-3xl p-8`}>
            <h2 className="text-2xl font-bold mb-6">AI Insights</h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#009DD1]/10"><FaRobot className="inline mr-2 text-[#009DD1]" />3 recruiter emails detected</div>
              <div className="p-4 rounded-xl bg-[#7ED348]/10"><FaClock className="inline mr-2 text-[#7ED348]" />Deadline due tomorrow</div>
              <div className="p-4 rounded-xl bg-[#97E7F5]/10"><FaChartLine className="inline mr-2 text-[#97E7F5]" />Priority trend increasing</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <button className="rounded-2xl p-5 bg-[#009DD1] text-white">View Emails</button>
          <button className="rounded-2xl p-5 bg-[#97E7F5] text-[#0F172A]">Review Deadlines</button>
          <button className="rounded-2xl p-5 bg-[#7ED348] text-[#0F172A]">AI Summary</button>
          <button className="rounded-2xl p-5 bg-[#1E293B] text-white">Open Gmail</button>
        </div>
      </main>
    </div>
  );
}
