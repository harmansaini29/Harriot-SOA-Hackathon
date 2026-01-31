'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Share2, Activity, Zap, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BentoArchitecture() {
  return (
    <section className="py-32 bg-[#02040a] relative overflow-hidden">
      
      {/* Ambient Background Glows - Deep & Atmospheric */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1000px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-[#020617] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 md:text-center max-w-3xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex flex-col gap-6 md:items-center"
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_-10px_rgba(255,255,255,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em]">System Architecture v3.0</span>
             </div>
             
             <h2 className="text-4xl md:text-6xl font-serif text-white leading-[0.95]">
               The Architecture <br />
               <span className="text-[#D4AF37] italic">of Luxury.</span>
             </h2>
             
             <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl md:text-center">
               A proprietary orchestration layer that fuses <span className="text-white">Neuro-Symbolic AI</span> with <span className="text-white">Bank-Grade Security</span>. Designed specifically for the complexity of high-RevPAR assets.
             </p>
          </motion.div>
        </div>

        {/* The 10/10 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
           
           {/* Card 1: Diagnostic Core (The Brain) - Spans 7 Cols */}
           <BentoCard className="md:col-span-7 md:row-span-2 bg-[#08090F]">
              <div className="flex flex-col justify-between h-full relative z-20">
                 
                 {/* Header */}
                 <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-4">
                       <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)]">
                          <Cpu className="w-8 h-8 text-[#D4AF37]" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-medium text-white">Diagnostic Core</h3>
                          <p className="text-xs text-[#D4AF37] font-mono mt-1 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                             NEURAL_ARBITER_ACTIVE
                          </p>
                       </div>
                    </div>
                    <Activity className="w-5 h-5 text-slate-700 animate-pulse" />
                 </div>
                 
                 {/* Main Content */}
                 <div className="space-y-6">
                    <p className="text-slate-400 leading-relaxed max-w-md">
                       The system ingests 400+ variables—from flight capacity to local event density—diagnosing revenue bleed with forensic accuracy before it appears on a P&L.
                    </p>
                    
                    {/* The "Holographic Terminal" - UPGRADED */}
                    <div className="bg-[#02040a]/80 rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden relative min-h-[140px]">
                       
                       {/* Animated Scan Line */}
                       <motion.div 
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent z-10"
                       />
                       
                       {/* Live Typing Sequence */}
                       <motion.div 
                          className="space-y-2 opacity-90"
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          variants={{
                             hidden: { opacity: 0 },
                             show: { opacity: 1, transition: { staggerChildren: 0.8 } }
                          }}
                       >
                          <TerminalLine time="09:41:22" type="CONNECT" msg="PMS_Stream::Marriott_v2" color="emerald" />
                          <TerminalLine time="09:41:23" type="ANALYZE" msg="Detecting Weekday Variance..." color="blue" />
                          <TerminalLine time="09:41:24" type="WARN" msg="Corp Rate -15% vs Compset (Impact: -$12k)" color="gold" />
                          <TerminalLine time="09:41:25" type="EXECUTE" msg="Initiating Yield Protocol Alpha..." color="emerald" />
                       </motion.div>
                    </div>
                 </div>
              </div>
              
              {/* Artistic Gradient Blob */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
           </BentoCard>

           {/* Card 2: Vault Grade Security (The Shield) - Spans 5 Cols */}
           <BentoCard className="md:col-span-5 md:row-span-1 bg-[#0B0C15]">
              <div className="relative z-20 h-full flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-white flex items-center gap-3">
                       <ShieldCheck className="w-5 h-5 text-emerald-500" />
                       Vault Grade
                    </h3>
                    <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400 font-mono">SOC2 TYPE II</div>
                 </div>
                 
                 <p className="text-slate-400 text-sm mb-6 flex-1">
                    Your data is encrypted at rest and in transit using AES-256 GCM. We deploy dedicated VPCs for enterprise clients.
                 </p>

                 {/* Visual Encryption Layer Stacking */}
                 <div className="flex gap-1 h-12 items-end opacity-60">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                       <motion.div 
                          key={i}
                          initial={{ height: '20%' }}
                          whileInView={{ height: '100%' }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="flex-1 bg-emerald-900/40 border-t border-emerald-500/30 rounded-t-sm backdrop-blur-sm"
                       />
                    ))}
                 </div>
              </div>
           </BentoCard>

           {/* Card 3: Alpha Seek (Reinforcement Learning) - Spans 5 Cols */}
           <BentoCard className="md:col-span-5 md:row-span-1 bg-[#0B0C15] group">
              <div className="relative z-20 h-full flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium text-white flex items-center gap-3">
                       <Zap className="w-5 h-5 text-purple-400" />
                       Alpha Seek
                    </h3>
                 </div>
                 
                 <p className="text-slate-400 text-sm mb-4">
                    Continuous Reinforcement Learning (RL) models that adapt to micro-market shifts in milliseconds.
                 </p>

                 {/* Animated Bars */}
                 <div className="flex items-end gap-1 h-16 mt-auto">
                    {[40, 75, 55, 90, 65, 80, 45, 95].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: '10%' }}
                         whileInView={{ height: `${h}%` }}
                         transition={{ duration: 1.5, delay: i * 0.05, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                         className="flex-1 bg-gradient-to-t from-purple-900/20 to-purple-500/50 rounded-t-sm border-t border-purple-400/30 shadow-[0_0_10px_-5px_rgba(168,85,247,0.5)]"
                       />
                    ))}
                 </div>
              </div>
           </BentoCard>

           {/* Card 4: Execution Layer (The Connector) - Spans 12 Cols (Full Width) */}
           <BentoCard className="md:col-span-12 md:row-span-1 bg-gradient-to-r from-[#0B0C15] via-[#0D0F1A] to-[#0B0C15]">
              <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 h-full px-4">
                 
                 <div className="flex items-start gap-6 max-w-2xl">
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 hidden md:block">
                       <Share2 className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-medium text-white mb-2">Universal Execution Layer</h3>
                       <p className="text-slate-400 text-sm leading-relaxed">
                          We don't just advise; we act. The system autonomously pushes updates to Opera, Mews, SynXis, and 40+ other PMS/CRS providers with zero latency.
                       </p>
                    </div>
                 </div>

                 {/* Connection Nodes Visual */}
                 <div className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-all duration-500">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-600" />
                    <div className="flex gap-3">
                       {['OPERA', 'MEWS', 'SYNXIS', 'SITEMINDER'].map((tech) => (
                          <div key={tech} className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-slate-300 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-colors cursor-default">
                             <Server className="w-3 h-3 text-slate-500" />
                             {tech}
                          </div>
                       ))}
                    </div>
                 </div>

              </div>
           </BentoCard>

        </div>
      </div>
    </section>
  );
}

// --- SUB COMPONENTS ---

// Helper for the typing terminal
const TerminalLine = ({ time, type, msg, color }: any) => {
   const colors = {
      emerald: "text-emerald-400",
      blue: "text-blue-400",
      gold: "text-[#D4AF37]"
   };
   
   return (
      <motion.div 
         variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
         className="flex gap-2"
      >
         <span className="text-slate-500">{time}</span> 
         <span className={colors[color as keyof typeof colors] || "text-slate-300"}>{type}</span> 
         <span className="text-slate-300">{msg}</span>
      </motion.div>
   );
};

// The "Million Dollar" Card Component
function BentoCard({ children, className }: { children: React.ReactNode, className?: string }) {
   return (
      <motion.div 
         whileHover={{ y: -5 }}
         transition={{ type: "spring", stiffness: 300, damping: 20 }}
         className={cn(
            "rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-500 shadow-2xl backdrop-blur-sm",
            className
         )}
      >
         {/* Noise Texture Overlay */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none" />
         
         {/* Hover Gradient Spotlight */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-transparent group-hover:from-[#D4AF37]/5 transition-all duration-700 pointer-events-none" />
         
         {children}
      </motion.div>
   )
}