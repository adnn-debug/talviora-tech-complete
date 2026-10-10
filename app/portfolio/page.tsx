"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Share2,
  Check,
  Github,
  Linkedin,
  ExternalLink,
  ShieldCheck,
  Flame,
  FolderGit2,
  Code2,
} from "lucide-react";
import { initialUserProfile, industryProjectsList } from "@/lib/career-data";

export default function PortfolioPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/portfolio`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const verifiedBadges = [
    { title: "Enterprise RAG Architect", issuer: "Talviora Neural Lab", date: "Verified Oct 2026" },
    { title: "PyTorch Deep Learning Core", issuer: "Talviora Applied Lab", date: "Verified Oct 2026" },
    { title: "PostgreSQL & pgvector Optimization", issuer: "Talviora Data Lab", date: "Verified Sep 2026" },
    { title: "FastAPI & Microservices Engineering", issuer: "Talviora Systems", date: "Verified Sep 2026" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header with Share Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Award className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Public Engineering Credential
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Candidate Verified Portfolio
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Shareable vanity URL showcasing evaluated technical readiness and production deliverables.
          </p>
        </div>

        <button
          onClick={handleCopyLink}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs cursor-pointer self-start"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? "Link Copied to Clipboard!" : "Share Public Portfolio"}</span>
        </button>
      </div>

      {/* Candidate Profile Hero Card */}
      <div className="card-luxury p-6 sm:p-8 space-y-6 bg-gradient-to-br from-white to-rose-50/30 dark:from-zinc-900 dark:to-zinc-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#c58b94]/20 border border-[#c58b94]/40 flex items-center justify-center font-bold text-xl text-[#843e4b] dark:text-[#f8d7dc]">
              FR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {initialUserProfile.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs font-semibold text-[#843e4b] dark:text-[#d8a0ab] mt-0.5">
                {initialUserProfile.targetRole} • {initialUserProfile.experienceLevel} Tier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {initialUserProfile.githubUrl && (
              <a
                href={initialUserProfile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {initialUserProfile.linkedinUrl && (
              <a
                href={initialUserProfile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          {initialUserProfile.bio}
        </p>

        {/* Readiness Metric Strip */}
        <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase">Readiness Score</span>
            <p className="font-serif-luxury text-2xl font-normal text-zinc-900 dark:text-zinc-100 mt-0.5">
              {initialUserProfile.readinessScore} / 100
            </p>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase">Active Streak</span>
            <p className="font-serif-luxury text-2xl font-normal text-amber-500 mt-0.5">
              {initialUserProfile.currentStreakDays} Days
            </p>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase">Verified Credentials</span>
            <p className="font-serif-luxury text-2xl font-normal text-emerald-500 mt-0.5">
              {verifiedBadges.length} Badges
            </p>
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 uppercase">Primary Language</span>
            <p className="font-serif-luxury text-2xl font-normal text-zinc-900 dark:text-zinc-100 mt-0.5">
              Python / TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Verified Skill Badges */}
      <div className="card-luxury p-6 sm:p-8 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Verified Technical Competency Credentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verifiedBadges.map((badge, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex items-start gap-3 text-xs"
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 block">
                  {badge.title}
                </span>
                <span className="text-[11px] text-zinc-500 block mt-0.5">
                  {badge.issuer} • {badge.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Proof of Work Projects */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Featured Proof-of-Work Deliverables
        </h2>

        <div className="space-y-4">
          {industryProjectsList.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {proj.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 self-start sm:self-auto">
                  {proj.difficulty}
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {proj.architecturalOverview}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
