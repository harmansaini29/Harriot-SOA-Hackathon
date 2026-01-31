'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calendar, Download, MoreHorizontal, Zap, 
  CheckCircle2, RefreshCw, Building, ArrowRight, X, Play, BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store'; // Connects to your global store

// --- TYPES ---

type ActionStatus = 'Proposed' | 'Approved' | 'Live' | 'Measuring';
type ActionType = 'PRICING' | 'INVENTORY' | 'MARKETING';

interface ActionItem {
  id: string;
  title: string;
  desc?: string;
  type: ActionType;
  status: ActionStatus;
  confidence: number; // 0-100
  upliftValue: number; // Numeric for calculation
  upliftDisplay: string; // String for display
  upliftUnit?: string;
  accentColor: string;
  metrics?: { current: string; uplift: string };
  emailStats?: { sent: string; open: string };
  progress?: number;
  timestamp: Date;
}

// --- MOCK DATA INITIALIZATION ---

const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: '1',
    title: 'Increase Weekend Rate for Executive Suites',
    desc: 'High demand predicted due to tech conference. Competitors already +15%.',
    type: 'PRICING',
    status: 'Proposed',
    confidence: 98,
    upliftValue: 1450,
    upliftDisplay: '+$1,450',
    upliftUnit: '/day',
    accentColor: 'bg-blue-500',
    timestamp: new Date()
  },
  {
    id: '2',
    title: 'Close Standard Twin to OTA Channels',
    desc: 'Protect direct booking margin. Inventory low.',
    type: 'INVENTORY',
    status: 'Proposed',
    confidence: 65,
    upliftValue: 120,
    upliftDisplay: '+$120',
    upliftUnit: '/day',
    accentColor: 'bg-purple-500',
    timestamp: new Date()
  },
  {
    id: '3',
    title: 'Flash Sale: Spa Package',
    desc: 'Targeting low occupancy Tuesday slots.',
    type: 'MARKETING',
    status: 'Approved',
    confidence: 85,
    upliftValue: 400,
    upliftDisplay: '+$400',
    upliftUnit: '/event',
    accentColor: 'bg-orange-500',
    progress: 60,
    timestamp: new Date()
  },
  {
    id: '4',
    title: 'Dynamic Pricing: Weekend Surge',
    type: 'PRICING',
    status: 'Live',
    confidence: 100,
    upliftValue: 0,
    upliftDisplay: '+$35',
    accentColor: 'bg-emerald-500',
    metrics: { current: '$420', uplift: '+$35' },
    timestamp: new Date()
  },
  {
    id: '5',
    title: 'Email Campaign: Loyalty Early Access',
    type: 'MARKETING',
    status: 'Live',
    confidence: 100,
    upliftValue: 0,
    upliftDisplay: 'N/A',
    accentColor: 'bg-emerald-500',
    emailStats: { sent: '1,200', open: '45%' },
    progress: 100,
    timestamp: new Date()
  },
  {
    id: '6',
    title: 'Corporate Discount Adjustment',
    desc: 'Data Confidence gathering...',
    type: 'PRICING',
    status: 'Measuring',
    confidence: 92,
    upliftValue: 500,
    upliftDisplay: '+$500',
    accentColor: 'bg-purple-500',
    timestamp: new Date()
  }
];

// --- COMPONENTS ---

const StatusDot = ({ color }: { color: string }) => (
  <div className={`w-2 h-2 rounded-full ${color} shadow-[0_0_8px_currentColor]`} />
);

const KanbanCard = ({ 
  data, 
  onApprove, 
  onReject, 
  onDeploy,
  onArchive
}: { 
  data: ActionItem, 
  onApprove: (id: string, amount: number) => void,
  onReject: (id: string) => void,
  onDeploy: (id: string) => void,
  onArchive: (id: string) => void
}) => {
  return (
    <motion.div 
      layoutId={data.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="bg-[#13151E] border border-white/5 rounded-xl p-4 shadow-lg transition-all group relative overflow-hidden"
    >
      {/* Left Accent Border */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${data.accentColor}`} />

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
        
        {data.status === 'Live' ? (
           <span className="text-[10px] flex items-center gap-1 text-emerald-400 font-bold tracking-wider">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE
           </span>
        ) : (
          <span className="text-[10px] flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
             <CheckCircle2 className="w-3 h-3" /> {data.confidence}% Conf.
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pl-2">
        <h4 className="text-sm font-semibold text-slate-100 leading-snug mb-1">{data.title}</h4>
        {data.desc && <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">{data.desc}</p>}
        
        {/* Specific Metrics per Type */}
        {data.upliftDisplay && data.status !== 'Live' && data.status !== 'Measuring' && (
           <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Pred. Uplift</div>
              <div className="text-sm font-bold text-emerald-400">{data.upliftDisplay} <span className="text-slate-500 font-normal text-xs">{data.upliftUnit}</span></div>
           </div>
        )}

        {data.progress !== undefined && (
           <div className="mt-3">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${data.progress}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-[10px] text-slate-500">
                 <span>Processing</span>
                 <span>{data.progress}%</span>
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

        {/* --- ACTION BUTTONS (The Logic Layer) --- */}
        <div className="mt-4 flex gap-2">
          {data.status === 'Proposed' && (
            <>
              <Button 
                onClick={() => onApprove(data.id, data.upliftValue)}
                size="sm" 
                className="w-full h-7 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black font-bold uppercase tracking-wider transition-all"
              >
                Approve
              </Button>
              <Button 
                onClick={() => onReject(data.id)}
                size="sm" 
                variant="outline"
                className="h-7 w-8 p-0 border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30"
              >
                <X className="w-3 h-3" />
              </Button>
            </>
          )}

          {data.status === 'Approved' && (
             <Button 
                onClick={() => onDeploy(data.id)}
                size="sm" 
                className="w-full h-7 text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black font-bold uppercase tracking-wider transition-all"
             >
                <Play className="w-3 h-3 mr-1.5" /> Deploy Agent
             </Button>
          )}

          {data.status === 'Measuring' && (
            <Button 
               onClick={() => onArchive(data.id)}
               size="sm" 
               variant="ghost"
               className="w-full h-7 text-[10px] text-slate-500 hover:text-white"
            >
               Archive Result
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---

export default function ActionTrackerPage() {
  // STATE
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ActionType | 'ALL'>('ALL');
  
  // GLOBAL STORE
  const { approveAction } = useAppStore();

  // ACTIONS LOGIC
  const handleApprove = (id: string, uplift: number) => {
     // 1. Update Global Revenue
     approveAction(uplift);

     // 2. Move Card to 'Approved' Column
     setActions(prev => prev.map(item => 
        item.id === id ? { ...item, status: 'Approved', timestamp: new Date() } : item
     ));
  };

  const handleDeploy = (id: string) => {
     // Move to 'Live'
     setActions(prev => prev.map(item => 
        item.id === id ? { 
           ...item, 
           status: 'Live', 
           progress: 0, // Reset progress for measuring
           timestamp: new Date() 
        } : item
     ));

     // Simulate progress bar filling up
     setTimeout(() => {
        setActions(prev => prev.map(item => item.id === id ? { ...item, progress: 100 } : item));
     }, 2000);
  };

  const handleReject = (id: string) => {
     // Remove from board
     setActions(prev => prev.filter(item => item.id !== id));
  };

  const handleArchive = (id: string) => {
     setActions(prev => prev.filter(item => item.id !== id));
  };

  // FILTERING LOGIC
  const filteredActions = useMemo(() => {
     return actions.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'ALL' || item.type === activeFilter;
        return matchesSearch && matchesFilter;
     });
  }, [actions, searchQuery, activeFilter]);

  // COLUMNS HELPER
  const getColumnActions = (status: ActionStatus) => filteredActions.filter(a => a.status === status);

  return (
    <div className="flex flex-col h-full bg-[#0B0C15] text-slate-200 min-h-screen">
      
      {/* 1. Header Section */}
      <div className="p-6 border-b border-white/5 space-y-6 bg-[#0B0C10]/95 backdrop-blur-xl sticky top-0 z-20 shadow-xl">
        {/* Title Row */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white font-serif">Action Tracker</h1>
              <Badge variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 text-xs font-mono">
                 Auto-Pilot Active
              </Badge>
           </div>
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                 <RefreshCw className="w-3 h-3 animate-spin-slow" /> Sync: Real-time
              </div>
              <Button suppressHydrationWarning variant="outline" className="bg-[#13151E] border-white/10 text-slate-300 h-9 text-xs hover:border-[#D4AF37]/50 transition-colors">
                 <Calendar className="w-3 h-3 mr-2" /> This Week
              </Button>
              <Button suppressHydrationWarning className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black h-9 text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                 <Download className="w-3 h-3 mr-2" /> Export Log
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
                 <Zap className="w-3 h-3" /> 98% Optimization Score
              </div>
           </div>

           <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                 <input 
                   suppressHydrationWarning
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Filter by title or type..." 
                   className="w-full bg-[#13151E] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-slate-600"
                 />
              </div>
              <div className="flex gap-2">
                 {(['ALL', 'PRICING', 'INVENTORY', 'MARKETING'] as const).map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter as any)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                         activeFilter === (filter === 'ALL' ? 'ALL' : filter)
                         ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20'
                         : 'bg-[#13151E] text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                      }`}
                    >
                       {filter === 'ALL' ? 'All Types' : filter.charAt(0) + filter.slice(1).toLowerCase()}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* 2. Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
         <div className="grid grid-cols-4 gap-6 min-w-[1200px] h-full">
            
            {/* Column 1: PROPOSED */}
            <ColumnHeader title="Proposed" color="bg-blue-500" count={getColumnActions('Proposed').length} />
            {/* Column 2: APPROVED */}
            <ColumnHeader title="Approved" color="bg-amber-500" count={getColumnActions('Approved').length} />
            {/* Column 3: LIVE */}
            <ColumnHeader title="Live Execution" color="bg-emerald-500" count={getColumnActions('Live').length} />
            {/* Column 4: MEASURING */}
            <ColumnHeader title="Measuring Impact" color="bg-purple-500" count={getColumnActions('Measuring').length} />

            {/* --- COLUMNS CONTENT --- */}
            
            {/* PROPOSED */}
            <div className="flex flex-col gap-3">
               <AnimatePresence mode='popLayout'>
                  {getColumnActions('Proposed').map(item => (
                     <KanbanCard 
                        key={item.id} 
                        data={item} 
                        onApprove={handleApprove} 
                        onReject={handleReject} 
                        onDeploy={handleDeploy} 
                        onArchive={handleArchive}
                     />
                  ))}
               </AnimatePresence>
               {getColumnActions('Proposed').length === 0 && <EmptyState label="No recommendations" />}
            </div>

            {/* APPROVED */}
            <div className="flex flex-col gap-3">
               <AnimatePresence mode='popLayout'>
                  {getColumnActions('Approved').map(item => (
                     <KanbanCard 
                        key={item.id} 
                        data={item} 
                        onApprove={handleApprove} 
                        onReject={handleReject} 
                        onDeploy={handleDeploy} 
                        onArchive={handleArchive}
                     />
                  ))}
               </AnimatePresence>
               {getColumnActions('Approved').length === 0 && <EmptyState label="Queue empty" />}
            </div>

            {/* LIVE */}
            <div className="flex flex-col gap-3">
               <AnimatePresence mode='popLayout'>
                  {getColumnActions('Live').map(item => (
                     <KanbanCard 
                        key={item.id} 
                        data={item} 
                        onApprove={handleApprove} 
                        onReject={handleReject} 
                        onDeploy={handleDeploy} 
                        onArchive={handleArchive}
                     />
                  ))}
               </AnimatePresence>
            </div>

            {/* MEASURING */}
            <div className="flex flex-col gap-3">
               <AnimatePresence mode='popLayout'>
                  {getColumnActions('Measuring').map(item => (
                     <KanbanCard 
                        key={item.id} 
                        data={item} 
                        onApprove={handleApprove} 
                        onReject={handleReject} 
                        onDeploy={handleDeploy} 
                        onArchive={handleArchive}
                     />
                  ))}
               </AnimatePresence>
               {getColumnActions('Measuring').length === 0 && <EmptyState label="No active measurements" />}
            </div>

         </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ColumnHeader({ title, color, count }: { title: string, color: string, count: number }) {
   return (
      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider pl-1 pb-2 border-b border-white/5 mb-2">
         <div className="flex items-center gap-2">
            <StatusDot color={color} /> {title} 
            <span className="bg-white/10 px-1.5 py-0.5 rounded text-slate-300 font-mono text-[10px]">{count}</span>
         </div>
         <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
      </div>
   )
}

function EmptyState({ label }: { label: string }) {
   return (
      <div className="h-24 rounded-xl border border-dashed border-white/5 flex items-center justify-center text-slate-600 text-xs italic">
         {label}
      </div>
   )
}