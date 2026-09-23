import { Atom, ArrowUpRight } from '@phosphor-icons/react';
import { LiveMoleculePreview } from './LiveMoleculePreview';

interface StatCard { title: string; rows: { label: string; value: string }[] }

/** A calm, interactive structure explorer shared by every marketing hero. */
export function HeroVisual({
  pdbId = '1EMA', colorscheme = 'greenCarbon', handNote, statCard, checklist,
}: {
  pdbId?: string; colorscheme?: string; handNote?: string; statCard?: StatCard; checklist?: string[];
}) {
  return (
    <div className="molecule-panel">
      <div className="molecule-panel-header">
        <span className="flex items-center gap-2"><Atom size={17} weight="regular" /> STRUCTURE EXPLORER</span>
        <span className="example-pill">EXAMPLE</span>
      </div>
      <LiveMoleculePreview pdbId={pdbId} colorscheme={colorscheme} className="molecule-stage" />
      <div className="molecule-panel-footer">
        <div><span className="molecule-caption">A closer look at possibility</span><p>{handNote ? handNote.replace(/\n/g, ' ') : 'Explore the structure. Imagine what comes next.'}</p></div>
        <a href={`https://www.rcsb.org/structure/${pdbId}`} target="_blank" rel="noreferrer" aria-label={`View example ${pdbId} on RCSB PDB`} className="pdb-link">{pdbId}<ArrowUpRight size={14} /></a>
      </div>
      {statCard && <div className="molecule-metadata" aria-label={statCard.title}>{statCard.rows.map(row => <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div>}
      {checklist && <div className="molecule-tags">{checklist.slice(0, 3).map(item => <span key={item}><i />{item}</span>)}</div>}
    </div>
  );
}
