import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ShieldCheck, 
  LineChart, 
  Cpu, 
  ArrowRight,
  X,
  Layers,
  Database,
  Server,
  GlobeLock
} from 'lucide-react';

// Define interface for industry data
interface Industry {
    id: string;
    title: string;
    icon: JSX.Element;
    description: string;
    metrics: string[];
    color: string;
    // New hypothetical tech stack data for the modal deep dive
    stackDetails: { tier: string; tech: string; icon: JSX.Element }[];
}


const industries: Industry[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    icon: <ShoppingBag />,
    description: 'High-conversion storefronts with headless CMS integration and global scaling.',
    metrics: ['35% Conversion Lift', 'Sub-2s Load Times', 'Multi-currency ready'],
    color: 'from-blue-500 to-cyan-400',
    stackDetails: [
        { tier: 'Frontend Edge', tech: 'Next.js on Vercel Edge Network', icon: <GlobeLock size={18} /> },
        { tier: 'Headless Commerce', tech: 'Shopify / BigCommerce API', icon: <ShoppingBag size={18} /> },
        { tier: 'Data Layer', tech: 'Redis & PostgreSQL', icon: <Database size={18} /> }
    ]
  },
  {
    id: 'fintech',
    title: 'FinTech & Banking',
    icon: <LineChart />,
    description: 'Secure, PCI-compliant financial dashboards and real-time data visualization.',
    metrics: ['Bank-grade Security', 'Real-time Analytics', '99.99% Uptime'],
    color: 'from-indigo-600 to-blue-500',
    stackDetails: [
        { tier: 'Security Layer', tech: 'Vault & MTLS Encryption', icon: <ShieldCheck size={18} /> },
        { tier: 'Real-time Engine', tech: 'Kafka Streams & WebSockets', icon: <Activity size={18} /> },
        { tier: 'Compliance Core', tech: 'Isolated Kubernetes Clusters', icon: <Server size={18} /> }
    ]
  },
  {
    id: 'saas',
    title: 'Enterprise SaaS',
    icon: <Cpu />,
    description: 'Scalable multi-tenant architectures and complex workflow automation tools.',
    metrics: ['API-First Design', 'Microservices Architecture', 'RBAC Ready'],
    color: 'from-slate-800 to-slate-900',
    stackDetails: [
        { tier: 'API Gateway', tech: 'GraphQL Federation', icon: <Layers size={18} /> },
        { tier: 'Auth Provider', tech: 'Auth0 / Clerk Enterprise', icon: <ShieldCheck size={18} /> },
        { tier: 'Microservices', tech: 'Docker & Go/Rust services', icon: <Cpu size={18} /> }
    ]
  },
  {
    id: 'healthcare',
    title: 'HealthTech',
    icon: <ShieldCheck />,
    description: 'HIPAA-compliant platforms focused on data privacy and patient experience.',
    metrics: ['Data Encryption', 'Regulatory Compliance', 'Patient Portals'],
    color: 'from-blue-700 to-indigo-800',
    stackDetails: [
        { tier: 'HIPAA Compliance', tech: 'AWS Dedicated Instances', icon: <ShieldCheck size={18} /> },
        { tier: 'Data Storage', tech: 'Encrypted RDS (AES-256)', icon: <Database size={18} /> },
        { tier: 'Audit Trail', tech: 'Immutable Ledger Logging', icon: <LineChart size={18} /> }
    ]
  }
];

// Need to import Activity for FinTech dummy data
import { Activity } from 'lucide-react';


const IndustryUseCases = () => {
  const [activeTab, setActiveTab] = useState(industries[0]);
  // New state for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <section id="industries" className="py-14 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        {/* Header Section */}
<div className="flex flex-col md:flex-row md:items-end justify-between md:mb-24 max-sm:mb-8 gap-8">
  <div className="max-w-3xl">
    {/* Monospace Protocol Badge */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="h-[2px] w-8 bg-blue-600" />
      <span className="font-mono text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em]">
        Domain Verticals
      </span>
    </motion.div>

    {/* Authority Headline */}
    <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
      Tailored for <br />
      <span className="text-slate-400 font-light italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
        Industry Leaders.
      </span>
    </h2>
  </div>

  {/* Refined Context Subtext */}
  <p className="font-sans text-slate-500 text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-8">
    Engineering high-stakes solutions where <span className="text-slate-900 font-semibold">performance and security</span> are non-negotiable.
  </p>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Navigation Labels */}
          <div className="lg:col-span-5 space-y-4">
            {industries.map((item) => (
              <button
                key={item.id}
                onMouseEnter={() => setActiveTab(item)}
                onClick={() => setActiveTab(item)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeTab.id === item.id 
                  ? 'bg-slate-50 border-l-4 border-[#2563EB]' 
                  : 'hover:bg-slate-50/50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg transition-colors ${
                    activeTab.id === item.id ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <span className={`text-xl font-semibold ${
                    activeTab.id === item.id ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side: Dynamic Content Display */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative min-h-[450px] bg-slate-900 rounded-[2.5rem] p-10 md:p-16 overflow-hidden text-white"
              >
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${activeTab.color} opacity-20 blur-[80px] rounded-full`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between max-sm:text-center">
                  <div>
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-6 block">
                      Case Study // {activeTab.id}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold mb-6">
                      {activeTab.description}
                    </h3>
                    
                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-3 mb-12 max-sm:justify-center">
                      {activeTab.metrics.map((metric, i) => (
                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-blue-200">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    {/* UPDATE: Button now triggers modal */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 text-white font-semibold group/btn hover:text-blue-400 transition-colors"
                    >
                      View {activeTab.title} Infrastructure 
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
                
                {/* Decorative code snippet */}
                <div className="absolute bottom-[-20px] right-[-20px] opacity-10 font-mono text-[10px] hidden md:block select-none pointer-events-none">
                  <pre>{`const init = () => Devlyn.deploy('${activeTab.id}');`}</pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* =========================== */}
      {/* ULTRA MODERN ENTERPRISE MODAL */}
      {/* =========================== */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[998] transition-all"
            />

           {/* Modal Container */}
{/* Modal Container */}
<div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md">
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ type: "spring", damping: 25, stiffness: 300 }}
    className="bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col"
  >
    {/* Modal Ambient Glow - Restricted to brand blue */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

    {/* Scrollable Content Area */}
    <div className="relative z-10 flex flex-col overflow-y-auto p-6 md:p-10 scrollbar-hide">
      
      {/* Modal Header */}
      <div className="flex justify-between items-start mb-8 md:mb-12">
        <div className="space-y-1">
          <span className="text-blue-400 font-mono text-[10px] font-bold tracking-[0.4em] uppercase block">
            Technical Blueprint
          </span>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white flex items-center gap-3">
            {activeTab.icon} <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{activeTab.title}</span>
          </h3>
        </div>
        <button 
          onClick={() => setIsModalOpen(false)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shrink-0"
        >
          <X size={20} className="text-slate-400 hover:text-white" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* Column 1: The Tech Stack List */}
        <div className="space-y-6">
          <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-blue-400/80 border-b border-white/5 pb-3">Infrastructure Stack</h4>
          <div className="grid grid-cols-1 gap-3">
            {activeTab.stackDetails.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 transition-all group/item">
                <div className="text-blue-400 mt-1 shrink-0 group-hover/item:scale-110 transition-transform">{detail.icon}</div>
                <div>
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">{detail.tier}</p>
                  <p className="text-sm md:text-base font-bold text-slate-200 group-hover/item:text-white transition-colors">{detail.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Architecture Visualization */}
        <div className="relative bg-white/[0.02] rounded-[1.5rem] p-8 border border-white/5 flex flex-col justify-center min-h-[300px]">
          <span className="absolute top-6 left-8 text-[9px] font-mono text-slate-500 uppercase tracking-widest">Protocol Visualization // 0x4F</span>
          
          <div className="mt-5 flex flex-col gap-4 items-center justify-center opacity-90">
            <div className="w-32 py-2 px-4 text-center border border-blue-500/30 bg-blue-500/5 rounded-lg text-[10px] font-mono font-bold text-blue-400">Client Edge</div>
            <div className="h-6 w-px bg-gradient-to-b from-blue-500/40 to-white/10"></div>
            
            <div className="flex gap-4 w-full justify-center">
              <div className="flex-1 p-4 text-center border border-white/10 bg-white/5 rounded-xl text-xs font-bold text-white">
                <Server size={18} className="mx-auto mb-2 text-blue-400" /> API Core
              </div>
              <div className="flex-1 p-4 text-center border border-white/10 bg-white/5 rounded-xl text-xs font-bold text-white">
                <Database size={18} className="mx-auto mb-2 text-blue-400" /> Data Store
              </div>
            </div>
            
            <div className="h-6 w-px bg-gradient-to-b from-white/10 to-blue-500/40"></div>
            <div className="w-36 py-2 px-4 text-center border border-blue-500/30 bg-blue-500/5 rounded-lg text-[10px] font-mono font-bold text-blue-400">Secure Protocol</div>
          </div>
        </div>
      </div>

      {/* Modal Footer */}
      <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
            Security Status: Verified
          </p>
          <p className="font-mono text-[9px] text-blue-500/50 uppercase tracking-tighter">
            Audit ID: {activeTab.id} // Multi-Region Deployment
          </p>
        </div>
        
        <a href="#contact"
          onClick={() => setIsModalOpen(false)}
          className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-900/20">
          Consult on this Protocol <ArrowRight size={14}/>
        </a>
      </div>
    </div>
  </motion.div>
</div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};

export default IndustryUseCases;