import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';

interface ComingSoonProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export function ComingSoon({ icon: Icon, eyebrow, title, description, bullets }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="relative hero-wash flex-1">
        <div className="max-w-2xl mx-auto px-6 pt-24 pb-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-100 mb-6">
            <Icon size={28} className="text-emerald-600" strokeWidth={1.5} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 uppercase mb-3">
            {eyebrow}
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black tracking-tight mb-5">
            {title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
            className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-xl mx-auto">
            {description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-white card-shadow p-6 sm:p-8 text-left mb-10">
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-4">On the roadmap</p>
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/rfdiffusion/studio" className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
              Try RFdiffusion instead <ArrowRight size={14} />
            </Link>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900">
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
