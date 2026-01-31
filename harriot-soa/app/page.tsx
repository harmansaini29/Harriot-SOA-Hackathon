'use client';

import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSystem from "@/components/FeaturesSystem";
import BentoArchitecture from "@/components/BentoArchitecture";
import LiveOrchestration from "@/components/LiveOrchestration";

export default function LandingPage() {
  const router = useRouter();

  // Temporary function to simulate login
  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#0f1116] selection:bg-[#D4AF37]/30">
      {/* Pass login handler to Hero if buttons are clicked */}
      <HeroSection onStart={handleLogin} />
      <BentoArchitecture />
      <LiveOrchestration />
      <FeaturesSystem />
      
      <footer className="py-12 border-t border-white/10 bg-[#0a0b0f] text-center">
        <div className="text-[#D4AF37] font-serif font-bold text-xl mb-2">Harriot<span className="text-white">SOA</span></div>
        <p className="text-slate-500 text-xs font-mono">© 2026 REVENUE AUTONOMY SYSTEMS. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}