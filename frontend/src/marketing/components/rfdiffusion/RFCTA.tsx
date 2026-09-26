import { ArrowRight, MonitorOff, Cpu, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RFCTA() {
  return (
    <section className="relative bg-bio-deep py-[110px] lg:py-[130px] overflow-hidden flex justify-center items-center">
      {/* Blurred decorative proteins on edges */}
      <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[400px] h-[400px] bg-bio-green/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[350px] h-[350px] bg-protein-blue/20 rounded-full blur-[70px] pointer-events-none" />

      {/* Subtle animated molecular background */}
      <motion.div
        animate={{ rotate: 3, scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1">
            <path d="M -100 250 Q 200 100 500 250 T 1100 250" />
            <path d="M -100 350 Q 200 500 500 350 T 1100 350" />

            <circle cx="200" cy="180" r="30" fill="rgba(255,255,255,0.05)" />
            <circle cx="500" cy="250" r="50" fill="rgba(255,255,255,0.05)" />
            <circle cx="800" cy="320" r="40" fill="rgba(255,255,255,0.05)" />

            <line x1="200" y1="180" x2="500" y2="250" strokeDasharray="4 4" />
            <line x1="500" y1="250" x2="800" y2="320" strokeDasharray="4 4" />
          </g>
        </svg>
      </motion.div>

      <div className="max-w-[800px] mx-auto px-6 sm:px-8 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[1.5px] text-bio-green-light uppercase mb-4"
        >
          READY TO DESIGN?
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-white mb-5 tracking-tight"
        >
          Open the RFdiffusion Workspace
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed mb-8 max-w-[540px]"
        >
          Load your target structure, set design parameters, and generate novel protein backbones with RFdiffusion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/rfdiffusion/studio"
            className="flex items-center justify-center gap-2 bg-bio-green hover:bg-bio-green-dark text-white font-semibold text-[15px] px-8 py-3.5 rounded-[10px] transition-all hover:scale-[1.02] shadow-[0_4px_15px_rgba(11,143,112,0.3)] mb-10 inline-flex"
          >
            Launch RFdiffusion Workspace <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 border-t border-white/10 pt-6"
        >
          <div className="flex items-center gap-2">
            <MonitorOff size={16} className="text-white/60" strokeWidth={2} />
            <span className="text-[12px] text-white/80 font-medium">No installation required</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-white/60" strokeWidth={2} />
            <span className="text-[12px] text-white/80 font-medium">Cloud GPU powered</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-white/60" strokeWidth={2} />
            <span className="text-[12px] text-white/80 font-medium">Research and education use</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
