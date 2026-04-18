import React, { useState, useRef, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';
import { Settings, ChevronDown, BarChart2 } from 'lucide-react';

interface MarginChartProps {
    activeFileId: string | null;
}

interface GraphEntry {
    year: string;
    chartType: string;
    title: string;
    dataKey1: string;
    data: { name: string; industry?: string; month?: string; npPct: number }[];
}

interface GraphJson {
    availableYears: string[];
    graphs: GraphEntry[];
}

const colors = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#f43f5e', '#eab308'];

export const MarginChart: React.FC<MarginChartProps> = ({ activeFileId }) => {
    const [graphJson, setGraphJson] = useState<GraphJson | null>(null);
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [durationLimit, setDurationLimit] = useState(12);
    const [showSettings, setShowSettings] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fetch graph data
    useEffect(() => {
        const url = activeFileId
            ? `http://localhost:5001/api/graph-data/${activeFileId}`
            : `http://localhost:5001/uploads/graph.json`;

        fetch(url)
            .then(res => res.json())
            .then(json => {
                const payload = json?.data || json;

                if (payload?.availableYears?.length) {
                    setGraphJson(payload);
                    setSelectedYears([payload.availableYears[payload.availableYears.length - 1]]); 
                } else if (payload?.graphs?.[0]) {
                    const legacy: GraphJson = {
                        availableYears: ['All'],
                        graphs: [{ year: 'All', ...payload.graphs[0] }]
                    };
                    setGraphJson(legacy);
                    setSelectedYears(['All']);
                }
            })
            .catch(err => console.error('Failed to fetch graph data', err));
    }, [activeFileId]);

    // Handle click outside to close popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowSettings(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Build chart data combining selected years
    const activeGraphs = graphJson?.graphs?.filter(g => selectedYears.includes(g.year)) || [];
    const maxLength = Math.max(...activeGraphs.map(g => g.data?.length || 0), 0);
    
    let chartData: any[] = [];
    for (let i = 0; i < maxLength; i++) {
        const row: any = { index: i };
        let defaultName = `Pt ${i+1}`;
        activeGraphs.forEach(g => {
            const d = g.data[i];
            if (d) {
                const label = d.month ? d.month.substring(0, 3) : (d.name ? d.name.substring(0, 5) : '');
                if (label && defaultName.startsWith('Pt ')) {
                    defaultName = label;
                }
                row[`margin_${g.year}`] = d.npPct;
                row[`fullName_${g.year}`] = d.name || 'Unknown';
                row[`industry_${g.year}`] = d.industry || 'Unknown Sector';
                row[`fullMonth_${g.year}`] = d.month || 'Unknown';
            }
        });
        row['name'] = defaultName;
        chartData.push(row);
    }

    const availableYears = graphJson?.availableYears || [];
    const visibleData = chartData.slice(Math.max(chartData.length - durationLimit, 0));

    // Get latest margin for the header
    const sortedYears = [...selectedYears].sort();
    const latestYear = sortedYears[sortedYears.length - 1];
    let currentMargin = 0;
    if (visibleData.length > 0 && latestYear && visibleData[visibleData.length - 1][`margin_${latestYear}`] !== undefined) {
        currentMargin = visibleData[visibleData.length - 1][`margin_${latestYear}`];
    } else if (visibleData.length > 0) {
        const lastPt = visibleData[visibleData.length - 1];
        const anyKey = Object.keys(lastPt).find(k => k.startsWith('margin_'));
        if (anyKey) currentMargin = lastPt[anyKey];
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 text-white p-6 md:p-8 rounded-[40px] shadow-2xl w-full flex flex-col col-span-1 lg:col-span-2 relative min-h-[360px] overflow-visible">

            <div className="flex items-start justify-between mb-2">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-full mb-4">
                        <BarChart2 size={12} className="text-primary" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-300">Net Profit Margin</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-4xl font-black tracking-tighter">{currentMargin}%</h2>
                        {selectedYears.length > 1 && (
                            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest backdrop-blur-sm bg-zinc-800/40 px-2 py-1 rounded-md">
                                Comparing {selectedYears.length} yrs
                            </span>
                        )}
                    </div>
                </div>

                {/* Settings Gear Popover */}
                <div className="relative z-50" ref={menuRef}>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-11 h-11 rounded-[1.25rem] flex items-center justify-center transition-all shadow-sm ${showSettings ? 'bg-primary text-white rotate-90' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
                    >
                        <Settings size={20} strokeWidth={2.5} />
                    </button>

                    {showSettings && (
                        <div className="absolute right-0 top-14 w-72 bg-zinc-800 text-white rounded-[24px] p-6 shadow-2xl border border-zinc-700 animate-in fade-in zoom-in-95 duration-200">
                            
                            <div className="mb-6">
                                <label className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                    <span>Compare Years</span>
                                    <span className="bg-zinc-900 text-primary px-2 py-0.5 rounded-full text-[9px] font-black">{selectedYears.length} Selected</span>
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 stylish-scrollbar">
                                    {availableYears.map((yr, idx) => {
                                        const isSelected = selectedYears.includes(yr);
                                        const color = colors[idx % colors.length];
                                        return (
                                            <div 
                                                key={yr}
                                                onClick={() => {
                                                    if (isSelected && selectedYears.length === 1) return; // Prevent deselecting last item
                                                    setSelectedYears(prev => 
                                                        isSelected ? prev.filter(y => y !== yr) : [...prev, yr]
                                                    );
                                                }}
                                                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border ${isSelected ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-900/30 border-transparent hover:bg-zinc-700/50'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isSelected ? 'border-transparent' : 'border-zinc-500'}`} style={{ backgroundColor: isSelected ? color : 'transparent' }}>
                                                        {isSelected && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white"><path d="M3 7.5L5.5 10L11 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                                    </div>
                                                    <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>FY {yr}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="pt-5 border-t border-zinc-700/50">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                        Data Points
                                    </label>
                                    <span className="text-xs font-black text-white bg-zinc-900 px-2.5 py-1 rounded-md">{durationLimit}</span>
                                </div>
                                <div className="relative pt-2">
                                <input
                                    type="range"
                                    min="3"
                                    max={Math.max(chartData.length, 12)}
                                    step="1"
                                    value={durationLimit}
                                    onChange={(e) => setDurationLimit(Number(e.target.value))}
                                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer outline-none"
                                    style={{
                                        background: `linear-gradient(to right, #d4d4d8 0%, #d4d4d8 ${(durationLimit - 3) / (Math.max(chartData.length, 12) - 3) * 100}%, #18181b ${(durationLimit - 3) / (Math.max(chartData.length, 12) - 3) * 100}%, #18181b 100%)`
                                    }}
                                />
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-zinc-500 mt-3 tracking-widest pt-1">
                                    <span>3</span>
                                    <span>Max</span>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-[260px] min-h-[260px] -ml-4 mt-8 z-10 flex-1">
                {visibleData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visibleData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                            dy={10}
                            interval="preserveStartEnd"
                            padding={{ left: 20, right: 20 }}
                        />
                        <YAxis
                            hide={true}
                            domain={['dataMin - 2', 'dataMax + 2']}
                        />
                        <Tooltip
                            cursor={{ stroke: '#52525b', strokeWidth: 1, strokeDasharray: '4 4' }}
                            content={(props: any) => {
                                if (!props.active || !props.payload || !props.payload.length) return null;
                                return (
                                    <div className="bg-white p-4 rounded-[20px] shadow-2xl font-bold text-zinc-900 text-sm min-w-[170px] border border-zinc-100/50">
                                        <div className="text-zinc-500 mb-3 border-b border-zinc-100 pb-2 text-[10px] uppercase tracking-widest">{props.label}</div>
                                        <div className="flex flex-col gap-3.5">
                                            {props.payload.map((p: any, idx: number) => {
                                                const yr = p.dataKey.split('_')[1];
                                                const fullName = p.payload[`fullName_${yr}`];
                                                return (
                                                    <div key={idx} className="flex flex-col animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${idx * 50}ms` }}>
                                                        <div className="flex items-center justify-between gap-6">
                                                            <div className="flex items-center gap-2.5">
                                                                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: p.color }}></span>
                                                                <span className="text-zinc-600 font-bold text-xs uppercase tracking-wider">FY {yr}</span>
                                                            </div>
                                                            <span className="text-[17px] font-black text-zinc-900">{p.value}%</span>
                                                        </div>
                                                        {fullName && fullName !== 'Unknown' && (
                                                            <span className="text-[10px] text-zinc-400 font-semibold pl-[22px] block mt-0.5 leading-tight truncate max-w-[150px]" title={fullName}>
                                                                {fullName}
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        
                        <Legend 
                            verticalAlign="top" 
                            align="right"
                            height={36} 
                            content={(props: any) => {
                                const { payload } = props;
                                if (!payload || payload.length <= 1) return null;
                                return (
                                    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 mt-[-30px] pr-2">
                                        {payload.map((entry: any, index: number) => (
                                            <div key={`item-${index}`} className="flex items-center gap-1.5 bg-zinc-800/40 px-2 py-1 rounded-md backdrop-blur-sm">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                                <span className="text-[10px] font-bold text-zinc-300 tracking-wider">FY {entry.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }}
                        />

                        {selectedYears.map((yr, idx) => {
                            const color = colors[idx % colors.length];
                            return (
                                <Line
                                    key={yr}
                                    type="monotone"
                                    name={yr}
                                    dataKey={`margin_${yr}`}
                                    stroke={color}
                                    strokeWidth={3.5}
                                    dot={{ stroke: '#18181b', strokeWidth: 2, r: 4, fill: color }}
                                    activeDot={{ r: 7, stroke: '#ffffff', strokeWidth: 3, fill: color }}
                                    animationDuration={1200}
                                    connectNulls={true}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-4 mt-[-40px]">
                        <BarChart2 size={36} className="opacity-20" />
                        <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Data Available</span>
                    </div>
                )}
            </div>

        </div>
    );
};

