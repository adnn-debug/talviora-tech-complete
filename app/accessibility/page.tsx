import { ShieldCheck, Eye, Keyboard } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="pb-4 border-b border-[var(--color-creme-latte)]">
        <h1 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
          Accessibility
        </h1>
        <p className="text-xs text-[var(--color-burgundy)]/80 mt-1">
          Current implementation notes · conformance has not been audited
        </p>
      </div>

      <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[var(--color-burgundy)]/80 leading-relaxed border border-[var(--color-creme-latte)] shadow-xs">
        <aside className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-4 text-sm leading-relaxed text-[var(--text-primary)]" role="note">
          Accessibility remains in progress. This page does not claim WCAG conformance. Keyboard, screen-reader, contrast, zoom, and touch behavior need testing across the full site.
        </aside>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[var(--color-dusty-rose)]" />
            <span>1. Color and contrast</span>
          </h2>
          <p>
            The interface uses a named warm color palette. Contrast ratios have not been measured throughout every route and theme; do not treat the palette as a conformance claim.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)] flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[var(--color-dusty-rose)]" />
            <span>2. Keyboard Navigation & Focus Rings</span>
          </h2>
          <p>
            Many controls are native links, buttons, and form elements, and focus styles are present in several shared components. Complete keyboard and screen-reader coverage still needs manual testing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)]">
            3. Universal Command Palette (Ctrl+K / Cmd+K)
          </h2>
          <p>
            The command palette supports keyboard navigation for the routes listed in it. The feature directory marks items 12–18 as pending the original specifications.
          </p>
        </section>
      </div>
    </div>
  );
}
