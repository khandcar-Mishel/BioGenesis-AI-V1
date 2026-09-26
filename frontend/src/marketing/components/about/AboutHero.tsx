import { motion } from 'framer-motion';
import { User, BookOpen, UsersRound, Code2, Leaf, CheckCircle2 } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative bg-about-hero-cyan overflow-hidden border-b border-about-border">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,_#EAF8F7_0%,_transparent_70%)] opacity-80 blur-[60px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_#DDE8EC_0%,_transparent_70%)] opacity-40 blur-[80px]"></div>

        {/* Subtle Molecular SVG Pattern */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <g stroke="#00A878" strokeWidth="1" fill="none">
            <circle cx="650" cy="150" r="40" />
            <circle cx="750" cy="250" r="30" />
            <circle cx="550" cy="300" r="50" />
            <path d="M650 190 L750 220" />
            <path d="M610 270 L550 300" />
            <path d="M650 190 L610 270" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[55%] flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-about-green bg-white/50 backdrop-blur-sm mb-6"
            >
              <User size={14} className="text-about-green" />
              <span className="text-[11px] font-bold tracking-[0.1em] text-about-green uppercase">
                About BioGen AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[36px] sm:text-[44px] lg:text-[54px] font-[750] text-about-navy-head leading-[1.1] mb-6 tracking-tight"
            >
              A Student-Led Initiative<br />
              for a <span className="text-about-green">Healthier Tomorrow.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] text-about-text leading-[1.6] max-w-[570px] mb-12"
            >
              BioGen AI is a research-focused platform that combines computational protein design, simulation, and analysis tools to make advanced biotechnology more accessible for researchers, students, and the scientific community.
            </motion.p>
          </div>

          {/* RIGHT CONTENT: VISUAL */}
          <div className="w-full lg:w-[45%] relative min-h-[300px] lg:min-h-[420px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full h-full max-w-[480px] aspect-[4/3] rounded-[16px] bg-about-bg border border-about-border shadow-sm overflow-hidden flex items-center justify-center group"
            >
              {/* CSS/SVG representation of the biomedical robotic hand and capsule */}
              <div className="absolute inset-0 bg-gradient-to-br from-about-hero-cyan to-[#D0EAEA] opacity-50 mix-blend-multiply"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-10 rounded-full bg-about-green shadow-[0_0_40px_rgba(0,168,120,0.6)] border-2 border-white/40 rotate-[-15deg] group-hover:rotate-[-5deg] transition-transform duration-700"></div>
                <div className="mt-8 text-about-green font-semibold text-sm tracking-wide bg-white/70 px-4 py-1.5 rounded-full border border-about-green/20 backdrop-blur-md">
                  Therapeutic Candidate
                </div>
              </div>

              {/* Decorative robotic joints abstraction */}
              <svg className="absolute top-[-20%] right-[-10%] w-[60%] h-[70%] opacity-40" viewBox="0 0 200 200">
                <path d="M150 0 L120 80 L60 120" fill="none" stroke="#526B8A" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="120" cy="80" r="12" fill="#071A3D" />
                <circle cx="60" cy="120" r="8" fill="#071A3D" />
              </svg>

              {/* Floating Drug Candidates Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 lg:bottom-4 lg:-left-12 bg-white rounded-[14px] p-5 shadow-[0_8px_30px_rgba(7,26,61,0.08)] border border-about-border w-[220px] z-20"
              >
                <h4 className="text-[13px] font-bold text-about-navy mb-3">Drug Candidates</h4>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "AI-generated peptides",
                    "Target-specific design",
                    "High binding potential",
                    "Faster discovery"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-about-green shrink-0" />
                      <span className="text-[12px] text-about-text font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Handwritten annotation */}
              <div className="absolute top-6 right-6 lg:top-8 lg:-left-8 text-about-green font-['Caveat'] text-[20px] leading-tight rotate-[-6deg] z-20 pointer-events-none drop-shadow-sm">
                AI discovers<br/>
                new possibilities<br/>
                for better<br/>
                therapeutics
                <svg className="absolute -bottom-6 right-0 w-8 h-8 text-about-green rotate-[70deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16 pt-10 border-t border-about-border/60"
        >
          {[
            { icon: <BookOpen size={20} strokeWidth={2} />, title: "Research\nDriven" },
            { icon: <UsersRound size={20} strokeWidth={2} />, title: "Student\nLed" },
            { icon: <Code2 size={20} strokeWidth={2} />, title: "Open\nScience" },
            { icon: <Leaf size={20} strokeWidth={2} />, title: "Real-World\nImpact" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#E2F7F1] text-about-green flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="text-[14px] font-bold text-about-navy-head leading-tight whitespace-pre-line">
                {item.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
