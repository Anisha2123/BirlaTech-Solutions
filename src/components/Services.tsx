import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, MessageCircle, ArrowUpRight, CheckCircle2, X,
  Globe, ShoppingBag, Rocket, Server, Wrench, Layers,
  Instagram, TrendingUp, PenTool, BarChart2, Video, Target,
  ChevronRight, Sparkles,
} from "lucide-react";

/* ─── Google Fonts ─────────────────────────────────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
─────────────────────────────────────────────────────────────────────────── */

const C = { bg: "#F3F4F4", rose: "#853953", plum: "#612D53", dark: "#2C2C2C" };

// ─── DATA (unchanged from original) ──────────────────────────────────────────

const WEB_SERVICES = [
  {
    id: "brand", icon: Globe, category: "Web Dev", title: "Brand Foundation",
    price: "₹15K+", tagline: "Speed-first digital presence",
    description: "Performance-optimised websites engineered for first impressions. We architect responsive, SEO-primed digital footprints that convert visitors into leads from day one.",
    roi: "45% faster load avg.", roiPct: 55,
    features: ["Responsive Architecture", "SEO Core Strategy", "Lead Intake Systems", "Analytics Setup", "CMS Integration"],
    stacks: ["React", "Next.js", "Tailwind"], stat: { n: "3×", label: "More Leads" },
  },
  {
    id: "fullstack", icon: Layers, category: "Web Dev", title: "Full-Stack Ecosystem",
    price: "₹55K+", tagline: "Scalable product engineering", isPopular: true,
    description: "Bespoke web applications with complex business logic, secure authentication, real-time data sync, and admin control panels — built to scale to 100k+ users seamlessly.",
    roi: "100k+ user scale", roiPct: 82,
    features: ["Enterprise Auth (RBAC)", "Admin Control Systems", "Payment Infrastructure", "REST / GraphQL API", "CI/CD Pipeline"],
    stacks: ["MERN", "PostgreSQL", "Redis"], stat: { n: "98%", label: "Uptime SLA" },
  },
  {
    id: "mvp", icon: Rocket, category: "Web Dev", title: "Venture MVP",
    price: "₹85K+", tagline: "Validate fast, grow faster",
    description: "Rapid engineering cycles to validate your idea, attract early adopters, and secure seed funding. From product architecture to cloud deployment in 6 weeks.",
    roi: "6-week delivery", roiPct: 70,
    features: ["Product Architecture", "Cloud-Native Infra", "System Handover", "Investor-Ready Build", "User Testing Sprint"],
    stacks: ["AWS", "Node.js", "Docker"], stat: { n: "6wk", label: "Avg. Delivery" },
  },
  {
    id: "commerce", icon: ShoppingBag, category: "Web Dev", title: "Enterprise Commerce",
    price: "₹1L+", tagline: "Global retail at scale",
    description: "High-volume headless commerce engines built for global distribution, inventory automation, and multi-currency checkouts — ready for millions of transactions.",
    roi: "Multi-region ready", roiPct: 90,
    features: ["Headless Commerce", "Inventory Sync", "Multi-currency", "SEO Sitemap Engine", "Warehouse API"],
    stacks: ["Next.js", "Stripe", "Shopify"], stat: { n: "2M+", label: "Tx Handled" },
  },
  {
    id: "infra", icon: Server, category: "Web Dev", title: "Distributed Systems",
    price: "Custom", tagline: "Enterprise-grade infrastructure",
    description: "Cloud-native infrastructure focused on multi-region availability, zero-downtime deployments, and elastic scaling — backed by 99.99% uptime SLA.",
    roi: "99.99% Uptime", roiPct: 99,
    features: ["Kubernetes Clusters", "Load Balancing", "Zero-Downtime Pipeline", "Disaster Recovery", "Security Hardening"],
    stacks: ["Docker", "AWS", "Terraform"], stat: { n: "99.99%", label: "Uptime" },
  },
  {
    id: "sre", icon: Wrench, category: "Web Dev", title: "SRE & Maintenance",
    price: "₹20k/mo", tagline: "Always-on reliability",
    description: "Continuous site reliability engineering — security patching, performance audits, feature iteration, and 24/7 monitoring to keep your platform elite.",
    roi: "24/7 Monitoring", roiPct: 100,
    features: ["Security Patching", "Performance Audits", "Feature Iteration", "Incident Response", "Monthly Reports"],
    stacks: ["MongoDB", "Sentry", "Datadog"], stat: { n: "24/7", label: "Monitoring" },
  },
];

const SOCIAL_SERVICES = [
  {
    id: "sm-growth", icon: TrendingUp, category: "Social Media", title: "Growth Strategy",
    price: "₹8K/mo", tagline: "Audience that actually buys", isPopular: true,
    description: "Data-driven organic growth strategy across Instagram, LinkedIn, and X. We research your niche, build a content calendar, and optimise for real follower acquisition.",
    roi: "3× avg. reach growth", roiPct: 75,
    features: ["Platform Audit", "Monthly Content Calendar", "Hashtag Research", "Competitor Analysis", "Monthly Growth Report"],
    stacks: ["Instagram", "LinkedIn", "X / Twitter"], stat: { n: "3×", label: "Reach Growth" },
  },
  {
    id: "sm-content", icon: PenTool, category: "Social Media", title: "Content Production",
    price: "₹12K/mo", tagline: "Scroll-stopping creative",
    description: "Full creative studio for your brand — static posts, carousel decks, short-form reels, and stories. Everything designed, written, and scheduled.",
    roi: "30+ pieces / month", roiPct: 60,
    features: ["Graphic Design", "Copywriting", "Reel Editing", "Story Templates", "Brand Guidelines"],
    stacks: ["Instagram", "Facebook", "YouTube Shorts"], stat: { n: "30+", label: "Posts / Month" },
  },
  {
    id: "sm-ads", icon: Target, category: "Social Media", title: "Performance Ads",
    price: "₹15K/mo", tagline: "Spend less, convert more",
    description: "Full-funnel paid social campaigns on Meta and Google. Creative, targeting, A/B testing, and daily bid optimisation to lower your CPA.",
    roi: "Avg. 4.2× ROAS", roiPct: 85,
    features: ["Meta & Google Ads", "A/B Creative Testing", "Audience Segmentation", "Daily Bid Optimisation", "CPA Reporting"],
    stacks: ["Meta Ads", "Google Ads", "TikTok Ads"], stat: { n: "4.2×", label: "Avg. ROAS" },
  },
  {
    id: "sm-analytics", icon: BarChart2, category: "Social Media", title: "Analytics & Reporting",
    price: "₹5K/mo", tagline: "Clarity in every number",
    description: "Custom dashboard and monthly deep-dive reports across all channels. Raw data translated into actionable growth insights.",
    roi: "Full-channel visibility", roiPct: 50,
    features: ["Custom Dashboard", "Monthly Deep-Dive", "Funnel Attribution", "Sentiment Tracking", "Competitor Benchmarks"],
    stacks: ["GA4", "Meta Insights", "Looker Studio"], stat: { n: "100%", label: "Visibility" },
  },
  {
    id: "sm-video", icon: Video, category: "Social Media", title: "Short-Form Video",
    price: "₹18K/mo", tagline: "Reels that reach millions",
    description: "End-to-end short-form video production for Reels, Shorts, and TikTok. Concept, scripting, on-brand editing with captions and music.",
    roi: "Avg. 1M+ monthly views", roiPct: 78,
    features: ["Concept & Scripting", "Professional Editing", "Caption Overlays", "Trend Research", "Multi-platform Export"],
    stacks: ["Instagram Reels", "YouTube Shorts", "TikTok"], stat: { n: "1M+", label: "Monthly Views" },
  },
  {
    id: "sm-influencer", icon: Instagram, category: "Social Media", title: "Influencer Campaigns",
    price: "₹25K+", tagline: "Trust at scale",
    description: "Talent scouting, brief creation, negotiation, campaign management, and ROI reporting. Voices that convert.",
    roi: "Vetted creator network", roiPct: 65,
    features: ["Talent Sourcing", "Brief & Contracts", "Campaign Management", "Performance Tracking", "ROI Reports"],
    stacks: ["Instagram", "YouTube", "TikTok"], stat: { n: "500+", label: "Creator Network" },
  },
];

type Service = typeof WEB_SERVICES[0];

// ─── MODAL (shared — same for desktop & mobile) ───────────────────────────────

function ServiceModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  useEffect(() => {
    if (service) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50"
            style={{ background: "rgba(44,44,44,0.6)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div key="panel" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-8 pointer-events-none">
            <motion.div
              className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto pointer-events-auto"
              style={{
                background: "#fff",
                fontFamily: "'Outfit', sans-serif",
                borderRadius: "1.5rem 1.5rem 0 0",
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(44,44,44,0.15)" }} />
              </div>

              {/* Header */}
              <div
                className="relative p-6 sm:p-8 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${C.plum}, ${C.dark})`, borderRadius: "1.5rem 1.5rem 0 0" }}
              >
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-20 pointer-events-none"
                  style={{ background: C.rose, filter: "blur(44px)" }} />
                <button onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.12)", border: "none", cursor: "pointer" }}>
                  <X size={14} color="#fff" />
                </button>

                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="text-[9px] font-semibold uppercase tracking-[.18em] px-3 py-1 rounded-full"
                    style={{ background: "rgba(133,57,83,0.3)", color: "#f0a0b8" }}>
                    {service.category}
                  </span>
                  {service.isPopular && (
                    <span className="text-[9px] font-semibold uppercase tracking-[.18em] px-3 py-1 rounded-full flex items-center gap-1"
                      style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                      <Sparkles size={9} /> Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{service.tagline}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-2xl sm:text-3xl font-bold text-white leading-none">{service.price}</p>
                    <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.38)" }}>starting</p>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: "rgba(133,57,83,0.28)" }}>
                  <span className="text-lg font-bold text-white">{service.stat.n}</span>
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{service.stat.label}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#666", fontWeight: 300 }}>
                  {service.description}
                </p>

                <p className="text-[10px] uppercase tracking-[.18em] font-semibold mb-3" style={{ color: C.rose }}>
                  What's Included
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 size={13} color={C.rose} className="shrink-0" />
                      <span className="text-sm font-medium" style={{ color: C.dark }}>{f}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] uppercase tracking-[.18em] font-semibold mb-3" style={{ color: C.rose }}>
                  Stack / Platforms
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.stacks.map(s => (
                    <span key={s} className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(133,57,83,0.07)", color: C.plum, border: `1px solid rgba(133,57,83,0.15)` }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`, boxShadow: `0 8px 24px rgba(133,57,83,0.28)` }}>
                    <Calendar size={14} /> Book a Discovery Call <ArrowUpRight size={13} />
                  </a>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold transition-all"
                    style={{ border: `1.5px solid rgba(44,44,44,0.16)`, color: C.dark }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#22c55e"; (e.currentTarget as HTMLElement).style.color = "#16a34a"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(44,44,44,0.16)"; (e.currentTarget as HTMLElement).style.color = C.dark; }}>
                    <MessageCircle size={14} /> WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MOBILE SERVICE ROW (< md) ───────────────────────────────────────────────

function MobileServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  const Icon = service.icon;
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = `${(service as any).roiPct ?? 70}%`;
    }, 150 + index * 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="relative overflow-hidden cursor-pointer"
      style={{
        background: "#fff",
        borderRadius: "1.1rem",
        border: service.isPopular ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.09)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {service.isPopular && (
        <div className="absolute top-0 right-0 text-[9px] font-semibold uppercase tracking-[.16em] px-3 py-1.5 text-white flex items-center gap-1"
          style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`, borderRadius: "0 1.1rem 0 .8rem" }}>
          <Sparkles size={8} /> Popular
        </div>
      )}

      {/* Left accent bar */}
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div style={{
          width: 3, flexShrink: 0, borderRadius: 0,
          background: service.isPopular ? `linear-gradient(to bottom, ${C.rose}, ${C.plum})` : "transparent",
        }} />

        <div style={{ flex: 1, padding: "1rem .9rem 0 .9rem" }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: ".5rem", marginBottom: ".6rem" }}>
            <div style={{ width: "2rem", height: "2rem", borderRadius: ".6rem", background: "rgba(133,57,83,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={14} color={C.rose} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".16em", color: C.rose, background: "rgba(133,57,83,0.07)", padding: ".2rem .55rem", borderRadius: "999px", marginBottom: ".25rem" }}>
                {service.category}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: C.rose, lineHeight: 1 }}>
                {service.price}
              </div>
              <div style={{ fontSize: "9px", color: "#ccc" }}>starting</div>
            </div>
          </div>

          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 700, color: C.dark, lineHeight: 1.2, marginBottom: ".2rem" }}>
            {service.title}
          </h3>
          <p style={{ fontSize: "11px", color: "#bbb", fontWeight: 300, marginBottom: ".6rem" }}>{service.tagline}</p>

          {/* ROI bar */}
          <div style={{ display: "flex", alignItems: "center", gap: ".55rem", marginBottom: ".65rem" }}>
            <div style={{ flex: 1, height: "3px", background: "rgba(133,57,83,0.1)", borderRadius: "999px", overflow: "hidden" }}>
              <div ref={fillRef} style={{ height: "100%", width: "0%", background: `linear-gradient(to right, ${C.rose}, ${C.plum})`, borderRadius: "999px", transition: "width 1s cubic-bezier(.22,1,.36,1)" }} />
            </div>
            <span style={{ fontSize: "10px", fontWeight: 600, color: C.rose, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: ".1em" }}>
              {service.roi}
            </span>
          </div>

          {/* Feature chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".3rem", marginBottom: ".75rem" }}>
            {service.features.slice(0, 3).map(f => (
              <span key={f} style={{ fontSize: "10px", fontWeight: 500, color: C.dark, background: "rgba(44,44,44,0.05)", padding: ".2rem .55rem", borderRadius: "999px", display: "flex", alignItems: "center", gap: ".3rem" }}>
                <CheckCircle2 size={9} color={C.rose} />{f}
              </span>
            ))}
            {service.features.length > 3 && (
              <span style={{ fontSize: "10px", color: C.rose, fontWeight: 500, padding: ".2rem .55rem" }}>
                +{service.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".65rem .9rem .65rem .9rem", borderTop: "1px solid rgba(133,57,83,0.06)", background: "rgba(133,57,83,0.025)" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: C.rose }}>
          View Details
        </span>
        <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: service.isPopular ? `linear-gradient(135deg, ${C.rose}, ${C.plum})` : "rgba(133,57,83,0.1)" }}>
          <ChevronRight size={12} color={service.isPopular ? "#fff" : C.rose} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── ORIGINAL DESKTOP CARD (unchanged) ───────────────────────────────────────

function ServiceCard({ service, index, onOpen }: { service: Service; index: number; onOpen: () => void }) {
  const Icon = service.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      onClick={onOpen}
      className="relative flex flex-col cursor-pointer rounded-3xl overflow-hidden group"
      style={{
        background: "#fff",
        border: service.isPopular ? `1.5px solid ${C.rose}` : "1.5px solid rgba(44,44,44,0.08)",
        boxShadow: service.isPopular ? `0 4px 32px rgba(133,57,83,0.11)` : "0 2px 10px rgba(44,44,44,0.04)",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {service.isPopular && (
        <div className="absolute top-0 right-0 flex items-center gap-1.5 px-4 py-2 rounded-bl-2xl text-[9px] font-semibold uppercase tracking-[.18em] text-white"
          style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})` }}>
          <Sparkles size={9} /> Most Popular
        </div>
      )}
      <div className="p-7 pb-5">
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(133,57,83,0.08)" }}>
            <Icon size={18} color={C.rose} />
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-[.18em] px-2.5 py-1 rounded-full"
            style={{ background: "rgba(133,57,83,0.07)", color: C.rose }}>
            {service.category}
          </span>
        </div>
        <h3 className="font-bold leading-tight mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", color: C.dark }}>
          {service.title}
        </h3>
        <p className="text-xs mb-4" style={{ color: "#999", fontWeight: 300 }}>{service.tagline}</p>
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-2xl font-bold" style={{ color: C.rose }}>{service.price}</span>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "#bbb" }}>/ project</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-5"
          style={{ background: "rgba(133,57,83,0.06)", border: "1px solid rgba(133,57,83,0.11)" }}>
          <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: C.rose }}>{service.roi}</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#888", fontWeight: 300 }}>
          {service.description.slice(0, 95)}…
        </p>
      </div>
      <div className="mx-7" style={{ borderTop: "1px solid rgba(44,44,44,0.06)" }} />
      <div className="px-7 py-5 flex-1">
        <ul className="space-y-2.5">
          {service.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-center gap-2.5 text-xs" style={{ color: C.dark }}>
              <CheckCircle2 size={13} color={C.rose} className="shrink-0" /> {f}
            </li>
          ))}
          {service.features.length > 3 && (
            <li className="text-xs font-medium" style={{ color: C.rose }}>+{service.features.length - 3} more included</li>
          )}
        </ul>
      </div>
      <div className="mx-7 mb-7 flex items-center justify-between py-3 px-4 rounded-2xl"
        style={{ background: service.isPopular ? `linear-gradient(135deg, ${C.rose}, ${C.plum})` : "rgba(133,57,83,0.06)" }}>
        <span className="text-[11px] font-semibold uppercase tracking-[.14em]"
          style={{ color: service.isPopular ? "#fff" : C.rose }}>View Details</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: service.isPopular ? "rgba(255,255,255,0.15)" : "rgba(133,57,83,0.12)" }}>
          <ChevronRight size={13} color={service.isPopular ? "#fff" : C.rose} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── TAB BAR ─────────────────────────────────────────────────────────────────

function TabBar({ active, onChange }: { active: "web" | "social"; onChange: (v: "web" | "social") => void }) {
  return (
    <div className="inline-flex p-1 rounded-full gap-1" style={{ background: "rgba(44,44,44,0.07)" }}>
      {(["web", "social"] as const).map(t => (
        <button key={t} onClick={() => onChange(t)}
          className="relative px-6 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[.15em] transition-colors"
          style={{ color: active === t ? "#fff" : C.dark, fontFamily: "'Outfit', sans-serif" }}>
          {active === t && (
            <motion.div layoutId="tab-pill" className="absolute inset-0 rounded-full"
              style={{ background: `linear-gradient(135deg, ${C.rose}, ${C.plum})` }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          )}
          <span className="relative z-10">{t === "web" ? "Web Development" : "Social Media"}</span>
        </button>
      ))}
    </div>
  );
}

// ─── MOBILE CATEGORY SCROLL ───────────────────────────────────────────────────

function MobileCatScroll({ services, activeCat, onSelect }: {
  services: Service[];
  activeCat: string | null;
  onSelect: (c: string | null) => void;
}) {
  const cats = [...new Set(services.map(s => s.category))];
  return (
    <div className="overflow-x-auto -mx-5 px-5 pb-1" style={{ scrollbarWidth: "none" }}>
      <div className="flex gap-2 w-max py-3">
        <button
          onClick={() => onSelect(null)}
          className="flex-shrink-0 text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200"
          style={{ border: activeCat === null ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.18)", background: activeCat === null ? "rgba(133,57,83,0.1)" : "transparent", color: activeCat === null ? C.rose : "#bbb", fontFamily: "'Outfit', sans-serif", cursor: "pointer" }}>
          All
        </button>
        {cats.map(c => (
          <button key={c} onClick={() => onSelect(c)}
            className="flex-shrink-0 text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-all duration-200"
            style={{ border: activeCat === c ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.18)", background: activeCat === c ? "rgba(133,57,83,0.1)" : "transparent", color: activeCat === c ? C.rose : "#bbb", fontFamily: "'Outfit', sans-serif", cursor: "pointer" }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const Services = () => {
  const [tab, setTab] = useState<"web" | "social">("web");
  const [showAll, setShowAll] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const allCurrent = tab === "web" ? WEB_SERVICES : SOCIAL_SERVICES;
  const filtered = activeCat ? allCurrent.filter(s => s.category === activeCat) : allCurrent;
  const visible = showAll ? filtered : filtered.slice(0, 3);

  const handleTabChange = (v: "web" | "social") => { setTab(v); setShowAll(false); setActiveCat(null); };
  const handleCatChange = (c: string | null) => { setActiveCat(c); setShowAll(false); };

  return (
    <>
      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />

      <section id="services" ref={sectionRef} className="scroll-mt-24"
        style={{ background: C.bg, padding: "5rem 0 6rem", fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 2rem" }}>

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="h-px w-8" style={{ background: C.rose }} />
                <span className="text-[10px] font-semibold uppercase tracking-[.3em]" style={{ color: C.rose }}>
                  What We Offer
                </span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="font-bold leading-[1.06] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,4.5vw,4rem)", color: C.dark }}>
                Services Built for<br /><em style={{ color: C.rose }}>Growth.</em>
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm md:text-base max-w-xs leading-relaxed"
              style={{ color: "#888", fontWeight: 300, borderLeft: `2px solid rgba(133,57,83,0.22)`, paddingLeft: "1.25rem" }}>
              Every engagement is tailored — no templates, no fluff.{" "}
              <span style={{ color: C.dark, fontWeight: 500 }}>Just results.</span>
            </motion.p>
          </div>

          {/* ── Tabs ── */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8 md:mb-12">
            {/* Mobile tabs: full-width sticky feel */}
            <div className="w-full md:w-auto">
              <TabBar active={tab} onChange={handleTabChange} />
            </div>
          </motion.div>

          {/* ── Mobile/Tablet: category pills + list ── */}
          <div className="lg:hidden">
            <MobileCatScroll services={allCurrent} activeCat={activeCat} onSelect={handleCatChange} />

            <AnimatePresence mode="wait">
              <motion.div key={`${tab}-${activeCat}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="flex flex-col gap-3 mt-1">
                {visible.map((s, i) => (
                  <MobileServiceCard key={s.id} service={s} index={i} onOpen={() => setSelectedService(s)} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Mobile show more */}
            {filtered.length > 3 && (
              <div className="flex justify-center mt-5">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAll(v => !v)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[.16em]"
                  style={{ border: `1.5px solid rgba(133,57,83,0.25)`, color: C.rose, background: "transparent", fontFamily: "'Outfit', sans-serif", cursor: "pointer" }}>
                  {showAll ? "Show Less" : `See All ${tab === "web" ? "Web" : "Social"} Services`}
                  <ChevronRight size={13} style={{ transform: showAll ? "rotate(270deg)" : "rotate(90deg)", transition: "transform .3s" }} />
                </motion.button>
              </div>
            )}
          </div>

          {/* ── Desktop: original 3-col grid (untouched) ── */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.38 }}
                className="grid grid-cols-3 gap-6">
                {(showAll ? allCurrent : allCurrent.slice(0, 3)).map((s, i) => (
                  <ServiceCard key={s.id} service={s} index={i} onOpen={() => setSelectedService(s)} />
                ))}
              </motion.div>
            </AnimatePresence>

            {allCurrent.length > 3 && (
              <div className="flex justify-center mt-10">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (showAll && sectionRef.current) {
                      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                      setTimeout(() => setShowAll(false), 500);
                    } else setShowAll(true);
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[.18em] transition-colors"
                  style={{ border: `1.5px solid rgba(133,57,83,0.25)`, color: C.rose, background: "transparent", fontFamily: "'Outfit', sans-serif", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(133,57,83,0.06)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  {showAll ? "Show Less" : `See All ${tab === "web" ? "Web" : "Social"} Services`}
                  <ChevronRight size={14} style={{ transform: showAll ? "rotate(270deg)" : "rotate(90deg)", transition: "transform 0.3s" }} />
                </motion.button>
              </div>
            )}
          </div>

          {/* ── Bottom CTA (shared) ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 md:mt-20 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 px-6 md:px-10 py-7 md:py-10"
            style={{ background: `linear-gradient(130deg, ${C.plum} 0%, ${C.dark} 100%)`, position: "relative" }}>
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-20 pointer-events-none"
              style={{ background: C.rose, filter: "blur(48px)" }} />
            <div className="relative z-10">
              <p className="text-xl md:text-2xl font-bold text-white mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Not sure which plan fits?
              </p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Book a free 30-minute strategy call — no commitment needed.
              </p>
            </div>
            <div className="relative z-10 flex flex-row sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: C.rose, color: "#fff" }}>
                <Calendar size={14} /> Book Free Call <ArrowUpRight size={13} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl text-sm font-semibold transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)" }}>
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Services;