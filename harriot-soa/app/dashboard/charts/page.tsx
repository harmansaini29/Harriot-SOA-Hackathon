'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Filter, Download, Activity, MoreHorizontal, TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- MOCK DATA ---
const revenueData = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  actual: 4000 + Math.random() * 2000,
  projected: 4200 + Math.random() * 2500,
  lastYear: 3800 + Math.random() * 1500,
}));

const channelData = [
  { name: 'Direct Booking', value: 45, color: '#EAB308' }, // Gold
  { name: 'OTA (Expedia)', value: 25, color: '#3B82F6' }, // Blue
  { name: 'Corporate', value: 20, color: '#10B981' },     // Emerald
  { name: 'Wholesale', value: 10, color: '#6366F1' },     // Indigo
];

export default function AdvancedChartsPage() {
  const [timeRange, setTimeRange] = useState('1Y');

  return (
    <div className="space-y-8 max-w-[1800px] mx-auto pb-20">
      
      {/* 1. Controller Header - Increased Contrast */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl bg-[#18181b] border border-white/10 shadow-lg">
        <div>
           <h1 className="text-3xl font-serif font-medium text-white tracking-tight flex items-center gap-3">
              Analytics <span className="text-[#EAB308]">Pro</span>
           </h1>
           <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#EAB308]" />
              Real-time Financial Telemetry
           </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0f1116] p-1.5 rounded-xl border border-white/10 overflow-x-auto">
           {['24H', '7D', '30D', '1Y', 'YTD'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 whitespace-nowrap",
                  timeRange === range 
                    ? "bg-[#EAB308] text-black shadow-[0_0_15px_-3px_rgba(234,179,8,0.4)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                {range}
              </button>
           ))}
        </div>

        <div className="flex gap-3">
           <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2">
              <Filter className="w-4 h-4" /> Filters
           </Button>
           <Button className="bg-slate-100 text-slate-900 hover:bg-white font-bold gap-2">
              <Download className="w-4 h-4" /> CSV
           </Button>
        </div>
      </div>

      {/* 2. Primary Financial Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <ChartContainer title="Revenue Velocity" subtitle="Actual vs Projected (Net)" className="lg:col-span-2 min-h-[400px]">
            <div className="h-[350px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                     <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `$${val/1000}k`} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)' }}
                        itemStyle={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}
                     />
                     <Area type="monotone" dataKey="projected" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorProj)" strokeDasharray="5 5" />
                     <Area type="monotone" dataKey="actual" stroke="#EAB308" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </ChartContainer>

         <div className="space-y-6">
            <MetricCard label="Total RevPAR" value="$284" trend="+12.5%" trendUp />
            <MetricCard label="ADR Index" value="1.15" trend="+0.04" trendUp />
            <MetricCard label="GOPPAR" value="$145" trend="-2.1%" trendUp={false} />
         </div>
      </div>

      {/* 3. Secondary Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
         {/* Channel Mix */}
         <ChartContainer title="Channel Mix" subtitle="Distribution by Source">
            <div className="h-[300px] w-full flex items-center justify-center relative">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {channelData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.2)" />
                        ))}
                     </Pie>
                     <Tooltip contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #334155', color: '#fff' }} />
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-white">45%</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Direct</span>
               </div>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center mt-4">
               {channelData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs text-slate-300">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                     {item.name}
                  </div>
               ))}
            </div>
         </ChartContainer>

         {/* Occupancy Heatmap */}
         <ChartContainer title="Occupancy Pacing" subtitle="Next 14 Days Forecast">
            <div className="h-[300px] w-full mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData.slice(0,7)}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                     <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} 
                     />
                     <Bar dataKey="actual" radius={[4, 4, 0, 0]}>
                        {revenueData.slice(0,7).map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 3 ? '#EAB308' : '#334155'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </ChartContainer>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ChartContainer({ title, subtitle, children, className }: any) {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className={cn("bg-[#18181b] border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-[#EAB308]/20 transition-colors duration-500", className)}
      >
         <div className="flex justify-between items-start mb-2">
            <div>
               <h3 className="text-lg font-medium text-white">{title}</h3>
               <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
               <MoreHorizontal className="w-5 h-5" />
            </button>
         </div>
         {children}
      </motion.div>
   )
}

function MetricCard({ label, value, trend, trendUp }: any) {
   return (
      <motion.div 
         whileHover={{ scale: 1.02 }}
         className="bg-[#18181b] border border-white/10 rounded-2xl p-6 flex items-center justify-between shadow-lg relative overflow-hidden group"
      >
         <div className="absolute inset-0 bg-gradient-to-r from-[#EAB308]/0 via-[#EAB308]/5 to-[#EAB308]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
         
         <div>
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">{label}</p>
            <h4 className="text-3xl font-bold text-white tabular-nums">{value}</h4>
         </div>
         <div className={cn(
            "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg border",
            trendUp 
               ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
               : "text-red-400 bg-red-500/10 border-red-500/20"
         )}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
            {trend}
         </div>
      </motion.div>
   )
}