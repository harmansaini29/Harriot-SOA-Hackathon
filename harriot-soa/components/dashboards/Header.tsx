'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar"; 

export function Header() {
  return (
    <div className="h-full px-4 md:px-8 flex items-center justify-between">
      
      {/* LEFT: Mobile Toggle + Breadcrumbs */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 bg-[#12141c] border-r border-white/10">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xs font-medium text-slate-500 uppercase tracking-widest">Command Center</h1>
          <p className="text-lg font-serif font-bold text-white">Overview</p>
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-[#18181b] border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-[#D4AF37]/50 transition-colors">
          <Search className="w-4 h-4 text-slate-500 mr-3" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 w-full"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0f1116]" />
        </Button>

        <div className="hidden md:block h-8 w-[1px] bg-white/10" />

        <Avatar className="h-9 w-9 border border-white/20 cursor-pointer hover:border-[#D4AF37] transition-colors">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}