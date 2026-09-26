import React, { useState } from 'react';
import { CircleHelp, ChevronDown, RotateCcw, Play, Loader2 } from 'lucide-react';
import { GpuStatus } from './TopBar';

interface DesignParametersCardProps {
  onGenerate?: () => void;
  isGenerating?: boolean;
  gpuStatus?: GpuStatus;
}

export default function DesignParametersCard({
  onGenerate,
  isGenerating = false,
  gpuStatus = 'idle'
}: DesignParametersCardProps) {
  const [designName, setDesignName] = useState('biogen_design_01');
  const [contigs, setContigs] = useState('100');
  const [hotspots, setHotspots] = useState('E64,E88,E96');
  const [iterations, setIterations] = useState('50');
  const [numDesigns, setNumDesigns] = useState('1');
  const [symmetryType, setSymmetryType] = useState('none');
  const [symmetryOrder, setSymmetryOrder] = useState('1');
  const [inputChains, setInputChains] = useState('A,B');

  const handleReset = () => {
    setDesignName('biogen_design_01');
    setContigs('100');
    setHotspots('E64,E88,E96');
    setIterations('50');
    setNumDesigns('1');
    setSymmetryType('none');
    setSymmetryOrder('1');
    setInputChains('A,B');
  };

  return (
    <div className="bg-ws-card border border-ws-border rounded-[14px] p-3.5 sm:p-4 shadow-[0_1px_4px_rgba(16,24,40,0.03)]">
      
      {/* Header */}
      <div className="flex items-start gap-2.5 mb-3.5">
        <div className="w-5 h-5 rounded-full bg-ws-primary text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
          2
        </div>
        <div className="flex flex-col">
          <h3 className="text-[14px] font-[700] text-ws-text leading-tight mb-0.5">Design parameters</h3>
          <p className="text-[12px] text-ws-text-sec">
            Configure RFdiffusion backbone generation parameters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <label className="text-[12px] font-semibold text-ws-text">Design name</label>
              <CircleHelp size={12} className="text-ws-muted cursor-pointer" />
            </div>
            <input 
              type="text" 
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[13px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <label className="text-[12px] font-semibold text-ws-text">Contigs</label>
              <CircleHelp size={12} className="text-ws-muted cursor-pointer" />
            </div>
            <input 
              type="text" 
              value={contigs}
              onChange={(e) => setContigs(e.target.value)}
              className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[13px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full" 
            />
            <span className="text-[10.5px] text-ws-muted">Examples: 100 | A:50-70 | 40/A163-181/40</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <label className="text-[12px] font-semibold text-ws-text">Hotspot residues <span className="font-normal text-ws-muted">(optional)</span></label>
              <CircleHelp size={12} className="text-ws-muted cursor-pointer" />
            </div>
            <input 
              type="text" 
              value={hotspots}
              onChange={(e) => setHotspots(e.target.value)}
              className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[13px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full" 
            />
            <span className="text-[10.5px] text-ws-muted">e.g. E64,E88,E96</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <label className="text-[12px] font-semibold text-ws-text">Iterations</label>
                <CircleHelp size={12} className="text-ws-muted cursor-pointer" />
              </div>
              <div className="relative">
                <select 
                  value={iterations}
                  onChange={(e) => setIterations(e.target.value)}
                  className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[12px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full appearance-none bg-white cursor-pointer"
                >
                  <option value="10">10 steps</option>
                  <option value="50">50 steps</option>
                  <option value="100">100 steps</option>
                  <option value="200">200 steps</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ws-muted pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <label className="text-[12px] font-semibold text-ws-text">Designs count</label>
                <CircleHelp size={12} className="text-ws-muted cursor-pointer" />
              </div>
              <div className="relative">
                <select 
                  value={numDesigns}
                  onChange={(e) => setNumDesigns(e.target.value)}
                  className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[12px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full appearance-none bg-white cursor-pointer"
                >
                  <option value="1">1 design</option>
                  <option value="3">3 designs</option>
                  <option value="5">5 designs</option>
                  <option value="10">10 designs</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ws-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-ws-text">Symmetry Type</label>
              <div className="relative">
                <select 
                  value={symmetryType}
                  onChange={(e) => setSymmetryType(e.target.value)}
                  className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[12px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full appearance-none bg-white cursor-pointer"
                >
                  <option value="none">none</option>
                  <option value="cyclic">cyclic</option>
                  <option value="dihedral">dihedral</option>
                  <option value="tetrahedral">tetrahedral</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ws-muted pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-ws-text">Symmetry Order</label>
              <div className="relative">
                <select 
                  value={symmetryOrder}
                  onChange={(e) => setSymmetryOrder(e.target.value)}
                  className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[12px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full appearance-none bg-white cursor-pointer"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ws-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-ws-text">Input chains <span className="font-normal text-ws-muted">(optional)</span></label>
            <input 
              type="text" 
              value={inputChains}
              onChange={(e) => setInputChains(e.target.value)}
              className="h-[32px] px-2.5 border border-[#D9DEE7] rounded-[6px] text-[13px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 w-full" 
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-ws-border-light">
        <button 
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 h-[34px] bg-white border border-[#D9DEE7] rounded-[6px] text-[12px] font-semibold text-ws-text hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          Reset
        </button>
        
        <button 
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className={`flex items-center justify-center gap-1.5 px-6 h-[34px] rounded-[6px] text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer ${
            isGenerating 
              ? 'bg-ws-primary/70 text-white cursor-not-allowed'
              : gpuStatus === 'idle'
              ? 'bg-ws-primary hover:bg-ws-dark text-white'
              : 'bg-ws-primary hover:bg-ws-dark text-white'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Generating Backbones...
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              Generate Structures
            </>
          )}
        </button>
      </div>

    </div>
  );
}
