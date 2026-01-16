import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Instagram, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  ArrowUpRight,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* BRAND & LOGO SECTION */}
          <div className="md:col-span-5 space-y-8">
            <div 
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
  className="flex items-center gap-3 cursor-pointer group"
>
  {/* Modern Iconography */}
  <div className="relative w-10 h-10 flex items-center justify-center">
    
    {/* Background Square (Foundation) */}
    <motion.div 
      whileHover={{ rotate: 90 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute inset-0 bg-blue-600 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500" 
    />
    
    {/* Corrected Inner "D" (Visible Pillar + Arc) */}
    <div className="relative z-10 flex items-center justify-center ml-0.5">
      {/* Vertical Pillar of the D */}
      <div className="w-[2.5px] h-4 bg-white rounded-full mr-[1px]" />
      
      {/* The Curve of the D */}
      <div className="w-3.5 h-4 border-y-[2.5px] border-r-[2.5px] border-white rounded-r-md" />
      
      {/* Minimalist Tech Pulse Dot */}
      <div className="absolute left-[3px] w-1 h-1 bg-blue-200 rounded-full animate-pulse" />
    </div>

    {/* Subtle Glow */}
    <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
  </div>

  {/* Typography Adjusted for Dark Footer */}
  <div className="flex flex-col">
    <span className="text-xl font-black tracking-[-0.02em] text-white flex items-center leading-none">
      DEV<span className="text-blue-500">LYN</span>
    </span>
    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-1 group-hover:text-blue-500 transition-colors">
      Digital Systems
    </span>
  </div>
</div>

            <p className="font-sans text-slate-400 text-sm leading-relaxed max-w-sm">
              Architecting high-performance digital ecosystems. We bridge the gap between 
              complex engineering and seamless user experiences for global leaders.
            </p>

            {/* Social Protocols */}
            <div className="flex gap-4">
              <SocialIcon href="https://www.linkedin.com/company/devlynwebs/" icon={<Linkedin size={18} />} />
              <SocialIcon href="https://wa.me/916307255290" icon={<MessageCircle size={18} />} />
              <SocialIcon href="https://www.instagram.com/devlyn408/" icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* SYSTEM NAVIGATION */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">
              System Navigation
            </h4>
            <ul className="space-y-4">
              <FooterLink href="#home" label="Overview" />
              <FooterLink href="#industries" label="Industries" />
              {/* <FooterLink href="#architecture" label="Architecture" /> */}
              <FooterLink href="#services" label="Services" />
              <FooterLink href="#contact" label="Audit Request" />
            </ul>
          </div>

          {/* OPERATIONAL STATUS */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">
              Operational Presence
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-slate-400">
                <MapPin size={18} className="text-blue-500 mt-1" />
                <div className="flex flex-col">
                  <span className="font-heading text-sm font-bold text-white">HQ · India</span>
                  <span className="font-sans text-xs">Remote Deployment Worldwide</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Status: Accepting New Briefs
                </span>
              </div>

              <a 
                href="https://calendly.com/birlaani/new-meeting" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-blue-500" />
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-white">Schedule Audit</span>
                </div>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              © {currentYear} Devlyn Solutions
            </span>
            <span className="hidden md:block h-3 w-px bg-white/10" />
            {/* <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              Anisha Birla · Founder
            </span> */}
          </div>

          <div className="flex gap-8">
            <span className="font-mono text-[9px] font-bold text-slate-600 uppercase tracking-widest hover:text-blue-500 cursor-pointer transition-colors">Privacy Protocol</span>
            <span className="font-mono text-[9px] font-bold text-slate-600 uppercase tracking-widest hover:text-blue-500 cursor-pointer transition-colors">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Sub-Components for Cleanliness */
const SocialIcon = ({ href, icon }: { href: string, icon: any }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-500"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <li>
    <a 
      href={href} 
      className="font-sans text-sm font-medium text-slate-500 hover:text-blue-500 flex items-center gap-2 group transition-all"
    >
      <div className="w-0 h-px bg-blue-500 group-hover:w-4 transition-all duration-300" />
      {label}
    </a>
  </li>
);

export default Footer;