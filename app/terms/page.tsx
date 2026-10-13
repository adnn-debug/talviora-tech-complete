import { ShieldCheck, Heart } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[var(--color-creme-latte)]">
        <h1 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
          Service Terms & Limitations
        </h1>
        <p className="text-xs text-[var(--color-burgundy)]/80 mt-1">
          Service information · Updated October 12, 2026
        </p>
      </div>

      <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[var(--color-burgundy)]/80 leading-relaxed border border-[var(--color-creme-latte)] shadow-xs">
        <div className="p-4 rounded-2xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)]/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-[var(--color-burgundy)]">
            <Heart className="w-4 h-4 text-[var(--color-burgundy)]" />
            <span>Preview service status</span>
          </div>
          <p className="text-[var(--color-burgundy)]/85">
            This source project has no subscription or payment flow. Third-party models, services, courses, exams, and external resources may have their own limits or costs; verify their terms before use.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)]">1. Platform Access & Fair Use</h2>
          <p>
            Features can be unavailable when account or AI services are not configured. This project does not implement a service-level guarantee, rate-limit policy, or guaranteed uptime.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)]">2. External Services & Third-Party APIs</h2>
          <p>
            Account storage uses Supabase when configured. AI feedback sends the submitted prompt to Google Gemini when configured. Review those providers' current terms and privacy policies before sending personal information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)]">3. Educational Honesty & Verification</h2>
          <p>
            Assessment feedback summarizes quiz responses and is not an independently validated skill credential, hiring prediction, or job offer. This project does not display sourced salary or live job-market data.
          </p>
        </section>
      </div>
    </div>
  );
}
