import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Code2, Globe, Target, Eye, Heart, User,
  MessageSquare, Mail, Send, Lightbulb, ExternalLink, CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { SiteFooter } from '../components/SiteFooter';
import { HeroVisual } from '../components/HeroVisual';
import { IconGrid, fadeUpVariant } from '../components/MarketingKit';

const REPO_URL = 'https://github.com/khandcar-Mishel/BioGenesis-AI-V1';
const CONTACT_EMAIL = 'contact@biogen.ai'; // placeholder -- swap for a real inbox before sharing publicly

// Placeholder team entries -- real names/photos intentionally left out of this pass.
const TEAM = [
  { role: 'Founder', focus: 'Computational Biology · Protein Design', bio: 'Leads the research direction: which pipelines get built, and how they map to real protein-design workflows.' },
  { role: 'Web Developer', focus: 'Full-Stack Engineering · UI/UX', bio: 'Builds the studio itself — the workspace UI, the GPU backend integration, and everything in between.' },
];

export function AboutUsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No contact-form backend yet -- compose a mailto: so the message still
    // reaches someone, rather than silently doing nothing on submit.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`[BioGen AI] ${form.subject}`)}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative hero-wash pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 pt-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 mb-6">
              <Users size={12} className="text-emerald-600" />
              <span className="text-[11px] font-bold text-emerald-700 tracking-wide uppercase">About BioGen AI</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-5">
              A Student-Led Initiative<br />for a <span className="text-emerald-600">Healthier Tomorrow.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-500 text-[15.5px] leading-relaxed max-w-lg mb-8">
              BioGen AI is a research-focused platform that combines computational protein design,
              simulation, and analysis tools to make advanced biotechnology more accessible for
              researchers, students, and the scientific community.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: BookOpen, label: 'Research Driven' },
                { icon: Users, label: 'Student Led' },
                { icon: Code2, label: 'Open Science' },
                { icon: Globe, label: 'Real-World Impact' },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <b.icon size={15} strokeWidth={1.75} />
                  </span>
                  <span className="text-[12px] font-semibold text-slate-600 leading-tight">{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <HeroVisual
              pdbId="1UBQ"
              colorscheme="greenCarbon"
              handNote={'AI discovers\nnew possibilities\nfor better therapeutics'}
              checklist={['AI-generated peptides', 'Target-specific design', 'High binding potential', 'Faster discovery']}
            />
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">Our Story</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            BioGen AI started as a student-driven initiative with a simple idea — to make powerful
            computational tools for protein and peptide design more accessible, especially for the
            research and academic community. We believe that by combining the power of AI with
            biological insight, we can accelerate scientific discovery and contribute to a healthier future.
          </p>
        </motion.div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="relative max-w-6xl mx-auto px-6 pb-20">
        <IconGrid columns={3} items={[
          { icon: Target, title: 'Our Mission', desc: 'To empower researchers and students with accessible computational tools for protein and peptide design.' },
          { icon: Eye, title: 'Our Vision', desc: 'A future where AI-driven protein design accelerates the discovery of safer and more effective therapeutics.' },
          { icon: Heart, title: 'Our Values', desc: 'Science, collaboration, open access, and a passion for solving real biological problems.' },
        ]} />
      </section>

      {/* Team (placeholder) */}
      <section className="relative max-w-6xl mx-auto px-6 pb-20">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}
          className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Meet the Team</h2>
          <p className="text-slate-500 text-[15px]">A small but passionate team working to bring computational protein design to the research community.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {TEAM.map((m, i) => (
            <motion.div key={m.role} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={fadeUpVariant}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-slate-200 p-6 flex gap-5 bg-white">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                <User size={26} strokeWidth={1.5} />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-black text-[15px] text-slate-900">Team Member</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">{m.role}</span>
                </div>
                <p className="text-[12px] text-slate-500 font-medium mb-2">{m.focus}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-3">{m.bio}</p>
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[12.5px] font-bold text-emerald-700 hover:text-emerald-800">
                  View GitHub Profile <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-black tracking-tight mb-2">Get in Touch</h2>
            <p className="text-slate-500 text-[14px] mb-6">Have questions, suggestions, or ideas? We&rsquo;d love to hear from you.</p>

            {sent ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[13.5px] text-emerald-800">
                  Your email client should have opened with this message pre-filled — send it from there and we&rsquo;ll get back to you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                  <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-lg border border-slate-300 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100" />
                </div>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                  <option>General Inquiry</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Research Collaboration</option>
                </select>
                <textarea required rows={5} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none" />
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                  <Send size={15} /> Send Message
                </button>
                <p className="text-center text-[11.5px] text-slate-400">Opens your email client — we typically respond within 2-3 business days.</p>
              </form>
            )}
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={fadeUpVariant} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 space-y-5 h-fit">
            <h3 className="font-bold text-[14px] text-slate-800">Other Ways to Connect</h3>
            {[
              { icon: Code2, title: 'GitHub', desc: 'Check out our repositories, open issues, or start a discussion.', href: REPO_URL },
              { icon: MessageSquare, title: 'Discussions', desc: 'We are open to collaborations, research discussions, and feedback from the community.', href: `${REPO_URL}/discussions` },
              { icon: Mail, title: 'General Inquiries', desc: 'Feel free to reach out through the contact form.', href: `mailto:${CONTACT_EMAIL}` },
            ].map((item) => (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shrink-0"><item.icon size={16} /></span>
                <div>
                  <p className="text-[13px] font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{item.title}</p>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </a>
            ))}
            <div className="border-t border-emerald-100 pt-4 flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shrink-0"><Lightbulb size={16} /></span>
              <div>
                <p className="text-[13px] font-bold text-slate-800 mb-1">Have a Question or Feature Request?</p>
                <p className="text-[12px] text-slate-500 leading-relaxed mb-2">Help us improve BioGen AI! Share your ideas, report issues, or suggest new features on our GitHub.</p>
                <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] font-bold rounded-lg border border-emerald-300 px-3 py-1.5 text-emerald-700 hover:bg-white transition-colors">
                  Open GitHub Issues <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
