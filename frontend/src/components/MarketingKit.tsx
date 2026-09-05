import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

/** Compact icon+label row, used directly under a hero (the white "trust bar"). */
export function BenefitStrip({ items }: { items: { icon: LucideIcon; label: string }[] }) {
  return (
    <div className="relative -mt-8 mx-4 sm:mx-8 max-w-6xl lg:mx-auto bg-white rounded-2xl card-shadow border border-slate-100 grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-3 px-5 py-5">
          <it.icon size={18} className="text-emerald-600 shrink-0" strokeWidth={1.75} />
          <span className="text-[13px] font-semibold text-slate-700 leading-snug">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** {icon, title, desc} card grid -- the "Why X" / "Applications" sections. */
export function IconGrid({
  items,
  columns = 4,
}: {
  items: { icon: LucideIcon; title: string; desc: string }[];
  columns?: 2 | 3 | 4 | 5;
}) {
  const cols: Record<number, string> = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-3 lg:grid-cols-5',
  };
  return (
    <div className={`grid grid-cols-1 ${cols[columns]} gap-4`}>
      {items.map((it, i) => (
        <motion.div
          key={it.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="border border-slate-200 rounded-xl p-5 bg-white hover:border-emerald-200 hover:shadow-sm transition-all"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 mb-4">
            <it.icon size={18} className="text-emerald-600" strokeWidth={1.75} />
          </span>
          <h3 className="font-bold text-[14px] text-slate-900 mb-1.5">{it.title}</h3>
          <p className="text-[13px] text-slate-500 leading-relaxed">{it.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/** Numbered step row with connecting lines -- the "How It Works" sections. */
export function HowItWorks({ steps }: { steps: { icon: LucideIcon; title: string; desc: string }[] }) {
  return (
    <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative flex flex-col items-center text-center"
        >
          {i < steps.length - 1 && (
            <svg className="hidden sm:block absolute top-6 left-1/2 w-full h-4 text-emerald-200" style={{ transform: 'translateX(1.5rem)' }}>
              <line x1="0" y1="8" x2="100%" y2="8" stroke="currentColor" strokeWidth="2" className="step-connector" />
            </svg>
          )}
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white font-bold mb-3">
            {i + 1}
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 mb-2.5">
            <s.icon size={16} className="text-emerald-600" strokeWidth={1.75} />
          </span>
          <h4 className="font-bold text-[13.5px] text-slate-900 mb-1">{s.title}</h4>
          <p className="text-[12px] text-slate-500 leading-relaxed max-w-[11rem]">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/** Closing call-to-action banner. */
export function CTABanner({
  tone = 'dark',
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonTo,
  features,
}: {
  tone?: 'dark' | 'light';
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonTo: string;
  features?: string[];
}) {
  const dark = tone === 'dark';
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-3xl px-8 py-16 text-center ${dark ? 'dark-wash text-white' : 'bg-emerald-50 border border-emerald-100'}`}
    >
      <p className={`font-bold text-[11px] tracking-[0.2em] uppercase mb-4 ${dark ? 'text-emerald-300' : 'text-emerald-600'}`}>{eyebrow}</p>
      <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      <p className={`text-[15px] mb-8 max-w-md mx-auto ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
      <Link
        to={buttonTo}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-400"
      >
        {buttonLabel} <ArrowRight size={16} strokeWidth={2.5} />
      </Link>
      {features && (
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {features.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/** Small cursive annotation with a curved arrow, echoing hand-markup on the reference mock. */
export function HandNote({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`font-hand text-emerald-700/80 text-2xl leading-[1.15] whitespace-pre-line ${className}`}>
      {text}
    </div>
  );
}

export const fadeUpVariant = fadeUp;
