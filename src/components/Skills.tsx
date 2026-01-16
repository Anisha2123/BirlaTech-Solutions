import React from 'react';
import { motion } from 'framer-motion';
import { Search, Code2, Rocket, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    label: "Strategic Alignment",
    description: "Deep-dive technical assessment of your current infrastructure and architectural roadmap definition.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "Build & Engineer",
    label: "Scalable Development",
    description: "High-velocity MERN/Next.js development cycles with integrated CI/CD and automated QA pipelines.",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "Launch & Scale",
    label: "Market Deployment",
    description: "Multi-region cloud deployment, real-time performance monitoring, and SRE support for global traffic.",
    icon: <Rocket className="w-5 h-5" />,
  }
];

const ExecutionPipeline = () => {
  return (
    <section id="process" className="py-16 md:py-32 px-6 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section: Professional Split-Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-8 bg-blue-600" />
              <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase">
                Methodology
              </span>
            </motion.div>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1] md:leading-[0.9]">
              The Execution <br />
              <span className="text-slate-400 font-light italic">Pipeline.</span>
            </h2>
          </div>
          <p className="font-sans text-slate-500 text-base md:text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-6 md:pl-8">
            Our framework is engineered to eliminate technical debt and <span className="text-slate-900 font-semibold">accelerate time-to-market</span>.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Animated Progress Line: Desktop Only */}
          <div className="hidden lg:block absolute top-[1.5rem] left-0 right-0 h-px bg-slate-100">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 origin-left"
            />
          </div>

          {/* Step Grid: 1 col on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <PipelineStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PipelineStep = ({ step, index }: { step: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative flex flex-col items-start"
    >
      {/* Step Indicator Circle */}
      <div className="relative w-12 h-12 mb-8 md:mb-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-white border border-slate-100 rounded-full group-hover:border-blue-600 group-hover:bg-blue-50 transition-all duration-500 shadow-sm" />
        <span className="relative z-10 font-mono text-[10px] font-black text-slate-400 group-hover:text-blue-600 transition-colors">
          {step.number}
        </span>
      </div>

      {/* Content Area */}
      <div className="relative z-10 space-y-4 w-full">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            {step.icon}
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {step.title}
          </h3>
        </div>

        <p className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600/60">
          {step.label}
        </p>

        <p className="font-sans text-sm md:text-base text-slate-500 leading-relaxed max-w-sm">
          {step.description}
        </p>
      </div>

      {/* Responsive Watermark Number */}
      {/* <span className="absolute -top-6 md:-top-10 -left-4 md:-left-6 text-7xl md:text-9xl font-heading font-black text-slate-200  transition-colors pointer-events-none -z-10">
        {step.number}
      </span> */}
    </motion.div>
  );
};

export default ExecutionPipeline;