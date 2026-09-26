import Modal from './Modal';
import { useState } from "react";
import { ArrowRight, PlayCircle, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  return (
    <div className="relative w-full bg-hero-dark pt-28 pb-32 overflow-hidden flex flex-col justify-center min-h-[500px]">
      {/* Background glow and particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-40" />
        {/* Simple particle effect using CSS radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px] opacity-30" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT COLUMN - Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="text-[11px] font-semibold tracking-wider text-cyan uppercase">
                AI FOR PROTEIN INNOVATION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-6 text-white"
            >
              From Ideas to<br />
              <span className="text-gradient-primary">Functional Proteins.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#D5E2E8] text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
            >
              BioGen AI combines state-of-the-art generative AI, biomolecular simulation, and analysis tools to help researchers design, evaluate, and understand proteins and peptides — faster, easier, and more accessible.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <button
                type="button"
                onClick={() => {
                  const toolsEl = document.getElementById('tools');
                  if (toolsEl) {
                    toolsEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-3.5 rounded-[8px] transition-all hover:shadow-[0_0_20px_rgba(15,167,127,0.3)] hover:-translate-y-0.5 cursor-pointer text-base"
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-medium px-5 py-3.5 rounded-[8px] transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer text-sm"
              >
                <PlayCircle size={18} />
                Platform Tour
              </button>
            </motion.div>

            {/* Key feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 w-full max-w-md pt-4 border-t border-white/10"
            >
              {[
                "Target-Specific Design",
                "Novel Structures",
                "Simulation-Ready",
                "Accelerated Research"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-primary-light shrink-0" />
                  <span className="text-white/85 text-xs font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN - 3D Live Picture Hero Image */}
          <div className="lg:col-span-6 flex justify-center items-center relative w-full min-h-[360px] lg:min-h-[480px]">
            <motion.div
              animate={{
                y: [-16, 16, -16],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-[520px] aspect-square flex items-center justify-center select-none"
            >
              {/* Exact user-provided 3-D live image */}
              <img
                src="/rfdiffusion_hero.png"
                alt="3D Live Molecular Protein Structure"
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(77,208,209,0.22)]"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Platform Tour / Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <Modal label="Platform tour" onClose={() => setIsVideoModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#071A33] border border-cyan/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan">Platform Tour</span>
                  <h3 className="text-xl font-bold">BioGen AI Generative Protein Architecture</h3>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  aria-label="Close platform tour"
                  className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="w-full aspect-video bg-black/60 rounded-xl border border-white/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden mb-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,167,127,0.2),transparent_70%)]" />
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-4 animate-pulse">
                  <PlayCircle size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Computational Workflow in Action</h4>
                <p className="text-sm text-white/70 max-w-md">
                  From de novo generative backbones with RFdiffusion to multi-parameter peptide screening and all-atom MD trajectory analysis.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-cyan">RFdiffusion v1.1.0</span>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-bio-green">3Dmol.js Viewer</span>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-mono text-blue">Modal Cloud GPU</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  aria-label="Close platform tour"
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/rfdiffusion/studio"
                  onClick={() => setIsVideoModalOpen(false)}
                  aria-label="Close platform tour"
                  className="px-5 py-2 text-sm font-semibold rounded-lg bg-primary hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
                >
                  Open RFdiffusion Workspace <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
