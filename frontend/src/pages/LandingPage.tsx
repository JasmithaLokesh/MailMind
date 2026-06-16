import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">

        <Logo />

        <div className="flex gap-4">

          <Link
            to="/login"
            className="
            px-5
            py-2.5
            border
            border-slate-700
            rounded-xl
            hover:border-cyan-500
            transition
          "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
            px-5
            py-2.5
            bg-cyan-600
            rounded-xl
            hover:bg-cyan-700
            transition
          "
          >
            Sign Up
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        pt-24
        pb-32
        text-center
      "
      >

        <div
          className="
          inline-block
          bg-cyan-500/10
          border
          border-cyan-500/20
          rounded-full
          px-5
          py-2
          mb-8
          text-cyan-300
        "
        >
          AI Powered Email Intelligence
        </div>

        <h1
          className="
          text-6xl
          md:text-7xl
          font-bold
          max-w-4xl
          mx-auto
          leading-tight
        "
        >
          Never Miss Important Emails Again
        </h1>

        <p
          className="
          mt-8
          text-xl
          text-slate-400
          max-w-2xl
          mx-auto
          leading-relaxed
        "
        >
          MailMind automatically scans Gmail,
          Outlook and Yahoo Mail to detect
          interviews, internships, deadlines,
          meetings and important actions.
        </p>

        <div
          className="
          flex
          justify-center
          gap-5
          mt-12
        "
        >

          <Link
            to="/signup"
            className="
            px-8
            py-4
            bg-cyan-600
            rounded-xl
            text-lg
            font-semibold
            hover:bg-cyan-700
            transition
          "
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="
            px-8
            py-4
            border
            border-slate-700
            rounded-xl
            text-lg
            hover:border-cyan-500
            transition
          "
          >
            Learn More
          </a>

        </div>

      </section>

      {/* Features */}

      <section
        id="features"
        className="
        max-w-7xl
        mx-auto
        px-6
        py-28
      "
      >

        <h2 className="text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-900 p-8 rounded-3xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Smart Detection
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Automatically identifies important emails.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Deadline Tracking
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Never miss assignments and deadlines.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Interview Alerts
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Get notified about interview invitations.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              AI Summaries
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Understand emails instantly with AI.
            </p>
          </div>

        </div>

      </section>

      {/* How It Works */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        py-28
      "
      >

        <h2 className="text-4xl font-bold text-center mb-20">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <div className="text-center">

            <div
              className="
              w-16
              h-16
              bg-cyan-600
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-6
              text-2xl
              font-bold
            "
            >
              1
            </div>

            <h3 className="text-xl font-semibold mb-4">
              Connect Email
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Connect Gmail, Outlook or Yahoo Mail securely.
            </p>

          </div>

          <div className="text-center">

            <div
              className="
              w-16
              h-16
              bg-cyan-600
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-6
              text-2xl
              font-bold
            "
            >
              2
            </div>

            <h3 className="text-xl font-semibold mb-4">
              AI Analysis
            </h3>

            <p className="text-slate-400 leading-relaxed">
              AI scans emails and extracts important actions.
            </p>

          </div>

          <div className="text-center">

            <div
              className="
              w-16
              h-16
              bg-cyan-600
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-6
              text-2xl
              font-bold
            "
            >
              3
            </div>

            <h3 className="text-xl font-semibold mb-4">
              Smart Dashboard
            </h3>

            <p className="text-slate-400 leading-relaxed">
              View deadlines, interviews and tasks in one place.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer
        className="
        border-t
        border-slate-800
        py-12
        text-center
        text-slate-400
        mt-10
      "
      >

        <h3 className="text-white text-xl font-semibold mb-2">
          MailMind
        </h3>

        <p>AI Email Copilot</p>

        <p className="mt-4 text-sm">
          © 2025 MailMind. All rights reserved.
        </p>

      </footer>

    </div>
  );
}