"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Route,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  ExternalLink,
  KanbanSquare,
  Sparkles,
} from "lucide-react";
import { roadmapPhasesList, initialUserProfile } from "@/lib/career-data";
import { RoadmapPhase } from "@/lib/types";

export default function RoadmapPage() {
  const [phases, setPhases] = useState<RoadmapPhase[]>(roadmapPhasesList);

  const toggleModule = (phaseIdx: number, modId: string) => {
    setPhases((prev) => {
      const updated = [...prev];
      const targetPhase = { ...updated[phaseIdx] };
      targetPhase.modules = targetPhase.modules.map((m) =>
        m.id === modId ? { ...m, completed: !m.completed } : m
      );
      updated[phaseIdx] = targetPhase;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Route className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Sprint-by-Sprint Curriculum
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Dynamic Learning Roadmap
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Personalized 16-week path for <strong>{initialUserProfile.targetRole}</strong>.
            Interactive checkboxes update your progress velocity in real time.
          </p>
        </div>

        <Link
          href="/sprint-planner"
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs"
        >
          <KanbanSquare className="w-4 h-4" />
          <span>Sprint Kanban</span>
        </Link>
      </div>

      {/* Progress Bar Card */}
      <div className="card-luxury p-6 bg-gradient-to-r from-white to-rose-50/20 dark:from-zinc-900 dark:to-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-[#c58b94] dark:text-[#d8a0ab]">
            Total Curriculum Completion
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {completedCount} of {totalCount} Modules Completed ({overallPct}%)
          </div>
          <p className="text-xs text-zinc-500">
            Phase 1 is complete. Active focus: Transformer Attention & Quantization (Phase 2).
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#c58b94] transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block text-right">
            ~12 hrs/week pacing
          </span>
        </div>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-6">
        {phases.map((phase, pIdx) => {
          const isPhaseDone = phase.status === "completed";
          const isPhaseActive = phase.status === "in-progress";
          const isPhaseLocked = phase.status === "locked";

          return (
            <div
              key={phase.phaseNumber}
              className={`card-luxury p-6 transition-all ${
                isPhaseActive
                  ? "border-[#c58b94] ring-1 ring-[#c58b94]/40"
                  : isPhaseLocked
                  ? "opacity-80"
                  : ""
              }`}
            >
              {/* Phase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isPhaseDone
                        ? "bg-emerald-500 text-white"
                        : isPhaseActive
                        ? "bg-[#c58b94] text-white"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {isPhaseDone ? "✓" : `P${phase.phaseNumber}`}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        {phase.durationWeeks} • {phase.estimatedHours} Hours
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      Phase {phase.phaseNumber}: {phase.phaseTitle}
                    </h2>
                  </div>
                </div>

                <span
                  className={`self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isPhaseDone
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : isPhaseActive
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {phase.status}
                </span>
              </div>

              {/* Module Checkpoints List */}
              <div className="mt-4 space-y-2.5">
                {phase.modules.map((mod) => (
                  <div
                    key={mod.id}
                    className={`p-3.5 rounded-xl border transition-all flex items-start gap-3.5 ${
                      mod.completed
                        ? "bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/30 text-zinc-700 dark:text-zinc-300"
                        : "bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {/* Interactive Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleModule(pIdx, mod.id)}
                      className="mt-0.5 text-zinc-400 hover:text-[#c58b94] transition cursor-pointer"
                      aria-label={`Toggle module ${mod.title}`}
                    >
                      {mod.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            mod.completed
                              ? "line-through text-zinc-400 dark:text-zinc-500"
                              : "text-zinc-900 dark:text-zinc-100"
                          }`}
                        >
                          {mod.title}
                        </span>
                        <span className="text-[11px] font-mono-code text-zinc-400 shrink-0">
                          {mod.hours} hrs
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    {mod.resourceLink && (
                      <a
                        href={mod.resourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-[#c58b94] p-1 transition"
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
