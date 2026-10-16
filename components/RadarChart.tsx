"use client";

interface RadarDataPoint {
  axis: string;
  candidateValue: number; // 0-100
  benchmarkValue: number; // 0-100
}

interface RadarChartProps {
  data?: RadarDataPoint[];
  size?: number;
}

export default function RadarChart({
  data = [
    { axis: "System Architecture", candidateValue: 78, benchmarkValue: 90 },
    { axis: "Core Programming", candidateValue: 85, benchmarkValue: 88 },
    { axis: "ML / Deep Learning", candidateValue: 68, benchmarkValue: 85 },
    { axis: "Distributed & Cloud", candidateValue: 62, benchmarkValue: 80 },
    { axis: "DSA & Problem Solving", candidateValue: 74, benchmarkValue: 84 },
    { axis: "Database & Storage", candidateValue: 80, benchmarkValue: 86 },
  ],
  size = 320,
}: RadarChartProps) {
  const center = size / 2;
  const radius = center - 42;
  const totalAxes = data.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const candidatePoints = data
    .map((d, i) => {
      const { x, y } = getCoordinates(d.candidateValue, i);
      return `${x},${y}`;
    })
    .join(" ");

  const benchmarkPoints = data
    .map((d, i) => {
      const { x, y } = getCoordinates(d.benchmarkValue, i);
      return `${x},${y}`;
    })
    .join(" ");

  const webLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        className="overflow-visible"
        aria-label="Skill Proficiency Radar Chart"
      >
        {/* Concentric Grid Polygons */}
        {webLevels.map((lvl) => {
          const points = data
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = lvl * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(" ");
          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke="var(--color-dusty-rose)"
              strokeOpacity={0.35}
              strokeDasharray={lvl < 1 ? "3 3" : undefined}
            />
          );
        })}

        {/* Spokes */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="var(--color-dusty-rose)"
              strokeOpacity={0.4}
            />
          );
        })}

        {/* Target Benchmark Area (Dusty Rose Dashed) */}
        <polygon
          points={benchmarkPoints}
          fill="rgba(var(--color-dusty-rose-rgb), 0.15)"
          stroke="var(--color-dusty-rose)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Candidate Area (Deep Rose Burgundy Fill) */}
        <polygon
          points={candidatePoints}
          fill="rgba(var(--color-burgundy-rgb), 0.18)"
          stroke="var(--color-burgundy)"
          strokeWidth="2.5"
        />

        {/* Candidate Points & Indicators */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(d.candidateValue, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4.5"
              fill="var(--color-burgundy)"
              stroke="var(--color-warm-ivory)"
              strokeWidth="1.5"
              className="transition-transform hover:scale-125"
            />
          );
        })}

        {/* Axis Labels */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDistance = radius + 22;
          const lx = center + labelDistance * Math.cos(angle);
          const ly = center + labelDistance * Math.sin(angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] font-bold fill-[var(--color-burgundy)]"
            >
              {d.axis}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-burgundy)]"></span>
          <span className="text-[var(--color-burgundy)]">Your Current Acumen</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-[var(--color-flowering-chestnut)]"></span>
          <span className="text-[var(--color-flowering-chestnut)]">Target Role Benchmark</span>
        </div>
      </div>
    </div>
  );
}
