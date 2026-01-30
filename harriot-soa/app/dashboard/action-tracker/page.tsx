'use client';

import { motion } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Download, 
  MoreHorizontal, 
  Zap, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  Building
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// --- VISUAL COMPONENTS ---

const StatusDot = ({ color }: { color: string }) => (
  <div className={`w-2 h-2 rounded-full ${color} shadow-[0_0_8px_currentColor]`} />
);

const KanbanCard = ({ data }: { data: any }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#13151E] border border-white/5 rounded-xl p-4 shadow-lg hover:border-white/10 transition-all group relative overflow-hidden"
    >
      {/* Left Accent Border */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${data.accentColor || 'bg-slate-700'}`} />

      {/* Header Tags */}
      <div className="flex justify-between items-start mb-3 pl-2">
        <div className="flex items-center gap-2">
           <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
              data.type === 'PRICING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
              data.type === 'INVENTORY' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
              'bg-orange-500/10 text-orange-400 border-orange-500/20'
           }`}>
             {data.type}
           </span>
        </div>
        {data.conf && (
          <span className="text-[10px] flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
             <CheckCircle2 className="w-3 h-3" /> {data.conf}% Conf.
          </span>
        )}
        {data.status === 'Active' && (
           <span className="text-[10px] flex items-center gap-1 text-emerald-400 font-bold tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> ACTIVE
           </span>
        )}
      </div>

      {/* Content */}
      <div className="pl-2">
        <h4 className="text-sm font-semibold text-slate-100 leading-snug mb-1">{data.title}</h4>
        {data.desc && <p className="text-xs text-slate-500 mb-4 line-clamp-2">{data.desc}</p>}
        
        {/* Specific Metrics per Type */}
        {data.uplift && (
           <div className="mt-3 pt-3 border-t border-white/5">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Pred. Uplift</div>
              <div className="text-sm font-bold text-emerald-400">{data.uplift} <span className="text-slate-500 font-normal text-xs">{data.upliftUnit}</span></div>
           </div>
        )}

        {data.progress !== undefined && (
           <div className="mt-3">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-500" style={{ width: `${data.progress}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                 <span>{data.queueTime || 'Processing'}</span>
                 <span>Waiting API</span>
              </div>
           </div>
        )}

        {data.metrics && (
           <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                 <div className="text-[10px] text-slate-500">CURRENT RATE</div>
                 <div className="font-mono text-sm text-white">{data.metrics.current}</div>
              </div>
              <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                 <div className="text-[10px] text-emerald-400">REAL-TIME UPLIFT</div>
                 <div className="font-mono text-sm text-emerald-400">{data.metrics.uplift} ↗</div>
              </div>
           </div>
        )}

        {data.emailStats && (
           <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-xs text-slate-400">
              <span>Sent: {data.emailStats.sent}</span>
              <span>Open Rate: {data.emailStats.open}</span>
           </div>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

export default function ActionTrackerPage() {
  return (
    <div className="flex flex-col h-full bg-[#0B0C15] text-slate-200">
      
      {/* 1. Header Section */}
      <div className="p-6 border-b border-white/5 space-y-6">
        {/* Title Row */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Action Tracker: Feedback Loop</h1>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 text-xs font-mono">v2.4.1</Badge>
           </div>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                 <RefreshCw className="w-3 h-3" /> Last updated: just now
              </div>
              <Button variant="outline" className="bg-[#13151E] border-white/10 text-slate-300 h-9 text-xs">
                 <Calendar className="w-3 h-3 mr-2" /> This Week
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white h-9 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                 <Download className="w-3 h-3 mr-2" /> Export Report
              </Button>
           </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
           
           <div className="flex items-center gap-4 text-sm w-full lg:w-auto">
              <div className="flex items-center gap-2 text-slate-400">
                 <Building className="w-4 h-4" /> Property:
                 <span className="text-white font-medium">The Grand Budapest</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="text-emerald-400 font-medium flex items-center gap-1">
                 <Zap className="w-3 h-3" /> 98% Occupancy Target
              </div>
           </div>

           <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                 <input 
                   type="text" 
                   placeholder="Filter by ID, Type, or Tags..." 
                   className="w-full bg-[#13151E] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50"
                 />
              </div>
              <div className="flex gap-2">
                 <button className="px-3 py-1.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> All Types
                 </button>
                 <button className="px-3 py-1.5 rounded-md bg-[#13151E] text-slate-400 text-xs font-medium border border-white/10 hover:text-white">Pricing</button>
                 <button className="px-3 py-1.5 rounded-md bg-[#13151E] text-slate-400 text-xs font-medium border border-white/10 hover:text-white">Inventory</button>
                 <button className="px-3 py-1.5 rounded-md bg-[#13151E] text-slate-400 text-xs font-medium border border-white/10 hover:text-white">High Confidence {'>'}90%</button>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
         <div className="grid grid-cols-4 gap-6 min-w-[1000px] h-full">
            
            {/* Column 1: PROPOSED */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                     <StatusDot color="bg-blue-500" /> Proposed <span className="bg-white/10 px-1.5 rounded text-slate-300">8</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
               </div>
               
               <div className="flex flex-col gap-3">
                  <KanbanCard data={{
                     type: 'PRICING', accentColor: 'bg-blue-500', conf: 98,
                     title: 'Increase Weekend Rate for Executive Suites',
                     desc: 'High demand predicted due to tech conference. Competitors already +15%.',
                     uplift: '+$1,450', upliftUnit: '/day'
                  }} />
                  <KanbanCard data={{
                     type: 'INVENTORY', accentColor: 'bg-purple-500', conf: 65,
                     title: 'Close Standard Twin to OTA Channels',
                     desc: 'Protect direct booking margin. Inventory low.',
                     uplift: '+$120', upliftUnit: '/day'
                  }} />
               </div>
            </div>

            {/* Column 2: APPROVED */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                     <StatusDot color="bg-amber-500" /> Approved <span className="bg-white/10 px-1.5 rounded text-slate-300">3</span>
                  </div>
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
               </div>

               <div className="flex flex-col gap-3">
                  <KanbanCard data={{
                     type: 'MARKETING', accentColor: 'bg-orange-500',
                     title: 'Flash Sale: Spa Package',
                     desc: 'Targeting low occupancy Tuesday slots.',
                     queueTime: 'Queued for 14:00', progress: 60
                  }} />
               </div>
            </div>

            {/* Column 3: LIVE */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                     <StatusDot color="bg-emerald-500" /> Live <span className="bg-emerald-500/20 text-emerald-400 px-1.5 rounded">5</span>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <KanbanCard data={{
                     type: 'PRICING', accentColor: 'bg-emerald-500', status: 'Active',
                     title: 'Dynamic Pricing: Weekend Surge',
                     metrics: { current: '$420', uplift: '+$35' }
                  }} />
                  <KanbanCard data={{
                     type: 'MARKETING', accentColor: 'bg-emerald-500', status: 'Active',
                     title: 'Email Campaign: Loyalty Early Access',
                     emailStats: { sent: '1,200', open: '45%' }, progress: 100 // Visual trick for bottom bar
                  }} />
               </div>
            </div>

            {/* Column 4: MEASURING */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                     <StatusDot color="bg-purple-500" /> Measuring <span className="bg-white/10 px-1.5 rounded text-slate-300">2</span>
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <KanbanCard data={{
                     type: 'PRICING', accentColor: 'bg-purple-500',
                     title: 'Corporate Discount Adjustment',
                     desc: 'Data Confidence gathering...',
                  }} />
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}