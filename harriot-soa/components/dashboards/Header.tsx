'use client';

import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="h-full px-8 flex items-center justify-between">
      {/* Left: Breadcrumbs / Context */}
      <div className="flex flex-col">
        <h1 className="text-sm font-medium text-slate-400">Overview</h1>
        <p className="text-lg font-semibold text-slate-100">Portfolio Dashboard</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar (Visual Only) */}
        <div className="hidden md:flex items-center bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 w-64 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all">
          <Search className="w-4 h-4 text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search property or action..." 
            className="bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 w-full"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="w-5 h-5" />
          </Button>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border border-slate-950 animate-pulse" />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-200">Alex Hamilton</p>
            <p className="text-xs text-slate-500">VP of Revenue</p>
          </div>
          <Avatar className="h-9 w-9 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-indigo-950 text-indigo-400">AH</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}