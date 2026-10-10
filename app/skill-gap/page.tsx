"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  AlertTriangle,
  Clock,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { skillGapsList, initialUserProfile } from "@/lib/career-data";
import { SkillGapItem } from "@/lib/types";

export default function SkillGapPage() {
  const [filterUrgency, setFilterUrgency] = useState<string>("All");
  const [addedSkills, setAddedSkills] = useState<Record<string, boolean>>({});

  const filteredGaps = skillGapsList.filter(
    (g) => filterUrgency === "All" || g.urgency === filterUrgency
  );

  const totalHours = filteredGaps.reduce((acc, curr) => acc + curr.estimatedHours, 0);

  const handleAddToSprint = (skillName: string) => {
    setAddedSkills((prev) => ({ ...prev, [skillName]: true }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Target Competency Diagnostic
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Skill Gap Matrix
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Target role: <strong>{initialUserProfile.targetRole}</strong>. Closing these gaps unlocks senior-level interview readiness.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5">
          {["All", "Critical", "High", "Medium"].map((u) => (
            <button
              key={u}
              onClick={() => setFilterUrgency(u)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterUrgency === u
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                  : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Box */}
      <div className="card-luxury p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-rose-50/20 dark:bg-rose-950/10 border-rose-200/50 dark:border-rose-900/30">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-[#843e4b] dark:text-[#d8a0ab]">
            Total Estimated Effort
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {totalHours} Study Hours Needed
          </div>
          <p className="text-xs text-zinc-500">
            At your dedicated 12 hours/week, this requires approximately{" "}
            <strong>{Math.ceil(totalHours / 12)} weeks</strong> of focused sprint learning.
          </p>
        </div>

        <Link
          href="/sprint-planner"
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
        >
          <span>Organize in Kanban</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Gaps List */}
      <div className="space-y-4">
        {filteredGaps.map((gap, idx) => {
          const isCritical = gap.urgency === "Critical";
          const isAdded = addedSkills[gap.skill];
          return (
            <div
              key={idx}
              className="card-luxury p-6 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isCritical
                        ? "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/20"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {gap.urgency} Urgency
                  </span>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {gap.skill}
                  </h2>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <strong>{gap.estimatedHours} Hours</strong>
                  </span>
                  <span>•</span>
                  <span>Category: {gap.category}</span>
                </div>
              </div>

              {/* Progress Comparison Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-500">
                    Current Proficiency: <strong>{gap.currentLevel}%</strong>
                  </span>
                  <span className="text-zinc-900 dark:text-zinc-100">
                    Target Benchmark: <strong>{gap.targetLevel}%</strong>
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
                  {/* Current Level */}
                  <div
                    className="h-full bg-[#c58b94] rounded-full absolute left-0"
                    style={{ width: `${gap.currentLevel}%` }}
                  />
                  {/* Benchmark target line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-cyan-400 z-10"
                    style={{ left: `${gap.targetLevel}%` }}
                    title={`Benchmark Target: ${gap.targetLevel}%`}
                  />
                </div>
              </div>

              {/* Actionable Step & Resource */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                    Actionable Resolution Step
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    {gap.actionableStep}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                      Curated Learning Resource
                    </span>
                    <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                      {gap.recommendedResource}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleAddToSprint(gap.skill)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Added to Sprint Kanban</span>
                        </>
                      ) : (
                        <span>+ Add to Sprint</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
