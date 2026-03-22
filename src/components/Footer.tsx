import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Instagram, MessageCircle, Calendar, MapPin, ArrowUpRight } from 'lucide-react';

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      '#2C2C2C',
  surface: 'rgba(243,244,244,0.04)',
  border:  'rgba(243,244,244,0.08)',
  rose:    '#853953',
  plum:    '#612D53',
  cream:   '#F3F4F4',
  muted:   'rgba(243,244,244,0.38)',
  faint:   'rgba(243,244,244,0.12)',
};

// ─── Stagger helpers ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// ─── Sub-components ───────────────────────────────────────────────────────────
const SocialBtn = ({ href, icon, label }) => (
  <motion.a
    href={href} target="_blank" rel="noreferrer" aria-label={label}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.93 }}
    style={{
      width: 42, height: 42, borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.surface,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: C.muted, textDecoration: 'none',
      transition: 'background 0.25s, color 0.25s, border-color 0.25s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = C.rose;
      e.currentTarget.style.color = C.cream;
      e.currentTarget.style.borderColor = C.rose;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = C.surface;
      e.currentTarget.style.color = C.muted;
      e.currentTarget.style.borderColor = C.border;
    }}
  >
    {icon}
  </motion.a>
);

const NavLink = ({ href, label, delay }) => (
  <motion.li {...fadeUp(delay)} style={{ listStyle: 'none' }}>
    <a
      href={href}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        color: C.muted, textDecoration: 'none',
        fontSize: '0.875rem', fontFamily: '"DM Sans", sans-serif',
        fontWeight: 400, letterSpacing: '0.01em',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = C.cream;
        e.currentTarget.querySelector('span.bar').style.width = '18px';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = C.muted;
        e.currentTarget.querySelector('span.bar').style.width = '0px';
      }}
    >
      <span className="bar" style={{
        display: 'inline-block', height: 1,
        width: 0, background: C.rose,
        transition: 'width 0.28s ease',
        flexShrink: 0,
      }} />
      {label}
    </a>
  </motion.li>
);

// ─── Animated divider line ────────────────────────────────────────────────────
const Divider = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ position: 'relative', height: 1, background: C.border, overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(90deg, ${C.rose}, ${C.plum}, transparent)`,
        }}
      />
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
        rel="stylesheet"
      />

      <footer style={{
        background: C.bg,
        fontFamily: '"DM Sans", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* ── Ambient glows ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(ellipse 50% 60% at 0% 100%, rgba(133,57,83,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 35% 40% at 100% 0%, rgba(97,45,83,0.14) 0%, transparent 60%)
          `,
        }} />

        {/* ── CTA Banner ── */}
        <motion.div
          {...fadeUp(0)}
          style={{
            borderBottom: `1px solid ${C.border}`,
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 7vw, 6rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
          }}
        >
          <div>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px',
              color: C.rose, letterSpacing: '0.35em',
              textTransform: 'uppercase', fontWeight: 700,
              marginBottom: '0.75rem',
            }}>
              Ready to grow?
            </p>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 700, color: C.cream,
              lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em',
            }}>
              Let's build something<br />
              <em style={{ color: C.rose }}>worth remembering.</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <motion.a
              href="https://calendly.com/birlaani/new-meeting"
              target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                color: C.cream, textDecoration: 'none',
                padding: '0.9rem 2rem', borderRadius: '100px',
                fontSize: '0.82rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                boxShadow: `0 12px 40px rgba(133,57,83,0.3)`,
              }}
            >
              <Calendar size={16} />
              Book a discovery call
            </motion.a>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ position: 'relative', width: 8, height: 8 }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: '#4ade80', opacity: 0.7,
                  animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
                }} />
                <span style={{
                  position: 'relative', display: 'block',
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#22c55e',
                }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Accepting new projects
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Main grid ── */}
        <div style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 7vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          position: 'relative',
        }}>

          {/* Brand column */}
          <motion.div {...fadeUp(0.05)} style={{ gridColumn: 'span 1' }}>
            {/* Logo */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: '1.5rem' }}
            >
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 8px 24px rgba(133,57,83,0.35)`,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6a8 8 0 010 16H6V4z" stroke="#F3F4F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 4v16" stroke="#F3F4F4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <div>
                <div style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.25rem', fontWeight: 700,
                  color: C.cream, lineHeight: 1, letterSpacing: '-0.01em',
                }}>
                  Dev<span style={{ color: C.rose }}>lyn</span>
                </div>
                <div style={{
                  fontFamily: 'monospace', fontSize: '8px',
                  color: C.muted, letterSpacing: '0.3em',
                  textTransform: 'uppercase', marginTop: 3,
                }}>
                  Digital Agency
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.875rem', color: C.muted,
              lineHeight: 1.8, marginBottom: '1.75rem',
              maxWidth: 280,
            }}>
              We craft high-performance web experiences and social strategies that turn attention into measurable growth.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialBtn href="https://www.linkedin.com/company/devlynwebs/" icon={<Linkedin size={17} />} label="LinkedIn" />
              <SocialBtn href="https://wa.me/916307255290" icon={<MessageCircle size={17} />} label="WhatsApp" />
              <SocialBtn href="https://www.instagram.com/devlyn408/" icon={<Instagram size={17} />} label="Instagram" />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div {...fadeUp(0.1)}>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
              color: C.rose, letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Navigate
            </p>
            <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <NavLink href="#home"       label="Home"       delay={0.11} />
              <NavLink href="#industries" label="Industries" delay={0.13} />
              <NavLink href="#services"   label="Services"   delay={0.15} />
              <NavLink href="#contact"    label="Contact"    delay={0.17} />
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div {...fadeUp(0.14)}>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
              color: C.rose, letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Services
            </p>
            <ul style={{ padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Web Development', 'Social Media', 'Brand Systems', 'Growth & SEO', 'Content Strategy'].map((s, i) => (
                <NavLink key={s} href="#services" label={s} delay={0.14 + i * 0.02} />
              ))}
            </ul>
          </motion.div>

          {/* Presence */}
          <motion.div {...fadeUp(0.18)}>
            <p style={{
              fontFamily: 'monospace', fontSize: '10px', fontWeight: 700,
              color: C.rose, letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Presence
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Location */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: C.rose, marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', color: C.cream, fontWeight: 500, marginBottom: 2 }}>
                    India — HQ
                  </div>
                  <div style={{ fontSize: '0.78rem', color: C.muted }}>
                    Remote-first · Worldwide
                  </div>
                </div>
              </div>

              {/* Schedule card */}
              <motion.a
                href="https://calendly.com/birlaani/new-meeting"
                target="_blank" rel="noreferrer"
                whileHover={{ x: 3 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.875rem 1rem',
                  borderRadius: 14,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  textDecoration: 'none',
                  color: C.cream,
                  transition: 'border-color 0.25s, background 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.rose;
                  e.currentTarget.style.background = 'rgba(133,57,83,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.surface;
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={15} style={{ color: C.rose }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.04em' }}>
                    Schedule a call
                  </span>
                </div>
                <ArrowUpRight size={14} style={{ color: C.muted }} />
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* ── Divider ── */}
        <div style={{ padding: '0 clamp(1.5rem, 7vw, 6rem)' }}>
          <Divider />
        </div>

        {/* ── Legal bar ── */}
        <div style={{
          padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 7vw, 6rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
        }}>
          <motion.span
            {...fadeUp(0.22)}
            style={{ fontFamily: 'monospace', fontSize: '10px', color: C.faint, letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            © {year} Devlyn Solutions. All rights reserved.
          </motion.span>

          <motion.div
            {...fadeUp(0.24)}
            style={{ display: 'flex', gap: '2rem' }}
          >
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <span
                key={t}
                style={{
                  fontFamily: 'monospace', fontSize: '10px',
                  color: C.faint, letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = C.rose}
                onMouseLeave={e => e.currentTarget.style.color = C.faint}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Large watermark text ── */}
        <div style={{
          position: 'absolute', bottom: -10, left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(5rem, 14vw, 11rem)',
          fontWeight: 700,
          color: 'rgba(243,244,244,0.025)',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
          userSelect: 'none', pointerEvents: 'none',
          lineHeight: 1,
        }}>
          DEVLYN
        </div>

        {/* ping keyframe */}
        <style>{`
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}</style>

      </footer>
    </>
  );
};

export default Footer;