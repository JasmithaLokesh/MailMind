import {
  FaHome,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
  FaRobot
} from "react-icons/fa";

export default function Sidebar() {
  return (

    <aside
      className="
      w-72
      min-h-screen
      flex
      flex-col
      justify-between

      bg-[#F8FAFC]
      dark:bg-[#1E293B]

      border-r
      border-[#E2E8F0]
      dark:border-slate-700

      px-6
      py-8

      transition-all
      duration-300
      "
    >

      {/* TOP SECTION */}

      <div>

        {/* LOGO */}

        <div className="mb-12">

          <div
            className="
            h-16
            w-16

            rounded-2xl

            bg-gradient-to-br
            from-[#009DD1]
            via-[#97E7F5]
            to-[#7ED348]

            flex
            items-center
            justify-center

            text-white
            text-3xl
            font-extrabold

            shadow-lg
            "
          >
            M
          </div>

          <h1
            className="
            mt-5
            text-4xl
            font-extrabold
            tracking-tight
            "
          >
            <span className="text-[#009DD1]">
              Mail
            </span>

            <span className="text-[#7ED348]">
              Mind
            </span>
          </h1>

          <p
            className="
            mt-1
            text-sm

            text-[#64748B]
            dark:text-slate-400
            "
          >
            AI Email Copilot
          </p>

        </div>

        {/* NAVIGATION */}

        <nav className="space-y-3">

          {/* DASHBOARD */}

          <button
            className="
            flex
            items-center
            gap-4

            w-full

            px-5
            py-4

            rounded-2xl

            bg-gradient-to-r
            from-[#009DD1]
            to-[#7ED348]

            text-white
            font-semibold

            shadow-lg
            "
          >
            <FaHome />
            Dashboard
          </button>

          {/* EMAILS */}

          <button
            className="
            flex
            items-center
            gap-4

            w-full

            px-5
            py-4

            rounded-2xl

            text-[#0F172A]
            dark:text-white

            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10

            transition
            duration-200
            "
          >
            <FaEnvelope className="text-[#009DD1]" />
            Emails
          </button>

          {/* DEADLINES */}

          <button
            className="
            flex
            items-center
            gap-4

            w-full

            px-5
            py-4

            rounded-2xl

            text-[#0F172A]
            dark:text-white

            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10

            transition
            duration-200
            "
          >
            <FaCalendarAlt className="text-[#7ED348]" />
            Deadlines
          </button>

          {/* AI INSIGHTS */}

          <button
            className="
            flex
            items-center
            gap-4

            w-full

            px-5
            py-4

            rounded-2xl

            text-[#0F172A]
            dark:text-white

            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10

            transition
            duration-200
            "
          >
            <FaRobot className="text-[#009DD1]" />
            AI Insights
          </button>

          {/* SETTINGS */}

          <button
            className="
            flex
            items-center
            gap-4

            w-full

            px-5
            py-4

            rounded-2xl

            text-[#0F172A]
            dark:text-white

            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10

            transition
            duration-200
            "
          >
            <FaCog className="text-slate-500" />
            Settings
          </button>

        </nav>

      </div>

      {/* FOOTER */}

      <div>

        <div
          className="
          border-t
          border-[#E2E8F0]
          dark:border-slate-700

          pt-5
          "
        >

          <p
            className="
            text-sm

            text-[#64748B]
            dark:text-slate-400
            "
          >
            AI Engine Status
          </p>

          <div
            className="
            mt-3
            flex
            items-center
            gap-2
            "
          >

            <div
              className="
              h-2.5
              w-2.5
              rounded-full

              bg-[#7ED348]

              animate-pulse
              "
            />

            <span
              className="
              text-sm
              font-semibold

              text-[#7ED348]
              "
            >
              Active
            </span>

          </div>

        </div>

      </div>

    </aside>

  );
}