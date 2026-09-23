import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, type Icon } from '@phosphor-icons/react';
import { IconTile } from './ScienceIcon';

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export function BenefitStrip({ items }: { items: { icon: Icon; label: string }[] }) {
  return <div className="benefit-strip" style={{ '--benefit-count': items.length } as CSSProperties}>{items.map(item => <div key={item.label}><IconTile icon={item.icon} /><span>{item.label}</span></div>)}</div>;
}

export function IconGrid({ items, columns = 4 }: { items: { icon: Icon; title: string; desc: string }[]; columns?: 2 | 3 | 4 | 5 }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-3 lg:grid-cols-5' };
  return <div className={`grid grid-cols-1 ${cols[columns]} gap-4`}>{items.map(item => <div key={item.title} className="marketing-feature-card"><IconTile icon={item.icon} /><h3>{item.title}</h3><p>{item.desc}</p></div>)}</div>;
}

export function HowItWorks({ steps }: { steps: { icon: Icon; title: string; desc: string }[] }) {
  return <div className="workflow-steps" style={{ '--step-count': steps.length } as CSSProperties}>{steps.map((step, index) => <div key={step.title} className="workflow-step"><span className="workflow-step-number">0{index + 1}</span><IconTile icon={step.icon} /><h4>{step.title}</h4><p>{step.desc}</p></div>)}</div>;
}

export function CTABanner({ tone = 'dark', eyebrow, title, description, buttonLabel, buttonTo, features }: {
  tone?: 'dark' | 'light'; eyebrow: string; title: string; description: string; buttonLabel: string; buttonTo: string; features?: string[];
}) {
  const dark = tone === 'dark';
  return <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={fadeUp} transition={{ duration: .4 }} className={`relative overflow-hidden rounded-2xl px-7 py-14 text-center ${dark ? 'dark-wash text-white' : 'bg-emerald-50 border border-emerald-100'}`}>
    <p className={`font-semibold text-[10px] tracking-[0.18em] uppercase mb-4 ${dark ? 'text-emerald-200' : 'text-emerald-600'}`}>{eyebrow}</p>
    <h2 className={`text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    <p className={`text-sm leading-relaxed mb-8 max-w-lg mx-auto ${dark ? 'text-emerald-100/70' : 'text-slate-600'}`}>{description}</p>
    <Link to={buttonTo} className="button-primary">{buttonLabel}<ArrowUpRight size={17} /></Link>
    {features && <div className={`mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] ${dark ? 'text-emerald-100/60' : 'text-slate-500'}`}>{features.map(feature => <span key={feature}>{feature}</span>)}</div>}
  </motion.div>;
}

export const fadeUpVariant = fadeUp;
