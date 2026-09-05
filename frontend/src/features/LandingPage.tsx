import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, Microscope, Waves, LayoutGrid, Users,
  Layers, Cpu, ShieldCheck, ExternalLink, Dna,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { DiffusionBackbone } from '../components/DiffusionBackbone';
import { LiveMoleculePreview } from '../components/LiveMoleculePreview';
import { TechnicalNoise } from '../components/TechnicalNoise';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const PIPELINE = [
  {
    tag: '01 · LIVE',
    icon: Dna,
    title: 'RFdiffusion',
    desc: 'De novo backbone generation via generative diffusion — binders, motif scaffolds, symmetric oligomers.',
    to: '/rfdiffusion',
    status: 'live' as const,
  },
  {
    tag: '02',
    icon: Microscope,
    title: 'Screening',
    desc: 'Batch scoring of generated designs against binding affinity, stability and developability filters.',
    to: '/screening',
    status: 'soon' as const,
  },
  {
    tag: '03',
    icon: Waves,
    title: 'MD Simulation',
    desc: 'GPU-accelerated molecular dynamics to confirm a fold holds up over time, not just in one prediction.',
    to: '/md-simulation',
    status: 'soon' as const,
  },
  {
    tag: '04',
    icon: LayoutGrid,
    title: 'Results',
    desc: 'One searchable library of every design, sequence and structure produced across every pipeline.',
    to: '/results',
    status: 'soon' as const,
  },
];

const STAGES = [
  { icon: Layers, label: 'Stage 1', name: 'RFdiffusion', desc: 'Denoise coordinates into a backbone' },
  { icon: Cpu, label: 'Stage 2', name: 'ProteinMPNN', desc: 'Inverse-fold a sequence onto it' },
  { icon: ShieldCheck, label: 'Stage 3', name: 'AlphaFold2', desc: 'Re-predict and score the fold' },
];

const STATS = [
  { value: '3', label: 'stages · one job' },
  { value: 'T4', label: 'GPU, on demand' },
  { value: '32', label: 'designs per run, max' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen lab-bg text-white overflow-x-clip">
      <Navbar />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative pt-40 pb-28 sm:pt-48 sm:pb-36 border-b border-white/[0.06]">
        <div className="absolute inset-0 lab-grid pointer-events-none" />
        <TechnicalNoise />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-white/10 px-3 py-1 mb-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-bio-500 glow-pulse" />
              <span className="font-lab text-[10.5px] tracking-[0.15em] text-slate-400 uppercase">
                RFdiffusion → ProteinMPNN → AlphaFold2
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[2.75rem] sm:text-6xl font-black tracking-tight leading-[1.04] mb-6"
            >
              A backbone starts
              <br />
              as noise. <span className="text-bio-500">Watch it fold.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 text-[15.5px] leading-relaxed max-w-lg mb-9"
            >
              BioGen AI runs the RFdiffusion pipeline behind a real GPU: set a
              contig, a hotspot, a symmetry — and get a de novo protein
              backbone denoised from pure noise in front of you, end to end,
              from one browser tab.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/rfdiffusion"
                className="group inline-flex items-center gap-2 bg-bio-500 px-5 py-2.5 text-sm font-bold text-lab-950 transition-colors hover:bg-bio-400"
              >
                Launch RFdiffusion Studio
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#pipeline"
                className="inline-flex items-center gap-1.5 border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Explore the pipeline
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md border-t border-white/10 pt-6"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-lab text-2xl sm:text-3xl font-bold text-bio-500">{s.value}</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center pb-8"
          >
            <DiffusionBackbone className="relative w-full max-w-[380px] aspect-square" />
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Pipeline */}
      <section id="pipeline" className="relative py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-14"
          >
            <p className="font-lab text-[11px] tracking-[0.2em] text-slate-500 uppercase mb-3">// the studio</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">One workspace, four pipelines</h2>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              RFdiffusion is live today, running on a real GPU. Screening, MD
              Simulation and a unified Results library are next.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
            {PIPELINE.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-lab-950"
              >
                <Link to={p.to} className="group relative flex flex-col h-full p-6 transition-colors hover:bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-6">
                    <p.icon size={18} className="text-slate-500 group-hover:text-bio-500 transition-colors" strokeWidth={1.5} />
                    {p.status === 'live' ? (
                      <span className="font-lab text-[10px] text-bio-500">{p.tag}</span>
                    ) : (
                      <span className="font-lab text-[10px] text-slate-600">{p.tag}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-[15px] mb-2 text-white">{p.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-5">{p.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-medium text-slate-600 group-hover:text-bio-400 transition-colors">
                    {p.status === 'live' ? 'Open studio' : 'View roadmap'}
                    <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Live preview */}
      <section className="relative py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <p className="font-lab text-[11px] tracking-[0.2em] text-slate-500 uppercase mb-3">// real structures, live</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">
              The same viewer your results open in
            </h2>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8 max-w-md">
              Every backbone RFdiffusion generates opens directly in this
              molecular viewer — rotate, zoom and inspect a structure the
              moment a job finishes, no external tools required.
            </p>
            <div className="space-y-0 border-t border-white/10">
              {STAGES.map((s) => (
                <div key={s.name} className="flex items-center gap-4 py-3.5 border-b border-white/10">
                  <s.icon size={16} className="text-bio-500 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      {s.name} <span className="text-slate-600 font-normal font-lab">· {s.label}</span>
                    </p>
                    <p className="text-[12px] text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative border border-white/10 p-1.5"
          >
            <LiveMoleculePreview className="h-80 sm:h-96 w-full" />
            <p className="absolute bottom-3.5 left-4 font-lab text-[10px] text-slate-500 tracking-wide">
              PDB 1EMA · GFP · cartoon / spectrum
            </p>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="relative py-24 border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="relative border border-white/10 px-8 py-16"
          >
            <div className="absolute inset-0 lab-grid opacity-40 pointer-events-none" />
            <p className="relative font-lab text-[11px] tracking-[0.2em] text-slate-500 uppercase mb-5">contigs=&quot;A:60&quot; hotspot=&quot;A239,A256&quot;</p>
            <h2 className="relative text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Your first design is a contig away.
            </h2>
            <p className="relative text-slate-400 text-[15px] mb-8 max-w-md mx-auto">
              Pick a preset, set a target, and let RFdiffusion generate a
              backbone in minutes on a real GPU.
            </p>
            <Link
              to="/rfdiffusion"
              className="relative inline-flex items-center gap-2 bg-bio-500 px-6 py-3 text-sm font-bold text-lab-950 transition-colors hover:bg-bio-400"
            >
              Launch RFdiffusion Studio <ArrowUpRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Footer */}
      <footer className="relative py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-lab text-[12px]">
            <span className="text-bio-500">biogen.ai</span>
            <span className="text-slate-600">— protein design studio</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-slate-500">
            <Link to="/about" className="hover:text-slate-300 transition-colors flex items-center gap-1.5">
              <Users size={13} /> About Us
            </Link>
            <a
              href="https://github.com/sokrypton/RFdiffusion"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={13} /> RFdiffusion
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
