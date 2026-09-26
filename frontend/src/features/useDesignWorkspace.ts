import { useState, useEffect } from 'react';
import { submitJob, getJobStatus } from '../services/api';
import { useAppStore } from '../stores/appStore';

export function useDesignWorkspace() {
  const [pdbInput, setPdbInput] = useState('');
  const [activePdb, setActivePdb] = useState<string | null>(null);
  const [pdbData, setPdbData] = useState<string | undefined>(undefined);
  const [structureSource, setStructureSource] = useState<
    'none' | 'rcsb' | 'upload'
  >('none');

  const [structureStatus, setStructureStatus] = useState<
    'empty' | 'loading' | 'success' | 'error'
  >('empty');
  const [structureError, setStructureError] = useState('');
  const [structureDetails, setStructureDetails] = useState('');

  const [designName, setDesignName] = useState('biogen_design_01');
  const [contigs, setContigs] = useState('A:50-70');
  const [hotspots, setHotspots] = useState('');

  const [iterations, setIterations] = useState('50');
  const [designs, setDesigns] = useState('4');
  const [symmetryType, setSymmetryType] = useState('none');
  const [symmetryOrder, setSymmetryOrder] = useState('1');
  const [chains, setChains] = useState('');
  const [addPotential, setAddPotential] = useState(false);
  const [targetMode, setTargetMode] = useState<'pdb' | 'upload' | 'none'>(
    'pdb'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('00:00');
  const [jobFailed, setJobFailed] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (!pdbInput.trim()) {
      setStructureError('Enter a PDB ID to load.');
      setStructureStatus('error');
      return;
    }
    setStructureStatus('loading');
    try {
      const res = await fetch(
        `https://files.rcsb.org/download/${pdbInput.trim().toUpperCase()}.pdb`
      );
      if (!res.ok) throw new Error(`Not found in RCSB PDB`);
      const text = await res.text();
      if (!/^ATOM  /m.test(text))
        throw new Error('No protein atoms found in this PDB file.');
      setPdbData(text);
      setActivePdb(pdbInput.trim().toUpperCase());
      setStructureSource('rcsb');
      setStructureDetails(parsePdbDetails(text));
      setStructureStatus('success');
      setSubmitError('');
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
    e.target.value = '';
    if (file) {
      setStructureStatus('loading');
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (!/^ATOM  /m.test(content)) {
          setStructureStatus('error');
          setStructureError('No protein atoms found in this PDB file.');
          setActivePdb(null);
          setPdbData(undefined);
          setStructureSource('none');
          return;
        }
        setPdbData(content);
        setActivePdb(file.name);
        setStructureSource('upload');
        setStructureDetails(parsePdbDetails(content));
        setStructureStatus('success');
        setSubmitError('');
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
    if (!activePdb && targetMode !== 'none') {
      setSubmitError(
        'Please load a target structure first, or choose None (De novo).'
      );
      return;
    }
    try {
      setSubmitError('');
      setJobFailed(false);
      setCurrentJobId(null);
      setJobStatus(null);
      setIsGenerating(true);
      setProgress(0);
      setElapsed('00:00');
      const res = await submitJob({
        name: designName,
        pdb:
          targetMode === 'none' || structureSource === 'upload'
            ? ''
            : activePdb,
        pdb_content:
          targetMode !== 'none' && structureSource === 'upload'
            ? pdbData || ''
            : '',
        num_designs: parseInt(designs),
        iterations: parseInt(iterations),
        contigs: contigs,
        hotspot: hotspots,
        symmetry: symmetryType,
        order: parseInt(symmetryOrder),
        add_potential: addPotential,
        ...(chains.trim() ? { chains: chains.trim() } : {}),
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
    const startTime = Date.now();

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
          setProgress(
            status.status === 'completed' ? 100 : status.progress_pct || 0
          );
          if (
            status.status === 'completed' ||
            status.status === 'failed' ||
            status.status === 'cancelled'
          ) {
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

  const clearStructure = () => {
    setActivePdb(null);
    setPdbData(undefined);
    setStructureSource('none');
    setStructureStatus('empty');
    setStructureDetails('');
    setStructureError('');
    setSubmitError('');
  };
  const resetParameters = () => {
    setDesignName('biogen_design_01');
    setContigs('A:50-70');
    setHotspots('');
    setIterations('50');
    setDesigns('4');
    setSymmetryType('none');
    setSymmetryOrder('1');
    setChains('');
    setAddPotential(false);
    setSubmitError('');
  };
  return {
    pdbInput,
    setPdbInput,
    activePdb,
    pdbData,
    structureSource,
    structureStatus,
    structureError,
    structureDetails,
    designName,
    setDesignName,
    contigs,
    setContigs,
    hotspots,
    setHotspots,
    iterations,
    setIterations,
    designs,
    setDesigns,
    symmetryType,
    setSymmetryType,
    symmetryOrder,
    setSymmetryOrder,
    chains,
    setChains,
    addPotential,
    setAddPotential,
    isGenerating,
    progress,
    elapsed,
    jobFailed,
    submitError,
    handleRetrieve,
    handleFileUpload,
    handleGenerate,
    clearStructure,
    resetParameters,
    targetMode,
    setTargetMode,
  };
}
export type DesignWorkspace = ReturnType<typeof useDesignWorkspace>;
