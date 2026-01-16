import React from 'react';
import { motion } from 'framer-motion';

// Replace these with actual Partner SVG logos or high-res PNGs
const partners = [
  "STRIPE", "VERCEL", "AWS", "GOOGLE CLOUD", "MICROSOFT", "LINEAR", "SUPABASE", "SLACK"
];

const TrustSlider = () => {
  return (
    <div className="relative -mt-16 pb-24 z-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Subtle Heading */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-10"
        >
          Powering the next generation of digital leaders
        </motion.p>

        {/* Logo Container with Gradient Masks */}
        <div className="relative overflow-hidden group">
          {/* Left Fade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          {/* Right Fade */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Scrolling Marquee */}
          <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center gap-16 md:gap-24 py-4 whitespace-nowrap"
            >
              {/* Duplicate list to create seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <span 
                  key={index}
                  className="text-xl md:text-2xl font-black text-slate-200 hover:text-blue-600/40 transition-colors duration-500 cursor-default select-none tracking-tighter"
                >
                  {partner}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSlider;