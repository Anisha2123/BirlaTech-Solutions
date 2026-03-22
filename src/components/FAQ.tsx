import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, MessageCircle, Calendar } from "lucide-react";

/* ── Google Fonts – add to index.html ─────────────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
───────────────────────────────────────────────────────────────────────────*/

const C = {
  bg:   "#F3F4F4",
  rose: "#853953",
  plum: "#612D53",
  dark: "#2C2C2C",
};

/* ── DATA ─────────────────────────────────────────────────────────────────*/

const STATS = [
  { n: "230+", label: "Brands Served" },
  { n: "98%",  label: "Client Satisfaction" },
  { n: "4.2×", label: "Average ROAS" },
  { n: "12×",  label: "Avg. ROI Growth" },
];

const FAQS = [
  {
    q: "How quickly can you launch our social media presence?",
    a: "We run a structured 7-day onboarding — brand audit, tone-of-voice definition, and a 30-day content calendar — so your first posts go live within two weeks of contract sign. Paid campaigns can be live in as little as 5 business days.",
    tag: "Social Media",
  },
  {
    q: "Do you build custom websites or use templates?",
    a: "Every site is custom-engineered from scratch using React / Next.js. We never repurpose themes. Each project starts with a UX wireframe session, followed by bespoke design and performance-first development targeting Core Web Vitals green scores.",
    tag: "Web Dev",
  },
  {
    q: "Who owns the source code and creative assets?",
    a: "You do — 100%. Upon final settlement, all intellectual property, source repositories, ad creatives, and brand assets transfer to you. We supply clean, documented handovers with no vendor lock-in.",
    tag: "Ownership",
  },
  {
    q: "How do you measure and report campaign performance?",
    a: "Every client gets a live Looker Studio dashboard updated daily, plus a monthly deep-dive report covering reach, engagement, ROAS, CPA, and conversion attribution. We translate raw data into plain-language growth recommendations.",
    tag: "Analytics",
  },
  {
    q: "Can you handle both web development and social media together?",
    a: "Yes — and that's our sweet spot. Integrated retainers let the web and social teams share brand data, UTM strategies, and conversion pixel setups so every campaign touchpoint is consistent and fully trackable end-to-end.",
    tag: "Full-Service",
  },
  {
    q: "What is the minimum engagement period?",
    a: "Project-based web builds have no minimum beyond the project scope. Social media and content retainers start at 3 months — enough runway to gather data, optimise, and show compounding organic growth.",
    tag: "Contracts",
  },
];

/* ── FAQ ITEM ─────────────────────────────────────────────────────────────*/

const FAQItem = ({
  faq,
  index,
  isOpen,
  toggle,
}: {
  faq: typeof FAQS[0];
  index: number;
  isOpen: boolean;
  toggle: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="border-b"
    style={{ borderColor: "rgba(44,44,44,0.09)", fontFamily: "'Outfit', sans-serif" }}
  >
    <button
      onClick={toggle}
      className="w-full py-6 flex items-start justify-between gap-6 text-left group"
    >
      {/* Number + question */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <span
          className="text-[11px] font-semibold shrink-0 mt-0.5"
          style={{ color: "rgba(133,57,83,0.4)", fontVariantNumeric: "tabular-nums", minWidth: "1.5rem" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          {/* Tag */}
          <span
            className="inline-block text-[9px] font-semibold uppercase tracking-[.18em] px-2.5 py-1 rounded-full mb-3"
            style={{ background: "rgba(133,57,83,0.07)", color: C.rose }}
          >
            {faq.tag}
          </span>
          <p
            className="text-base font-semibold leading-snug transition-colors duration-300 pr-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: isOpen ? C.rose : C.dark,
            }}
          >
            {faq.q}
          </p>
        </div>
      </div>

      {/* Toggle icon */}
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400 mt-1"
        style={{
          background: isOpen ? `linear-gradient(135deg, ${C.rose}, ${C.plum})` : "rgba(133,57,83,0.07)",
          transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
        }}
      >
        {isOpen
          ? <Minus size={15} color="#fff" />
          : <Plus size={15} color={C.rose} />
        }
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.04, 0.62, 0.23, 0.98] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-7 pl-10 pr-12">
            {/* Answer body */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#777", fontWeight: 300, maxWidth: "680px" }}
            >
              {faq.a}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ── MAIN SECTION ──────────────────────────────────────────────────────────*/

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-24"
      style={{
        background: C.bg,
        padding: "5rem 0 6rem",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 2rem" }}>

        {/* ── TOP: Two-column header ────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_0.7fr] gap-12 items-end mb-16">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8" style={{ background: C.rose }} />
              <span
                className="text-[10px] font-semibold uppercase tracking-[.3em]"
                style={{ color: C.rose }}
              >
                Got Questions
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                color: C.dark,
              }}
            >
              Everything You
              <br />
              Need to <em style={{ color: C.rose }}>Know.</em>
            </motion.h2>
          </div>

          {/* Right: stat mini-grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 gap-3"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(133,57,83,0.1)",
                }}
              >
                <p
                  className="font-bold leading-none mb-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.75rem",
                    color: C.rose,
                  }}
                >
                  {s.n}
                </p>
                <p
                  className="text-[11px] uppercase tracking-[.14em]"
                  style={{ color: "#999" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── MAIN: Side-by-side layout on desktop ─────────────────── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* Accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={activeIndex === i}
                toggle={() => setActiveIndex(activeIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Sticky sidebar */}
          <div className="hidden lg:flex flex-col gap-5 sticky top-28 self-start">

            {/* Decorative large number */}
            <div
              className="rounded-3xl p-7 relative overflow-hidden"
              style={{
                background: `linear-gradient(140deg, ${C.plum}, ${C.dark})`,
              }}
            >
              {/* Orb */}
              <div
                className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-25 pointer-events-none"
                style={{ background: C.rose, filter: "blur(28px)" }}
              />

              <p
                className="text-[10px] uppercase tracking-[.2em] font-semibold mb-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Avg. Client Growth
              </p>
              <p
                className="text-5xl font-bold text-white mb-1 relative z-10"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                +247%
              </p>
              <p
                className="text-xs relative z-10"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                within the first 6 months
              </p>

              {/* Mini bar chart */}
              <div className="flex items-end gap-1.5 h-12 mt-5 relative z-10">
                {[30, 52, 40, 70, 58, 90, 78].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{ background: i === 5 ? C.rose : "rgba(255,255,255,0.18)" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                    transformOrigin="bottom"
                  >
                    <div style={{ height: `${h}%` }} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div
              className="rounded-3xl p-6"
              style={{ background: "#fff", border: "1px solid rgba(133,57,83,0.12)" }}
            >
              <p
                className="text-base font-semibold mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: C.dark }}
              >
                Still have questions?
              </p>
              <p
                className="text-xs leading-relaxed mb-5"
                style={{ color: "#999", fontWeight: 300 }}
              >
                Our strategists reply within 2 business hours.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                    boxShadow: `0 6px 18px rgba(133,57,83,0.25)`,
                  }}
                >
                  <Calendar size={13} /> Book a Free Call
                  <ArrowUpRight size={12} />
                </a>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-semibold transition-colors"
                  style={{ border: "1.5px solid rgba(44,44,44,0.14)", color: C.dark }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#22c55e";
                    (e.currentTarget as HTMLElement).style.color = "#16a34a";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(44,44,44,0.14)";
                    (e.currentTarget as HTMLElement).style.color = C.dark;
                  }}
                >
                  <MessageCircle size={13} /> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="flex -space-x-1.5">
                {[C.rose, C.plum, C.dark, C.rose].map((bg, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-white font-bold"
                    style={{ background: bg, borderColor: C.bg, fontSize: "8px" }}
                  >
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[11px]" style={{ color: "#aaa" }}>
                <span style={{ color: C.dark, fontWeight: 500 }}>230+ brands</span> trust us
              </p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA STRIP ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-20 rounded-3xl overflow-hidden relative"
          style={{ background: `linear-gradient(130deg, ${C.plum} 0%, ${C.dark} 100%)` }}
        >
          {/* Orbs */}
          <div
            className="absolute -top-12 -left-12 w-52 h-52 rounded-full pointer-events-none"
            style={{ background: C.rose, opacity: 0.15, filter: "blur(48px)" }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "#fff", opacity: 0.04, filter: "blur(32px)" }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10">
            <div>
              <p
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ready to grow your brand?
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
                No contracts. No fluff. Just measurable results from day one.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: C.rose }}
              >
                <Calendar size={14} /> Start a Project
                <ArrowUpRight size={13} />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.14)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)")}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQ;