import Link from "next/link";
import { ArrowUpRight, CircleHelp, ListChecks } from "lucide-react";
import { platformFeatures } from "@/lib/feature-registry";

export default function FeatureDirectoryPage() {
  const specifiedCount = platformFeatures.filter((feature) => feature.specificationAvailable).length;

  return (
    <div className="space-y-8">
      <header className="space-y-3 border-b border-[var(--border-panel)] pb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--surface-rose)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
          <ListChecks className="h-4 w-4" aria-hidden="true" /> Platform directory
        </span>
        <h1 className="font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-5xl">31 feature register</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
          The supplied progress tracker names and scopes {specifiedCount} features. It explicitly leaves features 12–18 unconfirmed, so those entries link to a clearly marked page structure until the original specifications are available.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {platformFeatures.map((feature) => (
          <article key={feature.number} className="flex flex-col rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono-code text-xs font-bold text-[var(--color-cocoa-sand)]">FEATURE {String(feature.number).padStart(2, "0")}</span>
              {feature.specificationAvailable ? (
                <span className="rounded-full bg-[var(--surface-rose)] px-2 py-1 text-[10px] font-semibold text-[var(--color-burgundy)]">Scope in tracker</span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-warm)] px-2 py-1 text-[10px] font-semibold text-[var(--color-flowering-chestnut)]"><CircleHelp className="h-3 w-3" /> Source needed</span>
              )}
            </div>
            <h2 className="font-display-serif text-xl font-bold text-[var(--heading-secondary)]">
              {feature.name ?? `Feature ${feature.number} — specification pending`}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {feature.scope ?? "The feature name and scope are marked for confirmation in the supplied tracker. Implementation is pending the original specification."}
            </p>
            <Link href={feature.href} className="mt-5 inline-flex min-h-10 items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-burgundy)] transition hover:bg-[var(--surface-rose)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]">
              {feature.specificationAvailable ? "Open related workspace" : "Open specification page"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
