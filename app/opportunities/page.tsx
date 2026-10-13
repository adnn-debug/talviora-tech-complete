import { BriefcaseBusiness, CalendarClock } from "lucide-react";

export default function OpportunitiesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="border-b border-[var(--border-panel)] pb-5">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><BriefcaseBusiness className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Opportunities and resources</span></div>
        <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Current opportunities</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Job, internship, scholarship, and course listings need an official source, current dates, and verified eligibility details.</p>
      </header>

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8" aria-labelledby="opportunities-unavailable">
        <CalendarClock className="h-6 w-6 text-[var(--color-burgundy)]" aria-hidden="true" />
        <h2 id="opportunities-unavailable" className="mt-3 font-display-serif text-xl font-bold text-[var(--heading-secondary)]">No live listings are available</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">An official-source opportunity feed is not connected. There are no current vacancies, deadlines, costs, or eligibility records to show.</p>
      </section>
    </div>
  );
}
