/**
 * Background texture for dark sections -- real RFdiffusion syntax drifting
 * at low opacity, standing in for the generic blurred gradient orbs. Every
 * string here is something a user can actually type into the Design form.
 */
const SNIPPETS = [
  'contigs: A:50-70',
  "hotspot: E64,E88,E96",
  'symmetry: c2 · order 2',
  'diffuser.T=50',
  'pdb: 4N5T',
  'inference.num_designs=8',
  'contigs: 40/A163-181/40',
  'ppi.hotspot_res',
];

// Hugs the far corners/edges only -- content columns sit in the middle
// 4-92% band, so nothing here ever collides with foreground copy or buttons.
const LAYOUT = [
  { top: '6%', right: '3%', size: 10, delay: 0, dur: 28 },
  { top: '92%', left: '2%', size: 10, delay: 10, dur: 30 },
  { top: '48%', right: '1.5%', size: 9, delay: 5, dur: 32 },
];

export function TechnicalNoise() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {LAYOUT.map((pos, i) => (
        <span
          key={i}
          className="absolute font-lab text-slate-500"
          style={{
            top: pos.top,
            left: 'left' in pos ? pos.left : undefined,
            right: 'right' in pos ? pos.right : undefined,
            fontSize: pos.size,
            animation: `drift ${pos.dur}s ease-in-out ${pos.delay}s infinite`,
            ['--drift-o' as string]: 0.4,
          }}
        >
          {SNIPPETS[i % SNIPPETS.length]}
        </span>
      ))}
    </div>
  );
}
