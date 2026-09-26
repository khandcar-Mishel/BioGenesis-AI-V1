import { motion } from 'motion/react';
import { ReactNode } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

// Generate some realistic-looking dummy data for MD charts
const generateRMSDData = () => {
  let current = 0.5;
  return Array.from({ length: 100 }, (_, i) => {
    current += (Math.random() - 0.45) * 0.2; // Slight upward trend then plateau
    if (current > 5) current -= 0.2;
    return { time: i, value: Math.max(0, current) };
  });
};

const generateRMSFData = () => {
  return Array.from({ length: 200 }, (_, i) => {
    let base = 1.0;
    // Add some peaks (loops/flexible regions)
    if (Math.abs(i - 40) < 5) base = 3.5;
    if (Math.abs(i - 120) < 10) base = 4.2;
    if (Math.abs(i - 180) < 8) base = 3.0;
    return { residue: i, value: base + Math.random() * 1.5 };
  });
};

const generateRgData = () => {
  let base = 15;
  return Array.from({ length: 100 }, (_, i) => {
    return { time: i, value: base + (Math.random() - 0.5) * 0.8 };
  });
};

const rmsdData = generateRMSDData();
const rmsfData = generateRMSFData();
const rgData = generateRgData();

export default function MDAnalysisOutputs() {
  return (
    <section className="bg-md-bg py-16 lg:py-24 border-t border-md-border/50">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[32px] sm:text-[36px] font-[700] text-md-navy mb-4 tracking-tight">
            Key Analyses and Outputs
          </h2>
          <p className="text-[15px] sm:text-[17px] text-md-text leading-[1.6] max-w-[680px]">
            Comprehensive analysis tools to evaluate the behavior and stability of your designed proteins.
          </p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. RMSD */}
          <ChartCard title="RMSD" description="Monitor structural deviation over time.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rmsdData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDE7E8" />
                <XAxis dataKey="time" type="number" domain={[0, 100]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={{stroke: '#DDE7E8'}} ticks={[0, 50, 100]} label={{ value: 'Time (ns)', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#526779' }} />
                <YAxis domain={[0, 6]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={false} ticks={[0, 2, 4, 6]} label={{ value: 'RMSD (Å)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#526779' }} />
                <Line type="monotone" dataKey="value" stroke="#11A277" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. RMSF */}
          <ChartCard title="RMSF" description="Identify flexible and rigid regions.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rmsfData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDE7E8" />
                <XAxis dataKey="residue" type="number" domain={[0, 200]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={{stroke: '#DDE7E8'}} ticks={[0, 100, 200]} label={{ value: 'Residue Index', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#526779' }} />
                <YAxis domain={[0, 6]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={false} ticks={[0, 2, 4, 6]} label={{ value: 'RMSF (Å)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#526779' }} />
                <Line type="monotone" dataKey="value" stroke="#296FC7" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 3. Rg */}
          <ChartCard title="Radius of Gyration (Rg)" description="Evaluate compactness and stability.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rgData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DDE7E8" />
                <XAxis dataKey="time" type="number" domain={[0, 100]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={{stroke: '#DDE7E8'}} ticks={[0, 50, 100]} label={{ value: 'Time (ns)', position: 'insideBottom', offset: -10, fontSize: 10, fill: '#526779' }} />
                <YAxis domain={[10, 20]} tick={{fontSize: 10, fill: '#788A92'}} tickLine={false} axisLine={false} ticks={[10, 15, 20]} label={{ value: 'Rg (Å)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#526779' }} />
                <Line type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 4. Secondary Structure (Heatmap representation) */}
          <ChartCard title="Secondary Structure" description="Track structural elements during simulation.">
             <div className="w-full h-full flex flex-col relative pt-2">
                <div className="absolute left-[-2px] top-2 bottom-6 flex flex-col justify-between text-[9px] text-[#788A92] h-[calc(100%-24px)] z-10 bg-white/80 pr-1">
                    <span>Turn</span>
                    <span>Sheet</span>
                    <span>Helix</span>
                    <span>Coil</span>
                </div>
                <div className="w-full h-[calc(100%-24px)] ml-6 relative overflow-hidden rounded-[2px] border border-md-border/50">
                    <HeatmapViz />
                </div>
                <div className="flex justify-between w-full pl-6 mt-1 text-[10px] text-[#788A92]">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                </div>
                <div className="text-center w-full text-[10px] text-[#526779] mt-0.5">Time (ns)</div>
             </div>
          </ChartCard>

          {/* 5. 3D Trajectory Visualization (CSS rendering of multiple states) */}
          <ChartCard title="3D Trajectory Visualization" description="Visualize conformational changes over time.">
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
                <TrajectoryViz />
            </div>
          </ChartCard>

        </div>
        
      </div>
    </section>
  );
}

function ChartCard({ title, description, children }: { title: string, description: string, children: ReactNode }) {
  return (
    <motion.div 
      className="bg-white border border-md-border rounded-[14px] p-5 flex flex-col h-[280px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-[15px] font-[600] text-md-navy mb-4 leading-tight">{title}</h3>
      <div className="flex-1 w-full min-h-0 relative mb-4">
        {children}
      </div>
      <p className="text-[13px] text-md-text leading-[1.5] mt-auto">
        {description}
      </p>
    </motion.div>
  );
}

function HeatmapViz() {
    // Generates a CSS-based pseudo-heatmap representing secondary structure over time
    const cols = 50;
    const rows = 4;
    const cells = [];
    
    const colors = {
        0: '#F59E0B', // Turn (Orange/Yellow)
        1: '#3B82F6', // Sheet (Blue)
        2: '#10B981', // Helix (Green)
        3: '#EF4444'  // Coil (Red)
    };

    for(let r=0; r<rows; r++) {
        for(let c=0; c<cols; c++) {
            // Create some coherent "blocks" of structure
            let type = r; 
            if (Math.random() > 0.85) type = Math.floor(Math.random() * 4);
            if (r===2 && c>10 && c<30) type = 2; // Stable helix block
            if (r===1 && c>35 && c<45) type = 1; // Stable sheet block

            cells.push(
                <div 
                    key={`${r}-${c}`} 
                    style={{ backgroundColor: colors[type as keyof typeof colors] }} 
                    className="opacity-80 mix-blend-multiply"
                />
            );
        }
    }

    return (
        <div className="w-full h-full grid" style={{ gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {cells}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')] opacity-20 pointer-events-none" />
        </div>
    );
}

function TrajectoryViz() {
    return (
        <div className="relative w-[180px] h-[180px]">
            {/* Base state */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-md">
                <path d="M30,30 Q50,10 70,30 T80,70 Q60,90 40,70 T30,30" fill="none" stroke="#10AFC0" strokeWidth="6" strokeLinecap="round" opacity="1" />
                <path d="M40,40 Q60,20 60,60 T40,40" fill="#11A277" opacity="0.8" />
            </svg>
            {/* Trajectory states (ghosted) */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full blur-[1px]">
                <path d="M28,32 Q48,12 72,32 T78,72 Q58,92 38,72 T28,32" fill="none" stroke="#296FC7" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full blur-[2px]">
                <path d="M32,28 Q52,8 68,28 T82,68 Q62,88 42,68 T32,28" fill="none" stroke="#18B889" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            </svg>
            {/* Center blob */}
            <div className="absolute inset-[30%] bg-gradient-to-tr from-md-blue to-md-green rounded-full opacity-30 blur-md" />
        </div>
    );
}
