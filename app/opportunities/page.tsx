"use client";

import { useState } from "react";
import {
  Compass,
  ExternalLink,
  Calendar,
  Building2,
  Sparkles,
  ShieldCheck,
  Tag,
  Search,
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  category: "AI Model News" | "Government Tech" | "Internships & Jobs" | "Free Course Finder";
  organization: string;
  date: string;
  verifiedSourceUrl: string;
  summary: string;
  eligibility: string;
  isFreeOrFunded: boolean;
}

export default function OpportunitiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const opportunities: Opportunity[] = [
    {
      id: "opp-1",
      title: "Google Gemini 1.5 Pro & Flash Context Window Expansion",
      category: "AI Model News",
      organization: "Google DeepMind & AI Studio",
      date: "Verified October 2026",
      verifiedSourceUrl: "https://ai.google.dev",
      summary: "Production release of 2M token context window, structured JSON schemas, and improved audio processing for multimodal agents.",
      eligibility: "Developers globally with free tier API access via Google AI Studio.",
      isFreeOrFunded: true,
    },
    {
      id: "opp-2",
      title: "Public Sector AI & Cloud Infrastructure Fellowships",
      category: "Government Tech",
      organization: "National Informatics & Digital Innovation Board",
      date: "Active Recruitment 2026",
      verifiedSourceUrl: "https://digital.gov",
      summary: "Direct government recruitment for cloud solutions architects and AI engineers to modernize citizen data pipelines.",
      eligibility: "Computer Science graduates and engineers with 0-3 years experience.",
      isFreeOrFunded: true,
    },
    {
      id: "opp-3",
      title: "Linux Foundation & PyTorch Open-Source Contribution Sprint",
      category: "Internships & Jobs",
      organization: "PyTorch Foundation / Linux Foundation",
      date: "Rolling Application",
      verifiedSourceUrl: "https://pytorch.org",
      summary: "Mentored open-source engineering program contributing to core PyTorch autograd and tensor operator libraries.",
      eligibility: "Open globally to Python & C++ developers. Stipends available for selected fellows.",
      isFreeOrFunded: true,
    },
    {
      id: "opp-4",
      title: "Stanford CS229: Machine Learning Full Lecture & Lab Course",
      category: "Free Course Finder",
      organization: "Stanford University Open Learning",
      date: "Continuously Verified",
      verifiedSourceUrl: "https://cs229.stanford.edu",
      summary: "Complete university syllabus, problem sets, and lecture materials covering supervised learning, SVMs, and neural networks.",
      eligibility: "100% Free and public access with no subscription required.",
      isFreeOrFunded: true,
    },
  ];

  const categories = ["All", "AI Model News", "Government Tech", "Internships & Jobs", "Free Course Finder"];

  const filtered = opportunities.filter(
    (o) => activeFilter === "All" || o.category === activeFilter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC]">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
              Trust-Verified Intelligence
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            News, Opportunities & Resource Finder
          </h1>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-0.5">
            Verified AI model releases, official government technology notices, and curated 100% free learning resources.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeFilter === c
                ? "btn-burgundy shadow-xs"
                : "border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="card-coffee p-6 space-y-4 hover:border-[#C58F98] transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#6F1737] dark:text-[#F0C4CC] border border-[#B59A83]/30">
                  {opp.category}
                </span>
                <span className="text-xs text-[#7E6962] dark:text-zinc-500 font-medium">
                  {opp.organization}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#7E6962] dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {opp.date}
                </span>
                {opp.isFreeOrFunded && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#96977A]/15 text-[#96977A]">
                    ✓ Free / Funded
                  </span>
                )}
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-[#241A1A] dark:text-[#FFF9F0]">
              {opp.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 leading-relaxed">
              {opp.summary}
            </p>

            <div className="p-3 rounded-xl bg-[#FFF9F0] dark:bg-[#1F1515] border border-[#B59A83]/30 text-xs text-[#4A3A37] dark:text-zinc-400">
              <strong className="text-[#241A1A] dark:text-[#FFF9F0]">Eligibility & Details:</strong> {opp.eligibility}
            </div>

            <div className="pt-2 flex justify-end">
              <a
                href={opp.verifiedSourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] hover:underline flex items-center gap-1.5"
              >
                <span>Visit Verified Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
