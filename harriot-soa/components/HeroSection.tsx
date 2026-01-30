'use client';

import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="min-h-screen w-full flex flex-col md:items-center md:justify-center bg-[#020617] antialiased bg-grid-white/[0.02] relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-0">
      
      {/* 1. Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center">
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          {/* Version Pill */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-indigo-500/30 bg-[#0B0C15] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold text-indigo-300 tracking-widest uppercase">
              Agentic Reinforcement Learning V2.0
            </span>
          </div>

          {/* Main Title - Matches "Occupancy is Solved" screenshot */}
          <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight mb-2">
            Occupancy is
          </h1>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 leading-tight tracking-tight pb-4">
            Solved.
          </h1>
          
          {/* Subtext */}
          <p className="mt-6 font-normal text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The first AI Copilot that diagnoses, prescribes, and fixes underperformance across your entire portfolio using <span className="text-white font-semibold">autonomous agents</span>.
          </p>
          
          {/* Buttons */}
          <div className="mt-12 flex flex-col md:flex-row gap-5 justify-center items-center">
             <Button 
                suppressHydrationWarning
                className="h-14 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full shadow-[0_0_40px_-5px_rgba(79,70,229,0.5)] transition-all hover:scale-105 text-base"
             >
                Deploy SOA Agent <ArrowRight className="ml-2 w-4 h-4" />
             </Button>
             
             <Button 
                suppressHydrationWarning
                variant="outline" 
                className="h-14 px-8 border-slate-800 text-slate-300 bg-transparent hover:bg-slate-900 rounded-full gap-2 text-base hover:text-white transition-all"
             >
                <Play className="w-4 h-4 fill-current" /> View Simulation
             </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}