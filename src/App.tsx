import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Terminal,
    Cpu,
    Zap,
    Shield,
    LayoutGrid,
    Info,
    ChevronRight,
    Search
} from 'lucide-react';
import Grid from './components/Grid';
import { type SystemStats, type GridEvent, type LogicRule } from './types';
import { cn } from './utils';

// Enhanced SidePanel with Framer Motion
const SidePanel: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    side: 'left' | 'right'
}> = ({ title, icon, children, side }) => (
    <motion.div
        initial={{ x: side === 'left' ? -100 : 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="hidden xl:flex flex-col h-[520px] w-[340px] bg-white/[0.03] backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl p-6 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 p-6 opacity-20">
            <Cpu className="w-20 h-20 text-indigo-500" />
        </div>

        <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                {icon}
            </div>
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">
                {title}
            </h3>
        </div>

        <div className="flex-1 overflow-hidden">
            {children}
        </div>
    </motion.div>
);

const MetricCard: React.FC<{
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string
}> = ({ label, value, icon, color }) => (
    <div className="p-4 bg-white/5 rounded-[24px] border border-white/10 group hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
            <div className={color}>{icon}</div>
            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{label}</span>
        </div>
        <AnimatePresence mode="wait">
            <motion.div
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-black text-white"
            >
                {value.toLocaleString()}
            </motion.div>
        </AnimatePresence>
    </div>
);

const App: React.FC = () => {
    const [events, setEvents] = useState<GridEvent[]>([]);
    const [stats, setStats] = useState<SystemStats>({ clicks: 0, ripples: 0, surges: 0 });

    const rules: LogicRule[] = useMemo(() => [
        {
            id: 'A',
            name: 'Ripple Protocol',
            description: 'Decrements node value by 1',
            trigger: 'Divisible by 3',
            constraint: 'Ignore last column',
            color: 'text-indigo-400',
            glow: 'bg-indigo-400'
        },
        {
            id: 'B',
            name: 'Surge Protocol',
            description: 'Increments node value by 2',
            trigger: 'Divisible by 5',
            constraint: 'Ignore bottom row',
            color: 'text-emerald-400',
            glow: 'bg-emerald-400'
        },
        {
            id: '!',
            name: 'Safety Lock',
            description: 'Emergency Shutdown',
            trigger: 'Value >= 15',
            constraint: 'Immutable Reactor',
            color: 'text-rose-400',
            glow: 'bg-rose-400'
        }
    ], []);

    const addEvent = useCallback((msg: string, type: GridEvent['type']) => {
        const id = Math.random().toString(36).substring(7);
        const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });

        setEvents(prev => [{ id, timestamp, message: msg, type }, ...prev].slice(0, 50));

        if (type === 'trigger') setStats(s => ({ ...s, clicks: s.clicks + 1 }));
        if (type === 'ripple') setStats(s => ({ ...s, ripples: s.ripples + 1 }));
        if (type === 'surge') setStats(s => ({ ...s, surges: s.surges + 1 }));
        if (type === 'reboot') setStats({ clicks: 0, ripples: 0, surges: 0 });
    }, []);

    return (
        <div className="h-screen w-full bg-[#030308] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative font-['Outfit']">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="z-10 w-full max-w-[1600px] flex items-center justify-between gap-20">

                {/* Left: Terminal Log */}
                <SidePanel title="Diagnostic Stream" icon={<Terminal size={14} />} side="left">
                    <div className="space-y-3 h-full pr-2 overflow-y-auto custom-scrollbar">
                        <AnimatePresence initial={false}>
                            {events.map((e) => (
                                <motion.div
                                    key={e.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-3 bg-white/[0.02] border-l-2 border-white/5 rounded-r-lg group hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-mono text-white/30">{e.timestamp}</span>
                                        <span className={cn(
                                            "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded",
                                            e.type === 'trigger' ? "bg-indigo-500/20 text-indigo-400" :
                                                e.type === 'ripple' ? "bg-sky-500/20 text-sky-400" :
                                                    e.type === 'surge' ? "bg-emerald-500/20 text-emerald-400" :
                                                        e.type === 'lock' ? "bg-rose-500/20 text-rose-400" :
                                                            "bg-white/10 text-white/60"
                                        )}>
                                            {e.type}
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-mono text-white/80 leading-relaxed">{e.message}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </SidePanel>

                {/* Center: Logic Engine */}
                <main className="flex-1 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-12 text-center"
                    >
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                            <Activity size={12} className="text-indigo-400 animate-pulse" />
                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">System Online [v1.2.0]</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[1000] italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-none uppercase drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            Ripple<span className="text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.4)]">Grid</span>
                        </h1>
                        <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.6em] mt-2">Distributed Logic Network</p>
                    </motion.div>

                    <Grid onEvent={addEvent} />

                    <div className="mt-16 grid grid-cols-3 gap-6 w-full max-w-[1000px] pointer-events-none opacity-20">
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="text-[8px] font-mono text-center uppercase tracking-[0.4em]">Core Interface Node 0x7FF10C</div>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                </main>

                {/* Right: Operations & Logic */}
                <SidePanel title="Logic Command" icon={<LayoutGrid size={14} />} side="right">
                    <div className="space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard
                                label="Total Ops"
                                value={stats.clicks}
                                icon={<Activity size={12} />}
                                color="text-indigo-400"
                            />
                            <MetricCard
                                label="Flux Score"
                                value={stats.ripples + stats.surges}
                                icon={<Zap size={12} />}
                                color="text-emerald-400"
                            />
                        </div>

                        {/* Rules List */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-2 mb-1">
                                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Protocols</span>
                                <Info size={10} className="text-white/20" />
                            </div>

                            {rules.map((rule) => (
                                <div key={rule.id} className="p-2.5 bg-white/[0.02] rounded-[18px] border border-white/10 group hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-1 h-3 rounded-full", rule.glow)} />
                                            <span className="text-xs font-black text-white">{rule.name}</span>
                                        </div>
                                        <span className="text-[9px] font-mono text-white/20">RULE_{rule.id}</span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-white/30 font-bold uppercase tracking-wider">Trigger</span>
                                            <span className={cn("text-[9px] font-black uppercase", rule.color)}>{rule.trigger}</span>
                                        </div>
                                        <div className="p-2 bg-black/40 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <ChevronRight size={10} className="text-white/20" />
                                                <span className="text-[8px] text-white/60 font-medium">{rule.description}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield size={8} className="text-white/20" />
                                                <span className="text-[7px] text-white/20 italic font-medium">{rule.constraint}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SidePanel>

            </div>
        </div>
    );
};

export default App;
