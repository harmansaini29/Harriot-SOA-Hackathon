'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, RefreshCw } from 'lucide-react';

const EVENTS = [
  { id: 1, type: 'RATE', msg: 'Adjusting BAR for Suite 404', delta: '+$45', time: 'Just now' },
  { id: 2, type: 'INV', msg: 'Closing OTA channels (Expedia)', delta: 'Yield Prot.', time: '2s ago' },
  { id: 3, type: 'RATE', msg: 'Weekend Surge Applied', delta: '+$120', time: '5s ago' },
  { id: 4, type: 'OPT', msg: 'Analyzing Compset Variance', delta: 'Processing', time: '8s ago' },
];

export default function LiveOrchestration() {
  const [feed, setFeed] = useState(EVENTS);

  // Simulate a live feed adding items
  useEffect(() => {
    const interval = setInterval(() => {
       setFeed(prev => {
          const newEvent = { 
             id: Date.now(), 
             type: Math.random() > 0.5 ? 'RATE' : 'INV', 
             msg: 'Autonomous Optimization Cycle', 
             delta: 'Optimizing', 
             time: 'Just now' 
          };
          return [newEvent, ...prev.slice(0, 3)];
       });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#02040a] border-t border-white/5 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-16 items-center">
           
           {/* Text Side */}
           <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-mono tracking-wider uppercase">
                 <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                 Live Neural Feed
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif text-white">
                 Autonomous <br />
                 <span className="text-[#D4AF37]">Orchestration.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                 Stop analyzing charts. Start executing strategies. Our agents make micro-adjustments 24/7, capturing revenue opportunities the moment they appear.
              </p>

              <div className="flex items-center gap-8 pt-4">
                 <div>
                    <div className="text-3xl font-bold text-white tabular-nums">1.2s</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Reaction Speed</div>
                 </div>
                 <div className="w-px h-12 bg-white/10" />
                 <div>
                    <div className="text-3xl font-bold text-white tabular-nums">24/7</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Uptime</div>
                 </div>
              </div>
           </div>

           {/* Terminal Visual */}
           <div className="flex-1 w-full max-w-lg">
              <div className="bg-[#0B0C15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                 
                 {/* Terminal Header */}
                 <div className="bg-[#0F1119] px-4 py-3 border-b border-white/5 flex justify-between items-center">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">harriot_agent_v2.exe</div>
                 </div>

                 {/* Feed Content */}
                 <div className="p-6 space-y-4 min-h-[300px]">
                    <AnimatePresence mode='popLayout'>
                       {feed.map((item) => (
                          <motion.div 
                             key={item.id}
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             layout
                             className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                          >
                             <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold ${
                                   item.type === 'RATE' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                   {item.type}
                                </div>
                                <div>
                                   <div className="text-sm text-slate-200">{item.msg}</div>
                                   <div className="text-[10px] text-slate-500">{item.time}</div>
                                </div>
                             </div>
                             <div className="text-xs font-mono text-emerald-400 font-bold">{item.delta}</div>
                          </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>
                 
                 {/* Bottom Status */}
                 <div className="p-3 bg-black/20 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-2">
                       <RefreshCw className="w-3 h-3 animate-spin" /> Syncing with PMS...
                    </span>
                    <span>SECURE CONN</span>
                 </div>

              </div>
           </div>

        </div>
      </div>
    </section>
  );
}