'use client';

import { useState } from 'react';
import { Save, Shield, Bell, Database, User, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch'; // Ensure Switch is installed

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
     autoPilot: true,
     notifications: true,
     aggressivePricing: false
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-serif font-bold text-white">System Configuration</h2>
           <p className="text-slate-400 text-sm mt-1">Manage AI parameters and security.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-black hover:bg-[#FDE68A] font-bold min-w-[140px]">
          {saving ? <span className="animate-pulse">Saving...</span> : <><Save className="mr-2 w-4 h-4" /> Save Changes</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-primary/10 text-primary border border-primary/20">
               <Database className="w-4 h-4" /> AI & Automation
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white">
               <Shield className="w-4 h-4" /> Security & API
            </button>
         </div>

         <div className="lg:col-span-2 space-y-6">
            {/* AI Control Panel */}
            <div className="bg-card border border-border rounded-2xl p-6">
               <h3 className="text-lg font-medium text-white mb-6">Automation Levels</h3>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <div className="text-sm font-medium text-white">Auto-Pilot Mode</div>
                        <div className="text-xs text-slate-500">Allow AI to execute price changes without approval.</div>
                     </div>
                     <Switch checked={settings.autoPilot} onCheckedChange={(v) => setSettings({...settings, autoPilot: v})} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                     <div>
                        <div className="text-sm font-medium text-white">Aggressive Pricing Strategy</div>
                        <div className="text-xs text-slate-500">Prioritize occupancy over ADR during low season.</div>
                     </div>
                     <Switch checked={settings.aggressivePricing} onCheckedChange={(v) => setSettings({...settings, aggressivePricing: v})} />
                  </div>
               </div>
            </div>

            {/* API Connection */}
            <div className="bg-card border border-border rounded-2xl p-6">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                     <Globe className="w-5 h-5" />
                  </div>
                  <div>
                     <h3 className="text-lg font-medium text-white">PMS Connection</h3>
                     <p className="text-xs text-slate-500">Oracle Opera Cloud</p>
                  </div>
               </div>
               <div className="p-4 bg-black/20 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-mono text-white">Connection Stable</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/20">CONNECTED</Badge>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}