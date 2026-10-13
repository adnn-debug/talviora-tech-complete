"use client";

import { useState, useEffect } from "react";
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
      solved: false,
      notes: "Optimal for sorted arrays and palindrome validations.",
    },
    {
      id: 2,
      name: "Sliding Window (Fixed & Dynamic)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(K) / O(1)",
      highFrequencyProblems: ["Longest Substring Without Repeating Characters", "Minimum Window Substring"],
      solved: false,
      notes: "Maintains running window state; expand right, contract left when invariant breaks.",
    },
    {
      id: 3,
      name: "Fast & Slow Pointers (Floyd's Cycle)",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      highFrequencyProblems: ["Linked List Cycle II", "Find the Duplicate Number", "Happy Number"],
      solved: false,
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem("talviora_dsa_patterns");
      if (saved) {
        const solvedIds: number[] = JSON.parse(saved);
        if (Array.isArray(solvedIds)) {
          setPatterns((prev) =>
            prev.map((p) => ({
              ...p,
              solved: solvedIds.includes(p.id),
            }))
          );
        }
      }
    } catch (e) {
      console.warn("Failed to load DSA pattern progress", e);
    }
  }, []);

  const toggleSolved = (id: number) => {
    setPatterns((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, solved: !p.solved } : p));
      try {
        const solvedIds = updated.filter((p) => p.solved).map((p) => p.id);
        localStorage.setItem("talviora_dsa_patterns", JSON.stringify(solvedIds));
      } catch (e) {
        console.warn("Failed to persist DSA pattern progress", e);
      }
      return updated;
    });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30">
              <Binary className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Problem-Solving Patterns
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display-serif font-bold text-[var(--color-burgundy)]">
            Learn Problem-Solving Patterns
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Learn the recurring patterns behind coding problems ({patterns.length} core patterns included). Check off what you master; your progress is saved automatically in your browser.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--color-dusty-rose)] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search pattern or problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs w-full sm:w-64 rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] placeholder:text-[var(--color-burgundy)]/40 focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
          />
        </div>
      </div>

      {/* Progress banner */}
      <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[var(--color-creme-latte)] shadow-xs">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
            Your pattern checklist (this browser)
          </span>
          <div className="text-2xl font-bold text-[var(--color-burgundy)]">
            {solvedCount} of {patterns.length} Patterns Mastered ({solvedPct}%)
          </div>
        </div>
        <div className="w-full sm:w-60">
          <div className="w-full h-2.5 rounded-full bg-[var(--color-creme-latte)] overflow-hidden border border-[var(--color-dusty-rose)]/20">
            <div
              className="h-full rounded-full bg-[var(--color-burgundy)] transition-all duration-500"
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
            className={`p-5 space-y-3 rounded-2xl transition-all shadow-xs border ${
              pattern.solved
                ? "bg-[var(--surface-rose)]/40 border-[var(--color-dusty-rose)]/60"
                : "bg-[var(--color-warm-ivory)] border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)]"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => toggleSolved(pattern.id)}
                  aria-pressed={pattern.solved}
                  className="cursor-pointer text-[var(--color-dusty-rose)] hover:text-[var(--color-burgundy)] transition-colors"
                  aria-label={`Toggle ${pattern.name}`}
                >
                  {pattern.solved ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-burgundy)]" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <h2
                  className={`text-sm font-bold ${
                    pattern.solved
                      ? "line-through text-[var(--color-burgundy)]/50"
                      : "text-[var(--color-burgundy)]"
                  }`}
                >
                  {pattern.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono-code text-[var(--color-burgundy)]/70">
              <span>Time: <strong className="text-[var(--color-burgundy)]">{pattern.timeComplexity}</strong></span>
              <span>•</span>
              <span>Space: <strong className="text-[var(--color-burgundy)]">{pattern.spaceComplexity}</strong></span>
            </div>

            <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
              {pattern.notes}
            </p>

            <div className="pt-2 border-t border-[var(--color-creme-latte)]">
              <span className="text-[10px] uppercase font-bold text-[var(--color-burgundy)]/70 block mb-1">
                Curated Practice Set:
              </span>
              <div className="flex flex-wrap gap-1">
                {pattern.highFrequencyProblems.map((prob, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[var(--color-creme-latte)] font-medium"
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
