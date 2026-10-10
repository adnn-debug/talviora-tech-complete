"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Globe2,
  Briefcase,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import BarChart from "@/components/BarChart";
import { marketTrendsList } from "@/lib/career-data";

export default function MarketPage() {
  const [selectedGeo, setSelectedGeo] = useState("Global / Remote");

  const barChartItems = marketTrendsList.map((m) => ({
    label: m.role,
    value: m.medianSalaryUSD,
    maxValue: 220000,
    subtext: `$${(m.medianSalaryUSD / 1000).toFixed(0)}k Median`,
    color: "#c58b94",
  }));

  const totalOpenPostings = marketTrendsList.reduce((acc, curr) => acc + curr.openPostingsCount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Live Tech Market Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Market Analytics & Salary Trends
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Aggregated hiring velocity, compensation percentiles, and emerging technical skill demand.
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-zinc-400" />
          <select
            value={selectedGeo}
            onChange={(e) => setSelectedGeo(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none"
          >
            <option value="Global / Remote">Global / Remote</option>
            <option value="US Tech Hubs (SF/NY/SEA)">US Tech Hubs (SF/NY/SEA)</option>
            <option value="Europe (London/Berlin)">Europe (London/Berlin)</option>
            <option value="Asia Pacific">Asia Pacific</option>
          </select>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="card-luxury p-5 space-y-1.5">
          <span className="text-xs font-semibold text-zinc-500 uppercase">Tracked Tech Postings</span>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-100">
            {totalOpenPostings.toLocaleString()}+
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28.4% hiring demand YoY
          </p>
        </div>

        <div className="card-luxury p-5 space-y-1.5">
          <span className="text-xs font-semibold text-zinc-500 uppercase">Top Paying Field</span>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-[#843e4b] dark:text-[#d8a0ab]">
            Quantitative Dev
          </div>
          <p className="text-[11px] text-zinc-500">
            Median: $184,000 (Top percentiles exceed $225k+)
          </p>
        </div>

        <div className="card-luxury p-5 space-y-1.5">
          <span className="text-xs font-semibold text-zinc-500 uppercase">Fastest Growth Sector</span>
          <div className="font-serif-luxury text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400">
            AI Architectures
          </div>
          <p className="text-[11px] text-zinc-500">
            +34.2% annual growth driven by enterprise RAG & agent adoption
          </p>
        </div>
      </div>

      {/* Salary Distribution Visual Bar Chart */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Median Annual Compensation Comparison (USD)
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Filtered for {selectedGeo} across core engineering tracks
            </p>
          </div>
          <span className="text-xs font-mono-code text-zinc-400">Source: Q4 Tech Index</span>
        </div>

        <BarChart items={barChartItems} />
      </div>

      {/* Detailed Roles Table */}
      <div className="card-luxury overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Role Velocity & In-Demand Skills Breakdown
          </h2>
          <span className="text-xs text-zinc-500 font-medium">5 Core Roles Analyzed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Role Title</th>
                <th className="p-4">Compensation Band</th>
                <th className="p-4">YoY Growth</th>
                <th className="p-4">Open Roles</th>
                <th className="p-4">Remote %</th>
                <th className="p-4">Highest Demand Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {marketTrendsList.map((m, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="p-4 font-bold text-zinc-900 dark:text-zinc-100">
                    {m.role}
                  </td>
                  <td className="p-4 font-mono-code font-semibold text-[#843e4b] dark:text-[#d8a0ab]">
                    {m.salaryRange}
                  </td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">
                    +{m.yoyGrowthPct}%
                  </td>
                  <td className="p-4 font-mono-code text-zinc-600 dark:text-zinc-400">
                    {m.openPostingsCount.toLocaleString()}
                  </td>
                  <td className="p-4 text-zinc-600 dark:text-zinc-400">
                    {m.remoteFriendlyPct}%
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {m.topSkillsInDemand.slice(0, 3).map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
