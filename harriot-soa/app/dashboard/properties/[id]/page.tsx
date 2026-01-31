'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Zap, ChevronRight, BrainCircuit, CheckCircle2, AlertCircle,
  MessageSquare, Sparkles, ArrowUpRight, ScanEye, TrendingUp, Users, DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

// DYNAMIC SUB-COMPONENTS
import CompetitorChart from '@/components/property/CompetitorChart';
import SentimentRadar from '@/components/property/SentimentRadar';
import MarketFactors from '@/components/property/MarketFactors';

// --- TYPES FOR BACKEND INTEGRATION ---
interface PropertyData {
  id: string;
  name: string;
  tier: string;
  status: 'Healthy' | 'At-Risk' | 'Critical';
  kpis: {
    occupancy: number;
    adr: number;
    revpar: number;
    sentiment: number;
  };
  market: {
    weather: { condition: string; temp: number; impact: string };
    events: { name: string; distance: string; date: string; impact: 'High' | 'Med' | 'Low' };
  };
  pricing: {
    current: number;
    compSetAvg: number;
    position: 'Leader' | 'Matcher' | 'Undercut';
  };
}

// --- MOCK API RESPONSE ---
const MOCK_DB: Record<string, PropertyData> = {
  "1": {
    id: "1",
    name: "The Grand Budapest",
    tier: "Luxury Collection",
    status: "At-Risk",
    kpis: { occupancy: 68, adr: 412, revpar: 320, sentiment: 98.2 },
    market: {
      weather: { condition: "Rainy", temp: 18, impact: "+15% Indoor Demand" },
      events: { name: "Formula 1 Grand Prix", distance: "2.4 miles", date: "This Weekend", impact: "High" }
    },
    pricing: { current: 412, compSetAvg: 385, position: 'Leader' }
  }
};

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

type AgentStep = 'idle' | 'root_cause' | 'segmentation' | 'strategy' | 'gen_ai' | 'impact' | 'complete';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<PropertyData | null>(null);
  
  // SOA AGENT STATE
  const [agentState, setAgentState] = useState<AgentStep>('idle');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const propertyId = (params?.id as string) || "1";

  useEffect(() => {
    setMounted(true);
    // SIMULATE BACKEND FETCH
    setTimeout(() => {
        setData(MOCK_DB[propertyId] || MOCK_DB["1"]);
    }, 500);
  }, [propertyId]);

  const runSOAnalysis = () => {
    setAgentState('root_cause');
    setAnalysisProgress(10);
    const sequence: { step: AgentStep; delay: number; progress: number }[] = [
      { step: 'segmentation', delay: 1500, progress: 30 },
      { step: 'strategy', delay: 3000, progress: 50 },
      { step: 'gen_ai', delay: 4500, progress: 75 },
      { step: 'impact', delay: 6000, progress: 90 },
      { step: 'complete', delay: 7500, progress: 100 },
    ];
    sequence.forEach(({ step, delay, progress }) => {
      setTimeout(() => {
        setAgentState(step);
        setAnalysisProgress(progress);
      }, delay);
    });
  };

  if (!mounted || !data) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 relative overflow-hidden font-sans">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. PROPERTY HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 shadow-2xl"
      >
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-white/5 text-slate-400 hover:text-white">
                 <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                 <div className="flex items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Portfolio</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-300">Property Details</span>
                 </div>
                 <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                    {data.name}
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 font-mono text-[10px] px-2 py-0.5">GOLD TIER</Badge>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-[10px] px-2 py-0.5">STATUS: {data.status.toUpperCase()}</Badge>
                 </h1>
              </div>
           </div>

           <div className="flex items-center gap-4">
              {agentState !== 'idle' && agentState !== 'complete' && (
                 <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-full">
                    <BrainCircuit className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary uppercase tracking-wider">Agent Active: {agentState.replace('_', ' ')}</span>
                    <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                       <motion.div className="h-full bg-primary" animate={{ width: `${analysisProgress}%` }} />
                    </div>
                 </div>
              )}
              <Button onClick={runSOAnalysis} disabled={agentState !== 'idle' && agentState !== 'complete'} className={cn("bg-primary text-black hover:bg-[#F3E5AB] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all", agentState !== 'idle' && agentState !== 'complete' && "opacity-50 cursor-not-allowed")}>
                 <Zap className={cn("w-4 h-4 mr-2", agentState !== 'idle' && agentState !== 'complete' ? "animate-spin" : "fill-black")} /> 
                 {agentState === 'idle' ? "Run SOA Analysis" : agentState === 'complete' ? "Re-Run Analysis" : "Analyzing..."}
              </Button>
           </div>
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="max-w-[1800px] mx-auto p-6 space-y-8 relative z-10">
        
        {/* 2. KPI OVERVIEW */}
        <motion.div variants={containerVars} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <KpiCard label="Occupancy" value={`${data.kpis.occupancy}%`} trend="-5% vs Comp" color="red" alert />
           <KpiCard label="ADR" value={`$${data.kpis.adr}`} trend="+2% vs Comp" color="emerald" />
           <KpiCard label="RevPAR" value={`$${data.kpis.revpar}`} trend="-3% YoY" color="red" alert />
           <KpiCard label="Guest Sentiment" value={data.kpis.sentiment.toString()} trend="Top 1%" color="gold" />
        </motion.div>

        {/* 3. SOA AGENT OUTPUT */}
        <AnimatePresence mode='wait'>
           {agentState !== 'idle' && agentState !== 'complete' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full bg-card/50 border border-primary/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-sm">
                 <BrainCircuit className="w-16 h-16 text-primary mb-6 animate-pulse" />
                 <h2 className="text-2xl font-serif text-white mb-2">Orchestrating AI Agents</h2>
                 <p className="text-slate-400 font-mono text-sm max-w-md">Scanning booking funnel...</p>
                 <div className="grid grid-cols-5 gap-4 mt-8 w-full max-w-3xl">
                    {['Root Cause', 'Segmentation', 'Strategy', 'GenAI', 'Impact'].map((step, i) => (
                        <AgentStepBadge key={step} label={step} active={agentState === step.toLowerCase().replace(' ', '_')} completed={analysisProgress > (i + 1) * 20} />
                    ))}
                 </div>
              </motion.div>
           )}

           {agentState === 'complete' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.div variants={itemVars} className="bg-card border border-destructive/20 rounded-3xl p-6 relative overflow-hidden">
                       <AlertCircle className="absolute top-0 right-0 w-24 h-24 text-destructive opacity-10 m-4" />
                       <h3 className="text-lg font-serif text-white flex items-center gap-2 mb-4">
                          <ScanEye className="w-5 h-5 text-destructive" /> AI Diagnosis
                       </h3>
                       <div className="space-y-4 relative z-10">
                          <DiagnosisItem title="Pricing Friction" desc="Weekend rates are 15% higher than CompSet." severity="High" />
                          <DiagnosisItem title="Weak Corp Demand" desc="Mid-week corporate bookings down 8% YoY." severity="Medium" />
                       </div>
                    </motion.div>
                    <motion.div variants={itemVars} className="lg:col-span-2 space-y-4">
                       <div className="flex items-center justify-between">
                          <h3 className="text-lg font-serif text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary" /> Recommended Actions</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">High Confidence (92%)</Badge>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ActionCard title="Launch 'Weekend Escape'" type="Offer" uplift="+4.2%" confidence="92%" desc="Bundle spa credit to capture leisure." tags={['Leisure', 'High Impact']} />
                          <ActionCard title="Mid-Week Corporate Rate" type="Pricing" uplift="+2.8%" confidence="85%" desc="Adjust Tue-Thu rate to match market." tags={['Business', 'Quick Win']} />
                       </div>
                    </motion.div>
                 </div>
              </motion.div>
           )}
        </AnimatePresence>

        {/* 4. MARKET & PRICING ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* MARKET FACTORS WIDGET */}
           <motion.div variants={itemVars} className="lg:col-span-1 space-y-6">
               <MarketFactors weather={data.market.weather} events={data.market.events} />
               
               {/* PRICING BAR WIDGET */}
               <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-medium text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary" /> Price Positioning</h3>
                  </div>
                  <div className="relative pt-6 pb-2">
                     {/* The Bar */}
                     <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="w-1/3 bg-blue-500/30 border-r border-black/50" />
                        <div className="w-1/3 bg-emerald-500/30 border-r border-black/50" />
                        <div className="w-1/3 bg-amber-500/30" />
                     </div>
                     {/* Labels */}
                     <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
                        <span>Value</span>
                        <span>Competitive</span>
                        <span>Premium</span>
                     </div>
                     {/* The Indicator */}
                     <div className="absolute top-4 left-[68%] -translate-x-1/2 flex flex-col items-center">
                        <div className="px-2 py-0.5 bg-primary text-black text-[10px] font-bold rounded mb-1 shadow-lg shadow-primary/20">${data.pricing.current}</div>
                        <div className="w-0.5 h-4 bg-primary" />
                     </div>
                     <div className="absolute top-10 left-[55%] -translate-x-1/2 flex flex-col items-center opacity-50">
                        <div className="w-0.5 h-2 bg-slate-400" />
                        <div className="text-[10px] text-slate-400 mt-1">Comp Avg ${data.pricing.compSetAvg}</div>
                     </div>
                  </div>
               </div>
           </motion.div>

           {/* COMPETITOR CHART */}
           <motion.div variants={itemVars} className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-6 relative z-10">
                 <h3 className="text-lg font-medium text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Competitive Pacing</h3>
                 <Badge className="bg-slate-800 text-slate-400 border-white/10">Next 7 Days</Badge>
              </div>
              <div className="h-[300px] w-full relative z-10">
                 <CompetitorChart data={data.pricing} />
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

// ... Sub-components (KpiCard, DiagnosisItem, ActionCard, AgentStepBadge) remain similar to previous implementation for brevity ...
function KpiCard({ label, value, trend, color, alert }: any) {
  const colors: any = { red: "text-red-400 bg-red-500/10 border-red-500/20", emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", gold: "text-primary bg-primary/10 border-primary/20" };
  return (
     <motion.div variants={itemVars} className={cn("bg-card border p-6 rounded-2xl shadow-xl relative overflow-hidden", alert ? "border-destructive/30" : "border-border")}>
        <div className="flex justify-between items-start mb-4 relative z-10">
           <div className="text-slate-500 text-xs font-mono uppercase tracking-wider">{label}</div>
           {color === 'gold' && <Sparkles className="w-3 h-3 text-primary opacity-50" />}
        </div>
        <div className="space-y-3 relative z-10">
           <div className="text-3xl font-bold text-white tabular-nums tracking-tight">{value}</div>
           <div className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide", colors[color])}>{trend}</div>
        </div>
     </motion.div>
  )
}
// ... Add other sub-components if needed ...
function AgentStepBadge({ label, active, completed }: any) {
    return (
       <div className="flex flex-col items-center gap-2">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500", active ? "bg-primary border-primary text-black scale-110 shadow-[0_0_15px_rgba(212,175,55,0.5)]" : completed ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-slate-600")}>
             {completed ? <CheckCircle2 className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
          </div>
          <span className={cn("text-[10px] uppercase font-bold tracking-wider transition-colors duration-300", active ? "text-primary" : completed ? "text-slate-300" : "text-slate-600")}>{label}</span>
       </div>
    )
 }
 function DiagnosisItem({ title, desc, severity }: any) {
    const colors: any = { High: "bg-red-500", Medium: "bg-amber-500", Low: "bg-blue-500" };
    return (
       <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className={cn("w-1 h-full rounded-full shrink-0", colors[severity])} />
          <div>
             <div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold text-slate-200">{title}</span><span className="text-[10px] uppercase text-slate-500 border border-white/10 px-1 rounded">{severity}</span></div>
             <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
       </div>
    )
 }
 function ActionCard({ title, type, uplift, confidence, desc, tags }: any) {
    return (
       <div className="bg-card border border-border p-5 rounded-2xl hover:border-primary/30 transition-all group flex flex-col justify-between h-full">
          <div>
             <div className="flex justify-between items-start mb-3"><Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{type}</Badge><div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded"><ArrowUpRight className="w-3 h-3" /> {uplift} Uplift</div></div>
             <h4 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h4>
             <p className="text-xs text-slate-400 mb-4 leading-relaxed">{desc}</p>
          </div>
          <div className="space-y-4">
             <div className="flex gap-2">{tags.map((tag: string) => (<span key={tag} className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">{tag}</span>))}</div>
             <div className="grid grid-cols-2 gap-2">
                <Dialog>
                   <DialogTrigger asChild><Button variant="outline" className="w-full text-xs border-border hover:bg-white/5 hover:text-white"><MessageSquare className="w-3 h-3 mr-2" /> Preview</Button></DialogTrigger>
                   <DialogContent className="bg-card border-border text-slate-200"><DialogHeader><DialogTitle className="text-white font-serif flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> AI Generated Offer</DialogTitle><DialogDescription>Generated by Harriot GenAI Agent • Confidence: {confidence}</DialogDescription></DialogHeader><div className="space-y-4 mt-4"><div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2"><div className="text-xs text-slate-500 uppercase">Offer Copy</div><div className="text-sm text-slate-300 leading-relaxed">"Experience luxury like never before. Book a weekend stay (Fri-Sun) and receive a complimentary $100 spa credit plus late checkout."</div></div></div></DialogContent>
                </Dialog>
                <Button className="w-full text-xs bg-primary text-black hover:bg-[#F3E5AB] font-bold"><CheckCircle2 className="w-3 h-3 mr-2" /> Launch</Button>
             </div>
          </div>
       </div>
    )
 }