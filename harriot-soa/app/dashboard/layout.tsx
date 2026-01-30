'use client';

import { Sidebar } from "@/components/dashboards/Sidebar"; // Fixed path (plural)
import { Header } from "@/components/dashboards/Header";   // Fixed path (plural)
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-50 flex overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Background Ambient Glow (The "Heavy" Atmosphere) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      {/* 1. Sidebar with Glass Effect */}
      <aside className="hidden md:flex w-72 flex-col border-r border-white/5 bg-[#0B0C10]/60 backdrop-blur-2xl fixed h-full z-40 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative z-10">
        
        {/* Floating Header */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0B0C10]/80 backdrop-blur-xl h-20">
          <Header />
        </header>

        {/* Smooth Page Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Bezier curve for "Apple-like" smoothness
          className="flex-1 p-6 md:p-10 overflow-y-auto scrollbar-hide"
        >
          <div className="max-w-[1600px] mx-auto space-y-10">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
}