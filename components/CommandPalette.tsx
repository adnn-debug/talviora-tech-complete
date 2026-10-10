"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  BrainCircuit,
  Compass,
  Gauge,
  Route,
  FolderGit2,
  FileText,
  MessageSquareCode,
  TrendingUp,
  Award,
  KanbanSquare,
  Binary,
  Cpu,
  Workflow,
  X,
} from "lucide-react";

interface PaletteItem {
  title: string;
  category: string;
  href: string;
  icon: any;
  keywords: string;
}

const commands: PaletteItem[] = [
  { title: "Executive Overview Dashboard", category: "Core Intelligence", href: "/", icon: LayoutDashboard, keywords: "home dashboard metrics stats" },
  { title: "AI Skill Assessment", category: "Core Intelligence", href: "/assessment", icon: BrainCircuit, keywords: "quiz test evaluation diagnostic gemini" },
  { title: "Career Matches & Alignment", category: "Core Intelligence", href: "/career-match", icon: Compass, keywords: "jobs roles salary match fit" },
  { title: "Skill Gap Matrix", category: "Core Intelligence", href: "/skill-gap", icon: LayoutDashboard, keywords: "gaps missing skills matrix learning" },
  { title: "Career Readiness Engine", category: "Core Intelligence", href: "/readiness", icon: Gauge, keywords: "score readiness benchmark radar" },
  { title: "Dynamic Personalized Roadmap", category: "Growth Engine", href: "/roadmap", icon: Route, keywords: "curriculum modules phases weekly steps" },
  { title: "Industry Project Lab", category: "Growth Engine", href: "/projects", icon: FolderGit2, keywords: "production briefs rag architecture code" },
  { title: "Sprint Kanban Planner", category: "Growth Engine", href: "/sprint-planner", icon: KanbanSquare, keywords: "tasks sprints agile backlog" },
  { title: "DSA & Algorithmic Patterns", category: "Growth Engine", href: "/dsa-tracker", icon: Binary, keywords: "algorithms data structures leetcode" },
  { title: "Smart Resume Crafter & ATS", category: "Career Toolkit", href: "/resume", icon: FileText, keywords: "ats resume cv keywords verbs score" },
  { title: "Technical Interview Simulator", category: "Career Toolkit", href: "/simulator", icon: MessageSquareCode, keywords: "mock interview questions ai feedback" },
  { title: "Market Intelligence & Salary Trends", category: "Career Toolkit", href: "/market", icon: TrendingUp, keywords: "salaries hiring trends demand analytics" },
  { title: "Verified Public Portfolio", category: "Career Toolkit", href: "/portfolio", icon: Award, keywords: "showcase profile vanity url badges" },
  { title: "AI & LLM Application Blueprint", category: "Technical Labs", href: "/ai-blueprint", icon: Cpu, keywords: "rag fine tuning agentic vector" },
  { title: "System Architecture Explorer", category: "Technical Labs", href: "/architecture", icon: Workflow, keywords: "distributed microservices diagrams" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  const filtered = commands.filter((c) =>
    (c.title + " " + c.category + " " + c.keywords).toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-[#fdf7f1] dark:bg-[#111118] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, feature, or route... (e.g., 'assessment', 'resume', 'rag')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-500">
              No matching features found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-zinc-200 dark:bg-zinc-800/90 text-zinc-900 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#c58b94] dark:text-[#d8a0ab]" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono-code uppercase">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-400">
          <span>Navigate with ↑ and ↓</span>
          <span>Press Enter to launch</span>
        </div>
      </div>
    </div>
  );
}
