import { Link } from 'react-router-dom';
import { BrandMark } from './BrandMark';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/rfdiffusion', label: 'RFdiffusion' },
  { to: '/screening', label: 'Screening' },
  { to: '/md-simulation', label: 'MD Simulation' },
  { to: '/about', label: 'About Us' },
];

// lucide-react ships no brand marks (GitHub/LinkedIn/YouTube) -- small
// inline glyphs instead of pulling in a second icon library for three icons.
function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d={path} />
    </svg>
  );
}
const GITHUB_PATH = 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z';
const LINKEDIN_PATH = 'M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z';
const YOUTUBE_PATH = 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z';

export function SiteFooter({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return (
    <footer className={`border-t ${dark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <BrandMark size={30} />
          <div className="leading-tight">
            <p className={`font-extrabold text-[13px] ${dark ? 'text-white' : 'text-slate-900'}`}>BioGen AI</p>
            <p className={`text-[10.5px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>For Research. For a Healthier Tomorrow.</p>
          </div>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={dark ? 'hover:text-white transition-colors' : 'hover:text-slate-900 transition-colors'}>
              {n.label}
            </Link>
          ))}
        </div>

        <div className={`flex items-center gap-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          <a href="https://github.com/sokrypton/RFdiffusion" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-emerald-500 transition-colors">
            <SocialIcon path={GITHUB_PATH} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-emerald-500 transition-colors">
            <SocialIcon path={LINKEDIN_PATH} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-emerald-500 transition-colors">
            <SocialIcon path={YOUTUBE_PATH} />
          </a>
        </div>
      </div>
      <div className={`border-t ${dark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className={`max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11.5px] ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          <p>&copy; {new Date().getFullYear()} BioGen AI. All rights reserved.</p>
          <p>Research Use Only</p>
        </div>
      </div>
    </footer>
  );
}
