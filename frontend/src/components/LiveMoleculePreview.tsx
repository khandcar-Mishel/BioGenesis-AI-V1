import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ArrowCounterClockwise, ArrowsOut, Cube, Pause, Play, Hand, WarningCircle } from '@phosphor-icons/react';

type Representation = 'ribbon' | 'backbone';
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

/** A single renderer is reused when the example changes, keeping demo navigation light. */
export function LiveMoleculePreview({ pdbId = '1EMA', className = '', colorscheme = 'greenCarbon', fallback }: {
  pdbId?: string; className?: string; colorscheme?: string; fallback?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PreviewViewer | null>(null);
  const homeView = useRef<number[]>([]);
  const instructionsId = useId();
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [representation, setRepresentation] = useState<Representation>('ribbon');
  const [spinning, setSpinning] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [rendererVersion, setRendererVersion] = useState(0);
  const [notice, setNotice] = useState('');
  const accent = colorscheme === 'purpleCarbon' ? '#c4b6e8' : colorscheme === 'blueCarbon' ? '#abdce5' : '#c0e3a5';

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;
    let viewer: PreviewViewer | null = null;
    let observer: ResizeObserver | undefined;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    setStatus('loading');

    const initialize = (tries = 0) => {
      if (cancelled) return;
      const engine = (window as unknown as { $3Dmol?: { createViewer: (element: HTMLElement, config: object) => PreviewViewer } }).$3Dmol;
      if (!engine || !host.clientWidth || !host.clientHeight) {
        if (tries < 40) timer = setTimeout(() => initialize(tries + 1), 150);
        else setStatus('error');
        return;
      }
      try {
        viewer = engine.createViewer(host, { backgroundColor: '#0c2b22', backgroundAlpha: 0, antialias: true });
        viewerRef.current = viewer;
        observer = new ResizeObserver(() => {
          if (host.isConnected && host.clientWidth > 0 && host.clientHeight > 0) {
            viewer?.resize();
            viewer?.render();
          }
        });
        observer.observe(host);
        setRendererVersion(value => value + 1);
      } catch {
        setStatus('error');
      }
    };
    initialize();
    return () => {
      cancelled = true;
      clearTimeout(timer);
      observer?.disconnect();
      viewer?.spin(false);
      viewer?.removeAllModels();
      host.replaceChildren();
      viewerRef.current = null;
    };
  }, [attempt]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || rendererVersion === 0) return;
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 12000);
    let cancelled = false;
    setStatus('loading');
    setRepresentation('ribbon');
    setSpinning(false);
    setNotice('');
    viewer.spin(false);
    viewer.removeAllModels();

    const loadStructure = async () => {
      try {
        const response = await fetch(`/structures/${pdbId}.pdb`, { signal: abort.signal });
        if (!response.ok) throw new Error('Structure unavailable');
        const data = await response.text();
        if (!data.includes('ATOM  ')) throw new Error('Invalid structure');
        if (cancelled || viewer !== viewerRef.current) return;
        viewer.addModel(data, 'pdb');
        viewer.setStyle({}, { cartoon: { color: accent, thickness: .4, arrows: true } });
        viewer.zoomTo();
        viewer.rotate(-16, 'z');
        viewer.rotate(18, 'y');
        viewer.zoom(1.12);
        viewer.render();
        homeView.current = viewer.getView();
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      } finally {
        clearTimeout(timeout);
      }
    };
    void loadStructure();
    return () => { cancelled = true; abort.abort(); clearTimeout(timeout); };
  }, [pdbId, accent, rendererVersion]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || status !== 'ready') return;
    viewer.setStyle({}, representation === 'ribbon' ? { cartoon: { color: accent, thickness: .4, arrows: true } } : {});
    if (representation === 'backbone') viewer.setStyle({ atom: 'CA' }, { sphere: { color: accent, radius: .7 } });
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

  const resetView = () => {
    setSpinning(false);
    viewerRef.current?.setView(homeView.current);
    viewerRef.current?.render();
  };
  const onKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    const viewer = viewerRef.current;
    if (!viewer || status !== 'ready') return;
    if (event.key === 'ArrowLeft') viewer.rotate(-15, 'y');
    else if (event.key === 'ArrowRight') viewer.rotate(15, 'y');
    else if (event.key === 'ArrowUp') viewer.rotate(-15, 'x');
    else if (event.key === 'ArrowDown') viewer.rotate(15, 'x');
    else if (event.key === '+' || event.key === '=') viewer.zoom(1.12);
    else if (event.key === '-') viewer.zoom(.89);
    else if (event.key.toLowerCase() === 'r') resetView();
    else return;
    event.preventDefault();
    viewer.render();
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await containerRef.current?.requestFullscreen();
    } catch {
      setNotice('Fullscreen is unavailable in this browser. You can still drag and explore the structure.');
    }
  };

  return (
    <div ref={containerRef} className={`structure-viewport ${className}`}>
      <div className="structure-grid" aria-hidden="true" />
      <div className="structure-orbit orbit-one" aria-hidden="true" /><div className="structure-orbit orbit-two" aria-hidden="true" />
      <div ref={mountRef} className="structure-canvas" role="group" aria-label={`Interactive example protein ${pdbId}, chain A`} aria-describedby={instructionsId} tabIndex={status === 'ready' ? 0 : -1} onKeyDown={onKeyboard} style={{ opacity: status === 'ready' ? 1 : 0 }} />
      <p id={instructionsId} className="sr-only">Drag to rotate, or use arrow keys when focused. Plus and minus zoom; R resets the view.</p>
      <div className="structure-topline"><span><i /> PDB · {pdbId}</span><span>CHAIN A</span></div>
      <div className="structure-tabs" role="group" aria-label="Molecular representation">
        {(['ribbon', 'backbone'] as const).map(rep => <button key={rep} type="button" disabled={status !== 'ready'} aria-pressed={representation === rep} onClick={() => setRepresentation(rep)}>{rep === 'ribbon' ? 'Ribbon' : 'Cα atoms'}</button>)}
      </div>
      {status !== 'ready' && <div className="structure-fallback" role="status">
        {status === 'loading' ? <><Cube size={38} weight="thin" /><span>Preparing your molecular view</span></> : <>
          {fallback || <WarningCircle size={32} weight="thin" />}
          <span>{fallback ? 'Static backbone preview · 3D unavailable' : '3D preview could not load'}</span>
          <button type="button" onClick={() => setAttempt(value => value + 1)}>Retry 3D preview</button>
        </>}
      </div>}
      <div className="structure-axis" aria-hidden="true"><svg width="40" height="40" viewBox="0 0 40 40"><path d="M12 29V8M12 29h22M12 29 3 36" fill="none" stroke="#8fb082" /><text x="9" y="6">y</text><text x="35" y="32">x</text><text x="0" y="39">z</text></svg></div>
      <div className="structure-controls">
        <span className="drag-hint"><Hand size={13} /> Drag to explore</span>
        <div className="flex gap-1.5">
          <button type="button" disabled={status !== 'ready'} onClick={resetView} aria-label="Reset structure view" title="Reset view"><ArrowCounterClockwise size={16} /></button>
          <button type="button" disabled={status !== 'ready'} onClick={() => setSpinning(value => !value)} aria-pressed={spinning} aria-label={spinning ? 'Pause structure rotation' : 'Rotate structure'} title={spinning ? 'Pause rotation' : 'Rotate structure'}>{spinning ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}</button>
          <button type="button" onClick={() => void toggleFullscreen()} aria-label="Toggle fullscreen structure view" title="Focus view"><ArrowsOut size={16} /></button>
        </div>
      </div>
      {notice && <p className="viewer-notice" role="status">{notice}</p>}
    </div>
  );
}
