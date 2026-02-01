'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, Star, TrendingUp, Users, 
  Coffee, Wifi, Waves, Dumbbell, 
  ArrowLeft, Zap, ChevronRight, Building, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
// import { toast } from 'sonner'; // Assuming you have sonner or similar for toasts

// MOCK IMPORTS - Update these components to accept 'data' props!
import CompetitorChart from '@/components/property/CompetitorChart';
import SentimentRadar from '@/components/property/SentimentRadar';
import MarketFactors from '@/components/property/MarketFactors';

// --- TYPES ---
interface PropertyBasic {
  property_id: string;
  name: string;
  city: string;
  status: string;
  occupancy: number;
  revpar: number;
}

interface PricingData {
  avg_gap_percentage: number;
  positioning: string;
  pricing_data: any[];
}

interface ReviewData {
  avg_rating: number;
  total_reviews: number;
  rating_distribution: Record<string, number>;
}

interface Amenity {
  name: string;
  available: boolean;
  competitor_coverage: string | null;
}

interface TrendData {
  avg_occupancy: number;
  trends: any[];
}

// --- ANIMATION VARIANTS ---
const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data State
  const [property, setProperty] = useState<PropertyBasic | null>(null);
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [reviews, setReviews] = useState<ReviewData | null>(null);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [trends, setTrends] = useState<TrendData | null>(null);

  // Safe Parameter Access
  const propertyId = (params?.id as string) || "PROP_001";

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Get Basic Info from Portfolio (to find Name/City)
        const portfolioRes = await fetch(`${API_BASE_URL}/api/dashboard/portfolio`);
        const portfolioData = await portfolioRes.json();
        const currentProp = portfolioData.properties.find((p: any) => p.property_id === propertyId);
        
        // 2. Parallel fetch for details
        const [pricingRes, reviewsRes, amenitiesRes, trendsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/property/${propertyId}/competitor-pricing?days=30`),
          fetch(`${API_BASE_URL}/api/property/${propertyId}/reviews?days=30`),
          fetch(`${API_BASE_URL}/api/property/${propertyId}/amenities`),
          fetch(`${API_BASE_URL}/api/property/${propertyId}/booking-trends?days=30`)
        ]);

        setProperty(currentProp || null);
        setPricing(await pricingRes.json());
        setReviews(await reviewsRes.json());
        const amData = await amenitiesRes.json();
        setAmenities(amData.amenities || []);
        setTrends(await trendsRes.json());

      } catch (error) {
        console.error("Failed to load property data", error);
        //toast.error("Failed to load property data. Is the API running?");
      } finally {
        setIsLoading(false);
      }
    };

    if (propertyId) {
      fetchData();
    }
  }, [propertyId]);

  // --- HANDLERS ---
  const handleActionPlan = async () => {
    setIsGenerating(true);
    try {
      console.log("data1")
      const res = await fetch(`${API_BASE_URL}/api/analysis/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: propertyId, lookback_days: 30 })
      });
      console.log("data")
      const data = await res.json();
      console.log(data)
      if (data.analysis_id) {
         console.log("Analysis started! Redirecting...")
         router.push(`/dashboard/analysis/${data.analysis_id}/pipeline`);
        //toast.success("Analysis started! Redirecting...");
        // Simulate short delay for UX then redirect to analysis page
      //   setTimeout(() => {
      //       router.push(`/analysis/${data.analysis_id}`);
      //   }, 1500);
      }
    } catch (error) {
      //toast.error("Failed to start analysis");
      setIsGenerating(false);
    }
  };

  // --- DERIVED METRICS ---
  // Calculate latest ADR from trends if available
  const latestADR = trends?.trends?.length 
    ? trends.trends[trends.trends.length - 1].avg_rate 
    : 0;

  // Calculate Sentiment Score (0-100) from 5-star rating
  const sentimentScore = reviews ? (reviews.avg_rating / 5) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1116] flex items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!property) return <div className="text-white p-10">Property not found.</div>;

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
                        {property.status === 'healthy' ? 'GOLD TIER' : 'AT RISK'}
                    </Badge>
                 </h1>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <Button 
                onClick={handleActionPlan}
                disabled={isGenerating}
                className={cn(
                  "bg-[#D4AF37] text-black hover:bg-[#F3E5AB] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300",
                  isGenerating && "opacity-80 scale-95 cursor-not-allowed"
                )}
              >
                 <Zap className={cn("w-4 h-4 mr-2", isGenerating ? "animate-pulse" : "fill-black")} /> 
                 {isGenerating ? "Analyzing..." : "Generate Action Plan"}
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
                {property.city}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                {property.status.toUpperCase()}
            </div>
            <div className="ml-auto font-mono text-xs text-slate-600">
                ASSET ID: {propertyId}
            </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div variants={containerVars} className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <KpiCard 
             label="Occupancy" 
             value={`${property.occupancy}%`} 
             trend={trends?.trend_direction === 'declining' ? '▼ Declining' : '▲ Stable'} 
             color={property.occupancy < 50 ? 'red' : 'emerald'} 
           />
           <KpiCard 
             label="ADR" 
             value={`$${latestADR.toLocaleString()}`} 
             trend={pricing?.positioning === 'premium' ? 'Premium Pos.' : 'Competitive'} 
             color="gold" 
           />
           <KpiCard 
             label="RevPAR" 
             value={`$${property.revpar}`} 
             trend="Last 24h" 
             color="emerald" 
           />
           <KpiCard 
             label="Guest Sentiment" 
             value={sentimentScore.toFixed(1)} 
             trend={`${reviews?.total_reviews} Reviews`} 
             color="purple" 
           />
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
                    <p className="text-xs text-slate-500 mt-1">
                        Price Gap: <span className={pricing && pricing.avg_gap_percentage > 0 ? 'text-emerald-400' : 'text-red-400'}>
                            {pricing?.avg_gap_percentage}% {pricing?.positioning}
                        </span>
                    </p>
                 </div>
              </div>
              
              <div className="h-[350px] w-full relative z-10">
                 {/* Pass the real data to your chart component */}
                 <CompetitorChart data={pricing?.pricing_data || []} />
              </div>
           </motion.div>

           <motion.div variants={itemVars} className="lg:col-span-1 flex flex-col gap-6">
              {/* Pass property ID to fetch specific weather/market factors inside or pass data down */}
              <MarketFactors propertyId={propertyId} />
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
                    {/* Pass review distribution to Radar */}
                    <SentimentRadar data={reviews?.rating_distribution} />
                 </div>
                 <div className="w-full md:w-1/2 space-y-5">
                    {/* Note: Specific Business/Leisure segmentation requires running the AI Analysis. 
                        Using static placeholders or derived mocks until analysis runs. */}
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
                 {amenities.slice(0, 4).map((amenity, idx) => (
                    <AmenityCard 
                        key={idx}
                        // Simple icon mapping based on name keywords - extend as needed
                        icon={
                            amenity.name.includes('WiFi') ? Wifi : 
                            amenity.name.includes('Pool') ? Waves : 
                            amenity.name.includes('Gym') ? Dumbbell : Coffee
                        } 
                        name={amenity.name} 
                        status={amenity.available ? "Active" : "Unavailable"} 
                        trend={amenity.competitor_coverage || "Unique"} 
                        alert={!amenity.available}
                    />
                 ))}
                 {amenities.length === 0 && <div className="text-slate-500 text-sm">No amenity data available</div>}
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

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

interface AmenityCardProps {
  icon: React.ElementType<{ className?: string }>; 
  name: string;
  status: string;
  trend: string;
  alert?: boolean;
}

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