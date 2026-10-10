import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, BookOpen, Compass, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#B59A83]/30 dark:border-zinc-800 bg-[#FFF9F0]/80 dark:bg-[#1F1515]/90 mt-16 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#6F1737] dark:bg-[#C58F98] text-[#FFF9F0] dark:text-[#241A1A] flex items-center justify-center font-bold text-sm">
                TT
              </div>
              <span className="font-display-serif font-bold text-lg text-[#6F1737] dark:text-[#F0C4CC] tracking-wider">
                TALVIORA TECH
              </span>
            </div>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 leading-relaxed">
              Autonomous AI Career Intelligence & Technology Mastery Platform. Helping learners discover what to learn, master it through practice, and connect skills to real industry opportunities.
            </p>
            <div className="p-2.5 rounded-xl bg-[#F5EBDD] dark:bg-[#2E1F21] border border-[#B59A83]/30 text-[11px] text-[#6F1737] dark:text-[#F0C4CC] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#C58F98]" />
              <span>100% Free Learning Platform • No Paywalls</span>
            </div>
          </div>

          {/* Learning & Mastery */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[#6F1737] dark:text-[#F0C4CC] block">
              Learning Ecosystem
            </span>
            <ul className="space-y-2 text-[#4A3A37] dark:text-zinc-400">
              <li><Link href="/roadmap" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">16-Week Dynamic Roadmap</Link></li>
              <li><Link href="/projects" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Industry Project Lab</Link></li>
              <li><Link href="/dsa-tracker" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">14 Algorithmic Patterns</Link></li>
              <li><Link href="/learning" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Learning Studio & Modules</Link></li>
              <li><Link href="/catalogue" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Technology & Tools Catalogue</Link></li>
            </ul>
          </div>

          {/* Career Intelligence */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[#6F1737] dark:text-[#F0C4CC] block">
              Career Intelligence
            </span>
            <ul className="space-y-2 text-[#4A3A37] dark:text-zinc-400">
              <li><Link href="/assessment" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Adaptive Assessment Centre</Link></li>
              <li><Link href="/career-match" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Role Alignment Matrix</Link></li>
              <li><Link href="/market" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Live Salary & Market Trends</Link></li>
              <li><Link href="/resume" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Smart Resume & ATS Engine</Link></li>
              <li><Link href="/simulator" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Technical Interview Simulator</Link></li>
            </ul>
          </div>

          {/* Opportunities & Standards */}
          <div className="space-y-2.5 text-xs">
            <span className="font-bold uppercase tracking-wider text-[#6F1737] dark:text-[#F0C4CC] block">
              Opportunities & Trust
            </span>
            <ul className="space-y-2 text-[#4A3A37] dark:text-zinc-400">
              <li><Link href="/opportunities" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Tech News & Govt Opportunities</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Verified Proof-of-Work Portfolios</Link></li>
              <li><Link href="/terms" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Terms & Free Learning Principles</Link></li>
              <li><Link href="/privacy" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Privacy & Zero-Ad Safeguards</Link></li>
              <li><Link href="/accessibility" className="hover:text-[#6F1737] dark:hover:text-[#C58F98] transition">Accessibility (WCAG AAA)</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#B59A83]/20 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7E6962] dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} TALVIORA TECH. Autonomous Career Intelligence Ecosystem.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#96977A]">
              <ShieldCheck className="w-3.5 h-3.5" /> High-Contrast Accessible Design
            </span>
            <span>•</span>
            <span>European Coffee-House Palette</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
