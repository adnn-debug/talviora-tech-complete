"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  Layers,
  KanbanSquare,
  Workflow,
  Binary,
  Cpu,
  BookmarkCheck,
  BarChart3,
  UserCheck,
  LockKeyhole,
  BookOpen,
  Sparkles,
  Newspaper,
  Home,
  CheckCircle2,
} from "lucide-react";

interface SidebarCategory {
  title: string;
  items: {
    label: string;
    href: string;
    icon: any;
    badge?: string;
  }[];
}

export default function Sidebar() {
  const pathname = usePathname();

  const categories: SidebarCategory[] = [
    {
      title: "DISCOVER & OVERVIEW",
      items: [
        { label: "Executive Dashboard", href: "/", icon: LayoutDashboard },
        { label: "Public Landing Page", href: "/welcome", icon: Home, badge: "Hero" },
        { label: "Technology Catalogue", href: "/catalogue", icon: Layers, badge: "50+" },
        { label: "News & Opportunities", href: "/opportunities", icon: Newspaper },
      ],
    },
    {
      title: "CORE INTELLIGENCE",
      items: [
        { label: "Adaptive Assessment", href: "/assessment", icon: BrainCircuit, badge: "Gemini" },
        { label: "Career Fit Matrix", href: "/career-match", icon: Compass },
        { label: "Skill Gap Diagnostic", href: "/skill-gap", icon: Layers },
        { label: "Readiness Engine", href: "/readiness", icon: Gauge, badge: "72%" },
        { label: "Market Intelligence", href: "/market", icon: TrendingUp },
      ],
    },
    {
      title: "LEARNING & GROWTH",
      items: [
        { label: "Learning Studio", href: "/learning", icon: BookOpen, badge: "Labs" },
        { label: "Dynamic Roadmap", href: "/roadmap", icon: Route },
        { label: "Industry Project Lab", href: "/projects", icon: FolderGit2 },
        { label: "Sprint Kanban", href: "/sprint-planner", icon: KanbanSquare },
        { label: "14 Algorithmic Patterns", href: "/dsa-tracker", icon: Binary },
      ],
    },
    {
      title: "AI & CAREER TOOLKIT",
      items: [
        { label: "AI Career Mentor", href: "/mentor", icon: Sparkles, badge: "AI" },
        { label: "AI & LLM Blueprint", href: "/ai-blueprint", icon: Cpu },
        { label: "System Architecture", href: "/architecture", icon: Workflow },
        { label: "Smart Resume & ATS", href: "/resume", icon: FileText },
        { label: "Interview Simulator", href: "/simulator", icon: MessageSquareCode },
        { label: "Verified Portfolio", href: "/portfolio", icon: Award },
      ],
    },
    {
      title: "ACCOUNT & ANALYTICS",
      items: [
        { label: "Velocity Analytics", href: "/analytics", icon: BarChart3 },
        { label: "Saved Pathways", href: "/bookmarks", icon: BookmarkCheck },
        { label: "Learner Profile", href: "/profile", icon: UserCheck },
        { label: "Supabase Auth", href: "/auth", icon: LockKeyhole },
      ],
    },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 rounded-2xl border border-[#B59A83]/30 dark:border-zinc-800 bg-[#FFF9F0]/80 dark:bg-[#1F1515]/80 p-3 h-fit sticky top-20 backdrop-blur-md transition-colors"
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-6.5rem)] pr-1">
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <h2 className="px-3 text-[10px] font-bold tracking-widest uppercase text-[#7E6962] dark:text-[#B59A83]">
              {category.title}
            </h2>
            <div className="space-y-0.5 pt-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? "bg-[#6F1737] text-white dark:bg-[#C58F98] dark:text-[#241A1A] shadow-xs"
                        : "text-[#3B2527] dark:text-zinc-300 hover:text-[#6F1737] dark:hover:text-[#F0C4CC] hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-white dark:text-[#241A1A]"
                            : "text-[#7E6962] dark:text-zinc-500 group-hover:text-[#6F1737] dark:group-hover:text-[#F0C4CC]"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                          isActive
                            ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#241A1A]"
                            : "bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#6F1737] dark:text-[#F0C4CC]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
