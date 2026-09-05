import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * The hero's centerpiece: a Cα backbone trace that resolves out of noise,
 * holds, and dissolves back -- a literal, to-scale animation of what
 * RFdiffusion actually does (denoise random coordinates into a folded
 * backbone over T timesteps), not a decorative rotating shape.
 *
 * Deliberately hand-rolled with refs + rAF (not a spring library looping
 * over React state) so 45 points can update every frame without a
 * re-render storm -- the kind of detail that doesn't survive a first pass.
 */
const N = 42; // residues in the trace
const RESIDUES_PER_TURN = 3.6; // real alpha-helix geometry
const RISE_PER_RESIDUE = 6.2; // display units
const HELIX_RADIUS = 46;
const VIEW = 340;
const PERSPECTIVE = 620;
const T_MAX = 50; // mirrors the default `iterations` field in the Design form

type Vec3 = [number, number, number];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeNoiseCloud(seed: number): Vec3[] {
  const rand = seededRandom(seed);
  return Array.from({ length: N }, () => {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 70 + rand() * 90;
    return [
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * 0.9,
      r * Math.sin(phi) * Math.sin(theta),
    ] as Vec3;
  });
}

const TARGET: Vec3[] = Array.from({ length: N }, (_, i) => {
  const angle = (i / RESIDUES_PER_TURN) * Math.PI * 2;
  return [
    HELIX_RADIUS * Math.cos(angle),
    (i - N / 2) * RISE_PER_RESIDUE,
    HELIX_RADIUS * Math.sin(angle),
  ] as Vec3;
});

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Cycle timing, in seconds: resolve -> hold folded -> denoise -> hold noise -> repeat
const T_RESOLVE = 3.6;
const T_HOLD_FOLDED = 2.2;
const T_DENOISE = 2.6;
const T_HOLD_NOISE = 1.0;
const T_CYCLE = T_RESOLVE + T_HOLD_FOLDED + T_DENOISE + T_HOLD_NOISE;

export function DiffusionBackbone({ className = '' }: { className?: string }) {
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const glowRefs = useRef<(SVGCircleElement | null)[]>([]);
  const noiseA = useRef(makeNoiseCloud(7));
  const noiseB = useRef(makeNoiseCloud(101));
  const rotation = useRef(0.4);
  const [tDisplay, setTDisplay] = useState(T_MAX);
  const [phaseLabel, setPhaseLabel] = useState('diffusing');

  const stagger = useMemo(() => Array.from({ length: N }, (_, i) => (i / N) * 0.4), []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let lastTDisplay = -1;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock = (clock + dt) % T_CYCLE;
      rotation.current += dt * 0.18;

      // Determine which leg of the cycle we're in and a 0..1 "resolved-ness"
      let resolved: number;
      let usingCloud = noiseA.current;
      let label = 'diffusing';
      if (clock < T_RESOLVE) {
        resolved = clock / T_RESOLVE;
        usingCloud = noiseA.current;
        label = 'diffusing';
      } else if (clock < T_RESOLVE + T_HOLD_FOLDED) {
        resolved = 1;
        label = 'resolved';
      } else if (clock < T_RESOLVE + T_HOLD_FOLDED + T_DENOISE) {
        resolved = 1 - (clock - T_RESOLVE - T_HOLD_FOLDED) / T_DENOISE;
        usingCloud = noiseB.current;
        label = 'diffusing';
      } else {
        resolved = 0;
        usingCloud = noiseB.current;
        label = 'queued';
      }

      const tNow = Math.round((1 - resolved) * T_MAX);
      if (tNow !== lastTDisplay) {
        lastTDisplay = tNow;
        setTDisplay(tNow);
        setPhaseLabel(label);
      }

      const cos = Math.cos(rotation.current);
      const sin = Math.sin(rotation.current);

      for (let i = 0; i < N; i++) {
        const localT = Math.max(0, Math.min(1, (resolved - stagger[i]) / (1 - 0.4)));
        const eased = easeInOutCubic(localT);
        const [nx, ny, nz] = usingCloud[i];
        const [tx, ty, tz] = TARGET[i];
        const x = lerp(nx, tx, eased);
        const y = lerp(ny, ty, eased);
        const z = lerp(nz, tz, eased);

        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        const scale = PERSPECTIVE / (PERSPECTIVE + rz);
        const sx = VIEW / 2 + rx * scale;
        const sy = VIEW / 2 + y * scale;

        const circle = circleRefs.current[i];
        const glow = glowRefs.current[i];
        if (circle) {
          circle.setAttribute('cx', sx.toFixed(2));
          circle.setAttribute('cy', sy.toFixed(2));
          circle.setAttribute('r', (1.6 + eased * 1.6 + scale * 0.6).toFixed(2));
          const hue = lerp(210, 158, i / N); // slate-ish -> bio-teal along the chain
          const sat = lerp(8, 70, eased);
          const light = lerp(45, 62, eased);
          circle.setAttribute('fill', `hsl(${hue} ${sat}% ${light}%)`);
          circle.setAttribute('fill-opacity', (0.35 + eased * 0.65).toFixed(2));
        }
        if (glow) {
          glow.setAttribute('cx', sx.toFixed(2));
          glow.setAttribute('cy', sy.toFixed(2));
          glow.setAttribute('r', (5 + eased * 5).toFixed(2));
          glow.setAttribute('fill-opacity', (eased * 0.18).toFixed(2));
        }

        if (i < N - 1) {
          const line = lineRefs.current[i];
          if (line) {
            line.setAttribute('x1', sx.toFixed(2));
            line.setAttribute('y1', sy.toFixed(2));
            // peek at neighbor's position by reusing its already-set circle
            const nCircle = circleRefs.current[i + 1];
            if (nCircle) {
              line.setAttribute('x2', nCircle.getAttribute('cx') ?? sx.toFixed(2));
              line.setAttribute('y2', nCircle.getAttribute('cy') ?? sy.toFixed(2));
            }
            const nextLocalT = Math.max(0, Math.min(1, (resolved - stagger[i + 1]) / (1 - 0.4)));
            const pairEased = Math.min(eased, easeInOutCubic(nextLocalT));
            line.setAttribute('stroke-opacity', (pairEased * 0.55).toFixed(2));
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [stagger]);

  return (
    <div className={`relative select-none ${className}`}>
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full h-full overflow-visible" aria-hidden="true">
        <g style={{ filter: 'drop-shadow(0 0 6px rgba(62,232,168,0.25))' }}>
          {Array.from({ length: N - 1 }, (_, i) => (
            <line
              key={`l-${i}`}
              ref={(el) => { lineRefs.current[i] = el; }}
              stroke="var(--color-bio-400)"
              strokeWidth={1}
              strokeOpacity={0}
            />
          ))}
          {Array.from({ length: N }, (_, i) => (
            <circle key={`g-${i}`} ref={(el) => { glowRefs.current[i] = el; }} r={0} fill="var(--color-bio-400)" fillOpacity={0} />
          ))}
          {Array.from({ length: N }, (_, i) => (
            <circle key={`c-${i}`} ref={(el) => { circleRefs.current[i] = el; }} r={0} />
          ))}
        </g>
      </svg>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full flex items-center gap-2.5 font-lab text-[11px] tracking-wider whitespace-nowrap">
        <span className="text-slate-500">T&nbsp;=</span>
        <span className="text-bio-400 tabular-nums w-5 text-center">{tDisplay.toString().padStart(2, '0')}</span>
        <span className="h-3 w-px bg-slate-700" />
        <span className="text-slate-500 uppercase">{phaseLabel}<span className="caret" /></span>
      </div>
    </div>
  );
}
