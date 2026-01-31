'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  LogOut, 
  Activity,
  Workflow
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Workflow, label: 'Action Tracker', href: '/dashboard/action-tracker' },
  { icon: BarChart2, label: 'Advanced Analytics', href: '/dashboard/charts' },
  { icon: Settings, label: 'System Settings', href: '/dashboard/settings' },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    // In a real app, you would clear auth tokens here
    router.push('/');
  };

  return (
    <div className={cn("flex flex-col h-full py-6 space-y-8", className)}>
      {/* Logo */}
      <div className="px-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
           <Activity className="w-6 h-6 text-black" />
        </div>
        <span className="font-serif font-bold text-xl tracking-tight text-white">
          Harriot<span className="text-primary">SOA</span>
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "text-primary bg-primary/10 border border-primary/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-white/5 border border-white/10">
           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-black">
             AH
           </div>
           <div className="overflow-hidden">
              <div className="text-white text-sm font-medium truncate">Alex Hamilton</div>
              <div className="text-slate-500 text-xs truncate">VP Revenue</div>
           </div>
        </div>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-red-400 border border-transparent hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          Sign Out System
        </button>
      </div>
    </div>
  );
}