import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Database, CheckCircle2, FlaskConical, Lock } from 'lucide-react';
import { ReactNode } from 'react';

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
            <div className="font-handwriting text-[24px] lg:text-[28px] leading-[1.1] transform rotate-[-8deg]">
              Better<br/>
              Peptides<br/>
              for a Healthier<br/>
              Tomorrow.
            </div>
            {/* Hand-drawn arrow SVG */}
            <svg className="absolute -bottom-6 -left-8 w-12 h-12 text-screen-green opacity-60 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10,80 Q40,90 80,40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M70,35 L82,38 L85,50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>

          {/* Molecular Structure Placeholder */}
          {/* We'll use a sophisticated CSS composition to represent the 3D protein. 
              In production, this would be a Mol* WebGL canvas. */}
          <motion.div 
            className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            {/* The main protein cluster representation */}
            <div className="absolute inset-0 bg-gradient-to-tr from-screen-teal via-screen-green to-screen-cyan-light rounded-full blur-[40px] opacity-20" />
            
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
              <defs>
                <radialGradient id="prot-green" cx="30%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#4DD0D1" />
                  <stop offset="40%" stopColor="#079B78" />
                  <stop offset="100%" stopColor="#087F67" />
                </radialGradient>
                <radialGradient id="prot-teal" cx="40%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#E8FAF8" />
                  <stop offset="30%" stopColor="#10AFC0" />
                  <stop offset="100%" stopColor="#063F42" />
                </radialGradient>
                <radialGradient id="prot-navy" cx="20%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="#10AFC0" />
                  <stop offset="50%" stopColor="#10233F" />
                  <stop offset="100%" stopColor="#0B1C32" />
                </radialGradient>
                <filter id="shadow">
                  <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
                </filter>
              </defs>
              
              {/* Complex grouped blobs simulating a molecular surface */}
              <g filter="url(#shadow)">
                <circle cx="200" cy="200" r="140" fill="url(#prot-teal)" />
                <circle cx="150" cy="140" r="90" fill="url(#prot-green)" />
                <circle cx="270" cy="180" r="100" fill="url(#prot-green)" />
                <circle cx="180" cy="260" r="95" fill="url(#prot-navy)" />
                <circle cx="100" cy="220" r="70" fill="url(#prot-teal)" />
                <circle cx="290" cy="260" r="80" fill="url(#prot-green)" />
                <circle cx="240" cy="110" r="70" fill="url(#prot-navy)" />
                <circle cx="330" cy="140" r="50" fill="url(#prot-teal)" />
                <circle cx="120" cy="90" r="45" fill="url(#prot-teal)" />
                <circle cx="130" cy="290" r="60" fill="url(#prot-green)" />
                <circle cx="240" cy="310" r="55" fill="url(#prot-teal)" />
                
                {/* Surface detail / highlights */}
                <circle cx="130" cy="110" r="15" fill="#E8FAF8" opacity="0.6" />
                <circle cx="250" cy="150" r="20" fill="#E8FAF8" opacity="0.5" />
                <circle cx="170" cy="230" r="25" fill="#4DD0D1" opacity="0.4" />
                <circle cx="280" cy="240" r="15" fill="#E8FAF8" opacity="0.7" />
                <circle cx="90" cy="210" r="12" fill="#E8FAF8" opacity="0.6" />
              </g>
            </svg>

          </motion.div>

          {/* Floating Card */}
          <motion.div 
            className="absolute bottom-[5%] lg:bottom-[10%] right-[5%] lg:-right-[5%] bg-white rounded-[12px] p-4 lg:p-5 border border-screen-border-light flex flex-col gap-3 z-20 shadow-[0_4px_20px_rgba(16,35,63,0.05)] w-[140px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-[8px] bg-screen-green-light flex items-center justify-center text-screen-green">
              <FlaskConical size={20} />
            </div>
            <p className="text-[13px] font-semibold text-screen-navy leading-[1.4]">
              Screen.<br/>
              Evaluate.<br/>
              Prioritize.<br/>
              Advance.
            </p>
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
