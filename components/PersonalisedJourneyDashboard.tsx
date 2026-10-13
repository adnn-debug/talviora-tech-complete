"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  FolderGit2,
  BookOpen,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  Settings,
  AlertCircle,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import {
  PersonalisedJourney,
  toggleJourneyTask,
  toggleJourneyMilestone,
} from "@/lib/personalised-journey";

interface DashboardProps {
  journey: PersonalisedJourney;
  onUpdatePreferences: () => void;
  onJourneyChange: (updated: PersonalisedJourney) => void;
  onReset?: () => void;
}

export default function PersonalisedJourneyDashboard({
  journey,
  onUpdatePreferences,
  onJourneyChange,
  onReset,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "roadmap" | "projects">("tasks");

  const totalTasks = journey.todayTasks.length;
  const completedTasks = journey.todayTasks.filter((t) => t.completed).length;
  const taskProgressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalMilestones = journey.roadmapMilestones.length;
  const completedMilestones = journey.roadmapMilestones.filter((m) => m.completed).length;
  const milestoneProgressPct =
    totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const handleToggleTask = (taskId: string) => {
    const updated = toggleJourneyTask(journey, taskId);
    onJourneyChange(updated);
  };

  const handleToggleMilestone = (milestoneId: string) => {
    const updated = toggleJourneyMilestone(journey, milestoneId);
    onJourneyChange(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner & Selected Field */}
      <div className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-gradient-to-br from-[var(--surface-rose)] via-[var(--color-warm-ivory)] to-[var(--color-creme-latte)] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]">
                Active Learning Journey
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)]">
                {journey.fieldCategory}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                {journey.difficultyLevel}
              </span>
            </div>

            <h1 className="font-display-serif text-2xl sm:text-4xl font-bold text-[var(--color-burgundy)] leading-tight">
              {journey.fieldName}
            </h1>

            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
              {journey.fieldSummary}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[var(--color-burgundy)]/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
                <span>Daily Commitment: <strong>{journey.dailyStudyLabel}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
                <span>Weekly Goal: <strong>{journey.weeklyGoalHours} hrs/week</strong></span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={onUpdatePreferences}
              className="btn-burgundy px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Update Preferences</span>
            </button>

            <Link
              href="/learning"
              className="px-4 py-2.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] hover:bg-[var(--surface-rose)] text-xs font-semibold text-[var(--color-burgundy)] flex items-center justify-center gap-1.5 transition shadow-2xs"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Open Learning Sandbox</span>
            </Link>
          </div>
        </div>

        {/* AI Model / Deterministic Engine Notice Banner */}
        <div className="mt-5 pt-4 border-t border-[rgba(var(--color-burgundy-rgb),0.12)] flex items-start sm:items-center gap-2.5 text-xs">
          {journey.isAiGenerated ? (
            <span className="p-1 rounded-md bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span className="p-1 rounded-md bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] shrink-0 border border-[rgba(var(--color-burgundy-rgb),0.2)]">
              <AlertCircle className="w-3.5 h-3.5" />
            </span>
          )}
          <p className="text-[11px] text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
            <strong>{journey.generationModel}:</strong> {journey.aiNotice}
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Strip: Today Tasks, Weekly Goal, Completed Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Today's Tasks */}
        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-burgundy)]/80">
            <span className="font-bold uppercase tracking-wider text-[10px]">Today&apos;s Focus</span>
            <span className="font-bold">{completedTasks} / {totalTasks} done</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
              {taskProgressPct}%
            </span>
            <span className="text-xs text-[var(--color-burgundy)]/75">completed today</span>
          </div>
          <div className="w-full bg-[var(--color-creme-latte)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--color-burgundy)] h-full transition-all duration-300"
              style={{ width: `${taskProgressPct}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Weekly Goal */}
        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-burgundy)]/80">
            <span className="font-bold uppercase tracking-wider text-[10px]">Weekly Learning Goal</span>
            <span className="font-bold">{journey.weeklyGoalHours} hrs target</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
              {journey.completedHoursThisWeek}h
            </span>
            <span className="text-xs text-[var(--color-burgundy)]/75">of {journey.weeklyGoalHours}h logged</span>
          </div>
          <div className="w-full bg-[var(--color-creme-latte)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--color-burgundy)] h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round((journey.completedHoursThisWeek / journey.weeklyGoalHours) * 100))}%`,
              }}
            />
          </div>
        </div>

        {/* Metric 3: Overall Milestones */}
        <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[var(--color-burgundy)]/80">
            <span className="font-bold uppercase tracking-wider text-[10px]">Roadmap Mastery</span>
            <span className="font-bold">{completedMilestones} / {totalMilestones} milestones</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-serif text-3xl font-bold text-[var(--color-burgundy)]">
              {milestoneProgressPct}%
            </span>
            <span className="text-xs text-[var(--color-burgundy)]/75">curriculum achieved</span>
          </div>
          <div className="w-full bg-[var(--color-creme-latte)] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--color-burgundy)] h-full transition-all duration-300"
              style={{ width: `${milestoneProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Recommended Next Action Callout Banner */}
      <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-creme-latte)] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Recommended Next Action
            </span>
          </div>
          <h3 className="font-display-serif text-base font-bold text-[var(--color-burgundy)]">
            {journey.recommendedNextAction.title}
          </h3>
          <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
            {journey.recommendedNextAction.desc}
          </p>
        </div>

        <Link
          href={journey.recommendedNextAction.actionUrl}
          className="btn-burgundy px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs shrink-0 self-start sm:self-auto"
        >
          <span>{journey.recommendedNextAction.actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--color-warm-ivory)]" />
        </Link>
      </div>

      {/* 4. Tab Navigation: Today Tasks vs Roadmap vs Projects */}
      <div className="flex items-center gap-2 border-b border-[rgba(var(--color-burgundy-rgb),0.15)] pb-1">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`px-4 py-2 rounded-t-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "tasks"
              ? "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-b-transparent border-[rgba(var(--color-burgundy-rgb),0.15)] -mb-[1px]"
              : "text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)]"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Today&apos;s Tasks ({journey.todayTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("roadmap")}
          className={`px-4 py-2 rounded-t-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "roadmap"
              ? "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-b-transparent border-[rgba(var(--color-burgundy-rgb),0.15)] -mb-[1px]"
              : "text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)]"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Step-by-Step Roadmap ({journey.roadmapMilestones.length} Milestones)</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded-t-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === "projects"
              ? "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-b-transparent border-[rgba(var(--color-burgundy-rgb),0.15)] -mb-[1px]"
              : "text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)]"
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Suggested Projects & Exercises</span>
        </button>
      </div>

      {/* TAB 1: TODAY'S TASKS */}
      {activeTab === "tasks" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] p-6 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Today&apos;s Structured Schedule ({journey.dailyStudyLabel})
              </span>
              <span className="text-[11px] text-[var(--color-burgundy)]/70 font-medium">
                Check off tasks as you finish them; your daily progress updates instantly.
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {journey.todayTasks.map((t) => (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    t.completed
                      ? "bg-[var(--surface-rose)]/40 border-[rgba(var(--color-dusty-rose-rgb),0.4)] opacity-85"
                      : "bg-[var(--color-creme-latte)]/50 border-[rgba(var(--color-burgundy-rgb),0.12)] hover:border-[var(--color-burgundy)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(t.id)}
                      className="mt-0.5 text-[var(--color-burgundy)] hover:scale-110 transition cursor-pointer"
                      title={t.completed ? "Mark incomplete" : "Mark completed"}
                      aria-label={t.title}
                    >
                      {t.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-[var(--color-burgundy)] text-[var(--color-warm-ivory)]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--color-burgundy)]/60" />
                      )}
                    </button>
                    <div>
                      <span
                        className={`text-xs font-semibold text-[var(--color-burgundy)] block ${
                          t.completed ? "line-through text-[var(--color-burgundy)]/60" : ""
                        }`}
                      >
                        {t.title}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                          {t.type}
                        </span>
                        <span className="text-[10px] text-[var(--color-burgundy)]/75">
                          ~{t.durationMinutes} minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/learning"
                    className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline flex items-center gap-1 shrink-0 self-center"
                  >
                    <span>Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STEP-BY-STEP ROADMAP & ESTIMATED MILESTONES */}
      {activeTab === "roadmap" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Estimated Learning Milestones & Progression
              </span>
              <span className="text-[11px] text-[var(--color-burgundy)]/70 font-medium">
                Click any milestone to mark it completed as your journey advances.
              </span>
            </div>

            <div className="space-y-3">
              {journey.roadmapMilestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                    m.completed
                      ? "bg-[var(--surface-rose)]/50 border-[rgba(var(--color-dusty-rose-rgb),0.6)]"
                      : "bg-[var(--color-creme-latte)]/40 border-[rgba(var(--color-burgundy-rgb),0.12)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleMilestone(m.id)}
                      className="mt-0.5 text-[var(--color-burgundy)] hover:scale-110 transition cursor-pointer"
                      title={m.completed ? "Mark incomplete" : "Mark completed"}
                      aria-label={m.title}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-[var(--color-burgundy)] text-[var(--color-warm-ivory)]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[var(--color-burgundy)]/60" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] text-[var(--color-burgundy)]">
                          Phase 0{idx + 1}
                        </span>
                        <strong className="text-xs font-bold text-[var(--color-burgundy)]">
                          {m.title}
                        </strong>
                      </div>
                      <p className="text-[11px] text-[var(--color-burgundy)]/85 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/roadmap"
                    className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline shrink-0 self-center"
                  >
                    View DAG
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUGGESTED PROJECTS & RECOMMENDED EXERCISES */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {/* Recommended Practice Exercises */}
          <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] p-6 space-y-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
              Recommended Practice Exercises
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {journey.recommendedExercises.map((e) => (
                <div
                  key={e.id}
                  className="p-4 rounded-xl bg-[var(--color-creme-latte)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <strong className="text-xs font-bold text-[var(--color-burgundy)] block">
                      {e.title}
                    </strong>
                    <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                      {e.desc}
                    </p>
                  </div>
                  <Link
                    href={e.actionUrl}
                    className="btn-burgundy px-3 py-1.5 rounded-lg text-xs font-bold text-center mt-2 flex items-center justify-center gap-1"
                  >
                    <span>{e.actionLabel}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Projects */}
          <div className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] p-6 space-y-4 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
              Suggested Real-World Projects for {journey.fieldName}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journey.suggestedProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[var(--color-creme-latte)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                        {p.level} Project
                      </span>
                      <FolderGit2 className="w-4 h-4 text-[var(--color-burgundy)]/70" />
                    </div>
                    <strong className="text-xs font-bold text-[var(--color-burgundy)] block">
                      💡 {p.title}
                    </strong>
                    <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.08)] text-[10px] text-[var(--color-burgundy)]/85 space-y-0.5">
                    <span className="font-bold uppercase tracking-wider block text-[var(--color-burgundy)]/75">
                      Deliverable:
                    </span>
                    <p>{p.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
