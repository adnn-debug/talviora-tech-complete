import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, BookOpen, Compass, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] mt-16 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center font-bold text-sm shadow-xs">
                TT
              </div>
              <span className="font-display-serif font-bold text-lg text-[var(--color-burgundy)] tracking-wider">
                TALVIORA TECH
              </span>
            </div>
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
              Learning exercises and career-preparation tools. AI, account storage, market data, and opportunity feeds depend on connected services.
            </p>
            <div className="p-2.5 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[11px] text-[var(--color-burgundy)] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[var(--color-burgundy)]" />
              <span>Check each linked provider for access terms and costs.</span>
            </div>
          </div>

          {/* Learning & Mastery */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Learning Ecosystem
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/roadmap" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Your Step-by-Step Plan (Roadmap)</Link></li>
              <li><Link href="/projects" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Build Real Projects (Project Lab)</Link></li>
              <li><Link href="/dsa-tracker" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Learn Problem-Solving Patterns</Link></li>
              <li><Link href="/learning" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Learning Studio & Modules</Link></li>
              <li><Link href="/catalogue" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Explore All Tech Fields (Catalogue)</Link></li>
            </ul>
          </div>

          {/* Career Intelligence */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Career Intelligence
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/assessment" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Check What You Know (Assessment)</Link></li>
              <li><Link href="/career-match" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Explore Careers That Match Your Interests</Link></li>
              <li><Link href="/market" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Tech Job Trends & Compensation</Link></li>
              <li><Link href="/resume" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Improve Your Resume</Link></li>
              <li><Link href="/simulator" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Interview Simulator</Link></li>
            </ul>
          </div>

          {/* Opportunities & Standards */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Opportunities & Trust
            </span>
            <ul className="space-y-2 text-[var(--color-burgundy)]/80 font-medium">
              <li><Link href="/opportunities" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Current Opportunities (feed unavailable)</Link></li>
              <li><Link href="/portfolio" className="hover:text-[var(--color-flowering-chestnut)] hover:underline transition">Public Profile</Link></li>
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
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-dusty-rose)]" /> Keyboard focus states
            </span>
            <span>•</span>
            <span>Warm editorial palette</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
