"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Compass,
  FolderGit2,
  CheckCircle2,
  Layers,
  Flame,
  Award,
  BookOpen,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import RadarChart from "@/components/RadarChart";
import { initialUserProfile, careerRolesList, skillGapsList } from "@/lib/career-data";

export default function Home() {
  const topRole = careerRolesList[0];
  const criticalGaps = skillGapsList.filter((g) => g.urgency === "Critical");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
              Autonomous Learner Dashboard
            </span>
            <span className="text-[#B59A83]">•</span>
            <span className="text-xs text-[#7E6962] dark:text-zinc-400">
              TALVIORA TECH Intelligence v2.4
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-5xl text-[#6F1737] dark:text-[#FFF9F0] tracking-tight">
            Welcome back, {initialUserProfile.name.split(" ")[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            Your career trajectory model is synchronized with senior technology benchmarks. Target role:{" "}
            <strong className="text-[#6F1737] dark:text-[#F0C4CC] font-bold">{initialUserProfile.targetRole}</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/welcome"
            className="px-4 py-2.5 rounded-xl border border-[#B59A83]/50 hover:bg-white/60 dark:hover:bg-[#2E1F21] text-[#241A1A] dark:text-[#FFF9F0] font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-xs"
          >
            <span>Public Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/assessment"
            className="px-4 py-2.5 rounded-xl btn-burgundy text-xs font-semibold tracking-wide transition shadow-sm flex items-center gap-2"
          >
            <BrainCircuit className="w-4 h-4 text-[#C58F98]" />
            <span>Launch AI Assessment</span>
          </Link>
        </div>
      </div>

      {/* Executive AI Recommendation Box (Coffee-House Layered Panel) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#3B2527] text-[#FFF9F0] p-6 sm:p-7 shadow-xl border border-[#6F1737]/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-[#6F1737]/30 to-[#C58F98]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#C58F98]/20 text-[#C58F98]">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C58F98]">
                Gemini Executive Career Intelligence Brief
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#F5EBDD] leading-relaxed font-normal">
              Based on your multi-domain diagnostic, your architectural acumen achieves a{" "}
              <span className="text-[#C58F98] font-bold">94% alignment</span> with{" "}
              <span className="text-white font-semibold">AI Solutions Architect</span> roles.
              Closing your <span className="underline decoration-[#C58F98]">PyTorch Model Quantization</span> and{" "}
              <span className="underline decoration-[#C58F98]">Distributed Caching</span> gaps this sprint will elevate Tier-1 interview readiness by{" "}
              <span className="text-[#96977A] font-bold">+18%</span>.
            </p>
          </div>

          <Link
            href="/skill-gap"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white tracking-wide transition flex items-center gap-2"
          >
            <span>Resolve Critical Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Top Career Match"
          value={`${topRole.matchPercentage}%`}
          subtitle={topRole.title}
          badge="High Fit"
          badgeType="olive"
          progressPct={topRole.matchPercentage}
          progressColor="#96977A"
          actionText="Explore 5 Matched Roles"
          actionHref="/career-match"
        />

        <StatCard
          title="Career Readiness"
          value={`${initialUserProfile.readinessScore} / 100`}
          subtitle="Target: 85+ for Tier-1 Technical Screens"
          badge="In Progress"
          badgeType="rose"
          progressPct={initialUserProfile.readinessScore}
          progressColor="#C58F98"
          actionText="View Readiness Diagnostic"
          actionHref="/readiness"
        />

        <StatCard
          title="Learning Streak"
          value={`${initialUserProfile.currentStreakDays} Days`}
          subtitle="Weekly cadence: 12 hrs dedicated"
          badge="Active"
          badgeType="amber"
          progressPct={70}
          progressColor="#C8B39A"
          actionText="View Velocity Analytics"
          actionHref="/analytics"
        />

        <StatCard
          title="Market Salary Target"
          value={`$${(topRole.salaryMin / 1000).toFixed(0)}k - $${(topRole.salaryMax / 1000).toFixed(0)}k`}
          subtitle="Median: $172,000 (+34.2% YoY growth)"
          badge="Tech Trend"
          badgeType="cyan"
          progressPct={88}
          progressColor="#A77C91"
          actionText="Market Intelligence Report"
          actionHref="/market"
        />
      </div>

      {/* Two Column Layout: Radar Visualization & Active Sprints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Visual */}
        <div className="lg:col-span-6 card-coffee p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#B59A83]/20 dark:border-zinc-800">
              <div>
                <h2 className="text-xs font-bold text-[#6F1737] dark:text-[#FFF9F0] uppercase tracking-wider">
                  Skill Acumen vs Senior Benchmark
                </h2>
                <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-0.5">
                  Multi-axis radar comparing your evaluated strengths against industry requirements
                </p>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#6F1737] dark:text-[#F0C4CC] font-bold">
                SVG Engine
              </span>
            </div>

            <div className="py-6 flex justify-center">
              <RadarChart size={300} />
            </div>
          </div>

          <div className="pt-4 border-t border-[#B59A83]/20 dark:border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-[#4A3A37] dark:text-zinc-400">Highest Alignment: System Design (85%)</span>
            <Link
              href="/readiness"
              className="text-[#6F1737] dark:text-[#F0C4CC] font-bold hover:underline"
            >
              Analyze All Pillars →
            </Link>
          </div>
        </div>

        {/* Actionable Sprints & Critical Gaps */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Sprint Box */}
          <div className="card-coffee p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#B59A83]/20 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#C58F98]">
                  <Flame className="w-4 h-4" />
                </span>
                <h2 className="text-xs font-bold text-[#6F1737] dark:text-[#FFF9F0] uppercase tracking-wider">
                  Active Sprint: Phase 2
                </h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C58F98]/15 text-[#6F1737] dark:text-[#F0C4CC]">
                Weeks 5 - 8
              </span>
            </div>

            <p className="text-xs text-[#3B2527] dark:text-zinc-300 mb-4 leading-relaxed">
              <strong>PyTorch Model Architectures & Vector Indexing:</strong> Complete Transformer attention mechanisms and PEFT fine-tuning.
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#FFF9F0] dark:bg-[#241A1A] border border-[#B59A83]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#96977A] shrink-0" />
                  <span className="text-[#241A1A] dark:text-zinc-200 font-medium">
                    Module 2.1: Custom Training Loops & Autograd
                  </span>
                </div>
                <span className="text-[#96977A] font-bold text-[10px] uppercase">
                  Complete
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9F0] dark:bg-[#241A1A] border border-[#6F1737]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border-2 border-[#6F1737] dark:border-[#C58F98] flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 bg-[#6F1737] dark:bg-[#C58F98] rounded-full animate-ping" />
                  </div>
                  <span className="text-[#241A1A] dark:text-zinc-100 font-bold">
                    Module 2.2: Transformer Deep Dive & Multi-Head Attention
                  </span>
                </div>
                <span className="text-[#6F1737] dark:text-[#C58F98] font-bold text-[10px] uppercase">
                  In Progress (4.5 hrs)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9F0] dark:bg-[#241A1A] border border-[#B59A83]/20 flex items-center justify-between text-xs opacity-60">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full border border-zinc-400 shrink-0" />
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                    Module 2.3: Model Quantization & LoRA Fine-Tuning
                  </span>
                </div>
                <span className="text-zinc-400 text-[10px] uppercase">Upcoming</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#B59A83]/20 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-[#4A3A37] dark:text-zinc-400">Phase Completion: 45%</span>
              <Link
                href="/roadmap"
                className="text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] hover:underline"
              >
                Open Full Roadmap →
              </Link>
            </div>
          </div>

          {/* Critical Gaps Quick Resolution */}
          <div className="card-coffee p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8D514B]" />
                <h2 className="text-xs font-bold text-[#6F1737] dark:text-[#FFF9F0] uppercase tracking-wider">
                  Critical Skill Gaps ({criticalGaps.length})
                </h2>
              </div>
              <Link
                href="/skill-gap"
                className="text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] hover:underline"
              >
                View Matrix
              </Link>
            </div>

            <div className="space-y-3">
              {criticalGaps.map((gap, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-[#8D514B]/30 bg-[#8D514B]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#241A1A] dark:text-[#FFF9F0]">
                      {gap.skill}
                    </span>
                    <p className="text-[11px] text-[#4A3A37] dark:text-zinc-400 mt-0.5">
                      Current: {gap.currentLevel}% → Target: {gap.targetLevel}% ({gap.estimatedHours}h to close)
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8D514B]/15 text-[#8D514B] dark:text-[#F2958D] uppercase">
                    Critical Gap
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
