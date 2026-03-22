import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search, Layers, TrendingUp, BarChart2,
  CheckCircle2, X, Calendar, ChevronRight,
  ArrowUpRight, ChevronDown, Zap
} from "lucide-react";

const C = { bg: "#F3F4F4", rose: "#853953", plum: "#612D53", dark: "#2C2C2C" };

const STEPS = [
  {
    num: "01", cat: "Foundation", icon: Search,
    title: "Discovery & Strategy",
    short: "Brand audit, competitor research, and a 90-day growth roadmap tailored to your audience.",
    full: "We start with a comprehensive brand audit — evaluating your existing digital footprint, competitor landscape, target audience personas, and business goals. The output is a precise 90-day growth blueprint covering both web and social channels.",
    deliverables: ["Brand & competitor audit report","Audience persona mapping","90-day content & web roadmap","KPI baseline & target setting","Channel strategy recommendation"],
    tools: ["Google Analytics","SEMrush","Meta Business Suite","Notion","Loom"],
    stats: [{ n: "7 days", l: "Onboarding" }, { n: "100%", l: "Custom plan" }],
  },
  {
    num: "02", cat: "Creation", icon: Layers,
    title: "Build & Produce",
    short: "Custom web engineering and content production — from React / Next.js builds to scroll-stopping social creative.",
    full: "Our web team and social creatives work in parallel — engineering your custom website or web app while producing branded content: static posts, carousels, reels, and ad creatives. Everything is QA'd against brand guidelines before it goes live.",
    deliverables: ["Custom web design & development","30+ social media content pieces","Ad creative sets (static + video)","Brand style guide enforcement","QA & performance testing"],
    tools: ["React","Next.js","Figma","Adobe Premiere","CapCut Pro"],
    stats: [{ n: "30+", l: "Content/mo" }, { n: "6 wk", l: "Web delivery" }],
  },
  {
    num: "03", cat: "Growth", icon: TrendingUp,
    title: "Launch & Amplify",
    short: "Multi-channel go-live — paid ad campaigns, organic publishing, and real-time performance optimisation.",
    full: "We launch across all agreed channels simultaneously: paid Meta & Google campaigns, organic social publishing, and your new website. Our team monitors performance in real time, adjusting bids, creative, and posting times within 24 hours of going live.",
    deliverables: ["Live Meta & Google ad campaigns","Organic social publishing schedule","Website go-live & CDN setup","Real-time bid optimisation","UTM tracking implementation"],
    tools: ["Meta Ads","Google Ads","Vercel","Cloudflare","GA4"],
    stats: [{ n: "4.2×", l: "Avg ROAS" }, { n: "24 hr", l: "Optimisation" }],
  },
  {
    num: "04", cat: "Intelligence", icon: BarChart2,
    title: "Report & Iterate",
    short: "Monthly deep-dive reports, A/B test insights, and continuous iteration to compound your results.",
    full: "Every month we deliver a plain-language report covering reach, engagement, ROAS, CPA, web traffic, and conversion attribution. We then run a strategy refinement session to A/B test new hypotheses — so results compound month over month.",
    deliverables: ["Monthly performance deep-dive","Looker Studio live dashboard","A/B test results & next steps","SEO health check","Quarterly strategy review"],
    tools: ["Looker Studio","GA4","Meta Insights","Hotjar","Notion"],
    stats: [{ n: "98%", l: "Retention" }, { n: "Monthly", l: "Reporting" }],
  },
];

type Step = typeof STEPS[0];

// ─── SHARED MODAL ─────────────────────────────────────────────────────────────
function StepModal({ step, onClose }: { step: Step | null; onClose: () => void }) {
  useEffect(() => {
    if (step) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [step]);
  if (!step) return null;
  return (
    <AnimatePresence>
      {step && (
        <>
          <motion.div key="bd"
            style={{ position:"fixed",inset:0,zIndex:100,background:"rgba(44,44,44,0.6)",backdropFilter:"blur(6px)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}
          />
          <motion.div key="panel"
            style={{ position:"fixed",inset:0,zIndex:101,display:"flex",alignItems:"center",justifyContent:"center",padding:16,pointerEvents:"none" }}>
            <motion.div
              style={{ width:"100%",maxWidth:520,borderRadius:28,overflow:"hidden",pointerEvents:"auto",background:"#fff" }}
              initial={{ y:40,scale:0.94,opacity:0 }} animate={{ y:0,scale:1,opacity:1 }}
              exit={{ y:40,scale:0.94,opacity:0 }} transition={{ type:"spring",stiffness:320,damping:28 }}
              onClick={e=>e.stopPropagation()}
            >
              <div style={{ position:"relative",padding:"1.75rem",overflow:"hidden",background:`linear-gradient(135deg,${C.plum},${C.dark})` }}>
                <div style={{ position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:C.rose,opacity:0.2,filter:"blur(40px)",pointerEvents:"none" }} />
                <button onClick={onClose} style={{ position:"absolute",top:16,right:16,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.12)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <X size={13} color="#fff" />
                </button>
                <p style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.2em",color:"rgba(255,255,255,0.35)",marginBottom:6 }}>Step {step.num}</p>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:"white",margin:"0 0 8px",lineHeight:1.2 }}>{step.title}</h3>
                <span style={{ display:"inline-block",fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.2em",padding:"4px 12px",borderRadius:100,background:"rgba(133,57,83,0.28)",color:"#f0a0b8" }}>{step.cat}</span>
                <div style={{ display:"flex",gap:12,marginTop:16 }}>
                  {step.stats.map(s=>(
                    <div key={s.l} style={{ padding:"8px 14px",borderRadius:12,background:"rgba(255,255,255,0.1)" }}>
                      <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"white",lineHeight:1,margin:0 }}>{s.n}</p>
                      <p style={{ fontSize:10,color:"rgba(255,255,255,0.42)",letterSpacing:"0.1em",margin:"3px 0 0" }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding:"1.75rem",maxHeight:"55vh",overflowY:"auto" }}>
                <p style={{ fontSize:14,lineHeight:1.75,color:"#666",fontWeight:300,marginBottom:20 }}>{step.full}</p>
                <p style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.18em",color:C.rose,marginBottom:12 }}>Deliverables</p>
                <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:20 }}>
                  {step.deliverables.map(d=>(
                    <div key={d} style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <CheckCircle2 size={14} color={C.rose} style={{ flexShrink:0 }} />
                      <span style={{ fontSize:14,fontWeight:500,color:C.dark }}>{d}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.18em",color:C.rose,marginBottom:12 }}>Tools & Platforms</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:20 }}>
                  {step.tools.map(t=>(
                    <span key={t} style={{ fontSize:11,fontWeight:500,padding:"6px 12px",borderRadius:100,background:"rgba(133,57,83,0.07)",color:C.plum,border:`1px solid rgba(133,57,83,0.15)` }}>{t}</span>
                  ))}
                </div>
                <button onClick={onClose} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",borderRadius:16,fontWeight:600,color:"white",fontSize:14,background:`linear-gradient(135deg,${C.rose},${C.plum})`,border:"none",cursor:"pointer" }}>
                  <CheckCircle2 size={15} /> Got it — let's start
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── DESKTOP StepCard (untouched) ─────────────────────────────────────────────
function StepCard({ step, index, onOpen }: { step: Step; index: number; onOpen: () => void }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }}
      viewport={{ once:true,margin:"-30px" }}
      transition={{ duration:0.55,delay:index*0.1,ease:[0.22,1,0.36,1] }}
      whileHover={{ y:-5,transition:{ duration:0.22 } }}
      onClick={onOpen}
      className="relative rounded-3xl overflow-hidden cursor-pointer group flex flex-col"
      style={{ background:"#fff",border:"1px solid rgba(133,57,83,0.1)",padding:"1.75rem 1.5rem 1.5rem",fontFamily:"'Outfit',sans-serif" }}
    >
      <span className="absolute bottom-0 right-2 pointer-events-none select-none"
        style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"5rem",fontWeight:700,color:"rgba(133,57,83,0.05)",lineHeight:1 }}>{step.num}</span>
      <div className="relative w-12 h-12 mb-5 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border" style={{ background:"#fff",borderColor:"rgba(133,57,83,0.2)" }} />
        <span className="relative z-10 text-[10px] font-semibold tracking-[.1em]" style={{ color:"rgba(133,57,83,0.45)" }}>{step.num}</span>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background:`linear-gradient(135deg,${C.rose},${C.plum})` }} />
        <span className="relative z-10 text-[10px] font-semibold tracking-[.1em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">{step.num}</span>
      </div>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background:"rgba(133,57,83,0.08)" }}>
          <Icon size={15} color={C.rose} />
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-[.18em]" style={{ color:C.rose }}>{step.cat}</span>
      </div>
      <h3 className="font-bold leading-tight mb-2 group-hover:text-rose-800 transition-colors duration-300"
        style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem",color:C.dark }}>{step.title}</h3>
      <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color:"#999",fontWeight:300 }}>{step.short}</p>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.14em]" style={{ color:C.rose }}>
        View Details <ChevronRight size={12} color={C.rose} className="transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}

// ─── TABLET StepCard (horizontal layout) ──────────────────────────────────────
function TabletStepCard({ step, index, onOpen }: { step: Step; index: number; onOpen: () => void }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-20px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0,y:14 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.48,delay:index*0.07,ease:[0.22,1,0.36,1] }}
      onClick={onOpen}
      whileTap={{ scale:0.985 }}
      style={{
        display:"flex",gap:14,alignItems:"flex-start",
        background:"#fff",borderRadius:18,cursor:"pointer",
        border:"1px solid rgba(133,57,83,0.09)",
        padding:"1.1rem 1.1rem",
        boxShadow:"0 2px 12px rgba(44,44,44,0.04)",
        position:"relative",overflow:"hidden",
        transition:"box-shadow 0.2s",
      }}
    >
      <div style={{ width:42,height:42,borderRadius:13,flexShrink:0,background:`rgba(133,57,83,0.08)`,border:"1px solid rgba(133,57,83,0.1)",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <Icon size={17} color={C.rose} />
      </div>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4 }}>
          <span style={{ fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.rose }}>{step.num} · {step.cat}</span>
          <ArrowUpRight size={13} color="rgba(133,57,83,0.35)" />
        </div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:700,color:C.dark,margin:"0 0 4px",lineHeight:1.2 }}>{step.title}</h3>
        <p style={{ fontSize:11.5,color:"#aaa",lineHeight:1.6,margin:"0 0 10px",fontWeight:300 }}>{step.short}</p>
        <div style={{ display:"flex",gap:6 }}>
          {step.stats.map(s=>(
            <div key={s.l} style={{ padding:"4px 10px",borderRadius:8,background:"rgba(133,57,83,0.06)",border:"1px solid rgba(133,57,83,0.09)" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"0.92rem",fontWeight:700,color:C.rose }}>{s.n}</span>
              <span style={{ fontSize:9,color:"#bbb",marginLeft:4 }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
      <span style={{ position:"absolute",bottom:-6,right:8,fontFamily:"'Cormorant Garamond',serif",fontSize:"3.8rem",fontWeight:700,color:"rgba(133,57,83,0.04)",lineHeight:1,pointerEvents:"none",userSelect:"none" }}>{step.num}</span>
    </motion.div>
  );
}

// ─── MOBILE Accordion Row ─────────────────────────────────────────────────────
function MobileAccordionStep({ step, index, isOpen, onToggle, onOpenModal }:
  { step:Step; index:number; isOpen:boolean; onToggle:()=>void; onOpenModal:()=>void }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-10px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}}
      transition={{ duration:0.38,delay:index*0.055 }}
      style={{ background:"#fff",borderRadius:14,border:"1px solid rgba(133,57,83,0.09)",overflow:"hidden",boxShadow:isOpen?"0 6px 24px rgba(133,57,83,0.1)":"0 1px 6px rgba(44,44,44,0.04)",transition:"box-shadow 0.2s" }}
    >
      <button onClick={onToggle}
        style={{ width:"100%",display:"flex",alignItems:"center",gap:11,padding:"11px 13px",background:"none",border:"none",cursor:"pointer",textAlign:"left" }}>
        <div style={{ width:34,height:34,borderRadius:10,flexShrink:0,background:isOpen?`linear-gradient(135deg,${C.rose},${C.plum})`:"rgba(133,57,83,0.08)",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.22s",boxShadow:isOpen?"0 4px 12px rgba(133,57,83,0.28)":"none" }}>
          <Icon size={14} color={isOpen?"#fff":C.rose} />
        </div>
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:2 }}>
            <span style={{ fontSize:8,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:isOpen?C.rose:"#bbb",transition:"color 0.2s" }}>{step.num} · {step.cat}</span>
          </div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",fontWeight:700,color:isOpen?C.dark:"#777",lineHeight:1.15,margin:0,transition:"color 0.2s" }}>{step.title}</h3>
        </div>
        <motion.div animate={{ rotate:isOpen?180:0 }} transition={{ duration:0.22 }} style={{ flexShrink:0,color:isOpen?C.rose:"#ccc" }}>
          <ChevronDown size={15} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="body"
            initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
            exit={{ height:0,opacity:0 }} transition={{ duration:0.3,ease:[0.22,1,0.36,1] }}
            style={{ overflow:"hidden" }}
          >
            <div style={{ padding:"0 13px 13px",borderTop:"1px solid rgba(133,57,83,0.07)" }}>
              {/* Stats */}
              <div style={{ display:"flex",gap:7,margin:"11px 0 9px" }}>
                {step.stats.map(s=>(
                  <div key={s.l} style={{ flex:1,padding:"7px 0",textAlign:"center",background:"rgba(133,57,83,0.05)",borderRadius:9,border:"1px solid rgba(133,57,83,0.08)" }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.2rem",fontWeight:700,color:C.rose,lineHeight:1 }}>{s.n}</div>
                    <div style={{ fontSize:8,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:12,color:"#888",lineHeight:1.65,margin:"0 0 9px",fontWeight:300 }}>{step.short}</p>
              <div style={{ display:"flex",flexDirection:"column",gap:5,marginBottom:10 }}>
                {step.deliverables.slice(0,3).map(d=>(
                  <div key={d} style={{ display:"flex",alignItems:"center",gap:7 }}>
                    <div style={{ width:4,height:4,borderRadius:"50%",background:C.rose,flexShrink:0 }} />
                    <span style={{ fontSize:11.5,color:C.dark,fontWeight:400 }}>{d}</span>
                  </div>
                ))}
                {step.deliverables.length>3 && (
                  <span style={{ fontSize:10,color:"rgba(133,57,83,0.45)",paddingLeft:11,fontStyle:"italic" }}>+{step.deliverables.length-3} more</span>
                )}
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5,marginBottom:11 }}>
                {step.tools.map(t=>(
                  <span key={t} style={{ fontSize:9,fontWeight:600,padding:"3px 9px",borderRadius:100,background:"rgba(133,57,83,0.07)",color:C.plum,border:"1px solid rgba(133,57,83,0.11)" }}>{t}</span>
                ))}
              </div>
              <button onClick={onOpenModal} style={{ width:"100%",padding:"10px",borderRadius:11,background:`linear-gradient(135deg,${C.rose},${C.plum})`,color:"white",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",display:"flex",alignItems:"center",justifyContent:"center",gap:6,boxShadow:"0 5px 16px rgba(133,57,83,0.25)" }}>
                Full Details <ArrowUpRight size={11} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MOBILE sticky mini-nav ───────────────────────────────────────────────────
function MobileStickyBar() {
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const el = document.getElementById("process");
    if (!el) return;
    const obs = new IntersectionObserver(([e])=>setShow(!e.isIntersecting && e.boundingClientRect.top<0),{threshold:0});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y:-40,opacity:0 }} animate={{ y:0,opacity:1 }} exit={{ y:-40,opacity:0 }} transition={{ duration:0.25 }}
          style={{ position:"fixed",top:0,left:0,right:0,zIndex:80,background:"rgba(243,244,244,0.95)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(133,57,83,0.1)",padding:"7px 14px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:7 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:C.rose }} />
            <span style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",fontWeight:700,color:C.dark }}>Our Process</span>
          </div>
          <span style={{ fontSize:8,fontFamily:"monospace",color:"#bbb",letterSpacing:"0.12em",textTransform:"uppercase" }}>4 phases</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const ProcessSection = () => {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{
      if (e.isIntersecting && lineRef.current) { lineRef.current.style.width="100%"; obs.disconnect(); }
    },{ threshold:0.3 });
    if (lineRef.current) obs.observe(lineRef.current.parentElement!);
    return ()=>obs.disconnect();
  },[]);

  return (
    <>
      <StepModal step={selectedStep} onClose={()=>setSelectedStep(null)} />

      <div className="p-mob-only"><MobileStickyBar /></div>

      <style>{`
        .p-mob-only   { display:block; }
        .p-tab-only   { display:none;  }
        .p-desk-only  { display:none;  }
        @media (min-width:768px) and (max-width:1023px) {
          .p-mob-only  { display:none;  }
          .p-tab-only  { display:block; }
          .p-desk-only { display:none;  }
        }
        @media (min-width:1024px) {
          .p-mob-only  { display:none;  }
          .p-tab-only  { display:none;  }
          .p-desk-only { display:block; }
        }
        .pill-bar::-webkit-scrollbar { display:none; }
        .pill-bar { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      <section id="process" className="scroll-mt-24" style={{ background:C.bg,fontFamily:"'Outfit',sans-serif" }}>

        {/* ════════════════════════════════════
            DESKTOP ≥1024px — ORIGINAL EXACT
        ════════════════════════════════════ */}
        <div className="p-desk-only" style={{ padding:"5rem 0 6rem" }}>
          <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 2rem" }}>
            <div className="flex flex-wrap items-end justify-between gap-8 mb-14">
              <div>
                <motion.div initial={{ opacity:0,x:-14 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
                  className="flex items-center gap-3 mb-5">
                  <div style={{ height:1,width:"2rem",background:C.rose }} />
                  <span className="text-[10px] font-semibold uppercase tracking-[.3em]" style={{ color:C.rose }}>Our Methodology</span>
                </motion.div>
                <motion.h2 initial={{ opacity:0,y:18 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7,delay:0.1 }}
                  style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.4rem,4.5vw,4rem)",fontWeight:700,lineHeight:1.06,letterSpacing:"-0.02em",color:C.dark }}>
                  How We Deliver <em style={{ color:C.rose }}>Results.</em>
                </motion.h2>
              </div>
              <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.8,delay:0.2 }}
                className="text-sm leading-relaxed max-w-xs"
                style={{ color:"#888",fontWeight:300,borderLeft:`2px solid rgba(133,57,83,0.2)`,paddingLeft:"1rem" }}>
                A battle-tested 4-phase framework built for{" "}
                <span style={{ color:C.dark,fontWeight:500 }}>web and social media</span>{" "}
                growth — from zero to measurable ROI.
              </motion.p>
            </div>
            <div className="relative mb-2 hidden lg:block">
              <div className="absolute top-10 left-0 right-0 h-px" style={{ background:"rgba(133,57,83,0.1)" }}>
                <div ref={lineRef} style={{ height:"1px",width:"0%",background:C.rose,transformOrigin:"left",transition:"width 1.5s cubic-bezier(.22,1,.36,1)" }} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {STEPS.map((s,i)=><StepCard key={s.num} step={s} index={i} onOpen={()=>setSelectedStep(s)} />)}
            </div>
            <motion.div initial={{ opacity:0,y:22 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7,delay:0.2 }}
              className="mt-16 rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-6 px-9 py-9"
              style={{ background:`linear-gradient(130deg,${C.plum},${C.dark})` }}>
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full pointer-events-none" style={{ background:C.rose,opacity:0.15,filter:"blur(44px)" }} />
              <div className="relative z-10">
                <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily:"'Cormorant Garamond',serif" }}>Ready to start the process?</p>
                <p className="text-sm" style={{ color:"rgba(255,255,255,0.42)" }}>From discovery call to live campaign in as little as 2 weeks.</p>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white hover:opacity-90" style={{ background:C.rose }}>
                  <Calendar size={14} /> Book a Discovery Call <ArrowUpRight size={13} />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white" style={{ background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.14)" }}>
                  <ChevronRight size={14} /> View Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════
            TABLET 768–1023px — compact hybrid
        ════════════════════════════════════ */}
        <div className="p-tab-only" style={{ padding:"3rem 0 3.5rem" }}>
          <div style={{ maxWidth:900,margin:"0 auto",padding:"0 1.5rem" }}>
            <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"1.25rem",marginBottom:"2rem" }}>
              <div>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:9 }}>
                  <div style={{ height:1,width:26,background:C.rose }} />
                  <span style={{ fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.3em",color:C.rose }}>Methodology</span>
                </div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.6rem)",fontWeight:700,lineHeight:1.1,color:C.dark,margin:0,letterSpacing:"-0.02em" }}>
                  How We Deliver <em style={{ color:C.rose }}>Results.</em>
                </h2>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2.6rem",fontWeight:700,color:"rgba(133,57,83,0.1)",lineHeight:1 }}>04</div>
                <div style={{ fontSize:10,color:"#bbb",fontWeight:300 }}>phases</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem",marginBottom:"1.25rem" }}>
              {STEPS.map((s,i)=><TabletStepCard key={s.num} step={s} index={i} onOpen={()=>setSelectedStep(s)} />)}
            </div>
            <div style={{ borderRadius:18,overflow:"hidden",position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",gap:14,padding:"1.1rem 1.4rem",background:`linear-gradient(130deg,${C.plum},${C.dark})` }}>
              <div style={{ position:"absolute",top:-30,left:-30,width:110,height:110,borderRadius:"50%",background:C.rose,opacity:0.13,filter:"blur(32px)",pointerEvents:"none" }} />
              <div style={{ position:"relative",zIndex:1 }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:700,color:"white",margin:"0 0 3px" }}>Ready to start?</p>
                <p style={{ fontSize:12,color:"rgba(255,255,255,0.38)",margin:0 }}>Discovery → live in 2 weeks.</p>
              </div>
              <div style={{ position:"relative",zIndex:1,display:"flex",gap:8,flexShrink:0 }}>
                <a href="#contact" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:11,fontSize:12,fontWeight:600,color:"white",background:C.rose,textDecoration:"none" }}>
                  <Calendar size={13}/> Book Call
                </a>
                <a href="#services" style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"9px 14px",borderRadius:11,fontSize:12,fontWeight:600,color:"white",textDecoration:"none",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.12)" }}>
                  Services <ChevronRight size={12}/>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            MOBILE <768px — dense app UI
        ════════════════════════════════════ */}
        <div className="p-mob-only" style={{ padding:"1rem 0 1.5rem" }}>
          <div style={{ padding:"0 12px" }}>

            {/* App-style section header */}
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
              <div>
                <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:3 }}>
                  <div style={{ width:16,height:1.5,background:C.rose,borderRadius:2 }} />
                  <span style={{ fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.28em",color:C.rose }}>Process</span>
                </div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:C.dark,margin:0,lineHeight:1.1 }}>
                  How We <em style={{ color:C.rose }}>Deliver.</em>
                </h2>
              </div>
              <div style={{ padding:"7px 13px",borderRadius:12,background:`rgba(133,57,83,0.08)`,border:"1px solid rgba(133,57,83,0.1)",textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:C.rose,lineHeight:1 }}>04</div>
                <div style={{ fontSize:7,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:2 }}>phases</div>
              </div>
            </div>

            {/* Pill filter strip */}
            <div className="pill-bar" style={{ display:"flex",gap:6,overflowX:"auto",marginBottom:12,paddingBottom:1 }}>
              {STEPS.map((s,i)=>{
                const Icon = s.icon;
                const active = openIndex===i;
                return (
                  <motion.button key={s.num} onClick={()=>setOpenIndex(active?-1:i)} whileTap={{ scale:0.92 }}
                    style={{ display:"flex",alignItems:"center",gap:5,padding:"5px 11px",borderRadius:100,flexShrink:0,cursor:"pointer",transition:"all 0.2s",border:"1px solid",borderColor:active?C.rose:"rgba(133,57,83,0.14)",background:active?`linear-gradient(135deg,${C.rose},${C.plum})`:"white" }}>
                    <Icon size={10} color={active?"#fff":C.rose} />
                    <span style={{ fontSize:10,fontWeight:600,color:active?"white":C.dark,letterSpacing:"0.03em",whiteSpace:"nowrap" }}>
                      {s.title.split(" ").slice(0,2).join(" ")}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Accordion list */}
            <div style={{ display:"flex",flexDirection:"column",gap:7,marginBottom:12 }}>
              {STEPS.map((s,i)=>(
                <MobileAccordionStep key={s.num} step={s} index={i}
                  isOpen={openIndex===i}
                  onToggle={()=>setOpenIndex(openIndex===i?-1:i)}
                  onOpenModal={()=>setSelectedStep(s)}
                />
              ))}
            </div>

            {/* Dense metrics row */}
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5,marginBottom:11 }}>
              {[{n:"4.2×",l:"ROAS"},{n:"98%",l:"Retained"},{n:"30+",l:"Content"},{n:"2wk",l:"To Live"}].map(m=>(
                <div key={m.l} style={{ background:"white",borderRadius:11,padding:"7px 4px",textAlign:"center",border:"1px solid rgba(133,57,83,0.08)" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",fontWeight:700,color:C.rose,lineHeight:1 }}>{m.n}</div>
                  <div style={{ fontSize:7.5,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:2 }}>{m.l}</div>
                </div>
              ))}
            </div>

            {/* Full-width app CTA */}
            <motion.a href="#contact" whileTap={{ scale:0.97 }}
              style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:9,padding:"13px",borderRadius:14,textDecoration:"none",background:`linear-gradient(135deg,${C.rose},${C.plum})`,color:"white",fontWeight:700,fontSize:13,letterSpacing:"0.04em",boxShadow:"0 8px 26px rgba(133,57,83,0.28)" }}>
              <Zap size={13} fill="white" color="white" />
              Book a Discovery Call
              <ArrowUpRight size={13} />
            </motion.a>

          </div>
        </div>

      </section>
    </>
  );
};

export default ProcessSection;