import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { LiveDnaIcon, LiveTargetIcon, LiveSettingsIcon, LiveCloudIcon } from "../ui/LiveIcons";

const reasons = [
  {
    liveIcon: LiveDnaIcon,
    title: "Explore New Structures",
    badge: "De Novo Backbones",
    text: "Generate diverse, high-confidence protein folds far beyond the limits of natural evolutionary databases.",
    bg: "bg-emerald-50 border-emerald-200/80 text-bio-green",
    color: "text-bio-green",
    num: "01",
  },
  {
    liveIcon: LiveTargetIcon,
    title: "Target-Aware Design",
    badge: "Hotspot Conditioning",
    text: "Target specific disease epitopes, viral spikes, or receptor interfaces with residue-level precision.",
    bg: "bg-cyan-50 border-cyan-200/80 text-cyan-600",
    color: "text-cyan-600",
    num: "02",
  },
  {
    liveIcon: LiveSettingsIcon,
    title: "Multi-Strategy Flexibility",
    badge: "5 Design Modes",
    text: "De novo binders, motif scaffolding, symmetric oligomers, and partial diffusion in a single engine.",
    bg: "bg-purple-50 border-purple-200/80 text-purple",
    color: "text-purple",
    num: "03",
  },
  {
    liveIcon: LiveCloudIcon,
    title: "Accelerated Discovery",
    badge: "Cloud GPU Workflow",
    text: "Iterate hundreds of candidates in minutes rather than spending months in conventional engineering.",
    bg: "bg-blue-50 border-blue-200/80 text-blue",
    color: "text-blue",
    num: "04",
  }
];

export default function RFWhy() {
  return (
    <section id="why-rf" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bio-green-light border border-bio-green/20 text-bio-green text-[11px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={13} />
            Breakthrough Generative Biology
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] lg:text-[36px] font-[800] text-text-main mb-4 tracking-tight"
          >
            Why <span className="text-bio-green">RFdiffusion?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-text-soft leading-relaxed"
          >
            Developed by the Baker Lab at the University of Washington and published in <em>Nature</em>, RFdiffusion revolutionizes protein engineering using equivariant neural diffusion.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 lg:p-7 rounded-[18px] border border-border-subtle shadow-[0_4px_20px_rgba(16,24,40,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-bio-green/30 hover:shadow-[0_15px_30px_rgba(16,24,40,0.08)] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-[14px] border flex items-center justify-center transition-transform group-hover:scale-105 ${reason.bg}`}>
                    <reason.liveIcon size={24} className={reason.color} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-text-soft/60 px-2 py-1 rounded bg-bg-alt border border-border-subtle select-none">
                    {reason.num}
                  </span>
                </div>

                <div className="inline-block px-2 py-0.5 rounded bg-bg-alt text-[10px] font-mono text-text-soft font-semibold mb-2">
                  {reason.badge}
                </div>

                <h3 className="text-[17px] font-bold text-text-main mb-2 leading-tight">{reason.title}</h3>
                <p className="text-[13px] text-text-soft leading-relaxed">
                  {reason.text}
                </p>
              </div>

              <div className="w-full h-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent mt-5 opacity-60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
