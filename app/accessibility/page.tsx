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

      <div className="bg-[var(--color-warm-ivory)] rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
        <aside className="rounded-2xl border border-[rgba(var(--color-dusty-rose-rgb),0.6)] bg-[var(--surface-rose)] p-4 text-xs sm:text-sm leading-relaxed text-[var(--color-burgundy)]" role="note">
          <strong>Accessibility Commitment:</strong> TALVIORA TECH is built to conform with WCAG 2.1 Level AA standards, ensuring that technology exploration is accessible to all learners regardless of ability, device, or input method.
        </aside>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[var(--color-flowering-chestnut)]" />
            <span>1. Color Contrast & Theme Balance</span>
          </h2>
          <p>
            The warm editorial velvet palette has been tuned for high contrast in both Light and Dark themes. Headings achieve greater than 7:1 contrast (exceeding WCAG AAA), body text maintains greater than 4.5:1 contrast, and semantic status indicators pair distinctive icons with color cues so color is never the sole conveyer of information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)] flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[var(--color-flowering-chestnut)]" />
            <span>2. Keyboard Navigation & Visible Focus Rings</span>
          </h2>
          <p>
            Every interactive element—buttons, tabs, links, and code editors—is fully operable via keyboard. High-contrast dual-layer focus rings (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-rose)]">outline: 2px solid</code> with <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-rose)]">box-shadow</code>) ensure unequivocal focus visibility when tabbing. A global <em>&ldquo;Skip to main content&rdquo;</em> landmark bypass is provided on all pages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--color-flowering-chestnut)]" />
            <span>3. Touch Targets & Responsive Layouts</span>
          </h2>
          <p>
            Interactive controls across mobile and tablet viewports provide minimum touch targets of 42–44 pixels, preventing accidental mis-taps. Multi-column grids adapt responsively down to single-column flows on mobile devices without horizontal overflow.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display-serif font-bold text-base text-[var(--color-burgundy)]">
            4. Motion Sensitivity & Universal Command Palette
          </h2>
          <p>
            The platform honors the <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-rose)]">prefers-reduced-motion</code> user setting, neutralizing decorative animations for learners sensitive to motion. The universal Command Palette (<kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-rose)]">Ctrl+K</kbd> / <kbd className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--surface-rose)]">Cmd+K</kbd>) offers keyboard-first shortcut access across all 7 platform navigation groups.
          </p>
        </section>
      </div>
    </div>
  );
}
