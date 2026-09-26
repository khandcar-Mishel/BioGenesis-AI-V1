import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, RotateCcw, ZoomIn, ZoomOut, RefreshCw, Camera, MoreHorizontal, Box } from 'lucide-react';

declare global {
  interface Window {
    $3Dmol: any;
  }
}

export default function StructureViewerCard() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewer, setViewer] = useState<any>(null);
  
  // Legend data
  const chains = [
    { id: 'A', color: '#2F80ED', size: 170 },
    { id: 'B', color: '#20B15A', size: 162 },
    { id: 'D', color: '#EAB308', size: 178 },
    { id: 'E', color: '#8B3FD9', size: 170 },
  ];

  useEffect(() => {
    let isMounted = true;

    const initViewer = () => {
      if (!isMounted || !viewerRef.current || !window.$3Dmol) return;
      try {
        const v = window.$3Dmol.createViewer(viewerRef.current, {
          backgroundColor: 'white',
          id: 'viewer',
          rows: 1,
          cols: 1,
          row: 0,
          col: 0
        });
        if (isMounted) {
          setViewer(v);

          // Load 4OIG from PDB
          window.$3Dmol.download('pdb:4OIG', v, {}, () => {
            if (!isMounted || !v) return;
            try {
              v.setStyle({chain: 'A'}, {cartoon: {color: '#2F80ED'}});
              v.setStyle({chain: 'B'}, {cartoon: {color: '#20B15A'}});
              v.setStyle({chain: 'C'}, {cartoon: {color: '#98A2B3'}}); // Gray out other chains if present
              v.setStyle({chain: 'D'}, {cartoon: {color: '#EAB308'}});
              v.setStyle({chain: 'E'}, {cartoon: {color: '#8B3FD9'}});
              v.zoomTo();
              v.render();
            } catch (renderErr) {
              console.warn("3Dmol render error:", renderErr);
            }
          });
        }
      } catch (err) {
        console.warn("Failed to initialize 3Dmol viewer:", err);
      }
    };

    if (!window.$3Dmol) {
      const existingScript = document.querySelector('script[src*="3Dmol"]');
      if (existingScript) {
        existingScript.addEventListener('load', initViewer);
      } else {
        const script = document.createElement('script');
        script.src = 'https://3Dmol.csb.pitt.edu/build/3Dmol-min.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) initViewer();
        };
        document.body.appendChild(script);
      }
    } else {
      initViewer();
    }

    return () => {
      isMounted = false;
      if (viewer) {
        try {
          viewer.clear();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const handleReset = () => {
    if (viewer) {
      try {
        viewer.zoomTo();
        viewer.render();
      } catch (e) {}
    }
  };

  const handleZoomIn = () => {
    if (viewer) {
      try {
        viewer.zoom(1.2);
        viewer.render();
      } catch (e) {}
    }
  };

  const handleZoomOut = () => {
    if (viewer) {
      try {
        viewer.zoom(0.8);
        viewer.render();
      } catch (e) {}
    }
  };
  
  const handleSpin = () => {
    if (viewer) {
      try {
        viewer.spin('y');
      } catch (e) {}
    }
  };

  return (
    <div className="bg-ws-card border border-ws-border rounded-[14px] shadow-[0_1px_4px_rgba(16,24,40,0.03)] overflow-hidden flex flex-col min-h-[340px] lg:min-h-[370px]">
      
      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-ws-border-light flex flex-wrap items-center justify-between gap-2 z-10 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[6px] bg-ws-pale text-ws-primary flex items-center justify-center shrink-0">
            <Box size={14} strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-[700] text-ws-text leading-tight">Structure viewer</h3>
            <span className="text-[11px] text-ws-muted hidden sm:inline">• 4OIG PDB</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-ws-text-sec hidden sm:inline">Style</span>
            <select className="h-[28px] px-2 border border-ws-border-light rounded-[5px] text-[11.5px] font-medium bg-[#F8FAFC] outline-none cursor-pointer">
              <option>Cartoon</option>
              <option>Stick</option>
              <option>Surface</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-ws-text-sec hidden sm:inline">Color</span>
            <select className="h-[28px] px-2 border border-ws-border-light rounded-[5px] text-[11.5px] font-medium bg-[#F8FAFC] outline-none cursor-pointer">
              <option>By Chain</option>
              <option>Spectrum</option>
              <option>Secondary</option>
            </select>
          </div>
          <button 
            type="button"
            title="Reset View"
            onClick={handleReset}
            className="w-[28px] h-[28px] rounded-[5px] border border-ws-border-light flex items-center justify-center text-ws-text hover:bg-gray-50 cursor-pointer"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 relative bg-white min-h-[250px]">
        
        {/* 3Dmol Canvas Container */}
        <div ref={viewerRef} className="absolute inset-0 z-0"></div>

        {/* Legend */}
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm border border-[#E6EAF0] rounded-[8px] shadow-xs p-2 z-10 w-[115px]">
          <h4 className="text-[10.5px] font-bold text-ws-text mb-1.5 leading-none">Chains</h4>
          <div className="flex flex-col gap-1">
            {chains.map(chain => (
              <div key={chain.id} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: chain.color }}></div>
                  <span className="font-semibold text-ws-text">{chain.id}</span>
                </div>
                <span className="text-[10px] text-ws-muted">{chain.size} aa</span>
              </div>
            ))}
          </div>
        </div>

        {/* XYZ Axis Indicator */}
        <div className="absolute bottom-3 left-3 z-10 flex items-end pointer-events-none">
          <div className="relative w-[30px] h-[30px]">
             <div className="absolute bottom-0 left-0 w-[24px] h-[1.5px] bg-red-500 origin-left"></div>
             <div className="absolute bottom-0 left-0 w-[1.5px] h-[24px] bg-green-500 origin-bottom"></div>
             <div className="absolute bottom-0 left-0 w-[1.5px] h-[24px] bg-blue-500 origin-bottom transform rotate-45"></div>
             <span className="absolute bottom-[-2px] left-[25px] text-[8.5px] font-bold text-red-500">X</span>
             <span className="absolute bottom-[25px] left-[-3px] text-[8.5px] font-bold text-green-500">Y</span>
             <span className="absolute bottom-[-8px] left-[-8px] text-[8.5px] font-bold text-blue-500">Z</span>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="h-[36px] bg-white border-t border-ws-border-light flex items-center justify-between gap-1 z-10 px-3">
        <div className="flex items-center gap-1">
          <button onClick={handleReset} className="flex items-center gap-1 px-2 py-1 rounded-[5px] hover:bg-gray-50 text-ws-text-sec text-[11px] font-medium transition-colors cursor-pointer">
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          <button onClick={handleZoomIn} className="flex items-center gap-1 px-2 py-1 rounded-[5px] hover:bg-gray-50 text-ws-text-sec text-[11px] font-medium transition-colors cursor-pointer">
            <ZoomIn size={12} />
            <span>Zoom +</span>
          </button>
          <button onClick={handleZoomOut} className="flex items-center gap-1 px-2 py-1 rounded-[5px] hover:bg-gray-50 text-ws-text-sec text-[11px] font-medium transition-colors cursor-pointer">
            <ZoomOut size={12} />
            <span>Zoom -</span>
          </button>
          <button onClick={handleSpin} className="flex items-center gap-1 px-2 py-1 rounded-[5px] hover:bg-gray-50 text-ws-text-sec text-[11px] font-medium transition-colors cursor-pointer">
            <RefreshCw size={12} />
            <span>Spin</span>
          </button>
        </div>
        
        <button className="flex items-center gap-1 px-2 py-1 rounded-[5px] hover:bg-gray-50 text-ws-text-sec text-[11px] font-medium transition-colors cursor-pointer">
          <Camera size={12} />
          <span className="hidden sm:inline">Snapshot</span>
        </button>
      </div>

    </div>
  );
}
