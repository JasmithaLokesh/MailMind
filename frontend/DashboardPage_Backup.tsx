import {
  useState,
  useEffect
} from "react";
import Sidebar from "../components/Sidebar";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaBell
} from "react-icons/fa";

import api from "../services/api";

export default function DashboardPage() {

  const navigate = useNavigate();

  useEffect(() => {

    const validateSession =
      async () => {

        const sessionId =
          localStorage.getItem(
            "session_id"
          );

        if (!sessionId) {

          navigate("/login");

          return;
        }

        try {

          await api.get(
            `/api/auth/validate-session?session_id=${sessionId}`
          );

        } catch {

          localStorage.removeItem(
            "session_id"
          );

          localStorage.removeItem(
            "user"
          );

          navigate("/login");
        }

      };

    validateSession();

  }, [navigate]);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [showProfile, setShowProfile] =
    useState(false);

  const handleLogout = async () => {

  try {

    const sessionId =
      localStorage.getItem(
        "session_id"
      );

    await api.post(
      "/api/auth/logout",
      {
        session_id: sessionId
      }
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "session_id"
    );

    navigate("/");

  } catch (error) {

    console.error(
      "Logout failed",
      error
    );

  }

};

  const initials =
    user?.full_name
      ?.split(" ")
      .map((name: string) =>
        name.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />

      <main className="flex-1 p-12">

        {/* Header */}

        <div className="flex justify-between items-start mb-12">

          <div>

            <h1 className="text-4xl font-bold mb-2">
              Welcome {user.full_name || "User"} 👋
            </h1>

            <p className="text-slate-400">
              Here's your MailMind dashboard.
            </p>

          </div>

          {/* Avatar */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfile(
                  !showProfile
                )
              }
              className="
                h-12
                w-12
                rounded-full
                bg-cyan-600
                text-white
                font-bold
                flex
                items-center
                justify-center
                hover:bg-cyan-700
                transition
              "
            >
              {initials}
            </button>

            {showProfile && (

              <div
                className="
                absolute
                right-0
                mt-4
                w-80
                bg-slate-900
                border
                border-slate-700
                rounded-2xl
                p-5
                shadow-xl
                z-50
              "
              >

                <div className="border-b border-slate-700 pb-4 mb-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                      h-12
                      w-12
                      rounded-full
                      bg-cyan-600
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                    >
                      {initials}
                    </div>

                    <div>

                      <h3 className="font-semibold text-lg">
                        {user.full_name}
                      </h3>

                      <p className="text-slate-400 text-sm">
                        {user.email}
                      </p>

                    </div>

                  </div>

                </div>

                <button
                  className="
                  flex
                  items-center
                  gap-3
                  w-full
                  px-3
                  py-3
                  rounded-xl
                  hover:bg-slate-800
                  transition
                "
                >
                  <FaUser />
                  Profile
                </button>

                <button
                  className="
                  flex
                  items-center
                  gap-3
                  w-full
                  px-3
                  py-3
                  rounded-xl
                  hover:bg-slate-800
                  transition
                "
                >
                  <FaEnvelope />
                  Account Details
                </button>

                <button
                  onClick={handleLogout}
                  className="
                  flex
                  items-center
                  gap-3
                  w-full
                  px-3
                  py-3
                  rounded-xl
                  text-red-400
                  hover:bg-slate-800
                  transition
                "
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          <div
            className="
            bg-slate-900
            rounded-3xl
            p-8
            hover:-translate-y-1
            transition
          "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Important Emails
              </h2>

              <FaEnvelope
                className="text-cyan-500"
              />

            </div>

            <p className="text-5xl font-bold mt-6">
              0
            </p>

          </div>

          <div
            className="
            bg-slate-900
            rounded-3xl
            p-8
            hover:-translate-y-1
            transition
          "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Deadlines
              </h2>

              <FaCalendarAlt
                className="text-cyan-500"
              />

            </div>

            <p className="text-5xl font-bold mt-6">
              0
            </p>

          </div>

          <div
            className="
            bg-slate-900
            rounded-3xl
            p-8
            hover:-translate-y-1
            transition
          "
          >

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Alerts
              </h2>

              <FaBell
                className="text-cyan-500"
              />

            </div>

            <p className="text-5xl font-bold mt-6">
              0
            </p>

          </div>

        </div>

      </main>

    </div>

  );
}