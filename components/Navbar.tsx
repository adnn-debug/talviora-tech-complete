"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Command, Menu, X, UserRound } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Landing", href: "/welcome" },
    { label: "Feature Directory", href: "/features" },
    { label: "Learning Studio", href: "/learning" },
    { label: "Assessment", href: "/assessment" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Project Lab", href: "/projects" },
    { label: "AI Mentor", href: "/mentor" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Catalogue", href: "/catalogue" },
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

          {/* Desktop Nav Items */}
          <nav className="hidden 2xl:flex items-center gap-1 ml-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
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
          {/* Preview status badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[11px] font-bold">
            <span>Preview Workspace</span>
          </div>

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
            title="Open Command Palette"
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
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)]"><UserRound className="h-4 w-4" /></span>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[var(--color-burgundy)] leading-tight">
                Learner
              </span>
              <span className="text-[9px] text-[var(--color-dusty-rose)] leading-tight font-semibold">
                Profile & settings
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="application-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="application-mobile-menu" className="2xl:hidden border-t border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === link.href
                    ? "btn-burgundy"
                    : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-[var(--color-burgundy)]">
            <span className="flex items-center gap-1.5 font-semibold">
              <UserRound className="h-4 w-4 text-[var(--color-dusty-rose)]" /> Preview workspace
            </span>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-[var(--color-burgundy)] hover:underline"
            >
              Sign In / Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
