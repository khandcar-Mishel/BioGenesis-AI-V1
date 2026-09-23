import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X, ArrowUpRight } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';

const LINKS = [
  { to: '/', label: 'Home' }, { to: '/rfdiffusion', label: 'RFdiffusion' },
  { to: '/screening', label: 'Screening' }, { to: '/md-simulation', label: 'MD Simulation' },
  { to: '/results', label: 'Results' }, { to: '/about', label: 'About us' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);
  const active = (to: string) => to === '/' ? pathname === to : pathname.startsWith(to);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="site-container navbar" aria-label="Main navigation">
      <Link to="/" className="brand-link" aria-label="BioGen AI home"><BrandMark /><div><span className="brand-name">BioGen<span>AI</span></span><span className="brand-caption">MOLECULAR POSSIBILITIES</span></div></Link>
      <div className="desktop-nav">{LINKS.map(link => <Link key={link.to} to={link.to} aria-current={active(link.to) ? 'page' : undefined} className={active(link.to) ? 'is-active' : ''}>{link.label}</Link>)}</div>
      <Link to="/rfdiffusion/studio" className="nav-cta">Open workspace <ArrowUpRight size={16} /></Link>
      <button ref={menuButton} type="button" className="mobile-menu-toggle" onClick={() => setOpen(value => !value)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={23} /> : <List size={23} />}</button>
    </nav>
    {open && <nav id="mobile-navigation" onClick={() => setOpen(false)} className="mobile-navigation" aria-label="Mobile navigation">{LINKS.map(link => <Link key={link.to} to={link.to} aria-current={active(link.to) ? 'page' : undefined}>{link.label}<ArrowUpRight size={15} /></Link>)}<Link to="/rfdiffusion/studio" className="button-primary">Open workspace <ArrowUpRight size={16} /></Link></nav>}
  </header>;
}
