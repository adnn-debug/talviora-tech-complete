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
  ListChecks,
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
        { label: "Feature Directory", href: "/features", icon: ListChecks, badge: "31" },
        { label: "Explore All Tech Fields", href: "/catalogue", icon: Layers, badge: "30 Fields" },
        { label: "News & Opportunities", href: "/opportunities", icon: Newspaper },
      ],
    },
    {
      title: "CORE INTELLIGENCE",
      items: [
        { label: "Check What You Know", href: "/assessment", icon: BrainCircuit },
        { label: "Explore Matching Careers", href: "/career-match", icon: Compass },
        { label: "Find What You Need to Learn", href: "/skill-gap", icon: Layers },
        { label: "Readiness Engine", href: "/readiness", icon: Gauge },
        { label: "Tech Job Trends", href: "/market", icon: TrendingUp },
      ],
    },
    {
      title: "LEARNING & GROWTH",
      items: [
        { label: "Learning Studio", href: "/learning", icon: BookOpen, badge: "Labs" },
        { label: "Your Step-by-Step Plan", href: "/roadmap", icon: Route },
        { label: "Build Real Projects", href: "/projects", icon: FolderGit2 },
        { label: "Sprint Kanban", href: "/sprint-planner", icon: KanbanSquare },
        { label: "Learn Problem-Solving Patterns", href: "/dsa-tracker", icon: Binary },
      ],
    },
    {
      title: "AI & CAREER TOOLKIT",
      items: [
        { label: "Your AI Learning Guide", href: "/mentor", icon: Sparkles, badge: "AI" },
        { label: "AI & LLM Blueprint", href: "/ai-blueprint", icon: Cpu },
        { label: "System Architecture", href: "/architecture", icon: Workflow },
        { label: "Improve Your Resume", href: "/resume", icon: FileText },
        { label: "Interview Simulator", href: "/simulator", icon: MessageSquareCode },
        { label: "Public Profile", href: "/portfolio", icon: Award },
      ],
    },
    {
      title: "ACCOUNT & ANALYTICS",
      items: [
        { label: "Your Learning Progress", href: "/analytics", icon: BarChart3 },
        { label: "Saved Pathways", href: "/bookmarks", icon: BookmarkCheck },
        { label: "Learner Profile", href: "/profile", icon: UserCheck },
        { label: "Sign in", href: "/auth", icon: LockKeyhole },
      ],
    },
  ];

  return (
    <aside
      className="hidden md:flex flex-col w-64 shrink-0 rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] p-3.5 h-fit sticky top-20 shadow-xs transition-colors"
      aria-label="Sidebar Navigation"
    >
      <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-6.5rem)] pr-1">
        {/* Beginner Fast-Track Card */}
        <div className="rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.18)] bg-[var(--surface-rose)]/60 p-3 space-y-1.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-burgundy)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-burgundy)] shrink-0" />
            <span>Beginner Fast-Track</span>
          </div>
          <p className="text-[10px] text-[var(--color-burgundy)]/85 leading-snug">
            New to code? Follow our interactive tutorials & "Try It Yourself" sandboxes.
          </p>
          <Link
            href="/learning"
            className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--color-burgundy)] hover:underline pt-0.5"
          >
            Start Chapter 1 &rarr;
          </Link>
        </div>

        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <h2 className="px-3 text-[10px] font-bold tracking-wider uppercase text-[var(--color-burgundy)]">
              {category.title}
            </h2>
            <div className="space-y-1 pt-1">
              {category.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)] ${
                      isActive
                        ? "bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)] shadow-xs"
                        : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]/60 hover:text-[var(--color-burgundy)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isActive && (
                        <span
                          className="w-1 h-3.5 rounded-full bg-[var(--color-burgundy)] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-[var(--color-burgundy)]"
                            : "text-[var(--color-burgundy)]/80 group-hover:text-[var(--color-burgundy)]"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase transition-colors shrink-0 ml-1.5 ${
                          isActive
                            ? "bg-[var(--color-burgundy)]/12 text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.25)]"
                            : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]"
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
