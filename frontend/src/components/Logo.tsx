export default function Logo() {
  return (
    <div className="flex items-center gap-3">

      {/* MailMind Logo */}

      <img
        src="https://res.cloudinary.com/dvkhfi2zh/image/upload/v1782463879/MailMind_Logo_wbislf.png"
        alt="MailMind Logo"
        className="
          w-14
          h-14
          object-contain
          drop-shadow-lg
          select-none
        "
        draggable={false}
      />

      {/* Text */}

      <div>

        <h1
          className="
            text-2xl
            font-extrabold
            tracking-tight
            leading-none
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
            text-xs
            font-semibold
            tracking-wide
            text-slate-500
            dark:text-slate-400
          "
        >
          AI Email Copilot
        </p>

      </div>

    </div>
  );
}