'use client';

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Zap, Activity, Cpu } from 'lucide-react';
import { TiltCard } from "@/components/ui/3d-card"; // The new heavy component
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Animation Variants for "Auto Animations"
const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVars = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 50 } }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* 1. Section Header with Typing Effect */}
      <div className="flex flex-col gap-2">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold tracking-tight text-white flex items-center gap-3"
        >
          Command Center <Cpu className="w-8 h-8 text-indigo-500 animate-spin-slow" />
        </motion.h2>
        <p className="text-slate-400">Real-time occupancy intelligence & autonomous interventions.</p>
      </div>

      {/* 2. Hero Metrics - 3D TILT ENABLED */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <TiltCard className="border-indigo-500/20 bg-indigo-950/10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-indigo-300">Avg Occupancy</span>
            <Users className="h-4 w-4 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          </div>
          <div className="text-4xl font-bold text-white mt-4 tracking-tighter">72.4%</div>
          <div className="flex items-center text-xs mt-2 text-emerald-400">
            <ArrowUpRight className="mr-1 h-3 w-3" /> +4.1% <span className="text-slate-500 ml-2">vs last month</span>
          </div>
        </TiltCard>

        <TiltCard className="border-red-500/20 bg-red-950/10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-red-300">Revenue Risk</span>
            <DollarSign className="h-4 w-4 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
          </div>
          <div className="text-4xl font-bold text-white mt-4 tracking-tighter">$142.5k</div>
          <div className="flex items-center text-xs mt-2 text-red-400">
            <ArrowDownRight className="mr-1 h-3 w-3" /> Critical <span className="text-slate-500 ml-2">needs action</span>
          </div>
        </TiltCard>

        <TiltCard className="border-emerald-500/20 bg-emerald-950/10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-emerald-300">Projected Uplift</span>
            <Activity className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="text-4xl font-bold text-white mt-4 tracking-tighter">+8.5%</div>
          <div className="flex items-center text-xs mt-2 text-emerald-400">
            <ArrowUpRight className="mr-1 h-3 w-3" /> High Confidence <span className="text-slate-500 ml-2">AI Model</span>
          </div>
        </TiltCard>

        <TiltCard className="border-amber-500/20 bg-amber-950/10">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <span className="text-sm font-medium text-amber-300">Active Agents</span>
            <Zap className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
          <div className="text-4xl font-bold text-white mt-4 tracking-tighter">18</div>
          <div className="flex items-center text-xs mt-2 text-amber-400">
            4 Pending <span className="text-slate-500 ml-2">approvals</span>
          </div>
        </TiltCard>
      </div>

      {/* 3. Main Content: Heavy Glassmorphism Table */}
      <motion.div variants={itemVars} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-[#0F1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-xl font-semibold text-slate-100">Live Portfolio Feed</h3>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 animate-pulse">
              Live Connection: Stable
            </Badge>
          </div>
          
          <div className="p-0">
             <table className="w-full text-sm text-left text-slate-400">
               <thead className="text-xs text-slate-500 uppercase bg-black/20">
                 <tr>
                   <th className="px-6 py-4">Property Name</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Occupancy</th>
                   <th className="px-6 py-4 text-right">RevPAR</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {properties.map((property, i) => (
                   <motion.tr 
                    key={property.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group/row"
                   >
                     <td className="px-6 py-4 font-medium text-slate-200 group-hover/row:text-indigo-400 transition-colors">
                       {property.name}
                       <div className="text-xs text-slate-600">{property.location}</div>
                     </td>
                     <td className="px-6 py-4">
                       <StatusBadge status={property.status} />
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <span className="text-sm font-mono text-slate-300 w-8">{property.occupancy}%</span>
                         <Progress value={property.occupancy} className="h-1.5 w-24 bg-slate-800" />
                       </div>
                     </td>
                     <td className="px-6 py-4 text-right font-mono text-slate-300">${property.revpar}</td>
                     <td className="px-6 py-4 text-right">
                        {property.actions > 0 ? (
                           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_-3px_rgba(99,102,241,0.5)]">
                             {property.actions} Recs
                           </div>
                        ) : (
                          <span className="text-slate-700 text-xs">--</span>
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

// Helper Components

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Critical': "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_-3px_rgba(248,113,113,0.3)]",
    'At Risk': "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_-3px_rgba(251,191,36,0.3)]",
    'Healthy': "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(52,211,153,0.3)]"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles['Healthy']}`}>
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