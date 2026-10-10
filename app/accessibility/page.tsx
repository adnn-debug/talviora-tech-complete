import { ShieldCheck, Eye, Keyboard } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
          Accessibility Statement (WCAG 2.2 AAA)
        </h1>
        <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1">
          Universal Access & Inclusive Engineering Standards
        </p>
      </div>

      <div className="card-coffee p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 leading-relaxed font-sans-ui">
        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C58F98]" />
            <span>1. Contrast Standards & European Coffee-House Palette</span>
          </h2>
          <p>
            The TALVIORA TECH color palette is engineered for high contrast compliance. Text elements use Deep Espresso (`#241A1A`) against Warm Ivory (`#FFF9F0`) and Crème Latte (`#F5EBDD`) in light mode, ensuring contrast ratios exceeding 7:1 (WCAG AAA level).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0] flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#C58F98]" />
            <span>2. Keyboard Navigation & Focus Rings</span>
          </h2>
          <p>
            Every interactive element, tab, modal, and button is fully navigable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`). Focus states have visible 2px burgundy and dusty rose outline offsets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-base text-[#6F1737] dark:text-[#FFF9F0]">
            3. Universal Command Palette (Ctrl+K / Cmd+K)
          </h2>
          <p>
            Power users and screen reader users can trigger instant keyboard navigation across all 31 platform features without needing mouse drag or hover interactions.
          </p>
        </section>
      </div>
    </div>
  );
}
