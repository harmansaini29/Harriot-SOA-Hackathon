import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import RoiCalculator from '@/components/RoiCalculator';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Navigation - Glassmorphism & Fixed Positioning */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#020617]/40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
               <span className="text-white font-mono font-bold">H</span>
            </div>
            Harriot<span className="text-indigo-500">SOA</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">Platform</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link href="/dashboard">
            <button 
              suppressHydrationWarning={true}
              className="px-6 py-2.5 text-sm font-bold bg-white text-black rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
            >
              Access Dashboard
            </button>
          </Link>
        </div>
      </nav>

      <HeroSection />
      
      {/* Social Proof Strip - Cyberpunk Style */}
      <div className="w-full border-y border-white/5 bg-[#0B0C15]/50 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-xs text-indigo-400 mb-8 uppercase tracking-[0.3em] font-bold animate-pulse">Trusted by Operations Teams at</p>
          <div className="flex flex-wrap justify-center gap-16 grayscale opacity-40 hover:opacity-100 transition-opacity duration-500">
            {['MARRIOTT', 'HILTON', 'HYATT', 'IHG', 'ACCOR'].map((brand) => (
               <span key={brand} className="text-2xl font-serif font-bold tracking-widest text-white drop-shadow-xl">{brand}</span>
            ))}
          </div>
        </div>
      </div>

      <BentoGrid />
      
      <RoiCalculator />

      <footer className="border-t border-white/5 py-12 text-center text-slate-600 text-sm bg-[#020617] relative z-10">
        <p>&copy; 2026 Harriot Inc. All rights reserved. <span className="text-indigo-900 ml-2 font-mono">System Status: Nominal</span></p>
      </footer>
    </main>
  );
}