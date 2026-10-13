import Link from "next/link";
import { Activity, ArrowRight, ChartNoAxesCombined } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="border-b border-[var(--border-panel)] pb-5">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><ChartNoAxesCombined className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Learning activity</span></div>
        <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Learning analytics</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Personal study time, streaks, and peer comparisons need recorded activity and a sourced cohort dataset.</p>
      </header>

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8" aria-labelledby="analytics-empty">
        <Activity className="h-6 w-6 text-[var(--color-burgundy)]" aria-hidden="true" />
        <h2 id="analytics-empty" className="mt-3 font-display-serif text-xl font-bold text-[var(--heading-secondary)]">No activity history is available</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">This project does not currently record time spent, learning streaks, or cohort rankings. Once activity tracking is connected, this page can summarize your own saved records. Cohort comparisons also require a disclosed, sourced dataset.</p>
        <Link href="/learning" className="btn-burgundy mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">Explore learning studio <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
