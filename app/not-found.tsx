import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-2xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)]/40 flex items-center justify-center text-[var(--color-burgundy)] shadow-xs">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-burgundy)]/80">
          404 Navigation Notice
        </span>
        <h1 className="text-3xl font-display-serif font-bold text-[var(--color-burgundy)]">
          Curriculum Route Not Found
        </h1>
        <p className="text-sm text-[var(--color-burgundy)]/80">
          The requested intelligence module, curriculum track, or profile resource could not be located.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:opacity-95 transition shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Career Dashboard
      </Link>
    </div>
  );
}
