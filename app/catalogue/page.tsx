"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Search,
  Sparkles,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Smartphone,
  Palette,
  Cloud,
  ShieldAlert,
  BarChart3,
  Gamepad2,
  Radio,
  Terminal,
  Briefcase,
  Workflow,
  GraduationCap,
  Flame,
  CheckCircle2,
  ExternalLink,
  Clock,
  BookOpen,
  Filter,
  X,
  ChevronRight,
  RotateCcw,
  Compass,
  FolderGit2,
  SlidersHorizontal,
  AlertCircle,
  Check,
  HelpCircle,
} from "lucide-react";

import {
  CATALOGUE_CATEGORIES,
  CATALOGUE_ITEMS,
  LEARNING_PATHWAYS,
  SIDE_HUSTLE_SERVICES,
  GOVERNMENT_CAREER_PATHS,
  WIZARD_QUESTIONS,
  RECOMMENDATION_BLUEPRINTS,
  CatalogueItem,
  CatalogueCategory,
  LearningPathway,
  SideHustleService,
  WizardRecommendation,
} from "@/lib/catalogue-data";
import { fetchWithAuth } from "@/lib/api-client";

// Helper map for category icons
const CATEGORY_ICON_MAP: Record<string, any> = {
  Code2,
  Layout,
  Server,
  Database,
  Cpu,
  Smartphone,
  Palette,
  Cloud,
  ShieldAlert,
  BarChart3,
  Gamepad2,
  Radio,
  Sparkles,
  Terminal,
  Briefcase,
  Workflow,
  GraduationCap,
  Flame,
};

type ActiveTab = "directory" | "pathways" | "sidehustles" | "govtech" | "trends";

export default function CompleteCataloguePage() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<ActiveTab>("directory");

  // Directory filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyAi, setOnlyAi] = useState(false);
  const [onlySideHustle, setOnlySideHustle] = useState(false);
  const [sortBy, setSortBy] = useState<"relevance" | "name" | "diff-asc" | "diff-desc">("relevance");

  // Detail Modal state
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | null>(null);

  // Help Me Choose Wizard state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [wizardResult, setWizardResult] = useState<WizardRecommendation | null>(null);

  // Bookmarks state (with localStorage sync + API sync)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved bookmarks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("talviora_bookmarked_tools");
      if (stored) {
        setBookmarkedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load bookmarks from localStorage", e);
    }

    // Attempt background sync from /api/bookmarks
    fetchWithAuth("/api/bookmarks")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.bookmarks && Array.isArray(data.bookmarks)) {
          const idsFromDb = data.bookmarks.map((b: any) => b.item_id);
          if (idsFromDb.length > 0) {
            setBookmarkedIds((prev) => {
              const merged = Array.from(new Set([...prev, ...idsFromDb]));
              localStorage.setItem("talviora_bookmarked_tools", JSON.stringify(merged));
              return merged;
            });
          }
        }
      })
      .catch(() => {
        // graceful offline fallback
      });
  }, []);

  // Show temporary toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle bookmark handler
  const handleToggleBookmark = async (item: CatalogueItem) => {
    const isBookmarked = bookmarkedIds.includes(item.id);
    const newBookmarked = isBookmarked
      ? bookmarkedIds.filter((id) => id !== item.id)
      : [...bookmarkedIds, item.id];

    setBookmarkedIds(newBookmarked);
    try {
      localStorage.setItem("talviora_bookmarked_tools", JSON.stringify(newBookmarked));
    } catch {}

    triggerToast(isBookmarked ? `Removed ${item.name} from this browser's saved list.` : `Added ${item.name} to this browser's saved list.`);

    // Sync with API
    try {
      if (isBookmarked) {
        const response = await fetchWithAuth(`/api/bookmarks?item_id=${encodeURIComponent(item.id)}&item_type=resource`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok && data?.error) triggerToast(`${data.error} Browser copy retained.`);
      } else {
        const response = await fetchWithAuth("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_id: item.id,
            title: item.name,
            item_type: "resource",
            metadata: {
              category: item.category,
              difficulty: item.difficulty,
              purpose: item.purpose,
            },
          }),
        });
        const data = await response.json();
        if (response.ok && data.persisted) triggerToast(`Saved ${item.name} to your account.`);
        else if (data?.error) triggerToast(`${data.error} Browser copy retained.`);
      }
    } catch {
      triggerToast("Account sync is unavailable. Browser copy retained.");
    }
  };

  // Dynamically calculate metrics directly from datasets
  const metrics = useMemo(() => {
    const totalTechnologies = CATALOGUE_ITEMS.length;
    const totalCategories = CATALOGUE_CATEGORIES.length;
    const totalPathways = LEARNING_PATHWAYS.length;

    // Count all distinct project ideas across all tools + pathways
    const toolProjectsCount = CATALOGUE_ITEMS.reduce(
      (acc, curr) => acc + curr.projectIdeas.length,
      0
    );
    const pathwayProjectsCount = LEARNING_PATHWAYS.reduce(
      (acc, curr) => acc + curr.sequence.length + 2, // sequence deliverables + starter + capstone
      0
    );
    const totalProjects = toolProjectsCount + pathwayProjectsCount;
    const totalSideHustles = SIDE_HUSTLE_SERVICES.length;

    return {
      totalTechnologies,
      totalCategories,
      totalPathways,
      totalProjects,
      totalSideHustles,
    };
  }, []);

  // Filter & Search directory items
  const filteredItems = useMemo(() => {
    return CATALOGUE_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "All" && item.difficulty !== selectedDifficulty) {
        return false;
      }

      // Toggles
      if (onlyFree && !item.isFreeOrOpenSource) return false;
      if (onlyAi && !item.isAiRelated) return false;
      if (onlySideHustle && !item.sideHustleApplicable) return false;

      // Full text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesSubcat = item.subcategory.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesPlain = item.plainLanguageSummary.toLowerCase().includes(query);
        const matchesPurpose = item.purpose.toLowerCase().includes(query);
        const matchesPrereq = item.prerequisites.some((p) => p.toLowerCase().includes(query));
        const matchesRoles = item.careerRoles.some((r) => r.toLowerCase().includes(query));
        const matchesUseCases = item.sideHustleUseCases.some((u) => u.toLowerCase().includes(query));

        if (
          !matchesName &&
          !matchesCat &&
          !matchesSubcat &&
          !matchesDesc &&
          !matchesPlain &&
          !matchesPurpose &&
          !matchesPrereq &&
          !matchesRoles &&
          !matchesUseCases
        ) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "diff-asc") {
        const order: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return (order[a.difficulty] || 0) - (order[b.difficulty] || 0);
      }
      if (sortBy === "diff-desc") {
        const order: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return (order[b.difficulty] || 0) - (order[a.difficulty] || 0);
      }
      return 0; // relevance
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    onlyFree,
    onlyAi,
    onlySideHustle,
    sortBy,
  ]);

  // Has any filter active
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All" ||
    onlyFree ||
    onlyAi ||
    onlySideHustle;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setOnlyFree(false);
    setOnlyAi(false);
    setOnlySideHustle(false);
    setSortBy("relevance");
  };

  // Quick Discovery Actions
  const handleQuickAction = (action: string) => {
    if (action === "programming") {
      setActiveTab("directory");
      setSelectedCategory("Programming Languages");
      setSearchQuery("");
    } else if (action === "ai") {
      setActiveTab("directory");
      setSelectedCategory("Artificial Intelligence, Machine Learning & Generative AI");
      setSearchQuery("");
    } else if (action === "web") {
      setActiveTab("directory");
      setSelectedCategory("Frontend Development");
      setSearchQuery("");
    } else if (action === "cyber") {
      setActiveTab("directory");
      setSelectedCategory("Cybersecurity & Ethical Security Testing");
      setSearchQuery("");
    } else if (action === "cloud") {
      setActiveTab("directory");
      setSelectedCategory("Cloud Computing, DevOps & Deployment");
      setSearchQuery("");
    } else if (action === "sidehustles") {
      setActiveTab("sidehustles");
    } else if (action === "wizard") {
      setWizardOpen(true);
      setWizardStep(0);
      setWizardResult(null);
    }
  };

  // Wizard answer selection
  const handleWizardAnswer = (questionId: string, optionId: string) => {
    const updated = { ...wizardAnswers, [questionId]: optionId };
    setWizardAnswers(updated);

    if (wizardStep < WIZARD_QUESTIONS.length - 1) {
      setWizardStep((prev) => prev + 1);
    } else {
      // Calculate final recommendation
      const interestKey = updated["interest"] || "ai";
      const recommendation =
        RECOMMENDATION_BLUEPRINTS[interestKey] || RECOMMENDATION_BLUEPRINTS["ai"];
      setWizardResult(recommendation);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] px-4 py-3 rounded-xl shadow-lg border border-[var(--color-dusty-rose)]/40 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 text-xs font-semibold">
          <BookmarkCheck className="w-4 h-4 text-[var(--surface-rose)]" />
          <span>{toastMessage}</span>
          <Link
            href="/bookmarks"
            className="ml-2 underline text-[var(--surface-rose)] hover:text-[var(--color-warm-ivory)]"
          >
            View Bookmarks
          </Link>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-creme-latte)] via-[var(--color-warm-ivory)] to-[var(--surface-rose)] border border-[rgba(var(--color-burgundy-rgb),0.18)] p-6 sm:p-10 shadow-xs">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-warm-ivory)]/80 border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[11px] font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
            <Layers className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
            <span>The Complete Tech Skills & Tools Catalogue</span>
          </div>

          <h1 className="font-display-serif text-3xl sm:text-5xl font-bold text-[var(--color-burgundy)] tracking-tight leading-tight">
            Explore the possibilities. Discover your path. Build what comes next.
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-burgundy)]/85 leading-relaxed font-normal max-w-3xl">
            Explore programming languages, AI, software engineering, cloud infrastructure, creative technology, professional tools, and technology-based business opportunities. Find a direction that fits your interests, goals, and current skill level.
          </p>

          {/* Real Dynamically Calculated Catalogue Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-burgundy)] block font-display-serif">
                {metrics.totalTechnologies}
              </span>
              <span className="text-[11px] font-semibold text-[var(--color-burgundy)]/80 uppercase tracking-wider">
                Listed Technologies & Tools
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-burgundy)] block font-display-serif">
                {metrics.totalCategories}
              </span>
              <span className="text-[11px] font-semibold text-[var(--color-burgundy)]/80 uppercase tracking-wider">
                Skill Categories Covered
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-burgundy)] block font-display-serif">
                {metrics.totalPathways}
              </span>
              <span className="text-[11px] font-semibold text-[var(--color-burgundy)]/80 uppercase tracking-wider">
                Guided Learning Pathways
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[var(--color-warm-ivory)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
              <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-burgundy)] block font-display-serif">
                {metrics.totalProjects}+
              </span>
              <span className="text-[11px] font-semibold text-[var(--color-burgundy)]/80 uppercase tracking-wider">
                Project-Based Learning Ideas
              </span>
            </div>
          </div>

          {/* Quick Discovery Actions */}
          <div className="pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 mb-2">
              Quick Discovery Actions:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleQuickAction("programming")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore Programming
              </button>
              <button
                onClick={() => handleQuickAction("ai")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore AI & Machine Learning
              </button>
              <button
                onClick={() => handleQuickAction("web")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore Web Development
              </button>
              <button
                onClick={() => handleQuickAction("cyber")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore Cybersecurity
              </button>
              <button
                onClick={() => handleQuickAction("cloud")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore Cloud & DevOps
              </button>
              <button
                onClick={() => handleQuickAction("sidehustles")}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                Explore Tech Side Hustles
              </button>
              <button
                onClick={() => handleQuickAction("wizard")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:bg-[var(--color-flowering-chestnut)] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[var(--surface-rose)]" />
                <span>Help Me Choose</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] px-4 py-3 text-xs leading-relaxed text-[var(--text-primary)]" role="note">
        <strong className="text-[var(--color-burgundy)]">Reference catalogue.</strong> Entries, pricing notes, eligibility details, and links are bundled examples. Sources and freshness have not been independently checked; confirm details with the provider before relying on them.
      </aside>

      {/* ========================================================================= */}
      {/* 2. NAVIGATION TABS                                                        */}
      {/* ========================================================================= */}
      <div className="flex border-b border-[rgba(var(--color-burgundy-rgb),0.18)] gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer ${
            activeTab === "directory"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)]"
              : "border-transparent text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] hover:bg-[var(--color-creme-latte)]/50"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Technology & Tools Directory ({metrics.totalTechnologies})</span>
        </button>

        <button
          onClick={() => setActiveTab("pathways")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer ${
            activeTab === "pathways"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)]"
              : "border-transparent text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] hover:bg-[var(--color-creme-latte)]/50"
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>Learning Pathways ({metrics.totalPathways})</span>
        </button>

        <button
          onClick={() => setActiveTab("sidehustles")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer ${
            activeTab === "sidehustles"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)]"
              : "border-transparent text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] hover:bg-[var(--color-creme-latte)]/50"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Tech Side Hustles & Services ({metrics.totalSideHustles})</span>
        </button>

        <button
          onClick={() => setActiveTab("govtech")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer ${
            activeTab === "govtech"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)]"
              : "border-transparent text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] hover:bg-[var(--color-creme-latte)]/50"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Government Tech & Certifications</span>
        </button>

        <button
          onClick={() => setActiveTab("trends")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition border-b-2 cursor-pointer ${
            activeTab === "trends"
              ? "border-[var(--color-burgundy)] text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)]"
              : "border-transparent text-[var(--color-burgundy)]/70 hover:text-[var(--color-burgundy)] hover:bg-[var(--color-creme-latte)]/50"
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>News & Emerging Intelligence</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAB 1: COMPLETE TECHNOLOGY DIRECTORY                                   */}
      {/* ========================================================================= */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--color-burgundy)]/60 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search languages, technologies, tools, careers, or side hustles..."
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[rgba(var(--color-burgundy-rgb),0.2)] text-[var(--color-burgundy)] placeholder:text-[var(--color-burgundy)]/50 focus:outline-none focus:border-[var(--color-burgundy)] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-[var(--color-burgundy)]/60 hover:text-[var(--color-burgundy)] p-0.5 rounded cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Difficulty Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[var(--color-burgundy)]/70 uppercase">
                    Difficulty:
                  </span>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] text-xs font-semibold cursor-pointer"
                  >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Free / Open Source Toggle */}
                <button
                  onClick={() => setOnlyFree(!onlyFree)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    onlyFree
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                      : "bg-[var(--color-creme-latte)]/60 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.18)] hover:bg-[var(--color-creme-latte)]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free / Open Source</span>
                </button>

                {/* AI-Related Toggle */}
                <button
                  onClick={() => setOnlyAi(!onlyAi)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    onlyAi
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                      : "bg-[var(--color-creme-latte)]/60 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.18)] hover:bg-[var(--color-creme-latte)]"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI & LLM Tools</span>
                </button>

                {/* Side Hustle Toggle */}
                <button
                  onClick={() => setOnlySideHustle(!onlySideHustle)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
                    onlySideHustle
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                      : "bg-[var(--color-creme-latte)]/60 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.18)] hover:bg-[var(--color-creme-latte)]"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Side-Hustle Applicable</span>
                </button>
              </div>

              {/* Sorting and Clear */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[11px] font-bold text-[var(--color-burgundy)]/70 uppercase">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-[var(--color-burgundy)] text-xs font-semibold cursor-pointer"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="diff-asc">Difficulty (Low to High)</option>
                    <option value="diff-desc">Difficulty (High to Low)</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[var(--color-burgundy)] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills (All 18 Categories) */}
            <div className="pt-2 border-t border-[rgba(var(--color-burgundy-rgb),0.1)]">
              <div className="text-[11px] font-bold text-[var(--color-burgundy)]/70 uppercase mb-2">
                Filter by Category ({CATALOGUE_CATEGORIES.length} Categories):
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedCategory === "All"
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                      : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                  }`}
                >
                  All ({metrics.totalTechnologies})
                </button>
                {CATALOGUE_CATEGORIES.map((cat) => {
                  const count = CATALOGUE_ITEMS.filter(
                    (item) => item.category === cat.name
                  ).length;
                  const Icon = CATEGORY_ICON_MAP[cat.iconName] || Layers;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                        selectedCategory === cat.name
                          ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                          : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{cat.shortName}</span>
                      {count > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[var(--color-warm-ivory)]/40 font-bold">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Count Status */}
          <div className="flex items-center justify-between text-xs text-[var(--color-burgundy)]/80 px-1">
            <span>
              Showing <strong className="text-[var(--color-burgundy)] font-bold">{filteredItems.length}</strong> of {metrics.totalTechnologies} listed technologies
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] bg-[var(--surface-rose)] px-2 py-0.5 rounded-md font-semibold text-[var(--color-burgundy)]">
                Filters active
              </span>
            )}
          </div>

          {/* Technology Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-[var(--color-warm-ivory)] rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-3">
              <AlertCircle className="w-10 h-10 text-[var(--color-burgundy)]/40 mx-auto" />
              <h3 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)]">
                No matching technologies or tools found
              </h3>
              <p className="text-xs text-[var(--color-burgundy)]/70 max-w-md mx-auto">
                We couldn&apos;t find any records matching your search &apos;{searchQuery}&apos; and current filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:bg-[var(--color-flowering-chestnut)] transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => {
                const isSaved = bookmarkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:border-[var(--color-dusty-rose)] shadow-xs hover:shadow-sm transition flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 text-[10px] mb-2.5">
                        <span className="font-bold uppercase px-2 py-0.5 rounded-md bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.1)] truncate max-w-[180px]">
                          {item.subcategory}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold uppercase text-[9px] ${
                              item.difficulty === "Beginner"
                                ? "bg-[#A1A18A]/20 text-[#676750]"
                                : item.difficulty === "Intermediate"
                                ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)]"
                                : "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                            }`}
                          >
                            {item.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Tool Title & Bookmark Toggle */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)] leading-snug">
                          {item.name}
                        </h2>
                        <button
                          onClick={() => handleToggleBookmark(item)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 ${
                            isSaved
                              ? "bg-[var(--surface-rose)] border-[var(--color-dusty-rose)] text-[var(--color-burgundy)]"
                              : "bg-[var(--color-creme-latte)]/50 border-transparent text-[var(--color-burgundy)]/50 hover:text-[var(--color-burgundy)]"
                          }`}
                          title={isSaved ? "Saved to Bookmarks" : "Save to Bookmarks"}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                        </button>
                      </div>

                      {/* Plain-Language Explanation */}
                      <p className="text-xs text-[var(--color-burgundy)]/90 mt-2 leading-relaxed">
                        {item.plainLanguageSummary}
                      </p>

                      {/* Purpose */}
                      <div className="mt-3 p-2.5 rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[rgba(var(--color-burgundy-rgb),0.08)] text-[11px] text-[var(--color-burgundy)]/85">
                        <strong className="text-[var(--color-burgundy)] font-semibold">Core Use:</strong> {item.purpose}
                      </div>

                      {/* Suitable Roles */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.careerRoles.slice(0, 3).map((role, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-creme-latte)]/70 text-[var(--color-burgundy)] font-medium"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Metadata and Action */}
                    <div className="pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.1)] flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {item.isFreeOrOpenSource && (
                          <span className="text-[10px] font-bold text-[var(--color-burgundy)] bg-[var(--surface-rose)] px-1.5 py-0.5 rounded">
                            Free / OSS
                          </span>
                        )}
                        {item.sideHustleApplicable && (
                          <span className="text-[10px] font-bold text-[var(--color-burgundy)] bg-[var(--color-creme-latte)] px-1.5 py-0.5 rounded">
                            Side Hustle
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-xs font-bold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Inspect Blueprint</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 2: STRUCTURED LEARNING PATHWAYS                                    */}
      {/* ========================================================================= */}
      {activeTab === "pathways" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
            <h2 className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
              Structured Learning Pathways
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1 max-w-2xl">
              Practical pathways connecting skills and technologies into coherent, sequenced journeys. Each pathway is project-backed with verifiable deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {LEARNING_PATHWAYS.map((pathway) => (
              <div
                key={pathway.id}
                className="p-6 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs hover:border-[var(--color-dusty-rose)] transition space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold uppercase px-2.5 py-0.5 rounded-md bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]">
                      {pathway.category}
                    </span>
                    <span className="font-semibold text-[var(--color-burgundy)]/80 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {pathway.durationWeeks} Weeks • {pathway.difficulty}
                    </span>
                  </div>

                  <h3 className="font-display-serif text-xl font-bold text-[var(--color-burgundy)]">
                    {pathway.title}
                  </h3>

                  <p className="text-xs text-[var(--color-burgundy)]/85 mt-2 leading-relaxed">
                    {pathway.summary}
                  </p>
                </div>

                {/* Stepped Sequence */}
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                    Step-by-Step Curriculum Sequence:
                  </div>
                  <div className="space-y-2">
                    {pathway.sequence.map((step) => (
                      <div
                        key={step.step}
                        className="p-3 rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[rgba(var(--color-burgundy-rgb),0.1)] flex items-start gap-3 text-xs"
                      >
                        <span className="w-5 h-5 rounded-full bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {step.step}
                        </span>
                        <div className="space-y-1">
                          <strong className="text-[var(--color-burgundy)] font-semibold block">
                            {step.technology}
                          </strong>
                          <p className="text-[var(--color-burgundy)]/80 text-[11px]">{step.milestone}</p>
                          <div className="text-[10px] font-medium text-[var(--color-burgundy)] bg-[var(--color-creme-latte)] px-2 py-0.5 rounded inline-block">
                            Deliverable: {step.projectDeliverable}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Starter & Capstone Projects */}
                <div className="p-3.5 rounded-xl bg-[var(--color-creme-latte)]/50 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[var(--color-burgundy)] text-[11px] uppercase block">
                      Starter Project:
                    </span>
                    <span className="text-[var(--color-burgundy)]/85">{pathway.starterProject}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[var(--color-burgundy)] text-[11px] uppercase block">
                      Capstone Project:
                    </span>
                    <span className="text-[var(--color-burgundy)]/85">{pathway.capstoneProject}</span>
                  </div>
                </div>

                {/* Career Outcomes */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/60 mr-1">
                    Career Targets:
                  </span>
                  {pathway.careerOutcomes.map((career, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)]"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 3: TECHNOLOGY SIDE HUSTLES & INDEPENDENT SERVICES                  */}
      {/* ========================================================================= */}
      {activeTab === "sidehustles" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] text-[10px] font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Commercial Service Engineering</span>
            </div>
            <h2 className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
              Technology Side Hustles & Independent Services
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1 max-w-3xl leading-relaxed">
              Real-world blueprints for providing high-demand technical services to businesses. Each track includes client scoping, delivery checklists, ethical boundaries, and portfolio requirements. <em>Note: TALVIORA TECH does not promise or guarantee financial earnings or client acquisition.</em>
            </p>
          </div>

          <div className="space-y-6">
            {SIDE_HUSTLE_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]">
                      {service.category}
                    </span>
                    <h3 className="font-display-serif text-xl font-bold text-[var(--color-burgundy)] mt-1">
                      {service.title}
                    </h3>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] shrink-0">
                    Pricing Range: {service.pricingConcepts}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-3">
                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        What It Involves:
                      </strong>
                      <p className="text-[var(--color-burgundy)]/85 leading-relaxed">{service.whatItInvolves}</p>
                    </div>

                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Who Needs It (Target Clients):
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[var(--color-burgundy)]/85">
                        {service.targetClients.map((client, idx) => (
                          <li key={idx}>{client}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Beginner Starting Point:
                      </strong>
                      <p className="text-[var(--color-burgundy)]/85">{service.starterStartingPoint}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--color-creme-latte)]/40 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Practice Project:
                      </strong>
                      <p className="text-[var(--color-burgundy)]/85">{service.practiceProject}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Portfolio Evidence Required:
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[var(--color-burgundy)]/85">
                        {service.portfolioEvidence.map((ev, idx) => (
                          <li key={idx}>{ev}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Delivery Checklist:
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[var(--color-burgundy)]/85">
                        {service.deliveryChecklist.map((chk, idx) => (
                          <li key={idx}>{chk}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase tracking-wider mb-1">
                        Common Pitfalls to Avoid:
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[var(--color-burgundy)]/85">
                        {service.commonMistakes.map((mis, idx) => (
                          <li key={idx}>{mis}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-burgundy-rgb),0.1)] text-[11px]">
                      <strong className="text-[var(--color-burgundy)] font-semibold block uppercase tracking-wider mb-0.5">
                        Ethical Considerations:
                      </strong>
                      <p className="text-[var(--color-burgundy)]/85">{service.ethicalConsiderations}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 4: GOVERNMENT TECH & CERTIFICATIONS                                */}
      {/* ========================================================================= */}
      {activeTab === "govtech" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
            <h2 className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
              Government Technology Careers & Industry Certifications
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1 max-w-3xl leading-relaxed">
              Example public-sector career topics and credential paths. Current openings, eligibility, preparation access, and exam fees are not source-checked.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GOVERNMENT_CAREER_PATHS.map((gov) => (
              <div
                key={gov.id}
                className="p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]">
                    {gov.domain}
                  </span>

                  <h3 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)]">
                    {gov.title}
                  </h3>

                  <div className="text-xs space-y-1.5 text-[var(--color-burgundy)]/85">
                    <p>
                      <strong className="text-[var(--color-burgundy)]">Organisation:</strong> {gov.recruitingOrganisation}
                    </p>
                    <p>
                      <strong className="text-[var(--color-burgundy)]">Qualifications:</strong> {gov.qualification}
                    </p>
                    <p>
                      <strong className="text-[var(--color-burgundy)]">Eligibility:</strong> {gov.eligibility}
                    </p>
                  </div>

                  <div className="pt-2">
                    <strong className="text-[11px] font-bold text-[var(--color-burgundy)] uppercase block mb-1">
                      Recommended Credential Tracks:
                    </strong>
                    <div className="space-y-1.5">
                      {gov.certificationsRecommended.map((cert, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-[var(--color-warm-ivory)]/40 border border-[rgba(var(--color-burgundy-rgb),0.08)] text-[11px] space-y-0.5"
                        >
                          <div className="font-semibold text-[var(--color-burgundy)]">{cert.name}</div>
                          <div className="text-[10px] text-[var(--color-burgundy)]/70 flex items-center justify-between">
                            <span>{cert.provider}</span>
                            <span>Cost not checked</span>
                          </div>
                          <a
                            href={cert.freePrepUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-[var(--color-burgundy)] hover:underline flex items-center gap-1 mt-1"
                          >
                            <span>Provider page (not checked)</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.1)] flex items-center justify-between text-[11px]">
                  <span className="text-[var(--color-burgundy)]/60 text-[10px]">Source check: {gov.lastVerified}</span>
                  <a
                    href={gov.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[var(--color-burgundy)] hover:underline flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB 5: TECHNOLOGY NEWS & EMERGING INTELLIGENCE                         */}
      {/* ========================================================================= */}
      {activeTab === "trends" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
            <h2 className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
              Technology News, Emerging Tools & Demand Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/80 mt-1 max-w-2xl">
              Recent reporting is not connected. Bundled news examples are omitted until they can be tied to current sources and checked dates.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-[var(--border-panel)] bg-[var(--bg-surface)] p-8 text-sm leading-relaxed text-[var(--text-secondary)]">
            The bundled examples have no checked publication dates or source links, so no news claims are presented here. Connect a current, source-linked feed to publish updates.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. INTERACTIVE TECHNOLOGY DETAIL DRAWER / MODAL (FULL 18-POINT RUBRIC)     */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--color-warm-ivory)] rounded-3xl shadow-2xl border border-[rgba(var(--color-burgundy-rgb),0.25)] flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[var(--color-creme-latte)] border-b border-[rgba(var(--color-burgundy-rgb),0.18)] flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[10px] mb-1.5">
                  <span className="font-bold uppercase px-2.5 py-0.5 rounded-md bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)]">
                    {selectedItem.category}
                  </span>
                  <span className="font-bold px-2 py-0.5 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
                    {selectedItem.subcategory}
                  </span>
                  <span className="font-bold px-2 py-0.5 rounded-md bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]">
                    {selectedItem.difficulty}
                  </span>
                  <span className="text-[var(--color-burgundy)]/70 font-semibold">
                    Status: {selectedItem.verificationStatus}
                  </span>
                </div>
                <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
                  {selectedItem.name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleBookmark(selectedItem)}
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    bookmarkedIds.includes(selectedItem.id)
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                      : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.2)] hover:bg-[var(--surface-rose)]"
                  }`}
                  title="Bookmark Technology"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(selectedItem.id) ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.2)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body (All 18 Rubric Fields) */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[var(--color-burgundy)]/90">
              {/* 1 & 2. Plain Language & Purpose */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)]/50 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    In Simple Terms (Plain-Language):
                  </span>
                  <p className="leading-relaxed">{selectedItem.plainLanguageSummary}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)]/50 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    What It Is Used For:
                  </span>
                  <p className="leading-relaxed">{selectedItem.purpose}</p>
                </div>
              </div>

              {/* Technical Description */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                  Technical Architecture & Ecosystem:
                </span>
                <p className="leading-relaxed bg-[var(--color-warm-ivory)] p-3.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                  {selectedItem.description}
                </p>
              </div>

              {/* Real World Applications & Industries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Real-World Applications:
                  </span>
                  <ul className="list-disc list-inside space-y-1 bg-[var(--color-warm-ivory)] p-3.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    {selectedItem.realWorldApplications.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Industries Actively Using It:
                  </span>
                  <div className="flex flex-wrap gap-1.5 bg-[var(--color-warm-ivory)] p-3.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    {selectedItem.industries.map((ind, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-[var(--color-creme-latte)] font-semibold text-[11px] text-[var(--color-burgundy)]">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prerequisites & Related Tech */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Prerequisites (What to know first):
                  </span>
                  <div className="flex flex-wrap gap-1.5 bg-[var(--color-warm-ivory)] p-3 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    {selectedItem.prerequisites.map((pre, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[var(--surface-rose)] font-semibold text-[11px] text-[var(--color-burgundy)]">
                        {pre}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Related Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5 bg-[var(--color-warm-ivory)] p-3 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    {selectedItem.relatedTech.map((rel, idx) => {
                      const matchedItem = CATALOGUE_ITEMS.find(
                        (i) => i.name.toLowerCase().includes(rel.toLowerCase()) || rel.toLowerCase().includes(i.name.toLowerCase())
                      );
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (matchedItem) setSelectedItem(matchedItem);
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                            matchedItem
                              ? "bg-[var(--color-creme-latte)] hover:bg-[var(--color-burgundy)] hover:text-[var(--color-warm-ivory)] cursor-pointer"
                              : "bg-[var(--color-creme-latte)]/50 cursor-default"
                          }`}
                        >
                          {rel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3 Learning Stages */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                  3 Structured Learning Stages:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[var(--color-warm-ivory)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    <span className="font-bold text-[var(--color-burgundy)] block text-[11px] uppercase mb-1">
                      1. Beginner Milestone
                    </span>
                    <p className="text-[11px] leading-relaxed">{selectedItem.learningStages.beginner}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--color-warm-ivory)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    <span className="font-bold text-[var(--color-burgundy)] block text-[11px] uppercase mb-1">
                      2. Intermediate Milestone
                    </span>
                    <p className="text-[11px] leading-relaxed">{selectedItem.learningStages.intermediate}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--color-warm-ivory)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                    <span className="font-bold text-[var(--color-burgundy)] block text-[11px] uppercase mb-1">
                      3. Advanced Milestone
                    </span>
                    <p className="text-[11px] leading-relaxed">{selectedItem.learningStages.advanced}</p>
                  </div>
                </div>
              </div>

              {/* Recommended Learning Resources */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                  Recommended Learning Resources:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedItem.recommendedResources.map((res, idx) => (
                    <a
                      key={idx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:border-[var(--color-burgundy)] transition flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[var(--color-burgundy)] block text-xs">{res.title}</span>
                        <span className="text-[10px] text-[var(--color-burgundy)]/70">
                          {res.type} • Cost not checked
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--color-burgundy)]/70" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Guided Exercises */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                  Guided Practice Exercises:
                </span>
                <div className="space-y-1.5 bg-[var(--color-warm-ivory)] p-3.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                  {selectedItem.guidedExercises.map((ex, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Project Ideas */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                  Practical Project Ideas:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedItem.projectIdeas.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-1.5"
                    >
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]">
                        {proj.level}
                      </span>
                      <h4 className="font-bold text-[var(--color-burgundy)] text-xs">{proj.title}</h4>
                      <p className="text-[11px] leading-relaxed">{proj.description}</p>
                      <div className="text-[10px] font-semibold text-[var(--color-burgundy)] bg-[var(--color-warm-ivory)] p-1.5 rounded">
                        Deliverable: {proj.deliverables}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Interview Questions */}
              {selectedItem.interviewQuestions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Technical Interview Preparation:
                  </span>
                  <div className="space-y-2">
                    {selectedItem.interviewQuestions.map((iq, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[var(--color-creme-latte)]/40 border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-1"
                      >
                        <div className="font-bold text-[var(--color-burgundy)]">{iq.question}</div>
                        <div className="text-[11px] text-[var(--color-burgundy)]/80">
                          <strong className="text-[var(--color-burgundy)]">Core Concept:</strong> {iq.coreConcept}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Side Hustle & Commercial Applications */}
              {selectedItem.sideHustleApplicable && (
                <div className="p-4 rounded-2xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                    Related Side-Hustle Applications:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.sideHustleUseCases.map((sh, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.1)] text-[var(--color-burgundy)] font-semibold"
                      >
                        {sh}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Documentation */}
              <div className="p-3.5 rounded-xl bg-[var(--color-creme-latte)]/50 border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
                <div>
                  <strong className="text-[var(--color-burgundy)] font-semibold block">Pricing & Free-Tier Notes:</strong>
                  <span className="text-[var(--color-burgundy)]/80">{selectedItem.pricingNotes}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[var(--color-burgundy)]/60 block text-[10px]">Last Reviewed: {selectedItem.lastReviewedDate}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-[var(--color-creme-latte)] border-t border-[rgba(var(--color-burgundy-rgb),0.18)] flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => handleToggleBookmark(selectedItem)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  bookmarkedIds.includes(selectedItem.id)
                    ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                    : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.2)] hover:bg-[var(--surface-rose)]"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>
                  {bookmarkedIds.includes(selectedItem.id)
                    ? "Saved in Bookmarks"
                    : "Bookmark Technology"}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={selectedItem.officialDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.2)] hover:bg-[var(--surface-rose)] transition flex items-center gap-1.5"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:bg-[var(--color-flowering-chestnut)] transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. "HELP ME CHOOSE" INTERACTIVE DISCOVERY WIZARD MODAL                     */}
      {/* ========================================================================= */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[var(--color-warm-ivory)] rounded-3xl shadow-2xl border border-[rgba(var(--color-burgundy-rgb),0.25)] flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Wizard Header */}
            <div className="p-5 bg-[var(--color-creme-latte)] border-b border-[rgba(var(--color-burgundy-rgb),0.18)] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[var(--color-dusty-rose)]" />
                  <span>Interactive Career Discovery Wizard</span>
                </span>
                <h3 className="font-display-serif text-xl font-bold text-[var(--color-burgundy)]">
                  Help Me Choose My Starting Direction
                </h3>
              </div>
              <button
                onClick={() => setWizardOpen(false)}
                className="p-1.5 rounded-lg text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Wizard Body */}
            <div className="p-6">
              {!wizardResult ? (
                <div className="space-y-5">
                  {/* Progress Indicator */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-[var(--color-burgundy)]">
                      <span>
                        Question {wizardStep + 1} of {WIZARD_QUESTIONS.length}
                      </span>
                      <span>
                        {Math.round(((wizardStep + 1) / WIZARD_QUESTIONS.length) * 100)}% Completed
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--color-creme-latte)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--color-burgundy)] transition-all duration-300"
                        style={{
                          width: `${((wizardStep + 1) / WIZARD_QUESTIONS.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Title & Subtitle */}
                  <div>
                    <h4 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)]">
                      {WIZARD_QUESTIONS[wizardStep].title}
                    </h4>
                    <p className="text-xs text-[var(--color-burgundy)]/70 mt-1">
                      {WIZARD_QUESTIONS[wizardStep].subtitle}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {WIZARD_QUESTIONS[wizardStep].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() =>
                          handleWizardAnswer(WIZARD_QUESTIONS[wizardStep].id, opt.id)
                        }
                        className="w-full text-left p-3.5 rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-warm-ivory)] hover:bg-[var(--color-warm-ivory)] hover:border-[var(--color-burgundy)] transition cursor-pointer space-y-1 group"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-xs sm:text-sm font-bold text-[var(--color-burgundy)] group-hover:text-[var(--color-flowering-chestnut)]">
                            {opt.label}
                          </strong>
                          <ChevronRight className="w-4 h-4 text-[var(--color-burgundy)]/40 group-hover:text-[var(--color-burgundy)]" />
                        </div>
                        <p className="text-[11px] text-[var(--color-burgundy)]/80 leading-relaxed">
                          {opt.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Wizard Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setWizardStep((prev) => Math.max(0, prev - 1))}
                      disabled={wizardStep === 0}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--color-burgundy)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-creme-latte)] transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setWizardOpen(false)}
                      className="text-xs text-[var(--color-burgundy)]/70 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Recommendation Result View */
                <div className="space-y-5 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-burgundy-rgb),0.2)] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
                        Ranked Recommendation:
                      </span>
                      <h4 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)]">
                        {wizardResult.title}
                      </h4>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]">
                      {wizardResult.fitScore}% Fit
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-[var(--color-burgundy)]/90">
                    <div className="p-3.5 rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase mb-1">
                        Why It Fits Your Goals:
                      </strong>
                      <p className="leading-relaxed">{wizardResult.whyItFits}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                        <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase mb-1">
                          What to Learn First (Week 1):
                        </strong>
                        <p>{wizardResult.learnFirst}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                        <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase mb-1">
                          Achievable Starter Project:
                        </strong>
                        <p>{wizardResult.achievableStarterProject}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[var(--color-creme-latte)]/60 border border-[rgba(var(--color-burgundy-rgb),0.12)]">
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase mb-1">
                        Next Major Milestone:
                      </strong>
                      <p>{wizardResult.nextMilestone}</p>
                    </div>

                    {/* Matched Catalogue Tools */}
                    <div>
                      <strong className="text-[var(--color-burgundy)] font-semibold block text-[11px] uppercase mb-1.5">
                        Matched Technologies in Catalogue:
                      </strong>
                      <div className="flex flex-wrap gap-2">
                        {wizardResult.matchedToolIds.map((toolId) => {
                          const matched = CATALOGUE_ITEMS.find((t) => t.id === toolId);
                          if (!matched) return null;
                          return (
                            <button
                              key={toolId}
                              onClick={() => {
                                setWizardOpen(false);
                                setSelectedItem(matched);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.2)] text-[var(--color-burgundy)] font-bold hover:bg-[var(--color-burgundy)] hover:text-[var(--color-warm-ivory)] transition text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{matched.name}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[rgba(var(--color-burgundy-rgb),0.1)]">
                    <button
                      onClick={() => {
                        setWizardStep(0);
                        setWizardResult(null);
                        setWizardAnswers({});
                      }}
                      className="text-xs font-semibold text-[var(--color-burgundy)] hover:underline cursor-pointer"
                    >
                      Retake Wizard
                    </button>
                    <button
                      onClick={() => {
                        setWizardOpen(false);
                        setActiveTab("directory");
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:bg-[var(--color-flowering-chestnut)] transition cursor-pointer"
                    >
                      Explore Matched Technologies
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
