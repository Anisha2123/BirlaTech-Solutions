import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, User, Mail, MessageSquare, CheckCircle2,
  Globe, Lock, Building2, Check, X, Phone,
} from "lucide-react";

/* ── Google Fonts ──────────────────────────────────────────────────────────
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
─────────────────────────────────────────────────────────────────────────── */

const C = { bg: "#F3F4F4", rose: "#853953", plum: "#612D53", dark: "#2C2C2C" };

const SERVICE_TAGS = [
  "Web Development", "Social Media", "Performance Ads",
  "Content Creation", "SEO Strategy", "Full-Service",
];

const TRUST_CHIPS = [
  { icon: Check,  label: "Reply in 2 hrs"      },
  { icon: Lock,   label: "NDA on request"       },
  { icon: Globe,  label: "230+ brands served"   },
  { icon: Phone,  label: "+91 98765 43210"      },
];

const TRUST_POINTS = [
  { icon: Check,  label: "Response within 2 business hours" },
  { icon: Lock,   label: "NDA available on request"         },
  { icon: Globe,  label: "Serving 230+ brands worldwide"    },
];

// ─── SHARED INPUT FIELD ───────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextArea?: boolean;
  type?: string;
  required?: boolean;
  compact?: boolean; // mobile uses slightly smaller padding
}

const Field = ({
  label, icon, placeholder, value, onChange,
  isTextArea = false, type = "text", required = false, compact = false,
}: FieldProps) => {
  const radius = compact ? ".7rem" : ".85rem";
  const base: React.CSSProperties = {
    width: "100%",
    background: "rgba(133,57,83,0.04)",
    border: "1px solid rgba(133,57,83,0.1)",
    borderRadius: radius,
    paddingLeft: "2.4rem",
    paddingRight: "1rem",
    paddingTop: compact ? "0.65rem" : "0.75rem",
    paddingBottom: compact ? "0.65rem" : "0.75rem",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.84rem",
    color: C.dark,
    outline: "none",
    transition: "border-color 0.22s",
    WebkitAppearance: "none" as any,
  };

  return (
    <div className="flex flex-col gap-1.5 group w-full">
      <label
        className="text-[10px] font-semibold uppercase tracking-[.2em] transition-colors duration-200"
        style={{ color: "#ccc" }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: "0.8rem",
          top: isTextArea ? "0.72rem" : "50%",
          transform: isTextArea ? "none" : "translateY(-50%)",
          pointerEvents: "none", color: "#ddd",
        }}>
          {icon}
        </div>
        {isTextArea ? (
          <textarea
            rows={compact ? 4 : 5}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={{ ...base, resize: "none", lineHeight: 1.65, minHeight: compact ? "90px" : "unset" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(133,57,83,0.42)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(133,57,83,0.1)")}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={{ ...base, height: compact ? "2.6rem" : "2.75rem" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(133,57,83,0.42)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(133,57,83,0.1)")}
          />
        )}
      </div>
    </div>
  );
};

// ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────

const MobileContact = ({
  form, setForm, services, toggleService, loading, status, handleSubmit,
}: any) => (
  <div className="flex flex-col">

    {/* Mini header */}
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <div style={{ height: 1, width: "1.4rem", background: C.rose }} />
        <span className="text-[10px] font-semibold uppercase tracking-[.28em]" style={{ color: C.rose }}>
          Get in Touch
        </span>
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.85rem",
          fontWeight: 700,
          lineHeight: 1.06,
          letterSpacing: "-.02em",
          color: C.dark,
          marginBottom: ".45rem",
        }}
      >
        Let's Grow Your<br />
        Brand <em style={{ color: C.rose }}>Together.</em>
      </motion.h2>
      <p className="text-xs leading-relaxed" style={{ color: "#999", fontWeight: 300, maxWidth: 280 }}>
        Share your vision — we'll prepare a custom growth plan. No templates, no guesswork.
      </p>
    </div>

    {/* Trust chips — horizontal scroll */}
    <div
      className="overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch", margin: "0 -1.25rem", padding: "0 1.25rem", marginBottom: "1.1rem" }}
    >
      <div className="flex gap-2" style={{ whiteSpace: "nowrap" }}>
        {TRUST_CHIPS.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="inline-flex items-center gap-1.5 flex-shrink-0 py-2 px-3 rounded-full"
            style={{ background: "#fff", border: "1px solid rgba(133,57,83,0.1)" }}
          >
            <Icon size={11} color={C.rose} />
            <span className="text-[11px] font-medium" style={{ color: C.dark }}>{label}</span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Email row */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-center gap-2 mb-3"
    >
      <Mail size={12} color={C.rose} />
      <a href="mailto:hello@agency.com" className="text-xs font-medium" style={{ color: C.rose, textDecoration: "none" }}>
        hello@agency.com
      </a>
    </motion.div>

    {/* Live badge */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full self-start"
      style={{ border: `1px solid rgba(133,57,83,0.18)`, background: "rgba(133,57,83,0.05)" }}
    >
      <span className="relative flex w-1.5 h-1.5">
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: C.rose, opacity: 0.65, animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite" }}
        />
        <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: C.rose }} />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[.14em]" style={{ color: C.rose }}>
        Team online — avg reply 90 min
      </span>
    </motion.div>

    {/* Divider */}
    <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(133,57,83,.12),transparent)", marginBottom: "1.4rem" }} />

    {/* Form card */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="rounded-2xl p-5"
      style={{ background: "#fff", border: "1px solid rgba(133,57,83,0.1)" }}
    >
      <p className="font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: C.dark }}>
        Send us a brief
      </p>
      <p className="text-xs mb-4" style={{ color: "#bbb", fontWeight: 300 }}>
        Tailored growth plan within 24 hours.
      </p>

      {/* Service pills */}
      <p className="text-[10px] font-semibold uppercase tracking-[.2em] mb-2" style={{ color: "#ccc" }}>
        I'm interested in
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {SERVICE_TAGS.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => toggleService(s)}
            className="text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              border: services.includes(s) ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.18)",
              background: services.includes(s) ? "rgba(133,57,83,0.1)" : "transparent",
              color: services.includes(s) ? C.rose : "#bbb",
              fontFamily: "'Outfit', sans-serif",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <Field label="Full Name" icon={<User size={13} />} placeholder="Your full name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required compact />
        <Field label="Email Address" icon={<Mail size={13} />} type="email" placeholder="you@company.com"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required compact />
        <Field label="Company / Brand" icon={<Building2 size={13} />} placeholder="Your brand name"
          value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} compact />
        <Field label="Project Brief" icon={<MessageSquare size={13} />}
          placeholder="Goals, challenges, ideal timeline…"
          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          isTextArea required compact />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div className="flex items-center gap-1" style={{ color: "#ccc" }}>
            <Lock size={11} />
            <span className="text-[10px]" style={{ fontWeight: 300 }}>Data never shared</span>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.96 }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-xs font-semibold relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
              boxShadow: `0 6px 18px rgba(133,57,83,0.27)`,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {loading ? "Sending…" : "Send Brief"}
            <Send size={13} color="#fff" />
          </motion.button>
        </div>
      </form>

      {/* Status */}
      <AnimatePresence>
        {status.type && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 p-3 rounded-xl flex items-start gap-2 text-xs font-medium leading-relaxed"
            style={{
              background: status.type === "success" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.07)",
              border: status.type === "success" ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(239,68,68,0.18)",
              color: status.type === "success" ? "#15803d" : "#dc2626",
            }}
          >
            {status.type === "success" ? <CheckCircle2 size={13} className="shrink-0 mt-px" /> : <X size={13} className="shrink-0 mt-px" />}
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);

// ─── DESKTOP LEFT COLUMN (original, untouched) ────────────────────────────────

const DesktopLeft = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div style={{ height: 1, width: "2rem", background: C.rose }} />
      <span className="text-[10px] font-semibold uppercase tracking-[.3em]" style={{ color: C.rose }}>
        Get in Touch
      </span>
    </div>

    <h2
      className="font-bold tracking-tight mb-5"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(2.5rem,4.5vw,4rem)",
        lineHeight: 1.05,
        color: C.dark,
      }}
    >
      Let's Grow<br />
      Your Brand <em style={{ color: C.rose }}>Together.</em>
    </h2>

    <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: "#888", fontWeight: 300 }}>
      Share your vision and our strategists will prepare a custom growth plan — no templates, no guesswork. Just a clear path to results.
    </p>

    <div className="flex flex-col gap-4 mb-10">
      {TRUST_POINTS.map(({ icon: Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "rgba(133,57,83,0.09)" }}>
            <Icon size={14} color={C.rose} />
          </div>
          <span className="text-xs font-medium uppercase tracking-[.14em]" style={{ color: C.dark }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>

    <div className="flex flex-col gap-3 mb-8">
      <div className="flex items-center gap-3">
        <Mail size={13} color={C.rose} />
        <a href="mailto:hello@agency.com" className="text-sm font-medium" style={{ color: C.rose, textDecoration: "none" }}>
          hello@agency.com
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Send size={13} color={C.rose} />
        <span className="text-sm" style={{ color: "#888", fontWeight: 300 }}>+91 98765 43210</span>
      </div>
    </div>

    <div
      className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full"
      style={{ border: `1px solid rgba(133,57,83,0.18)`, background: "rgba(133,57,83,0.05)" }}
    >
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex h-full w-full rounded-full"
          style={{ background: C.rose, opacity: 0.65, animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite" }} />
        <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: C.rose }} />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[.16em]" style={{ color: C.rose }}>
        Team online — avg reply 90 min
      </span>
    </div>
  </motion.div>
);

// ─── DESKTOP FORM CARD (original, untouched) ──────────────────────────────────

const DesktopForm = ({ form, setForm, services, toggleService, loading, status, handleSubmit }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-3xl p-8 md:p-10"
    style={{ background: "#fff", border: "1px solid rgba(133,57,83,0.1)" }}
  >
    <div className="mb-6">
      <p className="font-bold mb-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: C.dark }}>
        Send us a brief
      </p>
      <p className="text-xs" style={{ color: "#aaa", fontWeight: 300 }}>
        We'll respond with a tailored growth plan within 24 hours.
      </p>
    </div>

    <div className="mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-[.22em] mb-3" style={{ color: "#bbb" }}>
        I'm interested in
      </p>
      <div className="flex flex-wrap gap-2">
        {SERVICE_TAGS.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => toggleService(s)}
            className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200"
            style={{
              border: services.includes(s) ? `1px solid ${C.rose}` : "1px solid rgba(133,57,83,0.18)",
              background: services.includes(s) ? "rgba(133,57,83,0.09)" : "transparent",
              color: services.includes(s) ? C.rose : "#999",
              fontFamily: "'Outfit', sans-serif",
              cursor: "pointer",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>

    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" icon={<User size={14} />} placeholder="Your full name"
          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <Field label="Email Address" icon={<Mail size={14} />} type="email" placeholder="you@company.com"
          value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      </div>
      <Field label="Company / Brand" icon={<Building2 size={14} />} placeholder="Your brand or business name"
        value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <Field label="Project Brief" icon={<MessageSquare size={14} />}
        placeholder="Tell us about your goals, challenges, and ideal timeline…"
        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
        isTextArea required />

      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <div className="flex items-center gap-1.5" style={{ color: "#ccc" }}>
          <Lock size={12} />
          <span className="text-[11px]" style={{ fontWeight: 300 }}>Your data is never shared</span>
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.035 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold"
          style={{
            background: `linear-gradient(135deg, ${C.rose}, ${C.plum})`,
            boxShadow: `0 8px 24px rgba(133,57,83,0.28)`,
            fontFamily: "'Outfit', sans-serif",
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {loading ? "Sending…" : "Send Brief"}
          <Send size={14} />
        </motion.button>
      </div>
    </form>

    <AnimatePresence>
      {status.type && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
          style={{
            background: status.type === "success" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.07)",
            border: status.type === "success" ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(239,68,68,0.18)",
            color: status.type === "success" ? "#15803d" : "#dc2626",
          }}
        >
          {status.type === "success" ? <CheckCircle2 size={16} /> : <X size={16} />}
          {status.msg}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [services, setServices] = useState<string[]>(["Web Development"]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, msg: "" });
    try {
      setLoading(true);
      await axios.post("https://formspree.io/f/mgvabkgv", {
        ...form,
        services: services.join(", ") || "Not specified",
      });
      setStatus({ type: "success", msg: "Brief received! We'll send your custom growth plan within 24 hours." });
      setForm({ name: "", email: "", company: "", message: "" });
      setServices([]);
    } catch {
      setStatus({ type: "error", msg: "Something went wrong. Please email us directly at hello@agency.com" });
    } finally {
      setLoading(false);
    }
  };

  const sharedProps = { form, setForm, services, toggleService, loading, status, handleSubmit };

  return (
    <section
      id="contact"
      className="scroll-mt-24"
      style={{ background: C.bg, padding: "5rem 0 6rem", fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ping animation */}
      <style>{`@keyframes ping{0%{transform:scale(1);opacity:.7}70%,100%{transform:scale(2.2);opacity:0}}`}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 1.25rem" }}>

        {/* ── MOBILE (< lg) ── */}
        <div className="lg:hidden">
          <MobileContact {...sharedProps} />
        </div>

        {/* ── DESKTOP (lg+) — identical to original ── */}
        <div
          className="hidden lg:grid"
          style={{ gridTemplateColumns: "1fr 1.15fr", gap: "5rem", alignItems: "start" }}
        >
          <DesktopLeft />
          <DesktopForm {...sharedProps} />
        </div>

      </div>
    </section>
  );
};

export default Contact;