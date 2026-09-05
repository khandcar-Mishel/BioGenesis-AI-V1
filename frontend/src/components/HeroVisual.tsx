import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { LiveMoleculePreview } from './LiveMoleculePreview';
import { HandNote } from './MarketingKit';

interface StatCard {
  title: string;
  rows: { label: string; value: string }[];
}

/**
 * The hero's right-hand visual: a real, live-rotating 3Dmol structure
 * (not a static rendered image) inside a soft blob backdrop, with the
 * floating stat-card + checklist treatment from the reference mock and
 * a cursive hand-note. Reused across Home / RFdiffusion / Screening /
 * MD Simulation / About with different copy and PDB ids.
 */
export function HeroVisual({
  pdbId = '1EMA',
  colorscheme = 'greenCarbon',
  handNote,
  statCard,
  checklist,
}: {
  pdbId?: string;
  colorscheme?: string;
  handNote?: string;
  statCard?: StatCard;
  checklist?: string[];
}) {
  return (
    <div className="relative pt-9 sm:pt-11">
      {handNote && (
        <HandNote text={handNote} className="mb-2 ml-2 max-w-[10rem] hidden sm:block" />
      )}

      <div className="absolute -left-6 -right-6 -bottom-6 top-9 sm:top-11 rounded-[3rem] bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent -z-10 float-soft" />

      <div className="relative rounded-[2rem] overflow-hidden border border-emerald-100 card-shadow bg-white h-72 sm:h-96">
        <LiveMoleculePreview pdbId={pdbId} colorscheme={colorscheme} className="h-full w-full" />
      </div>

      {statCard && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute -top-4 -right-4 sm:right-0 w-44 rounded-xl bg-white border border-slate-100 card-shadow p-3.5 hidden sm:block"
        >
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{statCard.title}</p>
          <div className="space-y-1.5">
            {statCard.rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-[11.5px]">
                <span className="text-slate-500">{r.label}</span>
                <span className="font-bold text-slate-800">{r.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {checklist && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="absolute -bottom-6 -left-4 sm:-left-8 rounded-xl bg-white border border-slate-100 card-shadow p-3.5 hidden sm:block"
        >
          <div className="space-y-1.5">
            {checklist.map((c) => (
              <div key={c} className="flex items-center gap-2 text-[11.5px] font-semibold text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
