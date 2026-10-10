"use client";

import Link from "next/link";
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import RadarChart from "@/components/RadarChart";
import { initialUserProfile } from "@/lib/career-data";

export default function ReadinessPage() {
  const pillars = [
    {
      title: "Core Programming & Software Fundamentals",
      score: 85,
      benchmark: 88,
      status: "Competitive",
      description: "Python async IO, TypeScript strict typings, API design, unit test coverage.",
      color: "#10b981",
    },
    {
      title: "Distributed System Architecture",
      score: 78,
      benchmark: 90,
      status: "Near Target",
      description: "Microservice decoupling, caching strategies with Redis, rate limiting, and write-ahead logs.",
      color: "#c58b94",
    },
    {
      title: "Algorithmic Problem Solving (DSA)",
      score: 74,
      benchmark: 84,
      status: "Needs Practice",
      description: "Two pointers, sliding window, tree traversals, and dynamic programming memoization.",
      color: "#f59e0b",
    },
    {
      title: "Production ML Serving & Infrastructure",
      score: 68,
      benchmark: 85,
      status: "Priority Growth",
      description: "PyTorch model quantization, Docker containerization, Vector search indexing with pgvector.",
      color: "#f43f5e",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Gauge className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Holistic Candidate Evaluation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Career Readiness Engine
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Four-pillar quantitative diagnostic evaluating readiness for {initialUserProfile.targetRole} interviews.
          </p>
        </div>

        <Link
          href="/simulator"
          className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs"
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Launch Interview Simulator</span>
        </Link>
      </div>

      {/* Hero Composite Score Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-7 card-luxury p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#c58b94] dark:text-[#d8a0ab]">
              Aggregate Evaluation
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 uppercase">
              Phase 2 Active
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-serif-luxury text-5xl sm:text-6xl text-zinc-900 dark:text-zinc-100">
              {initialUserProfile.readinessScore}
            </span>
            <span className="text-2xl text-zinc-400 font-sans">/ 100</span>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You are currently <strong className="text-zinc-900 dark:text-zinc-100">72% interview ready</strong>.
            Tier-1 employers (AI labs, high-growth scale-ups, top tech) require a composite threshold of{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">85+</strong> to pass initial technical rounds.
          </p>

          <div className="pt-2">
            <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
              <div
                className="h-full rounded-full bg-[#c58b94] transition-all duration-700"
                style={{ width: `${initialUserProfile.readinessScore}%` }}
              />
              <div
                className="absolute top-0 bottom-0 w-1 bg-emerald-500 z-10"
                style={{ left: "85%" }}
                title="85% Tier-1 Readiness Bar"
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
              <span>0% Baseline</span>
              <span>85% Top-Tier Interview Bar</span>
              <span>100% Master</span>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="md:col-span-5 card-luxury p-6 flex flex-col items-center justify-center">
          <RadarChart size={260} />
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="card-luxury p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {p.title}
              </h2>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                style={{
                  backgroundColor: `${p.color}15`,
                  color: p.color,
                }}
              >
                {p.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between text-xs">
              <span className="text-zinc-500">
                Evaluated: <strong className="text-zinc-900 dark:text-zinc-100">{p.score}%</strong>
              </span>
              <span className="text-zinc-400">
                Role Benchmark: <strong>{p.benchmark}%</strong>
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${p.score}%`,
                  backgroundColor: p.color,
                }}
              />
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Technical Interview Readiness Checklist */}
      <div className="card-luxury p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Interview Readiness Verification Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>System Design</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Strong architectural trade-off articulation and microservice diagrams.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Live DSA Coding</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Complete Two Pointers and DP sprints to pass 45-minute live screen.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>MLOps & Serving</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Quantization and GPU memory bandwidth questions require practical practice.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Behavioral & STAR</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
              Project impact, cross-functional collaboration, and incident retrospectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
