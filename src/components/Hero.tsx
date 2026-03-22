import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, MousePointer2, Zap, Globe, TrendingUp, Users, Star, ChevronDown } from 'lucide-react';

/* ─── Fonts (add to your index.html <head>) ─────────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
──────────────────────────────────────────────────────────────────────────── */

const COLORS = {
  bg: '#F3F4F4',
  rose: '#853953',
  plum: '#612D53',
  dark: '#2C2C2C',
};

/* ── Animated counter ──────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = animate(0, to, {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.round(v)),
          });
          observer.disconnect();
          return () => controls.stop();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Marquee strip ─────────────────────────────────────────────────────── */
const TAGS = [
  'Web Development', 'SEO Strategy', 'Social Media', 'Brand Identity',
  'Performance Ads', 'UI/UX Design', 'Content Marketing', 'Analytics',
];
function Marquee() {
  const items = [...TAGS, ...TAGS];
  return (
    <div className="relative overflow-hidden py-3" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: COLORS.rose }}>
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: COLORS.rose }} />
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Floating pill ─────────────────────────────────────────────────────── */
function Pill({ icon: Icon, label, sub, delay = 0, className = '' }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04 }}
      className={`absolute backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl pointer-events-none select-none ${className}`}
      style={{ background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(133,57,83,0.12)' }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.plum})` }}>
        <Icon size={14} color="#fff" />
      </div>
      <div>
        <p className="text-[11px] font-semibold leading-none mb-0.5" style={{ color: COLORS.dark }}>{label}</p>
        <p className="text-[10px] leading-none" style={{ color: '#888' }}>{sub}</p>
      </div>
    </motion.div>
  );
}

/* ── Main Hero ──────────────────────────────────────────────────────────── */
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const springY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      springX.set((e.clientX - cx) / cx * 18);
      springY.set((e.clientY - cy) / cy * 18);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    animate(window.scrollY, el.getBoundingClientRect().top + window.pageYOffset - 80, {
      type: 'spring', stiffness: 120, damping: 25, mass: 0.5, restDelta: 0.5,
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };

  const stats = [
    { n: 230, suffix: '+', label: 'Projects Delivered' },
    { n: 98, suffix: '%', label: 'Client Satisfaction' },
    { n: 12, suffix: 'x', label: 'Avg. ROI Growth' },
    { n: 40, suffix: 'M+', label: 'Impressions Generated' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: COLORS.bg, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Grain texture overlay ── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', opacity: 0.6 }} />

      {/* ── Gradient orbs ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ x: springX, y: springY }}
          className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-20"
          style={{ background: COLORS.rose }} />
        <motion.div style={{ x: springX, y: springY }}
          className="absolute bottom-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full blur-[100px] opacity-10"
          style={{ background: COLORS.plum }} />
      </motion.div>

      {/* ── Geometric accent lines ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <line x1="400" y1="0" x2="0" y2="800" stroke={COLORS.dark} strokeWidth="1"/>
          <line x1="350" y1="0" x2="-50" y2="800" stroke={COLORS.dark} strokeWidth="1"/>
          <line x1="450" y1="0" x2="50" y2="800" stroke={COLORS.dark} strokeWidth="1"/>
        </svg>
        {/* Decorative circle */}
        <div className="absolute top-8 right-8 w-32 h-32 rounded-full border opacity-[0.08]"
          style={{ borderColor: COLORS.rose }} />
        <div className="absolute top-12 right-12 w-20 h-20 rounded-full border opacity-[0.06]"
          style={{ borderColor: COLORS.rose }} />
      </div>

      {/* ── Navbar placeholder spacing ── */}
      <div className="h-20 shrink-0" />

      {/* ── Main content ── */}
      <motion.div style={{ opacity }} className="relative z-10 flex-1 flex flex-col">

        

        {/* ─── Hero body ─────────────────────────────────────────────── */}
        <div className="flex-1 grid lg:grid-cols-[1fr_0.85fr] gap-0 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-5 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-6 lg:gap-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ background: 'rgba(133,57,83,0.08)', color: COLORS.rose, border: `1px solid rgba(133,57,83,0.18)` }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: COLORS.rose }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: COLORS.rose }} />
              </span>
              Digital Growth Partners
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-bold leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(2.8rem, 6vw, 3.5rem)',
                  color: COLORS.dark,
                }}
              >
                We Build
                <br />
                <em style={{ color: COLORS.rose, fontStyle: 'italic' }}>Brands</em> That
                <br />
                <span className="relative inline-block">
                  Dominate.
                  {/* Underline decoration */}
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 400 12" fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.path
                      d="M 0 8 Q 100 2 200 8 Q 300 14 400 8"
                      stroke={COLORS.rose} strokeWidth="2.5" strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </motion.svg>
                </span>
              </motion.h1>
            </div>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg leading-relaxed max-w-[520px]"
              style={{ color: '#6B6B6B', fontWeight: 300 }}
            >
              Custom web experiences. High-converting social campaigns.
              We engineer full-spectrum digital growth for brands ready to lead their market.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo('contact')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-medium text-sm overflow-hidden transition-transform hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.plum})`, color: '#fff', boxShadow: `0 8px 32px rgba(133,57,83,0.35)` }}
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowUpRight size={16} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                {/* Shimmer */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12), transparent)' }} />
              </button>

              <button
                onClick={() => scrollTo('work')}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-medium text-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ color: COLORS.dark, border: `1.5px solid rgba(44,44,44,0.18)`, background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = COLORS.rose)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(44,44,44,0.18)')}
              >
                View Our Work
                <span className="w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(133,57,83,0.08)' }}>
                  <ChevronDown size={11} style={{ color: COLORS.rose }} />
                </span>
              </button>
            </motion.div>

            {/* Client trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex -space-x-2">
                {['#853953','#612D53','#2C2C2C','#853953'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: c, borderColor: COLORS.bg }}>
                    {['A','B','C','D'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={COLORS.rose} color={COLORS.rose} />)}
                </div>
                <p className="text-[11px]" style={{ color: '#888' }}>Trusted by <strong style={{ color: COLORS.dark }}>230+ brands</strong> worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual card + floating pills */}
          <div className="relative hidden lg:flex items-center justify-center h-full min-h-[520px]">

            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: springX, y: springY }}
              className="relative w-[340px] h-[440px] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Card BG gradient */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(160deg, ${COLORS.plum} 0%, ${COLORS.dark} 100%)` }} />
              {/* Card noise */}
              <div className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

              {/* Orb inside card */}
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl opacity-30"
                style={{ background: COLORS.rose }} />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-2xl opacity-20"
                style={{ background: '#fff' }} />

              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Performance Report</p>
                    <p className="text-[13px] font-medium text-white">Q4 2024</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <TrendingUp size={16} color="white" />
                  </div>
                </div>

                {/* Fake chart bars */}
                <div className="flex items-end gap-2 h-28">
                  {[40, 65, 45, 80, 60, 95, 72, 88].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-lg"
                      style={{ background: i === 5 || i === 7 ? COLORS.rose : 'rgba(255,255,255,0.15)' }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      transformOrigin="bottom"
                      custom={h}
                    >
                      <div style={{ height: `${h}%`, width: '100%' }} />
                    </motion.div>
                  ))}
                </div>

                {/* Metric */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Organic Reach Growth</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      +247%
                    </span>
                    <span className="text-[11px] mb-1.5 px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(133,57,83,0.3)', color: '#f0a0b8' }}>
                      ↑ vs last quarter
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating pills */}
            <Pill icon={Globe} label="Live Campaigns" sub="14 active now" delay={0.7}
              className="-top-4 -left-8" />
            <Pill icon={Users} label="New Followers" sub="+12.4k this week" delay={0.85}
              className="top-1/3 -right-12" />
            <Pill icon={Zap} label="Ads Optimized" sub="Real-time bidding" delay={1.0}
              className="-bottom-4 left-4" />
            <Pill icon={MousePointer2} label="Conversion Rate" sub="8.7% avg. CTR" delay={1.15}
              className="bottom-16 -right-10" />
          </div>

          {/* Mobile/Tablet card (shown < lg) */}
          <motion.div
            className="lg:hidden relative rounded-2xl overflow-hidden mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ background: `linear-gradient(140deg, ${COLORS.plum}, ${COLORS.dark})`, padding: '1.5rem', minHeight: '200px' }}
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-25"
              style={{ background: COLORS.rose }} />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">Organic Reach Growth</p>
              <p className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>+247%</p>
              <div className="flex items-end gap-1.5 h-16">
                {[40,65,45,80,60,95,72,88].map((h,i) => (
                  <div key={i} className="flex-1 rounded-t"
                    style={{ height: `${h}%`, background: i===5||i===7 ? COLORS.rose : 'rgba(255,255,255,0.18)' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee strip */}
        <div className='my-4' style={{ borderTop: `1px solid rgba(44,44,44,0.08)`, borderBottom: `1px solid rgba(44,44,44,0.08)` }}>
          <Marquee />
        </div>

        {/* ─── Stats bar ──────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-16 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: `1px solid rgba(133,57,83,0.14)`, background: 'rgba(133,57,83,0.14)' }}
          >
            {stats.map(({ n, suffix, label }, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center"
                style={{ background: COLORS.bg }}>
                <p className="text-3xl md:text-4xl font-bold mb-1 leading-none"
                  style={{ fontFamily: "'Playfair Display', serif", color: COLORS.rose }}>
                  <Counter to={n} suffix={suffix} />
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: '#888' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] uppercase tracking-[0.22em]" style={{ color: '#bbb' }}>Scroll</span>
        <ChevronDown size={14} style={{ color: '#bbb' }} />
      </motion.div>
    </section>
  );
};

export default Hero;