"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  BrainCircuit,
  BookOpenCheck,
  ClipboardList,
  BriefcaseBusiness,
  Activity,
  CircleUserRound,
  Terminal,
  Layout,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  RotateCcw,
  Compass,
  FolderGit2,
  Award,
  Zap,
  GraduationCap,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Code2,
} from "lucide-react";

import InteractiveCodeSandbox from "@/components/InteractiveCodeSandbox";

interface TechDomain {
  id: string;
  title: string;
  badge: string;
  icon: any;
  tagline: string;
  description: string;
  startingPoint: string;
  timeCommitment: string;
  starterHref: string;
  colorHex: string;
  whatYouWillBuild: string[];
}

const TECH_DOMAINS: TechDomain[] = [
  {
    id: "ai",
    title: "Artificial Intelligence & Generative AI",
    badge: "Most Popular in 2026",
    icon: Cpu,
    tagline: "From basic Python syntax to building your own intelligent AI agents.",
    description: "You don't need advanced math to start. We begin with plain-English Python syntax, prompt engineering principles, and connecting to the Google Gemini API.",
    startingPoint: "Python Chapter 1: Syntax & Output",
    timeCommitment: "5 mins to first script",
    starterHref: "/learning",
    colorHex: "#914955",
    whatYouWillBuild: ["Automated Career Assistant", "Prompt Translation Pipeline", "Resume Skill Extractor"],
  },
  {
    id: "web",
    title: "Web & Frontend Development",
    badge: "Most Visual",
    icon: Layout,
    tagline: "Build interactive websites and applications that people see and touch.",
    description: "Learn how the internet is made: HTML5 layout structures, modern CSS styling with Flexbox, and JavaScript for interactive button clicks and calculations.",
    startingPoint: "Web Dev Chapter 1: HTML5 Elements",
    timeCommitment: "6 mins to first live page",
    starterHref: "/learning",
    colorHex: "#DAA2A1",
    whatYouWillBuild: ["Interactive Portfolio Card", "Dynamic Salary Calculator", "Responsive Product Landing Page"],
  },
  {
    id: "data",
    title: "Data Science & SQL Databases",
    badge: "High Industry Demand",
    icon: Database,
    tagline: "Query databases, find insights, and turn raw tables into smart decisions.",
    description: "Every modern company runs on data. Master Structured Query Language (SQL) to filter millions of customer records, find top performers, and calculate growth.",
    startingPoint: "SQL Chapter 1: The SELECT Statement",
    timeCommitment: "6 mins to first query",
    starterHref: "/learning",
    colorHex: "#F8DEDC",
    whatYouWillBuild: ["Candidate Leaderboard Query", "Executive Revenue Filter", "Salary Distribution Breakdown"],
  },
  {
    id: "backend",
    title: "Backend APIs & System Architecture",
    badge: "Core Engineering",
    icon: Terminal,
    tagline: "Understand the engine room: servers, databases, and secure APIs.",
    description: "Discover how web applications communicate behind the scenes, how authentication works, and how distributed systems stay reliable under heavy user traffic.",
    startingPoint: "System Architecture & API Blueprints",
    timeCommitment: "10 mins overview",
    starterHref: "/architecture",
    colorHex: "#EEE8DC",
    whatYouWillBuild: ["RESTful API Handler", "Authentication Pipeline", "Distributed Cache Architecture"],
  },
];

const workspaceAreas = [
  { title: "Adaptive Assessment", description: "Complete a diagnostic assessment to receive an AI-tailored skills evaluation.", href: "/assessment", icon: BrainCircuit },
  { title: "Personalised Roadmap", description: "Follow your deterministic prerequisite roadmap tailored to your weekly study hours.", href: "/roadmap", icon: BookOpenCheck },
  { title: "Interview Simulator", description: "Practise technical interview questions with instant AI feedback and rubrics.", href: "/simulator", icon: ClipboardList },
  { title: "Market & Career Tools", description: "Explore verified career pathways, regional salary insights, and role matrices.", href: "/career-match", icon: BriefcaseBusiness },
];

export default function Home() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>("ai");
  const activeDomain = TECH_DOMAINS.find((d) => d.id === selectedDomainId) || TECH_DOMAINS[0];

  return (
    <div className="mx-auto max-w-6xl space-y-12 animate-in fade-in duration-300">
      {/* -------------------------------------------------------------------------- */}
      {/* 1. THE 5-SECOND CLARITY HERO SECTION                                       */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-creme-latte)] via-[var(--color-warm-ivory)] to-[var(--surface-rose)] border border-[rgba(var(--color-burgundy-rgb),0.15)] p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="max-w-4xl space-y-6">
          {/* Platform Identity Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
            <span>TALVIORA TECH • The Beginner-First Technology Platform</span>
          </div>

          {/* Value Headline */}
          <div>
            <h1 className="font-display-serif text-3xl sm:text-5xl font-bold text-[var(--color-burgundy)] leading-[1.12]">
              Start Your Technology Journey. <br />
              <span className="font-serif italic font-normal text-[var(--color-dusty-rose)]">
                Learn simply. Build real things.
              </span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[var(--color-burgundy)]/85 max-w-2xl leading-relaxed">
              TALVIORA TECH is a free, beginner-first learning platform that guides you step-by-step from zero coding experience into practical AI, web, and software careers.
            </p>
          </div>

          {/* The 3 Core Answers (Immediate Comprehension in 5 Seconds) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/90 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                1. What TALVIORA Does
              </span>
              <p className="text-xs text-[var(--color-burgundy)] font-medium leading-snug">
                Teaches technology from scratch with interactive browser sandboxes and AI mentoring.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/90 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                2. Who It Is For
              </span>
              <p className="text-xs text-[var(--color-burgundy)] font-medium leading-snug">
                Complete beginners, career switchers, and students with zero prior programming experience.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/90 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                3. How It Helps You
              </span>
              <p className="text-xs text-[var(--color-burgundy)] font-medium leading-snug">
                No complex software to install. Plain-English tutorials. Instant "Try It Yourself" editor.
              </p>
            </div>
          </div>

          {/* Action Call-to-Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/learning"
              className="btn-burgundy px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition shadow-xs flex items-center gap-2"
            >
              <Code2 className="w-4 h-4 text-[var(--color-warm-ivory)]" />
              <span>Start First Lesson (Try It Yourself)</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-warm-ivory)]" />
            </Link>

            <Link
              href="/catalogue"
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition flex items-center gap-2 shadow-2xs"
            >
              <Layers className="w-4 h-4" />
              <span>Explore 52+ Tech Fields (Catalogue)</span>
            </Link>

            <Link
              href="/assessment"
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--surface-rose)]/60 text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition flex items-center gap-2 shadow-2xs"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Take 2-Min Diagnostic</span>
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 2. CHOOSE YOUR AREA OF INTEREST (INTERACTIVE DOMAIN SELECTOR)              */}
      {/* -------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Step 1: Choose Your Direction
              </span>
            </div>
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
              Where would you like to start?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1">
              Select any technology domain below to see what you will learn, what you will build, and how to start today.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-burgundy)] hover:underline shrink-0"
          >
            <span>See all 18 tech categories in Catalogue</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {TECH_DOMAINS.map((domain) => {
            const isSelected = domain.id === selectedDomainId;
            const Icon = domain.icon;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomainId(domain.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[var(--surface-rose)] border-[var(--color-burgundy)] shadow-xs ring-1 ring-[var(--color-burgundy)]"
                    : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.12)] hover:border-[var(--color-dusty-rose)] hover:bg-[var(--surface-rose)]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="p-2 rounded-xl bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    {domain.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--color-burgundy)] leading-tight">
                  {domain.title}
                </h3>
                <p className="text-[11px] text-[var(--color-burgundy)]/75 mt-1 line-clamp-2 leading-relaxed">
                  {domain.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Spotlight Card */}
        <div className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-warm-ivory)] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
                  Selected Pathway Spotlight
                </span>
                <span className="text-xs font-mono-code text-[var(--color-burgundy)]/75">
                  Beginner Friendly • No Prerequisites
                </span>
              </div>
              <h3 className="font-display-serif text-2xl font-bold text-[var(--color-burgundy)]">
                {activeDomain.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed">
                {activeDomain.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <Link
                href={activeDomain.starterHref}
                className="btn-burgundy px-5 py-3 rounded-xl font-bold text-xs tracking-wide text-center flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Begin This Learning Path</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-warm-ivory)]" />
              </Link>
              <div className="text-center text-[10px] font-mono-code text-[var(--color-burgundy)]/70">
                Pacing: {activeDomain.timeCommitment}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-[var(--color-creme-latte)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                First Lesson You Will Take
              </span>
              <p className="text-xs font-bold text-[var(--color-burgundy)]">
                {activeDomain.startingPoint}
              </p>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-2xl bg-[var(--color-creme-latte)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                Practical Real Projects You Build
              </span>
              <ul className="text-xs text-[var(--color-burgundy)] space-y-0.5">
                {activeDomain.whatYouWillBuild.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[var(--color-burgundy)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 p-3.5 rounded-2xl bg-[var(--color-creme-latte)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                Career Roles You Prepare For
              </span>
              <p className="text-xs font-semibold text-[var(--color-burgundy)] leading-relaxed">
                Junior Developer, AI Solutions Specialist, Automation Engineer, Data Assistant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 3. LIVE "TRY IT RIGHT NOW" INSTANT BROWSER SANDBOX                         */}
      {/* -------------------------------------------------------------------------- */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                <Play className="w-4 h-4 fill-current" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Step 2: Try It In Your Browser
              </span>
            </div>
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
              Write & Run Your First Code in 3 Seconds
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-0.5">
              No downloads or command lines required. Edit the code below and click <span className="font-bold underline">Run Code</span>.
            </p>
          </div>

          <Link
            href="/learning"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-burgundy)] hover:underline shrink-0"
          >
            <span>Open Full Interactive Learning Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <InteractiveCodeSandbox
          initialCode={`# Your very first line of code on TALVIORA TECH
learner_name = "Future Tech Builder"
career_goal = "AI Solutions Specialist"

print("Welcome to technology,", learner_name)
print("Target Role:", career_goal)
print("Readiness: 100% ready to learn!")`}
          language="python"
          goal="Change learner_name to your own name, change career_goal to your dream role, and click 'Run Code'!"
          title="Interactive Homepage Sandbox — W3Schools Style"
          height="220px"
        />
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 4. HOW IT WORKS: 4 SIMPLE STEPS TO YOUR TECH CAREER                        */}
      {/* -------------------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)]/80 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
            A Clear, Non-Intimidating Pathway
          </span>
          <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            How TALVIORA Helps You Go from Beginner to Builder
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80">
            Four sequential stages designed so you never get lost, overwhelmed, or stuck memorizing in isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2.5 shadow-2xs">
            <span className="text-xs font-mono-code font-bold text-[var(--color-dusty-rose)] block">
              STAGE 01
            </span>
            <h3 className="font-bold text-sm text-[var(--color-burgundy)]">
              Choose & Diagnose
            </h3>
            <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
              Pick a domain of interest or take our 2-minute diagnostic to reveal your strengths and get a custom roadmap.
            </p>
            <Link href="/assessment" className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline inline-flex items-center gap-1 pt-1">
              Take Diagnostic &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2.5 shadow-2xs">
            <span className="text-xs font-mono-code font-bold text-[var(--color-dusty-rose)] block">
              STAGE 02
            </span>
            <h3 className="font-bold text-sm text-[var(--color-burgundy)]">
              Learn in Sandboxes
            </h3>
            <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
              Master bite-sized tutorials with instant "Try It Yourself" browser sandboxes, chapter quizzes, and zero gatekeeping.
            </p>
            <Link href="/learning" className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline inline-flex items-center gap-1 pt-1">
              Explore Lessons &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2.5 shadow-2xs">
            <span className="text-xs font-mono-code font-bold text-[var(--color-dusty-rose)] block">
              STAGE 03
            </span>
            <h3 className="font-bold text-sm text-[var(--color-burgundy)]">
              Build Real Projects
            </h3>
            <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
              Apply what you learn to real-world projects with guided milestone checklists and architectural blueprints.
            </p>
            <Link href="/projects" className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline inline-flex items-center gap-1 pt-1">
              Project Studio &rarr;
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2.5 shadow-2xs">
            <span className="text-xs font-mono-code font-bold text-[var(--color-dusty-rose)] block">
              STAGE 04
            </span>
            <h3 className="font-bold text-sm text-[var(--color-burgundy)]">
              Prove & Launch
            </h3>
            <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
              Practise mock interviews with AI evaluators, track your readiness score, and publish your proof-of-work portfolio.
            </p>
            <Link href="/portfolio" className="text-[11px] font-bold text-[var(--color-burgundy)] hover:underline inline-flex items-center gap-1 pt-1">
              View Portfolio &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* 5. CORE WORKSPACE & RETURNING LEARNER DASHBOARD (PRESERVED)                */}
      {/* -------------------------------------------------------------------------- */}
      <section className="space-y-6 pt-4 border-t border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-burgundy)]">
              Learner Workspace & Tools
            </p>
            <h2 className="mt-1 font-display-serif text-2xl sm:text-3xl font-bold text-[var(--heading-primary)]">
              Your Personal Career Workspace
            </h2>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
              Quick access to your assessment telemetry, adaptive roadmaps, sprint tasks, and interview simulator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/auth"
              className="btn-burgundy inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold shadow-xs"
            >
              <span>Sign in</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-panel)] bg-[var(--bg-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
            >
              <span>All 31 Features</span>
            </Link>
          </div>
        </div>

        {/* Workspace Areas Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workspaceAreas.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--border-accent)] hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.4)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/70 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              <h3 className="font-semibold text-sm text-[var(--heading-secondary)]">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">{description}</p>
            </Link>
          ))}
        </div>

        {/* Workspace Status & Settings Banner */}
        <div className="rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-[var(--shadow-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] shrink-0">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[var(--color-burgundy)]">Workspace Session Status</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Complete learning lessons or assessments to save personal telemetry and unlock verified badges.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-panel)] bg-[var(--bg-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
            >
              <CircleUserRound className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Profile settings</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
