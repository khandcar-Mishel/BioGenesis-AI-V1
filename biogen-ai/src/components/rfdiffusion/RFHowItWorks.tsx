import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function RFHowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-bg-alt border-y border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          
          {/* LEFT: Text */}
          <div className="w-full lg:w-[35%] flex flex-col items-start">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[32px] lg:text-[36px] font-[750] text-text-main mb-5 tracking-tight"
            >
              How RFdiffusion Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[15px] text-text-soft leading-[1.6] mb-8"
            >
              RFdiffusion uses a denoising diffusion process with a geometric deep learning model to generate protein structures from random noise, optionally conditioned on a target structure, motif, or other constraints.
            </motion.p>
            <motion.button 
              type="button"
              onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-bio-green font-semibold text-[14px] px-4 py-2 rounded-lg border border-border-subtle bg-white hover:bg-bg-pale-mint transition-colors cursor-pointer"
            >
              Learn more <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* RIGHT: Process Visual */}
          <div className="w-full lg:w-[65%] flex flex-col md:flex-row items-center justify-between gap-6 relative">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-[140px] h-[140px] flex items-center justify-center mb-6 relative">
                {/* Random Noise SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                  <g fill="#98A2B3">
                    {/* Simplified generated noise pattern */}
                    {[...Array(60)].map((_, i) => (
                      <circle 
                        key={i} 
                        cx={20 + (i * 13) % 60 + Math.sin(i)*10} 
                        cy={20 + (i * 17) % 60 + Math.cos(i)*10} 
                        r={Math.random() * 1.5 + 0.5} 
                        opacity={Math.random() * 0.5 + 0.2}
                      />
                    ))}
                  </g>
                </svg>
              </div>
              <h4 className="text-[14px] font-bold text-text-main mb-1 text-center">Random noise</h4>
              <p className="text-[12px] text-text-soft text-center">(initial state)</p>
            </motion.div>

            <ArrowRight size={20} className="hidden md:block text-border-subtle shrink-0 mx-2" />

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-[140px] h-[140px] flex items-center justify-center mb-6 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Mixed noise and structure */}
                  <g fill="#98A2B3">
                    {[...Array(20)].map((_, i) => (
                      <circle key={i} cx={25 + (i * 11) % 50} cy={25 + (i * 19) % 50} r="1" opacity="0.3" />
                    ))}
                  </g>
                  <g fill="#2F80ED" opacity="0.8">
                    <circle cx="45" cy="40" r="12" />
                    <circle cx="55" cy="60" r="14" />
                    <circle cx="35" cy="55" r="10" />
                    <path d="M 45 40 Q 60 50 55 60" stroke="#2F80ED" strokeWidth="4" fill="none" opacity="0.5"/>
                  </g>
                </svg>
              </div>
              <h4 className="text-[14px] font-bold text-text-main mb-1 text-center">Iterative denoising</h4>
              <p className="text-[12px] text-text-soft text-center">(diffusion process)</p>
            </motion.div>

            <ArrowRight size={20} className="hidden md:block text-border-subtle shrink-0 mx-2" />

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center flex-1 w-full"
            >
              <div className="w-[140px] h-[140px] flex items-center justify-center mb-6 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_5px_15px_rgba(47,128,237,0.2)]">
                  <defs>
                    <radialGradient id="hGrad1" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#EAF3FF" />
                      <stop offset="100%" stopColor="#2F80ED" />
                    </radialGradient>
                    <radialGradient id="hGrad2" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#EAF8F4" />
                      <stop offset="100%" stopColor="#0B8F70" />
                    </radialGradient>
                  </defs>
                  <g>
                    <circle cx="40" cy="40" r="14" fill="url(#hGrad1)" />
                    <circle cx="65" cy="50" r="16" fill="url(#hGrad2)" />
                    <circle cx="45" cy="65" r="12" fill="url(#hGrad1)" />
                    <circle cx="30" cy="55" r="10" fill="url(#hGrad2)" />
                    <circle cx="55" cy="35" r="11" fill="url(#hGrad1)" />
                  </g>
                </svg>
              </div>
              <h4 className="text-[14px] font-bold text-text-main mb-1 text-center">Designed backbone</h4>
              <p className="text-[12px] text-text-soft text-center">(final structure)</p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
