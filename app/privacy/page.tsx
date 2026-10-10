import { ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
          Privacy Policy & Learner Data Protections
        </h1>
        <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1">
          Zero-Ad Guarantee • Strict Data Minimization
        </p>
      </div>

      <div className="card-coffee p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 leading-relaxed font-sans-ui">
        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">1. Data Minimization</h2>
          <p>
            We collect only the essential information needed to personalize your roadmap and save assessment results (name, email, target role, and self-assessed skill levels). We do not track or sell learner data to third-party ad brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">2. Secure Cloud Storage with Supabase</h2>
          <p>
            Candidate profiles and session tokens are safeguarded using industry-standard PostgreSQL Row-Level Security (RLS) on Supabase with encrypted transport over HTTPS/TLS 1.3.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">3. AI Prompt Privacy</h2>
          <p>
            Prompts submitted to Google Gemini for assessment and interview critique are strictly scoped to technical evaluation and are not retained to train public commercial models.
          </p>
        </section>
      </div>
    </div>
  );
}
