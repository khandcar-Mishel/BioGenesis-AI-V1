import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/rfdiffusion', label: 'RFdiffusion' },
  { to: '/screening', label: 'Screening', soon: true },
  { to: '/md-simulation', label: 'MD Simulation', soon: true },
  { to: '/results', label: 'Results', soon: true },
  { to: '/about', label: 'About Us', soon: true },
];

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'bg-lab-950/90 backdrop-blur border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-bio-500">
            <path
              d="M5 2.5c0 5 10 5 10 10s-10 5-10 10M5 5.5c0 3.5 10 3.5 10 7s-10 3.5-10 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity={0.9}
            />
          </svg>
          <span className="font-lab font-bold text-[14px] tracking-tight text-white">
            biogen<span className="text-bio-500">.ai</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3.5 py-2 text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                isActive(link.to) ? 'text-white' : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              <span>{link.label}</span>
              {link.soon && <span className="font-lab text-[9px] text-slate-600">[soon]</span>}
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3.5 right-3.5 -bottom-[1px] h-[1.5px] bg-bio-500"
                  transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/rfdiffusion"
            className="inline-flex items-center gap-2 rounded-md border border-bio-500/40 bg-bio-500/10 px-4 py-1.5 text-[13px] font-semibold text-bio-400 transition-colors hover:bg-bio-500/20 hover:border-bio-500/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-bio-500 glow-pulse" />
            Launch Studio
          </Link>
        </div>

        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium border-l-2 ${
                    isActive(link.to) ? 'border-bio-500 text-white bg-white/[0.03]' : 'border-transparent text-slate-500'
                  }`}
                >
                  {link.label}
                  {link.soon && <span className="font-lab text-[10px] text-slate-600">[soon]</span>}
                </Link>
              ))}
              <Link
                to="/rfdiffusion"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-bio-500/40 bg-bio-500/10 px-4 py-2.5 text-sm font-semibold text-bio-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bio-500" /> Launch Studio
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
