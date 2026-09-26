import { motion } from 'framer-motion';
import { Clock, Database, FlaskConical, Lock, ChevronUp } from 'lucide-react';

export default function ScreeningCTA() {
  return (
    <section className="relative bg-screen-cta overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#10AFC0_0%,_transparent_60%)] opacity-20 blur-[60px]" />

        {/* Subtle molecular background abstraction */}
        <svg className="absolute w-full h-full opacity-10 mix-blend-screen" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="mol-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4DD0D1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#079B78" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g filter="blur(8px)">
            <circle cx="20%" cy="30%" r="80" fill="url(#mol-grad)" />
            <circle cx="28%" cy="50%" r="60" fill="url(#mol-grad)" />
            <circle cx="15%" cy="70%" r="100" fill="url(#mol-grad)" />

            <circle cx="80%" cy="40%" r="120" fill="url(#mol-grad)" />
            <circle cx="72%" cy="65%" r="90" fill="url(#mol-grad)" />
            <circle cx="85%" cy="80%" r="70" fill="url(#mol-grad)" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center text-center">

        <motion.span
          className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-screen-cyan-light font-bold mb-4 opacity-80"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Ready to Screen?
        </motion.span>

        <motion.h2
          className="text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-white mb-5 tracking-tight max-w-[800px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Evaluate Your Designed Peptides
        </motion.h2>

        <motion.p
          className="text-[16px] sm:text-[18px] text-[#A6C8C7] mb-10 max-w-[600px] leading-[1.6]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Use our integrated screening tools to identify safe, stable, and functional peptide candidates.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            disabled
            className="bg-white/10 text-white/50 border border-white/20 font-semibold text-[15px] sm:text-[16px] py-3.5 px-7 rounded-[8px] flex items-center justify-center gap-2.5 cursor-not-allowed select-none shadow-none"
            title="Screening workspace station is currently in development"
          >
            <Lock size={16} />
            <span>Screening Workspace — Coming Soon</span>
          </button>

          <button
            type="button"
            onClick={() => {
              document.getElementById('why-screening')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-screen-green hover:bg-screen-green-light text-white hover:text-screen-navy font-semibold text-[15px] sm:text-[16px] py-3.5 px-7 rounded-[8px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(7,155,120,0.4)] hover:scale-[1.02] cursor-pointer"
          >
            Explore Screening Tools <ChevronUp size={18} />
          </button>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 border-t border-white/10 pt-8 w-full max-w-[800px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2.5 text-[#E8FAF8]">
            <Clock size={16} strokeWidth={2} className="opacity-80" />
            <span className="text-[13px] font-medium tracking-wide">Fast and easy to use</span>
          </div>

          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>

          <div className="flex items-center gap-2.5 text-[#E8FAF8]">
            <Database size={16} strokeWidth={2} className="opacity-80" />
            <span className="text-[13px] font-medium tracking-wide">Integrated bioinformatics tools</span>
          </div>

          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20"></div>

          <div className="flex items-center gap-2.5 text-[#E8FAF8]">
            <FlaskConical size={16} strokeWidth={2} className="opacity-80" />
            <span className="text-[13px] font-medium tracking-wide">Research focused</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
