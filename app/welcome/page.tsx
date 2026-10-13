"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Compass,
  Layers,
  Route,
  FolderGit2,
  Award,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Code2,
  FileText,
  MessageSquareCode,
  Zap,
} from "lucide-react";

export default function WelcomePage() {
  const learningStages = [
    { step: "01", title: "DISCOVER", subtitle: "Self-assessment", desc: "Answer technical questions and request AI feedback on those responses." },
    { step: "02", title: "UNDERSTAND", subtitle: "Deep Principles", desc: "Master architectural fundamentals and systems thinking." },
    { step: "03", title: "PRACTISE", subtitle: "Hands-on Code", desc: "Solve algorithmic patterns and debug intentional code flaws." },
    { step: "04", title: "BUILD", subtitle: "Production Projects", desc: "Construct enterprise RAG, streaming, and distributed apps." },
    { step: "05", title: "PROVE", subtitle: "Public Profile", desc: "Share profile fields you choose. Repositories and credentials are not independently verified." },
    { step: "06", title: "EXPLORE", subtitle: "Career Preparation", desc: "Browse role examples and practise interviews. No live opportunities feed is connected." },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-creme-latte)] via-[var(--color-warm-ivory)] to-[var(--surface-rose)] border border-[rgba(var(--color-burgundy-rgb),0.15)] p-8 sm:p-12 lg:p-16 shadow-sm">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
            <span>Autonomous Career Intelligence & Learning Ecosystem</span>
          </div>

          <h1 className="title-hero-editorial font-bold text-[var(--color-burgundy)] tracking-tight leading-[1.08]">
            Master Technology. <br />
            <span className="font-serif italic font-normal text-[var(--color-dusty-rose)]">
              Prove What You Build.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-burgundy)]/85 max-w-2xl leading-relaxed font-normal">
            TALVIORA TECH brings learning exercises and career-preparation tools together.
            AI feedback and account features require service configuration; current market and opportunity feeds are not connected.
          </p>

          {/* Free Learning Manifesto Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-burgundy)]">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[var(--color-dusty-rose)]" />
            <span>Preview workspace • Add your own profile details • Configure account and AI services for personal features</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/assessment"
              className="btn-burgundy px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-sm flex items-center gap-2"
            >
              <BrainCircuit className="w-4 h-4 text-[var(--color-warm-ivory)]" />
              <span>Launch AI Diagnostic Assessment</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-warm-ivory)]" />
            </Link>

            <Link
              href="/"
              className="btn-secondary-coffee px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition flex items-center gap-2 shadow-xs"
            >
              <span>Explore Learner Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6-Stage Learning Cycle Strip */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
            The Core Learning Cycle
          </span>
          <h2 className="title-section-editorial font-bold text-[var(--color-burgundy)]">
            From Fundamentals to Industry Impact
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/75">
            A cohesive educational framework ensuring you never memorize in a vacuum.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {learningStages.map((stage) => (
            <div
              key={stage.step}
              className="card-coffee p-4 space-y-2 border border-[rgba(var(--color-burgundy-rgb),0.14)] border-t-4 border-t-[var(--color-burgundy)] bg-[var(--color-warm-ivory)] shadow-xs"
            >
              <span className="font-mono-code font-bold text-xs text-[var(--color-dusty-rose)]">
                {stage.step}
              </span>
              <h3 className="font-bold text-sm text-[var(--color-burgundy)] tracking-wide">
                {stage.title}
              </h3>
              <p className="text-[10px] uppercase font-bold text-[var(--color-burgundy)]/70">
                {stage.subtitle}
              </p>
              <p className="text-xs text-[var(--color-burgundy)]/85 leading-snug">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Interactive Product Previews */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Skill Mastery & Alignment
            </span>
            <h2 className="title-section-editorial font-bold text-[var(--color-burgundy)]">
            Review Skills From Your Assessment Responses
            </h2>
            <p className="text-sm text-[var(--color-burgundy)]/85 leading-relaxed">
              The assessment maps selected answers to skill topics, then can ask Gemini for learning feedback. It does not compare you with external industry standards.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-burgundy)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[var(--color-burgundy)]">Practice Suggestions:</strong>
                <p className="text-xs text-[var(--color-burgundy)]/75">Use assessment feedback and the general practice prompts to plan what you want to study.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-burgundy)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs text-[var(--color-burgundy)]">Clear Result Limits:</strong>
                <p className="text-xs text-[var(--color-burgundy)]/75">Scores reflect submitted quiz choices, not hiring readiness or a sourced benchmark.</p>
              </div>
            </div>
          </div>

          <Link
            href="/skill-gap"
            className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline"
          >
            <span>Explore the Skill Gap Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-6 card-coffee p-8 flex flex-col items-center justify-center bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
          <div className="max-w-md rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-6 text-center text-sm leading-relaxed text-[var(--text-secondary)]">No sample competency chart is shown. Complete an assessment to get feedback based on your answers.</div>
        </div>
      </section>

      {/* 6 Core Pillars Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <h2 className="title-section-editorial font-bold text-[var(--color-burgundy)]">
            The 6 Pillars of TALVIORA TECH
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/75">
            A unified suite designed for students, universities, recruiters, and engineering professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <Route className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Learning Roadmap</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              An example learning sequence with checkpoints saved in this browser. The plan is not personalized and pacing is not recorded.
            </p>
            <Link href="/roadmap" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              View Roadmaps →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Production Project Lab</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Example briefs for hybrid RAG pipelines, streaming feature stores, and distributed workers.
            </p>
            <Link href="/projects" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              Browse Project Lab →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Market Intelligence & Trends</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Salary ranges, job counts, and regional market data are unavailable until a sourced feed is connected.
            </p>
            <Link href="/market" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              Inspect Market Trends →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Technical Interview Simulator</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Scenario-based architectural and algorithmic prompts evaluated in real time by Gemini AI with constructive critique.
            </p>
            <Link href="/simulator" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              Launch Interview Prep →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Resume Editor & Keyword Check</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Edit your own resume text and check for terms you provide. No ATS score is generated and no achievements are invented.
            </p>
            <Link href="/resume" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              Optimize Resume →
            </Link>
          </div>

          <div className="card-coffee p-6 space-y-3 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] transition-all">
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="title-card-editorial font-bold text-[var(--color-burgundy)]">Shareable Public Profiles</h3>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Share profile information you choose to publish. Independent credential and project verification is not connected.
            </p>
            <Link href="/portfolio" className="text-xs font-semibold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline block pt-2">
              View Portfolio Engine →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
