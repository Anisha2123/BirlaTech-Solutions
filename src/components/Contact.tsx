import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, msg: "" });

    try {
      setLoading(true);
      await axios.post("https://formspree.io/f/mgvabkgv", form);
      setStatus({ type: 'success', msg: "Inquiry received. Our systems team will contact you shortly." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ type: 'error', msg: "Transmission failed. Please verify your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="md:py-32 max-sm:py-12 px-6 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Side: Context & Trust */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.4em] mb-6 block">
                Project Intake
              </span>
              <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                Let’s build the <br />
                <span className="text-blue-600">Next System.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-md">
                Ready to scale? Provide your project details and our lead architects will prepare a preliminary system audit for you.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-6">
                <TrustPoint icon={<ShieldCheck size={18} />} label="Enterprise-grade Security" />
                <TrustPoint icon={<Globe size={18} />} label="Global Infrastructure Ready" />
                <TrustPoint icon={<Zap size={18} />} label="Rapid 24h Initial Response" />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Minimalist Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-2 md:p-10 rounded-[2.5rem]"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField
                    label="Full Name"
                    icon={<User size={18} />}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e: any) => setForm({ ...form, name: e.target.value })}
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    icon={<Mail size={18} />}
                    placeholder="john@enterprise.com"
                    value={form.email}
                    onChange={(e: any) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <InputField
                  label="Project Brief"
                  icon={<MessageSquare size={18} />}
                  placeholder="Describe your technical requirements..."
                  isTextArea
                  value={form.message}
                  onChange={(e: any) => setForm({ ...form, message: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full md:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? "Processing..." : "Initiate Briefing"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>

              {/* Status Feedback */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-8 p-5 rounded-2xl flex items-center gap-3 border ${
                      status.type === 'success' 
                      ? 'bg-blue-50 border-blue-100 text-blue-700' 
                      : 'bg-red-50 border-red-100 text-red-700'
                    }`}
                  >
                    {status.type === 'success' && <CheckCircle2 size={20} />}
                    <span className="text-sm font-bold">{status.msg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TrustPoint = ({ icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center gap-4 text-slate-400">
    <div className="text-blue-600">{icon}</div>
    <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
  </div>
);

/* THE COMPONENT WITH THE ICON POSITION FIX */
const InputField = ({ label, icon, placeholder, value, onChange, isTextArea = false, type = "text" }: any) => (
  <div className="flex flex-col gap-4 group w-full">
    {/* Minimalist Tech Label */}
    <label className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    
    <div className="relative">
      {/* ICON FIX: 
          For normal input: top-1/2 -translate-y-1/2 (Centered)
          For textarea: top-1.5 (Pinned to the first line) 
      */}
      <div className={`absolute left-0 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300 ${
        isTextArea ? 'top-1.5' : 'top-1/2 -translate-y-1/2'
      }`}>
        {icon}
      </div>

      {isTextArea ? (
        <textarea
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-slate-200 py-1 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all resize-none font-sans text-base leading-relaxed"
          required
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-slate-200 py-1 pl-10 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-sans text-base h-10"
          required
        />
      )}
    </div>
  </div>
);

export default Contact;