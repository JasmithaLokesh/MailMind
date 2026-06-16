export default function Sidebar() {

  return (

    <aside className="w-64 bg-slate-900 p-6 border-r border-slate-800">

      <h1 className="text-3xl font-bold text-violet-400 mb-10">
        MailMind
      </h1>

      <nav className="space-y-4">

        <button className="block w-full text-left hover:text-violet-400">
          Dashboard
        </button>

        <button className="block w-full text-left hover:text-violet-400">
          Emails
        </button>

        <button className="block w-full text-left hover:text-violet-400">
          Deadlines
        </button>

        <button className="block w-full text-left hover:text-violet-400">
          Settings
        </button>

      </nav>

    </aside>

  );
}