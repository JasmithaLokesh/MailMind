export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg">
          M
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">
          MailMind
        </h1>

        <p className="text-xs text-slate-400">
          AI Email Copilot
        </p>
      </div>
    </div>
  );
}