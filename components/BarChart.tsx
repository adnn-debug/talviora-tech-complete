"use client";

interface BarChartProps {
  items: {
    label: string;
    value: number;
    maxValue: number;
    subtext?: string;
    color?: string;
  }[];
}

export default function BarChart({ items }: BarChartProps) {
  return (
    <div className="space-y-4 w-full">
      {items.map((item, idx) => {
        const pct = Math.min(100, Math.round((item.value / item.maxValue) * 100));
        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-burgundy)]">{item.label}</span>
              <span className="font-mono-code font-bold text-[var(--color-burgundy)]">
                {item.subtext || `${item.value}%`}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[var(--color-creme-latte)] overflow-hidden border border-[var(--color-dusty-rose)]/20">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: item.color || "var(--color-burgundy)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
