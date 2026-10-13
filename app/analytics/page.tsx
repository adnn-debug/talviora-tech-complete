"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChartNoAxesCombined,
  ArrowRight,
  BookOpen,
  Code2,
  BrainCircuit,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  FolderGit2,
  Compass,
} from "lucide-react";
import { loadSavedJourney, PersonalisedJourney } from "@/lib/personalised-journey";

export default function AnalyticsPage() {
  const [journey, setSavedJourney] = useState<PersonalisedJourney | null>(null);
  const [diagnosticScore, setDiagnosticScore] = useState<number | null>(null);

  useEffect(() => {
    const saved = loadSavedJourney();
    if (saved) setSavedJourney(saved);

    try {
      const storedAssessment = localStorage.getItem("talviora_assessment_result");
      if (storedAssessment) {
        const parsed = JSON.parse(storedAssessment);
        if (typeof parsed?.percentage === "number") {
          setDiagnosticScore(parsed.percentage);
        }
      }
    } catch {}
  }, []);

  const completedCount = journey?.completedTopicIds?.length ?? 0;
  const studyTarget = journey?.dailyStudyMinutes ? `${journey.dailyStudyMinutes} min/day` : "30 min/day";
  const fieldName = journey?.fieldName ?? "Getting Started";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <header className="border-b border-[rgba(var(--color-burgundy-rgb),0.15)] pb-6 space-y-2">
        <div className="flex items-center gap-2 text-[var(--color-burgundy)]">
          <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
            <ChartNoAxesCombined className="h-4 w-4 text-[var(--color-burgundy)]" aria-hidden="true" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
            My Learning • Progress Dashboard
          </span>
        </div>
        <h1 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
          Your Learning Progress & Milestones
        </h1>
        <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--color-burgundy)]/85 font-normal">
          Track what you have completed, study targets, and milestone achievements in one simple view. Learn at your own pace without artificial competition or pressure.
        </p>
      </header>

      {/* Overview Stat Cards */}
      <section aria-label="Learning metrics summary" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[var(--color-burgundy)]/75">
            <span className="text-[11px] font-bold uppercase tracking-wider">Completed Topics</span>
            <CheckCircle2 className="w-4 h-4 text-[var(--color-burgundy)]" />
          </div>
          <div className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
            {completedCount}
          </div>
          <p className="text-[11px] text-[var(--color-burgundy)]/70">
            {completedCount > 0 ? "Saved in your journey" : "No topics completed yet"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[var(--color-burgundy)]/75">
            <span className="text-[11px] font-bold uppercase tracking-wider">Daily Study Target</span>
            <Clock className="w-4 h-4 text-[var(--color-burgundy)]" />
          </div>
          <div className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
            {studyTarget}
          </div>
          <p className="text-[11px] text-[var(--color-burgundy)]/70">
            {journey ? `Goal: ${journey.goalLabel}` : "Based on default 30m pace"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[var(--color-burgundy)]/75">
            <span className="text-[11px] font-bold uppercase tracking-wider">Diagnostic Score</span>
            <BrainCircuit className="w-4 h-4 text-[var(--color-burgundy)]" />
          </div>
          <div className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
            {diagnosticScore !== null ? `${diagnosticScore}%` : "—"}
          </div>
          <p className="text-[11px] text-[var(--color-burgundy)]/70">
            {diagnosticScore !== null ? "From Check What You Know" : "Take diagnostic assessment"}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-[var(--color-burgundy)]/75">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Track</span>
            <Target className="w-4 h-4 text-[var(--color-burgundy)]" />
          </div>
          <div className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)] truncate" title={fieldName}>
            {fieldName}
          </div>
          <p className="text-[11px] text-[var(--color-burgundy)]/70">
            {journey ? journey.difficultyLevel : "New learner"}
          </p>
        </div>
      </section>

      {/* Helpful Empty State & Guidance Card */}
      {completedCount === 0 && (
        <section
          className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-gradient-to-br from-[var(--color-creme-latte)] via-[var(--color-warm-ivory)] to-[var(--surface-rose)] p-8 sm:p-10 shadow-xs space-y-6"
          aria-labelledby="analytics-empty-heading"
        >
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[11px] font-bold text-[var(--color-burgundy)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
              <span>You are at the beginning of your journey</span>
            </div>
            <h2 id="analytics-empty-heading" className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
              Ready to record your very first learning step?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
              Every step you take in TALVIORA—reading a guided tutorial, running code in the sandbox, checking what you know, or completing a project milestone—will automatically record here. You don&apos;t need previous experience to get started.
            </p>
          </div>

          {/* 4 Recommended Next Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] inline-flex">
                  <BrainCircuit className="w-4 h-4" />
                </span>
                <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                  Check What You Know
                </h3>
                <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                  Take a short 5-minute diagnostic to find your starting point.
                </p>
              </div>
              <Link
                href="/assessment"
                className="btn-burgundy px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
              >
                <span>Take Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] inline-flex">
                  <BookOpen className="w-4 h-4" />
                </span>
                <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                  Learning Studio
                </h3>
                <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                  Read simple explanations with real-world analogies and live examples.
                </p>
              </div>
              <Link
                href="/learning"
                className="btn-burgundy px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
              >
                <span>Start Lesson 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] inline-flex">
                  <Code2 className="w-4 h-4" />
                </span>
                <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                  Interactive Practice
                </h3>
                <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                  Follow the 8-step lesson sequence and run real code safely.
                </p>
              </div>
              <Link
                href="/simulator"
                className="btn-burgundy px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
              >
                <span>Practise Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] inline-flex">
                  <Layers className="w-4 h-4" />
                </span>
                <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                  Explore Catalogue
                </h3>
                <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                  Browse 30 technology fields and choose what excites you most.
                </p>
              </div>
              <Link
                href="/catalogue"
                className="btn-burgundy px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between"
              >
                <span>Browse Fields</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Honest Privacy & Transparency Notice */}
      <footer className="p-4 rounded-2xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-xs text-[var(--color-burgundy)]/85 leading-relaxed font-normal flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[var(--color-burgundy)] shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-[var(--color-burgundy)]">Transparent Progress Philosophy:</strong>{" "}
          TALVIORA tracks your personal learning journey without fake streaks, gamified penalties, or unverified peer rankings. Your study records and topic completions are stored in your private browser session and can be updated at any time.
        </div>
      </footer>
    </div>
  );
}
