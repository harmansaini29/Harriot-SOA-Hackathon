'use client';

import React, { useState, useEffect } from "react";
import WorldBrainScene from "@/components/3d/WorldBrain"; 
import { Button } from "@/components/ui/button";
import { Play, Crown, Zap, Server, Activity, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// --- HUD COMPONENT ---
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
         <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <Activity className="w-3 h-3 animate-pulse text-primary" />
            <span className="text-white">Neural Link: Stable</span>
         </div>
         <div className="w-32 h-[1px] bg-gradient-to-r from-primary to-transparent" />
         <div className="text-xs text-slate-300 font-mono pl-1 space-y-0.5">
            <div>LATENCY: <span className="text-emerald-400 font-bold">12ms</span></div>
            <div>UPTIME: <span className="text-emerald-400 font-bold">99.999%</span></div>
         </div>
      </motion.div>

      {/* Top Right: Active Nodes */}
      <motion.div 
         initial={{ opacity: 0, x: 50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1.2 }}
         className="absolute top-32 right-10 md:right-20 text-right"
      >
         <div className="flex items-center justify-end gap-2 text-secondary font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-secondary/20 ml-auto w-fit shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="text-white">Global Nodes</span>
            <Globe className="w-3 h-3 text-secondary" />
         </div>
         <div className="w-32 h-[1px] bg-gradient-to-l from-secondary to-transparent ml-auto my-2" />
         <div className="text-4xl font-bold text-white tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">4,281</div>
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
         <div className="space-y-1 font-mono text-[9px] text-primary/90 bg-black/80 p-3 rounded-lg border border-white/10 backdrop-blur-md shadow-lg">
            <StreamLine text=">> OPTIMIZING_RATE_GRID_ALPHA..." />
            <StreamLine text=">> SYNC_PMS_MARRIOTT_V4 [OK]" />
            <StreamLine text=">> DETECTED_DEMAND_SPIKE [LONDON]" />
            <StreamLine text=">> REVENUE_CAPTURE_INITIATED" />
         </div>
      </motion.div>
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
    <div className="relative min-h-[100vh] w-full flex flex-col items-center justify-center bg-[#0f1116] overflow-hidden pt-20">
      
      {/* 1. THE 3D BRAIN - NOW FULLY VISIBLE & BRIGHT */}
      <div className="absolute inset-0 z-0">
          <WorldBrainScene />
      </div>
      
      {/* 2. SUBTLE VIGNETTE - Only darkens corners, leaves center bright */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#0f1116_85%)]" />
      
      {/* 3. HUD Layer */}
      <HolographicHUD />
      
      {/* 4. Foreground Content - Text & Buttons */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 text-center mt-10">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col items-center relative"
        >
          {/* THE GLASS SLAB: High-contrast backdrop for text */}
          <div className="absolute inset-0 -m-16 bg-[#0f1116]/40 backdrop-blur-[3px] rounded-[3rem] z-[-1] border border-white/5 shadow-2xl" />

          {/* System Tag */}
          <div className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full border border-primary/40 bg-black/50 backdrop-blur-xl shadow-[0_0_25px_-5px_rgba(212,175,55,0.4)]">
             <Crown className="w-3.5 h-3.5 text-primary animate-pulse" />
             <span className="text-xs font-mono font-bold text-primary tracking-[0.3em] uppercase drop-shadow-md">
                Harriot System Online 
             </span>
          </div>

          {/* Main Title - Ultra Sharp */}
          <h1 className="text-6xl md:text-[8rem] font-serif font-medium tracking-tighter text-white mb-6 leading-[0.9] drop-shadow-2xl">
            Revenue <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#FDE68A] drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
              Autonomy.
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-md">
            The first <span className="text-white font-medium">AI Operating System</span> for luxury hospitality. 
            We replace manual yield management with autonomous, high-frequency execution.
          </p>
          
          {/* CTA Buttons - High Visibility */}
          <div className="mt-12 flex flex-col sm:flex-row gap-8 items-center relative z-50">
             {/* Primary Button */}
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-[#FDE68A] to-primary rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500" />
                <Button 
                    onClick={handleStart}
                    className="relative h-14 px-12 bg-primary text-black hover:bg-[#FDE68A] font-bold text-sm tracking-widest uppercase transition-all hover:scale-105 border border-primary shadow-xl"
                >
                    <Zap className="mr-2 w-4 h-4 fill-black" /> Initiate Pilot
                </Button>
             </div>
             
             {/* Secondary Button */}
             <Button 
                variant="outline" 
                className="h-14 px-12 border-white/30 text-white bg-black/50 hover:bg-white/10 backdrop-blur-xl gap-3 text-sm tracking-widest uppercase group hover:border-primary/60 transition-all shadow-lg hover:shadow-primary/20"
             >
                <Play className="w-3 h-3 fill-current group-hover:text-primary transition-colors" />
                Simulate Data
             </Button>
          </div>

        </motion.div>
      </div>
      
      {/* Bottom Fade to blend into next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0f1116] to-transparent z-20 pointer-events-none" />
    </div>
  );
}