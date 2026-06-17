import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";

import {
  FaRobot,
  FaClock,
  FaEnvelopeOpenText,
  FaBriefcase,
  FaBolt,
  FaShieldAlt,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div
      className="
      min-h-screen
      bg-white
      dark:bg-slate-950
      text-slate-900
      dark:text-white
      transition-colors
      duration-300
    "
    >
      {/* NAVBAR */}

      <nav
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        py-6
        flex
        items-center
        justify-between
      "
      >
        <Logo />

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link
            to="/login"
            className="
            px-5
            py-2.5
            rounded-xl
            border
            border-[#009DD1]
            text-[#009DD1]
            hover:bg-[#009DD1]
            hover:text-white
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
            rounded-xl
            bg-[#009DD1]
            text-white
            hover:bg-[#0087b4]
            transition
          "
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO */}

<section
  className="
  relative
  overflow-hidden
  max-w-7xl
  mx-auto
  px-6
  lg:px-10
  pt-16
  md:pt-24
  pb-28
  text-center
"
>

  {/* Decorative Blobs */}

  <div
  className="
  absolute
  top-20
  left-10
  w-96
  h-96
  bg-[#009DD1]/35
  blur-[180px]
  rounded-full
  "
/>

  <div
  className="
  absolute
  top-40
  right-10
  w-96
  h-96
  bg-[#7ED348]/40
  blur-[180px]
  rounded-full
  "
/>

  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#97E7F5]/20 blur-[150px] rounded-full" />

  <div className="relative z-10">

    <div
      className="
      inline-flex
      items-center
      gap-2
      px-5
      py-2
      rounded-full
      bg-[#7ED348]/10
      border
      border-[#7ED348]/40
      text-[#7ED348]
      font-semibold
      mb-8
    "
    >
      <FaBolt />
      AI Powered Email Intelligence
    </div>

    <h1
  className="
  text-5xl
  md:text-7xl
  font-bold
  leading-tight
  max-w-5xl
  mx-auto
"
>
  Never Miss

  <span className="text-[#009DD1]">
    {" "}Important Emails{" "}
  </span>

  Again
</h1>

<p
  className="
  mt-6
  text-[#7ED348]
  font-semibold
  tracking-widest
  uppercase
  text-sm
"
>
  Smart • Fast • Actionable
</p>

    <p
      className="
      mt-8
      max-w-3xl
      mx-auto
      text-lg
      md:text-xl
      leading-relaxed
      text-slate-600
      dark:text-slate-300
    "
    >
      MailMind intelligently analyzes emails,
      extracts deadlines, identifies opportunities,
      summarizes conversations and highlights
      actions you need to take.
    </p>

    <div
      className="
      flex
      flex-col
      sm:flex-row
      justify-center
      gap-4
      mt-12
    "
    >

      <Link
        to="/signup"
        className="
        px-8
        py-4
        rounded-xl
        bg-[#009DD1]
        text-white
        font-semibold
        hover:scale-105
        transition
        "
      >
        Get Started Free
      </Link>

      <a
        href="#features"
        className="
        px-8
        py-4
        rounded-xl
        border
        border-[#009DD1]
        text-[#009DD1]
        hover:bg-[#009DD1]
        hover:text-white
        transition
        "
      >
        Learn More
      </a>

    </div>

    {/* Stats */}

    <div
      className="
      grid
      md:grid-cols-3
      gap-6
      mt-20
    "
    >

      <div className="p-8 rounded-3xl bg-[#97E7F5]/20 border border-[#97E7F5]">
        <h3 className="text-4xl font-bold text-[#009DD1]">
          24/7
        </h3>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Continuous monitoring of incoming emails.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#7ED348]/10 border border-[#7ED348]/40">
        <h3 className="text-4xl font-bold text-[#7ED348]">
          AI
        </h3>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Smart analysis and deadline extraction.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-[#009DD1]/10 border border-[#009DD1]/40">
        <h3 className="text-4xl font-bold text-[#009DD1]">
          Zero
        </h3>

        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Missed opportunities and deadlines.
        </p>
      </div>

    </div>

  </div>

</section>

      {/* FEATURES */}

      <section
        id="features"
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        py-24
      "
      >
        <h2
          className="
          text-4xl
          md:text-5xl
          font-bold
          text-center
          mb-4
        "
        >
          Powerful Features
        </h2>

        <p
          className="
          text-center
          max-w-3xl
          mx-auto
          text-slate-600
          dark:text-slate-300
          mb-16
        "
        >
          MailMind combines email intelligence, AI analysis,
          deadline tracking and smart notifications into a single
          productivity platform.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <FaEnvelopeOpenText className="text-4xl text-[#009DD1] mb-5" />

            <h3 className="text-xl font-semibold mb-4">
              Smart Detection
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              Automatically identifies internship offers,
              interviews, assignments, meeting invites and
              important announcements.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <FaClock className="text-4xl text-[#7ED348] mb-5" />

            <h3 className="text-xl font-semibold mb-4">
              Deadline Tracking
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              Detects dates and deadlines from emails and keeps
              them organized in one place.
            </p>
          </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <FaBriefcase className="text-4xl text-[#97E7F5] mb-5" />

            <h3 className="text-xl font-semibold mb-4">
              Interview Alerts
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              Instantly highlights recruiter emails,
              interview schedules, assessments and
              hiring opportunities.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <FaRobot className="text-4xl text-[#009DD1] mb-5" />

            <h3 className="text-xl font-semibold mb-4">
              AI Summaries
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              Generate concise summaries of lengthy
              emails so you can understand key points
              within seconds.
            </p>
          </div>

        </div>
      </section>

      {/* WHY MAILMIND */}

      <section
        className="
        py-24
        bg-[#97E7F5]/10
        dark:bg-slate-900/50
      "
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Why MailMind?
          </h2>

          <p
            className="
            text-center
            max-w-3xl
            mx-auto
            text-slate-600
            dark:text-slate-300
            mb-16
          "
          >
            Designed for students, professionals,
            recruiters and freelancers who receive
            hundreds of emails every week.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm">
              <FaBolt className="text-4xl text-[#009DD1] mb-5" />

              <h3 className="text-xl font-semibold mb-4">
                Save Time
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                Stop manually reading every email.
                MailMind highlights what truly matters.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm">
              <FaShieldAlt className="text-4xl text-[#7ED348] mb-5" />

              <h3 className="text-xl font-semibold mb-4">
                Never Miss Opportunities
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                Stay informed about interviews,
                internships and career opportunities.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm">
              <FaChartLine className="text-4xl text-[#009DD1] mb-5" />

              <h3 className="text-xl font-semibold mb-4">
                Boost Productivity
              </h3>

              <p className="text-slate-600 dark:text-slate-300">
                Focus on action items instead of
                spending time sorting through emails.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        py-24
      "
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-[#009DD1] text-white flex items-center justify-center text-xl font-bold mb-6">
              1
            </div>

            <h3 className="text-xl font-semibold mb-4">
              Connect Email
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              Securely connect Gmail, Outlook or Yahoo
              Mail to allow MailMind to analyze incoming
              emails.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-[#97E7F5] text-slate-900 flex items-center justify-center text-xl font-bold mb-6">
              2
            </div>

            <h3 className="text-xl font-semibold mb-4">
              AI Processing
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              AI models classify emails, extract
              deadlines, summarize content and detect
              required actions.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-[#7ED348] text-slate-900 flex items-center justify-center text-xl font-bold mb-6">
              3
            </div>

            <h3 className="text-xl font-semibold mb-4">
              Smart Dashboard
            </h3>

            <p className="text-slate-600 dark:text-slate-300">
              View important emails, deadlines,
              interviews and action items from a
              centralized dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* BENEFITS */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-10
        py-24
      "
      >
        <div className="bg-[#009DD1] rounded-[32px] p-10 md:p-16 text-white">

          <h2 className="text-4xl font-bold mb-10 text-center">
            Everything You Need To Stay On Top Of Emails
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              AI Generated Summaries
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              Deadline Detection
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              Interview Tracking
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              Action Item Extraction
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              Email Prioritization
            </div>

            <div className="flex items-center gap-3">
              <FaCheckCircle />
              Smart Notifications
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}

<footer
  className="
  border-t
  border-slate-200
  dark:border-slate-800
  py-16
  mt-10
"
>

  <div className="max-w-7xl mx-auto px-6">

    <div className="flex justify-center mb-6">
      <Logo />
    </div>

    <p
      className="
      text-center
      text-slate-500
      dark:text-slate-400
      max-w-xl
      mx-auto
    "
    >
      AI-powered email intelligence platform for
      students, professionals, recruiters and
      freelancers.
    </p>

    <div
      className="
      flex
      justify-center
      gap-3
      mt-8
    "
    >
      <div className="w-3 h-3 rounded-full bg-[#009DD1]" />
      <div className="w-3 h-3 rounded-full bg-[#97E7F5]" />
      <div className="w-3 h-3 rounded-full bg-[#7ED348]" />
    </div>

    <p
      className="
      mt-8
      text-center
      text-sm
      text-slate-500
      dark:text-slate-400
    "
    >
      © 2026 MailMind. All rights reserved.
    </p>

  </div>

</footer>

    </div>
  );
}