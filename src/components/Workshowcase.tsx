import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Calendar, Lock, ChevronLeft, ChevronRight } from "lucide-react";

const C = { bg: "#F3F4F4", rose: "#853953", plum: "#612D53", dark: "#2C2C2C" };

type FilterKey = "all" | "ecom" | "health" | "tech";

interface Project {
  id: string;
  url: string;
  displayUrl: string;
  cat: FilterKey;
  catLabel: string;
  title: string;
  desc: string;
  stacks: string[];
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "kalasrijan",
    url: "https://kalasrijan.co.in",
    displayUrl: "kalasrijan.co.in",
    cat: "ecom",
    catLabel: "Fashion · E-Commerce",
    title: "Kalasrijan Handmade Wears",
    desc: "Indian handmade clothing brand — Bandhej, Shibori & Butic techniques on pure cotton. Full e-commerce storefront.",
    stacks: ["React", "E-Commerce", "SEO"],
    featured: true,
  },
  {
    id: "reallorganic",
    url: "https://www.reallorganic.com/",
    displayUrl: "reallorganic.com",
    cat: "ecom",
    catLabel: "Organic · Health Food",
    title: "Reall Organic",
    desc: "Premium organic food brand with custom storefront, product catalogue, and conversion-focused UX.",
    stacks: ["React", "SEO", "MongoDB"],
  },
  {
    id: "drnishant",
    url: "https://drnishantortho.com",
    displayUrl: "drnishantortho.com",
    cat: "health",
    catLabel: "Healthcare · Medical",
    title: "Dr. Nishant Ortho",
    desc: "Professional orthopaedic specialist website — appointment system, trust signals, and patient-first UX.",
    stacks: ["React", "Booking System"],
  },
  {
    id: "xsploit",
    url: "https://xsploithack.com",
    displayUrl: "xsploithack.com",
    cat: "tech",
    catLabel: "Cybersecurity · Tech",
    title: "XsploitHack",
    desc: "Ethical hacking platform with community features, course listings, and a dark-tech brand identity.",
    stacks: ["React", "Community", "LMS"],
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",    label: "All"        },
  { key: "ecom",   label: "E-Commerce" },
  { key: "health", label: "Healthcare" },
  { key: "tech",   label: "Tech"       },
];

const STATS = [
  { n: "4",    l: "Live Projects"      },
  { n: "100%", l: "On-Time Delivery"   },
  { n: "4+",   l: "Industries Served"  },
  { n: "98%",  l: "Client Satisfaction"},
];

// ─── Browser Chrome (unchanged) ──────────────────────────────────────────────
const BrowserChrome = ({ url }: { url: string }) => (
  <div
    className="flex items-center gap-2 px-3 py-2 shrink-0"
    style={{ background: "#f0eded", borderBottom: "1px solid rgba(133,57,83,0.08)" }}
  >
    <div className="flex gap-1.5">
      <div className="w-2 h-2 rounded-full bg-red-400" />
      <div className="w-2 h-2 rounded-full bg-yellow-400" />
      <div className="w-2 h-2 rounded-full bg-emerald-400" />
    </div>
    <div
      className="flex-1 flex items-center gap-1.5 h-6 rounded-full px-2.5 text-[10px] overflow-hidden"
      style={{ background: "rgba(133,57,83,0.07)", color: "#bbb" }}
    >
      <Lock size={8} color="#ccc" />
      {url}
    </div>
  </div>
);

// ─── DESKTOP Project Card (original, untouched) ───────────────────────────────
const ProjectCard = ({
  project,
  featured = false,
  index,
}: {
  project: Project;
  featured?: boolean;
  index: number;
}) => {
  const screenH = featured ? "h-72 md:h-80" : "h-48 md:h-56";

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.24 } }}
      className={`flex flex-col rounded-3xl overflow-hidden group relative ${featured ? "col-span-full" : ""}`}
      style={{
        background: "#fff",
        border: "1px solid rgba(133,57,83,0.09)",
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(44,44,44,0.04)",
      }}
    >
      {project.featured && (
        <div
          className="absolute top-3.5 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-[.18em] text-white"
          style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})` }}
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-white opacity-60 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-white" />
          </span>
          Featured
        </div>
      )}
      <BrowserChrome url={project.displayUrl} />
      <div className={`relative overflow-hidden ${screenH}`}>
        <iframe
          src={project.url}
          title={project.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          className="absolute top-0 left-0 border-none pointer-events-none"
          style={{ width: "160%", height: "160%", transform: "scale(0.625)", transformOrigin: "top left" }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent 50%, rgba(97,45,83,0.72) 100%)`, zIndex: 2 }}
        />
        <div
          className="absolute left-0 w-full h-0.5 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to right, transparent, rgba(133,57,83,0.4), transparent)`,
            animation: "scanline 2.5s linear infinite",
            zIndex: 3,
          }}
        />
      </div>
      <div className="flex items-end justify-between gap-3 px-5 py-4">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[.18em] mb-1" style={{ color: C.rose }}>
            {project.catLabel}
          </p>
          <h3
            className="font-bold leading-tight mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: C.dark }}
          >
            {project.title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "#aaa", fontWeight: 300, maxWidth: 380 }}>
            {project.desc}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250 group-hover:scale-110"
            style={{ background: "rgba(133,57,83,0.08)" }}
          >
            <ArrowUpRight size={14} color={C.rose} className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {project.stacks.map(s => (
              <span
                key={s}
                className="text-[9px] font-semibold uppercase tracking-[.12em] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(133,57,83,0.07)", color: "rgba(133,57,83,0.7)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.a>
  );
};

// ─── MOBILE Swipeable Card ────────────────────────────────────────────────────
const MobileProjectCard = ({ project, isActive }: { project: Project; isActive: boolean }) => {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: 24,
        overflow: "hidden",
        textDecoration: "none",
        border: "1px solid rgba(133,57,83,0.09)",
        boxShadow: isActive
          ? "0 20px 50px rgba(133,57,83,0.14), 0 4px 16px rgba(44,44,44,0.08)"
          : "0 2px 12px rgba(44,44,44,0.04)",
        flexShrink: 0,
        width: "100%",
        position: "relative",
      }}
    >
      {/* Featured pill */}
      {project.featured && (
        <div style={{
          position: "absolute", top: 48, left: 14, zIndex: 10,
          display: "flex", alignItems: "center", gap: 6,
          padding: "5px 12px", borderRadius: 100,
          background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "white",
        }}>
          <span style={{ position: "relative", display: "flex", width: 6, height: 6 }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "white", opacity: 0.6,
              animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "white" }} />
          </span>
          Featured
        </div>
      )}

      {/* Browser chrome */}
      <BrowserChrome url={project.displayUrl} />

      {/* Live preview */}
      <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
        <iframe
          src={project.url}
          title={project.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          style={{
            position: "absolute", top: 0, left: 0,
            border: "none", pointerEvents: "none",
            width: "160%", height: "160%",
            transform: "scale(0.625)", transformOrigin: "top left",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 55%, rgba(97,45,83,0.55) 100%)",
          zIndex: 2,
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: "1.1rem 1.25rem 1.25rem" }}>
        {/* Category + arrow row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: C.rose,
          }}>
            {project.catLabel}
          </span>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(133,57,83,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowUpRight size={13} color={C.rose} />
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.3rem", fontWeight: 700,
          color: C.dark, lineHeight: 1.15,
          margin: "0 0 6px",
        }}>
          {project.title}
        </h3>

        {/* Desc */}
        <p style={{
          fontSize: 12, color: "#aaa", lineHeight: 1.65,
          margin: "0 0 12px", fontWeight: 300,
        }}>
          {project.desc}
        </p>

        {/* Stacks */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.stacks.map(s => (
            <span key={s} style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", padding: "3px 10px",
              borderRadius: 100,
              background: "rgba(133,57,83,0.07)",
              color: "rgba(133,57,83,0.75)",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

// ─── MOBILE CAROUSEL ─────────────────────────────────────────────────────────
const MobileCarousel = ({ projects }: { projects: Project[] }) => {
  const [current, setCurrent] = useState(0);
  const total = projects.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  return (
    <div style={{ position: "relative" }}>
      {/* Card viewport */}
      <div style={{ overflow: "hidden", borderRadius: 24 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <MobileProjectCard project={projects[current]} isActive />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "1.25rem",
      }}>
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{
                width: i === current ? 22 : 6,
                background: i === current ? C.rose : "rgba(133,57,83,0.2)",
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: 6, borderRadius: 100,
                border: "none", cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", gap: 8 }}>
          <motion.button
            onClick={prev}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              border: `1px solid rgba(133,57,83,0.18)`,
              background: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: C.rose,
            }}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            onClick={next}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white",
              boxShadow: "0 6px 20px rgba(133,57,83,0.3)",
            }}
          >
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Counter */}
      <div style={{
        marginTop: "0.875rem",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.5rem", fontWeight: 700, color: C.rose, lineHeight: 1,
        }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(133,57,83,0.12)" }} />
        <span style={{ fontSize: 11, color: "#bbb", fontFamily: "monospace" }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

// ─── MOBILE STATS ROW ────────────────────────────────────────────────────────
const MobileStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 }}
      style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem", marginTop: "1.75rem",
      }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
          style={{
            background: "white",
            borderRadius: 16,
            padding: "1rem 0.875rem",
            border: "1px solid rgba(133,57,83,0.09)",
            textAlign: "center",
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.85rem", fontWeight: 700, color: C.rose,
            lineHeight: 1, margin: "0 0 4px",
          }}>
            {s.n}
          </p>
          <p style={{
            fontSize: 9, textTransform: "uppercase",
            letterSpacing: "0.14em", color: "#bbb", margin: 0,
          }}>
            {s.l}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ─── TABLET LAYOUT (2-col stacked) ───────────────────────────────────────────
const TabletGrid = ({ projects }: { projects: Project[] }) => {
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {featured && (
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            display: "flex",
            background: "white",
            borderRadius: 24,
            overflow: "hidden",
            textDecoration: "none",
            border: "1px solid rgba(133,57,83,0.09)",
            boxShadow: "0 4px 20px rgba(44,44,44,0.06)",
            minHeight: 200,
          }}
        >
          {/* Left: live preview */}
          <div style={{ position: "relative", width: "45%", flexShrink: 0, overflow: "hidden" }}>
            <BrowserChrome url={featured.displayUrl} />
            <div style={{ position: "relative", height: 170, overflow: "hidden" }}>
              <iframe
                src={featured.url}
                title={featured.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  position: "absolute", top: 0, left: 0,
                  border: "none", pointerEvents: "none",
                  width: "160%", height: "160%",
                  transform: "scale(0.625)", transformOrigin: "top left",
                }}
              />
            </div>
          </div>

          {/* Right: info */}
          <div style={{
            flex: 1, padding: "1.5rem 1.5rem 1.5rem 1.25rem",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            borderLeft: "1px solid rgba(133,57,83,0.07)",
          }}>
            <div>
              {/* Featured badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "4px 10px", borderRadius: 100,
                background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                fontSize: 8, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "white",
                marginBottom: 12,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "white" }} />
                Featured
              </div>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.rose, margin: "0 0 6px" }}>
                {featured.catLabel}
              </p>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem", fontWeight: 700, color: C.dark,
                lineHeight: 1.2, margin: "0 0 8px",
              }}>
                {featured.title}
              </h3>
              <p style={{ fontSize: 11.5, color: "#aaa", lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
                {featured.desc}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 12 }}>
              {featured.stacks.map(s => (
                <span key={s} style={{
                  fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", padding: "3px 9px", borderRadius: 100,
                  background: "rgba(133,57,83,0.07)", color: "rgba(133,57,83,0.75)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      )}

      {/* Rest: 2-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {rest.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{
              display: "flex", flexDirection: "column",
              background: "white", borderRadius: 20,
              overflow: "hidden", textDecoration: "none",
              border: "1px solid rgba(133,57,83,0.09)",
              boxShadow: "0 2px 12px rgba(44,44,44,0.04)",
            }}
          >
            <BrowserChrome url={p.displayUrl} />
            <div style={{ position: "relative", overflow: "hidden", height: 130 }}>
              <iframe
                src={p.url}
                title={p.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  position: "absolute", top: 0, left: 0,
                  border: "none", pointerEvents: "none",
                  width: "160%", height: "160%",
                  transform: "scale(0.625)", transformOrigin: "top left",
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(97,45,83,0.45) 100%)",
                zIndex: 2,
              }} />
            </div>
            <div style={{ padding: "0.875rem 1rem 1rem" }}>
              <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.rose, margin: "0 0 4px" }}>
                {p.catLabel}
              </p>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem", fontWeight: 700, color: C.dark,
                lineHeight: 1.2, margin: "0 0 5px",
              }}>
                {p.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {p.stacks.slice(0, 2).map(s => (
                  <span key={s} style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "2px 8px", borderRadius: 100,
                    background: "rgba(133,57,83,0.07)", color: "rgba(133,57,83,0.75)",
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const WorkShowcase = () => {
  const [filter, setFilter] = useState<FilterKey>("all");

  const visible = PROJECTS.filter(p => filter === "all" || p.cat === filter);
  const featured = visible.find(p => p.featured);
  const rest = visible.filter(p => !p.featured);

  return (
    <section
      id="work"
      className="scroll-mt-24"
      style={{ background: C.bg, padding: "5rem 0 6rem", fontFamily: "'Outfit', sans-serif" }}
    >
      <style>{`
        @keyframes scanline {
          0%   { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        /* ── Responsive visibility ── */
        .wk-mobile  { display: block !important; }
        .wk-tablet  { display: none  !important; }
        .wk-desktop { display: none  !important; }

        @media (min-width: 640px) and (max-width: 1023px) {
          .wk-mobile  { display: none  !important; }
          .wk-tablet  { display: block !important; }
          .wk-desktop { display: none  !important; }
        }
        @media (min-width: 1024px) {
          .wk-mobile  { display: none  !important; }
          .wk-tablet  { display: none  !important; }
          .wk-desktop { display: block !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.75rem" }}>

        {/* ── Header (shared, responsive font sizes) ── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div style={{ height: 1, width: "2rem", background: C.rose }} />
              <span className="text-[10px] font-semibold uppercase tracking-[.3em]" style={{ color: C.rose }}>
                Our Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: C.dark,
                margin: 0,
              }}
            >
              Live Projects We're{" "}
              <em style={{ color: C.rose }}>Proud Of.</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ textAlign: "right" }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "3.5rem", fontWeight: 700,
              color: "rgba(133,57,83,0.14)", lineHeight: 1, margin: 0,
            }}>
              0{visible.length}
            </p>
            <p style={{ fontSize: 11, color: "#bbb", fontWeight: 300, maxWidth: 200, margin: 0 }}>
              Projects live across fashion, health, e-commerce &amp; cybersecurity
            </p>
          </motion.div>
        </div>

        {/* ── Filters (shared) ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}
        >
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "7px 16px", borderRadius: 100,
                fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                border: filter === f.key ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.2)",
                background: filter === f.key ? "rgba(133,57,83,0.09)" : "transparent",
                color: filter === f.key ? C.rose : "#aaa",
                transition: "all 0.2s",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════
            MOBILE  (<640px) — Swipeable carousel
        ══════════════════════════════════════ */}
        <div className="wk-mobile">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {visible.length > 0 ? (
                <>
                  <MobileCarousel projects={visible} />
                  <MobileStats />
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "3rem 0", color: "#bbb", fontSize: 13 }}>
                  No projects in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════
            TABLET  (640–1023px) — horizontal featured + 2-col grid
        ══════════════════════════════════════ */}
        <div className="wk-tablet">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {visible.length > 0 ? (
                <>
                  <TabletGrid projects={visible} />
                  {/* Tablet stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                      display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                      gap: "0.75rem", marginTop: "1.5rem",
                    }}
                  >
                    {STATS.map(s => (
                      <div key={s.l} style={{
                        background: "white", borderRadius: 18,
                        padding: "1rem", textAlign: "center",
                        border: "1px solid rgba(133,57,83,0.09)",
                      }}>
                        <p style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.9rem", fontWeight: 700, color: C.rose,
                          lineHeight: 1, margin: "0 0 4px",
                        }}>
                          {s.n}
                        </p>
                        <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "#bbb", margin: 0 }}>
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "3rem 0", color: "#bbb", fontSize: 13 }}>
                  No projects in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════
            DESKTOP (1024px+) — original layout, untouched
        ══════════════════════════════════════ */}
        <div className="wk-desktop">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              {featured && <ProjectCard project={featured} featured index={0} />}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Desktop stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {STATS.map(s => (
              <div
                key={s.l}
                className="rounded-2xl py-4 px-4 text-center"
                style={{ background: "#fff", border: "1px solid rgba(133,57,83,0.09)" }}
              >
                <p
                  className="font-bold leading-none mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: C.rose }}
                >
                  {s.n}
                </p>
                <p className="text-[10px] uppercase tracking-[.14em]" style={{ color: "#bbb" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── CTA banner (shared across all breakpoints) ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            marginTop: 32, borderRadius: 28, overflow: "hidden",
            position: "relative", display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20, padding: "2rem 2rem",
            background: `linear-gradient(130deg, ${C.plum}, ${C.dark})`,
          }}
        >
          <div style={{
            position: "absolute", top: -40, left: -40,
            width: 180, height: 180, borderRadius: "50%",
            background: C.rose, opacity: 0.15, filter: "blur(44px)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700, color: "white", margin: "0 0 6px",
            }}>
              Want results like these?
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", margin: 0 }}>
              Let's build your next live project — from concept to launch.
            </p>
          </div>
          <a
            href="#contact"
            style={{
              position: "relative", zIndex: 1,
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.75rem 1.5rem", borderRadius: 16,
              fontSize: 13, fontWeight: 600, color: "white",
              background: C.rose, textDecoration: "none",
              boxShadow: "0 8px 24px rgba(133,57,83,0.3)",
            }}
          >
            <Calendar size={14} /> Start Your Project <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkShowcase;