"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Copy, FileText } from "lucide-react";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const keywords = useMemo(() => keywordsInput.split(/[\n,]/).map((item) => item.trim()).filter(Boolean), [keywordsInput]);
  const normalizedText = resumeText.toLocaleLowerCase();
  const present = keywords.filter((keyword) => normalizedText.includes(keyword.toLocaleLowerCase()));
  const missing = keywords.filter((keyword) => !normalizedText.includes(keyword.toLocaleLowerCase()));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resumeText);
      setCopied(true);
      setCopyError("");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setCopyError("Clipboard access is unavailable. Select and copy the text manually.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="border-b border-[var(--border-panel)] pb-5">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><FileText className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Resume workspace</span></div>
        <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Resume editor and keyword check</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">Edit your own text and check for terms you provide. This page does not connect to applicant tracking systems, score hiring fit, or invent achievements or metrics.</p>
      </header>

      <aside className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-4 text-sm leading-relaxed text-[var(--text-primary)]" role="note">
        <strong className="text-[var(--color-burgundy)]">Keep every claim accurate.</strong> This editor makes no automatic changes and does not save resume text to an account.
      </aside>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,0.8fr)]">
        <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]" aria-labelledby="resume-text-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 id="resume-text-heading" className="font-semibold text-[var(--heading-secondary)]">Resume text</h2>
            <button type="button" onClick={() => void handleCopy()} disabled={!resumeText} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-panel)] px-3 py-2 text-xs font-semibold text-[var(--color-burgundy)] disabled:opacity-50">{copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}{copied ? "Copied" : "Copy"}</button>
          </div>
          <textarea aria-label="Resume text" rows={18} value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="Paste or write your resume text here. Use only accurate experience and results." className="w-full resize-y rounded-xl border border-[var(--border-panel)] bg-[var(--bg-page)] p-4 text-sm leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]" />
          {copyError && <p className="mt-2 text-xs text-[var(--text-secondary)]" role="status">{copyError}</p>}
          <p className="mt-2 text-xs text-[var(--text-muted)]">{resumeText.length} characters · {resumeText.split("\n").filter((line) => line.trim()).length} non-empty lines</p>
        </section>

        <section className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]" aria-labelledby="keyword-heading">
          <h2 id="keyword-heading" className="font-semibold text-[var(--heading-secondary)]">Your keyword list</h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">Enter terms separated by commas or new lines. Matching is case-insensitive text search only.</p>
          <textarea aria-label="Keywords to look for" rows={6} value={keywordsInput} onChange={(event) => setKeywordsInput(event.target.value)} placeholder="Example: Python, PostgreSQL, system design" className="mt-3 w-full rounded-xl border border-[var(--border-panel)] bg-[var(--bg-page)] p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]" />
          {keywords.length > 0 ? <div className="mt-4 space-y-3" aria-live="polite">
            <div><h3 className="text-xs font-bold text-[var(--color-burgundy)]">Found in text ({present.length})</h3><p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{present.length ? present.join(", ") : "No listed terms found yet."}</p></div>
            <div><h3 className="text-xs font-bold text-[var(--color-burgundy)]">Not found ({missing.length})</h3><p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{missing.length ? missing.join(", ") : "All listed terms appear in the text."}</p></div>
          </div> : <div className="mt-4 rounded-xl border border-dashed border-[var(--border-panel)] p-4 text-xs text-[var(--text-secondary)]"><AlertCircle className="mb-2 h-4 w-4 text-[var(--color-burgundy)]" aria-hidden="true" />Add terms to see exact text matches. This is not an ATS compatibility score.</div>}
        </section>
      </div>
    </div>
  );
}
