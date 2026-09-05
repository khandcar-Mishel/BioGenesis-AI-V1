import { useEffect, useRef, useState } from 'react';

/**
 * Decorative, auto-rotating 3Dmol.js viewer for the landing page — real
 * interactive molecular 3D (same $3Dmol engine the RFdiffusion Results view
 * uses), fetched live from RCSB. Network-dependent, so it degrades to a
 * quiet skeleton rather than blocking the page.
 */
export function LiveMoleculePreview({ pdbId = '1EMA', className = '' }: { pdbId?: string; className?: string }) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const instance = useRef<any>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    let tries = 0;

    const init = () => {
      const w = window as any;
      if (!w.$3Dmol || !viewerRef.current) {
        if (tries++ < 40 && !cancelled) {
          setTimeout(init, 150);
        } else if (!cancelled) {
          setStatus('error');
        }
        return;
      }
      if (!instance.current) {
        instance.current = w.$3Dmol.createViewer(viewerRef.current, { backgroundColor: '0x070a18' });
      }
      const viewer = instance.current;
      w.$3Dmol.download(`pdb:${pdbId}`, viewer, {}, () => {
        if (cancelled) return;
        viewer.setStyle({}, { cartoon: { colorscheme: 'cyanCarbon', color: 'spectrum' } });
        viewer.zoomTo();
        viewer.zoom(1.15);
        viewer.spin('y', 0.6);
        viewer.render();
        setStatus('ready');
      });
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [pdbId]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div ref={viewerRef} className="absolute inset-0" />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center bg-lab-900">
          <div className={`text-xs font-lab tracking-widest text-slate-500 ${status === 'loading' ? 'glow-pulse' : ''}`}>
            {status === 'loading' ? 'FETCHING STRUCTURE…' : 'STRUCTURE UNAVAILABLE'}
          </div>
        </div>
      )}
    </div>
  );
}
