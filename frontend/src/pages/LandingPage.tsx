import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between px-10 py-6">
        <Logo />

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-slate-700 rounded-lg hover:border-violet-500 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 bg-violet-600 rounded-lg hover:bg-violet-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-32 px-6">
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
          AI Powered Email Intelligence
        </div>

        <h1 className="text-6xl font-bold max-w-5xl leading-tight">
          Never Miss Important Emails Again
        </h1>

        <p className="mt-8 text-xl text-slate-400 max-w-3xl">
          MailMind automatically scans Gmail, Outlook,
          and Yahoo Mail to detect interviews,
          internships, deadlines, assignments,
          meetings and important actions.
        </p>

        <div className="flex gap-4 mt-10">
          <Link
            to="/signup"
            className="px-8 py-4 bg-violet-600 rounded-xl text-lg font-semibold hover:bg-violet-700 transition"
          >
            Get Started
          </Link>

          <a href="#features" className="px-8 py-4 border border-slate-700 rounded-xl text-lg hover:border-violet-500 transition">
            Learn More
          </a>
        </div>
      </section>

      <section
  id="features"
  className="py-32 px-10 bg-slate-900"
>
  <h2 className="text-4xl font-bold text-center mb-16">
    Features
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-slate-800 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">
        Smart Detection
      </h3>
      <p className="text-slate-400">
        Automatically identifies important emails.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">
        Deadline Tracking
      </h3>
      <p className="text-slate-400">
        Never miss assignments and deadlines.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">
        Interview Alerts
      </h3>
      <p className="text-slate-400">
        Get notified about interview invitations.
      </p>
    </div>

    <div className="bg-slate-800 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold mb-4">
        AI Summaries
      </h3>
      <p className="text-slate-400">
        Understand emails instantly with AI.
      </p>
    </div>

  </div>
</section>

<section className="py-32 px-10">

  <h2 className="text-4xl font-bold text-center mb-16">
    How It Works
  </h2>

  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

    <div className="text-center">
      <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        1
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Connect Email
      </h3>

      <p className="text-slate-400">
        Connect Gmail, Outlook or Yahoo Mail securely.
      </p>
    </div>

    <div className="text-center">
      <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        2
      </div>

      <h3 className="text-xl font-semibold mb-3">
        AI Analysis
      </h3>

      <p className="text-slate-400">
        AI scans emails and extracts important actions.
      </p>
    </div>

    <div className="text-center">
      <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        3
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Smart Dashboard
      </h3>

      <p className="text-slate-400">
        View deadlines, interviews and tasks in one place.
      </p>
    </div>

  </div>

</section>

<footer className="border-t border-slate-800 py-10 text-center text-slate-400">

  <h3 className="text-white text-xl font-semibold mb-2">
    MailMind
  </h3>

  <p>
    AI Email Copilot
  </p>

  <p className="mt-4 text-sm">
    © 2025 MailMind. All rights reserved.
  </p>

</footer>

    </div>
  );
}