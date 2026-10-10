"use client";

import { useState } from "react";
import {
  Binary,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";

interface DsaPattern {
  id: number;
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  highFrequencyProblems: string[];
  solved: boolean;
  notes: string;
}

export default function DsaTrackerPage() {
  const [patterns, setPatterns] = useState<DsaPattern[]>([
    {
      id: 1,
      name: "Two Pointers (Opposite & Same Direction)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      highFrequencyProblems: ["Two Sum II", "3Sum", "Container With Most Water", "Trapping Rain Water"],
      solved: true,
      notes: "Optimal for sorted arrays and palindrome validations.",
    },
    {
      id: 2,
      name: "Sliding Window (Fixed & Dynamic)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(K) / O(1)",
      highFrequencyProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring"],
      solved: true,
      notes: "Maintains running window state; expand right, contract left when invariant breaks.",
    },
    {
      id: 3,
      name: "Fast & Slow Pointers (Floyd's Cycle)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      highFrequencyProblems: ["Linked List Cycle II", "Find the Duplicate Number", "Happy Number"],
      solved: true,
      notes: "Used to detect loops and find middle node in linked lists.",
    },
    {
      id: 4,
      name: "Merge Intervals & Overlap Resolution",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      highFrequencyProblems: ["Merge Intervals", "Insert Interval", "Non-overlapping Intervals"],
      solved: false,
      notes: "Sort by interval start time, compare current start with previous end.",
    },
    {
      id: 5,
      name: "Top 'K' Elements with Min/Max Heaps",
      timeComplexity: "O(N log K)",
      spaceComplexity: "O(K)",
      highFrequencyProblems: ["Kth Largest Element in an Array", "Top K Frequent Elements"],
      solved: false,
      notes: "Keep heap size bounded to K elements rather than sorting the whole array.",
    },
    {
      id: 6,
      name: "0/1 Knapsack & Dynamic Programming Memoization",
      timeComplexity: "O(N * W)",
      spaceComplexity: "O(W)",
      highFrequencyProblems: ["Partition Equal Subset Sum", "Coin Change", "Target Sum"],
      solved: false,
      notes: "State transitions: dp[w] = max(dp[w], dp[w - weight] + val); optimize space to 1D array.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const toggleSolved = (id: number) => {
    setPatterns((prev) =>
      prev.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p))
    );
  };

  const filtered = patterns.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.highFrequencyProblems.some((prob) => prob.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const solvedCount = patterns.filter((p) => p.solved).length;
  const solvedPct = Math.round((solvedCount / patterns.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Binary className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Algorithmic Acumen
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            DSA & Algorithmic Patterns Sprint
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Master 14 core patterns rather than memorizing hundreds of ad-hoc problems.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search pattern or problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
          />
        </div>
      </div>

      {/* Progress banner */}
      <div className="card-luxury p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-white to-rose-50/20 dark:from-zinc-900 dark:to-zinc-900/60">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-[#c58b94] dark:text-[#d8a0ab]">
            Pattern Mastery Progress
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {solvedCount} of {patterns.length} Patterns Mastered ({solvedPct}%)
          </div>
        </div>
        <div className="w-full sm:w-60">
          <div className="w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#c58b94] transition-all duration-500"
              style={{ width: `${solvedPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((pattern) => (
          <div
            key={pattern.id}
            className={`card-luxury p-5 space-y-3 transition-all ${
              pattern.solved ? "border-emerald-500/40 bg-emerald-50/10 dark:bg-emerald-950/5" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toggleSolved(pattern.id)}
                  className="cursor-pointer text-zinc-400 hover:text-[#c58b94]"
                  aria-label={`Toggle ${pattern.name}`}
                >
                  {pattern.solved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <h2
                  className={`text-sm font-bold ${
                    pattern.solved
                      ? "line-through text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {pattern.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono-code text-zinc-500">
              <span>Time: <strong className="text-zinc-800 dark:text-zinc-200">{pattern.timeComplexity}</strong></span>
              <span>•</span>
              <span>Space: <strong className="text-zinc-800 dark:text-zinc-200">{pattern.spaceComplexity}</strong></span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {pattern.notes}
            </p>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">
                Curated Practice Set:
              </span>
              <div className="flex flex-wrap gap-1">
                {pattern.highFrequencyProblems.map((prob, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                  >
                    {prob}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
