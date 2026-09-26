import {
  CheckCircle2,
  X,
  Loader2,
  Box,
  Clock,
  Inbox,
  Database,
  CircleHelp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MolecularViewer } from './MolecularViewer';
import { DesignParametersCard } from '../components/workspace/DesignParametersCard';
import type { DesignWorkspace } from './useDesignWorkspace';
import { useAppStore } from '../stores/appStore';

const card =
  'bg-ws-card border border-ws-border rounded-[14px] p-3.5 sm:p-4 shadow-[0_1px_4px_rgba(16,24,40,0.03)]';

export function DesignView({ design: d }: { design: DesignWorkspace }) {
  const { jobStatus, isBackendConnected } = useAppStore();
  const statusText = d.isGenerating
    ? jobStatus?.status_message || 'Submitting design job...'
    : jobStatus?.status === 'completed'
      ? 'Generation complete'
      : jobStatus?.status === 'failed'
        ? jobStatus.status_message || 'Generation failed'
        : jobStatus?.status === 'cancelled'
          ? 'Generation cancelled'
          : 'Ready to generate';
  return (
    <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-3 sm:gap-3.5">
      <div className="w-full lg:w-[54%] flex flex-col gap-3 min-w-0">
        <section className={card} aria-labelledby="target-title">
          <div className="flex items-start gap-2.5 mb-3">
            <span className="w-5 h-5 rounded-full bg-ws-primary text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h2
                id="target-title"
                className="flex items-center gap-1.5 text-[14px] font-bold"
              >
                Target structure{' '}
                <span className="text-[12px] text-ws-muted font-normal">
                  (optional)
                </span>
                <CircleHelp size={13}>
                  <title>
                    Load a PDB structure for binder or motif design. Choose None
                    for de novo design.
                  </title>
                </CircleHelp>
              </h2>
              <p className="text-[12px] text-ws-text-sec mt-0.5">
                Provide a starting structure if required (for motif, partial
                diffusion, or binder design).
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 sm:gap-5 border-b border-ws-border-light mb-3"
            role="tablist"
            aria-label="Target source"
          >
            {(
              [
                { id: 'pdb', label: 'PDB ID' },
                { id: 'upload', label: 'Upload PDB' },
                { id: 'none', label: 'None (De novo)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={d.targetMode === tab.id}
                disabled={d.isGenerating || d.structureStatus === 'loading'}
                onClick={() => {
                  d.setTargetMode(tab.id);
                  d.clearStructure();
                  if (tab.id === 'none') d.setContigs('100');
                }}
                className={`pb-1.5 text-[12px] font-semibold border-b-2 disabled:opacity-50 ${d.targetMode === tab.id ? 'text-ws-primary border-ws-primary' : 'text-ws-text-sec border-transparent'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {d.targetMode === 'pdb' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void d.handleRetrieve();
              }}
            >
              <div className="flex gap-2 mb-1.5">
                <input
                  aria-label="PDB ID"
                  value={d.pdbInput}
                  onChange={(e) => d.setPdbInput(e.target.value)}
                  disabled={d.isGenerating || d.structureStatus === 'loading'}
                  placeholder="e.g. 4N5T"
                  className="flex-1 min-w-0 h-[34px] px-3 border border-[#D9DEE7] rounded-[6px] text-[13px] focus:border-ws-primary"
                />
                <button
                  type="submit"
                  disabled={d.structureStatus === 'loading' || d.isGenerating}
                  className="h-[34px] px-4 bg-ws-primary hover:bg-ws-dark text-white text-[13px] font-semibold rounded-[6px] disabled:opacity-50"
                >
                  {d.structureStatus === 'loading' ? 'Loading...' : 'Load'}
                </button>
              </div>
              <p className="text-[11px] text-ws-muted mb-3">
                Examples: <span className="font-mono">4N5T, 1UBQ, 1CRN</span> ·
                RCSB PDB
              </p>
            </form>
          )}
          {d.targetMode === 'upload' && (
            <div className="mb-3">
              <input
                aria-label="Upload PDB file"
                type="file"
                accept=".pdb"
                onChange={d.handleFileUpload}
                disabled={d.isGenerating || d.structureStatus === 'loading'}
                className="w-full text-[12px] text-ws-text-sec file:mr-3 file:border-0 file:rounded-md file:bg-ws-pale file:text-ws-dark file:px-3 file:py-2 file:font-semibold"
              />
              <p className="text-[11px] text-ws-muted mt-2">
                Upload a local .pdb structure to use as your target.
              </p>
            </div>
          )}
          {d.targetMode === 'none' && (
            <p className="text-[12px] text-ws-text-sec py-2">
              Generate a new backbone without a target. Set Contigs to a length,
              such as <code>100</code>.
            </p>
          )}
          {d.structureStatus === 'success' && (
            <div className="bg-ws-pale border border-[#D1FAE5] rounded-[8px] p-2.5 flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <CheckCircle2
                  size={16}
                  className="text-ws-primary shrink-0 mt-0.5"
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-ws-dark break-all">
                    Structure loaded: {d.activePdb}
                  </p>
                  <p className="text-[11px] text-ws-text-sec mt-0.5">
                    {d.structureDetails} ·{' '}
                    {d.structureSource === 'upload'
                      ? 'Local file'
                      : 'PDB Source'}
                  </p>
                </div>
              </div>
              <button
                disabled={d.isGenerating}
                onClick={d.clearStructure}
                aria-label="Clear target structure"
                className="text-ws-muted p-1"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {d.structureStatus === 'loading' && (
            <p role="status" className="text-xs text-ws-primary flex gap-2">
              <Loader2 size={14} className="animate-spin" />
              Loading structure...
            </p>
          )}
          {d.structureStatus === 'error' && (
            <p
              role="alert"
              className="text-xs bg-red-50 text-red-700 rounded-lg p-2"
            >
              {d.structureError}
            </p>
          )}
        </section>
        <fieldset
          aria-label="Design parameters"
          disabled={d.isGenerating}
          className="min-w-0"
        >
          <DesignParametersCard d={d} />
        </fieldset>
      </div>
      <div className="w-full lg:w-[46%] flex flex-col gap-3 min-w-0">
        <section className="bg-white border border-ws-border rounded-[14px] overflow-hidden shadow-[0_1px_4px_rgba(16,24,40,0.03)]">
          <div className="p-3 border-b border-ws-border-light flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="flex items-center gap-1.5 font-bold text-[13px]">
                <Box size={15} className="text-ws-primary" />
                Structure viewer
              </h2>
              <p className="text-[11px] text-ws-text-sec mt-0.5 truncate">
                {d.activePdb || 'No structure loaded'}
              </p>
            </div>
            <span className="text-[10px] text-ws-muted">Interactive 3D</span>
          </div>
          <div className="h-[330px] sm:h-[350px] relative">
            {d.activePdb ? (
              <MolecularViewer
                pdbId={d.pdbData ? undefined : d.activePdb}
                pdbData={d.pdbData}
                compact
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] text-ws-muted">
                <Box size={40} strokeWidth={1} />
                <p className="text-xs">Load a structure to explore it in 3D</p>
              </div>
            )}
          </div>
        </section>
        <section className={card} aria-label="Generation status">
          <div className="flex items-center justify-between mb-3">
            <h2 className="flex items-center gap-2 text-[13px] font-bold">
              <Clock size={15} className="text-ws-primary" />
              Generation status
            </h2>
            <span
              className={`px-2 py-1 rounded-md text-[10px] font-bold ${isBackendConnected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
            >
              {isBackendConnected ? 'Backend Connected' : 'Idle Mode'}
            </span>
          </div>
          <p
            role="status"
            className={`text-[12px] mb-2 ${d.jobFailed ? 'text-red-600' : 'text-ws-text-sec'}`}
          >
            {statusText}
          </p>
          <div className="flex items-center gap-2.5">
            <div
              role="progressbar"
              aria-label="Generation progress"
              aria-valuenow={d.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="flex-1 h-1.5 bg-ws-progress rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-ws-primary transition-all"
                style={{ width: `${d.progress}%` }}
              />
            </div>
            <span className="text-[11px] font-bold font-mono">
              {d.progress}%
            </span>
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-ws-muted">
            <span>Elapsed: {d.elapsed}</span>
            {!isBackendConnected && (
              <Link
                to="/rfdiffusion/studio/settings"
                className="text-ws-primary font-semibold"
              >
                Connection settings →
              </Link>
            )}
          </div>
          {jobStatus?.status === 'completed' && (
            <Link
              to="/rfdiffusion/studio/results"
              className="block mt-3 text-xs text-ws-dark font-semibold"
            >
              Generation complete — view results →
            </Link>
          )}
        </section>
        <section className={card}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="flex items-center gap-2 text-[13px] font-bold">
              <Database size={15} className="text-ws-primary" />
              Recent results
            </h2>
            <Link
              to="/rfdiffusion/studio/results"
              className="text-[11px] font-semibold text-ws-primary"
            >
              View all →
            </Link>
          </div>
          {jobStatus?.status === 'completed' &&
          jobStatus.output_files?.length ? (
            <div className="flex flex-col gap-1">
              {jobStatus.output_files.slice(0, 3).map((file: string) => (
                <Link
                  key={file}
                  to="/rfdiffusion/studio/results"
                  className="text-xs text-ws-dark rounded-md bg-ws-pale p-2 truncate"
                >
                  {file}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-3 text-ws-muted text-[11px]">
              <Inbox size={18} />
              Your generated structures will appear here.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
