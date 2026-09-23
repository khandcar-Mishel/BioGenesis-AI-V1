import type { CSSProperties } from 'react';

/**
 * Pure CSS/SVG-free "3D" double helix -- real perspective + rotateY/translateZ,
 * GPU-composited, zero network dependency. Ambient decorative layer for the
 * landing hero, meant to sit behind the live 3Dmol preview (see HeroVisual)
 * for depth rather than as the sole visual.
 *
 * Depth is real, not faked: each atom/rung gets its own `atom-depth` /
 * `rung-depth` animation phase-locked to the parent's `helix-spin` via a
 * negative animation-delay derived from its static angle, so far-side
 * geometry fades and blurs in sync with the actual rotation -- atmospheric
 * perspective with zero per-frame JS or canvas.
 */
const RUNGS = 26;
const TURNS = 2.4;
const RADIUS = 84;
const STEP = 13; // px of vertical rise per rung
const SPIN_DURATION = 16; // s -- shared by helix-spin and the per-atom depth animations
const SPIN_EASE = 'cubic-bezier(0.45, 0, 0.55, 1)';
const PARTICLE_COUNT = 14;

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  const distance = 34 + (i % 5) * 11;
  return {
    left: 50 + Math.cos(angle) * distance,
    top: 50 + Math.sin(angle) * distance * 0.72,
    size: 3 + (i % 4) * 2.5,
    opacity: 0.25 + (i % 3) * 0.12,
    duration: 5.5 + (i % 5) * 1.3,
    delay: (i * 0.41) % 4,
    driftX: (i % 2 === 0 ? 1 : -1) * (6 + (i % 4) * 3),
    driftY: -8 - (i % 4) * 4,
  };
});

export function DnaHelix({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: RUNGS }, (_, i) => i);
  const totalHeight = RUNGS * STEP;

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '900px' }}
      aria-hidden="true"
    >
      {/* Ambient glow behind the helix -- soft mint radial wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(5, 150, 105, 0.16), transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Drifting particle field -- pure CSS, no canvas */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(16,185,129,0.9), rgba(16,185,129,0) 70%)',
            animation: `particle-drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--particle-op': p.opacity,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
          } as CSSProperties & Record<string, string | number>}
        />
      ))}

      <div
        className="relative mx-auto"
        style={{
          width: RADIUS * 2 + 40,
          height: totalHeight,
          transformStyle: 'preserve-3d',
          animation: `helix-spin ${SPIN_DURATION}s ${SPIN_EASE} infinite`,
        }}
      >
        {rungs.map((i) => {
          const angle = (i / RUNGS) * TURNS * 360;
          const top = i * STEP;
          const strandA = i % 2 === 0;
          // Negative delay = -(phase fraction) * duration syncs each element's
          // local depth-animation clock to the parent's current rotation.
          const phaseDelay = -((angle % 360) / 360) * SPIN_DURATION;
          const phaseDelayOpp = -(((angle + 180) % 360) / 360) * SPIN_DURATION;

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
                  background: 'linear-gradient(90deg, rgba(5,150,105,0.55), rgba(16,185,129,0.35))',
                  transform: `rotateY(${angle}deg)`,
                  transformStyle: 'preserve-3d',
                  animation: `rung-depth ${SPIN_DURATION}s ${SPIN_EASE} ${phaseDelay}s infinite`,
                }}
              />
              {/* strand A atom -- deep mint */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  left: -5,
                  top: -4,
                  background: strandA ? '#059669' : '#6ee7b7',
                  boxShadow: `0 0 10px 2px ${strandA ? 'rgba(5,150,105,0.85)' : 'rgba(110,231,183,0.85)'}`,
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  animation: `atom-depth ${SPIN_DURATION}s ${SPIN_EASE} ${phaseDelay}s infinite`,
                }}
              />
              {/* strand B atom (opposite side) -- lighter mint */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 10,
                  height: 10,
                  left: -5,
                  top: -4,
                  background: strandA ? '#6ee7b7' : '#059669',
                  boxShadow: `0 0 10px 2px ${strandA ? 'rgba(110,231,183,0.85)' : 'rgba(5,150,105,0.85)'}`,
                  transform: `rotateY(${angle + 180}deg) translateZ(${RADIUS}px)`,
                  animation: `atom-depth ${SPIN_DURATION}s ${SPIN_EASE} ${phaseDelayOpp}s infinite`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Soft reflection / vignette under the helix */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 -z-10"
        style={{
          width: RADIUS * 2.2,
          height: 28,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(5,150,105,0.28), transparent 72%)',
          filter: 'blur(6px)',
        }}
      />
    </div>
  );
}
