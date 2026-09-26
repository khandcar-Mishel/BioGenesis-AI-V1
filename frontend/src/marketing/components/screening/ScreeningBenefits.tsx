import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiveShieldIcon, LiveChartIcon, LiveTargetIcon, LiveFlaskIcon } from '../ui/LiveIcons';

export default function ScreeningBenefits() {
  const cards = [
    {
      liveIcon: LiveShieldIcon,
      title: "Ensure Safety",
      badge: "ToxinPred & AllerCat",
      description: "Predict potential toxicity, allergenicity, hemolytic activity, and off-target cross-reactivity.",
      bg: "bg-emerald-50 border-emerald-200/80 text-screen-green",
    },
    {
      liveIcon: LiveChartIcon,
      title: "Assess Developability",
      badge: "PLIFEpred & ProtParam",
      description: "Evaluate conformational half-life, proteolytic degradation, and aqueous solubility.",
      bg: "bg-cyan-50 border-cyan-200/80 text-screen-teal",
    },
    {
      liveIcon: LiveTargetIcon,
      title: "Predict Bioactivity",
      badge: "BIOPEP & CPP",
      description: "Identify functional mechanisms including cell-penetration, antimicrobial, and antioxidant activity.",
      bg: "bg-purple-50 border-purple-200/80 text-purple",
    },
    {
      liveIcon: LiveFlaskIcon,
      title: "Prioritize Candidates",
      badge: "Multi-parameter",
      description: "Rank hundreds of AI-designed peptides to synthesize only the highest-probability leads.",
      bg: "bg-blue-50 border-blue-200/80 text-blue",
    }
  ];

  return (
    <section id="why-screening" className="bg-screen-bg py-16 lg:py-24 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="max-w-[760px] mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-screen-green-light border border-screen-green/20 text-screen-green text-[11px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            High-Throughput In-Silico Triaging
          </div>
          <h2 className="text-[30px] sm:text-[36px] font-bold text-screen-navy mb-4 tracking-tight">
            Why Peptide Screening?
          </h2>
          <p className="text-[15px] sm:text-[17px] text-screen-text-secondary leading-[1.6]">
            AI-generated peptides often possess strong structural affinity, but clinical success requires strict developability, low immunogenicity, and metabolic resilience. Multi-parameter screening prioritizes synthesis-viable candidates.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-screen-border-light rounded-[16px] p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-screen-green-light hover:shadow-[0_12px_28px_rgba(16,35,63,0.08)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-[14px] border flex items-center justify-center transition-transform group-hover:scale-105 ${card.bg}`}>
                    <card.liveIcon size={24} className={card.bg.includes('text-screen-green') ? 'text-screen-green' : card.bg.includes('text-screen-teal') ? 'text-screen-teal' : card.bg.includes('text-purple') ? 'text-purple' : 'text-blue'} />
                  </div>
                </div>

                <div className="inline-block px-2 py-0.5 rounded bg-screen-surface-soft text-[10px] font-mono text-screen-navy/70 font-semibold mb-2">
                  {card.badge}
                </div>

                <h3 className="text-[17px] font-[700] text-screen-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-[13px] text-screen-text-secondary leading-[1.5]">
                  {card.description}
                </p>
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-transparent via-screen-border-light to-transparent mt-5 opacity-60" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
