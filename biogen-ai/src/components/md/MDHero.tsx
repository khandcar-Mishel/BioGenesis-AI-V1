import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Lock, Atom, Timer, BarChart3, FlaskConical } from 'lucide-react';
import { ReactNode } from 'react';

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
            className="absolute top-0 lg:top-[5%] right-0 lg:-right-[5%] z-20 text-md-green-sec hidden md:block"
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

          {/* Simulation Box CSS/SVG Construction */}
          <motion.div 
            className="relative w-[340px] h-[340px] lg:w-[440px] lg:h-[440px] flex items-center justify-center"
            animate={{ y: [-3, 3, -3], rotateX: [-1, 1, -1], rotateY: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{ perspective: "1000px" }}
          >
            {/* The Box Outline */}
            <div className="absolute inset-[10%] border-[1.5px] border-md-blue/20 rounded-[4px] shadow-[inset_0_0_40px_rgba(41,111,199,0.05)]" style={{ transform: "translateZ(-50px)" }} />
            <div className="absolute inset-[5%] border-[1.5px] border-md-blue/30 rounded-[4px]" style={{ transform: "translateZ(0px)" }} />
            <div className="absolute inset-[0%] border-[1.5px] border-md-blue/40 rounded-[4px] bg-white/5 backdrop-blur-[1px]" style={{ transform: "translateZ(50px)" }} />
            
            {/* Connecting lines for the box (simplified 2D representation of 3D) */}
            <svg className="absolute inset-0 w-full h-full text-md-blue/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="10" y1="10" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" />
                <line x1="90" y1="10" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
                <line x1="10" y1="90" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="90" y1="90" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Background water molecules (blurrier) */}
            <WaterMolecules count={20} opacity={0.3} blur={3} scale={0.7} />

            {/* Protein Structure */}
            <div className="relative w-[60%] h-[60%] z-10" style={{ transform: "translateZ(20px)" }}>
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                    <defs>
                        <linearGradient id="md-prot-green" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#18B889" />
                            <stop offset="100%" stopColor="#11A277" />
                        </linearGradient>
                        <linearGradient id="md-prot-blue" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#4BB5F5" />
                            <stop offset="100%" stopColor="#296FC7" />
                        </linearGradient>
                        <filter id="md-shadow">
                            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#022C2E" floodOpacity="0.2" />
                        </filter>
                    </defs>
                    <g filter="url(#md-shadow)">
                        {/* Simulating Alpha Helices & Beta Sheets as stylized ribbons/blobs */}
                        {/* Blue domain */}
                        <path d="M120,40 C150,30 180,60 160,90 C140,120 180,150 150,170 C120,190 100,160 110,130 C120,100 90,80 120,40 Z" fill="url(#md-prot-blue)" opacity="0.9" />
                        {/* Green domain */}
                        <path d="M80,30 C50,20 20,60 40,90 C60,120 30,160 60,180 C90,200 110,150 90,120 C70,90 110,60 80,30 Z" fill="url(#md-prot-green)" opacity="0.95" />
                        
                        {/* Internal structure highlights (Ribbons) */}
                        <path d="M80,35 Q40,60 50,90 T60,170" fill="none" stroke="#EDF8F9" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
                        <path d="M130,45 Q170,70 150,100 T150,160" fill="none" stroke="#EDF8F9" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
                    </g>
                </svg>
            </div>

            {/* Foreground water molecules (sharper) */}
            <WaterMolecules count={15} opacity={0.6} blur={0} scale={1} z={40} />

          </motion.div>

          {/* Floating Card */}
          <motion.div 
            className="absolute bottom-[0%] lg:bottom-[5%] right-[0%] lg:-right-[10%] bg-white rounded-[14px] p-4 lg:p-5 border border-md-border flex flex-col gap-2.5 z-30 shadow-[0_8px_24px_rgba(2,44,46,0.06)] w-[260px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <CheckItem text="Protein in isolated system" />
            <CheckItem text="Explicit water molecules" />
            <CheckItem text="Ions and realistic conditions" />
            <CheckItem text="Dynamic, time-resolved simulation" />
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

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 size={16} strokeWidth={2.5} className="text-md-green shrink-0 mt-0.5" />
      <span className="text-[13px] font-medium text-md-navy leading-[1.3]">{text}</span>
    </div>
  )
}

// Utility to generate random water molecules (H2O look)
function WaterMolecules({ count, opacity, blur, scale, z = 0 }: { count: number, opacity: number, blur: number, scale: number, z?: number }) {
  const molecules = Array.from({ length: count }).map((_, i) => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const rot = Math.random() * 360;
    return (
      <div 
        key={i} 
        className="absolute w-6 h-6 flex items-center justify-center pointer-events-none"
        style={{ 
          left: `${x}%`, top: `${y}%`, 
          transform: `translateZ(${z}px) scale(${scale}) rotate(${rot}deg)`,
          opacity: opacity,
          filter: blur > 0 ? `blur(${blur}px)` : 'none'
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
           {/* Oxygen (Red) */}
           <circle cx="12" cy="14" r="5" fill="#EF4444" opacity="0.8" />
           {/* Hydrogens (White/Gray) */}
           <circle cx="7" cy="8" r="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
           <circle cx="17" cy="8" r="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
           {/* Bonds */}
           <line x1="9" y1="10" x2="11" y2="12" stroke="#CBD5E1" strokeWidth="1" />
           <line x1="15" y1="10" x2="13" y2="12" stroke="#CBD5E1" strokeWidth="1" />
        </svg>
      </div>
    );
  });

  return <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[4px]">{molecules}</div>;
}
