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
  // Home
  { title: "Home Overview Dashboard", category: "Home", href: "/", icon: LayoutDashboard, keywords: "home dashboard metrics stats personalised journey" },
  { title: "Public Overview", category: "Home", href: "/welcome", icon: LayoutDashboard, keywords: "welcome public overview hero learning tech" },
  { title: "Platform Features (31 Register)", category: "Home", href: "/features", icon: LayoutDashboard, keywords: "features 31 tools directory all capabilities register" },

  // Explore
  { title: "Explore All Tech Fields (30 Catalogue Entries)", category: "Explore", href: "/catalogue", icon: Layers, keywords: "catalogue tech skills tools ecosystem library discover framework 30" },
  { title: "Tech Job Trends (Market Data)", category: "Explore", href: "/market", icon: TrendingUp, keywords: "salaries hiring trends demand analytics compensation" },
  { title: "News & Opportunities", category: "Explore", href: "/opportunities", icon: Briefcase, keywords: "jobs hiring remote openings roles careers opportunities" },

  // My Learning
  { title: "Your Step-by-Step Plan (Roadmap)", category: "My Learning", href: "/roadmap", icon: Route, keywords: "curriculum modules phases weekly steps plan roadmap milestones" },
  { title: "Your Learning Progress (Analytics)", category: "My Learning", href: "/analytics", icon: BarChart3, keywords: "analytics study activity progress hours streak milestones" },
  { title: "Sprint Tasks (Kanban Planner)", category: "My Learning", href: "/sprint-planner", icon: KanbanSquare, keywords: "tasks sprints agile backlog board kanban" },
  { title: "Saved Pathways & Bookmarks", category: "My Learning", href: "/bookmarks", icon: BookmarkCheck, keywords: "saved bookmarks favorites pinned stars pathways" },
  { title: "Learner Profile & Settings", category: "My Learning", href: "/profile", icon: Settings, keywords: "settings account configuration profile preferences" },

  // Learn & Practise
  { title: "Learning Studio & Sandbox", category: "Learn & Practise", href: "/learning", icon: BookOpen, keywords: "learning studio interactive lessons tutorial code sandbox editor" },
  { title: "Interactive Practice & Lab", category: "Learn & Practise", href: "/simulator", icon: MessageSquareCode, keywords: "practice code 8 step lesson runner sandbox challenges" },
  { title: "Check What You Know (Assessment)", category: "Learn & Practise", href: "/assessment", icon: BrainCircuit, keywords: "quiz test evaluation diagnostic check knowledge questions" },
  { title: "Learn Problem-Solving Patterns (DSA)", category: "Learn & Practise", href: "/dsa-tracker", icon: Binary, keywords: "algorithms data structures leetcode patterns problem solving" },

  // Build Projects
  { title: "Build Real Projects (Project Lab)", category: "Build Projects", href: "/projects", icon: FolderGit2, keywords: "production briefs rag architecture code projects repo lab" },
  { title: "System Architecture Explorer", category: "Build Projects", href: "/architecture", icon: Workflow, keywords: "distributed microservices diagrams architecture system" },
  { title: "Public Portfolio & Showcase", category: "Build Projects", href: "/portfolio", icon: Award, keywords: "showcase profile vanity url proof of work projects" },

  // AI Learning Guide
  { title: "Your AI Learning Guide (AI Mentor)", category: "AI Learning Guide", href: "/mentor", icon: UserCheck, keywords: "mentor advice coach career guidance strategy ai chat guide" },
  { title: "AI & Prompt Blueprint", category: "AI Learning Guide", href: "/ai-blueprint", icon: Cpu, keywords: "rag fine tuning agentic vector blueprint prompt" },

  // Careers & Opportunities
  { title: "Explore Matching Careers (Career Fit)", category: "Careers & Opportunities", href: "/career-match", icon: Compass, keywords: "jobs roles career examples fit matrix" },
  { title: "Find What You Need to Learn (Skill Gap)", category: "Careers & Opportunities", href: "/skill-gap", icon: LayoutDashboard, keywords: "gaps missing skills matrix learning comparison" },
  { title: "Improve Your Resume (Resume Editor)", category: "Careers & Opportunities", href: "/resume", icon: FileText, keywords: "resume cv keywords text editor bullet points" },
  { title: "Technical Interview Simulator", category: "Careers & Opportunities", href: "/simulator?mode=interview", icon: MessageSquareCode, keywords: "mock interview questions ai feedback simulator roles" },
  { title: "Career Readiness Diagnostic", category: "Careers & Opportunities", href: "/readiness", icon: Gauge, keywords: "score readiness benchmark radar diagnostic" },
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
