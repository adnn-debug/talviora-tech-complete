"use client";

import {
  BarChart3,
  Flame,
  Clock,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";
import BarChart from "@/components/BarChart";
import { initialUserProfile } from "@/lib/career-data";

export default function AnalyticsPage() {
  const weeklyHoursData = [
    { label: "Monday", value: 2.5, maxValue: 4, subtext: "2.5h • PyTorch", color: "#c58b94" },
    { label: "Tuesday", value: 3.0, maxValue: 4, subtext: "3.0h • Transformers", color: "#c58b94" },
    { label: "Wednesday", value: 1.5, maxValue: 4, subtext: "1.5h • Vector Index", color: "#c58b94" },
    { label: "Thursday", value: 2.0, maxValue: 4, subtext: "2.0h • pgvector", color: "#c58b94" },
    { label: "Friday", value: 2.0, maxValue: 4, subtext: "2.0h • Fast API", color: "#c58b94" },
    { label: "Saturday", value: 1.0, maxValue: 4, subtext: "1.0h • Review", color: "#c58b94" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Effort & Competency Growth
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Learning Velocity & Peer Analytics
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Quantitative metrics evaluating your weekly learning volume and relative ranking among active candidates.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-luxury p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 uppercase">
            <span>Weekly Study Volume</span>
            <Clock className="w-4 h-4 text-[#c58b94]" />
          </div>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100">
            12.0 Hours
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            On track with 12 hrs/week goal
          </p>
        </div>

        <div className="card-luxury p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 uppercase">
            <span>Learning Consistency</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-amber-500">
            14 Days Active
          </div>
          <p className="text-[11px] text-zinc-500">
            Longest streak: 18 consecutive days
          </p>
        </div>

        <div className="card-luxury p-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 uppercase">
            <span>Cohort Percentile</span>
            <Users className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-cyan-500">
            78th Percentile
          </div>
          <p className="text-[11px] text-zinc-500">
            Among 4,200+ tracked AI career candidates
          </p>
        </div>
      </div>

      {/* Weekly Hours Bar Chart */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Weekly Dedicated Study Time Breakdown
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Active Sprint: Transformer Attention & LoRA Quantization
            </p>
          </div>
          <span className="text-xs font-mono-code text-zinc-400">Total: 12.0 hrs</span>
        </div>

        <BarChart items={weeklyHoursData} />
      </div>

      {/* Cohort Benchmarking Box */}
      <div className="card-luxury p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Peer Cohort Comparative Assessment
        </h2>

        <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-3 text-xs leading-relaxed">
          <p className="text-zinc-700 dark:text-zinc-300">
            Your readiness score of <strong className="text-zinc-900 dark:text-zinc-100">72</strong> places you ahead of <strong>78% of candidate profiles</strong> transitioning into Senior ML & AI Architecture roles.
          </p>
          <div className="space-y-1 text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Above-average velocity on Python metaprogramming and FastAPI microservice contracts.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Higher project depth due to vector search and semantic caching deliverables.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
