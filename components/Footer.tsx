import Link from "next/link";
import { ShieldCheck, Sparkles, BookOpen, Compass, Award, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] mt-16 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info & Home */}
          <div className="space-y-3.5 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center font-bold text-sm shadow-xs">
                TT
              </div>
              <span className="font-display-serif font-bold text-lg text-[var(--color-burgundy)] tracking-wider">
                TALVIORA TECH
              </span>
            </div>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
              Learn tech your way. Beginner-friendly technology exploration, step-by-step learning roadmaps, interactive coding practice, and career planning.
            </p>
            <div className="space-y-1.5 pt-1 text-xs text-[var(--color-burgundy)]/80 font-medium">
              <div><Link href="/" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Home Overview</Link></div>
              <div><Link href="/welcome" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Public Overview</Link></div>
              <div><Link href="/features" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Platform Features (31 Register)</Link></div>
            </div>
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[11px] text-[var(--color-burgundy)] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[var(--color-burgundy)]" />
              <span>Independent, private learning without ads or paywalls.</span>
            </div>
          </div>

          {/* Explore & My Learning */}
          <div className="space-y-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Explore & My Learning
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/catalogue" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Explore All Tech Fields (30 Topics)</Link></li>
              <li><Link href="/market" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Tech Job Trends & Compensation</Link></li>
              <li><Link href="/opportunities" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">News & Opportunities</Link></li>
              <li><Link href="/roadmap" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Your Step-by-Step Plan (Roadmap)</Link></li>
              <li><Link href="/analytics" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Your Learning Progress (Analytics)</Link></li>
              <li><Link href="/sprint-planner" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Sprint Tasks (Kanban Planner)</Link></li>
              <li><Link href="/bookmarks" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Saved Pathways & Bookmarks</Link></li>
            </ul>
          </div>

          {/* Learn & Practise & Build Projects */}
          <div className="space-y-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Learn, Practise & Build
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/learning" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Learning Studio & Sandbox</Link></li>
              <li><Link href="/simulator" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Interactive Practice & Lab (8 Steps)</Link></li>
              <li><Link href="/assessment" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Check What You Know (Diagnostic)</Link></li>
              <li><Link href="/dsa-tracker" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Problem-Solving Patterns (DSA)</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Build Real Projects (Project Lab)</Link></li>
              <li><Link href="/architecture" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">System Architecture Explorer</Link></li>
              <li><Link href="/portfolio" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Public Portfolio & Showcase</Link></li>
            </ul>
          </div>

          {/* AI Guide, Careers & Trust */}
          <div className="space-y-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              AI Guide & Careers
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/mentor" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Your AI Learning Guide (AI Mentor)</Link></li>
              <li><Link href="/ai-blueprint" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">AI & Prompt Blueprint</Link></li>
              <li><Link href="/career-match" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Explore Matching Careers</Link></li>
              <li><Link href="/skill-gap" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Find What You Need to Learn</Link></li>
              <li><Link href="/resume" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Improve Your Resume (Resume Editor)</Link></li>
              <li><Link href="/simulator?mode=interview" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Interview Simulator</Link></li>
              <li><Link href="/readiness" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Readiness Diagnostic</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Terms & Free Learning Principles</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Privacy & Zero-Ad Safeguards</Link></li>
              <li><Link href="/accessibility" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Accessibility Notes</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[rgba(var(--color-burgundy-rgb),0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--color-burgundy)]/80 font-medium">
          <div>
            © {new Date().getFullYear()} TALVIORA TECH. Autonomous Career Intelligence Ecosystem.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[var(--color-burgundy)] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-flowering-chestnut)]" /> WCAG 2.1 AA Accessible
            </span>
            <span>•</span>
            <span>7 Navigation Groups</span>
            <span>•</span>
            <span>Warm Editorial Velvet Theme</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
