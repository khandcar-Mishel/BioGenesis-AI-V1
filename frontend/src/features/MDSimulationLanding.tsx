import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Waves, ShieldCheck, Activity, Link2, FileSearch, Upload,
  Settings, Play, BarChart3, Download, Boxes,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { BenefitStrip, IconGrid, HowItWorks, CTABanner, fadeUpVariant } from '../components/MarketingKit';
import { Sparkline, StructureRibbon } from '../components/Sparkline';

const ANALYSES = [
  { title: 'RMSD', axis: 'RMSD (Å) vs Time (ns)', desc: 'Monitor structural deviation over time.', chart: <Sparkline seed={3} color="#059669" /> },
  { title: 'RMSF', axis: 'RMSF (Å) vs Residue Index', desc: 'Identify flexible and rigid regions.', chart: <Sparkline seed={11} color="#0284c7" /> },
  { title: 'Radius of Gyration (Rg)', axis: 'Rg (Å) vs Time (ns)', desc: 'Evaluate compactness and stability.', chart: <Sparkline seed={19} color="#7c3aed" /> },
  { title: 'Secondary Structure', axis: 'Turn / Sheet / Helix / Coil vs Time', desc: 'Track structural elements during simulation.', chart: <StructureRibbon seed={5} /> },
];

export function MDSimulationLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative hero-wash pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-3.5 py-1.5 mb-6">
              <Waves size={12} className="text-sky-600" />
              <span className="text-[11px] font-bold text-sky-700 tracking-wide uppercase">Molecular Dynamics Studio</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-5">
              Bring Designed Proteins<br />to Life with <span className="text-sky-600">Molecular Dynamics</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-[15.5px] leading-relaxed max-w-lg mb-8">
              Simulate the real-world behavior of your designed proteins and peptides at atomic
              resolution. Gain insights into stability, flexibility, and interactions in a
              dynamic, solvated environment.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3">
              <Link to="/md-simulation/workspace" className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-700">
                Open MD Simulation Workspace <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="#analyses" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">
                Learn More
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <HeroVisual pdbId="6MRR" colorscheme="blueCarbon" handNote={'Observe\nMolecular Motion\nin Real Time'} />
          </motion.div>
        </div>
      </section>

      <BenefitStrip items={[
        { icon: Boxes, label: 'Atomic-level accuracy' },
        { icon: Activity, label: 'Realistic dynamic environment' },
        { icon: BarChart3, label: 'Comprehensive analysis' },
        { icon: ShieldCheck, label: 'Support experimental design' },
      ]} />

      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Why Molecular Dynamics Simulation?</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            Static structures show only a snapshot. Molecular dynamics (MD) simulation reveals how
            designed proteins and peptides move, interact, and respond to their environment over
            time, helping to assess their stability, flexibility, and real-world behavior.
          </p>
        </motion.div>
        <IconGrid columns={4} items={[
          { icon: ShieldCheck, title: 'Validate Structural Stability', desc: 'Assess whether the designed protein maintains its structure under realistic conditions.' },
          { icon: Waves, title: 'Understand Flexibility', desc: 'Explore conformational changes and identify flexible regions.' },
          { icon: Link2, title: 'Analyze Interactions', desc: 'Study interactions with targets, ligands, or the environment (e.g., water, ions, membranes).' },
          { icon: FileSearch, title: 'Guide Experimental Design', desc: 'Provide insights to support further optimization and laboratory validation.' },
        ]} />
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How It Works</h2>
          <p className="text-slate-500 text-[15px]">Run molecular dynamics simulations on your designed structures with a simple, streamlined workflow.</p>
        </motion.div>
        <HowItWorks steps={[
          { icon: Upload, title: 'Input Structure', desc: 'Upload a PDB file from RFdiffusion or other sources.' },
          { icon: Settings, title: 'Set Parameters', desc: 'Define simulation conditions (e.g., force field, time, solvent).' },
          { icon: Play, title: 'Run Simulation', desc: 'Perform MD simulation on GPU infrastructure.' },
          { icon: BarChart3, title: 'Analyze Results', desc: 'Visualize and analyze key metrics and structural changes.' },
          { icon: Download, title: 'Download & Report', desc: 'Get trajectories, analysis plots, and summary reports.' },
        ]} />
      </section>

      <section id="analyses" className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Key Analyses and Outputs</h2>
          <p className="text-slate-500 text-[15px]">Comprehensive analysis tools to evaluate the behavior and stability of your designed proteins.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ANALYSES.map((a, i) => (
            <motion.div key={a.title} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUpVariant}
              transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-xl border border-slate-200 p-5 bg-white">
              <h3 className="font-bold text-[13.5px] mb-1">{a.title}</h3>
              <p className="text-[10.5px] text-slate-400 mb-3">{a.axis}</p>
              <div className="mb-3">{a.chart}</div>
              <p className="text-[12px] text-slate-500 leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Applications</h2>
          <p className="text-slate-500 text-[15px]">MD simulation can be applied to a wide range of research questions in protein and peptide design.</p>
        </motion.div>
        <IconGrid columns={4} items={[
          { icon: ShieldCheck, title: 'Stability Assessment', desc: 'Evaluate structural stability of designed proteins and peptides.' },
          { icon: Link2, title: 'Binding Analysis', desc: 'Study interactions with targets, ligands, or membranes.' },
          { icon: Boxes, title: 'Conformational Dynamics', desc: 'Explore functional motions and structural transitions.' },
          { icon: FileSearch, title: 'Pre-experimental Validation', desc: 'Provide computational evidence to support laboratory studies.' },
        ]} />
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <CTABanner
          tone="dark"
          eyebrow="Ready to simulate?"
          title="Explore the Dynamic Behavior of Your Designs"
          description="Run molecular dynamics simulations and gain deeper insights into stability, flexibility and function."
          buttonLabel="Open MD Simulation Workspace"
          buttonTo="/md-simulation/workspace"
          features={['GPU-powered computation', 'Advanced analysis tools', 'Research focused']}
        />
      </section>

      <SiteFooter />
    </div>
  );
}
