'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion'; // FIXED: Added Variants type import
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, Star, TrendingUp, Users, 
  Coffee, Wifi, Waves, Dumbbell, 
  ArrowLeft, Zap, ChevronRight, Building
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// MOCK IMPORTS - Ensure these exist or these will be the only remaining errors
import CompetitorChart from '@/components/property/CompetitorChart';
import SentimentRadar from '@/components/property/SentimentRadar';
import MarketFactors from '@/components/property/MarketFactors';

// --- FIXED: ANIMATION VARIANTS WITH EXPLICIT TYPES ---
const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Safe Parameter Access
  const propertyId = (params?.id as string) || "1";

  useEffect(() => {
    setMounted(true);
  }, []);

  const property = {
    name: "The Grand Budapest",
    location: "Budapest, Hungary",
    tier: "Luxury Collection",
    revpar: 320,
    occupancy: 68,
  };

  const handleActionPlan = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0f1116] text-slate-200 pb-20 relative overflow-hidden font-sans">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Property Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-[#0f1116]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 shadow-2xl shadow-black/20"
      >
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
           
           <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.back()}
                className="rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                 <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div>
                 <div className="flex items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
                    <Link href="/dashboard" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-300">Property Details</span>
                 </div>
                 <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                    {property.name}
                    <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 font-mono text-[10px] tracking-wider px-2 py-0.5">
                       GOLD TIER
                    </Badge>
                 </h1>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <Button 
                onClick={handleActionPlan}
                className={cn(
                  "bg-[#D4AF37] text-black hover:bg-[#F3E5AB] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300",
                  isGenerating && "opacity-80 scale-95"
                )}
              >
                 <Zap className={cn("w-4 h-4 mr-2", isGenerating ? "animate-pulse" : "fill-black")} /> 
                 {isGenerating ? "Optimizing..." : "Generate Action Plan"}
              </Button>
           </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="max-w-[1600px] mx-auto p-6 space-y-8 relative z-10"
      >
        
        {/* Context Bar */}
        <motion.div variants={itemVars} className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                {property.name}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                {property.tier}
            </div>
            <div className="ml-auto font-mono text-xs text-slate-600">
                ASSET ID: {propertyId}
            </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <KpiCard label="Occupancy" value={`${property.occupancy}%`} trend="-5% vs Comp" color="red" />
           <KpiCard label="ADR" value="$412" trend="+2% vs Comp" color="emerald" />
           <KpiCard label="TrevPAR" value="$580" trend="+8% YoY" color="gold" />
           <KpiCard label="Guest Sentiment" value="98.2" trend="Top 1%" color="purple" />
        </motion.div>

        {/* Competitor Pacing Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
           <motion.div variants={itemVars} className="lg:col-span-2 bg-[#18181b] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                 <div>
                    <h3 className="text-lg font-medium text-white flex items-center gap-2">
                       <TrendingUp className="w-5 h-5 text-[#D4AF37]" /> 
                       Competitive Pacing
                    </h3>
                 </div>
              </div>
              
              <div className="h-[350px] w-full relative z-10">
                 <CompetitorChart />
              </div>
           </motion.div>

           <motion.div variants={itemVars} className="lg:col-span-1 flex flex-col gap-6">
              <MarketFactors />
           </motion.div>
        </div>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <motion.div variants={itemVars} className="bg-[#18181b] border border-white/10 rounded-3xl p-6 min-h-[300px] relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Guest Segmentation
                  </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center h-full pb-4">
                 <div className="w-full md:w-1/2 h-[220px]">
                    <SentimentRadar />
                 </div>
                 <div className="w-full md:w-1/2 space-y-5">
                    <SegmentBar label="Business" value={45} color="bg-indigo-500" />
                    <SegmentBar label="Leisure" value={30} color="bg-emerald-500" />
                    <SegmentBar label="Group" value={15} color="bg-amber-500" />
                 </div>
              </div>
           </motion.div>

           <motion.div variants={itemVars} className="bg-[#18181b] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    Asset Performance
                  </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <AmenityCard icon={Waves} name="Infinity Pool" status="High Util" trend="+12%" />
                 <AmenityCard icon={Coffee} name="Michelin Dining" status="Booked" trend="+4%" />
                 <AmenityCard icon={Dumbbell} name="Wellness Spa" status="Low Util" trend="-5%" alert />
                 <AmenityCard icon={Wifi} name="Conf. Center" status="Active" trend="Stable" />
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// TYPES & SUB-COMPONENTS

// FIXED: Local TiltCard
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn("bg-[#18181b] border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:border-[#D4AF37]/20 transition-colors", className)}
        >
            {children}
        </motion.div>
    )
}

interface KpiCardProps {
  label: string;
  value: string;
  trend: string;
  color: 'red' | 'emerald' | 'gold' | 'purple';
}

function KpiCard({ label, value, trend, color }: KpiCardProps) {
   const colors: Record<string, string> = {
      red: "text-red-400 bg-red-500/10 border-red-500/20",
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      gold: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
   };
   
   return (
      <motion.div variants={itemVars}>
          <TiltCard className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{label}</div>
                  {color === 'gold' && <Star className="w-3 h-3 text-[#D4AF37] opacity-50" />}
              </div>
              
              <div className="space-y-3">
                  <div className="text-3xl font-bold text-white tabular-nums tracking-tight">{value}</div>
                  <div className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide", colors[color])}>
                     {trend}
                  </div>
              </div>
          </TiltCard>
      </motion.div>
   )
}

interface SegmentBarProps {
  label: string;
  value: number;
  color: string;
}

function SegmentBar({ label, value, color }: SegmentBarProps) {
   return (
      <div>
         <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-mono">
            <span>{label}</span>
            <span>{value}%</span>
         </div>
         <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: `${value}%` }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className={cn("h-full relative overflow-hidden", color)}
            >
                <div className="absolute inset-0 bg-white/20" />
            </motion.div>
         </div>
      </div>
   )
}

// 1. UPDATE THE INTERFACE
interface AmenityCardProps {
  // FIX: Explicitly define that the icon component accepts a className prop
  icon: React.ElementType<{ className?: string }>; 
  name: string;
  status: string;
  trend: string;
  alert?: boolean;
}

// 2. THE COMPONENT (No changes needed here, but included for context)
function AmenityCard({ icon: Icon, name, status, trend, alert }: AmenityCardProps) {
   return (
      <div className={cn(
          "p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
          alert 
            ? "border-red-500/30 bg-red-900/10 hover:bg-red-900/20" 
            : "border-white/5 bg-[#12141c] hover:bg-[#1f2129] hover:border-white/10"
      )}>
         {alert && <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500 animate-ping" />}
         
         <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={cn(
               "p-2.5 rounded-xl transition-colors",
               alert ? "bg-red-500/20 text-red-400" : "bg-[#0f1116] text-slate-300 group-hover:text-[#D4AF37]"
            )}>
               {/* Now TypeScript knows Icon accepts className */}
               <Icon className="w-5 h-5" />
            </div>
         </div>
         
         <div className="font-medium text-slate-200 text-sm mb-3 relative z-10 group-hover:translate-x-1 transition-transform">{name}</div>
         <Separator className="bg-white/5 mb-3" />
         <div className="flex justify-between items-center text-xs relative z-10 font-mono">
            <span className="text-slate-500">{status}</span>
            <span className={alert ? 'text-red-400 font-bold' : 'text-emerald-400'}>{trend}</span>
         </div>
      </div>
   )
}