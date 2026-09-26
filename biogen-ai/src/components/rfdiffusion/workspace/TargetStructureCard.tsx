import React, { useState } from 'react';
import { CircleHelp, CheckCircle2, X } from 'lucide-react';

export default function TargetStructureCard() {
  const [activeTab, setActiveTab] = useState('PDB ID');
  const [isLoaded, setIsLoaded] = useState(true); // Demo state

  return (
    <div className="bg-ws-card border border-ws-border rounded-[14px] p-3.5 sm:p-4 shadow-[0_1px_4px_rgba(16,24,40,0.03)]">
      
      {/* Header */}
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-5 h-5 rounded-full bg-ws-primary text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
          1
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[14px] font-[700] text-ws-text">Target structure</h3>
            <span className="text-[12px] text-ws-muted">(optional)</span>
            <CircleHelp size={13} className="text-ws-muted ml-0.5 cursor-pointer hover:text-ws-text" />
          </div>
          <p className="text-[12px] text-ws-text-sec mt-0.5 leading-snug">
            Provide a starting structure if required (for motif, partial diffusion, or binder design).
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 sm:gap-5 border-b border-ws-border-light mb-3">
        {['PDB ID', 'UniProt ID', 'Upload PDB', 'None (De novo)'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1.5 text-[12px] font-semibold transition-colors relative cursor-pointer ${
              activeTab === tab ? 'text-ws-primary' : 'text-ws-text-sec hover:text-ws-text'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-ws-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 mb-1.5">
        <input 
          type="text"
          placeholder="4OIG"
          defaultValue="4OIG"
          className="flex-1 h-[34px] px-3 border border-[#D9DEE7] rounded-[6px] text-[13px] font-medium focus:outline-none focus:border-ws-primary focus:ring-1 focus:ring-ws-primary/20 transition-all"
        />
        <button className="h-[34px] px-4 bg-ws-primary hover:bg-ws-dark text-white text-[13px] font-semibold rounded-[6px] transition-colors cursor-pointer">
          Load
        </button>
      </div>
      <p className="text-[11px] text-ws-muted mb-3">
        Examples: <span className="font-mono text-ws-text-sec">4OIG</span>, <span className="font-mono text-ws-text-sec">1UBQ</span>, <span className="font-mono text-ws-text-sec">AF-P00519</span> (UniProt)
      </p>

      {/* Success State */}
      {isLoaded && (
        <div className="bg-ws-pale border border-[#D1FAE5] rounded-[8px] p-2.5 flex items-start justify-between">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-ws-primary shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] font-bold text-ws-dark leading-tight">Structure loaded: 4OIG_Short</span>
              <div className="text-[11px] text-ws-text-sec font-medium flex items-center gap-1.5 flex-wrap">
                <span>Chains: A, B, D, E</span>
                <span className="text-ws-muted text-[8px]">●</span>
                <span>680 residues</span>
                <span className="text-ws-muted text-[8px]">●</span>
                <span>PDB Source</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsLoaded(false)} className="text-ws-muted hover:text-ws-text transition-colors p-1 cursor-pointer">
            <X size={14} />
          </button>
        </div>
      )}

    </div>
  );
}

