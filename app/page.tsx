"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Search,
  Code2,
  CheckCircle2,
  Layers,
  Compass,
  BookOpen,
  Terminal,
  Layout,
  Database,
  Cpu,
  FolderGit2,
  MessageSquareCode,
  KanbanSquare,
  Award,
  RotateCcw,
  X,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Quote,
  Filter,
  Check,
  Zap,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
} from "lucide-react";

import {
  CATALOGUE_ITEMS,
  CATALOGUE_CATEGORIES,
  CatalogueItem,
} from "@/lib/catalogue-data";

// Curated tasteful motivational quotes (Section B)
const MOTIVATIONAL_QUOTES = [
  {
    quote: "Every expert was once a beginner. The key is taking the very first step.",
    author: "Helen Hayes",
    context: "On learning new disciplines",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    context: "On momentum and progress",
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
    context: "On taking action",
  },
  {
    quote: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
    context: "On knowledge and empowerment",
  },
  {
    quote: "Small consistent steps every day add up to extraordinary long-term transformations.",
    author: "Technology Mindset",
    context: "On daily deliberate practice",
  },
  {
    quote: "Code is not about memorization; it is about learning how to solve real problems.",
    author: "Engineering Principle",
    context: "On practical building",
  },
];

// 7-Stage How It Works Workflow (Section E)
const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    title: "Explore",
    desc: "Browse 30 tech fields, discover salaries, and understand real tools without confusion.",
    icon: Compass,
    href: "#catalogue-section",
  },
  {
    num: "02",
    title: "Choose Your Interest",
    desc: "Pick the domain that sparks your curiosity—AI, Web, Data, Cloud, or Systems.",
    icon: Layers,
    href: "#catalogue-section",
  },
  {
    num: "03",
    title: "Get Your Plan",
    desc: "Receive an adaptive roadmap calibrated to your weekly time and personal pace.",
    icon: GraduationCap,
    href: "/roadmap",
  },
  {
    num: "04",
    title: "Learn",
    desc: "Master bite-sized concepts explained in plain language with zero gatekeeping.",
    icon: BookOpen,
    href: "/learning",
  },
  {
    num: "05",
    title: "Practise",
    desc: "Edit and run real code immediately in browser 'Try It Yourself' sandboxes.",
    icon: Code2,
    href: "/learning",
  },
  {
    num: "06",
    title: "Build Projects",
    desc: "Construct portfolio-ready applications using structured milestone guides.",
    icon: FolderGit2,
    href: "/projects",
  },
  {
    num: "07",
    title: "Track Progress",
    desc: "Measure verified skills, complete sprint tasks, and practise mock interviews.",
    icon: Award,
    href: "/analytics",
  },
];

// Major Platform Capabilities Preview (Section F)
const PLATFORM_CAPABILITIES = [
  {
    title: "Your Step-by-Step Plan",
    badge: "Learning Roadmap",
    desc: "A personalized, step-by-step curriculum that automatically adjusts based on your weekly study hours.",
    href: "/roadmap",
    icon: Compass,
  },
  {
    title: "Interactive Learning Studio",
    badge: "Try It Yourself",
    desc: "Step-by-step beginner tutorials with instant in-browser code execution sandboxes.",
    href: "/learning",
    icon: Code2,
  },
  {
    title: "Build Real Projects",
    badge: "Project Lab",
    desc: "Hands-on project briefs with scaffolded starter code, requirements, and guided milestones.",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Your AI Learning Guide & Interview Simulator",
    badge: "AI Guidance",
    desc: "Role-based technical interview practice with non-judgmental evaluations and improvement feedback.",
    href: "/simulator",
    icon: MessageSquareCode,
  },
  {
    title: "Sprint Kanban & Accountability",
    badge: "Daily Tasks",
    desc: "Manage daily tasks and weekly learning sprints with supportive, guilt-free progress tracking.",
    href: "/sprint-planner",
    icon: KanbanSquare,
  },
  {
    title: "Proof-of-Work Portfolio & Progress",
    badge: "Your Progress",
    desc: "Showcase completed projects, demonstrated skills, and verified badges to mentors and employers.",
    href: "/portfolio",
    icon: Award,
  },
];

export default function Home() {
  // Quote rotation state (Section B)
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Set initial random quote on client mount
  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setQuoteIndex(randomIdx);
  }, []);

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  // Catalogue state (Section D)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("talviora_home_bookmarks");
      if (saved) setBookmarkedIds(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("talviora_home_bookmarks", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Filter catalogue items (all 30 items)
  const filteredItems = useMemo(() => {
    return CATALOGUE_ITEMS.filter((item) => {
      // Search match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.plainLanguageSummary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.subcategory.toLowerCase().includes(query) ||
        item.careerRoles.some((r) => r.toLowerCase().includes(query));

      // Category match
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      // Difficulty match
      const matchesDifficulty = selectedDifficulty === "All" || item.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Extract distinct categories present in the 30 catalogue entries
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    CATALOGUE_ITEMS.forEach((it) => set.add(it.category));
    return Array.from(set);
  }, []);

  const activeQuote = MOTIVATIONAL_QUOTES[quoteIndex] || MOTIVATIONAL_QUOTES[0];

  return (
    <div className="mx-auto max-w-6xl space-y-16 animate-in fade-in duration-300">
      {/* -------------------------------------------------------------------------- */}
      {/* A. A CLEAR, WELCOMING OVERVIEW                                             */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-creme-latte)] via-[var(--color-warm-ivory)] to-[var(--surface-rose)] border border-[rgba(var(--color-burgundy-rgb),0.15)] p-8 sm:p-12 lg:p-16 shadow-xs">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
            <span>Welcome to TALVIORA TECH</span>
          </div>

          <h1 className="font-display-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-burgundy)] leading-[1.08] tracking-tight">
            Learn Tech Your Way.
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-burgundy)]/85 leading-relaxed font-normal max-w-2xl">
            Discover what interests you, learn step by step, practise with real examples, and build projects at your own pace. You don&apos;t need previous technical knowledge to begin.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#start-cta"
              className="btn-burgundy px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-xs flex items-center gap-2"
            >
              <span>Start My Journey</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-warm-ivory)]" />
            </a>

            <a
              href="#catalogue-section"
              className="px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition flex items-center gap-2 shadow-2xs"
            >
              <Layers className="w-4 h-4" />
              <span>Explore All Tech Fields</span>
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* B. SHORT MOTIVATIONAL SECTION (ONE TASTEFUL ROTATING QUOTE)                */}
      {/* -------------------------------------------------------------------------- */}
      <section className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.12)] bg-[var(--color-creme-latte)]/70 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-3xl">
            <span className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] shrink-0 border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
              <Quote className="w-4 h-4" />
            </span>
            <div className="space-y-1">
              <blockquote className="font-display-serif text-base sm:text-lg italic text-[var(--color-burgundy)] leading-snug">
                &ldquo;{activeQuote.quote}&rdquo;
              </blockquote>
              <div className="text-xs text-[var(--color-burgundy)]/75 flex items-center gap-2">
                <span className="font-bold text-[var(--color-burgundy)]">{activeQuote.author}</span>
                <span>•</span>
                <span>{activeQuote.context}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNextQuote}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] text-xs font-semibold transition shrink-0 cursor-pointer shadow-2xs"
            title="Read another quote"
            aria-label="Rotate motivational quote"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Next quote</span>
          </button>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* C. A CLEAR CALL TO ACTION                                                  */}
      {/* -------------------------------------------------------------------------- */}
      <section
        id="start-cta"
        className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-gradient-to-r from-[var(--surface-rose)]/90 to-[var(--color-warm-ivory)] p-8 sm:p-10 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)] inline-block">
            Your First Step
          </span>
          <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            Ready to start your tech journey?
          </h2>
          <p className="text-sm text-[var(--color-burgundy)]/85 leading-relaxed">
            Choose what interests you. We&apos;ll help you decide what to learn first.
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-3">
          <a
            href="#catalogue-section"
            className="btn-burgundy px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <span>Yes, Let&apos;s Start</span>
            <ArrowRight className="w-4 h-4 text-[var(--color-warm-ivory)]" />
          </a>

          <Link
            href="/learning"
            className="px-5 py-3.5 rounded-xl font-bold text-sm tracking-wide border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition flex items-center gap-2 shadow-2xs"
          >
            <Code2 className="w-4 h-4" />
            <span>Try It Yourself (Sandbox)</span>
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* D. SEARCHABLE & FILTERABLE TECHNOLOGY CATALOGUE (ALL 30 ENTRIES)           */}
      {/* -------------------------------------------------------------------------- */}
      <section id="catalogue-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                Interactive Technology Catalogue
              </span>
            </div>
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
              Explore 30 Core Technologies
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1 max-w-xl">
              Search by skill name, role, or concept. Filter by difficulty or category to find your ideal starting point.
            </p>
          </div>

          <div className="text-xs font-mono-code font-bold text-[var(--color-burgundy)]/80 bg-[var(--surface-rose)]/60 px-3 py-1.5 rounded-xl border border-[rgba(var(--color-dusty-rose-rgb),0.4)] shrink-0">
            Showing {filteredItems.length} of {CATALOGUE_ITEMS.length} technologies
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-3.5 shadow-2xs">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-burgundy)]/60" />
              <input
                type="text"
                placeholder="Search Python, React, SQL, Gemini, Docker, Security..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs font-medium text-[var(--color-burgundy)] placeholder-[var(--color-burgundy)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-burgundy)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-burgundy)]/60 hover:text-[var(--color-burgundy)]"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs"
                      : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.12)] hover:bg-[var(--surface-rose)]"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                  : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.12)] hover:bg-[var(--surface-rose)]"
              }`}
            >
              All Categories ({CATALOGUE_ITEMS.length})
            </button>

            {availableCategories.map((cat) => {
              const count = CATALOGUE_ITEMS.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg shrink-0 font-semibold transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                      : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.12)] hover:bg-[var(--surface-rose)]"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 30 Catalogue Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              const isSandboxSupported = ["lang-python", "lang-sql", "front-react", "front-tailwind", "ai-gemini-sdk"].includes(item.id);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] p-5 space-y-3.5 shadow-2xs hover:shadow-xs hover:border-[var(--color-burgundy)] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Card Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.4)] truncate">
                        {item.category}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                          item.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800 border border-green-300 dark:bg-green-950 dark:text-green-300"
                            : item.difficulty === "Intermediate"
                            ? "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    {/* 1. Name of the field or technology */}
                    <h3 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)] group-hover:text-[var(--color-burgundy)] transition-colors">
                      {item.name}
                    </h3>

                    {/* 2. One- or two-sentence beginner-friendly explanation */}
                    <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
                      {item.plainLanguageSummary}
                    </p>

                    {/* 3. What a learner can create or accomplish with it */}
                    <div className="p-2.5 rounded-xl bg-[var(--color-creme-latte)]/70 border border-[rgba(var(--color-burgundy-rgb),0.08)] text-[11px] text-[var(--color-burgundy)] space-y-0.5">
                      <span className="font-bold block text-[10px] uppercase tracking-wider text-[var(--color-burgundy)]/75">
                        What you can create:
                      </span>
                      <p className="leading-relaxed text-[var(--color-burgundy)]/90">
                        {item.purpose}
                      </p>
                    </div>

                    {/* 4. Recommended prerequisites, if any */}
                    <div className="text-[11px] text-[var(--color-burgundy)]/85 space-y-1">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--color-burgundy)]/75 block">
                        Recommended Prerequisites:
                      </span>
                      {item.prerequisites.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {item.prerequisites.slice(0, 3).map((pre, pidx) => (
                            <span key={pidx} className="px-1.5 py-0.5 rounded bg-[var(--surface-rose)] text-[10px] font-semibold text-[var(--color-burgundy)]">
                              {pre}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] font-medium text-emerald-800 dark:text-emerald-300">
                          None • Complete beginner friendly
                        </span>
                      )}
                    </div>

                    {/* 5. Example projects */}
                    {item.projectIdeas && item.projectIdeas.length > 0 && (
                      <div className="text-[11px] text-[var(--color-burgundy)]/85 space-y-1">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--color-burgundy)]/75 block">
                          Example Project:
                        </span>
                        <div className="p-2 rounded-lg bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.08)]">
                          <strong className="text-[10px] text-[var(--color-burgundy)] block font-semibold truncate">
                            💡 {item.projectIdeas[0].title}
                          </strong>
                          <p className="text-[10px] text-[var(--color-burgundy)]/75 line-clamp-1 mt-0.5">
                            {item.projectIdeas[0].description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* 6. Common career or practical uses */}
                    <div className="space-y-1">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-[var(--color-burgundy)]/75 block">
                        Common Career Uses:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.careerRoles.slice(0, 3).map((role, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-creme-latte)]/80 text-[var(--color-burgundy)] font-medium"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Non-blocking advanced topic guidance */}
                    {item.difficulty === "Advanced" && (
                      <div className="p-2 rounded-lg bg-[var(--surface-rose)]/60 border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-[10px] text-[var(--color-burgundy)] leading-tight">
                        <span className="font-bold">⚡ Advanced Topic:</span> Prerequisites recommended, but you are free to explore anytime!
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.1)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* 7. Clear "Explore This Field" action */}
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="btn-burgundy px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <span>Explore This Field</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-1.5 rounded-xl border transition cursor-pointer ${
                          isBookmarked
                            ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                            : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)]/70 border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--surface-rose)]"
                        }`}
                        title={isBookmarked ? "Saved in bookmarks" : "Save bookmark"}
                        aria-label="Bookmark technology"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {isSandboxSupported && (
                      <Link
                        href="/learning"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--color-burgundy)] hover:underline shrink-0"
                      >
                        <span>Try in Sandbox</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-3">
            <Layers className="w-8 h-8 text-[var(--color-burgundy)]/50 mx-auto" />
            <h3 className="font-bold text-sm text-[var(--color-burgundy)]">No technologies found</h3>
            <p className="text-xs text-[var(--color-burgundy)]/75 max-w-sm mx-auto">
              No entries matched your search query. Try searching for a broader term like &quot;Python&quot;, &quot;Web&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedDifficulty("All");
              }}
              className="px-4 py-2 rounded-xl btn-burgundy text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-xs font-bold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] shadow-2xs transition"
          >
            <span>Open Dedicated Technology Catalogue Directory (with 6 Learning Pathways)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Detail Modal for Selected Technology */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.2)] shadow-xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-[var(--color-creme-latte)] border-b border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                    {selectedItem.category}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)]">
                    {selectedItem.difficulty}
                  </span>
                </div>
                <h3 className="font-display-serif text-2xl font-bold text-[var(--color-burgundy)]">
                  {selectedItem.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-[var(--color-burgundy)]">
              {/* Advanced Technology Guidance Callout (Non-blocking) */}
              {selectedItem.difficulty === "Advanced" && (
                <div className="p-4 rounded-2xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-xs text-[var(--color-burgundy)]">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-burgundy)]" />
                    <span>Advanced Technology • Direct Learning Permitted</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[var(--color-burgundy)]/90">
                    You can explore and study {selectedItem.name} right now without restriction! To build strong foundations, we recommend exploring prerequisite topics first:{" "}
                    <strong>{selectedItem.prerequisites.length > 0 ? selectedItem.prerequisites.join(", ") : "General programming foundations"}</strong>. Your choice is never blocked.
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/75 mb-1">
                  Plain-Language Summary
                </h4>
                <p className="leading-relaxed text-[var(--color-burgundy)]/90 text-sm">
                  {selectedItem.plainLanguageSummary}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/75 mb-1">
                  Core Purpose & Importance
                </h4>
                <p className="leading-relaxed text-[var(--color-burgundy)]/85">
                  {selectedItem.purpose}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[var(--color-creme-latte)] space-y-1">
                  <span className="font-bold text-[10px] uppercase text-[var(--color-burgundy)]/75">
                    Real-World Applications
                  </span>
                  <ul className="space-y-1 pt-1">
                    {selectedItem.realWorldApplications.slice(0, 3).map((app, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[var(--color-burgundy)] shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--color-creme-latte)] space-y-1">
                  <span className="font-bold text-[10px] uppercase text-[var(--color-burgundy)]/75">
                    Career Roles
                  </span>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedItem.careerRoles.map((role, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[10px] font-semibold">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedItem.projectIdeas.length > 0 && (
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/75 mb-1.5">
                    Recommended Hands-on Project
                  </h4>
                  <div className="p-3.5 rounded-xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-dusty-rose-rgb),0.5)] space-y-1">
                    <span className="font-bold text-xs">{selectedItem.projectIdeas[0].title}</span>
                    <p className="text-[11px] text-[var(--color-burgundy)]/85">{selectedItem.projectIdeas[0].description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[var(--color-creme-latte)] border-t border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-center justify-between gap-3">
              <a
                href={selectedItem.officialDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-burgundy)] hover:underline"
              >
                <span>Official Documentation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <Link
                  href="/learning"
                  className="px-4 py-2 rounded-xl btn-burgundy text-xs font-bold shadow-2xs"
                >
                  Start Practicing
                </Link>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-3.5 py-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* E. HOW TALVIORA WORKS: 7-STEP PROGRESSION                                   */}
      {/* -------------------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
            Clear, Predictable Progression
          </span>
          <h2 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
            How TALVIORA Works
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80">
            From curious beginner to confident builder through seven simple, connected stages:
          </p>
          <div className="font-mono-code text-[11px] font-bold text-[var(--color-burgundy)] bg-[var(--surface-rose)]/70 py-1.5 px-3 rounded-full inline-block border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
            Explore → Choose Your Interest → Get Your Plan → Learn → Practise → Build Projects → Track Progress
          </div>
        </div>

        {/* 7-Step Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {HOW_IT_WORKS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] font-bold text-[var(--color-dusty-rose)]">
                      {step.num}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-[var(--color-burgundy)]/70" />
                  </div>
                  <h3 className="font-bold text-xs text-[var(--color-burgundy)] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* F. SHORT PREVIEW OF MAJOR PLATFORM CAPABILITIES                            */}
      {/* -------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Core Ecosystem
            </span>
            <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)] mt-0.5">
              Major Platform Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1">
              Everything you need to plan, learn, code, and prove your capabilities in one integrated platform.
            </p>
          </div>

          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-burgundy)] hover:underline shrink-0"
          >
            <span>View All 31 Features Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORM_CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.title}
                href={cap.href}
                className="p-5 rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[var(--color-burgundy)] hover:shadow-xs transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.4)]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.1)]">
                    {cap.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--color-burgundy)] group-hover:text-[var(--color-burgundy)] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
                  {cap.desc}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[var(--color-burgundy)]">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
