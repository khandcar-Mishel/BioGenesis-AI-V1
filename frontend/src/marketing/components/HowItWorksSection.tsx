import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LiveUploadIcon, LiveSettingsIcon, LiveChartIcon, LiveTargetIcon } from "./ui/LiveIcons";

const steps = [
  {
    id: 1,
    liveIcon: LiveUploadIcon,
    tag: "PDB / FASTA",
    title: "Input Structure",
    text: "Provide your sequence, reference structure, or binder design goal.",
    accent: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/30",
    color: "text-bio-green",
  },
  {
    id: 2,
    liveIcon: LiveSettingsIcon,
    tag: "Neural Compute",
    title: "Run Pipeline",
    text: "Design, screen, or simulate using our integrated cloud models.",
    accent: "from-purple-500/20 to-indigo-500/5",
    border: "border-purple-500/30",
    color: "text-purple",
  },
  {
    id: 3,
    liveIcon: LiveChartIcon,
    tag: "3Dmol & RMSD",
    title: "Analyze Dynamics",
    text: "Visualize conformations and interpret key biophysical metrics.",
    accent: "from-blue-500/20 to-cyan-500/5",
    border: "border-blue-500/30",
    color: "text-blue",
  },
  {
    id: 4,
    liveIcon: LiveTargetIcon,
    tag: "Lead Selection",
    title: "Discover Leads",
    text: "Identify high-scoring candidates ready for wet-lab validation.",
    accent: "from-teal-500/20 to-emerald-500/5",
    border: "border-teal-500/30",
    color: "text-emerald-600",
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
          <Sparkles size={13} />
          End-to-End Workflow
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-navy mb-4 tracking-tight"
        >
          How It <span className="text-primary">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
        >
          A seamless transition from computational hypothesis to experimental realization.
        </motion.p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-border-main card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(7,26,51,0.08)] flex flex-col items-center text-center relative group"
            >
              {/* Step indicator header */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="w-7 h-7 rounded-full bg-navy text-white text-[12px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                  {step.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-bg-soft border border-border-light text-[10px] font-mono text-text-soft">
                  {step.tag}
                </span>
              </div>

              {/* Central Glowing Live Icon Capsule */}
              <div className="relative my-3">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.accent} ${step.border} border-2 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-transform group-hover:scale-105 duration-300 relative`}>
                  <step.liveIcon size={34} className={step.color} />
                </div>
              </div>

              <h3 className="text-[19px] font-bold text-navy mt-3 mb-2">{step.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
