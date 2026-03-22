import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  cream:  "#F3F4F4",
  rose:   "#853953",
  plum:   "#612D53",
  dark:   "#2C2C2C",
  border: "rgba(44,44,44,0.10)",
  glass:  "rgba(243,244,244,0.88)",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="15" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { id: "home",       label: "Home" },
  { id: "services",   label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "contact",    label: "Contact" },
];

// ─── Smooth scroll util ───────────────────────────────────────────────────────
const scrollTo = (id, close) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  }
  close?.();
};

// ─── Desktop NavLink ──────────────────────────────────────────────────────────
const NavLink = ({ item, active }) => {
  const [hov, setHov] = useState(false);
  return (
    <li style={{ listStyle: "none" }}>
      <button
        onClick={() => scrollTo(item.id)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "none", border: "none", cursor: "pointer", padding: "4px 0",
          position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        }}
      >
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: "13px", fontWeight: 500,
          letterSpacing: "0.05em",
          color: active || hov ? C.rose : C.dark,
          transition: "color 0.22s",
        }}>
          {item.label}
        </span>
        {/* underline dot */}
        <motion.div
          animate={{ scaleX: hov || active ? 1 : 0, opacity: hov || active ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 2, width: "100%", borderRadius: 2,
            background: `linear-gradient(90deg, ${C.rose}, ${C.plum})`,
            transformOrigin: "left",
          }}
        />
      </button>
    </li>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeId, setActiveId]   = useState("home");
  const [btnHov, setBtnHov]       = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section detection
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveId(item.id); break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
        rel="stylesheet"
      />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 200,
        padding: scrolled ? "10px 0" : "18px 0",
        transition: "padding 0.4s ease",
      }}>
        <div style={{
          maxWidth: 1180, margin: "0 auto",
          padding: "0 clamp(1rem, 4vw, 2.5rem)",
        }}>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0.65rem 1.25rem",
              borderRadius: 18,
              background: scrolled ? C.glass : "transparent",
              backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
              border: `1px solid ${scrolled ? C.border : "transparent"}`,
              boxShadow: scrolled ? "0 8px 40px rgba(44,44,44,0.08)" : "none",
              transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s, backdrop-filter 0.4s",
            }}
          >
            {/* ── Logo ── */}
            <div
              onClick={() => scrollTo("home")}
              style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }}
            >
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                style={{
                  width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(133,57,83,0.28)",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M6 4h6a8 8 0 010 16H6V4z" stroke="#F3F4F4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 4v16" stroke="#F3F4F4" strokeWidth="2.2" strokeLinecap="round"/>
                </svg>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: "1.2rem", fontWeight: 700,
                  color: C.dark, lineHeight: 1, letterSpacing: "-0.01em",
                }}>
                  Dev<span style={{ color: C.rose }}>lyn</span>
                </span>
                <span style={{
                  fontFamily: "monospace", fontSize: "7.5px",
                  color: "rgba(44,44,44,0.4)", letterSpacing: "0.28em",
                  textTransform: "uppercase", marginTop: 3,
                }}>
                  Digital Agency
                </span>
              </div>
            </div>

            {/* ── Desktop nav ── */}
            <ul style={{
              display: "none",
              alignItems: "center", gap: "2.25rem",
              padding: 0, margin: 0,
              // shown via media query handled inline with a ref trick below
            }}
              className="desk-nav"
            >
              {navItems.map(item => (
                <NavLink key={item.id} item={item} active={activeId === item.id} />
              ))}
            </ul>

            {/* ── CTA + Hamburger ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
              {/* CTA — hidden on mobile via class */}
              <motion.button
                className="desk-cta"
                onClick={() => scrollTo("contact")}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => setBtnHov(false)}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "none", /* overridden by media query */
                  alignItems: "center", gap: 7,
                  padding: "0.55rem 1.25rem",
                  borderRadius: 100,
                  border: "none", cursor: "pointer",
                  background: btnHov
                    ? `linear-gradient(135deg, ${C.rose}, ${C.plum})`
                    : C.dark,
                  color: C.cream,
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: "12px", fontWeight: 600,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "background 0.3s",
                  boxShadow: btnHov ? "0 8px 28px rgba(133,57,83,0.35)" : "0 4px 16px rgba(44,44,44,0.14)",
                }}
              >
                Work with us <IconArrow />
              </motion.button>

              {/* Hamburger */}
              <motion.button
                className="mob-toggle"
                onClick={() => setMenuOpen(true)}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: C.dark, display: "flex", alignItems: "center", justifyContent: "center",
                  padding: 4,
                }}
              >
                <IconMenu />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── Responsive overrides (injected style) ── */}
        <style>{`
          @media (min-width: 768px) {
            .desk-nav  { display: flex !important; }
            .desk-cta  { display: flex !important; }
            .mob-toggle{ display: none  !important; }
          }
        `}</style>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE FULL-SCREEN MENU
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 300,
                background: "rgba(44,44,44,0.35)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(88vw, 360px)",
                zIndex: 400,
                background: C.cream,
                display: "flex", flexDirection: "column",
                padding: "1.75rem",
                boxShadow: "-20px 0 60px rgba(44,44,44,0.18)",
              }}
            >
              {/* Drawer header */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "3rem",
              }}>
                {/* Logo repeat */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M6 4h6a8 8 0 010 16H6V4z" stroke="#F3F4F4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 4v16" stroke="#F3F4F4" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "1.15rem", fontWeight: 700, color: C.dark,
                  }}>
                    Dev<span style={{ color: C.rose }}>lyn</span>
                  </span>
                </div>

                <motion.button
                  whileTap={{ rotate: 90, scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: 38, height: 38, borderRadius: 10,
                    border: `1px solid ${C.border}`,
                    background: "white",
                    cursor: "pointer", color: C.dark,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <IconX />
                </motion.button>
              </div>

              {/* Thin rose line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: 2, borderRadius: 2, marginBottom: "2.5rem",
                  background: `linear-gradient(90deg, ${C.rose}, ${C.plum})`,
                  transformOrigin: "left",
                }}
              />

              {/* Nav links */}
              <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <MobileNavItem
                        item={item}
                        index={i}
                        active={activeId === item.id}
                        onClose={() => setMenuOpen(false)}
                      />
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.45 }}
                style={{
                  marginTop: "auto",
                  paddingTop: "2rem",
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <p style={{
                  fontFamily: "monospace", fontSize: "10px",
                  color: "rgba(44,44,44,0.4)", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginBottom: "1rem",
                }}>
                  Ready to grow?
                </p>
                <button
                  onClick={() => scrollTo("contact", () => setMenuOpen(false))}
                  style={{
                    width: "100%", padding: "1rem",
                    background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
                    color: C.cream, border: "none", borderRadius: 14,
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: "13px", fontWeight: 600,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 12px 32px rgba(133,57,83,0.28)",
                  }}
                >
                  Work with us <IconArrow />
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Mobile nav item ──────────────────────────────────────────────────────────
const MobileNavItem = ({ item, index, active, onClose }) => {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => scrollTo(item.id, onClose)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", textAlign: "left",
        background: hov || active ? "rgba(133,57,83,0.06)" : "transparent",
        border: "none", cursor: "pointer",
        padding: "0.9rem 1rem", borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.2s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{
          fontFamily: "monospace", fontSize: "9px",
          color: hov || active ? C.rose : "rgba(44,44,44,0.35)",
          letterSpacing: "0.2em", textTransform: "uppercase",
          transition: "color 0.2s",
        }}>
          0{index + 1}
        </span>
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: "1.7rem", fontWeight: 700, lineHeight: 1,
          color: hov || active ? C.rose : C.dark,
          transition: "color 0.2s",
          letterSpacing: "-0.01em",
        }}>
          {item.label}
        </span>
      </div>
      <motion.div
        animate={{ x: hov ? 4 : 0, opacity: hov || active ? 1 : 0.2 }}
        transition={{ duration: 0.2 }}
        style={{ color: C.rose }}
      >
        <IconArrow />
      </motion.div>
    </button>
  );
};

export default Navbar;