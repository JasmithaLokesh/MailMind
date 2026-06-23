import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import Logo from "../components/Logo";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 overflow-hidden relative">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#009DD1]/15 blur-[180px] rounded-full" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7ED348]/15 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <Logo />
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-[#009DD1] hover:text-[#7ED348] transition font-semibold"
          >
            <FaArrowLeft /> Back to Signup
          </Link>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#7ED348]/10 flex items-center justify-center text-[#7ED348]">
              <FaLock size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Last Updated: June 23, 2026
          </p>

          <div className="space-y-8 prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p>
                When you access MailMind, we collect profile details (such as email, name, and profile pictures) provided through third-party sign-ins (Google, Microsoft Graph, and Yahoo OAuth) or traditional registration fields.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Email Access & Analysis</h2>
              <p>
                To provide email summarization and deadline features, MailMind requests scope permissions to access and index headers, email text content, and attachments from your inbox. This data is transmitted securely and analyzed on protected servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Data Security & Encryption</h2>
              <p>
                We use AES-256 encryption keys to encrypt payload transactions between your browser and our API. Hashed passwords and secure session tokens are saved in PostgreSQL to safeguard user identity information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Cookies and Local Storage</h2>
              <p>
                We store the user profile and session key (`session_id`) in your browser's local storage to enable persistent session validation and prevent dashboard crashes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Third-Party Integrations</h2>
              <p>
                Our service connects directly to Google OAuth APIs, Microsoft Azure endpoints, and Yahoo Developer services to authenticate and synchronize emails. You may revoke these authorization permissions at any time through your respective provider dashboards.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} MailMind. All rights reserved.
        </div>
      </div>
    </div>
  );
}
