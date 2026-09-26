import { motion } from 'framer-motion';
import { Cloud, BarChart3, ShieldCheck, Lock, ChevronUp } from 'lucide-react';

export default function MDCTA() {
  return (
    <section className="relative bg-md-navy overflow-hidden py-24 border-t border-md-teal">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#104F50_0%,_transparent_70%)] opacity-40 blur-[50px]" />

        {/* Subtle molecular background abstraction */}
        <motion.svg
          className="absolute w-full h-full opacity-20 mix-blend-screen pointer-events-none"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          animate={{ x: [-20, 0, -20], y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <defs>
            <radialGradient id="cta-mol-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#11A277" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#104F50" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g filter="blur(6px)">
            <circle cx="10%" cy="20%" r="90" fill="url(#cta-mol-grad)" />
            <circle cx="25%" cy="60%" r="70" fill="url(#cta-mol-grad)" />
            <circle cx="15%" cy="80%" r="110" fill="url(#cta-mol-grad)" />

            <circle cx="85%" cy="30%" r="130" fill="url(#cta-mol-grad)" />
            <circle cx="75%" cy="70%" r="80" fill="url(#cta-mol-grad)" />
            <circle cx="90%" cy="85%" r="100" fill="url(#cta-mol-grad)" />

            <path d="M100,80 Q250,240 150,320" stroke="#11A277" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />
            <path d="M850,120 Q750,280 900,340" stroke="#104F50" strokeWidth="6" fill="none" opacity="0.4" strokeLinecap="round" />
          </g>
        </motion.svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center text-center">

        <motion.span
          className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-md-mint-light font-bold mb-5 opacity-80"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Ready to Simulate?
        </motion.span>

        <motion.h2
          className="text-[32px] sm:text-[38px] lg:text-[44px] font-[700] text-white mb-5 tracking-tight max-w-[800px] leading-[1.15]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore the Dynamic Behavior of Your Designs
        </motion.h2>

        <motion.p
          className="text-[16px] sm:text-[17px] text-md-mint mb-10 max-w-[640px] leading-[1.6]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Run molecular dynamics simulations and gain deeper insights into stability, flexibility and function.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            disabled
            className="bg-white/10 text-white/50 border border-white/20 font-semibold text-[15px] sm:text-[16px] py-4 px-8 rounded-[8px] flex items-center justify-center gap-2.5 cursor-not-allowed select-none shadow-none"
            title="Molecular Dynamics workspace station is currently in development"
          >
            <Lock size={16} />
            <span>MD Workspace — Coming Soon</span>
          </button>

          <button
            type="button"
            onClick={() => {
              document.getElementById('why-md')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-md-green hover:bg-md-green-sec text-white font-semibold text-[15px] sm:text-[16px] py-4 px-8 rounded-[8px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_24px_rgba(17,162,119,0.3)] hover:-translate-y-[2px] cursor-pointer"
          >
            Learn How Simulation Works <ChevronUp size={18} />
          </button>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full max-w-[800px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 text-md-mint-light">
            <Cloud size={18} strokeWidth={2} className="text-md-green" />
            <span className="text-[13px] font-medium tracking-wide">GPU-powered computation</span>
          </div>

          <div className="hidden sm:block w-[1px] h-[16px] bg-md-teal"></div>

          <div className="flex items-center gap-3 text-md-mint-light">
            <BarChart3 size={18} strokeWidth={2} className="text-md-green" />
            <span className="text-[13px] font-medium tracking-wide">Advanced analysis tools</span>
          </div>

          <div className="hidden sm:block w-[1px] h-[16px] bg-md-teal"></div>

          <div className="flex items-center gap-3 text-md-mint-light">
            <ShieldCheck size={18} strokeWidth={2} className="text-md-green" />
            <span className="text-[13px] font-medium tracking-wide">Research focused</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
