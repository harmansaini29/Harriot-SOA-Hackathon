'use client';

import React, { useState, useEffect } from "react";
import WorldBrainScene from "@/components/3d/WorldBrain"; 
import { Button } from "@/components/ui/button";
import { Play, Crown, Zap, Server, Activity, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// --- HUD COMPONENT (UI HEAVY) ---
const HolographicHUD = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
      
      {/* Top Left: System Status */}
      <motion.div 
         initial={{ opacity: 0, x: -50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1 }}
         className="absolute top-32 left-10 md:left-20 flex flex-col gap-2"
      >
         <div className="flex items-center gap-2 text-[#D4AF37] font-mono text-[10px] tracking-widest uppercase">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Neural Link: Stable</span>
         </div>
         <div className="w-32 h-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
         <div className="text-xs text-slate-500 font-mono">
            <div>LATENCY: 12ms</div>
            <div>UPTIME: 99.999%</div>
         </div>
      </motion.div>

      {/* Top Right: Active Nodes */}
      <motion.div 
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1.2 }}
         className="absolute top-32 right-10 md:right-20 text-right"
      >
         <div className="flex items-center justify-end gap-2 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
            <span>Global Nodes</span>
            <Globe className="w-3 h-3" />
         </div>
         <div className="w-32 h-[1px] bg-gradient-to-l from-emerald-500/50 to-transparent ml-auto my-2" />
         <div className="text-3xl font-bold text-white tabular-nums">4,281</div>
      </motion.div>

      {/* Bottom Left: Data Stream */}
      <motion.div 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 1.4 }}
         className="absolute bottom-32 left-10 md:left-20 hidden md:block"
      >
         <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] tracking-widest uppercase mb-2">
            <Server className="w-3 h-3" />
            <span>Ingestion Stream</span>
         </div>
         <div className="space-y-1 font-mono text-[9px] text-[#D4AF37]/60">
            <StreamLine text=">> OPTIMIZING_RATE_GRID_ALPHA..." />
            <StreamLine text=">> SYNC_PMS_MARRIOTT_V4 [OK]" />
            <StreamLine text=">> DETECTED_DEMAND_SPIKE [LONDON]" />
            <StreamLine text=">> REVENUE_CAPTURE_INITIATED" />
         </div>
      </motion.div>

      {/* Center Target Reticle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#D4AF37]/5 rounded-full pointer-events-none animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-dashed border-white/5 rounded-full pointer-events-none" />
      
    </div>
  )
}

const StreamLine = ({ text }: { text: string }) => {
   const [opacity, setOpacity] = useState(1);
   useEffect(() => {
      const interval = setInterval(() => setOpacity(Math.random() > 0.5 ? 1 : 0.5), 200);
      return () => clearInterval(interval);
   }, []);
   return <div style={{ opacity }}>{text}</div>
}

export default function HeroSection({ onStart }: { onStart?: () => void }) {
  const router = useRouter();

  const handleStart = () => {
    if (onStart) {
        onStart();
    } else {
        router.push('/dashboard');
    }
  };

  return (
    // FIXED: Background color changed from #02040a to #0f1116
    <div className="relative min-h-[100vh] w-full flex flex-col items-center justify-center bg-[#0f1116] overflow-hidden pt-20">
      
      {/* 1. The World Brain */}
      <WorldBrainScene />
      
      {/* 2. Holographic HUD */}
      <HolographicHUD />

      {/* 3. Gradient Vignettes - Matched to new background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f1116_90%)] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay z-10 pointer-events-none" />
      
      {/* 4. Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center mt-10">
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center"
        >
          {/* Scanline Effect Tag */}
          <div className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-sm border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-md">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-scan pointer-events-none" />
             <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
             <span className="text-xs font-mono font-bold text-[#D4AF37] tracking-[0.3em] uppercase">
                System Online v3.0
             </span>
          </div>

          {/* Main Title - Enhanced Gradients */}
          <h1 className="text-6xl md:text-[8rem] font-serif font-medium tracking-tighter text-white mb-6 leading-[0.9] drop-shadow-2xl">
            Revenue <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#FDE68A]">
              Autonomy.
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            The first <span className="text-white font-medium">AI Operating System</span> for luxury hospitality. 
            We replace manual yield management with autonomous, high-frequency execution.
          </p>
          
          {/* CTA Group - WIRED UP */}
          <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center">
             <Button 
                onClick={handleStart}
                className="h-14 px-10 bg-[#D4AF37] text-black hover:bg-[#FDE68A] font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] border border-[#D4AF37]"
             >
                <Zap className="mr-2 w-4 h-4 fill-black" /> Initiate Pilot
             </Button>
             
             <Button 
                variant="outline" 
                className="h-14 px-10 border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-md gap-3 text-sm tracking-widest uppercase group hover:border-[#D4AF37]/50 transition-all"
             >
                <Play className="w-3 h-3 fill-current group-hover:text-[#D4AF37] transition-colors" />
                Simulate Data
             </Button>
          </div>

        </motion.div>
      </div>
      
      {/* Bottom Fade - Matched to #0f1116 */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#0f1116] via-[#0f1116]/90 to-transparent z-20 pointer-events-none" />
    </div>
  );
}