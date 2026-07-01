import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaArrowLeft,
  FaSave
} from "react-icons/fa";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [user, setUser] = useState<{ full_name: string; email: string }>({
    full_name: "User",
    email: "user@example.com"
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.full_name) setUser((prev) => ({ ...prev, full_name: u.full_name }));
        if (u.email) setUser((prev) => ({ ...prev, email: u.email }));
      } catch (e) {
        console.error("Error parsing user details", e);
      }
    }
  }, []);

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
                <FaUser className="text-[#009DD1]" /> Profile & Account Details
              </h1>
              <p className="text-slate-500 mt-2">Manage your personal information and account connections.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Account Settings */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Personal Information
              </h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#009DD1] to-[#7ED348] p-1">
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-4xl font-bold">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{user.full_name || 'User'}</h3>
                  <p className="text-slate-500">{user.email || 'user@example.com'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Display Name</label>
                  <input type="text" value={user.full_name} onChange={(e) => setUser({...user, full_name: e.target.value})} className="w-full p-3 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009DD1]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Email Address</label>
                  <input type="email" disabled value={user.email} className="w-full p-3 rounded-xl border dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
              <button className="mt-6 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#009DD1] hover:bg-[#008ac0] text-white font-bold transition-colors">
                <FaSave /> Save Changes
              </button>
            </section>

            {/* Password & Security */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Password & Security
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009DD1]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl border dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#009DD1]" />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold transition-colors">
                  Change Password
                </button>
              </div>
            </section>

            {/* Connected Accounts */}
            <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Connected Email Accounts
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Google</h4>
                      <p className="text-sm text-slate-500">{user.email || 'user@example.com'}</p>
                    </div>
                  </div>
                  <button className="text-red-500 font-semibold hover:underline">Disconnect</button>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
