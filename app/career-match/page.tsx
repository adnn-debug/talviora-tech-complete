"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  DollarSign,
  TrendingUp,
  Flame,
  Check,
  ChevronRight,
  Filter,
} from "lucide-react";
import { careerRolesList, initialUserProfile } from "@/lib/career-data";
import { CareerRole } from "@/lib/types";

export default function CareerMatchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTargetRole, setActiveTargetRole] = useState<string>(initialUserProfile.targetRole);
  const [successBanner, setSuccessBanner] = useState<string>("");

  const categories = ["All", "AI & ML", "Software Engineering", "Data & Quant", "Systems & Security"];

  const filteredRoles = careerRolesList.filter(
    (r) => selectedCategory === "All" || r.category === selectedCategory
  );

  const handleSetTarget = async (roleTitle: string) => {
    setActiveTargetRole(roleTitle);
    setSuccessBanner(`Target career updated to ${roleTitle}! Synchronizing with your roadmap.`);
    setTimeout(() => setSuccessBanner(""), 4000);

    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: roleTitle }),
      });
    } catch (e) {
      console.warn("Failed to sync target role:", e);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Career Alignment Matrix
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Career Matches & Market Fit
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Algorithms evaluating skill overlaps, growth trajectories, and compensation potential.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                  : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {successBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => {
          const isTarget = activeTargetRole === role.title;
          return (
            <div
              key={role.id}
              className={`card-luxury p-6 flex flex-col justify-between relative overflow-hidden transition-all ${
                isTarget ? "ring-2 ring-[#c58b94] border-[#c58b94]" : ""
              }`}
            >
              {isTarget && (
                <div className="absolute top-0 right-0 bg-[#c58b94] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                  Active Target
                </div>
              )}

              <div>
                {/* Header & Match % */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {role.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{role.matchPercentage}% Fit</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {role.title}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                  {role.description}
                </p>

                {/* Salary & Growth info */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">Salary Range</span>
                    <p className="font-mono-code font-bold text-zinc-900 dark:text-zinc-100">
                      ${(role.salaryMin / 1000).toFixed(0)}k - ${(role.salaryMax / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase">YoY Demand</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{role.growthRatePct}%
                    </p>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                    Core Technical Pillars
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {role.keySkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benchmark breakdown bars */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                    Role Benchmarks
                  </span>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-zinc-500">
                      <span>System Design</span>
                      <span className="font-bold">{role.benchmarks.systemDesign}%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full">
                      <div
                        className="h-full bg-[#c58b94] rounded-full"
                        style={{ width: `${role.benchmarks.systemDesign}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSetTarget(role.title)}
                  disabled={isTarget}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isTarget
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-default"
                      : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {isTarget ? "✓ Current Target" : "Select as Target"}
                </button>

                <Link
                  href="/skill-gap"
                  className="text-xs font-semibold text-[#843e4b] dark:text-[#d8a0ab] hover:underline flex items-center gap-1"
                >
                  <span>Skill Gaps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
