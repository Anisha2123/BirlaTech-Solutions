import React from 'react';
import { motion, animate } from 'framer-motion';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Calculate the position with an offset (e.g., 80px for a sticky header)
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
    
   animate(window.scrollY, targetPosition, {
      type: "spring",
      stiffness: 120, // Increased from 40 for a much snappier start
      damping: 25,    // Balanced to ensure a smooth, no-bounce finish
      mass: 0.5,      // Reduced mass makes it feel lighter and faster
      restDelta: 0.5, // Stops the animation immediately once close
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center md:pt-20 pb-2 overflow-hidden bg-white">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 max-sm:mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Now scaling enterprise partners</span>
          <ChevronRight size={14} />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 mb-8">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400">
              Future of Web.
            </span>
          </h1>
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-5 leading-relaxed"
        >
          Devlyn architects business-critical platforms for high-growth startups 
          and global enterprises. Specialized in MERN, Cloud-Native, and 
          performance-first digital infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 "
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Primary Call to Action */}
      <button 
        onClick={() => scrollToSection("contact")}
        className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200"
      >
        <span className="relative z-10 flex items-center gap-2">
          Start Your Project 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      
      {/* Secondary Call to Action */}
      <button 
        onClick={() => scrollToSection("industries")}
        className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95"
      >
        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
          <Play size={10} className="fill-blue-600 text-blue-600 ml-0.5 group-hover:fill-white group-hover:text-white transition-colors" />
        </div>
        View Case Studies
      </button>
    </div>
        </motion.div>

      
      </div>
    </section>
  );
};

export default Hero;