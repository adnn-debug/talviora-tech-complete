"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Route,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  KanbanSquare,
} from "lucide-react";
import { roadmapPhasesList } from "@/lib/career-data";
import { RoadmapPhase } from "@/lib/types";
import PythonRoadmapBuilder from "@/components/PythonRoadmapBuilder";

export default function RoadmapPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>(() => roadmapPhasesList.map((phase) => ({
    ...phase,
    modules: phase.modules.map((module) => ({ ...module, completed: false })),
  })));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("talviora_roadmap_progress");
      if (saved) {
        const completedIds: string[] = JSON.parse(saved);
        if (Array.isArray(completedIds)) {
          setPhases((prev) =>
            prev.map((phase) => ({
              ...phase,
              modules: phase.modules.map((m) => ({
                ...m,
                completed: completedIds.includes(m.id),
              })),
            }))
          );
        }
      }
    } catch (e) {
      console.warn("Failed to load roadmap progress", e);
    }
  }, []);

  const toggleModule = (phaseIdx: number, modId: string) => {
    setPhases((prev) => {
      const updated = [...prev];
      const targetPhase = { ...updated[phaseIdx] };
      targetPhase.modules = targetPhase.modules.map((m) =>
        m.id === modId ? { ...m, completed: !m.completed } : m
      );
      updated[phaseIdx] = targetPhase;
      try {
        const completedIds = updated.flatMap((p) => p.modules).filter((m) => m.completed).map((m) => m.id);
        localStorage.setItem("talviora_roadmap_progress", JSON.stringify(completedIds));
      } catch (e) {
        console.warn("Failed to persist roadmap progress", e);
      }
      return updated;
    });
  };

  const allModules = phases.flatMap((p) => p.modules);
  const completedCount = allModules.filter((m) => m.completed).length;
  const totalCount = allModules.length;
  const overallPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
              <Route className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Your Step-by-Step Plan • Learning Roadmap
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
            Your Step-by-Step Plan
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Follow a structured pathway tailored to your study hours. Each step clearly shows what to learn first.
          </p>
        </div>

        <Link
          href="/sprint-planner"
          className="btn-burgundy px-4 py-2 text-xs font-semibold flex items-center gap-2 shadow-xs"
        >
          <KanbanSquare className="w-4 h-4" />
          <span>Sprint Kanban</span>
        </Link>
      </div>

      <PythonRoadmapBuilder />

      {/* Progress Bar Card */}
      <div className="bg-[var(--color-warm-ivory)] rounded-2xl border border-[var(--color-creme-latte)] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
            Your checklist progress (this browser)
          </span>
          <div className="font-display-serif text-2xl font-bold text-[var(--color-burgundy)]">
            {completedCount} of {totalCount} Modules Completed ({overallPct}%)
          </div>
          <p className="text-xs text-[var(--color-burgundy)]/80">
            Mark checkpoints as you complete them. Nothing here is pre-completed or synced to your account.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="w-full h-3 rounded-full bg-[var(--color-creme-latte)] overflow-hidden border border-[var(--color-dusty-rose)]/20">
            <div
              className="h-full rounded-full bg-[var(--color-burgundy)] transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--color-burgundy)]/70 block text-right font-medium">
            Suggested curriculum time estimates
          </span>
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-6">
        {phases.map((phase, pIdx) => {
          const isPhaseDone = phase.modules.length > 0 && phase.modules.every((module) => module.completed);
          const isPhaseActive = phase.modules.some((module) => module.completed) && !isPhaseDone;
          const phaseStatus = isPhaseDone ? "Complete" : isPhaseActive ? "Started" : "Not started";

          return (
            <div
              key={phase.phaseNumber}
              className={`bg-[var(--color-warm-ivory)] rounded-2xl p-6 shadow-xs transition-all ${
                isPhaseActive
                  ? "border-2 border-[var(--color-burgundy)] ring-2 ring-[var(--color-burgundy)]/10"
                  : "border border-[var(--color-creme-latte)]"
              }`}
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--color-creme-latte)]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isPhaseDone
                        ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)] font-bold"
                        : isPhaseActive
                        ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                        : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]/80"
                    }`}
                  >
                    {isPhaseDone ? "✓" : `P${phase.phaseNumber}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                        {phase.durationWeeks} • {phase.estimatedHours} Hours
                      </span>
                    </div>
                    <h2 className="font-display-serif text-base sm:text-lg font-bold text-[var(--color-burgundy)]">
                      Phase {phase.phaseNumber}: {phase.phaseTitle}
                    </h2>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isPhaseDone
                      ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/40"
                      : isPhaseActive
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                      : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]/80 border border-[var(--color-dusty-rose)]/20"
                  }`}
                >
                  {phaseStatus}
                </span>
              </div>

              {/* Module Checkpoints List */}
              <div className="mt-4 space-y-2.5">
                {phase.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      mod.completed
                        ? "bg-[var(--surface-rose)]/40 border-[var(--color-dusty-rose)]/40 text-[var(--color-burgundy)]"
                        : "bg-[var(--color-warm-ivory)]/40 border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)]/70"
                    }`}
                  >
                    {/* Interactive Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleModule(pIdx, mod.id)}
                      aria-pressed={mod.completed}
                      className="mt-0.5 text-[var(--color-dusty-rose)] hover:text-[var(--color-burgundy)] transition cursor-pointer"
                      aria-label={`Toggle module ${mod.title}`}
                    >
                      {mod.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-burgundy)]" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            mod.completed
                              ? "line-through text-[var(--color-burgundy)]/50"
                              : "text-[var(--color-burgundy)]"
                          }`}
                        >
                          {mod.title}
                        </span>
                        <span className="text-[11px] font-mono-code text-[var(--color-burgundy)]/70 shrink-0 font-semibold">
                          {mod.hours} hrs
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-burgundy)]/80 mt-1 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    {mod.resourceLink && (
                      <a
                        href={mod.resourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-dusty-rose)] hover:text-[var(--color-burgundy)] p-1 transition"
                        title="View Documentation"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
