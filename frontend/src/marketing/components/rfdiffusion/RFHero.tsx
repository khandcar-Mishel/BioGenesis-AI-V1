import { ArrowRight, MapPin, Shuffle, Cpu, BarChart3, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function RFHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#F8FCFC] to-[#EAF8F5] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-border-subtle">
      {/* Subtle Background Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 mb-5"
            >
              <Target size={12} className="text-bio-green" strokeWidth={3} />
              <span className="text-[11px] font-bold tracking-[1px] text-bio-green uppercase">
                RFdiffusion Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-[44px] lg:text-[50px] font-[800] leading-[1.02] tracking-tight mb-6 text-text-main"
            >
              Design Novel<br />
              <span className="text-bio-green">Protein Structures</span><br />
              with <span className="text-bio-green">RFdiffusion</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-soft text-[15px] mb-8 max-w-[480px] leading-[1.6]"
            >
              Transform a biological target into AI-designed protein backbones using state-of-the-art generative models. Explore new structural possibilities for therapeutic research.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 w-full"
            >
              <Link
                to="/rfdiffusion/studio"
                className="flex items-center justify-center gap-2 bg-bio-green hover:bg-bio-green-dark text-white font-semibold text-[14px] px-5 py-3 rounded-[8px] transition-all hover:shadow-[0_4px_15px_rgba(11,143,112,0.2)] hover:-translate-y-0.5"
              >
                Open RFdiffusion Workspace <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-white hover:bg-bg-alt border border-bio-green/30 text-text-main font-semibold text-[14px] px-5 py-3 rounded-[8px] transition-all hover:-translate-y-0.5 shadow-sm"
              >
                View Examples
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - 3D Live Molecular Hero Image */}
          <div className="w-full lg:w-[50%] relative flex justify-center items-center min-h-[360px] lg:min-h-[480px]">
            {/* Soft ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square bg-bio-green-light/70 rounded-full blur-[45px] opacity-70 pointer-events-none" />

            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[480px] aspect-square z-10 flex items-center justify-center select-none"
            >
              {/* Exact user-provided 3-D live image */}
              <img
                src="/rfdiffusion-1.png"
                alt="RFdiffusion protein design workflow"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(11,143,112,0.2)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Capability Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full border-t border-border-subtle mt-12 pt-6 flex flex-wrap gap-x-8 gap-y-4"
        >
          {[
            { icon: MapPin, text: "Target-aware design" },
            { icon: Shuffle, text: "Flexible design strategies" },
            { icon: Cpu, text: "GPU-powered execution" },
            { icon: BarChart3, text: "Research-ready results" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-bio-green-light flex items-center justify-center shrink-0">
                <item.icon size={11} className="text-bio-green" strokeWidth={2.5} />
              </div>
              <span className="text-[12px] font-medium text-text-soft">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
