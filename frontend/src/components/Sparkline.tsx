/** Tiny illustrative line chart -- deterministic (seeded), not live data. */
export function Sparkline({ seed, color = '#059669', height = 56 }: { seed: number; color?: string; height?: number }) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const points = Array.from({ length: 24 }, (_, i) => {
    const base = 30 + Math.sin(i / 3 + seed) * 12;
    const noise = (rand() - 0.5) * 8;
    return Math.max(4, Math.min(56, base + noise + i * 0.3));
  });
  const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 100} ${60 - y}`).join(' ');
  return (
    <svg viewBox="0 0 100 60" width="100%" height={height} preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small "secondary structure over time" ribbon -- a colored grid standing in for a real DSSP heatmap. */
export function StructureRibbon({ seed }: { seed: number }) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const colors = ['#059669', '#34d399', '#a7f3d0', '#e2e8f0'];
  const rows = 4;
  const cols = 18;
  return (
    <svg viewBox={`0 0 ${cols} ${rows}`} width="100%" height={56} preserveAspectRatio="none">
      {Array.from({ length: rows * cols }, (_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        const c = colors[Math.floor(rand() * colors.length)];
        return <rect key={i} x={x} y={y} width={1} height={1} fill={c} />;
      })}
    </svg>
  );
}
