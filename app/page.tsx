import Link from "next/link";
import { Activity, ArrowRight, BookOpenCheck, BrainCircuit, BriefcaseBusiness, CircleUserRound, ClipboardList } from "lucide-react";

const workspaceAreas = [
  { title: "Assessment", description: "Complete an assessment to request an AI-generated skills review.", href: "/assessment", icon: BrainCircuit },
  { title: "Learning plan", description: "Browse the roadmap and learning materials available in this preview workspace.", href: "/roadmap", icon: BookOpenCheck },
  { title: "Practice", description: "Try interview and project exercises. Example feedback is not hiring advice.", href: "/simulator", icon: ClipboardList },
  { title: "Career tools", description: "Explore role examples and market pages with their source status clearly shown.", href: "/career-match", icon: BriefcaseBusiness },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="border-b border-[var(--border-panel)] pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-burgundy)]">Learner workspace</p>
        <h1 className="mt-2 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Your career workspace</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
          This workspace does not have learner history yet. Complete activities while signed in to configured services to save personal results.
        </p>
      </header>

      <section aria-labelledby="workspace-status" className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><Activity className="h-5 w-5" aria-hidden="true" /><h2 id="workspace-status" className="font-display-serif text-xl font-bold">Workspace status</h2></div>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">No saved assessment, learning activity, or career match is available to summarize.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/auth" className="btn-burgundy inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href="/features" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-panel)] px-4 py-2.5 text-sm font-semibold text-[var(--color-burgundy)]">Browse features</Link>
          <Link href="/profile" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-panel)] px-4 py-2.5 text-sm font-semibold text-[var(--color-burgundy)]"><CircleUserRound className="h-4 w-4" aria-hidden="true" /> Profile settings</Link>
        </div>
      </section>

      <section aria-labelledby="workspace-areas">
        <h2 id="workspace-areas" className="mb-4 font-display-serif text-xl font-bold text-[var(--heading-primary)]">Explore the workspace</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {workspaceAreas.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="group rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--border-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]">
              <Icon className="h-5 w-5 text-[var(--color-burgundy)]" aria-hidden="true" />
              <h3 className="mt-3 font-semibold text-[var(--heading-secondary)]">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-burgundy)]">Open <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
