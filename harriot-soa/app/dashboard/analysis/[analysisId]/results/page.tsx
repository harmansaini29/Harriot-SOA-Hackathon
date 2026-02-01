'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Search, ArrowRight, Zap, Loader2, ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Types
interface RootCause {
  cause: string;
  confidence: number;
  impact_level: string;
  supporting_signals: Record<string, any>;
}

interface RecommendedAction {
  action_id: string;
  action_type: string;
  priority: number;
  description: string;
  reason: string;
  budget_estimate: string;
  predicted_uplift?: string;
  confidence?: number;
}

interface ImpactPrediction {
  predicted_increase: string;
  confidence_level: string;
  time_to_impact?: string;
}

interface CompleteAnalysisResult {
  analysis_id: string;
  property_id: string;
  property_name: string;
  current_occupancy: number;
  rca: {
    primary_causes: RootCause[];
    explanation: string;
  };
  actions: {
    recommended_actions: RecommendedAction[];
  };
  impact: {
    current_occupancy: number;
    projected_occupancy: number;
    combined_impact: {
      most_likely_increase: string;
      min_increase: string;
      max_increase: string;
    };
    individual_predictions: ImpactPrediction[];
  };
}

export default function AnalysisResultPage() {
  const params = useParams();
  const router = useRouter();
  const analysisId = params?.analysisId as string;

  const [data, setData] = useState<CompleteAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch analysis result
  useEffect(() => {
    if (!analysisId) {
      setError('No analysis ID provided');
      setLoading(false);
      return;
    }

    const fetchAnalysisResult = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/analysis/${analysisId}/result`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analysis result');
        }

        const result: CompleteAnalysisResult = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching analysis result:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisResult();
  }, [analysisId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mx-auto" />
          <p className="text-slate-400 font-mono text-sm">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/50 border border-red-500/20 rounded-2xl p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Analysis</h2>
          <p className="text-slate-400 mb-6">{error || 'Analysis not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#D4AF37]/90 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1116] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-mono">Back to Dashboard</span>
        </button>

        {/* HEADER & SUMMARY */}
        <header>
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-serif font-bold text-white">{data.property_name}</h1>
            <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-900/10 px-3 py-1">
              Analysis Complete
            </Badge>
          </div>
          
          <ImpactSummaryCard impact={data.impact} />
        </header>

        {/* RCA SECTION */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Root Cause Analysis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.rca.primary_causes.map((cause, idx) => (
              <RCACard key={idx} cause={cause} index={idx} />
            ))}
          </div>
          <p className="text-slate-400 text-sm bg-slate-900/50 p-4 rounded-lg border border-white/5 leading-relaxed">
            <span className="text-indigo-400 font-bold">AI Insight:</span> {data.rca.explanation}
          </p>
        </section>

        {/* ACTIONS GRID */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-semibold text-white">Recommended Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.actions.recommended_actions.map((action, idx) => {
              const prediction = data.impact.individual_predictions[idx];
              
              return (
                <ActionCard 
                  key={action.action_id} 
                  action={action} 
                  prediction={prediction} 
                />
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-8 border-t border-white/5">
          <button
            onClick={() => router.push(`/dashboard/properties/${data.property_id}`)}
            className="px-6 py-3 bg-slate-800 border border-white/10 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            View Property Details
          </button>
          <button
            onClick={() => {
              // In production, this would trigger action approval workflow
              alert('Action approval workflow would start here');
            }}
            className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#D4AF37]/90 transition-colors"
          >
            Approve & Execute Actions
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ImpactSummaryCard({ impact }: { impact: CompleteAnalysisResult['impact'] }) {
  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
             <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">Current Occupancy</div>
             <div className="text-3xl font-bold text-slate-300">{impact.current_occupancy.toFixed(1)}%</div>
          </div>
          
          <div className="flex flex-col items-center justify-center relative">
             <ArrowRight className="absolute text-slate-700 w-8 h-8 opacity-20" />
             <div className="text-center">
                <div className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1 font-bold">Projected Uplift</div>
                <div className="text-4xl font-bold text-white tracking-tight">+{impact.combined_impact.most_likely_increase}</div>
                <div className="text-xs text-slate-500 mt-1">
                   Range: {impact.combined_impact.min_increase} - {impact.combined_impact.max_increase}
                </div>
             </div>
          </div>

          <div className="text-right">
             <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">Target Occupancy</div>
             <div className="text-3xl font-bold text-indigo-300">{impact.projected_occupancy.toFixed(1)}%</div>
          </div>
       </div>
    </div>
  );
}

function RCACard({ cause, index }: { cause: RootCause; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#161821] border border-white/5 rounded-xl p-5 hover:border-indigo-500/30 transition-colors group"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant="outline" className={cn(
          "uppercase text-[10px] tracking-wider",
          cause.impact_level === 'high' ? "text-red-400 border-red-500/20 bg-red-900/10" : 
          cause.impact_level === 'medium' ? "text-amber-400 border-amber-500/20 bg-amber-900/10" :
          "text-slate-400 border-slate-500/20 bg-slate-900/10"
        )}>
           {cause.impact_level} Impact
        </Badge>
        <span className="text-xs text-slate-500 font-mono">{(cause.confidence * 100).toFixed(0)}% Conf.</span>
      </div>
      
      <h3 className="text-slate-200 font-medium text-sm leading-snug mb-4 min-h-[40px]">
        {cause.cause}
      </h3>
      
      <div className="space-y-2">
        {Object.entries(cause.supporting_signals).slice(0, 2).map(([key, val], i) => (
           <div key={i} className="flex justify-between text-xs border-t border-white/5 pt-2">
              <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="text-slate-300 font-mono">
                 {Array.isArray(val) ? val.join(', ') : typeof val === 'number' ? val.toFixed(1) : String(val)}
              </span>
           </div>
        ))}
      </div>
    </motion.div>
  );
}

function ActionCard({ action, prediction }: { 
  action: RecommendedAction; 
  prediction?: ImpactPrediction;
}) {
  const styles = getTypeStyles(action.action_type);
  const confidence = prediction?.confidence_level || 'N/A';
  const uplift = prediction?.predicted_increase || action.predicted_uplift || 'TBD';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#12141c] rounded-xl border border-white/5 overflow-hidden flex relative group hover:shadow-2xl hover:shadow-black/50 transition-all"
    >
      {/* Colored Left Border Strip */}
      <div className={cn("w-1.5 h-full absolute left-0 top-0", styles.bar)} />

      <div className="p-5 pl-7 flex flex-col w-full">
        {/* Card Header: Type Badge & Confidence */}
        <div className="flex justify-between items-center mb-3">
          <Badge 
            variant="outline" 
            className={cn("uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded", styles.color, styles.bg, styles.border)}
          >
            {action.action_type}
          </Badge>
          
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-500/20">
             <CheckCircle2 className="w-3 h-3" />
             <span>{confidence} Conf.</span>
          </div>
        </div>

        {/* Priority Badge */}
        <div className="mb-3">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold",
            action.priority === 1 ? "bg-red-500/10 text-red-400 border border-red-500/20" :
            action.priority === 2 ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
            "bg-slate-500/10 text-slate-400 border border-slate-500/20"
          )}>
            PRIORITY {action.priority}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-100 mb-2 leading-tight">
          {action.description.split('.')[0]}.
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2">
           {action.reason}
        </p>

        {/* Footer: Metrics */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
           <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Pred. Uplift</div>
              <div className="flex items-baseline gap-1 text-emerald-400">
                 <TrendingUp className="w-4 h-4" />
                 <span className="text-xl font-bold">{uplift}</span>
              </div>
           </div>
           
           <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Budget</div>
              <div className="text-sm text-slate-300 font-mono uppercase">
                 {action.budget_estimate}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function for action type styling
const getTypeStyles = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pricing': return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500', bar: 'bg-blue-500' };
    case 'inventory': return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500', bar: 'bg-purple-500' };
    case 'operations': return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500', bar: 'bg-orange-500' };
    case 'marketing': return { color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500', bar: 'bg-pink-500' };
    case 'experience': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500', bar: 'bg-emerald-500' };
    case 'amenities': return { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500', bar: 'bg-cyan-500' };
    default: return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500', bar: 'bg-slate-500' };
  }
};