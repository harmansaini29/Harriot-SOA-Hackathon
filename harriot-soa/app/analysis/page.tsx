'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, 
  Wifi, Search, Calendar, ChevronDown, ChevronUp,
  ArrowRight, Activity, DollarSign, Briefcase, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

// --- DATA INGESTION (Paste your JSON here) ---
const ANALYSIS_DATA = {
  "analysis_id": "94cded7a-d1b7-4cbb-9295-b1a3e95f9f71",
  "property_name": "Harriott TechPark",
  "current_occupancy": 72.79,
  "rca": {
    "primary_causes": [
      {
        "cause": "Poor Value Proposition due to High Pricing and Critical Amenity Gaps",
        "confidence": 0.9,
        "impact_level": "high",
        "supporting_signals": {
            "price_premium_percentage": 31.61,
            "critical_amenity_gaps": ["Valet Parking", "Gym", "Free WiFi"],
            "wifi_negative_review_sentiment_score": -0.42
        }
      },
      {
        "cause": "Deteriorating Guest Experience",
        "confidence": 0.8,
        "impact_level": "high",
        "supporting_signals": {
            "negative_reviews_percentage": 86.67,
            "common_complaint_room_mentions": 8
        }
      },
      {
        "cause": "External Travel Deterrents (Extreme Weather)",
        "confidence": 0.7,
        "impact_level": "medium",
        "supporting_signals": {
            "days_with_rainfall": 25,
            "overall_weather_travel_impact_assessment": "HIGH"
        }
      }
    ],
    "explanation": "Harriott TechPark's underperformance stems from a poor value proposition..."
  },
  "actions": {
    "recommended_actions": [
      {
        "action_id": "action_1",
        "action_type": "operations",
        "priority": 1,
        "description": "Immediately upgrade the internet infrastructure to 500 Mbps fiber optic.",
        "reason": "Directly addresses the critical Wi-Fi amenity gap and negative review sentiment.",
        "budget_estimate": "medium"
      },
      {
        "action_id": "action_2",
        "action_type": "operations",
        "priority": 1,
        "description": "Conduct a comprehensive deep clean of all 115 rooms and common areas.",
        "reason": "Directly addresses the overwhelming negative reviews regarding cleanliness.",
        "budget_estimate": "medium"
      },
      {
        "action_id": "action_3",
        "action_type": "pricing",
        "priority": 2,
        "description": "Create a value-added package for weekday stays (Mon-Thu) targeting young professionals.",
        "reason": "Justifies the property's price premium by bundling critical amenities.",
        "budget_estimate": "low"
      },
      {
        "action_id": "action_4",
        "action_type": "experience",
        "priority": 2,
        "description": "Establish a compact, well-equipped gym and implement professional valet parking.",
        "reason": "Addresses critical amenity gaps (Gym, Valet Parking).",
        "budget_estimate": "high"
      },
       {
        "action_id": "action_6",
        "action_type": "marketing",
        "priority": 3,
        "description": "Launch a special package during heavy rainfall periods (20% discount).",
        "reason": "Mitigates the impact of extreme weather by providing appealing indoor alternatives.",
        "budget_estimate": "low"
      }
    ]
  },
  "impact": {
    "current_occupancy": 72.79,
    "projected_occupancy": 139.49,
    "combined_impact": {
        "most_likely_increase": "66.7%",
        "min_increase": "58.4%",
        "max_increase": "75.0%"
    },
    // Mapping predictions by index to actions for the demo
    "individual_predictions": [
        { "predicted_increase": "12-18%", "confidence_level": "85%" }, // Matches Action 1
        { "predicted_increase": "15-22%", "confidence_level": "80%" }, // Matches Action 2
        { "predicted_increase": "18-25%", "confidence_level": "75%" }, // Matches Action 3
        { "predicted_increase": "9-13%", "confidence_level": "70%" },  // Matches Action 4
        { "predicted_increase": "8-15%", "confidence_level": "65%" }   // Matches Action 6 (Skipped 5 for brevity in demo data)
    ]
  }
};

// --- COMPONENT HELPERS ---

const getTypeStyles = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pricing': return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500', bar: 'bg-blue-500' };
    case 'inventory': return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500', bar: 'bg-purple-500' };
    case 'operations': return { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500', bar: 'bg-orange-500' };
    case 'marketing': return { color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500', bar: 'bg-pink-500' };
    case 'experience': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500', bar: 'bg-emerald-500' };
    default: return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500', bar: 'bg-slate-500' };
  }
};

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

export default function AnalysisResultPage() {
  const data = ANALYSIS_DATA; // In real app, this comes from props or context

  return (
    <div className="min-h-screen bg-[#0f1116] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
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

        {/* ACTIONS GRID (The requested visual style) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-semibold text-white">Recommended Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.actions.recommended_actions.map((action, idx) => {
              // Mapping the impact prediction to the action by index for this demo
              // In production, match by ID
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

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ImpactSummaryCard({ impact }: { impact: any }) {
  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div>
             <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">Current Occupancy</div>
             <div className="text-3xl font-bold text-slate-300">{impact.current_occupancy}%</div>
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
             <div className="text-3xl font-bold text-indigo-300">{(impact.current_occupancy * 1.66).toFixed(1)}%</div>
          </div>
       </div>
    </div>
  );
}

function RCACard({ cause, index }: { cause: any, index: number }) {
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
          cause.impact_level === 'high' ? "text-red-400 border-red-500/20 bg-red-900/10" : "text-amber-400 border-amber-500/20 bg-amber-900/10"
        )}>
           {cause.impact_level} Impact
        </Badge>
        <span className="text-xs text-slate-500 font-mono">{(cause.confidence * 100).toFixed(0)}% Conf.</span>
      </div>
      
      <h3 className="text-slate-200 font-medium text-sm leading-snug mb-4 min-h-[40px]">
        {cause.cause}
      </h3>
      
      <div className="space-y-2">
        {Object.entries(cause.supporting_signals).slice(0, 2).map(([key, val]: [string, any], i) => (
           <div key={i} className="flex justify-between text-xs border-t border-white/5 pt-2">
              <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="text-slate-300 font-mono">
                 {Array.isArray(val) ? val.length : typeof val === 'number' ? val.toFixed(1) : val}
              </span>
           </div>
        ))}
      </div>
    </motion.div>
  );
}

function ActionCard({ action, prediction }: { action: any, prediction: any }) {
  const styles = getTypeStyles(action.action_type);
  const confidence = prediction ? prediction.confidence_level : 'N/A';
  const uplift = prediction ? prediction.predicted_increase : 'TBD';

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
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Time to Impact</div>
              <div className="text-sm text-slate-300 font-mono">
                 {prediction?.time_to_impact || "Immediate"}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}