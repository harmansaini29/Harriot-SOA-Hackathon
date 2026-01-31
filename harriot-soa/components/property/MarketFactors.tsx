'use client';

import { CloudRain, Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MarketFactors() {
   return (
      <>
         {/* Weather Widget */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 bg-[#0F1119] border border-white/5 rounded-3xl p-6 relative overflow-hidden"
         >
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Local Conditions</h4>
                  <div className="text-2xl font-bold text-white">Rainy, 18°C</div>
                  <div className="text-xs text-blue-400 mt-2 font-medium">+15% Indoor Demand</div>
               </div>
               <CloudRain className="w-10 h-10 text-blue-500/50" />
            </div>
            {/* Animated Rain Drops (CSS/SVG) could go here */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px]" />
         </motion.div>

         {/* Events Widget */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-[#0F1119] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors"
         >
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Major Event</h4>
                  <div className="text-xl font-bold text-white leading-tight">Formula 1 Grand Prix</div>
                  <div className="text-xs text-slate-500 mt-1">2.4 miles away • This Weekend</div>
               </div>
               <Calendar className="w-8 h-8 text-[#D4AF37]/50" />
            </div>
            
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg p-3 flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
               <p className="text-xs text-[#D4AF37]">
                  <span className="font-bold">Compression Alert:</span> Competitors raising rates by +40%. Recommend immediate rate hike.
               </p>
            </div>
         </motion.div>
      </>
   )
}