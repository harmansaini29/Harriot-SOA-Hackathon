'use client';

import { Terminal, Zap, ShieldCheck, BarChart3, Lock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BentoGrid() {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Neural Architecture</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Built on a proprietary LangGraph orchestration layer that mimics human reasoning with machine speed.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Root Cause Engine (Large) */}
          <GlassCard className="md:col-span-2 row-span-1 border-indigo-500/30">
            <div className="absolute top-0 right-0 p-8 opacity-20">
               <Terminal className="w-40 h-40 text-indigo-500 rotate-12" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  <Terminal className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Root Cause Engine</h3>
                <p className="text-slate-400 text-sm">Autonomous diagnostics that pinpoint exactly why occupancy dropped.</p>
              </div>
              
              {/* Terminal UI */}
              <div className="bg-[#050505] rounded-lg p-4 font-mono text-xs text-emerald-400 border border-white/10 shadow-inner overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-2 opacity-50"><div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500"/><div className="w-2 h-2 rounded-full bg-yellow-500"/><div className="w-2 h-2 rounded-full bg-green-500"/></div></div>
                 <Typewriter text={[
                   "> Connecting to PMS...", 
                   "> Analyzing Booking Funnel...", 
                   "> ALERT: Weekday Corp Drop detected", 
                   "> Hypothesis: Rate Parity Variance > 15%"
                 ]} />
              </div>
            </div>
          </GlassCard>

          {/* Card 2: Security (Tall) */}
          <GlassCard className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-slate-900/50 to-emerald-950/20 border-emerald-500/20">
             <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                   <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise Grade</h3>
                <p className="text-slate-400 text-sm mb-8">End-to-end encrypted decision loops with human-in-the-loop validation.</p>
                
                <div className="mt-auto space-y-3">
                  {['SOC2 Type II Ready', 'AES-256 Encryption', 'Role-Based Access', 'Audit Logging'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      {item}
                    </div>
                  ))}
                </div>
             </div>
          </GlassCard>

          {/* Card 3: Reinforcement Learning */}
          <GlassCard className="md:col-span-1 row-span-1">
             <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-900/20" />
             <div className="relative z-10">
               <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">RL Feedback Loop</h3>
               <p className="text-slate-400 text-xs">Model improves with every action taken.</p>
             </div>
             {/* Animated Bars */}
             <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-6 pb-6 gap-1 opacity-60">
                {[40, 70, 45, 90, 65].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: '10%' }}
                     whileInView={{ height: `${h}%` }}
                     transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                     className="w-full bg-purple-500/50 rounded-t-sm shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                   />
                ))}
             </div>
          </GlassCard>

          {/* Card 4: GenAI Execution (Wide) */}
          <GlassCard className="md:col-span-3 row-span-1 bg-gradient-to-r from-indigo-900/20 to-slate-900/50">
             <div className="absolute inset-0 bg-grid-white/[0.03]" />
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                <div className="max-w-lg">
                   <div className="flex items-center gap-3 mb-3">
                     <Zap className="w-6 h-6 text-yellow-400 fill-current animate-pulse" />
                     <h3 className="text-2xl font-bold text-white">GenAI Execution Layer</h3>
                   </div>
                   <p className="text-slate-300 text-sm leading-relaxed">The system autonomously writes offers, designs emails, and updates OTAs. You just approve the strategy, and the agent handles the heavy lifting.</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col items-center hover:border-indigo-500/50 transition-colors cursor-pointer group">
                    <span className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">10x</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Faster Response</span>
                  </div>
                  <div className="px-6 py-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col items-center hover:border-indigo-500/50 transition-colors cursor-pointer group">
                    <span className="text-3xl font-bold text-white group-hover:text-indigo-400 transition-colors">-40%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">CAC Reduction</span>
                  </div>
                </div>
             </div>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}

// Heavy Glass Component
function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`p-8 rounded-3xl border border-white/10 bg-[#0B0C15]/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-white/20 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
  );
}

// Typewriter Component
const Typewriter = ({ text }: { text: string[] }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {text.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8 }}
          className="whitespace-nowrap"
        >
          {line}
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-2 h-4 bg-emerald-400 inline-block mt-1 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
      />
    </div>
  )
}