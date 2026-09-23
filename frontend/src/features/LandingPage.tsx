import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ArrowDown, Check, Cube, Cloud, SlidersHorizontal, Export, UploadSimple, ChartLine, Flask, CursorClick } from '@phosphor-icons/react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { ScienceIcon, IconTile, type ScienceKind } from '../components/ScienceIcon';
import { PipelineArt } from '../components/PipelineArt';
import { HowItWorks } from '../components/MarketingKit';

const TOOLS: { kind: ScienceKind; title: string; eyebrow: string; description: string; features: string[]; to: string; action: string; status: string }[] = [
  { kind: 'design', title: 'RFdiffusion', eyebrow: 'GENERATIVE DESIGN', description: 'Give your research a new starting point. Generate protein backbones guided by your biological target.', features: ['De novo & binder design', 'Motif scaffolding', 'Interactive structure previews'], to: '/rfdiffusion', action: 'Explore protein design', status: 'WORKSPACE AVAILABLE' },
  { kind: 'screening', title: 'Peptide screening', eyebrow: 'CANDIDATE EVALUATION', description: 'Make a more informed shortlist. Explore tools for peptide safety, stability, and functional properties.', features: ['Toxicity & allergenicity', 'Stability & solubility', 'Physicochemical properties'], to: '/screening', action: 'Explore screening tools', status: 'TOOL DIRECTORY' },
  { kind: 'dynamics', title: 'Molecular dynamics', eyebrow: 'STRUCTURAL INSIGHT', description: 'Go beyond a single structure. Discover how molecular simulation can reveal motion and stability.', features: ['Structural stability', 'Molecular interactions', 'Trajectory analysis'], to: '/md-simulation', action: 'Explore simulations', status: 'WORKSPACE COMING SOON' },
];

export function LandingPage() {
  return <div className="marketing-page home-page">
    <Navbar />
    <main id="main-content">
      <section className="home-hero">
        <div className="hero-blueprint" aria-hidden="true" />
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> A NEW PERSPECTIVE ON PROTEIN DESIGN</div>
            <h1>Small structures.<br /><span>Extraordinary</span><br /><span className="hero-last-line">possibilities.</span></h1>
            <p className="hero-description">Bring your next biological idea into focus. Design protein structures, explore promising candidates, and understand their potential—all in one research platform.</p>
            <div className="hero-actions">
              <Link to="/rfdiffusion/studio" className="button-primary">Start designing <ArrowUpRight size={18} /></Link>
              <a href="#workflow" className="button-secondary"><span className="small-play"><ArrowDown size={13} /></span> Explore the workflow</a>
            </div>
            <div className="hero-footnote"><span><Check size={13} weight="bold" /> No local GPU needed</span><span><Check size={13} weight="bold" /> Built for research</span></div>
          </div>
          <div className="hero-scene">
            <div className="scene-label"><span>FROM SEQUENCE TO STRUCTURE</span><span>01 — 03</span></div>
            <HeroVisual pdbId="1EMA" handNote="Explore. Understand. Design something new." statCard={{ title: 'Example structure information', rows: [{ label: 'Structure', value: '1EMA · Chain A' }, { label: 'Source', value: 'RCSB PDB' }, { label: 'View', value: 'Interactive 3D' }] }} />
            <div className="scene-note"><span className="note-line" /> Real molecular structure. Yours to explore.</div>
          </div>
        </div>
        <div className="site-container"><div className="platform-strip">
          <span className="platform-strip-label">YOUR RESEARCH,<br /><strong>CONNECTED.</strong></span>
          <div><ScienceIcon kind="design" size={21} /><span>Generative protein design</span></div>
          <div><ScienceIcon kind="screening" size={21} /><span>Informed candidate selection</span></div>
          <div><ScienceIcon kind="dynamics" size={21} /><span>Molecular-level insight</span></div>
        </div></div>
      </section>

      <section id="tools" className="site-container tools-section">
        <div className="section-heading"><div><p className="eyebrow">ONE PLATFORM. MORE POSSIBILITIES.</p><h2>A thoughtful toolkit.<br /><span>For your next discovery.</span></h2></div><p>Move from an initial idea to a deeper understanding, with the right tools at every step.</p></div>
        <div className="pipeline-grid">{TOOLS.map(tool => <article key={tool.kind} className={`pipeline-card pipeline-${tool.kind}`}>
          <div className="pipeline-card-top"><span className="science-tile"><ScienceIcon kind={tool.kind} size={25} /></span><span className="pipeline-eyebrow">{tool.eyebrow}</span><span className="stage-number">0{TOOLS.indexOf(tool) + 1}</span></div>
          <PipelineArt kind={tool.kind} />
          <div className="pipeline-card-copy"><h3>{tool.title}</h3><p>{tool.description}</p><ul>{tool.features.map(feature => <li key={feature}><Check size={14} />{feature}</li>)}</ul><span className="tool-availability"><i />{tool.status}</span><Link to={tool.to}>{tool.action}<ArrowUpRight size={18} /></Link></div>
        </article>)}</div>
      </section>

      <section className="research-section"><div className="site-container research-layout">
        <div className="research-intro"><p className="eyebrow">LESS FRICTION. MORE SCIENCE.</p><h2>Stay curious.<br />We’ll handle<br /> <span>the complexity.</span></h2><p>A considered workspace that keeps your research moving, from the first parameter to the final structure.</p><Link to="/about" className="text-link">Meet BioGen AI <ArrowUpRight size={17} /></Link></div>
        <div className="research-features">{[
          { icon: Cloud, title: 'Your browser is your lab', desc: 'Run RFdiffusion on cloud GPUs. Get started without managing local compute.' },
          { icon: SlidersHorizontal, title: 'Control where it matters', desc: 'Choose your design strategy and fine-tune parameters for your research question.' },
          { icon: Cube, title: 'See the whole structure', desc: 'Inspect your results in an interactive 3D viewer, right beside your design workflow.' },
          { icon: Export, title: 'Take your work further', desc: 'Download generated structures and continue exploring with your preferred research tools.' },
        ].map(item => <div className="research-feature" key={item.title}><IconTile icon={item.icon} /><h3>{item.title}</h3><p>{item.desc}</p></div>)}</div>
      </div></section>

      <section id="workflow" className="site-container workflow-section"><div className="section-heading"><div><p className="eyebrow">A CLEAR PATH FORWARD</p><h2>From a question<br /><span>to what comes next.</span></h2></div><p>Start with a target. Explore the structure. Let each result guide your next experiment.</p></div>
        <HowItWorks steps={[
          { icon: UploadSimple, title: 'Define your idea', desc: 'Bring a target structure or choose a design goal.' },
          { icon: CursorClick, title: 'Make it your own', desc: 'Select a strategy and configure your design.' },
          { icon: ChartLine, title: 'Explore the results', desc: 'Inspect structures and compare candidates.' },
          { icon: Flask, title: 'Take the next step', desc: 'Export your designs for further evaluation.' },
        ]} />
      </section>
      <section className="site-container home-cta-wrap"><div className="home-cta"><div className="cta-orbits" aria-hidden="true"><i /><i /><i /></div><div><p className="eyebrow">YOUR NEXT IDEA STARTS HERE</p><h2>What will you<br /><span>discover next?</span></h2><p>A new protein. A better question. A possibility worth exploring.</p></div><Link to="/rfdiffusion/studio" className="button-primary">Open design workspace <ArrowRight size={18} /></Link></div></section>
    </main>
    <SiteFooter />
  </div>;
}
