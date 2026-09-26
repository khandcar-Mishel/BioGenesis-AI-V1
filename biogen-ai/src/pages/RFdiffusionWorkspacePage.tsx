import React, { useState, useRef } from 'react';
import Sidebar from '../components/rfdiffusion/workspace/Sidebar';
import TopBar, { GpuStatus } from '../components/rfdiffusion/workspace/TopBar';
import TargetStructureCard from '../components/rfdiffusion/workspace/TargetStructureCard';
import DesignParametersCard from '../components/rfdiffusion/workspace/DesignParametersCard';
import StructureViewerCard from '../components/rfdiffusion/workspace/StructureViewerCard';
import GenerationStatusCard from '../components/rfdiffusion/workspace/GenerationStatusCard';
import RecentResultsCard from '../components/rfdiffusion/workspace/RecentResultsCard';

export default function RFdiffusionWorkspacePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // GPU Connection State: Starts in idle mode (Red signal).
  // Successfully connected turns to Green signal ("GPU Connected").
  const [gpuStatus, setGpuStatus] = useState<GpuStatus>('idle');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Ready to generate');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Connect GPU: transitions from idle (red) -> connecting (amber) -> connected (green)
  const handleConnectGpu = () => {
    if (gpuStatus === 'connecting' || gpuStatus === 'connected') return;
    setGpuStatus('connecting');
    setTimeout(() => {
      setGpuStatus('connected');
    }, 800);
  };

  // Disconnect GPU: back to idle mode (red)
  const handleDisconnectGpu = () => {
    setGpuStatus('idle');
    setIsGenerating(false);
    setProgress(0);
    setCurrentStep('Idle — GPU Disconnected');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Trigger structure generation
  const handleGenerate = () => {
    if (isGenerating) return;

    // If GPU is idle, connect it first, then start diffusion
    if (gpuStatus !== 'connected') {
      setGpuStatus('connecting');
      setTimeout(() => {
        setGpuStatus('connected');
        startDiffusionProcess();
      }, 700);
    } else {
      startDiffusionProcess();
    }
  };

  const startDiffusionProcess = () => {
    setIsGenerating(true);
    setProgress(5);
    setCurrentStep('Sampling initial Gaussian backbone noise...');

    const stages = [
      { pct: 25, label: 'Running reverse diffusion (T=50 to T=35)...' },
      { pct: 55, label: 'Applying self-conditioning & motif guidance...' },
      { pct: 80, label: 'Denoising backbone frames (T=20 to T=0)...' },
      { pct: 100, label: 'Structure generated successfully (PDB exported)' }
    ];

    let stageIdx = 0;
    timerRef.current = setInterval(() => {
      if (stageIdx < stages.length) {
        setProgress(stages[stageIdx].pct);
        setCurrentStep(stages[stageIdx].label);
        stageIdx++;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsGenerating(false);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-ws-page font-sans flex text-ws-text overflow-hidden selection:bg-ws-primary/20">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar 
          gpuStatus={gpuStatus}
          onConnectGpu={handleConnectGpu}
          onDisconnectGpu={handleDisconnectGpu}
        />
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 lg:p-3.5">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-3 sm:gap-3.5">
            
            {/* LEFT COLUMN - Target & Parameters Configuration */}
            <div className="w-full lg:w-[54%] flex flex-col gap-3">
              <TargetStructureCard />
              <DesignParametersCard 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                gpuStatus={gpuStatus}
              />
            </div>

            {/* RIGHT COLUMN - 3D Viewer & Execution Telemetry */}
            <div className="w-full lg:w-[46%] flex flex-col gap-3">
              <StructureViewerCard />
              <GenerationStatusCard 
                gpuStatus={gpuStatus}
                onConnectGpu={handleConnectGpu}
                isGenerating={isGenerating}
                progress={progress}
                currentStep={currentStep}
              />
              <RecentResultsCard />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
