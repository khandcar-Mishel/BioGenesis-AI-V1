import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Settings, Database, Activity, LayoutGrid, Folder, Clock, XCircle, CheckCircle2, Hammer, Microscope, Waves, Users, ArrowLeft } from 'lucide-react';
import { DesignView } from './features/DesignView';
import { AnalyzeView } from './features/AnalyzeView';
import { ResultsView } from './features/ResultsView';
import { SettingsView } from './features/SettingsView';
import { LandingPage } from './features/LandingPage';
import { ComingSoon } from './components/ComingSoon';
import { useAppStore } from './stores/appStore';
import { useEffect } from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rfdiffusion/*" element={<RFdiffusionApp />} />
        <Route
          path="/screening"
          element={
            <ComingSoon
              icon={Microscope}
              eyebrow="Pipeline · Stage 4"
              title="Screening"
              description="High-throughput in-silico filtering of every RFdiffusion design against binding affinity, stability and developability criteria — before a single sequence reaches the wet lab."
              bullets={[
                'Batch scoring across all designs from a completed job',
                'Configurable filters: pLDDT, interface pAE, RMSD to target',
                'Rank and shortlist candidates directly from the Results library',
              ]}
            />
          }
        />
        <Route
          path="/md-simulation"
          element={
            <ComingSoon
              icon={Waves}
              eyebrow="Pipeline · Stage 5"
              title="MD Simulation"
              description="Molecular dynamics trajectories to validate that a design's fold is stable over time, not just at a single predicted structure."
              bullets={[
                'GPU-accelerated MD via OpenMM, launched straight from a design',
                'Stability, RMSF and free-energy trajectory plots',
                'Trajectory playback inside the same 3D viewer used for results',
              ]}
            />
          }
        />
        <Route
          path="/results"
          element={
            <ComingSoon
              icon={LayoutGrid}
              eyebrow="Unified library"
              title="Results"
              description="A single library of every design, sequence and structure produced across RFdiffusion, Screening and MD Simulation — searchable, comparable, exportable."
              bullets={[
                'Cross-pipeline history, not just the current session',
                'Side-by-side structure comparison and diffing',
                'One-click export to PDB, FASTA or a shareable report',
              ]}
            />
          }
        />
        <Route
          path="/about"
          element={
            <ComingSoon
              icon={Users}
              eyebrow="The team"
              title="About Us"
              description="BioGen AI is built by a small team obsessed with making generative protein design accessible from a browser tab, not just a cluster."
              bullets={[
                'Our story and the research this studio builds on',
                'How RFdiffusion, ProteinMPNN and AlphaFold2 fit together',
                'Ways to reach us, contribute, or follow along',
              ]}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/** The working RFdiffusion studio — Design / Analyze / Results / Settings. */
function RFdiffusionApp() {
  const { checkConnection } = useAppStore();

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-800">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden p-6">
          <Routes>
            <Route path="/" element={<DesignView />} />
            <Route path="/analyze" element={<AnalyzeView />} />
            <Route path="/results" element={<ResultsView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/projects" element={<PlaceholderPage icon={<Folder size={20} />} title="Projects" message="Project workspaces are coming in a future release. All designs you generate stay available under Results." />} />
            <Route path="/history" element={<PlaceholderPage icon={<Clock size={20} />} title="History" message="A run history log is coming in a future release." />} />
            <Route path="*" element={<Navigate to="/rfdiffusion" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Header() {
  const { isBackendConnected } = useAppStore();
  return (
    <div className="bg-white border-b border-slate-200 flex items-center justify-between px-6 py-3 shrink-0 h-[72px] z-10">
      <div className="flex items-center gap-4 w-[260px]">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 shadow-sm transition-transform group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 20 20" className="text-bio-500">
              <path
                d="M5 2.5c0 5 10 5 10 10s-10 5-10 10M5 5.5c0 3.5 10 3.5 10 7s-10 3.5-10 7"
                fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-[16px] text-slate-800 tracking-tight leading-tight">BioGen AI</h1>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">RFdiffusion Studio</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-400">
          <div className="flex items-center gap-2 text-emerald-700">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[12px]">1</div>
            Target
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[12px]">2</div>
            Design
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[12px]">3</div>
            Generate
          </div>
          <div className="w-8 h-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-[12px]">4</div>
            Analyze
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm w-[260px] justify-end">
        {isBackendConnected ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-emerald-500 text-emerald-600 font-bold text-[12px] shadow-sm">
            <CheckCircle2 size={14} className="text-emerald-500" />
            GPU Connected
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-red-500 text-red-600 font-bold text-[12px] shadow-sm">
            <XCircle size={14} className="text-red-500" />
            GPU Disconnected
          </div>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  const { isBackendConnected } = useAppStore();
  return (
    <div className="w-[240px] bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">WORKSPACE</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion" end icon={<Activity size={18}/>} label="Design" />
            <SidebarLink to="/rfdiffusion/analyze" icon={<Database size={18}/>} label="Analyze" />
            <SidebarLink to="/rfdiffusion/results" icon={<LayoutGrid size={18}/>} label="Results" />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">PROJECT</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion/projects" icon={<Folder size={18}/>} label="Projects" />
            <SidebarLink to="/rfdiffusion/history" icon={<Clock size={18}/>} label="History" />
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">SYSTEM</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion/settings" icon={<Settings size={18}/>} label="Settings" status={isBackendConnected ? 'online' : 'offline'} />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}

function SidebarLink({ to, end, icon, label, status }: { to: string, end?: boolean, icon: React.ReactNode, label: string, status?: string }) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <Link to={to} className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors font-semibold text-[13px] ${isActive ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-slate-50 text-slate-600'}`}>
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>{icon}</span>
        <span>{label}</span>
      </div>
      {status === 'online' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></div>}
      {status === 'offline' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div>}
    </Link>
  );
}

function PlaceholderPage({ icon, title, message }: { icon: React.ReactNode, title: string, message: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-10">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-lg font-black text-slate-800 mb-2 tracking-tight">{title}</h2>
        <p className="text-[13px] text-slate-500 font-medium mb-4">{message}</p>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <Hammer size={12} /> Under construction
        </div>
      </div>
    </div>
  );
}
