'use client';

import { motion } from "framer-motion";
import { Database, BrainCircuit, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Data Ingestion",
    desc: "Ingests real-time feeds from PMS, OTA, and Competitor sets.",
    icon: Database,
    color: "text-slate-400"
  },
  {
    id: "02",
    title: "Neural Analysis",
    desc: "Proprietary LLMs diagnose revenue bleed and identify arbitrage.",
    icon: BrainCircuit,
    color: "text-[#D4AF37]" // Gold
  },
  {
    id: "03",
    title: "Autonomous Action",
    desc: "Executes pricing updates and inventory blocks in milliseconds.",
    icon: Zap,
    color: "text-emerald-400"
  }
];

export default function FeaturesSystem() {
  return (
    <section className="py-32 bg-[#02040a] border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
            System Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">The Autonomy Pipeline</h2>
        </motion.div>

        {/* The Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Animated Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-slate-800 via-[#D4AF37]/50 to-slate-800 z-0">
             <motion.div 
               animate={{ x: ["0%", "100%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="h-full w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
             />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-24 h-24 rounded-2xl bg-[#0B0C15] border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:border-[#D4AF37]/30 transition-colors duration-500 relative">
                <step.icon className={`w-10 h-10 ${step.color}`} />
                {/* Glow behind icon */}
                <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 ${step.color}`} />
              </div>

              {/* Text */}
              <div className="space-y-4 max-w-xs">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xs text-slate-600 border border-slate-800 px-2 py-1 rounded">
                    STEP {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-white">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}