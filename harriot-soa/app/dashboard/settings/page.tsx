'use client';

import { useState } from 'react';
import { Save, Shield, Bell, Database, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-serif font-bold text-white">System Configuration</h2>
           <p className="text-slate-400 text-sm mt-1">Manage AI parameters and security.</p>
        </div>
        <Button className="bg-[#D4AF37] text-black hover:bg-[#FDE68A] font-bold">
          <Save className="mr-2 w-4 h-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
               <User className="w-4 h-4" /> General & Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white">
               <Database className="w-4 h-4" /> AI & Automation
            </button>
         </div>

         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                     <Shield className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-medium text-white">API Connection</h3>
                     <p className="text-xs text-slate-500">Manage PMS keys.</p>
                  </div>
               </div>
               <div className="p-4 bg-black/20 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-mono text-white">Oracle Opera Cloud</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20">CONNECTED</Badge>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}