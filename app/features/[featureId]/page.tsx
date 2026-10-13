import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { platformFeatures } from "@/lib/feature-registry";

export function generateStaticParams() {
  return platformFeatures
    .filter((feature) => !feature.specificationAvailable)
    .map((feature) => ({ featureId: `feature-${feature.number}` }));
}

export default async function PendingFeaturePage({
  params,
}: {
  params: Promise<{ featureId: string }>;
}) {
  const { featureId } = await params;
  const match = /^feature-(\d+)$/.exec(featureId);
  const number = match ? Number(match[1]) : NaN;
  const feature = platformFeatures.find((item) => item.number === number && !item.specificationAvailable);

  if (!feature) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Link href="/features" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Feature directory
      </Link>
      <section className="rounded-3xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-elevated)] sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-warm)] bg-[var(--surface-rose)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-flowering-chestnut)]">
          <CircleHelp className="h-4 w-4" aria-hidden="true" /> Specification required
        </span>
        <h1 className="mt-5 font-display-serif text-3xl font-bold text-[var(--heading-primary)]">Feature {number}</h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
          The supplied 31-feature tracker marks this feature name and scope as “EXACT ORIGINAL FEATURE NAME TO CONFIRM” and says not to guess. This page keeps the feature reachable while its approved content and functionality await the original specification.
        </p>
        <p className="mt-4 rounded-xl border border-[var(--border-panel)] bg-[var(--bg-surface-secondary)]/35 p-4 text-sm leading-relaxed text-[var(--text-primary)]">
          Implementation status: page structure available; feature content, interactions, and data connections are pending source confirmation.
        </p>
      </section>
    </article>
  );
}
