import { useEffect, useRef, useState } from 'react';
import { ArrowCounterClockwise, Cube, Pause, Play, Hand, WarningCircle } from '@phosphor-icons/react';

type Representation = 'ribbon' | 'backbone';
// 3Dmol is also used by the existing workspace. The local script keeps previews offline-ready.
interface PreviewViewer {
  setStyle: (selection: object, style: object) => void;
  addModel: (data: string, format: string) => unknown;
  zoomTo: () => void;
  zoom: (factor: number) => void;
  rotate: (angle: number, axis: string) => void;
  render: () => void;
  resize: () => void;
  spin: (axis: string | false, speed?: number) => void;
  removeAllModels: () => void;
  getView: () => number[];
  setView: (view: number[]) => void;
}

export function LiveMoleculePreview({ pdbId = '1EMA', className = '', colorscheme = 'greenCarbon' }: {
  pdbId?: string; className?: string; colorscheme?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PreviewViewer | null>(null);
  const homeView = useRef<number[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [representation, setRepresentation] = useState<Representation>('ribbon');
  const [spinning, setSpinning] = useState(false);
  const [retry, setRetry] = useState(0);
  const accent = colorscheme === 'purpleCarbon' ? '#c4b6e8' : colorscheme === 'blueCarbon' ? '#9bd6e5' : '#a0dfbe';

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    const abort = new AbortController();
    let viewer: PreviewViewer | null = null;
    let observer: ResizeObserver | undefined;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    setStatus('loading');
    setSpinning(false);
    setRepresentation('ribbon');

    const init = async (attempt = 0) => {
      const engine = (window as unknown as { $3Dmol?: { createViewer: (element: HTMLElement, config: object) => PreviewViewer } }).$3Dmol;
      if (!engine) {
        if (attempt < 40) timer = setTimeout(() => void init(attempt + 1), 150);
        else setStatus('error');
        return;
      }
      try {
        const response = await fetch(`/structures/${pdbId}.pdb`, { signal: abort.signal });
        if (!response.ok) throw new Error('Structure unavailable');
        const data = await response.text();
        if (cancelled) return;
        viewer = engine.createViewer(host, { backgroundColor: '#102c28', backgroundAlpha: 0, antialias: true });
        viewerRef.current = viewer;
        viewer.addModel(data, 'pdb');
        viewer.setStyle({}, { cartoon: { color: accent, thickness: .4, arrows: true } });
        viewer.zoomTo();
        viewer.rotate(-16, 'z');
        viewer.rotate(18, 'y');
        viewer.zoom(1.1);
        viewer.render();
        homeView.current = viewer.getView();
        observer = new ResizeObserver(() => {
          if (host.isConnected && host.clientWidth > 0 && host.clientHeight > 0) {
            viewer?.resize();
            viewer?.render();
          }
        });
        observer.observe(host);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    };
    void init();
    return () => {
      cancelled = true;
      abort.abort();
      clearTimeout(timer);
      observer?.disconnect();
      viewer?.spin(false);
      // clear() redraws the detached canvas; removing models frees geometry without a draw.
      viewer?.removeAllModels();
      host.replaceChildren();
      viewerRef.current = null;
    };
  }, [pdbId, accent, retry]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || status !== 'ready') return;
    viewer.setStyle({}, representation === 'ribbon'
      ? { cartoon: { color: accent, thickness: .4, arrows: true } }
      : {});
    if (representation === 'backbone') viewer.setStyle({ atom: 'CA' }, { sphere: { color: accent, radius: .65 }, stick: { color: accent, radius: .25 } });
    viewer.render();
  }, [representation, accent, status]);

  useEffect(() => {
    const host = mountRef.current;
    if (!host || status !== 'ready') return;
    let visible = true;
    const update = () => viewerRef.current?.spin(spinning && visible && !document.hidden ? 'y' : false, .35);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(host);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); viewerRef.current?.spin(false); };
  }, [spinning, status]);

  return (
    <div className={`structure-viewport ${className}`}>
      <div className="structure-grid" aria-hidden="true" />
      <div className="structure-orbit orbit-one" aria-hidden="true" /><div className="structure-orbit orbit-two" aria-hidden="true" />
      <div ref={mountRef} className="structure-canvas" role="img" aria-label={`Interactive example protein ${pdbId}, chain A. Drag to rotate or use the rotation button.`} style={{ opacity: status === 'ready' ? 1 : 0 }} />
      <div className="structure-topline"><span><i /> PDB · {pdbId}</span><span>CHAIN A</span></div>
      <div className="structure-tabs" role="group" aria-label="Molecular representation">
        {(['ribbon', 'backbone'] as const).map(rep => <button key={rep} type="button" disabled={status !== 'ready'} aria-pressed={representation === rep} onClick={() => setRepresentation(rep)}>{rep === 'ribbon' ? 'Ribbon' : 'Cα atoms'}</button>)}
      </div>
      {status !== 'ready' && <div className="structure-fallback" role="status">
        {status === 'loading' ? <Cube size={38} weight="thin" /> : <WarningCircle size={32} weight="thin" />}
        <span>{status === 'loading' ? 'Preparing your molecular view' : '3D preview could not load'}</span>
        {status === 'error' && <button type="button" onClick={() => setRetry(value => value + 1)}>Try again</button>}
      </div>}
      <div className="structure-axis" aria-hidden="true"><svg width="40" height="40" viewBox="0 0 40 40"><path d="M12 29V8M12 29h22M12 29 3 36" fill="none" stroke="#7bada0" /><text x="9" y="6">y</text><text x="35" y="32">x</text><text x="0" y="39">z</text></svg></div>
      <div className="structure-controls">
        <span className="drag-hint"><Hand size={13} /> Drag to explore</span>
        <div className="flex gap-1.5">
          <button type="button" disabled={status !== 'ready'} onClick={() => { setSpinning(false); viewerRef.current?.setView(homeView.current); }} aria-label="Reset structure view" title="Reset view"><ArrowCounterClockwise size={16} /></button>
          <button type="button" disabled={status !== 'ready'} onClick={() => setSpinning(value => !value)} aria-pressed={spinning} aria-label={spinning ? 'Pause structure rotation' : 'Rotate structure'} title={spinning ? 'Pause rotation' : 'Rotate structure'}>{spinning ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}</button>
        </div>
      </div>
    </div>
  );
}
