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
              <span className="font-semibold text-[#241A1A] dark:text-[#FFF9F0]">{item.label}</span>
              <span className="font-mono-code font-bold text-[#6F1737] dark:text-[#F0C4CC]">
                {item.subtext || `${item.value}%`}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F5EBDD] dark:bg-[#2E1F21] overflow-hidden border border-[#B59A83]/20">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: item.color || "#6F1737",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
