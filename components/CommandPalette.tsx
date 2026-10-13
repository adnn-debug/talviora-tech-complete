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
  Layers,
  UserCheck,
  Briefcase,
  BookmarkCheck,
  BookOpen,
  ShieldCheck,
  BarChart3,
  Settings,
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
  { title: "The Complete Tech Skills & Tools Catalogue", category: "Ecosystem Directory", href: "/catalogue", icon: Layers, keywords: "catalogue tech skills tools ecosystem library discover framework" },
  { title: "AI Skill Assessment", category: "Core Intelligence", href: "/assessment", icon: BrainCircuit, keywords: "quiz test evaluation diagnostic gemini" },
  { title: "Career Role Examples", category: "Core Intelligence", href: "/career-match", icon: Compass, keywords: "jobs roles career examples" },
  { title: "AI Career Strategy Mentor", category: "Core Intelligence", href: "/mentor", icon: UserCheck, keywords: "mentor advice coach career guidance strategy" },
  { title: "Skill Gap Matrix", category: "Core Intelligence", href: "/skill-gap", icon: LayoutDashboard, keywords: "gaps missing skills matrix learning" },
  { title: "Career Readiness Engine", category: "Core Intelligence", href: "/readiness", icon: Gauge, keywords: "score readiness benchmark radar" },
  { title: "Saved Pathways & Bookmarks", category: "Core Intelligence", href: "/bookmarks", icon: BookmarkCheck, keywords: "saved bookmarks favorites pinned stars" },
  { title: "Learning Roadmap", category: "Growth Engine", href: "/roadmap", icon: Route, keywords: "curriculum modules phases weekly steps" },
  { title: "Industry Project Lab", category: "Growth Engine", href: "/projects", icon: FolderGit2, keywords: "production briefs rag architecture code" },
  { title: "Interactive Learning Studio", category: "Growth Engine", href: "/learning", icon: BookOpen, keywords: "learning studio interactive lessons tutorial code" },
  { title: "Sprint Kanban Planner", category: "Growth Engine", href: "/sprint-planner", icon: KanbanSquare, keywords: "tasks sprints agile backlog" },
  { title: "DSA & Algorithmic Patterns", category: "Growth Engine", href: "/dsa-tracker", icon: Binary, keywords: "algorithms data structures leetcode" },
  { title: "Resume Editor & Keyword Check", category: "Career Toolkit", href: "/resume", icon: FileText, keywords: "resume cv keywords text" },
  { title: "Technical Interview Simulator", category: "Career Toolkit", href: "/simulator", icon: MessageSquareCode, keywords: "mock interview questions ai feedback" },
  { title: "Market Data Availability", category: "Career Toolkit", href: "/market", icon: TrendingUp, keywords: "salaries hiring trends demand analytics" },
  { title: "Current Opportunities", category: "Career Toolkit", href: "/opportunities", icon: Briefcase, keywords: "jobs hiring remote openings roles careers" },
  { title: "Public Profile", category: "Career Toolkit", href: "/portfolio", icon: Award, keywords: "showcase profile vanity url" },
  { title: "Certification Topics (Reference)", category: "Career Toolkit", href: "/catalogue", icon: ShieldCheck, keywords: "credentials exams certifications" },
  { title: "Learning Analytics", category: "Core Intelligence", href: "/analytics", icon: BarChart3, keywords: "analytics study activity" },
  { title: "AI & LLM Application Blueprint", category: "Technical Labs", href: "/ai-blueprint", icon: Cpu, keywords: "rag fine tuning agentic vector" },
  { title: "System Architecture Explorer", category: "Technical Labs", href: "/architecture", icon: Workflow, keywords: "distributed microservices diagrams" },
  { title: "Profile Settings", category: "Preferences", href: "/profile", icon: Settings, keywords: "settings account configuration profile" },
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
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(var(--color-burgundy-rgb),0.12)] bg-[var(--color-warm-ivory)]">
          <Search className="w-5 h-5 text-[var(--color-burgundy)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, feature, or route... (e.g., 'assessment', 'resume', 'rag')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-[var(--color-burgundy)] placeholder-[rgba(var(--color-burgundy-rgb),0.5)] focus:outline-none font-medium"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[var(--color-warm-ivory)]">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--color-burgundy)]/70">
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
                      ? "bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)]"
                      : "text-[var(--color-burgundy)] hover:bg-[var(--color-warm-ivory)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[var(--color-burgundy)]" />
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-burgundy)]/70 font-mono-code uppercase font-semibold">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[rgba(var(--color-burgundy-rgb),0.12)] bg-[var(--color-creme-latte)] flex items-center justify-between text-[10px] text-[var(--color-burgundy)] font-medium">
          <span>Navigate with ↑ and ↓</span>
          <span>Press Enter to launch</span>
        </div>
      </div>
    </div>
  );
}
