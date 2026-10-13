import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import { skillGapsList } from "@/lib/career-data";

export default function SkillGapPage() {
  return (
    <div className="space-y-6">
      <header className="border-b border-[var(--border-panel)] pb-5">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><Layers className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Find What You Need to Learn</span></div>
        <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Find What You Need to Learn</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">Discover the exact concepts, libraries, and tools you should focus on next based on your career interests.</p>
      </header>

      <aside className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-4 text-sm leading-relaxed text-[var(--text-primary)]">
        <strong className="text-[var(--color-burgundy)]">No personal gap report is available.</strong> Complete an assessment to request feedback based on your submitted answers.
        <Link href="/assessment" className="ml-2 inline-flex items-center gap-1 font-semibold text-[var(--color-burgundy)] hover:underline">Assessment <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
      </aside>

      <div className="grid gap-4 lg:grid-cols-2">
        {skillGapsList.map((item) => (
          <article key={item.skill} className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cocoa-sand)]">Example · {item.category}</p>
            <h2 className="mt-2 font-display-serif text-lg font-bold text-[var(--heading-secondary)]">{item.skill}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{item.actionableStep}</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-[var(--text-muted)]"><BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-burgundy)]" aria-hidden="true" /><span>Related topic: {item.recommendedResource}</span></p>
            <Link href={`/sprint-planner?task=${encodeURIComponent(item.actionableStep)}`} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-burgundy)] hover:underline">Plan this practice task <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
    </div>
  );
}
