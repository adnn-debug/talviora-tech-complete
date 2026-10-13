import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeType?: "emerald" | "rose" | "cyan" | "amber" | "neutral" | "olive" | "burgundy";
  progressPct?: number;
  progressColor?: string;
  icon?: LucideIcon;
  actionText?: string;
  actionHref?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  badge,
  badgeType = "burgundy",
  progressPct,
  progressColor = "var(--color-burgundy)",
  icon: Icon,
  actionText,
  actionHref,
}: StatCardProps) {
  const badgeColors: Record<string, string> = {
    burgundy: "bg-[var(--color-burgundy)]/12 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.25)]",
    olive: "bg-[var(--color-dusty-rose)]/25 text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.5)]",
    rose: "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.6)]",
    mauve: "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.6)]",
    chestnut: "bg-[var(--color-burgundy)]/12 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.25)]",
    beige: "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.2)]",
    emerald: "bg-[var(--color-dusty-rose)]/25 text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.5)]",
    cyan: "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.6)]",
    amber: "bg-[var(--color-burgundy)]/12 text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.25)]",
    neutral: "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.2)]",
  };

  return (
    <div className="card-coffee p-5 flex flex-col justify-between bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] hover:shadow-md transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-[var(--color-burgundy)]" />}
            <span className="text-[11px] font-bold text-[var(--color-burgundy)] tracking-wider uppercase">
              {title}
            </span>
          </div>
          {badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors[badgeType] || badgeColors.burgundy}`}
            >
              {badge}
            </span>
          )}
        </div>

        <div className="font-display-serif text-3xl sm:text-4xl font-normal text-[var(--color-burgundy)] tracking-tight">
          {value}
        </div>

        {subtitle && (
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-1.5 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {progressPct !== undefined && (
        <div className="mt-4 pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <div className="w-full h-1.5 bg-[var(--color-creme-latte)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, progressPct))}%`,
                backgroundColor: progressColor || "var(--color-burgundy)",
              }}
            />
          </div>
        </div>
      )}

      {actionText && actionHref && (
        <a
          href={actionHref}
          className="mt-3 text-xs font-bold text-[var(--color-burgundy)] hover:text-[var(--color-flowering-chestnut)] hover:underline flex items-center gap-1 transition"
        >
          {actionText} →
        </a>
      )}
    </div>
  );
}
