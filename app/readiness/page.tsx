import Link from "next/link";
import { ArrowRight, Gauge, ShieldCheck } from "lucide-react";

export default function ReadinessPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="border-b border-[var(--border-panel)] pb-5">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><Gauge className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Assessment results</span></div>
        <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Career readiness</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">A readiness summary is shown after a completed assessment has been evaluated and saved.</p>
      </header>

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8" aria-labelledby="empty-readiness">
        <div className="flex items-start gap-4">
          <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[var(--color-burgundy)]" aria-hidden="true" />
          <div>
            <h2 id="empty-readiness" className="font-display-serif text-xl font-bold text-[var(--heading-secondary)]">No evaluated result yet</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">This workspace has no saved assessment data. Start an assessment to request feedback. AI evaluation requires a configured provider, and saving results requires a signed-in account with database access.</p>
            <Link href="/assessment" className="btn-burgundy mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">Start assessment <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
