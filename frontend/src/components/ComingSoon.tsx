import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { Navbar } from './Navbar';
import { TechnicalNoise } from './TechnicalNoise';

interface ComingSoonProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export function ComingSoon({ icon: Icon, eyebrow, title, description, bullets }: ComingSoonProps) {
  return (
    <div className="min-h-screen lab-bg text-white overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 lab-grid pointer-events-none" />
      <TechnicalNoise />

      <main className="relative max-w-3xl mx-auto px-6 pt-40 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center h-14 w-14 border border-white/10 mb-6"
        >
          <Icon size={24} className="text-bio-500" strokeWidth={1.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-lab text-[11px] tracking-[0.2em] text-slate-500 uppercase mb-3"
        >
          // {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-5"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-slate-400 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="border border-white/10 p-6 sm:p-8 text-left mb-10"
        >
          <p className="font-lab text-[10px] tracking-[0.2em] text-slate-600 uppercase mb-4">on the roadmap</p>
          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="font-lab text-bio-500/70 text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/rfdiffusion"
            className="inline-flex items-center gap-1.5 bg-bio-500 px-5 py-2.5 text-sm font-bold text-lab-950 transition-colors hover:bg-bio-400"
          >
            Try RFdiffusion instead
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
