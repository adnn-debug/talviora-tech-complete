"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Github,
  Award,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { industryProjectsList } from "@/lib/career-data";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(industryProjectsList[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <FolderGit2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Proof-of-Work Architecture Lab
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Industry Project Lab
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Production-grade systems designed to demonstrate senior engineering rigor during technical screens.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2 shadow-xs"
        >
          <Award className="w-4 h-4" />
          <span>Publish to Portfolio</span>
        </Link>
      </div>

      {/* Project Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {industryProjectsList.map((p) => {
          const isSelected = activeProject.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? "bg-white dark:bg-zinc-900 border-[#c58b94] ring-2 ring-[#c58b94]/30 shadow-md"
                  : "bg-zinc-50/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {p.difficulty} • ~{p.estimatedHours}h
              </span>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-1">
                {p.title}
              </h2>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                {p.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Project Full Specification */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#c58b94] dark:text-[#d8a0ab]">
                {activeProject.architectureDiagramType}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {activeProject.title}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {activeProject.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeProject.githubTemplateUrl && (
              <a
                href={activeProject.githubTemplateUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Starter</span>
              </a>
            )}
            {activeProject.liveDemoUrl && (
              <a
                href={activeProject.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold transition flex items-center gap-2"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Production Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {activeProject.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architectural Overview */}
        <div className="p-5 rounded-2xl bg-[#111010] text-white border border-zinc-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#d8a0ab] block">
            System Architecture Overview
          </span>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {activeProject.architecturalOverview}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block">
            Verification Deliverables Checklist
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeProject.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-start gap-2.5 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Rubric */}
        <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block">
            Senior Defense Rubric Criteria
          </span>
          <div className="space-y-2">
            {activeProject.rubricCriteria.map((criterion, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-rose-50/20 dark:bg-rose-950/10 border border-rose-200/40 dark:border-rose-900/30 text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#c58b94] shrink-0" />
                <span>{criterion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
