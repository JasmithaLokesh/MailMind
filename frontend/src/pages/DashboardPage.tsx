import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [showProfile, setShowProfile] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-10">

        {/* Header */}

        <div className="flex justify-between items-start mb-10">

          <div>

            <h1 className="text-4xl font-bold mb-2">
              Welcome {user.full_name || "User"} 👋
            </h1>

            <p className="text-slate-400">
              Here's your MailMind dashboard.
            </p>

          </div>

          {/* Profile Menu */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfile(
                  !showProfile
                )
              }
              className="bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl hover:border-violet-500 transition"
            >
              My Profile
            </button>

            {showProfile && (

              <div className="absolute right-0 mt-3 w-72 bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-xl z-50">

                <div className="border-b border-slate-700 pb-4 mb-4">

                  <h3 className="font-semibold text-lg">
                    {user.full_name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {user.email}
                  </p>

                </div>

                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Profile
                </button>

                <button
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition"
                >
                  Account Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-slate-800 transition"
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">
              Important Emails
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">
              Deadlines
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">
              Interviews
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}