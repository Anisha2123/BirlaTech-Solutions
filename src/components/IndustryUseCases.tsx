import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Google Fonts ──────────────────────────────────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
─────────────────────────────────────────────────────────────────────────── */

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconArrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const industries = [
  {
    id: 'ecommerce', idx: '01', label: 'E-Commerce & Retail', category: 'Commerce',
    tag: 'Storefronts that convert at scale.',
    hook: "From boutique DTC brands to multi-SKU retailers — we build digital retail experiences that turn browsers into buyers and buyers into advocates.",
    stats: [{ v: '35%', l: 'Avg. conversion lift' }, { v: '2.1s', l: 'Median load time' }, { v: '4.8×', l: 'ROAS on paid social' }],
    deliverables: ['Custom storefront design & dev', 'Product page CRO', 'Abandoned cart social retargeting', 'Influencer campaign management', 'Multi-platform ad creative'],
    insight: "The brands that win in e-commerce don't just sell — they build communities. Every touchpoint we design works toward that compounding effect.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
  },
  {
    id: 'fintech', idx: '02', label: 'FinTech & Finance', category: 'Finance',
    tag: 'Trust-first digital presence.',
    hook: "Financial brands live or die on credibility. We craft digital experiences and content strategies that communicate authority without sacrificing approachability.",
    stats: [{ v: '62%', l: 'Increase in qualified leads' }, { v: '99.9%', l: 'Uptime SLA' }, { v: '3.2×', l: 'Organic reach growth' }],
    deliverables: ['Compliance-aware content strategy', 'LinkedIn & thought leadership', 'Landing page & funnel design', 'Data visualization dashboards', 'SEO for regulated terms'],
    insight: "In finance, clarity IS the product. We translate complex offerings into narratives that build trust at every scroll depth.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  },
  {
    id: 'saas', idx: '03', label: 'SaaS & Tech', category: 'Tech',
    tag: 'Growth infrastructure for software.',
    hook: "Acquisition, activation, retention — we partner with SaaS companies at every funnel stage, from first impression to product-led expansion loops.",
    stats: [{ v: '41%', l: 'Reduction in CAC' }, { v: '5.7×', l: 'Trial-to-paid lift' }, { v: '280%', l: 'LinkedIn follower growth' }],
    deliverables: ['Product marketing web pages', 'Developer-focused content', 'Onboarding flow design', 'PLG social campaigns', 'Competitive positioning'],
    insight: "SaaS buyers do 70% of their research before talking to sales. We make sure every piece of your digital presence does selling while you sleep.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /></svg>,
  },
  {
    id: 'health', idx: '04', label: 'Health & Wellness', category: 'Health',
    tag: 'Brands built on credibility & care.',
    hook: "Health audiences demand authenticity above all. We craft compliant, compassionate digital strategies that educate, engage, and convert with integrity.",
    stats: [{ v: '8.9×', l: 'Engagement rate avg.' }, { v: '100%', l: 'HIPAA-aware content' }, { v: '190%', l: 'Community growth (3mo)' }],
    deliverables: ['Patient-facing web experiences', 'Health content & SEO strategy', 'Instagram & TikTok management', 'Practitioner thought leadership', 'Email nurture design'],
    insight: "People make health decisions based on who they trust. Our job is to make sure that trust lands on your brand, not your competitor's.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  },
  {
    id: 'realestate', idx: '05', label: 'Real Estate', category: 'Property',
    tag: 'Listings that generate inbound.',
    hook: "Real estate is hyper-local and hyper-visual. We build digital presences that capture attention in crowded feeds and convert it into qualified inquiries.",
    stats: [{ v: '3.4×', l: 'Inbound lead growth' }, { v: '48h', l: 'Content turnaround' }, { v: '220%', l: 'Organic profile reach' }],
    deliverables: ['Property landing page design', 'Listing social campaigns', 'Agent personal brand strategy', 'Video & reel production briefs', 'Local SEO & GMB optimization'],
    insight: "Buyers scroll Instagram before they call an agent. We make sure your listings — and your name — are what stops their thumb.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  {
    id: 'hospitality', idx: '06', label: 'Travel & Hospitality', category: 'Travel',
    tag: 'Experiences sold before arrival.',
    hook: "In travel, desire precedes decision. We create aspirational digital campaigns and seamless booking experiences that capture intent and drive direct reservations.",
    stats: [{ v: '55%', l: 'Direct booking increase' }, { v: '12×', l: 'UGC campaign reach' }, { v: '4.9★', l: 'Review profile avg.' }],
    deliverables: ['Destination website design', 'Visual-first social strategy', 'UGC & influencer activations', 'Email & loyalty campaigns', 'Google & Meta ad creative'],
    insight: "The trip is sold in the scroll. Every piece of content we create is designed to make someone close their laptop and book.",
    icon: (size: number) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  },
];

type Industry = typeof industries[0];

const C = { rose: '#853953', plum: '#612D53', dark: '#2C2C2C', bg: '#F3F4F4' };

// ─── Shared Modal ─────────────────────────────────────────────────────────────

function IndustryModal({ industry, onClose }: { industry: Industry | null; onClose: () => void }) {
  useEffect(() => {
    if (!industry) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [industry, onClose]);

  if (!industry) return null;

  return (
    <AnimatePresence>
      {industry && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(44,44,44,0.7)',
            backdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '0',
          }}
          className="sm:!items-center sm:!p-6"
        >
          <motion.div
            initial={{ y: 60, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            onClick={e => e.stopPropagation()}
            className="w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto relative"
            style={{ background: C.bg, borderRadius: '1.5rem 1.5rem 0 0', boxShadow: '0 60px 120px rgba(44,44,44,0.26)' }}
          >
            {/* Gradient bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${C.rose}, ${C.plum})`, borderRadius: '1.5rem 1.5rem 0 0' }} />

            {/* Drag handle (mobile only) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div style={{ width: '2.5rem', height: '3px', borderRadius: '999px', background: 'rgba(44,44,44,0.15)' }} />
            </div>

            <div style={{ padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
              {/* Header */}
              <div className="flex justify-between items-start gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-[.14em] uppercase"
                    style={{ background: 'rgba(133,57,83,0.1)', color: C.rose, fontFamily: 'monospace' }}>
                    {industry.idx} / Industry
                  </div>
                  <h3 className="font-bold leading-tight m-0"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.65rem,3.5vw,2.4rem)', color: C.dark }}>
                    {industry.label}
                  </h3>
                </div>
                <button onClick={onClose}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all shrink-0 hover:bg-[#2C2C2C] hover:text-[#F3F4F4] hover:border-[#2C2C2C]"
                  style={{ border: '1px solid rgba(44,44,44,0.12)', background: 'white', color: '#666', cursor: 'pointer' }}>
                  <IconX />
                </button>
              </div>

              {/* Hook */}
              <p className="text-sm leading-relaxed mb-6 pb-6 border-b" style={{ color: '#555', borderColor: 'rgba(44,44,44,0.07)' }}>
                {industry.hook}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl mb-6"
                style={{ background: 'rgba(44,44,44,0.07)' }}>
                {industry.stats.map((s, i) => (
                  <div key={i} className="text-center py-5 px-2" style={{ background: C.bg }}>
                    <div className="font-bold leading-none mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: C.rose }}>
                      {s.v}
                    </div>
                    <div className="text-[10px] text-[#aaa] uppercase tracking-[.08em]">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Deliverables + Insight */}
              <div className="grid gap-5 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
                <div>
                  <p className="text-[10px] uppercase tracking-[.15em] mb-3" style={{ color: '#bbb', fontFamily: 'monospace' }}>
                    What we deliver
                  </p>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2">
                    {industry.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: '#333' }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: C.rose }}>
                          <IconCheck />
                        </div>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl p-5 flex flex-col justify-center"
                  style={{ background: 'white', borderLeft: `3px solid ${C.rose}` }}>
                  <p className="text-[10px] uppercase tracking-[.15em] mb-3" style={{ color: '#bbb', fontFamily: 'monospace' }}>
                    Our take
                  </p>
                  <p className="text-sm leading-relaxed italic m-0" style={{ color: C.dark }}>
                    "{industry.insight}"
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-5 border-t"
                style={{ borderColor: 'rgba(44,44,44,0.07)' }}>
                <span className="text-xs" style={{ color: '#ccc', fontFamily: 'monospace' }}>
                  Ready to grow in this space?
                </span>
                <a href="#contact" onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white text-xs font-semibold uppercase tracking-[.06em] transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`, textDecoration: 'none' }}>
                  Let's talk <IconArrow size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── DESKTOP — original, untouched ───────────────────────────────────────────

function DesktopRow({ industry, index, onOpen }: { industry: Industry; index: number; onOpen: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(industry)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `1.5rem 0 1.5rem ${hovered ? '0.75rem' : '0'}`,
        borderBottom: '1px solid rgba(44,44,44,0.08)',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'padding .3s ease',
      }}
    >
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: `linear-gradient(180deg, ${C.rose}, ${C.plum})`,
          transformOrigin: 'top', borderRadius: '0 2px 2px 0',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: hovered ? C.rose : '#ccc', letterSpacing: '.1em', minWidth: 24, transition: 'color .3s' }}>
          {industry.idx}
        </span>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: hovered ? 'rgba(133,57,83,0.1)' : 'white',
          color: hovered ? C.rose : '#bbb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${hovered ? 'rgba(133,57,83,0.2)' : 'rgba(44,44,44,0.06)'}`,
          transition: 'all .3s', flexShrink: 0,
        }}>
          {industry.icon(24)}
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem,2vw,1.4rem)',
            fontWeight: 700, color: hovered ? C.dark : '#444',
            margin: 0, transition: 'color .3s', letterSpacing: '-.01em',
          }}>
            {industry.label}
          </h3>
          <p style={{ fontSize: '.8rem', color: hovered ? C.rose : '#bbb', margin: 0, transition: 'color .3s', fontFamily: 'monospace', letterSpacing: '.03em' }}>
            {industry.tag}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', flexShrink: 0 }}>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(133,57,83,0.08)',
            padding: '5px 12px', borderRadius: '100px',
            color: C.rose, fontSize: '.8rem', fontWeight: 600, whiteSpace: 'nowrap',
          }}
        >
          {industry.stats[0].v}
          <span style={{ fontSize: 10, color: '#aaa', fontWeight: 400 }}>{industry.stats[0].l}</span>
        </motion.div>
        <motion.div animate={{ x: hovered ? 4 : 0, color: hovered ? C.rose : '#ccc' }} transition={{ duration: 0.25 }} style={{ color: '#ccc' }}>
          <IconArrow size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function DesktopLayout({ onOpen }: { onOpen: (i: Industry) => void }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section style={{
      background: C.bg,
      padding: 'clamp(5rem,9vw,9rem) clamp(1.5rem,7vw,6rem)',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(ellipse 55% 40% at 5% 70%,rgba(133,57,83,.06) 0%,transparent 100%),radial-gradient(ellipse 40% 35% at 95% 10%,rgba(97,45,83,.07) 0%,transparent 100%)`,
      }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }} ref={headerRef}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', alignItems: 'end', marginBottom: 'clamp(3rem,6vw,5.5rem)' }}>
          <div>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <div style={{ width: 24, height: 2, background: C.rose }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: C.rose, letterSpacing: '.35em', textTransform: 'uppercase', fontWeight: 700 }}>Industries</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 28 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.8rem,5.5vw,4.8rem)', fontWeight: 700, color: C.dark, lineHeight: 1.05, margin: 0, letterSpacing: '-.02em' }}>
              We speak<br /><em style={{ color: C.rose }}>your industry.</em>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}>
            <p style={{ fontSize: '.97rem', color: '#888', lineHeight: 1.85, margin: '0 0 1.75rem', paddingLeft: '1.5rem', borderLeft: '2px solid rgba(133,57,83,0.2)' }}>
              Generic agencies apply generic playbooks. We don't. Every industry below comes with a dedicated strategy — built around how your customers actually discover, evaluate, and buy.
            </p>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              {['6 Verticals', 'Tailored Strategy', 'Proven Results'].map((chip, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={headerInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                  style={{ padding: '5px 14px', background: i === 0 ? C.dark : 'white', color: i === 0 ? C.bg : '#888', borderRadius: '100px', fontSize: 11, fontFamily: 'monospace', letterSpacing: '.06em', border: `1px solid ${i === 0 ? C.dark : 'rgba(44,44,44,0.1)'}` }}>
                  {chip}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '.75rem', borderBottom: '1px solid rgba(44,44,44,0.1)', marginBottom: '.25rem' }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#ccc', letterSpacing: '.15em', textTransform: 'uppercase' }}>Sector</span>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#ccc', letterSpacing: '.15em', textTransform: 'uppercase' }}>Key metric / Action</span>
        </div>

        {industries.map((ind, i) => <DesktopRow key={ind.id} industry={ind} index={i} onOpen={onOpen} />)}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '.82rem', color: '#ccc', margin: 0, fontFamily: 'monospace' }}>Don't see your industry? We likely work with it.</p>
          <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-4"
            style={{ color: C.rose, textDecoration: 'none', letterSpacing: '.03em' }}>
            Get in touch <IconArrow size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TABLET — hybrid 2-col card grid ─────────────────────────────────────────

function TabletLayout({ onOpen }: { onOpen: (i: Industry) => void }) {
  return (
    <section style={{ background: C.bg, padding: '3rem 1.75rem 4rem', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
            <div style={{ height: 1, width: '1.8rem', background: C.rose }} />
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.28em', color: C.rose }}>Industries</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 700, color: C.dark, lineHeight: 1.06, letterSpacing: '-.02em', marginBottom: '.75rem' }}>
            We speak <em style={{ color: C.rose }}>your industry.</em>
          </h2>
          <p style={{ fontSize: '.87rem', color: '#999', fontWeight: 300, lineHeight: 1.7, maxWidth: 520, borderLeft: '2px solid rgba(133,57,83,.18)', paddingLeft: '1rem', marginBottom: '1.25rem' }}>
            Dedicated strategies for each vertical — built around how your customers actually discover, evaluate, and buy.
          </p>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
            {['6 Verticals', 'Tailored Strategy', 'Proven Results'].map((c, i) => (
              <span key={i} style={{ padding: '.3rem .85rem', borderRadius: '999px', fontSize: 11, fontWeight: 500, border: '1px solid', borderColor: i === 0 ? C.dark : 'rgba(133,57,83,0.18)', background: i === 0 ? C.dark : 'transparent', color: i === 0 ? C.bg : '#aaa' }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {industries.map((ind, i) => (
            <motion.div key={ind.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              onClick={() => onOpen(ind)}
              style={{ background: '#fff', borderRadius: '1.25rem', border: '1px solid rgba(133,57,83,0.09)', padding: '1.25rem', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.9rem' }}>
                <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '.7rem', background: 'rgba(133,57,83,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {ind.icon(16)}
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(133,57,83,0.4)', marginLeft: 'auto' }}>{ind.idx}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700, color: C.dark, marginBottom: '.25rem', lineHeight: 1.2 }}>{ind.label}</h3>
              <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300, marginBottom: '.75rem' }}>{ind.tag}</p>
              <div style={{ display: 'flex', gap: '.6rem' }}>
                {ind.stats.slice(0, 2).map((s, j) => (
                  <div key={j} style={{ flex: 1, background: 'rgba(133,57,83,0.05)', borderRadius: '.6rem', padding: '.5rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 700, color: C.rose, lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.1em', color: '#bbb' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '.9rem', paddingTop: '.9rem', borderTop: '1px solid rgba(133,57,83,0.07)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.14em', color: C.rose }}>View Details</span>
                <div style={{ width: '1.8rem', height: '1.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(133,57,83,0.08)' }}>
                  <IconArrow size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MOBILE — high-density app UI ────────────────────────────────────────────

function MobileLayout({ onOpen }: { onOpen: (i: Industry) => void }) {
  const [activeCat, setActiveCat] = useState('All');
  const cats = ['All', ...Array.from(new Set(industries.map(i => i.category)))];
  const filtered = activeCat === 'All' ? industries : industries.filter(i => i.category === activeCat);

  // shared card style pieces
  const iconBox: React.CSSProperties = {
    width: 40, height: 40, borderRadius: 11,
    background: 'rgba(133,57,83,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };
  const statChip: React.CSSProperties = {
    flex: 1, background: 'rgba(133,57,83,0.05)',
    borderRadius: 9, padding: '7px 6px', textAlign: 'center',
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: C.bg }}>

      {/* ── Nav ── */}
      <div style={{ background: C.bg, padding: '14px 16px 10px', borderBottom: '1px solid rgba(133,57,83,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-block' }}>
            <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: C.rose, opacity: .7 }} />
            <span style={{ position: 'relative', display: 'block', width: 8, height: 8, borderRadius: '50%', background: C.rose }} />
          </span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: C.dark, lineHeight: 1 }}>
            We speak <em style={{ color: C.rose }}>your industry.</em>
          </span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '.12em', padding: '5px 11px', borderRadius: 999, background: 'rgba(133,57,83,.1)', color: C.rose }}>
          6 Sectors
        </span>
      </div>

      {/* ── Hero strip ── */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid rgba(133,57,83,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: C.dark, lineHeight: 1.08, letterSpacing: '-.02em' }}>
            Dedicated strategies<br />for <em style={{ color: C.rose }}>every vertical.</em>
          </h2>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: 'rgba(133,57,83,.12)', lineHeight: 1 }}>06</span>
        </div>
        <p style={{ fontSize: 12, color: '#999', fontWeight: 300, lineHeight: 1.5, maxWidth: 220 }}>
          Built around how your customers discover, evaluate, and buy.
        </p>
      </div>

      {/* ── Trust chips ── */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '12px 16px 14px', scrollbarWidth: 'none' as any }}>
        {[
          { label: 'Tailored strategy', ico: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
          { label: 'Proven ROI',        ico: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
          { label: 'NDA available',     ico: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
          { label: '48h turnaround',    ico: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.rose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
        ].map(c => (
          <div key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: '#fff', border: '1px solid rgba(133,57,83,.12)', flexShrink: 0 }}>
            {c.ico}
            <span style={{ fontSize: 11, fontWeight: 500, color: C.dark, whiteSpace: 'nowrap' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div style={{ display: 'flex', gap: 5, overflowX: 'auto', padding: '10px 16px', borderBottom: '1px solid rgba(133,57,83,.08)', borderTop: '1px solid rgba(133,57,83,.08)', scrollbarWidth: 'none' as any }}>
        {cats.map(c => (
          <button key={c} onClick={() => setActiveCat(c)} style={{
            padding: '5px 13px', borderRadius: 999, fontSize: 11, fontWeight: 500, lineHeight: 1.4,
            border: `1px solid ${activeCat === c ? C.rose : 'rgba(133,57,83,.18)'}`,
            background: activeCat === c ? 'rgba(133,57,83,.1)' : 'transparent',
            color: activeCat === c ? C.rose : '#bbb',
            flexShrink: 0, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
            transition: 'all .15s', WebkitTapHighlightColor: 'transparent',
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* ── Cards ── */}
      <div style={{ padding: '12px 16px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCat} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpen(ind)}
                style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(133,57,83,.09)', overflow: 'hidden', cursor: 'pointer' }}
              >
                {/* Card top */}
                <div style={{ padding: '14px 14px 12px', display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                  <div style={iconBox}>{ind.icon(18)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: C.dark, lineHeight: 1.15, flex: 1, minWidth: 0 }}>
                        {ind.label}
                      </h3>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(133,57,83,.35)', flexShrink: 0 }}>{ind.idx}</span>
                    </div>
                    <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300, lineHeight: 1.3, marginBottom: 10 }}>{ind.tag}</p>
                    {/* Stats trio */}
                    <div style={{ display: 'flex', gap: 6 }}>
                      {ind.stats.map((s, j) => (
                        <div key={j} style={statChip}>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 700, color: C.rose, lineHeight: 1, marginBottom: 2 }}>{s.v}</div>
                          <div style={{ fontSize: 9, textTransform: 'uppercase' as const, letterSpacing: '.07em', color: '#bbb', lineHeight: 1.2 }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderTop: '1px solid rgba(133,57,83,.07)', background: 'rgba(133,57,83,.018)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(133,57,83,.6)' }}>{ind.deliverables.length} deliverables</span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(133,57,83,.3)', display: 'inline-block' }} />
                    <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: '#bbb' }}>{ind.category}</span>
                  </div>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(133,57,83,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconArrow size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom CTA bar ── */}
      <div style={{ background: '#fff', borderTop: '1px solid rgba(133,57,83,.12)', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.dark, margin: 0, lineHeight: 1.4 }}>Don't see your industry?</p>
          <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300, margin: 0 }}>We likely work with it.</p>
        </div>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 18px', borderRadius: 999,
          background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
          whiteSpace: 'nowrap', textDecoration: 'none', flexShrink: 0,
        }}>
          Let's talk <IconArrow size={13} />
        </a>
      </div>

    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function IndustryUseCases() {
  const [activeModal, setActiveModal] = useState<Industry | null>(null);

  return (
    <>
      {/* Desktop: ≥1024 */}
      <div className="hidden lg:block">
        <DesktopLayout onOpen={setActiveModal} />
      </div>

      {/* Tablet: 768–1023 */}
      <div className="hidden md:block lg:hidden">
        <TabletLayout onOpen={setActiveModal} />
      </div>

      {/* Mobile: <768 */}
      <div className="md:hidden">
        <MobileLayout onOpen={setActiveModal} />
      </div>

      {/* Modal — shared */}
      <IndustryModal industry={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}