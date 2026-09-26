import React from 'react';
import { CircleHelp, Play, Cpu, RefreshCw, Power } from 'lucide-react';

export type GpuStatus = 'idle' | 'connecting' | 'connected';

interface TopBarProps {
  gpuStatus: GpuStatus;
  onConnectGpu: () => void;
  onDisconnectGpu?: () => void;
}

const steps = [
  { num: 1, title: 'Target', sub: 'Structure', status: 'active' },
  { num: 2, title: 'Design', sub: 'Params', status: 'upcoming' },
  { num: 3, title: 'Backbone', sub: 'Diffusion', status: 'upcoming' },
  { num: 4, title: 'Sequence', sub: 'Design', status: 'upcoming' },
  { num: 5, title: 'Structure', sub: 'Model', status: 'upcoming' },
  { num: 6, title: 'Results', sub: 'Inspect', status: 'upcoming' },
];

export default function TopBar({ gpuStatus, onConnectGpu, onDisconnectGpu }: TopBarProps) {
  return (
    <header className="h-[52px] bg-ws-card border-b border-ws-border-light flex items-center justify-between px-4 sm:px-5 shrink-0 z-20">
      
      {/* Workflow Stepper */}
      <div className="flex-1 max-w-[760px] flex items-center overflow-x-auto py-1 scrollbar-none">
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                step.status === 'active' || step.status === 'completed'
                  ? 'bg-ws-primary text-white shadow-xs'
                  : 'bg-ws-page text-ws-muted border border-ws-border-light'
              }`}>
                {step.num}
              </div>
              <div className="flex flex-col">
                <span className={`text-[12px] font-semibold leading-none ${step.status === 'active' ? 'text-ws-text' : 'text-ws-text-sec'}`}>
                  {step.title}
                </span>
                <span className="text-[10px] text-ws-muted mt-0.5 leading-none hidden sm:inline">
                  {step.sub}
                </span>
              </div>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="flex-1 min-w-[12px] max-w-[36px] mx-2 h-[1px] bg-ws-border-light shrink-0"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* GPU Signal Status & Controls */}
      <div className="flex items-center gap-2.5 ml-4 shrink-0">
        {gpuStatus === 'idle' ? (
          /* RED SIGNAL: Idle Mode */
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 h-[32px] bg-[#FEF2F2] border border-[#FEE2E2] rounded-[8px]">
              <div className="w-[7px] h-[7px] rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)] animate-pulse"></div>
              <span className="text-[11px] font-bold text-red-700 leading-none">Idle Mode</span>
            </div>
            <button
              type="button"
              onClick={onConnectGpu}
              className="flex items-center gap-1.5 px-2.5 h-[32px] bg-ws-primary hover:bg-ws-dark text-white rounded-[7px] text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
              title="Establish connection with serverless GPU"
            >
              <Cpu size={12} />
              <span>Connect GPU</span>
            </button>
          </div>
        ) : gpuStatus === 'connecting' ? (
          /* AMBER SIGNAL: Connecting */
          <div className="flex items-center gap-2 px-3 h-[32px] bg-[#FFFBEB] border border-[#FEF3C7] rounded-[8px]">
            <RefreshCw size={12} className="text-amber-600 animate-spin" />
            <span className="text-[11px] font-bold text-amber-700 leading-none">Connecting GPU...</span>
          </div>
        ) : (
          /* GREEN SIGNAL: GPU Connected */
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 h-[32px] bg-[#F0FDF4] border border-[#DCFCE7] rounded-[8px]">
              <div className="w-[7px] h-[7px] rounded-full bg-emerald-500 shadow-[0_0_7px_rgba(16,185,129,0.8)] animate-pulse"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-emerald-800 leading-none">GPU Connected</span>
                <span className="text-[10px] font-medium text-emerald-600 leading-none hidden sm:inline">• Modal GPU</span>
              </div>
            </div>
            {onDisconnectGpu && (
              <button
                type="button"
                onClick={onDisconnectGpu}
                className="w-[28px] h-[28px] rounded-[6px] border border-ws-border-light hover:bg-[#FEF2F2] hover:border-[#FEE2E2] hover:text-red-600 text-ws-muted flex items-center justify-center transition-colors cursor-pointer"
                title="Disconnect GPU (set to Idle Mode)"
              >
                <Power size={13} />
              </button>
            )}
          </div>
        )}

        <button 
          type="button"
          title="Workflow Guide & Help"
          className="w-[28px] h-[28px] rounded-full text-ws-muted hover:text-ws-text hover:bg-ws-page flex items-center justify-center transition-colors cursor-pointer"
        >
          <CircleHelp size={16} strokeWidth={2} />
        </button>
      </div>

    </header>
  );
}
