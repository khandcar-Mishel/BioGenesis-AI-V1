import { useState, useEffect, useRef } from 'react';
import { Zap, HelpCircle, ChevronDown, MoreVertical, X, Loader2, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MolecularViewer } from './MolecularViewer';
import { submitJob, getJobStatus } from '../services/api';
import { useAppStore } from '../stores/appStore';

export function DesignView() {
  const [pdbInput, setPdbInput] = useState('');
  const [activePdb, setActivePdb] = useState<string | null>(null);
  const [pdbData, setPdbData] = useState<string | undefined>(undefined);
  const [structureSource, setStructureSource] = useState<'none' | 'rcsb' | 'upload'>('none');
  
  const [structureStatus, setStructureStatus] = useState<'empty' | 'loading' | 'success' | 'error'>('empty');
  const [structureError, setStructureError] = useState('');
  const [structureDetails, setStructureDetails] = useState('');
  
  const [designName, setDesignName] = useState('biogen_design_01');
  const [designType, setDesignType] = useState('Binder Design');
  const [presetTemplate, setPresetTemplate] = useState('pdl1_binder');
  const [contigs, setContigs] = useState('A:50-70');
  const [hotspots, setHotspots] = useState('');
  
  const [iterations, setIterations] = useState('50');
  const [designs, setDesigns] = useState('4');
  const [symmetry, setSymmetry] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('00:00');
  const [jobFailed, setJobFailed] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { currentJobId, setCurrentJobId, setJobStatus } = useAppStore();

  const parsePdbDetails = (text: string) => {
    const chains = new Set<string>();
    let resCount = 0;
    let lastRes = null;
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('ATOM  ')) {
        const chain = line.substring(21, 22).trim();
        const resSeq = line.substring(22, 26).trim();
        if (chain) chains.add(chain);
        const resId = chain + resSeq;
        if (resId !== lastRes) {
          resCount++;
          lastRes = resId;
        }
      }
    }
    const chainStr = chains.size > 0 ? Array.from(chains).join(', ') : 'None';
    return `(Chains: ${chainStr}, ${resCount} residues)`;
  };

  const handleRetrieve = async () => {
    if (!pdbInput.trim()) return;
    setStructureStatus('loading');
    try {
      const res = await fetch(`https://files.rcsb.org/download/${pdbInput.trim().toUpperCase()}.pdb`);
      if (!res.ok) throw new Error(`Not found in RCSB PDB`);
      const text = await res.text();
      setPdbData(text);
      setActivePdb(pdbInput.toUpperCase());
      setStructureSource('rcsb');
      setStructureDetails(parsePdbDetails(text));
      setStructureStatus('success');
    } catch (e: any) {
      setStructureStatus('error');
      setStructureError(e.message || 'Failed to fetch PDB');
      setActivePdb(null);
      setPdbData(undefined);
      setStructureSource('none');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStructureStatus('loading');
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setPdbData(content);
        setActivePdb(file.name);
        setStructureSource('upload');
        setStructureDetails(parsePdbDetails(content));
        setStructureStatus('success');
      };
      reader.onerror = () => {
        setStructureStatus('error');
        setStructureError('Failed to read file');
        setActivePdb(null);
        setPdbData(undefined);
        setStructureSource('none');
      };
      reader.readAsText(file);
    }
  };

  const handleGenerate = async () => {
    if (!activePdb) {
      alert("Please load a Target Structure first.");
      return;
    }
    try {
      setSubmitError('');
      setJobFailed(false);
      setIsGenerating(true);
      setProgress(0);
      setElapsed('00:00');
      const res = await submitJob({
        name: designName,
        pdb: structureSource === 'upload' ? '' : activePdb,
        pdb_content: structureSource === 'upload' ? (pdbData || '') : '',
        num_designs: parseInt(designs),
        iterations: parseInt(iterations),
        contigs: contigs,
        hotspot: hotspots,
        symmetry: symmetry ? 'cyclic' : 'none',
        order: symmetry ? 2 : 1,
        add_potential: symmetry
      });
      setCurrentJobId(res.job_id);
    } catch (err: any) {
      console.error(err);
      setIsGenerating(false);
      setSubmitError(
        err.response
          ? `Backend rejected the job (${err.response.status}). Check parameters.`
          : 'Cannot reach the backend. Is it running? Check Settings.'
      );
    }
  };

  useEffect(() => {
    let interval: any;
    let timer: any;
    let startTime = Date.now();
    
    if (currentJobId && isGenerating) {
      timer = setInterval(() => {
        const diff = Math.floor((Date.now() - startTime) / 1000);
        const mins = String(Math.floor(diff / 60)).padStart(2, '0');
        const secs = String(diff % 60).padStart(2, '0');
        setElapsed(`${mins}:${secs}`);
      }, 1000);
      
      interval = setInterval(async () => {
        try {
          const status = await getJobStatus(currentJobId);
          setJobStatus(status);
          setProgress(status.progress_pct || 0);
          if ((status.progress_pct && status.progress_pct >= 100) || status.status === 'completed' || status.status === 'failed' || status.status === 'cancelled') {
            setIsGenerating(false);
            if (status.status === 'failed') setJobFailed(true);
            clearInterval(interval);
            clearInterval(timer);
          }
        } catch (err) {
          console.error(err);
        }
      }, 2000);
    }
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [currentJobId, isGenerating, setJobStatus]);

  return (
    <div className="h-full flex gap-4">
      
      {/* LEFT COLUMN - CONFIG */}
      <div className="w-[40%] flex flex-col gap-3 overflow-y-auto pr-1">
        
        {/* TARGET STRUCTURE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-3">
            <h2 className="text-[14px] font-bold text-slate-800">Target structure</h2>
            <div className="relative group flex items-center">
              <HelpCircle size={14} className="text-slate-400 cursor-pointer hover:text-slate-600 transition" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-slate-800 text-white text-[11px] font-medium p-2.5 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                <span className="font-bold text-[12px] block mb-1">Target structure</span>
                Enter a PDB ID or UniProt ID to retrieve a protein structure from RCSB PDB, or upload a local PDB file. The loaded structure will be used as the target for protein design.
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-800"></div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-slate-700 mb-1.5 text-[12px]">PDB / UniProt</label>
            <div className="flex items-center gap-2 text-[12px]">
              <input 
                value={pdbInput} onChange={(e) => setPdbInput(e.target.value)}
                placeholder="e.g. 4N5T"
                className="border border-slate-300 rounded-lg px-2 py-1.5 w-24 bg-white focus:outline-sky-500 shadow-sm" 
              />
              <button onClick={handleRetrieve} disabled={structureStatus === 'loading'} className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition shadow-sm font-semibold disabled:opacity-50">
                Retrieve
              </button>
              <span className="flex-1 text-center text-slate-400 font-medium px-2">or</span>
              <button onClick={() => fileInputRef.current?.click()} disabled={structureStatus === 'loading'} className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition shadow-sm font-semibold disabled:opacity-50">
                Upload PDB
              </button>
              <input type="file" accept=".pdb" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            </div>
          </div>
          
          {structureStatus === 'empty' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] shrink-0"><X size={10} strokeWidth={3} /></div>
              Structure not loaded: Null
            </div>
          )}
          
          {structureStatus === 'loading' && (
            <div className="bg-sky-50 border border-sky-200 text-sky-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-sky-500 shrink-0" />
              Loading structure...
            </div>
          )}
          
          {structureStatus === 'success' && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0"><Check size={10} strokeWidth={3} /></div>
              Structure loaded: {activePdb} <span className="font-medium text-emerald-600">{structureDetails}</span>
            </div>
          )}
          
          {structureStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] shrink-0"><X size={10} strokeWidth={3} /></div>
              Failed to load structure: {structureError}
            </div>
          )}
        </div>

        {/* DESIGN SPECIFICATION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h2 className="text-[14px] font-bold text-slate-800 mb-3">Design</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Design name</label>
              <input 
                value={designName} onChange={(e) => setDesignName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-sky-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Design type</label>
              <div className="relative">
                <select 
                  value={designType} onChange={(e) => setDesignType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-sky-500 shadow-sm appearance-none"
                >
                  <option>Binder Design</option>
                  <option>Unconditional</option>
                  <option>Motif Scaffolding</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="mb-3 text-[12px]">
            <label className="block font-semibold text-slate-700 mb-1">Preset template</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select 
                  value={presetTemplate} onChange={(e) => setPresetTemplate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-sky-500 shadow-sm appearance-none"
                >
                  <option value="pdl1_binder">pdl1_binder</option>
                  <option value="custom">custom</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-2 text-slate-500 pointer-events-none" />
              </div>
              <button className="text-sky-600 font-semibold hover:underline">View preset details</button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3 text-[12px]">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Design region (Contigs)</label>
              <input 
                value={contigs} onChange={(e) => setContigs(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-sky-500 shadow-sm mb-1"
              />
              <span className="text-[10px] text-slate-400">e.g. A:50-70</span>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Binding hotspots <span className="font-normal text-slate-400">(Optional)</span></label>
              <input 
                value={hotspots} onChange={(e) => setHotspots(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2 py-1.5 bg-white focus:outline-sky-500 shadow-sm mb-1"
              />
              <span className="text-[10px] text-slate-400">e.g. E64,E88</span>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-2">
            <button className="flex items-center justify-between w-full text-[12px] font-semibold text-slate-700">
              Advanced parameters
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </div>
        
        {/* GENERATION PARAMETERS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mt-auto mb-1 text-[12px]">
          <h2 className="text-[14px] font-bold text-slate-800 mb-3">Generation</h2>
          
          <div className="flex items-end gap-3 mb-4">
            <div className="flex-1">
              <label className="flex items-center gap-1 font-semibold text-slate-700 mb-1 text-[11px]">
                Diffusion steps <HelpCircle size={10} className="text-slate-400" />
              </label>
              <div className="relative">
                <select value={iterations} onChange={e => setIterations(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 bg-white shadow-sm appearance-none">
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1.5 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-slate-700 mb-1 text-[11px]">
                Number of designs
              </label>
              <div className="relative">
                <select value={designs} onChange={e => setDesigns(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 bg-white shadow-sm appearance-none">
                  <option value="1">1</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1.5 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mb-1 cursor-pointer ml-1" onClick={() => setSymmetry(!symmetry)}>
              <input type="checkbox" checked={symmetry} readOnly className="w-3.5 h-3.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 pointer-events-none" />
              <span className="text-slate-700 text-[11px] font-medium">Symmetry & Potentials</span>
            </div>
          </div>

          {!isGenerating ? (
            <button onClick={handleGenerate} className="w-full bg-[#0060df] hover:bg-[#0050b3] text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm text-[13px]">
              <Zap size={14} fill="white" />
              Generate designs
            </button>
          ) : (
            <div className="bg-sky-50 p-2.5 border border-sky-100 rounded-lg">
              <div className="flex justify-between text-[12px] font-bold text-slate-800 mb-1.5">
                <span>Generating designs...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mb-1.5">
                <div className="bg-[#0060df] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-right text-[10px] text-slate-500">
                Elapsed: {elapsed}
              </div>
            </div>
          )}
          
          {!isGenerating && jobFailed && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              Generation failed. Please try again.
            </div>
          )}

          {!isGenerating && submitError && !jobFailed && (
            <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-2 py-2 rounded-lg text-[11px] font-semibold flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500 shrink-0" />
              {submitError}
            </div>
          )}

          {!isGenerating && !jobFailed && progress >= 100 && (
            <Link to="/rfdiffusion/results" className="mt-3 block bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2.5 rounded-lg text-[12px] font-bold text-center hover:bg-emerald-100 transition">
              Generation complete — view results →
            </Link>
          )}

          {!isGenerating && !jobFailed && progress < 100 && !submitError && (
             <div className="mt-3">
               <div className="flex justify-between text-[12px] font-semibold text-slate-700 mb-1">
                 <span>Ready to generate designs</span>
                 <span>0%</span>
               </div>
               <div className="w-full bg-slate-100 border border-slate-200 rounded-full h-1.5 mb-1"></div>
               <div className="text-right text-[10px] text-slate-400 font-medium">
                 Elapsed: 00:00
               </div>
             </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN - 3D VIEWER */}
      <div className="w-[60%] flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
        
        {/* TOP BAR */}
        <div className="p-4 bg-white flex items-center justify-between border-b border-slate-100 z-10">
          <div>
            <h3 className="font-bold text-slate-800 text-[13px]">Structure: {activePdb ? `${activePdb}.pdb` : 'None'}</h3>
            <p className="text-[11px] text-slate-500">{activePdb ? structureDetails : 'No structure loaded'}</p>
          </div>
          
          <div className="flex items-center gap-3 text-[12px]">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="font-medium">Representation</span>
              <div className="relative">
                <select className="border border-slate-300 rounded-md px-2 py-1 bg-white appearance-none pr-7">
                  <option>Cartoon</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="font-medium">Color</span>
              <div className="relative">
                <select className="border border-slate-300 rounded-md px-2 py-1 bg-white appearance-none pr-7">
                  <option>By Chain</option>
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 ml-1">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* VIEWER PORT */}
        <div className="flex-1 bg-white relative">
          {activePdb ? (
            <MolecularViewer pdbId={pdbData ? undefined : activePdb} pdbData={pdbData} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">
              Load a structure to view it in 3D
            </div>
          )}
        </div>

        {/* BOTTOM STATS BAR */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-[12px] z-10">
          <div>
            <p className="text-slate-500 font-medium mb-0.5 text-[10px]">Target</p>
            <p className="font-bold text-slate-800">{activePdb || '-'}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-0.5 text-[10px]">Chains</p>
            <p className="font-bold text-slate-800">{activePdb ? (structureDetails.match(/Chains: ([A-Za-z0-9, ]+),/)?.[1] || '-') : '-'}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-0.5 text-[10px]">Residues</p>
            <p className="font-bold text-slate-800">{activePdb ? (structureDetails.match(/([0-9]+) residues/)?.[1] || '-') : '-'}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-0.5 text-[10px]">Source</p>
            <p className="font-bold text-slate-800">{activePdb ? (pdbData && !pdbInput ? 'Local File' : 'RCSB PDB') : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
