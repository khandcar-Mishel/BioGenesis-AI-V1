import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';

export function SiteFooter({ tone: _tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-main"><Link to="/" className="footer-brand"><BrandMark size={34} /><div><strong>BioGen AI</strong><p>For research. For a world of possibility.</p></div></Link>
      <nav className="footer-links" aria-label="Footer navigation"><Link to="/rfdiffusion">Protein design</Link><Link to="/screening">Screening</Link><Link to="/md-simulation">Simulation</Link><Link to="/about">About us</Link><a href="https://github.com/sokrypton/RFdiffusion" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">GitHub<ArrowUpRight size={12} /></a></nav>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} BioGen AI. Made for curious minds.</p><span>FOR RESEARCH USE ONLY</span></div>
  </div></footer>;
}
