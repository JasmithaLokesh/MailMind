import { Link } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";
import Logo from "../components/Logo";

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-[#009DD1]/10 flex items-center justify-center text-[#009DD1]">
              <FaShieldAlt size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>

          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Last Updated: June 23, 2026
          </p>

          <div className="space-y-8 prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By registering for, accessing, or using MailMind (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the Service. MailMind is owned and operated by MailMind Inc.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
              <p>
                MailMind is an AI-powered email assistant that analyzes, summarizes, and categorizes inbox data, extracts deadlines, and monitors key interactions (such as interview pipelines) for the user. We support integrations with major email providers including Google, Microsoft, and Yahoo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. User Credentials & Accounts</h2>
              <p>
                You are responsible for safeguarding your credentials and any actions taken under your account. MailMind uses standard encryption for client payload transactions and handles session tokens securely. You agree not to share access credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Intellectual Property</h2>
              <p>
                MailMind and its original content, features, and functionality remain the exclusive property of MailMind Inc. and its licensors. Our intelligence algorithms, dashboard interface, and assets are protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Disclaimer of Warranty</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. MailMind makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of summaries, deadline detection, or categorization.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Limitation of Liability</h2>
              <p>
                In no event shall MailMind Inc. be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service, including email server issues or data skews.
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
