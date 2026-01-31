'use client';

import { Sidebar } from "@/components/dashboards/Sidebar"; 
import { Header } from "@/components/dashboards/Header";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      {/* 1. Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex w-72 flex-col border-r border-border bg-card fixed h-full z-50">
        <Sidebar />
      </aside>

      {/* 2. Main Content Area (Scrollable) */}
      <main className="flex-1 md:ml-72 flex flex-col h-full relative z-10">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl h-20">
          <Header />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scrollbar-hide">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[1800px] mx-auto space-y-8 pb-20"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}