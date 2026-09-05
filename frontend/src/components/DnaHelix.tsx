/**
 * Pure CSS/SVG-free "3D" double helix — real perspective + rotateY/translateZ,
 * GPU-composited, zero network dependency. Used as the landing hero's always
 * -reliable visual (the network-dependent live 3Dmol viewer is a second,
 * additive proof-point elsewhere on the page — see LiveMoleculePreview).
 */
const RUNGS = 26;
const TURNS = 2.4;
const RADIUS = 84;
const STEP = 13; // px of vertical rise per rung

export function DnaHelix({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: RUNGS }, (_, i) => i);
  const totalHeight = RUNGS * STEP;

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '900px' }}
      aria-hidden="true"
    >
      <div
        className="relative mx-auto"
        style={{
          width: RADIUS * 2 + 40,
          height: totalHeight,
          transformStyle: 'preserve-3d',
          animation: 'helix-spin 14s linear infinite',
        }}
      >
        {rungs.map((i) => {
          const angle = (i / RUNGS) * TURNS * 360;
          const top = i * STEP;
          const strandA = i % 2 === 0;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-0"
              style={{ transform: `translateY(${top}px)`, transformStyle: 'preserve-3d' }}
            >
              {/* connecting rung */}
              <div
                className="absolute rounded-full"
                style={{
                  width: RADIUS * 2,
                  height: 2,
                  left: -RADIUS,
                  top: 0,
                  background: 'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(167,139,250,0.5))',
                  transform: `rotateY(${angle}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              />
              {/* strand A atom */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  left: -5,
                  top: -4,
                  background: strandA ? '#22d3ee' : '#a78bfa',
                  boxShadow: `0 0 10px 2px ${strandA ? 'rgba(34,211,238,0.85)' : 'rgba(167,139,250,0.85)'}`,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                }}
              />
              {/* strand B atom (opposite side) */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  left: -5,
                  top: -4,
                  background: strandA ? '#a78bfa' : '#22d3ee',
                  boxShadow: `0 0 10px 2px ${strandA ? 'rgba(167,139,250,0.85)' : 'rgba(34,211,238,0.85)'}`,
                  transform: `rotateY(${angle + 180}deg) translateZ(${RADIUS}px)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
