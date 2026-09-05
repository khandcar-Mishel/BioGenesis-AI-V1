import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Dna, Microscope, Waves, Cpu, Database, Users, Zap,
  Clock, Coins, Cloud, LayoutGrid, Rocket, Upload, Settings, BarChart3, Trophy,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { BenefitStrip, IconGrid, HowItWorks, CTABanner, fadeUpVariant } from '../components/MarketingKit';

const TOOLS = [
  {
    icon: Dna,
    tint: 'bg-emerald-50 text-emerald-600',
    tag: 'PROTEIN DESIGN',
    tagTint: 'bg-emerald-50 text-emerald-700',
    title: 'RFdiffusion',
    desc: 'Generate novel protein and peptide structures using state-of-the-art diffusion models.',
    bullets: ['De novo design', 'Target-conditioned design', 'High-quality structures'],
    to: '/rfdiffusion',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    icon: Microscope,
    tint: 'bg-violet-50 text-violet-600',
    tag: 'PEPTIDE SCREENING',
    tagTint: 'bg-violet-50 text-violet-700',
    title: 'Screening',
    desc: 'Evaluate designed peptides with multiple bioinformatics tools to identify the most promising candidates.',
    bullets: ['Toxicity & allergenicity prediction', 'Stability & solubility assessment', 'Drug-like property analysis'],
    to: '/screening',
    buttonClass: 'bg-violet-600 hover:bg-violet-700',
  },
  {
    icon: Waves,
    tint: 'bg-sky-50 text-sky-600',
    tag: 'DYNAMICS & ANALYSIS',
    tagTint: 'bg-sky-50 text-sky-700',
    title: 'MD Simulation',
    desc: 'Explore the dynamic behavior and stability of your designed proteins through atomic-level simulations.',
    bullets: ['Structural stability analysis', 'Interaction with targets/ligands', 'Trajectory and conformational insights'],
    to: '/md-simulation',
    buttonClass: 'bg-sky-600 hover:bg-sky-700',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative hero-wash pt-16 pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 mb-6">
              <Zap size={12} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase">AI for Protein Innovation</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black tracking-tight leading-[1.08] mb-5">
              From Ideas to<br /><span className="text-emerald-600">Functional Proteins.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-[15.5px] leading-relaxed max-w-lg mb-8">
              BioGen AI combines state-of-the-art generative AI, biomolecular simulation, and analysis tools to
              help researchers design, evaluate, and understand proteins and peptides — faster, easier, and more accessible.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3">
              <Link to="/rfdiffusion" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                Get Started <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="#tools" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">
                See how it works
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <HeroVisual
              pdbId="1EMA"
              colorscheme="greenCarbon"
              handNote={'Design\nSimulate\nDiscover'}
              statCard={{ title: 'Designed Protein', rows: [
                { label: 'Length', value: '124 aa' },
                { label: 'Confidence', value: '0.93' },
                { label: 'Target', value: 'Custom' },
                { label: 'Method', value: 'RFdiffusion' },
              ]}}
              checklist={['Novel structures', 'Target-specific design', 'Simulation-ready', 'Research accelerated']}
            />
          </motion.div>
        </div>
      </section>

      <BenefitStrip items={[
        { icon: Rocket, label: 'Generative AI Design' },
        { icon: Database, label: 'Integrated Analysis Tools' },
        { icon: Users, label: 'Accessible for Researchers' },
        { icon: Zap, label: 'Faster Path to Discovery' },
      ]} />

      {/* ---------------------------------------------------------------- Tools */}
      <section id="tools" className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Explore Our <span className="text-emerald-600">Tools</span></h2>
          <p className="text-slate-500 text-[15px]">A complete pipeline to design, evaluate, and analyze proteins — all in one place.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TOOLS.map((t, i) => (
            <motion.div key={t.title} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUpVariant}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.tint}`}>
                    <t.icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className={`text-[10px] font-bold tracking-wide px-2 py-1 rounded-full ${t.tagTint}`}>{t.tag}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4 min-h-[3.5rem]">{t.desc}</p>
              </div>
              <div className={`mx-6 rounded-xl ${t.tint} h-32 flex items-center justify-center mb-5`}>
                <t.icon size={44} strokeWidth={1} className="opacity-40" />
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-1.5 mb-5">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[12.5px] text-slate-600 font-medium">
                      <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <Link to={t.to} className={`inline-flex items-center justify-center gap-1.5 w-full rounded-lg px-4 py-2.5 text-[13px] font-bold text-white transition-colors ${t.buttonClass}`}>
                  Get Started <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- Why */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Why Choose <span className="text-emerald-600">BioGen AI</span>?</h2>
          <p className="text-slate-500 text-[15px]">Designed for researchers. Built to remove barriers. Focused on real impact.</p>
        </motion.div>
        <IconGrid columns={5} items={[
          { icon: Clock, title: 'Save Time', desc: 'Go from idea to candidate in hours, not weeks.' },
          { icon: Coins, title: 'Cost-Effective', desc: 'Access powerful tools without expensive hardware or software.' },
          { icon: Cloud, title: 'No GPU Limitation', desc: 'Run complex computations on our cloud infrastructure — no local GPU needed.' },
          { icon: LayoutGrid, title: 'All-in-One Platform', desc: 'Design, screen, and simulate in a single, easy-to-use platform.' },
          { icon: Trophy, title: 'Accelerate Research', desc: 'Focus on science, not infrastructure. Turn ideas into real-world solutions.' },
        ]} />
      </section>

      {/* ---------------------------------------------------------------- How */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How It Works</h2>
          <p className="text-slate-500 text-[15px]">A simple workflow from design to discovery.</p>
        </motion.div>
        <HowItWorks steps={[
          { icon: Upload, title: 'Input', desc: 'Provide your sequence, structure, or design goal.' },
          { icon: Settings, title: 'Run Tool', desc: 'Design, screen, or simulate using our integrated tools.' },
          { icon: BarChart3, title: 'Analyze', desc: 'Visualize and interpret results.' },
          { icon: Cpu, title: 'Discover', desc: 'Identify promising candidates for further validation.' },
        ]} />
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <CTABanner
          tone="light"
          eyebrow="Ready to start?"
          title="Turn Your Ideas Into Real Proteins"
          description="Join BioGen AI and be part of a growing community advancing computational biology for a healthier tomorrow."
          buttonLabel="Get Started Now"
          buttonTo="/rfdiffusion"
        />
      </section>

      <SiteFooter />
    </div>
  );
}
