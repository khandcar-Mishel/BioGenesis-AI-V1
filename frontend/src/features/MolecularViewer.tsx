import { useEffect, useRef } from 'react';
import { RotateCw, Hand, ZoomIn, Maximize } from 'lucide-react';

interface ViewerProps {
  pdbData?: string;
  pdbId?: string;
}

export function MolecularViewer({ pdbData, pdbId }: ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);

  useEffect(() => {
    if (!viewerRef.current || !(window as any).$3Dmol) return;

    if (!viewerInstance.current) {
      viewerInstance.current = (window as any).$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: 'white'
      });
    }
    
    const viewer = viewerInstance.current;
    viewer.clear();

    if (pdbData) {
      viewer.addModel(pdbData, 'pdb');
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.render();
    } else if (pdbId) {
      (window as any).$3Dmol.download(`pdb:${pdbId}`, viewer, {}, () => {
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        viewer.zoomTo();
        viewer.render();
      });
    }
  }, [pdbData, pdbId]);

  const handleReset = () => {
    if (viewerInstance.current) {
      viewerInstance.current.zoomTo();
      viewerInstance.current.render();
    }
  };

  const handleZoom = () => {
    if (viewerInstance.current) {
      viewerInstance.current.zoom(1.2);
      viewerInstance.current.render();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      // Handle change if needed
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-white">
      <div ref={viewerRef} className="w-full h-full" />
      
      {/* Right Floating Toolbar */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 flex flex-col gap-1 z-10">
        <ToolbarButton icon={<RotateCw size={18} />} label="Rotate" active />
        <ToolbarButton icon={<Hand size={18} />} label="Pan" />
        <ToolbarButton icon={<ZoomIn size={18} />} label="Zoom" onClick={handleZoom} />
        <div className="w-8 h-[1px] bg-slate-100 my-1 mx-auto"></div>
        <ToolbarButton icon={<RotateCw size={18} className="rotate-180" />} label="Reset" onClick={handleReset} />
        <ToolbarButton icon={<Maximize size={18} />} label="Fullscreen" onClick={handleFullscreen} />
      </div>

      {/* Bottom Left Instructions */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[11px] text-slate-400 font-medium z-10 bg-white/80 px-2 py-1 rounded">
        <span className="flex items-center gap-1.5"><RotateCw size={12} /> Left: Rotate</span>
        <span className="flex items-center gap-1.5"><Hand size={12} /> Right: Pan</span>
        <span className="flex items-center gap-1.5"><ZoomIn size={12} /> Scroll: Zoom</span>
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
