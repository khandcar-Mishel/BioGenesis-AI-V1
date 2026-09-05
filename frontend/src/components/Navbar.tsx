import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BrandMark } from './BrandMark';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/rfdiffusion', label: 'RFdiffusion' },
  { to: '/screening', label: 'Screening' },
  { to: '/md-simulation', label: 'MD Simulation' },
  { to: '/results', label: 'Results' },
  { to: '/about', label: 'About Us' },
];

export function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur border-b transition-shadow ${
        scrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <BrandMark />
          <div className="leading-tight">
            <p className="font-extrabold text-[15px] text-slate-900 tracking-tight">BioGen AI</p>
            <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">Generative Protein Design for Research</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                isActive(link.to) ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-3.5 right-3.5 -bottom-[1px] h-[2px] rounded-full bg-emerald-600"
                  transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/rfdiffusion"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Get Started <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        <button className="md:hidden text-slate-700 p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
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
            className="md:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive(link.to) ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/rfdiffusion"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Get Started <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
