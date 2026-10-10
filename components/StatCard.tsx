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
  progressColor = "#6F1737",
  icon: Icon,
  actionText,
  actionHref,
}: StatCardProps) {
  const badgeColors = {
    burgundy: "bg-[#6F1737]/10 text-[#6F1737] dark:bg-[#C58F98]/20 dark:text-[#F0C4CC] border-[#6F1737]/20",
    olive: "bg-[#96977A]/15 text-[#96977A] border-[#96977A]/30",
    rose: "bg-[#C58F98]/15 text-[#8D514B] dark:text-[#C58F98] border-[#C58F98]/30",
    emerald: "bg-[#96977A]/15 text-[#96977A] border-[#96977A]/30",
    cyan: "bg-[#A77C91]/15 text-[#A77C91] border-[#A77C91]/30",
    amber: "bg-[#C8B39A]/20 text-[#8D514B] border-[#C8B39A]/30",
    neutral: "bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#7E6962] dark:text-zinc-400 border-[#B59A83]/30",
  };

  return (
    <div className="card-coffee p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-[#7E6962] dark:text-[#B59A83]" />}
            <span className="text-[11px] font-bold text-[#7E6962] dark:text-[#B59A83] tracking-wider uppercase">
              {title}
            </span>
          </div>
          {badge && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors[badgeType]}`}
            >
              {badge}
            </span>
          )}
        </div>

        <div className="font-display-serif text-3xl sm:text-4xl font-normal text-[#6F1737] dark:text-[#FFF9F0] tracking-tight">
          {value}
        </div>

        {subtitle && (
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {progressPct !== undefined && (
        <div className="mt-4 pt-3 border-t border-[#B59A83]/20 dark:border-zinc-800">
          <div className="w-full h-1.5 bg-[#F5EBDD] dark:bg-[#2E1F21] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(0, progressPct))}%`,
                backgroundColor: progressColor,
              }}
            />
          </div>
        </div>
      )}

      {actionText && actionHref && (
        <a
          href={actionHref}
          className="mt-3 text-xs font-bold text-[#6F1737] dark:text-[#C58F98] hover:underline flex items-center gap-1"
        >
          {actionText} →
        </a>
      )}
    </div>
  );
}
