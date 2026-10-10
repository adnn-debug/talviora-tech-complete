import { ShieldCheck, Heart } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
          Terms of Service & Free Learning Principle
        </h1>
        <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1">
          Effective October 2026 • TALVIORA TECH Core Principles
        </p>
      </div>

      <div className="card-coffee p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 leading-relaxed font-sans-ui">
        <div className="p-4 rounded-2xl bg-[#96977A]/15 border border-[#96977A]/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#96977A]">
            <Heart className="w-4 h-4" />
            <span>The Completely Free Learning Principle</span>
          </div>
          <p>
            TALVIORA TECH is committed to providing its learning ecosystem, skill assessments, roadmaps, project briefs, and career tools free of charge. We do not introduce subscription paywalls, paid-feature locks, or hidden tiers.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">1. Platform Access & Fair Use</h2>
          <p>
            All users are granted unrestricted access to learn, test, and build with our platform tools. Fair-use rate limits are in place solely to prevent automated denial-of-service abuse against AI evaluation endpoints.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">2. External Services & Third-Party APIs</h2>
          <p>
            Where external third-party models (e.g. Gemini API, Supabase) provide hosting or compute, free tier allowances are leveraged. Any limits imposed by external vendors are disclosed transparently.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">3. Accuracy & Educational Honesty</h2>
          <p>
            Career metrics, salary percentiles, and assessment results are estimates synthesized from public tech market indices. TALVIORA TECH does not make guaranteed job offers or unwarranted salary claims.
          </p>
        </section>
      </div>
    </div>
  );
}
