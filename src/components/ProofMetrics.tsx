import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Zap, BarChart3 } from 'lucide-react';

interface BentoCardProps {
  className?: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  dark?: boolean;
  flexRow?: boolean;
  showPulse?: boolean;
  isHero?: boolean;
  showDataStream?: boolean;
}

const MetricBento: React.FC = () => {
  return (
    <section className="max-sm:py-8 md:py-32 px-4 md:px-8 bg-white relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 40H0V0h40v40zM20 0v40M0 20h40' fill='none' stroke='%232563EB' stroke-width='1'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-8 bg-blue-600" />
              <span className="font-mono text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em]">
                Protocol 04 // System Audit
              </span>
            </motion.div>

            <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Engineered for <br />
              <span className="text-slate-400 font-light italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
                Performance.
              </span>
            </h2>
          </div>

          <p className="font-sans text-slate-500 text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-8 pb-2">
            Quantifiable evidence of <span className="text-slate-900 font-semibold">architectural integrity</span>.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-min">
          
          <BentoCard 
            className="md:col-span-2 lg:col-span-7 lg:row-span-2 bg-white border-slate-100 min-h-[400px]"
            icon={<Globe className="text-blue-600 w-6 h-6" />}
            value="1.2M+"
            label="Global User Reach"
            description="Our architectures handle massive concurrent traffic spikes with zero millisecond degradation."
            isHero
            showDataStream 
          />

          <BentoCard 
            className="md:col-span-1 lg:col-span-5 bg-slate-950 text-white border-white/5 min-h-[240px]"
            icon={<ShieldCheck className="text-blue-400 w-6 h-6" />}
            value="100%"
            label="Security Record"
            description="Zero critical vulnerabilities across production deployments."
            dark
            showPulse 
          />

          <BentoCard 
            className="md:col-span-1 lg:col-span-5 bg-blue-600 text-white border-transparent shadow-2xl shadow-blue-500/10 min-h-[240px]"
            icon={<Zap className="text-white w-6 h-6" />}
            value="98/100"
            label="Lighthouse Score"
            description="Consistent top-tier performance across Core Web Vitals."
            dark
          />

          {/* Corrected Bottom Card: Grid-based internal layout */}
          <BentoCard 
            className="md:col-span-2 lg:col-span-12 bg-white border-slate-100 min-h-[160px]"
            icon={<BarChart3 className="text-blue-600 w-6 h-6" />}
            flexRow
            value="4.8x"
            label="Conversion Lift"
            description="Average increase in engagement after system migration to optimized architectures."
          />
        </div>
      </div>
    </section>
  );
};

const BentoCard: React.FC<BentoCardProps> = ({ 
  className = "", icon, value, label, description, dark = false, flexRow = false, showPulse = false, isHero = false, showDataStream = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative rounded-[2.5rem] p-8 md:p-10 border transition-all duration-500 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Background Hover State */}
      <div className={`absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none
        ${dark ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-blue-50/30 to-transparent'}`} 
      />

      {/* Hero Animation */}
      {showDataStream && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-full h-full object-cover text-blue-100 fill-current translate-y-10 scale-110">
             <motion.circle 
                initial={{ cx: 150, cy: 120, opacity: 0 }}
                animate={{ cx: [150, 400, 650], cy: [120, 180, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                r="3" fill="#2563EB"
             />
          </svg>
        </div>
      )}

      {/* Main Internal Layout */}
      <div className={`relative z-10 w-full h-full ${flexRow ? 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-8' : 'flex flex-col'}`}>
        
        {/* ICON & PULSE - Added w-fit and responsive margins */}
        <div className={`${flexRow ? 'lg:col-span-1 mb-6 lg:mb-0' : 'flex justify-between items-start mb-10'} w-fit lg:w-full`}>
          <div className={`p-3 rounded-2xl w-fit transition-all duration-500 ${dark ? 'bg-white/10' : 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white'}`}>
            {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${dark ? 'text-white' : 'text-blue-600 group-hover:text-white transition-colors'}` })}
          </div>
          
          {showPulse && !flexRow && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 ml-4 lg:ml-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-[8px] font-bold text-green-500 uppercase">Optimal</span>
            </div>
          )}
        </div>

        {/* VALUE & LABEL */}
        <div className={`${flexRow ? 'lg:col-span-5' : isHero ? 'mt-auto mb-4' : 'mt-8'}`}>
          <div className={`font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>
            {value}
          </div>
          <div className={`font-mono text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] mt-3 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
            {label}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={`${flexRow ? 'lg:col-span-6 lg:mt-0' : 'mt-8'} lg:max-w-md`}>
          <p className={`font-sans text-sm md:text-base leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricBento;