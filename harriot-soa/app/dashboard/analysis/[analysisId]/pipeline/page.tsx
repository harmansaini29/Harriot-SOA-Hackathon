'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Zap, TrendingUp, CheckCircle2, 
  Loader2, AlertTriangle, Brain, Target, 
  BarChart3, Sparkles, ArrowRight, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Types
interface AnalysisStatus {
  analysis_id: string;
  property_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  started_at: string | null;
  completed_at: string | null;
  error_message: string | null;
}

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  progressThreshold: number; // When this step completes
  duration: string;
}

// Pipeline Steps Configuration
const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'initialization',
    name: 'Initializing Analysis',
    description: 'Setting up neural core and fetching property data',
    icon: Sparkles,
    progressThreshold: 10,
    duration: '2-5s'
  },
  {
    id: 'rca',
    name: 'Root Cause Analysis',
    description: 'AI analyzing booking trends, reviews, competitors, and weather',
    icon: Search,
    progressThreshold: 40,
    duration: '15-25s'
  },
  {
    id: 'strategy',
    name: 'Generating Strategy',
    description: 'Creating targeted action plans and campaigns',
    icon: Target,
    progressThreshold: 70,
    duration: '10-15s'
  },
  {
    id: 'impact',
    name: 'Predicting Impact',
    description: 'Forecasting occupancy improvements and ROI',
    icon: TrendingUp,
    progressThreshold: 90,
    duration: '5-10s'
  },
  {
    id: 'finalization',
    name: 'Finalizing Report',
    description: 'Compiling insights and recommendations',
    icon: BarChart3,
    progressThreshold: 100,
    duration: '2-3s'
  }
];

export default function AnalysisPipelinePage() {
  const router = useRouter();
  const params = useParams();
  const analysisId = params?.analysisId as string;

  const [status, setStatus] = useState<AnalysisStatus | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Poll analysis status
  useEffect(() => {
    if (!analysisId) {
      setError('No analysis ID provided');
      return;
    }

    let interval: NodeJS.Timeout;
    let timeInterval: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analysis/${analysisId}/status`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analysis status');
        }

        const data: AnalysisStatus = await response.json();
        setStatus(data);

        // Update current step based on progress
        const stepIndex = PIPELINE_STEPS.findIndex(
          step => data.progress <= step.progressThreshold
        );
        setCurrentStepIndex(stepIndex >= 0 ? stepIndex : PIPELINE_STEPS.length - 1);

        // Handle completion
        if (data.status === 'completed') {
          clearInterval(interval);
          clearInterval(timeInterval);
          
          // Wait a moment to show completion, then redirect
          setTimeout(() => {
            router.push(`/dashboard/analysis/${analysisId}/results`);
          }, 2000);
        }

        // Handle failure
        if (data.status === 'failed') {
          clearInterval(interval);
          clearInterval(timeInterval);
          setError(data.error_message || 'Analysis failed');
        }
      } catch (err) {
        console.error('Error polling status:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch status');
        clearInterval(interval);
        clearInterval(timeInterval);
      }
    };

    // Initial poll
    pollStatus();

    // Poll every 1 second
    interval = setInterval(pollStatus, 1000);

    // Update elapsed time
    timeInterval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, [analysisId, router]);

  // Format elapsed time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900/50 border border-red-500/20 rounded-2xl p-8 text-center"
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-[#D4AF37] text-black rounded-lg font-medium hover:bg-[#D4AF37]/90 transition-colors"
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1116] text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl mb-6">
            <Brain className="w-10 h-10 text-[#D4AF37] animate-pulse" />
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-white mb-3">
            AI Analysis in Progress
          </h1>
          
          <p className="text-slate-400 font-mono text-sm">
            Analysis ID: <span className="text-[#D4AF37]">{analysisId?.slice(0, 8)}...</span>
          </p>

          {/* Progress Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-500 font-mono">PROGRESS</span>
              <span className="text-xs text-slate-300 font-mono font-bold">
                {status?.progress || 0}%
              </span>
            </div>
            
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${status?.progress || 0}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-500"
              />
            </div>

            {/* Time Elapsed */}
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="font-mono">{formatTime(elapsedTime)}</span>
              </div>
              
              <div className="text-xs text-slate-500 font-mono">
                Est. {PIPELINE_STEPS[currentStepIndex]?.duration || '~30s'} remaining
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pipeline Steps */}
        <div className="space-y-4">
          {PIPELINE_STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = (status?.progress || 0) > step.progressThreshold;
            const isPending = index > currentStepIndex;

            return (
              <PipelineStepCard
                key={step.id}
                step={step}
                isActive={isActive}
                isCompleted={isCompleted}
                isPending={isPending}
                index={index}
              />
            );
          })}
        </div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            {status?.status === 'processing' 
              ? 'Neural networks are analyzing your property data...'
              : status?.status === 'completed'
              ? 'Analysis complete! Redirecting to results...'
              : 'Initializing analysis pipeline...'}
          </p>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </div>
  );
}

// Pipeline Step Card Component
function PipelineStepCard({ 
  step, 
  isActive, 
  isCompleted, 
  isPending,
  index 
}: { 
  step: PipelineStep;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative bg-slate-900/50 border rounded-xl p-6 transition-all duration-500",
        isActive && "border-[#D4AF37] bg-[#D4AF37]/5 shadow-lg shadow-[#D4AF37]/10",
        isCompleted && "border-emerald-500/30 bg-emerald-500/5",
        isPending && "border-white/5 opacity-50"
      )}
    >
      {/* Status Indicator Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl overflow-hidden">
        {isActive && (
          <motion.div
            initial={{ height: '0%' }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full bg-gradient-to-b from-[#D4AF37] to-transparent"
          />
        )}
        {isCompleted && (
          <div className="w-full h-full bg-emerald-500" />
        )}
      </div>

      <div className="flex items-start gap-4 pl-4">
        {/* Icon */}
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all",
          isActive && "bg-[#D4AF37]/20 border border-[#D4AF37]/30",
          isCompleted && "bg-emerald-500/20 border border-emerald-500/30",
          isPending && "bg-slate-800 border border-white/5"
        )}>
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          ) : isActive ? (
            <Icon className="w-6 h-6 text-[#D4AF37] animate-pulse" />
          ) : (
            <Icon className="w-6 h-6 text-slate-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn(
              "font-semibold text-lg",
              isActive && "text-white",
              isCompleted && "text-emerald-300",
              isPending && "text-slate-500"
            )}>
              {step.name}
            </h3>

            {/* Status Badge */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full"
              >
                <Loader2 className="w-3 h-3 text-[#D4AF37] animate-spin" />
                <span className="text-xs text-[#D4AF37] font-mono font-bold">RUNNING</span>
              </motion.div>
            )}

            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-mono font-bold">COMPLETE</span>
              </motion.div>
            )}

            {isPending && (
              <span className="text-xs text-slate-600 font-mono">PENDING</span>
            )}
          </div>

          <p className={cn(
            "text-sm leading-relaxed",
            isActive && "text-slate-300",
            isCompleted && "text-slate-400",
            isPending && "text-slate-600"
          )}>
            {step.description}
          </p>

          {/* Progress Indicator for Active Step */}
          {isActive && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ 
                    duration: parseInt(step.duration) || 10,
                    ease: 'linear',
                    repeat: Infinity
                  }}
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-emerald-500"
                />
              </div>
              <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                ~{step.duration}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Completion Animation */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -right-2 -top-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50"
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}