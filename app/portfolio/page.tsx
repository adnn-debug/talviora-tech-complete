"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Award, Check, Code2, ExternalLink, Share2 } from "lucide-react";

interface PublicPortfolio {
  slug: string;
  publicUrl: string;
  note: string;
  candidate: {
    name: string;
    targetRole: string;
    bio: string | null;
    skills: Record<string, number>;
    verifiedBadges: string[];
    featuredProjects: { id: string; title: string }[];
  };
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) {
      setErrorMessage("No public portfolio was selected. Sign in, save a public slug in your profile, then open that slug here.");
      setLoading(false);
      return;
    }

    fetch(`/api/portfolio?slug=${encodeURIComponent(slug)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data?.error || "Could not load this portfolio.");
        setPortfolio(data);
      })
      .catch((error: unknown) => {
        setErrorMessage(error instanceof Error ? error.message : "Could not load this portfolio.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCopyLink = async () => {
    if (!portfolio) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${portfolio.publicUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setErrorMessage("Clipboard access is unavailable. Copy the portfolio URL from the address bar.");
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-4xl animate-pulse rounded-3xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-10 text-sm text-[var(--text-secondary)]" role="status">Loading public portfolio…</div>;
  }

  if (!portfolio) {
    return (
      <section className="mx-auto max-w-3xl rounded-3xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-card)] sm:p-10">
        <div className="flex items-center gap-3 text-[var(--color-flowering-chestnut)]"><AlertCircle className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-wider">Portfolio unavailable</span></div>
        <h1 className="mt-4 font-display-serif text-3xl font-bold text-[var(--heading-primary)]">No public portfolio to show</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{errorMessage}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/profile" className="btn-burgundy inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">Open profile settings <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/auth" className="rounded-xl border border-[var(--border-panel)] px-4 py-2.5 text-sm font-semibold text-[var(--color-burgundy)]">Sign in</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-col justify-between gap-4 border-b border-[var(--border-panel)] pb-5 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--surface-rose)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]"><Award className="h-4 w-4" /> Public profile</span>
          <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Portfolio & proof of work</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Only fields allowed by the public-profile database policy are shown.</p>
        </div>
        <button type="button" onClick={handleCopyLink} className="btn-burgundy inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"><Share2 className="h-4 w-4" />{copied ? "Link copied" : "Share profile"}</button>
      </header>

      {errorMessage && <p className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-3 text-xs text-[var(--text-primary)]" role="status">{errorMessage}</p>}

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-cocoa-sand)]">{portfolio.candidate.targetRole || "Target role not selected"}</p>
        <h2 className="mt-2 font-display-serif text-3xl font-bold text-[var(--heading-secondary)]">{portfolio.candidate.name || "Learner"}</h2>
        {portfolio.candidate.bio && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">{portfolio.candidate.bio}</p>}
      </section>

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="flex items-center gap-2"><Code2 className="h-4 w-4 text-[var(--color-burgundy)]" /><h2 className="font-display-serif text-xl font-bold text-[var(--heading-secondary)]">Self-reported skills</h2></div>
        {Object.keys(portfolio.candidate.skills).length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {Object.entries(portfolio.candidate.skills).map(([skill, score]) => <li key={skill} className="rounded-full border border-[var(--border-accent)] bg-[var(--surface-rose)] px-3 py-1.5 text-xs font-semibold text-[var(--color-burgundy)]">{skill} · {score}%</li>)}
          </ul>
        ) : <p className="mt-3 text-sm text-[var(--text-secondary)]">No skills have been shared on this profile.</p>}
      </section>

      <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8">
        <h2 className="font-display-serif text-xl font-bold text-[var(--heading-secondary)]">Projects and credentials</h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">This project does not yet have saved, independently verified portfolio-project or credential records. No badges are presented as verified.</p>
        <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-burgundy)] hover:underline">Explore project workspace <ExternalLink className="h-4 w-4" /></Link>
      </section>
    </div>
  );
}
