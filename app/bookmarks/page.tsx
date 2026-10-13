"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Trash2,
  ArrowRight,
  Layers,
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
          <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-12 text-center text-xs text-[var(--color-burgundy)]/70 space-y-2 border border-[var(--color-creme-latte)] shadow-xs">
            <p>You have no saved pathways or bookmarks yet.</p>
            <Link
              href="/career-match"
              className="text-[var(--color-burgundy)] font-semibold hover:underline inline-block"
            >
              Browse Career Matches →
            </Link>
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
