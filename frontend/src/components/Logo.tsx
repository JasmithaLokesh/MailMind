export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
        relative
        w-12
        h-12
        rounded-2xl
        bg-gradient-to-br
        from-[#009DD1]
        via-[#97E7F5]
        to-[#7ED348]
        flex
        items-center
        justify-center
        shadow-lg
        shadow-cyan-200/40
        dark:shadow-cyan-900/30
        overflow-hidden
        "
      >

        <div
          className="
          absolute
          inset-0
          bg-white/10
          backdrop-blur-sm
          "
        />

        <span
          className="
          relative
          text-white
          font-extrabold
          text-lg
          "
        >
          M
        </span>

      </div>

      <div>

        <h1
          className="
          text-2xl
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
          text-xs
          font-medium
          text-slate-500
          dark:text-slate-400
          tracking-wide
          "
        >
          AI Email Copilot
        </p>

      </div>

    </div>
  );
}