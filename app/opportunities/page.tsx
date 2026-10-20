"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  ShieldCheck,
  Building2,
  GraduationCap,
  Landmark,
  FileCode2,
  Calendar,
  MapPin,
  Sparkles,
  Info,
  Filter,
  Check,
} from "lucide-react";
import {
  OpportunityItem,
  OpportunityCategory,
  VerificationStatus,
  PipelineSummary,
  OPPORTUNITY_SEED_DATA,
  CATEGORY_LABELS,
  STATUS_DESCRIPTIONS,
  computePipelineSummary,
} from "@/lib/opportunities-data";
import { fetchWithAuth } from "@/lib/api-client";

export default function OpportunitiesPage() {
  const [items, setItems] = useState<OpportunityItem[]>(OPPORTUNITY_SEED_DATA);
  const [pipelineSummary, setPipelineSummary] = useState<PipelineSummary>(() =>
    computePipelineSummary(OPPORTUNITY_SEED_DATA)
  );
  const [loading, setLoading] = useState(false);
  const [recheckingId, setRecheckingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("talviora_bookmarked_opportunities");
      if (saved) setBookmarkedIds(JSON.parse(saved));
    } catch {}
  }, []);

  // Fetch verified opportunities from API on mount
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchOpportunities = async (recheck = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/opportunities${recheck ? "?recheck=true" : ""}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
          setPipelineSummary(data.pipelineSummary);
          if (recheck) showToast("All source URLs rechecked live!");
        }
      }
    } catch (err) {
      console.warn("Using local verified seed dataset", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecheckSingle = async (id: string) => {
    setRecheckingId(id);
    try {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "recheck" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.item) {
          setItems((prev) =>
            prev.map((it) => (it.id === id ? data.item : it))
          );
          if (data.pipelineSummary) setPipelineSummary(data.pipelineSummary);
          showToast(`Source rechecked: Status is ${data.item.verificationStatus}`);
        }
      }
    } catch (err) {
      showToast("Network check failed; please retry.");
    } finally {
      setRecheckingId(null);
    }
  };

  const toggleBookmark = async (item: OpportunityItem) => {
    const isBookmarked = bookmarkedIds.includes(item.id);
    const updated = isBookmarked
      ? bookmarkedIds.filter((id) => id !== item.id)
      : [...bookmarkedIds, item.id];

    setBookmarkedIds(updated);
    try {
      localStorage.setItem("talviora_bookmarked_opportunities", JSON.stringify(updated));
    } catch {}

    // Sync to backend bookmarks API
    try {
      if (isBookmarked) {
        await fetchWithAuth(`/api/bookmarks?item_id=${encodeURIComponent(item.id)}&item_type=opportunity`, {
          method: "DELETE",
        });
        showToast("Bookmark removed");
      } else {
        await fetchWithAuth("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_type: "opportunity",
            item_id: item.id,
            title: `${item.title} (${item.organisation})`,
            metadata: {
              organisation: item.organisation,
              sourceUrl: item.sourceUrl,
              category: item.category,
              verificationStatus: item.verificationStatus,
            },
          }),
        });
        showToast("Opportunity bookmarked!");
      }
    } catch {}
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organisation.toLowerCase().includes(q) ||
        item.locationAndEligibility.toLowerCase().includes(q) ||
        item.requiredSkills.some((s) => s.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" || item.verificationStatus === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [items, searchQuery, selectedCategory, selectedStatus]);

  const getCategoryIcon = (cat: OpportunityCategory) => {
    switch (cat) {
      case "company_career":
        return Building2;
      case "govtech_recruitment":
        return Landmark;
      case "academic_programme":
        return GraduationCap;
      case "official_tech_release":
        return FileCode2;
      default:
        return BriefcaseBusiness;
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "Verified":
        return {
          color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
          icon: CheckCircle2,
          label: "Verified Official",
        };
      case "Needs Checking":
        return {
          color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
          icon: AlertTriangle,
          label: "Needs Checking",
        };
      case "Expired":
        return {
          color: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
          icon: Clock,
          label: "Expired / Archived",
        };
      case "Unavailable":
        return {
          color: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
          icon: XCircle,
          label: "Unavailable Feed",
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-[var(--color-dusty-rose)]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[rgba(var(--color-burgundy-rgb),0.15)] pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[var(--color-burgundy)]">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
              <BriefcaseBusiness className="h-4 w-4 text-[var(--color-burgundy)]" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Explore • Real Sources Only
            </span>
          </div>

          <button
            onClick={() => fetchOpportunities(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] hover:bg-[var(--surface-rose)] text-xs font-semibold text-[var(--color-burgundy)] transition shadow-2xs disabled:opacity-50 cursor-pointer"
            title="Perform live HTTP checks against all official URLs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Rechecking URLs..." : "Recheck All Sources Live"}</span>
          </button>
        </div>

        <h1 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
          Current Opportunities & Official Notifications
        </h1>
        <p className="max-w-3xl text-xs sm:text-sm leading-relaxed text-[var(--color-burgundy)]/85 font-normal">
          Directly verified listings from official company careers pages, government recruitment notifications, accredited university portals, and technology documentation. Google search results alone are never treated as verification.
        </p>
      </header>

      {/* Real-time Pipeline Health Metrics */}
      <section aria-label="Pipeline health metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 block">
              Verified Active
            </span>
            <span className="font-display-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {pipelineSummary.verified}
            </span>
            <p className="text-[10px] text-[var(--color-burgundy)]/60">Live HTTP 200</p>
          </div>
          <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 block">
              Needs Checking
            </span>
            <span className="font-display-serif text-2xl font-bold text-amber-700 dark:text-amber-400">
              {pipelineSummary.needsChecking}
            </span>
            <p className="text-[10px] text-[var(--color-burgundy)]/60">Bot guard / review</p>
          </div>
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 block">
              Expired / Archived
            </span>
            <span className="font-display-serif text-2xl font-bold text-slate-700 dark:text-slate-400">
              {pipelineSummary.expired}
            </span>
            <p className="text-[10px] text-[var(--color-burgundy)]/60">Deadline passed</p>
          </div>
          <span className="p-2.5 rounded-xl bg-slate-500/10 text-slate-600 border border-slate-500/20">
            <Clock className="w-5 h-5" />
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70 block">
              Unavailable Feeds
            </span>
            <span className="font-display-serif text-2xl font-bold text-rose-700 dark:text-rose-400">
              {pipelineSummary.unavailable}
            </span>
            <p className="text-[10px] text-[var(--color-burgundy)]/60">404 / decommissioned</p>
          </div>
          <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <XCircle className="w-5 h-5" />
          </span>
        </div>
      </section>

      {/* Zero-Hallucination & Source Integrity Policy Banner */}
      <section className="p-5 rounded-2xl bg-[var(--surface-rose)]/70 border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-xs text-[var(--color-burgundy)] space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-[var(--color-burgundy)]" />
          <span>Zero-Hallucination Sourcing & Integrity Policy</span>
        </div>
        <p className="leading-relaxed font-normal text-[var(--color-burgundy)]/85">
          TALVIORA TECH never invents job vacancies, publication dates, application deadlines, salaries, or mock links. All listings are connected to verifiable official URLs. When an external portal blocks automated scraping (e.g. anti-bot 403) or a deadline passes, the status immediately transitions to <strong>Needs Checking</strong> or <strong>Expired</strong> with an honest audit note.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-[11px]">
          <div className="p-2 rounded-lg bg-[var(--color-warm-ivory)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
            <strong className="text-emerald-700 dark:text-emerald-400 block">✓ Verified:</strong>
            HTTP 200 confirmed live from authoritative host.
          </div>
          <div className="p-2 rounded-lg bg-[var(--color-warm-ivory)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
            <strong className="text-amber-700 dark:text-amber-400 block">▲ Needs Checking:</strong>
            Timeout, 403 bot guard, or pending review.
          </div>
          <div className="p-2 rounded-lg bg-[var(--color-warm-ivory)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
            <strong className="text-slate-700 dark:text-slate-400 block">● Expired:</strong>
            Official deadline has elapsed.
          </div>
          <div className="p-2 rounded-lg bg-[var(--color-warm-ivory)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)]">
            <strong className="text-rose-700 dark:text-rose-400 block">✕ Unavailable:</strong>
            Host unreachable or feed decommissioned.
          </div>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-burgundy)]/50" />
            <input
              type="text"
              placeholder="Search by title, organisation, required skill, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--color-warm-ivory)] text-xs text-[var(--color-burgundy)] placeholder-[rgba(var(--color-burgundy-rgb),0.5)] focus:outline-none focus:ring-2 focus:ring-[var(--color-burgundy)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-burgundy)]/60 hover:text-[var(--color-burgundy)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Verification Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["all", "Verified", "Needs Checking", "Expired", "Unavailable"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedStatus === status
                    ? "btn-burgundy shadow-2xs"
                    : "border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                }`}
              >
                {status === "all" ? "All Statuses" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
            }`}
          >
            All Categories ({items.length})
          </button>
          {(
            [
              "company_career",
              "govtech_recruitment",
              "academic_programme",
              "official_tech_release",
            ] as OpportunityCategory[]
          ).map((cat) => {
            const Icon = getCategoryIcon(cat);
            const count = items.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                    : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{CATEGORY_LABELS[cat]} ({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Opportunity Cards List */}
      <section aria-label="Opportunity listings" className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-3">
            <BriefcaseBusiness className="w-8 h-8 text-[var(--color-burgundy)]/40 mx-auto" />
            <h3 className="font-display-serif text-lg font-bold text-[var(--color-burgundy)]">
              No matching listings found
            </h3>
            <p className="text-xs text-[var(--color-burgundy)]/70 max-w-md mx-auto">
              Try broadening your search query or switching your category and verification filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="btn-burgundy px-4 py-2 rounded-xl text-xs font-semibold mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              const statusBadge = getStatusBadge(item.verificationStatus);
              const StatusIcon = statusBadge.icon;
              const isBookmarked = bookmarkedIds.includes(item.id);
              const isRecheckingThis = recheckingId === item.id;

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[var(--color-dusty-rose)] transition"
                >
                  {/* Top Bar: Category & Verification Status */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-[10px] font-bold text-[var(--color-burgundy)]">
                        <CategoryIcon className="w-3 h-3" />
                        <span>{CATEGORY_LABELS[item.category]}</span>
                      </span>

                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusBadge.color}`}
                        title={STATUS_DESCRIPTIONS[item.verificationStatus]}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusBadge.label}</span>
                      </div>
                    </div>

                    {/* Title & Organisation */}
                    <div>
                      <h2 className="font-display-serif text-lg sm:text-xl font-bold text-[var(--color-burgundy)] leading-snug">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[var(--color-burgundy)]/80 font-medium">
                        <span className="font-bold">{item.organisation}</span>
                        <span>•</span>
                        <span className="text-[11px] text-[var(--color-flowering-chestnut)] font-semibold">
                          {item.opportunityType}
                        </span>
                      </div>
                    </div>

                    {/* Source Authority Badge */}
                    <div className="p-2.5 rounded-xl bg-[var(--color-creme-latte)]/80 border border-[rgba(var(--color-burgundy-rgb),0.1)] text-[11px] text-[var(--color-burgundy)]/85 flex items-center justify-between">
                      <span className="font-medium">
                        <strong>Source Authority:</strong> {item.sourceAuthority}
                      </span>
                      {item.httpStatus && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] text-[var(--color-burgundy)] font-bold">
                          HTTP {item.httpStatus}
                        </span>
                      )}
                    </div>

                    {/* Location & Eligibility */}
                    <div className="text-xs text-[var(--color-burgundy)]/85 space-y-1">
                      <div className="flex items-start gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-flowering-chestnut)] shrink-0 mt-0.5" />
                        <span>{item.locationAndEligibility}</span>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                        Required / Relevant Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.requiredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.4)] text-[10px] font-semibold text-[var(--color-burgundy)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dates & Timeline */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[rgba(var(--color-burgundy-rgb),0.08)] text-[11px] text-[var(--color-burgundy)]/80">
                      <div>
                        <span className="font-semibold block text-[10px] text-[var(--color-burgundy)]/60 uppercase">
                          Published
                        </span>
                        <span>{item.publicationDate}</span>
                      </div>
                      <div>
                        <span className="font-semibold block text-[10px] text-[var(--color-burgundy)]/60 uppercase">
                          Deadline
                        </span>
                        <span className={item.applicationDeadline ? "font-bold" : "italic text-[var(--color-burgundy)]/60"}>
                          {item.applicationDeadline ?? "Rolling / Continuous"}
                        </span>
                      </div>
                    </div>

                    {/* Verification Notes */}
                    <div className="p-2.5 rounded-xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-dusty-rose-rgb),0.4)] text-[11px] text-[var(--color-burgundy)]/85 space-y-1">
                      <div className="flex items-center gap-1 font-semibold text-[10px] uppercase text-[var(--color-burgundy)]">
                        <Info className="w-3 h-3 text-[var(--color-flowering-chestnut)]" />
                        <span>Audit Note:</span>
                      </div>
                      <p className="leading-snug">{item.verificationNotes}</p>
                      <div className="text-[10px] text-[var(--color-burgundy)]/60 pt-0.5">
                        Last checked: {new Date(item.lastChecked).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.1)]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRecheckSingle(item.id)}
                        disabled={isRecheckingThis}
                        className="p-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] hover:bg-[var(--surface-rose)] text-[var(--color-burgundy)] transition text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-2xs"
                        title="Recheck this official URL live"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRecheckingThis ? "animate-spin" : ""}`} />
                        <span className="hidden sm:inline">Verify</span>
                      </button>

                      <button
                        onClick={() => toggleBookmark(item)}
                        className={`p-2 rounded-xl border transition text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-2xs ${
                          isBookmarked
                            ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] border-[var(--color-burgundy)]"
                            : "border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] hover:bg-[var(--surface-rose)] text-[var(--color-burgundy)]"
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Save Opportunity"}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                        <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
                      </button>
                    </div>

                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-burgundy px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <span>View Official Listing</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer Transparency Disclosure */}
      <footer className="p-5 rounded-2xl bg-[var(--color-creme-latte)]/80 border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs text-[var(--color-burgundy)]/85 leading-relaxed font-normal flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-[var(--color-burgundy)] shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-[var(--color-burgundy)]">Responsible Platform Guarantee:</strong>{" "}
          TALVIORA TECH connects aspiring engineers directly to original official notices. We do not charge fees, take commissions, or act as an employment agency. Always confirm application fees, eligibility criteria, and examination dates directly with the official issuing organisation prior to submitting applications.
        </div>
      </footer>
    </div>
  );
}
