'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', you: 65, ritz: 70, fourS: 72 },
  { day: 'Tue', you: 58, ritz: 68, fourS: 74 },
  { day: 'Wed', you: 62, ritz: 75, fourS: 78 },
  { day: 'Thu', you: 70, ritz: 80, fourS: 82 },
  { day: 'Fri', you: 85, ritz: 88, fourS: 90 },
  { day: 'Sat', you: 90, ritz: 92, fourS: 95 },
  { day: 'Sun', you: 75, ritz: 85, fourS: 88 },
];

export default function CompetitorChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
           tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
           contentStyle={{ backgroundColor: '#0B0C10', borderColor: '#334155', borderRadius: '8px' }}
           itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
           labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
        />
        
        {/* Competitor 1: Ritz (Blue - Dashed) */}
        <Line 
           type="monotone" 
           dataKey="ritz" 
           stroke="#60a5fa" 
           strokeWidth={2} 
           strokeDasharray="5 5" 
           dot={false} 
           activeDot={{ r: 4 }} 
        />
        
        {/* Competitor 2: Four Seasons (Purple - Dashed) */}
        <Line 
           type="monotone" 
           dataKey="fourS" 
           stroke="#c084fc" 
           strokeWidth={2} 
           strokeDasharray="5 5" 
           dot={false} 
           activeDot={{ r: 4 }} 
        />
        
        {/* YOU (Gold - Thick Solid) */}
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