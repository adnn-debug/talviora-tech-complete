"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Sparkles, Command, Menu, X, ShieldCheck, Heart } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Landing", href: "/welcome" },
    { label: "Learning Studio", href: "/learning" },
    { label: "Assessment", href: "/assessment" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Project Lab", href: "/projects" },
    { label: "AI Mentor", href: "/mentor" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Catalogue", href: "/catalogue" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#B59A83]/30 dark:border-zinc-800 bg-[#FFF9F0]/90 dark:bg-[#1F1515]/90 backdrop-blur-md transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#6F1737] dark:bg-[#C58F98] text-[#FFF9F0] dark:text-[#241A1A] flex items-center justify-center font-display-serif font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              TT
            </div>
            <div className="flex flex-col">
              <span className="font-display-serif font-bold text-base tracking-wider text-[#6F1737] dark:text-[#F0C4CC]">
                TALVIORA
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#A77C91] dark:text-[#C58F98]">
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
                      : "text-[#3B2527] dark:text-zinc-300 hover:text-[#6F1737] dark:hover:text-[#F0C4CC] hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21]"
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
          {/* Free Learning Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#96977A]/15 text-[#96977A] text-[11px] font-bold">
            <Heart className="w-3 h-3 fill-current" />
            <span>100% Free Learning</span>
          </div>

          {/* Gemini AI Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#6F1737]/20 dark:border-[#C58F98]/20 bg-[#6F1737]/5 dark:bg-[#C58F98]/10 text-[#6F1737] dark:text-[#F0C4CC] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#C58F98] animate-pulse"></span>
            <Sparkles className="w-3 h-3 text-[#C58F98]" />
            <span>Gemini AI Connected</span>
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
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] hover:bg-[#F5EBDD] text-[#7E6962] dark:text-zinc-400 text-xs font-mono-code transition cursor-pointer"
            title="Open Command Palette"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* Candidate Profile Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-[#B59A83]/40 bg-white/80 dark:bg-[#2E1F21] hover:border-[#6F1737] transition group"
          >
            <div className="w-7 h-7 rounded-full bg-[#6F1737] text-[#FFF9F0] dark:bg-[#C58F98] dark:text-[#241A1A] flex items-center justify-center font-bold text-xs">
              FR
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-[#241A1A] dark:text-[#FFF9F0] leading-tight">
                Feriha
              </span>
              <span className="text-[9px] text-[#A77C91] dark:text-[#C58F98] leading-tight font-semibold">
                AI Architect
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="2xl:hidden p-2 rounded-xl border border-[#B59A83]/40 text-[#241A1A] dark:text-[#FFF9F0] hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-t border-[#B59A83]/30 dark:border-zinc-800 bg-[#FFF9F0] dark:bg-[#1F1515] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#B59A83]/20 dark:border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                  pathname === link.href
                    ? "btn-burgundy"
                    : "text-[#3B2527] dark:text-zinc-300 hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-[#7E6962] dark:text-zinc-400">
            <span className="flex items-center gap-1.5 text-[#96977A]">
              <ShieldCheck className="w-4 h-4" /> Supabase Session Active
            </span>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-[#6F1737] dark:text-[#F0C4CC] hover:underline"
            >
              Sign In / Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
