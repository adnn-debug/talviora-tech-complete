"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  Route,
  RefreshCw,
  Award,
} from "lucide-react";

interface StoredAssessment {
  success: true;
  provider: string;
  persisted: boolean;
  persistenceMessage: string;
  targetRole: string;
  readinessScore: number;
  strongPillars: string[];
  growthPillars: string[];
  prioritySkills: string[];
  recommendedProjects: string[];
  nextSprintFocus: string;
  executiveSummary: string;
}

export default function ResultsPage() {
  const [result, setResult] = useState<StoredAssessment | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("talviora-last-assessment");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Partial<StoredAssessment>;
          if (
            parsed.success === true &&
            typeof parsed.provider === "string" &&
            typeof parsed.readinessScore === "number" &&
            Number.isFinite(parsed.readinessScore) &&
            parsed.readinessScore >= 0 &&
            parsed.readinessScore <= 100 &&
            Array.isArray(parsed.strongPillars) &&
            Array.isArray(parsed.growthPillars) &&
            Array.isArray(parsed.prioritySkills) &&
            Array.isArray(parsed.recommendedProjects) &&
            typeof parsed.executiveSummary === "string"
          ) {
            setResult(parsed as StoredAssessment);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
        <h1 className="font-display-serif text-3xl font-bold text-[var(--heading-primary)]">No completed assessment result yet</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Complete the diagnostic assessment to discover your strengths and recommended focus topics.
        </p>
        <Link href="/assessment" className="btn-burgundy mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
          Start Assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const readiness = result.readinessScore;
  const strongPillars = result.strongPillars;
  const growthPillars = result.growthPillars;
  const prioritySkills = result.prioritySkills;
  const recommendedProjects = result.recommendedProjects;
  const executiveSummary = result.executiveSummary;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-burgundy)]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Diagnostic Knowledge Report
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
            Diagnostic Assessment Results
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Learner-selected target role:{" "}
            <strong className="text-[var(--color-burgundy)] font-bold">{result.targetRole}</strong>
          </p>
        </div>

        <Link
          href="/assessment"
          className="btn-secondary-coffee px-3.5 py-2 text-xs flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Diagnostic</span>
        </Link>
      </div>

      {/* Hero Score Box */}
      <div className="card-coffee p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]/80">
            Diagnostic Knowledge Score
          </span>
          <div className="font-display-serif text-5xl sm:text-6xl text-[var(--color-burgundy)]">
            {readiness} <span className="text-2xl text-[var(--color-burgundy)]/70 font-sans">/ 100</span>
          </div>
          <p className="text-xs text-[var(--color-burgundy)]/85 max-w-md font-medium">
            This score reflects your conceptual understanding and code reasoning on this quiz. It is an educational indicator to help guide your study journey.
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[var(--color-burgundy)]">
            <span>Diagnostic Mastery</span>
            <span className="text-[var(--color-burgundy)] font-bold">{readiness}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[var(--color-creme-latte)] overflow-hidden border border-[rgba(var(--color-burgundy-rgb),0.12)]">
            <div
              className="h-full rounded-full bg-[var(--color-burgundy)] transition-all duration-700"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--color-dusty-rose)] font-semibold block text-right">
            Calculated from your submitted responses
          </span>
        </div>
      </div>

      {/* What This Score Measures (and What It Does Not) */}
      <div className="card-coffee p-6 space-y-4 bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.18)]">
        <div className="flex items-center gap-2 pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <Award className="w-4 h-4 text-[var(--color-burgundy)]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
            Transparency: What This Score Measures (and What It Does Not)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1.5">
            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>What This Measures</span>
            </span>
            <p className="text-[11px] text-[var(--color-burgundy)]/90 leading-relaxed font-medium">
              Grasp of core engineering principles (client/server boundaries, embeddings, vector indexing), code reading and debugging ability (race conditions, async promises), and reasoning on architectural trade-offs under traffic pressure.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1.5">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>What It Does NOT Measure</span>
            </span>
            <p className="text-[11px] text-[var(--color-burgundy)]/90 leading-relaxed font-medium">
              This score does <strong>NOT label you as job-ready</strong> or guarantee hiring outcomes. It cannot evaluate day-to-day team communication, production reliability, Git collaboration, or complex multi-file engineering. Real readiness requires building verified projects.
            </p>
          </div>
        </div>
      </div>

      {/* Gemini Executive Summary */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)] space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--color-burgundy)]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
            Diagnostic Analysis · {result.provider}
          </span>
        </div>
        <p className="text-sm text-[var(--color-burgundy)] leading-relaxed font-normal">
          {executiveSummary}
        </p>
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]" role="status">{result.persistenceMessage}</p>
      </div>

      {/* Two Columns: Strengths vs Blind Spots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Pillars */}
        <div className="card-coffee p-6 space-y-4 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
            <CheckCircle2 className="w-4 h-4 text-[var(--color-burgundy)]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Evaluated Strengths
            </h2>
          </div>
          <div className="space-y-2">
            {strongPillars.map((p: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-xs font-medium text-[var(--color-burgundy)]"
              >
                ✓ {p}
              </div>
            ))}
          </div>
        </div>

        {/* Growth Pillars */}
        <div className="card-coffee p-6 space-y-4 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
          <div className="flex items-center gap-2 pb-3 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
            <AlertCircle className="w-4 h-4 text-[var(--color-dusty-rose)]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Priority Growth Pillars
            </h2>
          </div>
          <div className="space-y-2">
            {growthPillars.map((p: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs font-medium text-[var(--color-burgundy)]"
              >
                ! {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Projects & Next Steps */}
      <div className="card-coffee p-6 space-y-4 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
          Recommended Proof-of-Work Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedProjects.map((proj: string, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)] bg-[var(--color-warm-ivory)] space-y-2 shadow-xs"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-burgundy)]">
                <FolderGit2 className="w-4 h-4 text-[var(--color-dusty-rose)]" />
                <span>{proj}</span>
              </div>
              <p className="text-[11px] text-[var(--color-burgundy)]/80 font-normal">
                Production blueprint covering required technologies, vector indexing, and unit tests.
              </p>
              <Link
                href="/projects"
                className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline inline-flex items-center gap-1 pt-1"
              >
                View Architecture Blueprint →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <Link
          href="/skill-gap"
          className="btn-secondary-coffee px-5 py-2.5 text-xs font-semibold"
        >
          Inspect Detailed Skill Gap Matrix
        </Link>
        <Link
          href="/roadmap"
          className="btn-burgundy px-6 py-2.5 text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <span>Activate Personalized Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
