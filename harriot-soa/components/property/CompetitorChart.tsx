'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// In a real app, you'd pass the full array. Here we generate some data based on the current price
export default function CompetitorChart({ data }: { data?: any }) {
  // Generate dynamic data around the current price prop if available
  const basePrice = data?.current || 412;
  
  const chartData = [
    { day: 'Mon', you: basePrice - 20, ritz: basePrice + 10, fourS: basePrice + 15 },
    { day: 'Tue', you: basePrice - 30, ritz: basePrice + 5, fourS: basePrice + 10 },
    { day: 'Wed', you: basePrice - 10, ritz: basePrice + 20, fourS: basePrice + 25 },
    { day: 'Thu', you: basePrice + 10, ritz: basePrice + 40, fourS: basePrice + 45 },
    { day: 'Fri', you: basePrice + 50, ritz: basePrice + 60, fourS: basePrice + 65 },
    { day: 'Sat', you: basePrice + 60, ritz: basePrice + 70, fourS: basePrice + 80 },
    { day: 'Sun', you: basePrice + 20, ritz: basePrice + 30, fourS: basePrice + 35 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
        <XAxis 
           dataKey="day" 
           stroke="#94a3b8" 
           tick={{fontSize: 12, fontFamily: 'monospace'}} 
           axisLine={false} 
           tickLine={false} 
           dy={10}
        />
        <YAxis 
           stroke="#94a3b8" 
           tick={{fontSize: 12, fontFamily: 'monospace'}} 
           axisLine={false} 
           tickLine={false} 
           tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
           contentStyle={{ backgroundColor: '#0B0C10', borderColor: '#334155', borderRadius: '8px' }}
           itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
           labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
        />
        
        {/* Competitors */}
        <Line type="monotone" dataKey="ritz" stroke="#60a5fa" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        <Line type="monotone" dataKey="fourS" stroke="#c084fc" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        
        {/* YOU - Gold */}
        <Line 
           type="monotone" 
           dataKey="you" 
           stroke="#D4AF37" 
           strokeWidth={4} 
           dot={{ r: 4, fill: '#D4AF37', strokeWidth: 0 }} 
           activeDot={{ r: 8, stroke: '#D4AF37', strokeWidth: 2, fill: '#000' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}