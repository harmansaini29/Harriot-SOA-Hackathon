'use client';

import { CloudRain, Calendar, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketFactorsProps {
  weather: { condition: string; temp: number; impact: string };
  events: { name: string; distance: string; date: string; impact: string };
}

export default function MarketFactors({ weather, events }: MarketFactorsProps) {
   return (
      <>
         {/* Weather Widget */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-card border border-border rounded-3xl p-6 relative overflow-hidden mb-6"
         >
            <div className="flex justify-between items-start">
               <div>
                  <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Local Conditions</h4>
                  <div className="text-2xl font-bold text-white">{weather.condition}, {weather.temp}°C</div>
                  <div className="text-xs text-blue-400 mt-2 font-medium">{weather.impact}</div>
               </div>
               <CloudRain className="w-10 h-10 text-blue-500/50" />
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px]" />
         </motion.div>

         {/* Events Widget */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full bg-card border border-border rounded-3xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
         >
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Major Event</h4>
                  <div className="text-xl font-bold text-white leading-tight">{events.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{events.distance} • {events.date}</div>
               </div>
               <Calendar className="w-8 h-8 text-primary/50" />
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-start gap-3">
               <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
               <p className="text-xs text-primary">
                  <span className="font-bold">Compression Alert:</span> Competitors raising rates. Recommend immediate rate hike.
               </p>
            </div>
         </motion.div>
      </>
   )
}