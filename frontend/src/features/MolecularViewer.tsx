import { useEffect, useRef, useState } from 'react';
import { ArrowClockwise, ArrowCounterClockwise, Hand, MagnifyingGlassPlus, ArrowsOut } from '@phosphor-icons/react';

interface ViewerProps {
  pdbData?: string;
  pdbId?: string;
}

type Representation = 'cartoon' | 'surface' | 'stick';

const STYLES: { id: Representation; label: string }[] = [
  { id: 'cartoon', label: 'Cartoon' },
  { id: 'surface', label: 'Surface' },
  { id: 'stick', label: 'Stick' },
];

/** Smoothly applies one of three representations to a live 3Dmol viewer. */
function applyRepresentation(viewer: any, w: any, rep: Representation) {
  viewer.removeAllSurfaces();
  if (rep === 'cartoon') {
    viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
  } else if (rep === 'stick') {
    viewer.setStyle({}, { stick: { radius: 0.16, colorscheme: 'Jmol' } });
  } else {
    // surface: a translucent envelope over a faint spectrum cartoon underneath,
    // for a more cinematic, biologically legible look than a flat solid shell.
    viewer.setStyle({}, { cartoon: { color: 'spectrum', opacity: 0.55 } });
    try {
      viewer.addSurface(w.$3Dmol.SurfaceType.VDW, {
        opacity: 0.82,
        colorscheme: 'whiteCarbon',
      });
    } catch {
      // Surface generation can fail on huge/odd structures -- fall back to cartoon only.
    }
  }
  viewer.render();
}

export function MolecularViewer({ pdbData, pdbId }: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [representation, setRepresentation] = useState<Representation>('cartoon');
  const [spinning, setSpinning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const repRef = useRef(representation);
  useEffect(() => {
    repRef.current = representation;
  }, [representation]);

  useEffect(() => {
    if (!viewerRef.current || !(window as any).$3Dmol) return;
    const w = window as any;

    if (!viewerInstance.current) {
      viewerInstance.current = w.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: 'white',
      });
    }

    const viewer = viewerInstance.current;
    viewer.clear();
    setLoaded(false);
    setSpinning(false);

    const onReady = () => {
      applyRepresentation(viewer, w, repRef.current);
      viewer.zoomTo();
      viewer.render();
      // Fade/scale the canvas in once the structure has actually resolved,
      // instead of an instant pop the moment 3Dmol finishes rendering.
      requestAnimationFrame(() => setLoaded(true));
    };

    if (pdbData) {
      viewer.addModel(pdbData, 'pdb');
      onReady();
    } else if (pdbId) {
      w.$3Dmol.download(`pdb:${pdbId}`, viewer, {}, onReady);
    }
  }, [pdbData, pdbId]);

  const handleReset = () => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    // Animate back to the fitted view instead of snapping instantly.
    viewer.zoomTo({}, 800);
    viewer.render();
  };

  const handleZoom = () => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    viewer.zoom(1.25, 500);
    viewer.render();
  };

  const handleToggleSpin = () => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    const next = !spinning;
    viewer.spin(next ? 'y' : false, 0.6);
    setSpinning(next);
  };

  const handleRepresentation = (rep: Representation) => {
    setRepresentation(rep);
    const viewer = viewerInstance.current;
    const w = window as any;
    if (!viewer || !w.$3Dmol) return;
    applyRepresentation(viewer, w, rep);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative bg-white overflow-hidden">
      <div
        ref={viewerRef}
        className="w-full h-full transition-all duration-700 ease-out"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(0.94)',
        }}
      />

      {!loaded && (pdbData || pdbId) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-8 w-8 rounded-full border-2 border-emerald-200 border-t-emerald-500 animate-spin" />
        </div>
      )}

      {/* Representation switcher */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-0.5 bg-white/90 backdrop-blur border border-slate-200 rounded-lg shadow-sm p-1">
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleRepresentation(s.id)}
            className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-colors ${
              representation === s.id
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Right Floating Toolbar */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur border border-slate-200 rounded-xl shadow-sm p-1.5 flex flex-col gap-1 z-10">
        <ToolbarButton icon={<ArrowClockwise size={18} weight="bold" />} label="Spin" active={spinning} onClick={handleToggleSpin} />
        <ToolbarButton icon={<Hand size={18} weight="bold" />} label="Pan" />
        <ToolbarButton icon={<MagnifyingGlassPlus size={18} weight="bold" />} label="Zoom" onClick={handleZoom} />
        <div className="w-8 h-px bg-slate-100 my-1 mx-auto"></div>
        <ToolbarButton icon={<ArrowCounterClockwise size={18} weight="bold" />} label="Reset" onClick={handleReset} />
        <ToolbarButton icon={<ArrowsOut size={18} weight="bold" />} label="Fullscreen" onClick={handleFullscreen} />
      </div>

      {/* Bottom Left Instructions */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[11px] text-slate-400 font-medium z-10 bg-white/80 backdrop-blur px-2 py-1 rounded">
        <span className="flex items-center gap-1.5"><ArrowClockwise size={12} weight="bold" /> Left: Rotate</span>
        <span className="flex items-center gap-1.5"><Hand size={12} weight="bold" /> Right: Pan</span>
        <span className="flex items-center gap-1.5"><MagnifyingGlassPlus size={12} weight="bold" /> Scroll: Zoom</span>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-0.5 text-[9px] font-semibold transition ${active ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
