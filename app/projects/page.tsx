"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  CheckCircle2,
  ExternalLink,
  Github,
  Award,
  ShieldCheck,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { industryProjectsList } from "@/lib/career-data";

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(industryProjectsList[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <FolderGit2 className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Build Real Projects • Hands-On Lab
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-4xl font-bold text-[var(--color-burgundy)] tracking-tight">
            Build Real Projects (Industry Project Lab)
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 mt-1 max-w-2xl leading-relaxed font-medium">
            Step-by-step, real-world systems you can build and showcase to demonstrate engineering rigor during technical screens.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="btn-burgundy px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Award className="w-4 h-4 text-[var(--color-warm-ivory)]" />
          <span>Publish to Portfolio</span>
        </Link>
      </div>

      {/* Project Selection Tabs (Level 2 Content Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {industryProjectsList.map((p) => {
          const isSelected = activeProject.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-2 border-[var(--color-burgundy)] shadow-xs ring-1 ring-[rgba(var(--color-dusty-rose-rgb),0.5)]"
                  : "bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] text-[var(--color-burgundy)]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${
                    isSelected
                      ? "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.2)]"
                      : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.15)]"
                  }`}
                >
                  {p.difficulty} • ~{p.estimatedHours}h
                </span>
                {isSelected && (
                  <span className="text-[10px] font-bold text-[var(--color-burgundy)] uppercase tracking-wider flex items-center gap-1">
                    <span>Active</span>
                    <ChevronRight className="w-3 h-3 text-[var(--color-burgundy)]" />
                  </span>
                )}
              </div>

              <h2
                className="text-sm font-display-serif font-bold mt-2.5 line-clamp-1 text-[var(--color-burgundy)]"
              >
                {p.title}
              </h2>
              <p
                className="text-xs mt-1.5 line-clamp-2 leading-relaxed text-[var(--color-burgundy)]/80 font-normal"
              >
                {p.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Project Full Specification (Structured Multi-Level Panel) */}
      <div className="card-coffee p-6 sm:p-8 space-y-7 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)]">
        {/* Title, Category & Direct Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pb-5 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
                {activeProject.architectureDiagramType}
              </span>
              <span className="text-[var(--color-flowering-chestnut)] font-bold">•</span>
              <span className="text-xs text-[var(--color-burgundy)]/75 font-medium">
                Estimated Scope: {activeProject.estimatedHours} Hours
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display-serif font-bold text-[var(--color-burgundy)] tracking-tight">
              {activeProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
              {activeProject.tagline}
            </p>
          </div>

          {/* GitHub Starter & Live Demo Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {activeProject.githubTemplateUrl && (
              <a
                href={activeProject.githubTemplateUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary-coffee px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs"
              >
                <Github className="w-4 h-4 text-[var(--color-burgundy)]" />
                <span>GitHub Starter</span>
              </a>
            )}
            {activeProject.liveDemoUrl && (
              <a
                href={activeProject.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-burgundy px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--color-warm-ivory)]" />
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
            Production Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {activeProject.techStack.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono-code font-medium px-3 py-1 rounded-lg bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architectural Overview (Powder Blush Highlight Panel) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--color-burgundy)]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              System Architecture Overview
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-burgundy)] leading-relaxed font-normal">
            {activeProject.architecturalOverview}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
            Verification Deliverables Checklist
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeProject.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)] bg-[var(--color-warm-ivory)] flex items-start gap-3 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[var(--color-burgundy)] shrink-0 mt-0.5" />
                <span className="text-[var(--color-burgundy)] font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Rubric */}
        <div className="space-y-3 pt-4 border-t border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
            Senior Defense Rubric Criteria
          </span>
          <div className="space-y-2.5">
            {activeProject.rubricCriteria.map((criterion, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs text-[var(--color-burgundy)] flex items-center gap-3"
              >
                <ShieldCheck className="w-4 h-4 text-[var(--color-flowering-chestnut)] shrink-0" />
                <span className="leading-relaxed font-medium">{criterion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
