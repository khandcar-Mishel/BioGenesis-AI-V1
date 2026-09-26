import { motion } from 'framer-motion';
import { Lock, Atom, Timer, BarChart3, FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';

export default function MDHero() {
  return (
    <section className="relative w-full bg-md-bg overflow-hidden pb-16 lg:pb-24 pt-12 lg:pt-20">
      {/* Background Molecular Silhouette - Subdued */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--color-md-mint)_0%,_transparent_60%)] opacity-20 blur-[80px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-md-mint-light)_0%,_transparent_70%)] opacity-30 blur-[60px]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Column */}
        <motion.div
          className="w-full lg:w-[52%] flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-md-mint-light text-md-green text-[11px] font-semibold uppercase tracking-[0.12em] mb-6">
            Molecular Dynamics Studio
          </div>

          <h1 className="text-[36px] sm:text-[42px] lg:text-[58px] font-[800] leading-[1.1] text-md-navy mb-6 tracking-tight max-w-[580px]">
            Bring Designed Proteins to Life with <span className="text-md-green">Molecular Dynamics</span>
          </h1>

          <p className="text-[15px] sm:text-[17px] text-md-text leading-[1.6] mb-8 max-w-[520px]">
            Simulate the real-world behavior of your designed proteins and peptides at atomic resolution. Gain insights into stability, flexibility, and interactions in a dynamic, solvated environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              disabled
              className="w-full sm:w-auto bg-[#F2F4F7] border border-[#D0D5DD] text-[#667085] font-semibold text-[15px] py-3.5 px-6 rounded-[8px] flex items-center justify-center gap-2 cursor-not-allowed select-none transition-none shadow-none"
              title="Molecular dynamics workspace station is currently in development"
            >
              <Lock size={15} className="text-[#667085]" />
              <span>Coming Soon</span>
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById('why-md')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white border border-md-green text-md-green hover:bg-md-mint-light font-semibold text-[15px] py-3.5 px-6 rounded-[8px] transition-colors hover:-translate-y-[1px] cursor-pointer flex items-center justify-center gap-2"
            >
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 w-full max-w-[500px]">
             <FeatureIndicator icon={<Atom size={12} strokeWidth={2.5} />} text="Atomic-level accuracy" />
             <FeatureIndicator icon={<Timer size={12} strokeWidth={2.5} />} text="Realistic dynamic environment" />
             <FeatureIndicator icon={<BarChart3 size={12} strokeWidth={2.5} />} text="Comprehensive analysis" />
             <FeatureIndicator icon={<FlaskConical size={12} strokeWidth={2.5} />} text="Support experimental design" />
          </div>
        </motion.div>

        {/* Right Column: Molecular Visual (Simulation Box) */}
        <motion.div
          className="w-full lg:w-[48%] relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {/* Handwritten Annotation */}
          <motion.div
            className="absolute top-0 lg:top-[0%] right-0 lg:-right-[10%] z-20 text-md-green-sec hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="font-[Caveat] text-[24px] lg:text-[28px] leading-[1.1] transform rotate-[-6deg]">
              Observe<br/>
              Molecular Motion<br/>
              in Real Time
            </div>
            {/* Hand-drawn arrow SVG */}
            <svg className="absolute top-10 -left-10 w-12 h-12 text-md-green-sec opacity-70 transform rotate-[160deg]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,80 Q40,90 80,40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M70,35 L82,38 L85,50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>

          {/* Hero artwork */}
          <motion.div
            className="relative w-full max-w-[560px] aspect-[3/2] flex items-center justify-center"
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          >
            <img src="/md_simu-hero.png" alt="Molecular dynamics simulation in a solvated environment" className="w-full h-full object-contain drop-shadow-[0_18px_30px_rgba(2,44,46,0.12)]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function FeatureIndicator({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-5 h-5 rounded-full bg-md-mint-light flex items-center justify-center text-md-green shrink-0">
        {icon}
      </div>
      <span className="text-[13px] font-medium text-md-text leading-tight whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}
