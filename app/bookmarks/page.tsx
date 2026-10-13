"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Trash2,
  ArrowRight,
  Layers,
  Compass,
  Route,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { CATALOGUE_ITEMS } from "@/lib/catalogue-data";
import { fetchWithAuth } from "@/lib/api-client";
import type { LucideIcon } from "lucide-react";

interface BookmarkItem {
  id: string;
  toolId?: string;
  title: string;
  category: string;
  href: string;
  icon: LucideIcon;
  detail: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    try {
      // 1. Load bookmarked catalogue tools from localStorage
      const saved = localStorage.getItem("talviora_bookmarked_tools");
      const savedIds: string[] = saved ? JSON.parse(saved) : [];

      if (Array.isArray(savedIds) && savedIds.length > 0) {
        const dynamicItems: BookmarkItem[] = savedIds
          .map((id) => {
            const item = CATALOGUE_ITEMS.find((c) => c.id === id);
            if (!item) return null;
            return {
              id: `tool-${item.id}`,
              toolId: item.id,
              title: item.name,
              category: `Tech Catalogue • ${item.category}`,
              href: `/catalogue?query=${encodeURIComponent(item.name)}`,
              icon: Layers,
              detail: `${item.plainLanguageSummary} • ${item.difficulty} • ${item.subcategory}`,
            };
          })
          .filter(Boolean) as BookmarkItem[];

        setBookmarks(dynamicItems);
      }

      // 2. Sync from backend API
      fetchWithAuth("/api/bookmarks")
        .then(async (res) => ({ ok: res.ok, data: await res.json() }))
        .then(({ ok, data }) => {
          if (!ok) return;
          if (data?.bookmarks && Array.isArray(data.bookmarks)) {
            const apiToolIds = data.bookmarks.map((b: any) => b.item_id).filter(Boolean);
            const combinedIds = Array.from(new Set([...savedIds, ...apiToolIds]));
            const apiItems: BookmarkItem[] = combinedIds
              .map((id) => {
                const item = CATALOGUE_ITEMS.find((c) => c.id === id);
                if (!item) return null;
                return {
                  id: `tool-${item.id}`,
                  toolId: item.id,
                  title: item.name,
                  category: `Tech Catalogue • ${item.category}`,
                  href: `/catalogue?query=${encodeURIComponent(item.name)}`,
                  icon: Layers,
                  detail: `${item.plainLanguageSummary} • ${item.difficulty} • ${item.subcategory}`,
                };
              })
              .filter(Boolean) as BookmarkItem[];

            if (apiItems.length > 0) {
              setBookmarks(apiItems);
            }
          }
        })
        .catch(() => {});
    } catch (e) {
      console.warn("Failed to hydrate bookmarks", e);
    }
  }, []);

  const handleRemove = async (id: string, toolId?: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));

    if (toolId) {
      try {
        const saved = localStorage.getItem("talviora_bookmarked_tools");
        if (saved) {
          const list: string[] = JSON.parse(saved);
          const updated = list.filter((i) => i !== toolId);
          localStorage.setItem("talviora_bookmarked_tools", JSON.stringify(updated));
        }

        await fetchWithAuth(`/api/bookmarks?item_id=${encodeURIComponent(toolId)}&item_type=resource`, {
          method: "DELETE",
        });
      } catch (err) {
        console.warn("Failed to remove bookmark from storage/API", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30">
              <BookmarkCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Saved Resources
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            Saved Pathways & Bookmarks
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Quick-access repository for pinned career pathways, project briefs, and active modules.
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <div className="bg-[var(--color-warm-ivory)] rounded-3xl p-8 sm:p-10 border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Bookmark className="w-6 h-6" />
              </div>
              <h2 className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)]">
                You have no saved pathways or bookmarks yet
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
                Bookmarks allow you to pin your active technologies, career pathways, and learning roadmaps in one convenient place for quick access anytime.
              </p>
            </div>

            {/* Quick-action recommendation cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[var(--color-creme-latte)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-4 hover:border-[var(--color-dusty-rose)] transition">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                    Explore All Tech Fields
                  </h3>
                  <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed font-normal">
                    Browse 30 languages, frameworks, and tools. Click the bookmark icon on any card (e.g. Python, React, SQL, Docker) to pin it here.
                  </p>
                </div>
                <Link
                  href="/catalogue"
                  className="btn-burgundy px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Open Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-creme-latte)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-4 hover:border-[var(--color-dusty-rose)] transition">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                    Explore Matching Careers
                  </h3>
                  <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed font-normal">
                    Discover career directions that align with your interests—from AI Engineer to Frontend Developer—and pin your target career.
                  </p>
                </div>
                <Link
                  href="/career-match"
                  className="btn-burgundy px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Explore Careers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--color-creme-latte)]/80 border border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col justify-between space-y-4 hover:border-[var(--color-dusty-rose)] transition">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] flex items-center justify-center">
                    <Route className="w-4 h-4" />
                  </div>
                  <h3 className="font-display-serif text-sm font-bold text-[var(--color-burgundy)]">
                    Your Step-by-Step Plan
                  </h3>
                  <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed font-normal">
                    Follow guided learning roadmaps and study milestones. Bookmark modules you are actively working on to track your daily progress.
                  </p>
                </div>
                <Link
                  href="/roadmap"
                  className="btn-burgundy px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--surface-rose)]/60 border border-[rgba(var(--color-dusty-rose-rgb),0.5)] flex items-center gap-2 text-xs text-[var(--color-burgundy)]">
              <Sparkles className="w-4 h-4 text-[var(--color-burgundy)] shrink-0" />
              <span>
                <strong>Good to know:</strong> Your bookmarks are automatically saved to your browser session. You can update or remove items at any time.
              </span>
            </div>
          </div>
        ) : (
          bookmarks.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)] shadow-xs transition"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                      {b.category}
                    </span>
                    <h2 className="text-sm font-display-serif font-bold text-[var(--color-burgundy)]">
                      {b.title}
                    </h2>
                    <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
                      {b.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Link
                    href={b.href}
                    className="btn-burgundy px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleRemove(b.id, b.toolId)}
                    className="p-1.5 rounded-xl border border-[var(--color-creme-latte)] text-[var(--color-burgundy)]/60 hover:text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
