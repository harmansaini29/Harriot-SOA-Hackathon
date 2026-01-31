'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from "framer-motion"; 
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation'; // Navigation Hook
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Zap, Activity, Cpu, Radio, Crown } from 'lucide-react';
import { TiltCard } from "@/components/ui/3d-card"; 
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const itemVars: Variants = {
  hidden: { y: 10, opacity: 0, filter: "blur(5px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
};

export default function DashboardPage() {
  const { revenue, occupancy, activeAgents, criticalAlerts, simulateLiveFeed } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // Initialize Router

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => simulateLiveFeed(), 3500);
    return () => clearInterval(interval);
  }, [simulateLiveFeed]);

  if (!mounted) return null;

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-[1600px] mx-auto"
      suppressHydrationWarning
    >
      {/* 1. Executive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div className="space-y-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <h2 className="text-4xl font-serif font-medium tracking-tight text-white">
              Command Center
            </h2>
            <div className="p-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </motion.div>
          <p className="text-slate-400 text-sm flex items-center gap-2 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            NEURAL CORE: ONLINE • MONITORING 25 ASSETS
          </p>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
           <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
           <span className="text-xs font-mono text-slate-300">SYSTEM LATENCY: <span className="text-emerald-400">12ms</span></span>
        </div>
      </div>

      {/* 2. Hero Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Avg Occupancy" value={`${occupancy.toFixed(1)}%`} icon={Users} trend="+4.1%" trendLabel="vs last month" color="gold" live />
        <MetricCard title="Total Revenue" value={`$${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} icon={DollarSign} trend="+12.5%" trendLabel="Year over Year" color="platinum" />
        <MetricCard title="Portfolio Risk" value={criticalAlerts > 0 ? 'Action Req.' : 'Nominal'} icon={Activity} trend={`${criticalAlerts} Alerts`} trendLabel="Priority High" color="crimson" />
        <MetricCard title="Active Agents" value={activeAgents.toString()} icon={Zap} trend="Auto-Pilot" trendLabel="Executing" color="bronze" />
      </div>

      {/* 3. Main Intelligence Terminal */}
      <motion.div variants={itemVars} className="relative group rounded-2xl">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20 rounded-2xl opacity-50 blur-sm group-hover:opacity-100 transition duration-700" />
        
        <div className="relative bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-lg font-medium text-slate-200 font-serif">Live Portfolio Feed</h3>
            <div className="flex items-center gap-3">
               <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5 font-mono text-[10px] tracking-wider">
                 AES-256 ENCRYPTED
               </Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-slate-400">
               <thead className="text-xs text-slate-500 uppercase font-mono tracking-wider bg-black/40">
                 <tr>
                   <th className="px-6 py-4 font-normal">Asset Name</th>
                   <th className="px-6 py-4 font-normal">Health Status</th>
                   <th className="px-6 py-4 font-normal">Real-Time Occ</th>
                   <th className="px-6 py-4 text-right font-normal">RevPAR</th>
                   <th className="px-6 py-4 text-right font-normal">Interventions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {properties.map((property, i) => (
                   <motion.tr 
                    key={property.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    // NAVIGATION EVENT: Clicking row goes to property details
                    onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group/row"
                   >
                     <td className="px-6 py-5">
                       <div className="font-medium text-slate-200 group-hover/row:text-[#D4AF37] transition-colors text-base">
                         {property.name}
                       </div>
                       <div className="text-xs text-slate-600 font-mono mt-0.5">{property.location}</div>
                     </td>
                     <td className="px-6 py-5">
                       <StatusBadge status={property.status} />
                     </td>
                     <td className="px-6 py-5">
                       <div className="flex items-center gap-4">
                         <span className="text-sm font-mono text-slate-300 w-8 tabular-nums">{property.occupancy}%</span>
                         <Progress value={property.occupancy} className="h-1 w-24 bg-slate-800" indicatorColor={property.occupancy < 50 ? 'bg-red-500' : 'bg-[#D4AF37]'} />
                       </div>
                     </td>
                     <td className="px-6 py-5 text-right font-mono text-slate-300 tabular-nums text-base">
                        ${property.revpar}
                     </td>
                     <td className="px-6 py-5 text-right">
                        {property.actions > 0 ? (
                           <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 shadow-[0_0_15px_-5px_rgba(212,175,55,0.3)]">
                             {property.actions} PENDING
                           </div>
                        ) : (
                          <span className="text-slate-700 text-xs font-mono">OPTIMIZED</span>
                        )}
                     </td>
                   </motion.tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Sub-components used above
function MetricCard({ title, value, icon: Icon, trend, trendLabel, color, live }: any) {
  const colors = {
    gold: "border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37]",
    platinum: "border-slate-400/20 bg-slate-400/5 text-slate-200",
    crimson: "border-red-500/20 bg-red-900/10 text-red-400",
    bronze: "border-orange-500/20 bg-orange-900/10 text-orange-400",
  };
  const selectedColor = colors[color as keyof typeof colors];
  return (
    <TiltCard className={cn("backdrop-blur-sm", selectedColor)}>
      <div className="flex flex-row items-center justify-between pb-2">
        <span className="text-sm font-medium opacity-80">{title}</span>
        <Icon className="h-4 w-4 opacity-80" />
      </div>
      <div className="text-4xl font-serif font-medium mt-4 tracking-tight tabular-nums text-white">
        {value}
      </div>
      <div className="flex items-center text-xs mt-3 font-mono opacity-80">
        {live ? (<Radio className="mr-2 h-3 w-3 animate-pulse text-[#D4AF37]" />) : (<span className="mr-2">{trend}</span>)}
        {live ? "LIVE FEED" : trendLabel}
      </div>
    </TiltCard>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Critical': "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_-3px_rgba(220,38,38,0.4)]",
    'At Risk': "bg-orange-500/10 text-orange-400 border-orange-500/20",
    'Healthy': "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${styles[status] || styles['Healthy']}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${status === 'Critical' ? 'bg-red-500 animate-ping' : 'bg-current'}`} />
      {status}
    </span>
  );
}

const properties = [
  { id: 1, name: "Grand Harriot Downtown", location: "Seattle, WA", status: "Critical", occupancy: 42, revpar: 185, actions: 3 },
  { id: 2, name: "Harriot Seaside Resort", location: "San Diego, CA", status: "Healthy", occupancy: 88, revpar: 320, actions: 0 },
  { id: 3, name: "The Skyline Suites", location: "Chicago, IL", status: "At Risk", occupancy: 65, revpar: 210, actions: 1 },
  { id: 4, name: "Harriot Business Hub", location: "Austin, TX", status: "Healthy", occupancy: 79, revpar: 245, actions: 0 },
  { id: 5, name: "Alpine Lodge by Harriot", location: "Denver, CO", status: "Critical", occupancy: 38, revpar: 160, actions: 4 },
];