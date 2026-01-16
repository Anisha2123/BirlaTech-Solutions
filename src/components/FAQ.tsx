import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, MoveDown, Move3D, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How does Devlyn ensure system scalability?",
    answer: "We architect every system with a 'Scale-First' approach. Using stateless microservices, auto-scaling AWS infrastructure, and edge-caching via CloudFront, your platform is engineered to handle 10x traffic spikes with zero latency degradation."
  },
  {
    question: "Do we maintain full ownership of the source code?",
    answer: "Yes. Upon project completion and final settlement, 100% of the intellectual property and source code are transferred to your organization. We provide clean, documented, and audited repositories."
  },
  {
    question: "What is the typical deployment timeline for an MVP?",
    answer: "Our standard 'Venture MVP' cycle is 4 to 8 weeks. This includes architectural planning, core feature development, and cloud-native deployment. We prioritize high-velocity delivery without compromising structural integrity."
  },
  {
    question: "How is data security handled in enterprise builds?",
    answer: "Security is integrated at the protocol level. We implement AES-256 encryption at rest, TLS 1.3 in transit, and multi-factor authentication (MFA) as standard. All systems are built to follow OWASP security best practices."
  },
  {
    question: "Does Devlyn provide post-launch reliability engineering?",
    answer: "Absolutely. Our 'Continuous Optimization' tier provides 24/7 monitoring, automated backups, and monthly security audits to ensure your production environment remains elite and secure."
  }
];

const EnterpriseFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="md:py-12 max-sm:py-12 px-6 bg-white border-t border-slate-50">
  <div className="max-w-7xl mx-auto"> {/* Changed from max-w-4xl to match other sections */}
    
    {/* Header Section: Now properly aligned to the edges */}
    <div className="flex flex-col md:flex-row md:items-end justify-between md:mb-24 gap-8">
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
            Technical Inquiry
          </span>
        </motion.div>

        {/* Authority Headline */}
        <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          Frequently Asked <br />
          <span className="text-slate-400 font-light italic text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-500">
            Protocols.
          </span>
        </h2>
      </div>

      {/* Refined Context Subtext */}
      <p className="font-sans text-slate-500 text-lg max-w-sm leading-relaxed border-l border-slate-100 pl-8 pb-2">
        Common inquiries regarding our <span className="text-slate-900 font-semibold">architectural standards</span>, security protocols, and engineering delivery timelines.
      </p>
    </div>

    {/* Content Wrapper: We keep the accordion narrower (max-w-4xl) for better reading UX */}
    <div className="max-w-4xl mx-auto">
      {/* Accordion List */}
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            faq={faq} 
            isOpen={activeIndex === index} 
            toggle={() => setActiveIndex(activeIndex === index ? null : index)} 
          />
        ))}
      </div>

      {/* Closing CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="md:mt-24 p-10 rounded-[2rem] bg-slate-900 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />
        <p className="relative z-10 font-sans text-slate-400 mb-6 font-medium">Still have architectural questions?</p>
        <a 
          href="#contact"
          className="relative z-10 inline-flex items-center gap-3 font-heading text-2xl font-bold text-white hover:text-blue-400 transition-all group"
        >
          Speak with a Lead Architect 
          <ArrowUpRight size={28} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </motion.div>
    </div>
  </div>
</section>
  );
};

const FAQItem = ({ faq, isOpen, toggle }: { faq: any, isOpen: boolean, toggle: () => void }) => {
  return (
    <div className={`border-b border-slate-100 transition-colors duration-500 ${isOpen ? 'bg-slate-50/50' : ''}`}>
      <button
        onClick={toggle}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className={`font-heading text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>
          {faq.question}
        </span>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-8 pr-12">
              <p className="font-sans text-slate-500 leading-relaxed text-base">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnterpriseFAQ;