import React from 'react';
import { Clock, Cpu, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { GpuStatus } from './TopBar';

interface GenerationStatusCardProps {
  gpuStatus: GpuStatus;
  onConnectGpu: () => void;
  isGenerating?: boolean;
  progress?: number;
  currentStep?: string;
}

export default function GenerationStatusCard({
  gpuStatus,
  onConnectGpu,
  isGenerating = false,
  progress = 0,
  currentStep = 'Ready to generate'
}: GenerationStatusCardProps) {
  return (
    <div className="bg-ws-card border border-ws-border rounded-[14px] p-3 sm:p-3.5 shadow-[0_1px_4px_rgba(16,24,40,0.03)]">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-ws-primary" strokeWidth={2.5} />
          <h3 className="text-[13px] font-[700] text-ws-text">Generation status</h3>
        </div>

        {/* Signal Indicator based on GPU status */}
        {gpuStatus === 'idle' ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FEF2F2] border border-[#FEE2E2] rounded-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.7)]"></div>
            <span className="text-[11px] font-bold text-red-700 leading-none">Idle Mode</span>
            <span className="text-[10px] text-red-500 leading-none hidden sm:inline">• Red Signal</span>
          </div>
        ) : gpuStatus === 'connecting' ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFBEB] border border-[#FEF3C7] rounded-[6px]">
            <RefreshCw size={10} className="text-amber-600 animate-spin" />
            <span className="text-[11px] font-bold text-amber-700 leading-none">Connecting...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F0FDF4] border border-[#DCFCE7] rounded-[6px]">
            <div className="w-[6px] h-[6px] rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.7)] animate-pulse"></div>
            <span className="text-[11px] font-bold text-emerald-800 leading-none">GPU Connected</span>
            <span className="text-[10px] text-emerald-600 leading-none hidden sm:inline">• Green Signal</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[12px] mb-2 text-ws-text-sec">
        <div className="flex items-center gap-1.5">
          {gpuStatus === 'connected' ? (
            <CheckCircle2 size={13} className="text-emerald-600" />
          ) : (
            <AlertCircle size={13} className="text-red-500" />
          )}
          <span className="font-semibold text-ws-text">
            {isGenerating ? currentStep : gpuStatus === 'connected' ? 'Ready to run diffusion' : 'Idle — GPU Disconnected'}
          </span>
        </div>
        
        {gpuStatus === 'idle' && !isGenerating && (
          <button
            type="button"
            onClick={onConnectGpu}
            className="text-[11px] font-semibold text-ws-primary hover:text-ws-dark hover:underline cursor-pointer flex items-center gap-1"
          >
            <Cpu size={11} /> Connect now
          </button>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-[6px] bg-ws-progress rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              gpuStatus === 'connected' ? 'bg-ws-primary' : 'bg-red-400'
            }`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-[11px] font-bold text-ws-text font-mono">{progress}%</span>
      </div>

    </div>
  );
}
