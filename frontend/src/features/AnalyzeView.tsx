export function AnalyzeView() {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-xl shadow-sm h-full">
      <h1 className="text-xl font-bold text-slate-800 mb-4">DOWNSTREAM MOLECULAR ANALYSIS PIPELINE</h1>
      <p className="text-slate-600 mb-8 text-sm">After generating de novo backbone scaffolds, the pipeline feeds into sequence design, folding validation, and interface evaluation.</p>
      
      <div className="space-y-4">
        <StageCard title="Stage 1: RFdiffusion" desc="Generates de novo all-atom backbone scaffolds using generative diffusion." status="Active ✓" active={true} />
        <StageCard title="Stage 2: ProteinMPNN" desc="Inverse protein folding: designs plausible amino acid sequences." status="Ready in v1.2" />
        <StageCard title="Stage 3: AlphaFold2 / ESMFold" desc="Predicts folded structures from generated sequences." status="Ready in v1.2" />
      </div>
    </div>
  );
}

function StageCard({ title, desc, status, active=false }: {title:string, desc:string, status:string, active?:boolean}) {
  return (
    <div className="border border-slate-200 bg-slate-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-sm text-slate-800">{title}</h3>
        <span className={`text-xs font-bold ${active ? 'text-emerald-600' : 'text-slate-500'}`}>{status}</span>
      </div>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}
