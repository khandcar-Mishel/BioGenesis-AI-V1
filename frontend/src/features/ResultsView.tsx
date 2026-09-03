import { useEffect, useState } from 'react';
import { Download, Loader2, FileArchive } from 'lucide-react';
import { MolecularViewer } from './MolecularViewer';
import { useAppStore } from '../stores/appStore';
import { getJobResult, downloadResult, downloadResultsZip } from '../services/api';

export function ResultsView() {
  const { jobStatus } = useAppStore();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [pdbData, setPdbData] = useState<string | undefined>(undefined);
  const [loadError, setLoadError] = useState('');
  const [downloadError, setDownloadError] = useState('');

  const hasResults = jobStatus?.status === 'completed' && (jobStatus?.output_files?.length ?? 0) > 0;

  const handleDownload = async (file: string) => {
    if (!jobStatus) return;
    setDownloadError('');
    try {
      await downloadResult(jobStatus.job_id, file);
    } catch {
      setDownloadError(`Failed to download ${file}`);
    }
  };

  const handleDownloadZip = async () => {
    if (!jobStatus) return;
    setDownloadError('');
    try {
      await downloadResultsZip(jobStatus.job_id, jobStatus.name || 'results');
    } catch {
      setDownloadError('Failed to download the results zip.');
    }
  };

  useEffect(() => {
    setSelectedIdx(0);
  }, [jobStatus?.job_id]);

  useEffect(() => {
    let cancelled = false;
    setPdbData(undefined);
    setLoadError('');
    if (hasResults && jobStatus) {
      const filename = jobStatus.output_files[selectedIdx];
      getJobResult(jobStatus.job_id, filename)
        .then((text) => {
          if (!cancelled) setPdbData(text);
        })
        .catch(() => {
          if (!cancelled) setLoadError('Failed to load structure from backend.');
        });
    }
    return () => {
      cancelled = true;
    };
  }, [hasResults, jobStatus?.job_id, selectedIdx]);

  return (
    <div className="h-full flex gap-4">
      <div className="w-[400px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
        {downloadError && (
          <div className="mb-2 text-[11px] font-bold px-3 py-1.5 rounded-md bg-red-50 text-red-600 border border-red-100">
            {downloadError}
          </div>
        )}

        {hasResults ? (
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">GENERATED CANDIDATES</h2>
              {jobStatus.has_results_zip && (
                <button
                  onClick={handleDownloadZip}
                  title="Download all results as zip"
                  className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 hover:text-sky-700 border border-sky-200 hover:border-sky-300 rounded-md px-2 py-1 transition"
                >
                  <FileArchive size={13} /> Download all
                </button>
              )}
            </div>
            {jobStatus.output_files.map((file: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`p-3 border rounded-md cursor-pointer transition ${
                  selectedIdx === idx
                    ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-200'
                    : 'border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">Candidate {idx + 1}</p>
                    <p className="text-xs text-slate-500">{file}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                    title="Download PDB"
                    className="text-slate-400 hover:text-sky-600 transition"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-slate-800 mb-2">GENERATED CANDIDATES</h2>
            <p className="text-xs text-slate-500 mb-4">No designs generated yet. Click 'Generate' in the Design workspace.</p>
            <div className="flex-1 border border-slate-200 rounded-md bg-slate-50 p-2 flex flex-col items-center justify-center text-slate-400">
              Empty Gallery
            </div>
          </>
        )}
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-slate-800 text-[13px]">
            {hasResults ? jobStatus.output_files[selectedIdx] : 'No result selected'}
          </h3>
          {jobStatus && (
            <p className="text-[11px] text-slate-500">
              Job: {jobStatus.name} · {jobStatus.status_message}
            </p>
          )}
        </div>
        <div className="flex-1 bg-white relative">
          {hasResults ? (
            loadError ? (
              <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm font-medium">
                {loadError}
              </div>
            ) : pdbData ? (
              <MolecularViewer pdbData={pdbData} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium">
                <Loader2 size={18} className="animate-spin mr-2" /> Loading structure...
              </div>
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              Result Viewer Placeholder
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
