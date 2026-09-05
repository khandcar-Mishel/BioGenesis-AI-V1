import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, BarChart3, Target, Filter, Search, ExternalLink,
  FileText, Settings, Eye, GitCompare, CheckSquare, Microscope,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { BenefitStrip, IconGrid, HowItWorks, CTABanner, fadeUpVariant } from '../components/MarketingKit';

const TOOLS = [
  { property: 'Toxicity prediction', name: 'ToxinPred3', url: 'https://webs.iiitd.edu.in/raghava/toxinpred3/', desc: 'Predicts toxic peptides using machine learning.' },
  { property: 'Allergenicity prediction', name: 'AllerCatPro', url: 'https://allercatpro.bii.a-star.edu.sg/', desc: 'Predicts potential allergenic peptides.' },
  { property: 'Digestion prediction', name: 'RPG (PeptideCutter)', url: 'https://gitlab.pasteur.fr/nmaillet/rpg', desc: 'Predicts proteolytic cleavage and digestion stability.' },
  { property: 'Antioxidant prediction', name: 'NEPC2', url: 'https://nepc2pvmzy.us-east-1.awsapprunner.com', desc: 'Predicts antioxidant activity of peptides.' },
  { property: 'Stability prediction', name: 'PLIFEPred', url: 'https://webs.iiitd.edu.in/raghava/plifepred', desc: 'Predicts peptide stability and half-life.' },
  { property: 'Aggregation propensity', name: 'DL_for_Peptide', url: 'https://github.com/Zihan-Liu-00/DL_for_Peptide', desc: 'Predicts aggregation-prone regions.' },
  { property: 'Solubility prediction', name: 'Innovagen Tools', url: 'http://www.innovagen.com/proteomics-tools', desc: 'Predicts peptide solubility.' },
  { property: 'Physico-chemical properties', name: 'ProtParam', url: 'https://web.expasy.org/protparam/', desc: 'Computes molecular weight, pI, charge, etc.' },
  { property: 'Cell-penetrating peptide', name: 'TripIEP-CPP', url: 'https://github.com/marurser/TripIEP-CPP', desc: 'Predicts cell-penetrating peptides (CPPs).' },
  { property: 'Comprehensive BAP database', name: 'BIOPEP-UWM', url: 'https://biochemia.uwm.edu.pl/en/biopep-uwm-2/', desc: 'Database of bioactive peptides and functions.' },
];

export function ScreeningLanding() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter((t) => `${t.property} ${t.name} ${t.desc}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative hero-wash pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-100 px-3.5 py-1.5 mb-6">
              <Microscope size={12} className="text-violet-600" />
              <span className="text-[11px] font-bold text-violet-700 tracking-wide uppercase">Peptide Screening Studio</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-5">
              From Designed Peptides<br />to <span className="text-violet-600">Promising Candidates</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-[15.5px] leading-relaxed max-w-lg mb-8">
              Evaluate AI-designed peptides with a comprehensive set of bioinformatics tools to assess
              safety, stability, bioactivity and drug-like properties — helping you prioritize the
              most promising candidates for further validation.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3">
              <Link to="/screening/workspace" className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700">
                Open Screening Workspace <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <a href="#tools" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50">
                Learn More
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <HeroVisual pdbId="1CRN" colorscheme="purpleCarbon" handNote={'Better\nPeptides for a\nHealthier Tomorrow.'} />
          </motion.div>
        </div>
      </section>

      <BenefitStrip items={[
        { icon: Settings, label: 'Multi-parameter evaluation' },
        { icon: ShieldCheck, label: 'Trusted bioinformatics tools' },
        { icon: Target, label: 'Prioritize the best candidates' },
      ]} />

      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Why Peptide Screening?</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            AI-generated peptides often have excellent structural and binding properties, but not all
            are suitable for experimental or therapeutic use. Computational screening helps identify
            candidates with favorable safety, stability and functional properties, saving time and resources.
          </p>
        </motion.div>
        <IconGrid columns={4} items={[
          { icon: ShieldCheck, title: 'Ensure Safety', desc: 'Predict potential toxicity, allergenicity and off-target risks.' },
          { icon: BarChart3, title: 'Assess Developability', desc: 'Evaluate stability, solubility and aggregation propensity.' },
          { icon: Target, title: 'Predict Bioactivity', desc: 'Identify functional properties such as cell-penetration or antioxidant activity.' },
          { icon: Filter, title: 'Prioritize Candidates', desc: 'Select the most promising peptides for further validation and experimental testing.' },
        ]} />
      </section>

      {/* Tools table */}
      <section id="tools" className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Available Screening Tools</h2>
            <p className="text-slate-500 text-[15px]">A collection of trusted, widely-used bioinformatics tools to evaluate multiple properties of your designed peptides.</p>
          </div>
          <div className="relative w-full sm:w-72 shrink-0">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools or properties…"
              className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2.5 text-[13px] outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 text-slate-500 text-[11.5px] uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 font-bold">Property / Purpose</th>
                <th className="px-4 py-3 font-bold">Tool Name</th>
                <th className="px-4 py-3 font-bold hidden md:table-cell">URL</th>
                <th className="px-4 py-3 font-bold hidden lg:table-cell">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-700">{t.property}</td>
                  <td className="px-4 py-3 font-bold text-violet-700">{t.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <a href={t.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-violet-600 truncate max-w-[16rem]">
                      <span className="truncate">{t.url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink size={11} className="shrink-0" />
                    </a>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-500">{t.desc}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-400">No tools match &ldquo;{query}&rdquo;.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How It Works</h2>
          <p className="text-slate-500 text-[15px]">Input your designed peptide sequences and run a suite of predictive analyses to identify the best candidates.</p>
        </motion.div>
        <HowItWorks steps={[
          { icon: FileText, title: 'Input Sequences', desc: 'Upload or paste peptide sequences from RFdiffusion.' },
          { icon: Settings, title: 'Run Screening Tools', desc: 'Automatically analyze multiple properties.' },
          { icon: Eye, title: 'View Results', desc: 'See property predictions and detailed reports.' },
          { icon: GitCompare, title: 'Compare Candidates', desc: 'Rank and compare peptides based on key metrics.' },
          { icon: CheckSquare, title: 'Select for Validation', desc: 'Choose the most promising candidates for further studies.' },
        ]} />
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <CTABanner
          tone="dark"
          eyebrow="Ready to screen?"
          title="Evaluate Your Designed Peptides"
          description="Use integrated screening tools to identify safe, stable, and functional peptide candidates."
          buttonLabel="Open Screening Workspace"
          buttonTo="/screening/workspace"
          features={['Fast and easy to use', 'Integrated bioinformatics tools', 'Research focused']}
        />
      </section>

      <SiteFooter />
    </div>
  );
}
