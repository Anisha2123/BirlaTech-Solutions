import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Zap, 
  Lock, 
  Database, 
  Globe 
} from 'lucide-react';

const techCategories = [
  {
    name: "Frontend",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    icon: <Globe className="w-5 h-5" />,
    description: "Highly interactive, SEO-optimized user interfaces."
  },
  {
    name: "Backend & API",
    tools: ["Node.js", "Go", "PostgreSQL", "GraphQL"],
    icon: <Cpu className="w-5 h-5" />,
    description: "Robust, scalable server-side logic and data management."
  },
  {
    name: "Infrastructure",
    tools: ["AWS", "Vercel", "Docker", "Kubernetes"],
    icon: <Layers className="w-5 h-5" />,
    description: "Cloud-native deployments with 99.9% uptime."
  },
  {
    name: "Security",
    tools: ["Auth0", "Stripe", "Cloudflare", "Vault"],
    icon: <Lock className="w-5 h-5" />,
    description: "Enterprise-grade encryption and compliance."
  }
];

const TechStack = () => {
  return (
    <section className="py-24 bg-[#FAFAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            Our <span className="text-[#2563EB]">Technology</span> DNA
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-[#2563EB] mx-auto mt-6"
          />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {techCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cat.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {cat.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono uppercase tracking-widest bg-slate-50 px-2 py-1 rounded text-slate-400">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Seamless Marquee (Logo Cloud) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAFB] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAFB] to-transparent z-10" />
          
          <div className="flex overflow-hidden group">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-12 py-4"
            >
              {/* Duplicate the list to create seamless loop */}
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center">
                  <LogoItem text="Next.js" />
                  <LogoItem text="TypeScript" />
                  <LogoItem text="PostgreSQL" />
                  <LogoItem text="Docker" />
                  <LogoItem text="Redis" />
                  <LogoItem text="AWS" />
                  <LogoItem text="GraphQL" />
                  <LogoItem text="Tailwind" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoItem = ({ text }: { text: string }) => (
  <span className="text-2xl md:text-3xl font-bold text-slate-300 hover:text-[#2563EB] transition-colors cursor-default select-none tracking-tighter italic">
    {text}
  </span>
);

export default TechStack;