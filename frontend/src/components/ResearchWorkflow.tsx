import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from '@phosphor-icons/react';
import { ScienceIcon, type ScienceKind } from './ScienceIcon';
import { PipelineArt } from './PipelineArt';

const STAGES: { kind: ScienceKind; label: string; title: string; description: string; input: string; output: string; details: string[]; to: string; action: string; status: string }[] = [
  { kind: 'design', label: 'Design', title: 'Start with a biological question.', description: 'Turn a target structure or design goal into new protein backbones with RFdiffusion. Shape the experiment around your question.', input: 'Target structure or design goal', output: 'Generated protein backbones', details: ['Choose a design strategy', 'Set structural constraints', 'Inspect and export your designs'], to: '/rfdiffusion/studio', action: 'Open design workspace', status: 'Workspace available' },
  { kind: 'screening', label: 'Evaluate', title: 'Find the candidates worth exploring.', description: 'Use the screening directory to examine peptide properties. Bring evidence into the conversation before selecting your next candidate.', input: 'Candidate peptide sequences', output: 'Property predictions to compare', details: ['Explore toxicity and allergenicity tools', 'Assess stability and solubility', 'Review physicochemical properties'], to: '/screening#tools', action: 'Browse screening tools', status: 'External tool directory available' },
  { kind: 'dynamics', label: 'Understand', title: 'See beyond a single structure.', description: 'Explore how molecular dynamics can investigate structural motion and stability over time. The integrated simulation workspace is on our roadmap.', input: 'A selected molecular structure', output: 'Trajectory and stability analysis', details: ['Learn the simulation workflow', 'Understand RMSD and RMSF', 'Explore molecular interactions'], to: '/md-simulation', action: 'Explore molecular dynamics', status: 'Integrated workspace coming soon' },
];

export function ResearchWorkflow() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[active];
  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % STAGES.length;
    else if (event.key === 'ArrowLeft') next = (index + STAGES.length - 1) % STAGES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = STAGES.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="research-workflow">
      <div className="workflow-tablist" role="tablist" aria-label="Explore the research workflow">
        {STAGES.map((item, index) => <button key={item.kind} ref={element => { tabs.current[index] = element; }} type="button" id={`workflow-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="workflow-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigateTabs(event, index)}><span className="workflow-index">0{index + 1}</span><ScienceIcon kind={item.kind} size={22} /><strong>{item.label}</strong><ArrowRight size={18} /></button>)}
      </div>
      <div id="workflow-panel" className={`workflow-panel workflow-${stage.kind}`} role="tabpanel" aria-labelledby={`workflow-tab-${active}`} tabIndex={0}>
        <div className="workflow-visual"><PipelineArt kind={stage.kind} /><div className="workflow-input-output"><div><span>INPUT</span><strong>{stage.input}</strong></div><ArrowRight size={19} /><div><span>OUTPUT</span><strong>{stage.output}</strong></div></div></div>
        <div className="workflow-explainer"><span className="workflow-availability"><i />{stage.status}</span><h3>{stage.title}</h3><p>{stage.description}</p><ul>{stage.details.map(detail => <li key={detail}><Check size={15} />{detail}</li>)}</ul><Link to={stage.to} className="text-link">{stage.action}<ArrowUpRight size={19} /></Link></div>
      </div>
    </div>
  );
}
