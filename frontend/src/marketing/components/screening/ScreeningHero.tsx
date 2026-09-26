import { motion } from 'framer-motion';
import { ShieldCheck, Database, CheckCircle2, Lock } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ScreeningHero() {
  return (
    <section className="relative w-full bg-white overflow-hidden pb-16 lg:pb-24 pt-12 lg:pt-20">
      {/* Very subtle mint/cyan radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-screen-cyan-light)_0%,_white_50%)] opacity-70 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

        {/* Left Column */}
        <motion.div
          className="w-full lg:w-[52%] flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-screen-text-muted font-bold mb-4">
            Peptide Screening Studio
          </span>

          <h1 className="text-[40px] sm:text-[48px] lg:text-[54px] font-bold leading-[1.05] text-screen-navy mb-6 tracking-tight">
            From Designed Peptides<br className="hidden sm:block" />
            <span className="text-screen-green"> to Promising Candidates</span>
          </h1>

          <p className="text-[15px] sm:text-[17px] text-screen-text-secondary leading-[1.6] mb-8 max-w-[540px]">
            Evaluate AI-designed peptides with a comprehensive set of
            bioinformatics tools to assess safety, stability, bioactivity and
            drug-like properties — helping you prioritize the most promising
            candidates for further validation.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              disabled
              className="w-full sm:w-auto bg-[#F2F4F7] border border-[#D0D5DD] text-[#667085] font-semibold text-[15px] py-3 px-6 rounded-[8px] flex items-center justify-center gap-2 cursor-not-allowed select-none transition-none shadow-none"
              title="Screening workspace station is currently in development"
            >
              <Lock size={15} className="text-[#667085]" />
              <span>Coming Soon</span>
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById('why-screening')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white border border-screen-green text-screen-green hover:bg-screen-green-light/30 font-semibold text-[15px] py-3 px-6 rounded-[8px] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              Learn More
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
            <FeatureIndicator icon={<ShieldCheck size={14} />} text="Multi-parameter evaluation" />
            <FeatureIndicator icon={<Database size={14} />} text="Trusted bioinformatics tools" />
            <FeatureIndicator icon={<CheckCircle2 size={14} />} text="Prioritize the best candidates" />
          </div>
        </motion.div>

        {/* Right Column: Molecular Visual */}
        <motion.div
          className="w-full lg:w-[48%] relative flex items-center justify-center min-h-[350px] lg:min-h-[450px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {/* Handwritten Annotation */}
          <motion.div
            className="absolute top-[10%] right-[0%] lg:-right-[5%] z-20 text-screen-green-dark hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
          </motion.div>

          {/* Screening artwork */}
          <motion.div
            className="relative w-full max-w-[484px] aspect-[484/516]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <img src="/screening_hero.png" alt="Peptide screening workflow and candidate evaluation" className="w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>



        </motion.div>

      </div>
    </section>
  );
}

function FeatureIndicator({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-screen-green-light flex items-center justify-center text-screen-green shrink-0">
        {icon}
      </div>
      <span className="text-[12px] font-medium text-screen-text-secondary leading-tight whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}
