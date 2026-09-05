import { useEffect, useRef, useState } from 'react';

/**
 * Auto-rotating 3Dmol.js viewer -- real interactive molecular 3D (same
 * $3Dmol engine the RFdiffusion Results view uses), fetched live from
 * RCSB. Stands in for the static rendered-protein hero art on marketing
 * pages: genuinely interactive rather than a picture of one. Network
 * -dependent, so it degrades to a quiet skeleton rather than blocking
 * the page.
 */
export function LiveMoleculePreview({
  pdbId = '1EMA',
  className = '',
  background = '0xffffff',
  colorscheme = 'greenCarbon',
  skeletonBg = 'bg-emerald-50',
  skeletonText = 'text-emerald-700',
}: {
  pdbId?: string;
  className?: string;
  background?: string;
  colorscheme?: string;
  skeletonBg?: string;
  skeletonText?: string;
}) {
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
        instance.current = w.$3Dmol.createViewer(viewerRef.current, { backgroundColor: background });
      }
      const viewer = instance.current;
      w.$3Dmol.download(`pdb:${pdbId}`, viewer, {}, () => {
        if (cancelled) return;
        viewer.setStyle({}, { cartoon: { colorscheme, color: 'spectrum' } });
        viewer.zoomTo();
        viewer.zoom(1.1);
        viewer.spin('y', 0.5);
        viewer.render();
        setStatus('ready');
      });
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [pdbId, background, colorscheme]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={viewerRef} className="absolute inset-0" />
      {status !== 'ready' && (
        <div className={`absolute inset-0 flex items-center justify-center ${skeletonBg}`}>
          <div className={`text-xs font-semibold tracking-widest ${skeletonText} ${status === 'loading' ? 'animate-pulse' : ''}`}>
            {status === 'loading' ? 'LOADING STRUCTURE…' : 'STRUCTURE UNAVAILABLE'}
          </div>
        </div>
      )}
    </div>
  );
}
