import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="pb-24 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-bg-mint to-white border border-primary/10 flex flex-col md:flex-row items-center p-8 md:p-12 lg:p-16 min-h-[320px]"
      >
        {/* Abstract Molecular Network Background (Right Side) */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%] lg:w-[50%] overflow-hidden opacity-30 pointer-events-none">
          <motion.div
            animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full relative"
          >
            <svg viewBox="0 0 400 300" className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[120%] h-[120%] text-primary">
               {/* Bonds */}
               <path d="M50,150 L120,80 L200,120 L280,70 L350,130" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
               <path d="M120,80 L140,20 M200,120 L210,220 M280,70 L340,30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
               <path d="M50,150 L60,250 L150,280 L210,220 L300,260 L350,130" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
               <path d="M150,280 L200,120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
               
               {/* Nodes (Spheres) */}
               <defs>
                 <radialGradient id="sphereGrad" cx="30%" cy="30%" r="70%">
                   <stop offset="0%" stopColor="#4DD0B0" />
                   <stop offset="100%" stopColor="#0FA77F" />
                 </radialGradient>
               </defs>
               
               <circle cx="50" cy="150" r="16" fill="url(#sphereGrad)" opacity="0.8" />
               <circle cx="120" cy="80" r="24" fill="url(#sphereGrad)" opacity="0.9" />
               <circle cx="200" cy="120" r="20" fill="url(#sphereGrad)" opacity="0.85" />
               <circle cx="280" cy="70" r="28" fill="url(#sphereGrad)" opacity="0.95" />
               <circle cx="350" cy="130" r="22" fill="url(#sphereGrad)" opacity="0.8" />
               <circle cx="140" cy="20" r="14" fill="url(#sphereGrad)" opacity="0.6" />
               <circle cx="210" cy="220" r="18" fill="url(#sphereGrad)" opacity="0.75" />
               <circle cx="340" cy="30" r="15" fill="url(#sphereGrad)" opacity="0.7" />
               <circle cx="60" cy="250" r="12" fill="url(#sphereGrad)" opacity="0.5" />
               <circle cx="150" cy="280" r="16" fill="url(#sphereGrad)" opacity="0.65" />
               <circle cx="300" cy="260" r="14" fill="url(#sphereGrad)" opacity="0.6" />
            </svg>
          </motion.div>
        </div>

        {/* Content (Left Side) */}
        <div className="relative z-10 w-full md:w-[60%] lg:w-[50%] flex flex-col items-start text-left">
          <span className="text-[11px] font-bold tracking-wider text-primary uppercase mb-4">
            READY TO START?
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy mb-4 leading-tight">
            Turn Your Ideas Into Real Proteins
          </h2>
          
          <p className="text-text-secondary text-base lg:text-lg mb-8 max-w-md leading-relaxed">
            Join BioGen AI and be part of a growing community advancing computational biology for a healthier tomorrow.
          </p>
          
          <Link 
            to="/rfdiffusion/workspace"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3.5 rounded-[8px] transition-all card-shadow-hover hover:-translate-y-0.5 inline-flex"
          >
            Open RFdiffusion Workspace <ArrowRight size={18} />
          </Link>
        </div>

        {/* Handwriting overlay */}
        <div className="hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 flex-col items-end rotate-[-5deg] z-10">
           <span className="font-handwriting text-primary/70 text-2xl lg:text-3xl">Research</span>
           <span className="font-handwriting text-primary/80 text-2xl lg:text-3xl">Design</span>
           <span className="font-handwriting text-primary text-2xl lg:text-3xl">Better Tomorrows.</span>
        </div>
      </motion.div>
    </section>
  );
}
