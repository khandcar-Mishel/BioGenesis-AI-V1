import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LiveClockIcon, LiveCoinsIcon, LiveCloudIcon, LiveDnaIcon, LiveRocketIcon } from "./ui/LiveIcons";

const reasons = [
  {
    liveIcon: LiveClockIcon,
    title: "Save Time",
    badge: "Hours, not weeks",
    text: "Rapid generative iteration from initial sequence to synthesis-ready candidates.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200/80 shadow-[0_0_15px_rgba(16,168,117,0.12)]",
  },
  {
    liveIcon: LiveCoinsIcon,
    title: "Cost-Effective",
    badge: "Zero overhead",
    text: "High-performance computational biology without costly proprietary workstations.",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200/80 shadow-[0_0_15px_rgba(245,158,11,0.12)]",
  },
  {
    liveIcon: LiveCloudIcon,
    title: "No GPU Limits",
    badge: "Modal serverless",
    text: "Elastic cloud clusters handle intensive diffusion & simulation pipelines automatically.",
    color: "text-cyan-600",
    bg: "bg-cyan-50 border-cyan-200/80 shadow-[0_0_15px_rgba(77,208,209,0.15)]",
  },
  {
    liveIcon: LiveDnaIcon,
    title: "Unified Suite",
    badge: "Integrated flow",
    text: "Design, screen, and simulate together instead of juggling disconnected tools.",
    color: "text-purple",
    bg: "bg-purple-50 border-purple-200/80 shadow-[0_0_15px_rgba(104,76,223,0.12)]",
  },
  {
    liveIcon: LiveRocketIcon,
    title: "Real Impact",
    badge: "Research ready",
    text: "Built to accelerate therapeutic peptide and binder discovery for global health.",
    color: "text-blue",
    bg: "bg-blue-50 border-blue-200/80 shadow-[0_0_15px_rgba(15,124,223,0.12)]",
  }
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 border-t border-border-light bg-gradient-to-b from-bg-soft/40 to-white">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-4">
          <Sparkles size={13} />
          Built for High-Impact Discovery
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-navy mb-4 tracking-tight"
        >
          Why Choose <span className="text-primary">BioGen AI?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
        >
          Designed by computational researchers to eliminate technical barriers and expedite biological breakthroughs.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-border-main card-shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(7,26,51,0.08)] flex flex-col justify-between group"
          >
            <div>
              {/* Contextual Live Icon Capsule */}
              <div className="flex items-center justify-between mb-5">
                <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${reason.bg}`}>
                  <reason.liveIcon size={26} className={reason.color} />
                </div>
              </div>

              <div className="inline-block px-2 py-0.5 rounded bg-bg-soft text-[10px] font-mono text-text-soft font-semibold mb-2">
                {reason.badge}
              </div>

              <h3 className="text-lg font-bold text-navy mb-2">{reason.title}</h3>
              <p className="text-[13px] text-text-secondary leading-relaxed">
                {reason.text}
              </p>
            </div>

            <div className="w-full h-1 bg-gradient-to-r from-transparent via-border-light to-transparent mt-5 opacity-60" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
