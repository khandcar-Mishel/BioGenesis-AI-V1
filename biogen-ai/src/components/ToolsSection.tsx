import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { LiveDnaIcon, LiveFlaskIcon, LiveAtomIcon } from "./ui/LiveIcons";

const tools = [
  {
    id: "rfdiffusion",
    path: "/rfdiffusion",
    badge: "Protein Design",
    badgeColor: "text-primary bg-primary/10 border-primary/25",
    liveIcon: LiveDnaIcon,
    iconColor: "text-primary",
    iconBg: "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-[0_0_15px_rgba(15,167,127,0.15)]",
    title: "RFdiffusion",
    tagline: "De Novo Backbone Generator",
    description: "Generate stable de novo protein and peptide backbones conditioned on target binding hotspots.",
    buttonColor: "bg-primary hover:bg-primary-dark shadow-[0_4px_16px_rgba(15,167,127,0.22)]",
    visual: "rfdiffusion-visual",
    statusText: "Diffusion Engine v1.1 Active",
    features: [
      "De novo backbone generation",
      "Target-conditioned binder design",
      "Atomic-resolution PDB outputs"
    ]
  },
  {
    id: "screening",
    path: "/screening",
    badge: "Assay Suite",
    badgeColor: "text-purple bg-purple/10 border-purple/25",
    liveIcon: LiveFlaskIcon,
    iconColor: "text-purple",
    iconBg: "bg-gradient-to-br from-purple/20 to-purple/5 border border-purple/20 shadow-[0_0_15px_rgba(104,76,223,0.15)]",
    title: "Screening",
    tagline: "Bio-Assay & Safety Profiler",
    description: "Screen candidates with 10+ in-silico assays to predict toxicity, allergenicity, and developability.",
    buttonColor: "bg-purple hover:bg-[#563bbd] shadow-[0_4px_16px_rgba(104,76,223,0.22)]",
    visual: "screening-visual",
    statusText: "10 In-Silico Assays Ready",
    features: [
      "Toxicity & allergenicity prediction",
      "Stability & solubility assessment",
      "Automated developability ranking"
    ]
  },
  {
    id: "md-simulation",
    path: "/md-simulation",
    badge: "Dynamics",
    badgeColor: "text-blue bg-blue/10 border-blue/25",
    liveIcon: LiveAtomIcon,
    iconColor: "text-blue",
    iconBg: "bg-gradient-to-br from-blue/20 to-blue/5 border border-blue/20 shadow-[0_0_15px_rgba(15,124,223,0.15)]",
    title: "MD Simulation",
    tagline: "All-Atom Trajectory Analysis",
    description: "Simulate time-resolved conformational stability and binding kinetics in explicit solvent.",
    buttonColor: "bg-blue hover:bg-[#0c66b8] shadow-[0_4px_16px_rgba(15,124,223,0.22)]",
    visual: "md-visual",
    statusText: "GPU Trajectory Cluster Online",
    features: [
      "Structural stability (RMSD & RMSF)",
      "Explicit water & ionic solvation",
      "Time-resolved conformational insights"
    ]
  }
];

const PremiumLiveVisual = ({ type }: { type: string }) => {
  return (
    <div className="w-full aspect-[16/10] rounded-xl mb-4.5 relative overflow-hidden flex flex-col justify-between p-3.5 bg-gradient-to-b from-[#071322] to-[#0A1A2F] border border-white/10 shadow-inner group-hover:border-white/20 transition-all">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />

      {/* 1. RFDIFFUSION VISUAL */}
      {type === "rfdiffusion-visual" && (
        <>
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan/20 rounded-full blur-[40px] pointer-events-none" />

          {/* Top Status HUD */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30 text-[10.5px] font-mono text-primary-light">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Diffusion t=50/50
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-wider">
              pLDDT: 94.2
            </span>
          </div>

          {/* Center 3D Molecular / Diffusion Network Visual */}
          <div className="relative z-10 flex items-center justify-center my-auto">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="relative w-24 h-24 flex items-center justify-center"
            >
              {/* Outer orbit ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-spin" style={{ animationDuration: '18s' }} />
              
              {/* Central glowing backbone ribbon */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_12px_rgba(15,167,127,0.6)]">
                <defs>
                  <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4DD0D1" />
                    <stop offset="50%" stopColor="#0FA77F" />
                    <stop offset="100%" stopColor="#0F7CDF" />
                  </linearGradient>
                </defs>
                {/* Simulated double-helix / diffusion loop */}
                <path 
                  d="M20,50 Q35,20 50,50 T80,50" 
                  fill="none" 
                  stroke="url(#helixGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M20,50 Q35,80 50,50 T80,50" 
                  fill="none" 
                  stroke="url(#helixGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  opacity="0.7" 
                />
                {/* Secondary structure residue spheres */}
                <circle cx="20" cy="50" r="4.5" fill="#4DD0D1" />
                <circle cx="35" cy="30" r="4" fill="#0FA77F" />
                <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
                <circle cx="65" cy="70" r="4" fill="#0FA77F" />
                <circle cx="80" cy="50" r="4.5" fill="#0F7CDF" />
                <circle cx="35" cy="70" r="3.5" fill="#0F7CDF" />
                <circle cx="65" cy="30" r="3.5" fill="#4DD0D1" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="relative z-10 flex items-center justify-between w-full pt-1.5 border-t border-white/10 text-[10px] font-mono text-white/60">
            <span className="flex items-center gap-1 text-primary-light">
              <Sparkles size={11} /> Generative Backbone
            </span>
            <span>Target: 4OIG Binder</span>
          </div>
        </>
      )}

      {/* 2. SCREENING VISUAL */}
      {type === "screening-visual" && (
        <>
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan/15 rounded-full blur-[40px] pointer-events-none" />

          {/* Top Status HUD */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple/20 border border-purple/30 text-[10.5px] font-mono text-purple-light">
              <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
              Bio-Assay Scanner
            </span>
            <span className="text-[10px] font-mono text-green-400 font-semibold flex items-center gap-1">
              <ShieldCheck size={12} /> 10/10 Passed
            </span>
          </div>

          {/* Center Multi-metric Bioactivity Visual */}
          <div className="relative z-10 flex flex-col gap-1.5 my-auto px-1.5">
            {[
              { label: "Non-Toxicity Score", val: 99.4, color: "bg-emerald-400" },
              { label: "Developability / Solubility", val: 92.1, color: "bg-purple-400" },
              { label: "Structural Half-Life", val: 88.5, color: "bg-cyan-400" },
            ].map((metric, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10.5px] font-mono">
                  <span className="text-white/80">{metric.label}</span>
                  <span className="text-white font-bold">{metric.val}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.val}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full ${metric.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="relative z-10 flex items-center justify-between w-full pt-1.5 border-t border-white/10 text-[10px] font-mono text-white/60">
            <span className="text-purple-light font-semibold">ToxinPred3 • AllerCatPro</span>
            <span className="text-emerald-400">High Candidate Rank</span>
          </div>
        </>
      )}

      {/* 3. MD SIMULATION VISUAL */}
      {type === "md-visual" && (
        <>
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-[40px] pointer-events-none" />

          {/* Top Status HUD */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue/20 border border-blue/30 text-[10.5px] font-mono text-blue-light">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              NVidia A10G • Solvated
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold">
              300 K • 1.0 atm
            </span>
          </div>

          {/* Center Trajectory Wave Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* Live oscillating RMSD Curve */}
            <svg viewBox="0 0 200 60" className="w-full h-12 drop-shadow-[0_0_8px_rgba(15,124,223,0.5)]">
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4DD0D1" />
                  <stop offset="50%" stopColor="#0F7CDF" />
                  <stop offset="100%" stopColor="#10A875" />
                </linearGradient>
              </defs>
              <path 
                d="M 5,45 Q 30,15 55,35 T 105,30 T 155,22 T 195,20" 
                fill="none" 
                stroke="url(#waveGrad)" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              <path 
                d="M 5,45 Q 30,15 55,35 T 105,30 T 155,22 T 195,20 L 195,60 L 5,60 Z" 
                fill="url(#waveGrad)" 
                opacity="0.12" 
              />
              {/* Dynamic Atoms floating */}
              <circle cx="55" cy="35" r="3.5" fill="#4DD0D1" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="105" cy="30" r="3.5" fill="#0F7CDF" />
              <circle cx="155" cy="22" r="3.5" fill="#10A875" />
              <circle cx="195" cy="20" r="4" fill="#FFFFFF" />
            </svg>
            <div className="text-[9.5px] font-mono text-white/50 -mt-1">
              RMSD Equilibrium &lt; 1.2 Å • Conformation Stable
            </div>
          </div>

          {/* Bottom Telemetry HUD */}
          <div className="relative z-10 flex items-center justify-between w-full pt-1.5 border-t border-white/10 text-[10px] font-mono text-white/60">
            <span className="text-blue-light font-semibold">Explicit H₂O + Na⁺/Cl⁻</span>
            <span>t = 100 ns Simulation</span>
          </div>
        </>
      )}
    </div>
  );
};

export default function ToolsSection() {
  return (
    <section id="tools" className="py-12 md:py-18 scroll-mt-20">
      {/* Sleek Compact Section Header */}
      <div className="text-center mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-3"
        >
          <Sparkles size={12} />
          Integrated Computational Suite
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-navy mb-2.5 tracking-tight"
        >
          Explore <span className="text-primary">Our Research Tools</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto"
        >
          A unified pipeline to design, screen, and simulate therapeutic proteins with cloud-accelerated intelligence.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.45 }}
            className="group bg-white rounded-2xl border border-border-main p-5 sm:p-6 card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(7,26,51,0.1)] hover:border-primary/30 flex flex-col h-full relative"
          >
            {/* Redesigned Compact Header: Scientific Live Icon + Clean Tool Name Lockup */}
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className={`w-11 h-11 p-2 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${tool.iconBg}`}>
                <tool.liveIcon size={22} className={tool.iconColor} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-navy group-hover:text-primary transition-colors tracking-tight truncate">
                    {tool.title}
                  </h3>
                  <span className={`text-[9.5px] font-extrabold tracking-wider px-2 py-0.5 rounded-full uppercase border shrink-0 ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <p className="text-[12px] font-medium text-text-soft truncate mt-0.5">
                  {tool.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1">
              {tool.description}
            </p>
            
            {/* Live Visual Canvas */}
            <PremiumLiveVisual type={tool.visual} />

            {/* Feature Checklist */}
            <div className="flex flex-col gap-2 mb-5 bg-bg-soft/60 p-3 rounded-xl border border-border-light/70">
              {tool.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className={`shrink-0 ${tool.iconColor}`} />
                  <span className="text-[12.5px] font-medium text-navy/85 leading-tight">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <Link 
              to={tool.path}
              className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all hover:brightness-110 active:scale-[0.98] mt-auto text-[14px] ${tool.buttonColor}`}
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
