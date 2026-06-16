import {
  FaHome,
  FaEnvelope,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 p-6 border-r border-slate-800">

      <h1 className="text-3xl font-bold text-cyan-500 mb-10">
        MailMind
      </h1>

      <nav className="space-y-2">

        <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-800 transition">
          <FaHome />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-800 transition">
          <FaEnvelope />
          Emails
        </button>

        <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-800 transition">
          <FaCalendarAlt />
          Deadlines
        </button>

        <button className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-slate-800 transition">
          <FaCog />
          Settings
        </button>

      </nav>

    </aside>
  );
}