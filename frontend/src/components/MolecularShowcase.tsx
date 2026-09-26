import { useState } from 'react';
import { Atom, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { LiveMoleculePreview } from './LiveMoleculePreview';
import { EXAMPLE_STRUCTURES } from '../data/exampleStructures';

export function MolecularShowcase() {
  const [selected, setSelected] = useState(0);
  const structure = EXAMPLE_STRUCTURES[selected];

  return (
    <div className="molecular-observatory">
      <div className="observatory-heading">
        <div><Atom size={19} /><span>MOLECULAR OBSERVATORY</span></div>
        <span className="reference-badge">REFERENCE STRUCTURE</span>
      </div>
      <div className="specimen-selector" role="group" aria-label="Choose an example protein">
        {EXAMPLE_STRUCTURES.map((example, index) => (
          <button key={example.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
            <span className="specimen-number">0{index + 1}</span>{example.label}<span className="specimen-id">{example.id}</span>
          </button>
        ))}
      </div>
      <div className="observatory-model">
        <LiveMoleculePreview
          pdbId={structure.id}
          className="showcase-stage"
          fallback={<svg viewBox="0 0 300 300" className="reference-trace" role="img" aria-label={`Static backbone trace of ${structure.name}`}><polyline points={structure.trace} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        />
        <span className="model-crosshair crosshair-tl" aria-hidden="true" />
        <span className="model-crosshair crosshair-br" aria-hidden="true" />
      </div>
      <div className="specimen-details" aria-live="polite" aria-atomic="true">
        <div className="specimen-name"><span>EXPERIMENTAL REFERENCE</span><h2>{structure.name}</h2></div>
        <div className="specimen-measure"><strong>{structure.residues}</strong><span>modeled residues</span></div>
        <a className="specimen-source" href={`https://www.rcsb.org/structure/${structure.id}`} target="_blank" rel="noreferrer" aria-label={`View ${structure.id} on RCSB PDB`}><ArrowUpRight size={20} /></a>
      </div>
      <div className="sequence-rail" aria-label={`Beginning of the modeled sequence: ${structure.sequence.slice(0, 28)}`}><span>CHAIN A</span><code>{structure.sequence.slice(0, 28).split('').map((residue, index) => <b key={index}>{residue}</b>)}</code><span>…</span></div>
      <p className="observatory-footnote"><CheckCircle size={13} /> Real structures from RCSB PDB. Explore without running a job.</p>
    </div>
  );
}
