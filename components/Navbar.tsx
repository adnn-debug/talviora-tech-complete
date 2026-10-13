"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Command, Menu, X, UserRound, Sparkles, ChevronRight, Layers, Route, BookOpen, FolderGit2, Compass } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Primary 7 Navigation Group links for desktop
  const primaryNavGroups = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/catalogue" },
    { label: "My Learning", href: "/roadmap" },
    { label: "Learn & Practise", href: "/learning" },
    { label: "Build Projects", href: "/projects" },
    { label: "AI Guide", href: "/mentor" },
    { label: "Careers & Opportunities", href: "/career-match" },
  ];

  // Detailed group breakdown for mobile menu drawer
  const mobileNavSections = [
    {
      title: "Home",
      links: [
        { label: "Home Overview", href: "/" },
        { label: "Public Overview", href: "/welcome" },
        { label: "Platform Features (31)", href: "/features" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Explore All Tech Fields (30)", href: "/catalogue" },
        { label: "Tech Job Trends", href: "/market" },
        { label: "News & Opportunities", href: "/opportunities" },
      ],
    },
    {
      title: "My Learning",
      links: [
        { label: "Your Step-by-Step Plan", href: "/roadmap" },
        { label: "Your Learning Progress", href: "/analytics" },
        { label: "Sprint Tasks", href: "/sprint-planner" },
        { label: "Saved Pathways", href: "/bookmarks" },
        { label: "Learner Profile", href: "/profile" },
      ],
    },
    {
      title: "Learn & Practise",
      links: [
        { label: "Learning Studio & Sandbox", href: "/learning" },
        { label: "Interactive Practice & Lab", href: "/simulator" },
        { label: "Check What You Know", href: "/assessment" },
        { label: "Problem-Solving Patterns", href: "/dsa-tracker" },
      ],
    },
    {
      title: "Build Projects",
      links: [
        { label: "Build Real Projects", href: "/projects" },
        { label: "System Architecture", href: "/architecture" },
        { label: "Public Portfolio", href: "/portfolio" },
      ],
    },
    {
      title: "AI Learning Guide",
      links: [
        { label: "Your AI Learning Guide", href: "/mentor" },
        { label: "AI & Prompt Blueprint", href: "/ai-blueprint" },
      ],
    },
    {
      title: "Careers & Opportunities",
      links: [
        { label: "Explore Matching Careers", href: "/career-match" },
        { label: "Find What You Need to Learn", href: "/skill-gap" },
        { label: "Improve Your Resume", href: "/resume" },
        { label: "Interview Simulator", href: "/simulator?mode=interview" },
        { label: "Readiness Diagnostic", href: "/readiness" },
        { label: "Sign In / Account", href: "/auth" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)]/95 backdrop-blur-md transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center font-display-serif font-bold text-sm shadow-xs group-hover:scale-105 transition-transform border border-[rgba(245,232,224,0.3)]">
              TT
            </div>
            <div className="flex flex-col">
              <span className="font-display-serif font-bold text-base tracking-wider text-[var(--color-burgundy)]">
                TALVIORA
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[var(--color-dusty-rose)]">
                Career Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items (7 Groups) */}
          <nav className="hidden xl:flex items-center gap-1 ml-2" aria-label="Main Navigation">
            {primaryNavGroups.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "btn-burgundy shadow-xs"
                      : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] hover:text-[var(--color-burgundy)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Elements */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Command Trigger Pill */}
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              window.dispatchEvent(event);
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] hover:bg-[var(--surface-rose)] text-[var(--color-burgundy)] text-xs font-mono-code transition cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3 h-3 text-[var(--color-burgundy)]" />
            <span>K</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Candidate Profile Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] hover:border-[var(--color-burgundy)] transition group"
            title="Learner Profile"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)]">
              <UserRound className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-[var(--color-burgundy)] hidden sm:inline">
              Learner Profile
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition border border-[rgba(var(--color-burgundy-rgb),0.15)] cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with 7 Groups */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] px-4 py-5 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in duration-150">
          {mobileNavSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)] opacity-80 px-2 block">
                {section.title}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {section.links.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)] font-bold border border-[rgba(var(--color-dusty-rose-rgb),0.6)]"
                          : "text-[var(--color-burgundy)]/90 hover:bg-[var(--surface-rose)]/50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
