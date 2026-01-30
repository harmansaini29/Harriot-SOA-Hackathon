'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RoiCalculator() {
  const [properties, setProperties] = useState(25);
  const [revPar, setRevPar] = useState(120);
  
  // Logic: 5% Uplift Assumption * 365 days
  const annualRevenue = properties * revPar * 365;
  const uplift = annualRevenue * 0.05; // 5% uplift
  
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="bg-slate-900/50 backdrop-blur-xl max-w-4xl mx-auto rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Input Side */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Calculate your <span className="text-emerald-400">Unlocked Revenue</span></h2>
              <p className="text-slate-400">Estimate the impact of SOA based on a conservative 5% occupancy uplift.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Properties in Portfolio</label>
                    <span className="text-indigo-400 font-mono">{properties}</span>
                  </div>
                  <input 
                    type="range" min="5" max="200" value={properties} 
                    onChange={(e) => setProperties(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Average RevPAR ($)</label>
                    <span className="text-indigo-400 font-mono">${revPar}</span>
                  </div>
                  <input 
                    type="range" min="50" max="500" value={revPar} 
                    onChange={(e) => setRevPar(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Output Side - The Odometer */}
            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-slate-500 uppercase text-xs font-semibold tracking-wider mb-2">New Annual Revenue</span>
              
              <motion.div 
                key={uplift}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 font-mono tracking-tighter"
              >
                ${uplift.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </motion.div>
              
              <div className="mt-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs">
                Based on 5% Efficiency Gain
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}