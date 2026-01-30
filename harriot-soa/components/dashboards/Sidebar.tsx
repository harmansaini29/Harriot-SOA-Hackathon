'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Building2, 
  LineChart, 
  Settings, 
  LogOut, 
  Activity,
  Workflow // Added for Action Tracker icon
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Workflow, label: 'Action Tracker', href: '/dashboard/action-tracker' }, // Matches your screenshot flow
  { icon: LineChart, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full py-6 space-y-8 bg-[#0B0C15] border-r border-white/5">
      {/* Logo Area */}
      <div className="px-6 flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">
          Harriot<span className="text-slate-400">SOA</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl bg-white/5 border border-white/5">
           <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-xs font-bold text-indigo-400">AH</div>
           <div className="text-xs">
              <div className="text-white font-medium">Alex Hamilton</div>
              <div className="text-slate-500">VP Revenue</div>
           </div>
        </div>
        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-xs font-medium text-slate-500 hover:text-red-400 hover:bg-red-950/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}