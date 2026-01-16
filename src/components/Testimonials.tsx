import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Replace with actual client photos. Use high-contrast B&W for best effect.
const testimonials = [
  {
    id: "nexus",
    metric: "500%",
    label: "Scalability Lift",
    quote: "Devlyn engineered infrastructure that handled our massive traffic surge with zero downtime.",
    author: "Marcus Chen",
    image: "/images/testimonials/img1.jpg"
  },
  {
    id: "fintech",
    metric: "40%",
    label: "Latency Reduction",
    quote: "They transformed our legacy database into a modern MERN ecosystem in record time.",
    author: "Sarah Williams",
    image: "/images/testimonials/img2.jpg"
  },
  {
    id: "zenith",
    metric: "8 Weeks",
    label: "To Venture-Ready MVP",
    quote: "Precise and performance-driven. The architectural partner every high-growth startup needs.",
    author: "Williams Timachi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="md:py-32 px-6 bg-white relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
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
        Proven Outcomes
      </span>
    </motion.div>

    {/* Authority Headline */}
    <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
      Trusted by <br />
      <span className="text-slate-400 font-light italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
        Engineering Leaders.
      </span>
    </h2>
  </div>

  {/* Refined Context Subtext */}
  <p className="font-sans text-slate-500 text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-8 pb-0">
    Delivering business-critical solutions for production teams that demand <span className="text-slate-900 font-semibold">absolute reliability</span> and scale.
  </p>
</div>

        {/* Visual Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden"
            >
              {/* The Visual Half (Top) */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={t.image} 
                  alt={t.author}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                
                {/* Massive Impact Metric on Image */}
                <div className="absolute bottom-8 left-8 text-white">
                  <span className="block font-heading text-6xl md:text-7xl font-black tracking-tighter leading-none mb-2">
                    {t.metric}
                  </span>
                  <span className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                    {t.label}
                  </span>
                </div>
              </div>

              {/* The Text Half (Bottom) */}
              <div className="p-10 bg-white relative z-10">
                <p className="font-sans text-lg text-slate-500 leading-relaxed italic mb-8 relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif leading-none">“</span>
                  {t.quote}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div>
                    <span className="block font-heading text-lg font-bold text-slate-900">{t.author}</span>
                  </div>
                  {/* <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 scale-90 group-hover:scale-100">
                    <ArrowUpRight size={20} />
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;