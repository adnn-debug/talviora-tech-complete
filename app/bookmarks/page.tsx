"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Compass,
  FolderGit2,
  Route,
  Trash2,
  ArrowRight,
} from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: "b-1",
      title: "AI Solutions Architect Career Track",
      category: "Career Pathway",
      href: "/career-match",
      icon: Compass,
      detail: "94% fit • $145k-$195k • High market growth",
    },
    {
      id: "b-2",
      title: "Enterprise Hybrid RAG Engine Blueprint",
      category: "Project Lab",
      href: "/projects",
      icon: FolderGit2,
      detail: "FastAPI + pgvector + Redis semantic cache",
    },
    {
      id: "b-3",
      title: "Phase 2: Transformer Attention & Quantization",
      category: "Roadmap Module",
      href: "/roadmap",
      icon: Route,
      detail: "4.5 hrs remaining in current sprint",
    },
  ]);

  const handleRemove = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <BookmarkCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Saved Resources
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Saved Pathways & Bookmarks
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Quick-access repository for pinned career pathways, project briefs, and active modules.
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <div className="card-luxury p-12 text-center text-xs text-zinc-400 space-y-2">
            <p>You have no saved pathways or bookmarks yet.</p>
            <Link
              href="/career-match"
              className="text-[#843e4b] dark:text-[#d8a0ab] font-semibold hover:underline inline-block"
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
                className="card-luxury p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-[#c58b94] dark:text-[#d8a0ab] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      {b.category}
                    </span>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {b.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {b.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <Link
                    href={b.href}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition flex items-center gap-1.5"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleRemove(b.id)}
                    className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-rose-500 transition cursor-pointer"
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
