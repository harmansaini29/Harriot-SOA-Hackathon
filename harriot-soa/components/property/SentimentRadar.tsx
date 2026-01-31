'use client';

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

const data = [
  { subject: 'Service', A: 98, fullMark: 100 },
  { subject: 'Cleanliness', A: 85, fullMark: 100 },
  { subject: 'Value', A: 70, fullMark: 100 },
  { subject: 'Location', A: 95, fullMark: 100 },
  { subject: 'Amenities', A: 80, fullMark: 100 },
];

export default function SentimentRadar() {
   return (
      <div className="w-full h-[250px] relative">
         <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
               <PolarGrid stroke="#334155" opacity={0.5} />
               <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
               <Radar
                  name="Grand Budapest"
                  dataKey="A"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fill="#D4AF37"
                  fillOpacity={0.3}
               />
               <Tooltip 
                  contentStyle={{ backgroundColor: '#0B0C10', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#D4AF37' }}
               />
            </RadarChart>
         </ResponsiveContainer>
         {/* Center Score */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-2xl font-bold text-white">4.9</div>
         </div>
      </div>
   )
}