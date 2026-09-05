import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Lightbulb, Target, SlidersHorizontal, Rocket, Cpu, ShieldCheck,
  Dna, Puzzle, Waves as WavesIcon, Shapes, ExternalLink, Quote,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { BenefitStrip, IconGrid, CTABanner, fadeUpVariant } from '../components/MarketingKit';

const DESIGN_TYPES = [
  { icon: Target, title: 'Binder Design', desc: 'Design binding partners against a target structure.' },
  { icon: Dna, title: 'De Novo Design', desc: 'Generate novel protein backbones from scratch.' },
  { icon: Puzzle, title: 'Motif Scaffolding', desc: 'Build around a functional structural motif.' },
  { icon: WavesIcon, title: 'Partial Diffusion', desc: 'Redesign selected regions of an input structure.' },
  { icon: Shapes, title: 'Symmetric Design', desc: 'Generate symmetric oligomers and complexes.' },
];

export function RFdiffusionLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative hero-wash pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 mb-6">
              <Dna size={12} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase">RFdiffusion Studio</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-5">
              Design Novel<br /><span className="text-emerald-600">Protein Structures</span><br />with RFdiffusion
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-[15.5px] leading-relaxed max-w-lg mb-8">
              Transform a biological target into AI-designed protein backbones using state-of-the-art
              generative models. Explore new structural possibilities for research.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3">
              <Link to="/rfdiffusion/studio" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                Open RFdiffusion Workspace <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="#designs" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">
                View Examples
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <HeroVisual
              pdbId="4N5T"
              colorscheme="greenCarbon"
              handNote={'New\nStructures\nNew Possibilities'}
              statCard={{ title: 'From target to backbone', rows: [
                { label: 'Model', value: 'RFdiffusion' },
                { label: 'Params', value: 'v1.1.1' },
                { label: 'Compute', value: 'Modal GPU' },
              ]}}
            />
          </motion.div>
        </div>
      </section>

      <BenefitStrip items={[
        { icon: Target, label: 'Target-aware design' },
        { icon: SlidersHorizontal, label: 'Flexible design strategies' },
        { icon: Cpu, label: 'GPU-powered execution' },
        { icon: ShieldCheck, label: 'Research-ready results' },
      ]} />

      {/* Why */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Why RFdiffusion?</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            RFdiffusion is a powerful generative model for protein structure design, developed by
            Dr. David Baker and colleagues at the University of Washington.
          </p>
        </motion.div>
        <IconGrid columns={4} items={[
          { icon: Lightbulb, title: 'Explore New Structures', desc: 'Generate diverse, high-quality protein backbones beyond natural examples.' },
          { icon: Target, title: 'Target-Conditioned Design', desc: 'Design binders, scaffolds, symmetric complexes, and more using structural guidance.' },
          { icon: SlidersHorizontal, title: 'Flexible and Versatile', desc: 'Support for multiple design modes: de novo, binder design, motif scaffolding, partial diffusion, and symmetric design.' },
          { icon: Rocket, title: 'Research Acceleration', desc: 'Enables rapid exploration of protein design space to advance research.' },
        ]} />
      </section>

      {/* How it works — the actual diffusion process */}
      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How RFdiffusion Works</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed mb-4">
            RFdiffusion uses a denoising diffusion process with a geometric deep learning model to
            generate protein structures from random noise, optionally conditioned on a target
            structure, motif, or other constraints.
          </p>
          <a href="/rfdiffusion/studio" className="inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700 hover:text-emerald-800">
            Learn more <ArrowRight size={13} />
          </a>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { n: 42, spread: 60, label: 'Random noise', sub: '(initial state)' },
            { n: 42, spread: 26, label: 'Iterative denoising', sub: '(diffusion process)' },
            { n: 42, spread: 6, label: 'Designed backbone', sub: '(final structure)' },
          ].map((f, i) => (
            <motion.div key={f.label} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUpVariant}
              transition={{ duration: 0.45, delay: i * 0.1 }} className="flex flex-col items-center text-center">
              <NoiseToStructure spread={f.spread} className="mb-4" />
              <p className="font-bold text-[13.5px] text-slate-800">{f.label}</p>
              <p className="text-[12px] text-slate-500">{f.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What can you design */}
      <section id="designs" className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">What Can You Design?</h2>
          <p className="text-slate-500 text-[15px]">RFdiffusion supports a wide range of protein design applications.</p>
        </motion.div>
        <IconGrid columns={5} items={DESIGN_TYPES} />
      </section>

      {/* Attribution */}
      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="rounded-2xl bg-emerald-50 border border-emerald-100 p-8 sm:p-10 grid sm:grid-cols-[auto_1fr_auto] gap-8 items-center">
          <div className="flex sm:flex-col items-center gap-4 sm:gap-2 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white border border-emerald-200 text-emerald-600 font-black text-xl">DB</span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide mb-1">Developed by David Baker</p>
            <h3 className="font-black text-lg text-slate-900 mb-1">David Baker, Ph.D.</h3>
            <p className="text-[13px] text-slate-500 mb-3">University of Washington · Institute for Protein Design</p>
            <a href="https://www.biorxiv.org/content/10.1101/2022.12.09.519842v2" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700 hover:text-emerald-800">
              Read the original paper <ExternalLink size={13} />
            </a>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 max-w-xs">
            <Quote size={16} className="text-emerald-300 mb-2" />
            <p className="text-[12.5px] text-slate-600 italic leading-relaxed">
              &ldquo;The goal is not just to predict protein structures, but to create new proteins with desired functions.&rdquo;
            </p>
            <p className="text-[11px] text-slate-400 mt-2">— Watson et al. (2022), RFdiffusion preprint</p>
          </div>
        </motion.div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <CTABanner
          tone="dark"
          eyebrow="Ready to design?"
          title="Open the RFdiffusion Workspace"
          description="Load your target structure, set design parameters, and generate novel protein backbones with RFdiffusion."
          buttonLabel="Launch RFdiffusion Workspace"
          buttonTo="/rfdiffusion/studio"
          features={['No installation required', 'Cloud GPU powered', 'Research and education use']}
        />
      </section>

      <SiteFooter />
    </div>
  );
}

/** Tiny inline "noise -> structure" illustration reused for the 3-panel explainer above. */
function NoiseToStructure({ spread, className = '' }: { spread: number; className?: string }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const noiseR = 30 + (i % 5) * 4;
    const structR = 22;
    const t = spread / 60;
    const r = structR + (noiseR - structR) * t;
    const jitter = t * 10 * Math.sin(i * 2.1);
    return {
      x: 40 + r * Math.cos(angle) + jitter,
      y: 40 + r * Math.sin(angle) * 0.6 + jitter,
    };
  });
  return (
    <div className={`h-24 w-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center ${className}`}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={spread > 30 ? 1.6 : 2.4} fill={spread > 30 ? '#94a3b8' : '#059669'} opacity={spread > 30 ? 0.6 : 0.9} />
        ))}
      </svg>
    </div>
  );
}
