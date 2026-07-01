import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaCog,
  FaArrowLeft,
  FaRobot,
  FaSync,
  FaBell,
  FaShieldAlt
} from "react-icons/fa";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("user");
    navigate("/login");
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
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-10 border-b dark:border-slate-700 pb-6">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <FaCog className="text-slate-500" /> Settings
              </h1>
              <p className="text-slate-500 mt-2">Customize your MailMind experience and AI preferences.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Preferences */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Appearance</h2>
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-bold text-lg">Theme</h3>
                  <p className="text-slate-500 text-sm mt-1">Toggle between light and dark mode</p>
                </div>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-slate-600" />}
                  <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </section>

            {/* AI Settings */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaRobot className="text-[#009DD1]" /> AI Preferences
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Automatic Summarization</h3>
                    <p className="text-slate-500 text-sm mt-1">Automatically summarize incoming long emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#009DD1]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Smart Replies</h3>
                    <p className="text-slate-500 text-sm mt-1">Suggest replies based on context</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#009DD1]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Spam Protection Level</h3>
                    <p className="text-slate-500 text-sm mt-1">How aggressively should AI filter promotions and spam?</p>
                  </div>
                  <select className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none">
                    <option>Standard</option>
                    <option>Strict</option>
                    <option>Relaxed</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Sync Settings */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaSync className="text-[#7ED348]" /> Sync & Data
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Background Sync</h3>
                    <p className="text-slate-500 text-sm mt-1">Keep inbox up to date automatically</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7ED348]"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Sync Interval</h3>
                    <p className="text-slate-500 text-sm mt-1">How often MailMind fetches new emails</p>
                  </div>
                  <select className="px-4 py-2 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none">
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Manual only</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaBell className="text-purple-500" /> Notifications
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Important Emails</h3>
                    <p className="text-slate-500 text-sm mt-1">Get notified for High Priority emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">Upcoming Deadlines</h3>
                    <p className="text-slate-500 text-sm mt-1">Alert me about deadlines 24h before</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              </div>
            </section>

            <section className="pt-4 pb-12">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors shadow-lg shadow-red-500/30"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
