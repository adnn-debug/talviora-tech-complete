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
import RadarChart from "@/components/RadarChart";
import { initialUserProfile } from "@/lib/career-data";

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("talviora-last-assessment");
      if (stored) {
        try {
          setResult(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const readiness = result?.readinessScore || 72;
  const strongPillars = result?.strongPillars || ["Python & Algorithms", "Data Pipelines & Core ML"];
  const growthPillars = result?.growthPillars || [
    "Distributed System Architecture",
    "Production Model Deployment & MLOps",
  ];
  const prioritySkills = result?.prioritySkills || [
    "PyTorch",
    "RAG & LLM Application Engineering",
    "FastAPI & Vector Indexing",
  ];
  const recommendedProjects = result?.recommendedProjects || [
    "Enterprise Hybrid RAG Assistant with Hybrid Search",
    "Real-Time Stream Processing & Feature Store Architecture",
  ];
  const executiveSummary =
    result?.executiveSummary ||
    `Based on your multi-domain technical assessment, your foundations in algorithm design and machine learning pipeline mechanics are solid. To reach the 85+ score threshold for Tier-1 interview readiness, prioritize distributed caching, model quantization, and end-to-end vector database indexing this sprint.`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Diagnostic Synthesis Complete
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            AI Assessment Results & Diagnostic
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Evaluated against senior industry standards for:{" "}
            <strong>{result?.targetRole || initialUserProfile.targetRole}</strong>
          </p>
        </div>

        <Link
          href="/assessment"
          className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Diagnostic</span>
        </Link>
      </div>

      {/* Hero Score Box */}
      <div className="card-luxury p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-white to-rose-50/30 dark:from-zinc-900 dark:to-zinc-900/50">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#c58b94] dark:text-[#d8a0ab]">
            Evaluated Readiness Score
          </span>
          <div className="font-serif-luxury text-5xl sm:text-6xl text-zinc-900 dark:text-zinc-100">
            {readiness} <span className="text-2xl text-zinc-400 font-sans">/ 100</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md">
            Candidate is in the <strong>78th percentile</strong> of junior-to-mid career profiles.
            Target readiness threshold: <strong>85+</strong>.
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Readiness Threshold</span>
            <span>{readiness}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#c58b94] transition-all duration-700"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block text-right">
            +18% projected lift upon completing Phase 2
          </span>
        </div>
      </div>

      {/* Gemini Executive Summary */}
      <div className="p-6 rounded-2xl bg-[#111010] text-white border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d8a0ab]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#d8a0ab]">
            AI Executive Synthesis
          </span>
        </div>
        <p className="text-sm text-zinc-200 leading-relaxed font-normal">
          {executiveSummary}
        </p>
      </div>

      {/* Two Columns: Strengths vs Blind Spots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Pillars */}
        <div className="card-luxury p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Evaluated Strengths
            </h2>
          </div>
          <div className="space-y-2">
            {strongPillars.map((p: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs font-medium text-emerald-800 dark:text-emerald-300"
              >
                ✓ {p}
              </div>
            ))}
          </div>
        </div>

        {/* Growth Pillars */}
        <div className="card-luxury p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Priority Growth Pillars
            </h2>
          </div>
          <div className="space-y-2">
            {growthPillars.map((p: string, i: number) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-xs font-medium text-rose-800 dark:text-rose-300"
              >
                ! {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Projects & Next Steps */}
      <div className="card-luxury p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Recommended Proof-of-Work Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedProjects.map((proj: string, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-zinc-100">
                <FolderGit2 className="w-4 h-4 text-[#c58b94]" />
                <span>{proj}</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Production blueprint covering required technologies, vector indexing, and unit tests.
              </p>
              <Link
                href="/projects"
                className="text-xs font-semibold text-[#843e4b] dark:text-[#d8a0ab] hover:underline inline-flex items-center gap-1 pt-1"
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
          className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          Inspect Detailed Skill Gap Matrix
        </Link>
        <Link
          href="/roadmap"
          className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs"
        >
          <span>Activate Personalized Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
