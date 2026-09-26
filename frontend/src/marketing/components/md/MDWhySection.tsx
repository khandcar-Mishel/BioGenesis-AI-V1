import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LiveShieldIcon, LiveWaveIcon, LiveNetworkIcon, LiveAtomIcon } from '../ui/LiveIcons';

export default function MDWhySection() {
  const cards = [
    {
      liveIcon: LiveShieldIcon,
      title: "Validate Stability",
      badge: "RMSD & RMSF Analysis",
      description: "Assess whether the designed backbone maintains its fold under thermal and physical stress over time.",
      bg: "bg-emerald-50 border-emerald-200/80 text-md-green",
      color: "text-md-green",
      num: "01",
    },
    {
      liveIcon: LiveWaveIcon,
      title: "Understand Flexibility",
      badge: "Solvated Dynamics",
      description: "Explore conformational ensembles and pinpoint disordered loops versus rigid catalytic secondary motifs.",
      bg: "bg-cyan-50 border-cyan-200/80 text-cyan-600",
      color: "text-cyan-600",
      num: "02",
    },
    {
      liveIcon: LiveNetworkIcon,
      title: "Analyze Interactions",
      badge: "Binding Kinetics",
      description: "Characterize hydrogen bonding, salt bridges, and hydrophobic contacts with explicit solvent and target receptors.",
      bg: "bg-blue-50 border-blue-200/80 text-md-blue",
      color: "text-md-blue",
      num: "03",
    },
    {
      liveIcon: LiveAtomIcon,
      title: "Guide Wet-Lab Assay",
      badge: "Kinetic Filtering",
      description: "Direct biochemical synthesis towards candidates demonstrating true thermodynamic equilibrium.",
      bg: "bg-teal-50 border-teal-200/80 text-teal-600",
      color: "text-teal-600",
      num: "04",
    }
  ];

  return (
    <section id="why-md" className="bg-md-bg py-16 lg:py-24 border-t border-md-border/50 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

        {/* Header */}
        <div className="max-w-[800px] mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-md-mint-light text-md-green text-[11px] font-bold uppercase tracking-wider mb-4 border border-md-green/20">
            <Sparkles size={13} />
            Atomic Resolution Dynamics
          </div>
          <h2 className="text-[32px] sm:text-[36px] font-[800] text-md-navy mb-4 tracking-tight">
            Why Molecular Dynamics Simulation?
          </h2>
          <p className="text-[15px] sm:text-[17px] text-md-text leading-[1.6]">
            Static crystallography or AlphaFold structures only show a frozen snapshot. Molecular dynamics (MD) simulates real-world thermal motion, hydration shells, and structural transitions, confirming viability prior to experimental investment.
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
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-md-border rounded-[16px] p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:border-md-green/40 hover:shadow-[0_15px_32px_rgba(2,44,46,0.08)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-[14px] border flex items-center justify-center transition-transform group-hover:scale-105 ${card.bg}`}>
                    <card.liveIcon size={24} className={card.color} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-md-navy/50 px-2 py-1 rounded bg-md-bg border border-md-border select-none">
                    {card.num}
                  </span>
                </div>

                <div className="inline-block px-2 py-0.5 rounded bg-md-bg text-[10px] font-mono text-md-navy/70 font-semibold mb-2">
                  {card.badge}
                </div>

                <h3 className="text-[17px] lg:text-[18px] font-[700] text-md-navy mb-2 leading-[1.3]">
                  {card.title}
                </h3>
                <p className="text-[13px] text-md-text leading-[1.6]">
                  {card.description}
                </p>
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-transparent via-md-border to-transparent mt-5 opacity-60" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
