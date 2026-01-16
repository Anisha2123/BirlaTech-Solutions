import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    // { id: "architecture", label: "Architecture" },
    { id: "industries", label: "Industries" },
    // { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 80; // Account for navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500`}>
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
          ${scrolled 
            ? "bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl shadow-slate-900/5" 
            : "bg-transparent border border-transparent"}
        `}>
          
          {/* BRAND/LOGO */}
<div 
  onClick={() => scrollToSection("home")}
  className="flex items-center gap-3 cursor-pointer group"
>
  {/* Modern Iconography */}
  <div className="relative w-10 h-10 flex items-center justify-center">
    
    {/* Background Square (The Foundation) */}
    <motion.div 
      whileHover={{ rotate: 90 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute inset-0 bg-blue-600 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"
    />
    
    {/* Corrected Inner "D" (Blueprint Style) */}
    <div className="relative z-10 flex items-center justify-center ml-0.5">
      {/* Vertical Pillar of the D */}
      <div className="w-[2.5px] h-4 bg-white rounded-full mr-[1px]" />
      
      {/* The Curve of the D */}
      <div className="w-3.5 h-4 border-y-[2.5px] border-r-[2.5px] border-white rounded-r-md" />
      
      {/* Minimalist Tech Dot */}
      <div className="absolute left-[3px] w-1 h-1 bg-blue-200 rounded-full animate-pulse" />
    </div>
    
    {/* Refined Glow */}
    <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
  </div>

  {/* Typography */}
  <div className="flex flex-col">
    <span className="text-xl font-black tracking-[-0.02em] text-slate-900 flex items-center leading-none">
      DEV<span className="text-blue-600">LYN</span>
    </span>
    <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-1 group-hover:text-blue-600 transition-colors">
      Digital Systems
    </span>
  </div>
</div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection("contact")}
              className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Start Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
    className="md:hidden p-2 text-slate-900 transition-colors hover:text-blue-600"
    onClick={() => setMenuOpen(true)}
  >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 w-full h-screen bg-white z-[100] flex flex-col p-6 overflow-hidden"
    >
      {/* INTERNAL HEADER: Keeps the brand and X button visible */}
      <div className="flex justify-between items-center mb-16">
        <span className="font-heading font-black text-2xl tracking-tighter text-slate-900">
          DEVLYN<span className="text-blue-600">.</span>
        </span>
        <button
          className="p-2 text-slate-900 hover:rotate-90 transition-transform duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex flex-col flex-1 justify-center">
        <ul className="space-y-6">
          {navItems.map((item, idx) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(item.id);
                }}
                className="group flex flex-col items-start"
              >
                <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] mb-1">
                  Protocol 0{idx + 1}
                </span>
                <span className="text-5xl font-black tracking-tighter text-slate-900 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300">
                  {item.label}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* FOOTER CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-10 border-t border-slate-100"
      >
        <button 
          onClick={() => {
            setMenuOpen(false);
            scrollToSection("contact");
          }}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          Request Audit <ArrowRight size={16} className="text-blue-400" />
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
};

export default Navbar;