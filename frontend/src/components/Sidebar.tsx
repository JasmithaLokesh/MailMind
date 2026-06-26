import {
  FaHome,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
  FaRobot,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
      ${isOpen ? "w-72 px-6 border-r absolute md:relative z-50 shadow-2xl md:shadow-none" : "w-20 px-3 border-r relative"}
      min-h-screen
      flex
      flex-col
      justify-between

      bg-[#F8FAFC]
      dark:bg-[#1E293B]

      border-[#E2E8F0]
      dark:border-slate-700

      py-8

      transition-all
      duration-300
      `}
    >
      {/* TOP SECTION */}
      <div>
        {/* LOGO & TOGGLE */}
        <div className="mb-12">
          <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
            <img
              src="https://res.cloudinary.com/dvkhfi2zh/image/upload/v1782463879/MailMind_Logo_wbislf.png"
              alt="MailMind Logo"
              className="
                h-14
                w-14
                object-contain
                drop-shadow-lg
                select-none
                transition-transform
                duration-300
                hover:scale-105
              "
              draggable={false}
            />

            {isOpen && (
              <button
                type="button"
                onClick={onToggle}
                className="
                p-2
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                hover:border-[#97E7F5]
                text-[#009DD1]
                hover:bg-[#97E7F5]/10
                transition-all
                duration-200
                "
                title="Collapse Sidebar"
              >
                <FaChevronLeft size={16} />
              </button>
            )}
          </div>

          {!isOpen && (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={onToggle}
                className="
                p-2
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                hover:border-[#97E7F5]
                text-[#009DD1]
                hover:bg-[#97E7F5]/10
                transition-all
                duration-200
                flex
                items-center
                justify-center
                "
                title="Expand Sidebar"
              >
                <FaChevronRight size={16} />
              </button>
            </div>
          )}

          {isOpen && (
            <div>
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
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-3">
          {/* DASHBOARD */}
          <button
            className={`
            flex
            items-center
            ${isOpen ? "gap-4 w-full px-5 py-4" : "justify-center w-12 h-12 mx-auto"}
            rounded-2xl
            bg-gradient-to-r
            from-[#009DD1]
            to-[#7ED348]
            text-white
            font-semibold
            shadow-lg
            `}
            title="Dashboard"
          >
            <FaHome className="text-xl shrink-0" />
            {isOpen && <span>Dashboard</span>}
          </button>

          {/* EMAILS */}
          <button
            className={`
            flex
            items-center
            ${isOpen ? "gap-4 w-full px-5 py-4" : "justify-center w-12 h-12 mx-auto"}
            rounded-2xl
            text-[#0F172A]
            dark:text-white
            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10
            transition
            duration-200
            `}
            title="Emails"
          >
            <FaEnvelope className="text-[#009DD1] text-xl shrink-0" />
            {isOpen && <span>Emails</span>}
          </button>

          {/* DEADLINES */}
          <button
            className={`
            flex
            items-center
            ${isOpen ? "gap-4 w-full px-5 py-4" : "justify-center w-12 h-12 mx-auto"}
            rounded-2xl
            text-[#0F172A]
            dark:text-white
            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10
            transition
            duration-200
            `}
            title="Deadlines"
          >
            <FaCalendarAlt className="text-[#7ED348] text-xl shrink-0" />
            {isOpen && <span>Deadlines</span>}
          </button>

          {/* AI INSIGHTS */}
          <button
            className={`
            flex
            items-center
            ${isOpen ? "gap-4 w-full px-5 py-4" : "justify-center w-12 h-12 mx-auto"}
            rounded-2xl
            text-[#0F172A]
            dark:text-white
            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10
            transition
            duration-200
            `}
            title="AI Insights"
          >
            <FaRobot className="text-[#009DD1] text-xl shrink-0" />
            {isOpen && <span>AI Insights</span>}
          </button>

          {/* SETTINGS */}
          <button
            className={`
            flex
            items-center
            ${isOpen ? "gap-4 w-full px-5 py-4" : "justify-center w-12 h-12 mx-auto"}
            rounded-2xl
            text-[#0F172A]
            dark:text-white
            hover:bg-[#97E7F5]/30
            dark:hover:bg-[#97E7F5]/10
            transition
            duration-200
            `}
            title="Settings"
          >
            <FaCog className="text-slate-500 text-xl shrink-0" />
            {isOpen && <span>Settings</span>}
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
          {isOpen ? (
            <>
              <p className="text-sm text-[#64748B] dark:text-slate-400">
                AI Engine Status
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#7ED348] animate-pulse" />
                <span className="text-sm font-semibold text-[#7ED348]">
                  Active
                </span>
              </div>
            </>
          ) : (
            <div className="flex justify-center" title="AI Engine: Active">
              <div className="h-2.5 w-2.5 rounded-full bg-[#7ED348] animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}