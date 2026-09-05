import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  Settings, Database, LayoutGrid, Folder, Clock, XCircle, Hammer,
  Microscope, Waves, ArrowLeft, Dna, BookOpen, HelpCircle, Cloud,
} from 'lucide-react';
import { DesignView } from './features/DesignView';
import { AnalyzeView } from './features/AnalyzeView';
import { ResultsView } from './features/ResultsView';
import { SettingsView } from './features/SettingsView';
import { LandingPage } from './features/LandingPage';
import { RFdiffusionLanding } from './features/RFdiffusionLanding';
import { ScreeningLanding } from './features/ScreeningLanding';
import { MDSimulationLanding } from './features/MDSimulationLanding';
import { AboutUsPage } from './features/AboutUsPage';
import { ComingSoon } from './components/ComingSoon';
import { BrandMark } from './components/BrandMark';
import { useAppStore } from './stores/appStore';
import { useEffect } from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/rfdiffusion" element={<RFdiffusionLanding />} />
        <Route path="/rfdiffusion/studio/*" element={<RFdiffusionStudio />} />

        <Route path="/screening" element={<ScreeningLanding />} />
        <Route
          path="/screening/workspace"
          element={
            <ComingSoon
              icon={Microscope}
              eyebrow="Pipeline · Stage 2"
              title="Screening Workspace"
              description="The Screening workspace itself isn't wired up yet — the tools table on the Screening page links out to the real bioinformatics services in the meantime."
              bullets={[
                'Batch scoring across every design from a completed RFdiffusion job',
                'Configurable filters: toxicity, allergenicity, stability, solubility',
                'Rank and shortlist candidates directly from the Results library',
              ]}
            />
          }
        />

        <Route path="/md-simulation" element={<MDSimulationLanding />} />
        <Route
          path="/md-simulation/workspace"
          element={
            <ComingSoon
              icon={Waves}
              eyebrow="Pipeline · Stage 3"
              title="MD Simulation Workspace"
              description="GPU-accelerated molecular dynamics to confirm a designed fold holds up over time, launched straight from an RFdiffusion result."
              bullets={[
                'OpenMM-based MD, run on the same serverless GPU as RFdiffusion',
                'RMSD, RMSF, radius of gyration and secondary-structure trajectories',
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
              title="Results Library"
              description="A single, searchable library of every design, sequence and structure produced across RFdiffusion, Screening and MD Simulation — not just the current session."
              bullets={[
                'Cross-pipeline history, persisted beyond one browser session',
                'Side-by-side structure comparison and diffing',
                'One-click export to PDB, FASTA or a shareable report',
              ]}
            />
          }
        />

        <Route path="/about" element={<AboutUsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/** The working RFdiffusion studio — Design / Analyze / Results / Settings. */
function RFdiffusionStudio() {
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
            <Route path="/examples" element={<PlaceholderPage icon={<BookOpen size={20} />} title="Examples" message="A gallery of ready-to-run presets (binder design, motif scaffolding, symmetric oligomers) is coming here. For now, pick a preset template directly from the Design panel." />} />
            <Route path="/projects" element={<PlaceholderPage icon={<Folder size={20} />} title="Projects" message="Project workspaces are coming in a future release. All designs you generate stay available under Results." />} />
            <Route path="/history" element={<PlaceholderPage icon={<Clock size={20} />} title="History" message="A run history log is coming in a future release." />} />
            <Route path="/help" element={<PlaceholderPage icon={<HelpCircle size={20} />} title="Help" message="Docs are on the way. In the meantime, hover the (?) icons next to each field for guidance, or reach out from the About Us page." />} />
            <Route path="*" element={<Navigate to="/rfdiffusion/studio" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Header() {
  const { isBackendConnected } = useAppStore();
  const steps = ['Target', 'Design', 'Backbone', 'Sequence', 'Structure', 'Results'];
  return (
    <div className="bg-white border-b border-slate-200 flex items-center justify-between px-6 py-3 shrink-0 h-[72px] z-10">
      <div className="flex items-center gap-4 w-[220px]">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <BrandMark size={40} />
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-[15px] text-slate-800 tracking-tight leading-tight">BioGen AI</h1>
            <p className="text-[10.5px] text-slate-500 font-medium tracking-wide">RFdiffusion Workspace</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 hidden lg:flex justify-center overflow-x-auto">
        <div className="flex items-center gap-2.5 text-[12.5px] font-semibold text-slate-400 whitespace-nowrap">
          {steps.map((label, i) => (
            <div key={label} className="flex items-center gap-2.5">
              <div className={`flex items-center gap-1.5 ${i === 0 ? 'text-emerald-700' : ''}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] ${i === 0 ? 'bg-emerald-600 text-white' : 'border border-slate-300'}`}>{i + 1}</div>
                {label}
              </div>
              {i < steps.length - 1 && <div className="w-5 h-[1px] bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm w-[220px] justify-end">
        {isBackendConnected ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11.5px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Compute Ready · Modal GPU
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-red-300 text-red-600 font-bold text-[11.5px]">
            <XCircle size={13} className="text-red-500" />
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
    <div className="w-[230px] bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">WORKSPACE</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion/studio" end icon={<Dna size={18}/>} label="RFdiffusion" />
            <SidebarLink to="/rfdiffusion/studio/examples" icon={<BookOpen size={18}/>} label="Examples" />
            <SidebarLink to="/rfdiffusion/studio/analyze" icon={<Database size={18}/>} label="Analyze" />
            <SidebarLink to="/rfdiffusion/studio/results" icon={<LayoutGrid size={18}/>} label="Results" />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">PROJECT</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion/studio/projects" icon={<Folder size={18}/>} label="Projects" />
            <SidebarLink to="/rfdiffusion/studio/history" icon={<Clock size={18}/>} label="History" />
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold text-slate-400 mb-3 px-2 tracking-wider">SYSTEM</p>
          <div className="space-y-1">
            <SidebarLink to="/rfdiffusion/studio/settings" icon={<Settings size={18}/>} label="Settings" status={isBackendConnected ? 'online' : 'offline'} />
            <SidebarLink to="/rfdiffusion/studio/help" icon={<HelpCircle size={18}/>} label="Help" />
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-slate-100 space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-slate-400">
          <Cloud size={13} /> Serverless GPU via Modal
        </div>
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
