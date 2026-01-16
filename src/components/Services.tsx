import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Plus,
  Minus,
  Zap
} from "lucide-react";

const allServices = [
  {
    title: "Brand Foundations",
    price: "₹5K+",
    tag: "High Velocity",
    description: "Architecting performance-first digital footprints for emerging leaders and professional portfolios.",
    roi: "Avg. 45% faster load times",
    features: ["Responsive Architecture", "SEO Core Strategy", "Lead Intake Systems"],
    stacks: ["React", "Next.js"],
  },
  {
    title: "Full-Stack Ecosystems",
    price: "₹10K+",
    isPopular: true,
    tag: "Most Selected",
    description: "Bespoke web applications engineered with complex logic, secure auth, and real-time sync.",
    roi: "Scalable to 100k+ users",
    features: ["Enterprise Auth (RBAC)", "Admin Control Systems", "Payment Infrastructure"],
    stacks: ["MERN", "PostgreSQL"],
  },
  {
    title: "Venture MVP",
    price: "₹20K+",
    tag: "Strategic Scale",
    description: "Rapid engineering cycles designed to validate disruption and secure early-stage market traction.",
    roi: "6-week average delivery",
    features: ["Product Architecture", "Cloud-Native Infrastructure", "System Handover"],
    stacks: ["AWS", "Node.js"],
  },
  {
    title: "Enterprise Commerce",
    price: "₹40K+",
    tag: "Global Retail",
    description: "High-volume retail engines built for global distribution and inventory automation.",
    roi: "Multi-region ready",
    features: ["Headless Commerce", "Inventory Sync", "Global Multi-currency"],
    stacks: ["Next.js", "Stripe"],
  },
  {
    title: "Distributed Systems",
    price: "Custom",
    tag: "Enterprise Core",
    description: "Cloud-native infrastructure focused on multi-region availability and massive scaling.",
    roi: "99.99% Uptime SLA",
    features: ["Kubernetes Clusters", "Load Balancing", "Zero-Downtime Pipeline"],
    stacks: ["Docker", "AWS"],
  },
  {
    title: "SRE & Maintenance",
    price: "₹20k/mo",
    tag: "Reliability",
    description: "Continuous site reliability engineering to ensure your platform remains elite and secure.",
    roi: "24/7 System Monitoring",
    features: ["Security Patching", "Performance Audits", "Feature Iteration"],
    stacks: ["MongoDB", "Sentry"],
  }
];

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const visibleServices = showAll ? allServices : allServices.slice(0, 3);

  // Logic: Scroll back to top when collapsing
  const handleToggle = () => {
    if (showAll && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setShowAll(false), 600); // Slight delay for smooth visual transition
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-12 px-6 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-8 bg-blue-600" />
              <span className="font-mono text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em]">
                Protocol // Solutions
              </span>
            </motion.div>

            <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Architectural <br />
              <span className="text-slate-400 font-light italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
                Service Tiers.
              </span>
            </h2>
          </div>

          <p className="font-sans text-slate-500 text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-8 pb-2">
            Engineering high-performance assets with <span className="text-slate-900 font-semibold">guaranteed scalability</span>.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
              <ServiceTier key={service.title} service={service} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <div className="md:mt-10 flex justify-center">
          <button
            onClick={handleToggle}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 text-slate-900 font-bold text-xs font-mono uppercase tracking-[0.2em] hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm"
          >
            {showAll ? (
              <><Minus size={14} className="text-blue-600"/> Collapse Systems</>
            ) : (
              <><Plus size={14} className="text-blue-600"/> View All Solutions</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

const ServiceTier = ({ service, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`relative flex flex-col p-8 bg-white rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group
        ${service.isPopular 
          ? "border-blue-600 ring-4 ring-blue-50 md:-translate-y-4" 
          : "border-slate-100 hover:border-blue-300"
        }`}
    >
      {/* Popular Badge */}
      {service.isPopular && (
        <div className="absolute -top-5 left-8 bg-blue-600 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-xl z-10">
          <Sparkles size={12} className="animate-pulse" />
          <span className="font-mono text-[9px] font-black uppercase tracking-widest">Most Selected</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1 rounded-full">
            {service.tag}
          </span>
          <Zap size={16} className="text-slate-200 group-hover:text-blue-600 transition-colors duration-500" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-blue-600 tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500">
            {service.price}
          </span>
          <span className="text-slate-400 font-mono text-[9px] uppercase tracking-widest">/ Project</span>
        </div>
      </div>

      {/* Impact/ROI Box */}
      <div className="mb-8 p-5 bg-blue-50/40 rounded-2xl border border-blue-100/50 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
         <p className="text-[9px] font-mono font-bold text-blue-600 group-hover:text-blue-100 uppercase tracking-widest mb-1 transition-colors">Business Impact</p>
         <p className="text-slate-900 group-hover:text-white font-bold text-sm transition-colors">{service.roi}</p>
      </div>

      <p className="font-sans text-slate-500 text-sm leading-relaxed mb-8 flex-grow group-hover:text-slate-600 transition-colors">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-4 mb-10">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-slate-700 text-xs font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
            <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Buttons: Professional, Multi-Tab, Brand Colors */}
      <div className="space-y-3 pt-6 border-t border-slate-50">
        <a
          href="https://calendly.com/birlaani/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200/50 active:scale-95"
        >
          <Calendar size={14} />
          Book Meeting
          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
        </a>
        <a
          href="https://wa.me/916307255290"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 text-slate-500 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:border-green-500 hover:text-green-600 transition-all active:scale-95"
        >
          <MessageCircle size={14} className="group-hover:text-green-500" />
          WhatsApp Support
        </a>
      </div>
    </motion.div>
  );
};

export default Services;