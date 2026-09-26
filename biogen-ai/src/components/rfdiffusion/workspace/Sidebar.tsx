import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Database, Grid2x2, Folder, Clock3, Settings2, CircleHelp, ArrowLeft, X, Check, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const navItems = [
    { id: 'rfdiffusion', name: 'RFdiffusion', icon: Activity, isMain: true },
    { id: 'examples', name: 'Examples', icon: Database, isMain: false },
    { id: 'results', name: 'Results', icon: Grid2x2, isMain: false },
    { id: 'projects', name: 'Projects', icon: Folder, isMain: false },
    { id: 'history', name: 'History', icon: Clock3, isMain: false },
  ];

  return (
    <>
      <aside className={`${isCollapsed ? 'w-[58px]' : 'w-[185px]'} bg-ws-card border-r border-ws-border-light h-screen hidden lg:flex flex-col shrink-0 transition-all duration-200 z-30`}>
        
        {/* Logo & Brand with link to Home */}
        <div className={`border-b border-ws-border-light/60 flex items-center ${isCollapsed ? 'p-2 justify-center' : 'p-3.5 justify-between'}`}>
          <Link to="/" className="flex items-center gap-2.5 group" title="Return to BioGen AI Homepage">
            <div className="w-[34px] h-[34px] bg-ws-text rounded-[10px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A875" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <path d="M12 22V12"></path>
                <path d="M12 12 3.5 7"></path>
                <path d="M12 12l8.5-5"></path>
              </svg>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-[15px] text-ws-text leading-tight group-hover:text-ws-primary transition-colors">BioGen AI</span>
                <span className="text-[11px] font-semibold text-ws-dark leading-none mt-0.5">RFdiffusion Studio</span>
              </div>
            )}
          </Link>

          {onToggleCollapse && !isCollapsed && (
            <button 
              type="button"
              onClick={onToggleCollapse}
              title="Collapse sidebar for wide view"
              className="p-1 rounded-md text-ws-muted hover:text-ws-text hover:bg-ws-page transition-colors cursor-pointer"
            >
              <PanelLeftClose size={15} />
            </button>
          )}
        </div>

        {/* Exit link */}
        {!isCollapsed && (
          <div className="px-3 pt-2">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ws-text-sec hover:text-ws-primary transition-colors"
            >
              <ArrowLeft size={11} /> Exit to Platform
            </Link>
          </div>
        )}

        <div className={`py-2 ${isCollapsed ? 'px-1.5' : 'px-2.5'}`}>
          {!isCollapsed && (
            <span className="text-[10px] font-semibold text-ws-muted tracking-[0.08em] uppercase ml-2 mb-1.5 block">
              WORKSPACE
            </span>
          )}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.isMain;
              return (
                <button
                  key={item.name}
                  type="button"
                  title={item.name}
                  onClick={() => {
                    if (!item.isMain) {
                      setActiveModal(item.id);
                    }
                  }}
                  className={`flex items-center gap-2.5 rounded-[8px] h-[34px] transition-colors w-full cursor-pointer ${
                    isCollapsed ? 'justify-center px-1.5' : 'px-2.5 text-left'
                  } ${
                    isActive 
                      ? 'bg-ws-pale text-ws-dark font-semibold' 
                      : 'text-ws-text-sec hover:bg-ws-page hover:text-ws-text font-medium'
                  }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-ws-primary shrink-0' : 'shrink-0'} />
                  {!isCollapsed && <span className="text-[13px] truncate">{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`mt-auto py-2 ${isCollapsed ? 'px-1.5' : 'px-2.5'}`}>
          {!isCollapsed && (
            <span className="text-[10px] font-semibold text-ws-muted tracking-[0.08em] uppercase ml-2 mb-1.5 block">
              SYSTEM
            </span>
          )}
          <nav className="flex flex-col gap-1">
            <button 
              type="button"
              title="Settings"
              onClick={() => setActiveModal('settings')}
              className={`flex items-center gap-2.5 rounded-[8px] h-[34px] text-ws-text-sec hover:bg-ws-page hover:text-ws-text font-medium transition-colors w-full cursor-pointer ${
                isCollapsed ? 'justify-center px-1.5' : 'px-2.5 text-left'
              }`}
            >
              <Settings2 size={16} strokeWidth={2} className="shrink-0" />
              {!isCollapsed && <span className="text-[13px]">Settings</span>}
            </button>
            <button 
              type="button"
              title="Help"
              onClick={() => setActiveModal('help')}
              className={`flex items-center gap-2.5 rounded-[8px] h-[34px] text-ws-text-sec hover:bg-ws-page hover:text-ws-text font-medium transition-colors w-full cursor-pointer ${
                isCollapsed ? 'justify-center px-1.5' : 'px-2.5 text-left'
              }`}
            >
              <CircleHelp size={16} strokeWidth={2} className="shrink-0" />
              {!isCollapsed && <span className="text-[13px]">Help</span>}
            </button>

            {onToggleCollapse && isCollapsed && (
              <button 
                type="button"
                onClick={onToggleCollapse}
                title="Expand sidebar"
                className="flex items-center justify-center rounded-[8px] h-[34px] text-ws-muted hover:text-ws-text hover:bg-ws-page transition-colors w-full cursor-pointer mt-1"
              >
                <PanelLeftOpen size={16} />
              </button>
            )}
          </nav>
        </div>

        {/* Compact bottom indicator */}
        {!isCollapsed && (
          <div className="p-3 border-t border-ws-border-light text-[10px] text-ws-muted flex items-center justify-between">
            <span className="font-semibold text-ws-dark">BioGen RFdiffusion</span>
            <span className="text-ws-primary font-mono font-bold">v1.1</span>
          </div>
        )}

      </aside>

      {/* Workspace Sidebar Modals (Examples, Results, Projects, History, Settings, Help) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-ws-border relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-ws-muted hover:text-ws-text hover:bg-ws-page transition-colors"
            >
              <X size={18} />
            </button>

            {activeModal === 'examples' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">Preloaded Research Examples</h3>
                <p className="text-xs text-ws-text-sec mb-4">Select a reference structure to populate RFdiffusion parameters.</p>
                <div className="space-y-2.5">
                  {[
                    { pdb: '4OIG', title: 'Ubiquitin ligase complex', type: 'Target-conditioned binder', residues: '680 aa' },
                    { pdb: '1UBQ', title: 'Human Ubiquitin', type: 'Scaffolding & Partial diffusion', residues: '76 aa' },
                    { pdb: '6M0J', title: 'SARS-CoV-2 Spike RBD & ACE2', type: 'De novo neutralizing binder', residues: '810 aa' },
                  ].map((ex) => (
                    <div key={ex.pdb} className="p-3 rounded-xl border border-ws-border hover:border-ws-primary bg-ws-page/50 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-ws-pale text-ws-dark font-mono text-xs font-bold">{ex.pdb}</span>
                          <span className="text-sm font-semibold text-ws-text">{ex.title}</span>
                        </div>
                        <span className="text-xs text-ws-text-sec mt-1 block">{ex.type} • {ex.residues}</span>
                      </div>
                      <button 
                        onClick={() => setActiveModal(null)}
                        className="px-3 py-1.5 text-xs font-semibold bg-ws-primary text-white rounded-lg hover:bg-ws-dark transition-colors"
                      >
                        Use in Design
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === 'results' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">Generated Backbones</h3>
                <p className="text-xs text-ws-text-sec mb-4">Historical backbone models ready for Sequence Design (ProteinMPNN).</p>
                <div className="p-4 bg-ws-page rounded-xl border border-ws-border text-center">
                  <span className="text-xs text-ws-muted block">Run a diffusion job with the "Run RFdiffusion" button to inspect candidate backbones, pLDDT metrics, and RMSD aligns.</span>
                </div>
              </div>
            )}

            {activeModal === 'projects' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">Research Projects</h3>
                <p className="text-xs text-ws-text-sec mb-4">Manage computational campaigns and multi-target workspaces.</p>
                <div className="p-3.5 rounded-xl border border-ws-border bg-ws-page/50 mb-3">
                  <span className="text-xs font-bold text-ws-text block">Default Workspace: Target 4OIG Binder Series</span>
                  <span className="text-[11px] text-ws-muted">Status: Active • Cloud GPU Allocated</span>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2 bg-ws-primary text-white text-xs font-semibold rounded-lg hover:bg-ws-dark"
                >
                  Continue Current Project
                </button>
              </div>
            )}

            {activeModal === 'history' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">Run History</h3>
                <p className="text-xs text-ws-text-sec mb-4">Recent diffusion and refinement sessions.</p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-ws-page rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-ws-text">4OIG_diffused_candidate_01</span>
                      <span className="text-[11px] text-ws-muted block">50 iterations • C1 symmetry</span>
                    </div>
                    <span className="text-[11px] text-bio-green font-semibold">Completed</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'settings' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">Compute & Viewer Settings</h3>
                <p className="text-xs text-ws-text-sec mb-4">Configure GPU memory thresholds and 3Dmol.js rendering quality.</p>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-ws-border">
                    <span className="font-medium text-ws-text">Modal Serverless GPU Node</span>
                    <span className="px-2 py-1 rounded bg-[#E8FAF8] text-bio-green font-semibold">NVIDIA A10G</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border border-ws-border">
                    <span className="font-medium text-ws-text">Antialiasing (FXAA)</span>
                    <span className="text-bio-green font-semibold">Enabled</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'help' && (
              <div>
                <h3 className="text-lg font-bold text-ws-text mb-1">RFdiffusion Documentation</h3>
                <p className="text-xs text-ws-text-sec mb-3">Guidelines for generative protein backbone design.</p>
                <div className="p-3 bg-ws-pale rounded-xl border border-[#D1FAE5] text-xs text-ws-dark leading-relaxed mb-4">
                  Define your target contigs (e.g. <code className="font-mono bg-white px-1.5 py-0.5 rounded">A1-150/0 70-100</code>) to preserve target binding regions while generating novel binder loops.
                </div>
                <a 
                  href="https://github.com/RosettaCommons/RFdiffusion" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold text-ws-primary hover:underline block text-center"
                >
                  View RosettaCommons RFdiffusion Repo &rarr;
                </a>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-ws-border-light flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-ws-page hover:bg-ws-border-light text-ws-text rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
