import React, { useState } from 'react';
import Grid from './components/Grid';

const SidePanel = ({ title, children, side }) => (
    <div className={`hidden xl:flex flex-col h-[480px] w-[340px] bg-white/[0.05] backdrop-blur-3xl rounded-[32px] border border-white/10 shadow-[20px_20px_60px_rgba(0,0,0,0.6)] p-6 overflow-hidden relative ${side === 'left' ? 'animate-in slide-in-from-left' : 'animate-in slide-in-from-right'} duration-1000`}>
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 right-0 p-4 opacity-30">
            <div className="w-6 h-6 border-t-2 border-r-2 border-indigo-400" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 opacity-10">
            <div className="w-5 h-5 border-b border-l border-white/30" />
        </div>

        <h3 className="text-indigo-200 text-[11px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_20px_#6366f1] animate-pulse" />
            {title}
        </h3>
        <div className="flex-1 overflow-hidden space-y-3 pr-1">
            {children}
        </div>
    </div>
);

const Logo = () => (
    <div className="relative group cursor-pointer scale-[0.5] lg:scale-[0.6] xl:scale-[0.7] mb-0 lg:mb-1">
        {/* Enhanced Multi-Layered Glow */}
        <div className="absolute inset-[-60%] bg-indigo-600/20 blur-[90px] rounded-full group-hover:bg-indigo-500/40 transition-all duration-700 animate-pulse" />
        <div className="absolute inset-[-30%] bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-pink-500/30 transition-all duration-1000" />

        <svg width="120" height="120" viewBox="0 0 100 100" className="relative z-10 transition-all duration-1000 group-hover:scale-110">
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} />
                </linearGradient>
                <filter id="ultraGlow">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Orbitals */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 12" className="animate-[spin_25s_linear_infinite]" opacity="0.4" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="url(#logoGrad)" strokeWidth="1.5" strokeDasharray="15 30" className="animate-[spin_12s_linear_infinite_reverse]" opacity="0.8" />

            {/* Shield Geometry */}
            <path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.1"
                className="animate-pulse"
            />

            {/* The Core Logic Node */}
            <g filter="url(#ultraGlow)">
                <rect
                    x="35" y="35" width="30" height="30" rx="6"
                    fill="url(#logoGrad)"
                    className="animate-pulse"
                />
                <circle cx="50" cy="50" r="4" fill="white" className="animate-ping" />
            </g>

            {/* Data Streams */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
                <rect
                    key={rot}
                    x="49" y="8" width="2" height="6" rx="1"
                    fill="white"
                    transform={`rotate(${rot} 50 50)`}
                    className="animate-pulse"
                    opacity="0.3"
                />
            ))}
        </svg>
    </div>
);

function App() {
    const [events, setEvents] = useState(['INIT_CORE_SUCCESS', 'SYS_STANDBY']);
    const [stats, setStats] = useState({ clicks: 0, ripples: 0 });

    const addEvent = (msg) => {
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        setEvents(prev => [`[${time}] ${msg}`, ...prev].slice(0, 30));

        if (msg.includes('TRIGGERED')) setStats(s => ({ ...s, clicks: s.clicks + 1 }));
        if (msg.includes('RIPPLE') || msg.includes('SURGE')) setStats(s => ({ ...s, ripples: s.ripples + 1 }));
        if (msg.includes('REBOOT')) setStats({ clicks: 0, ripples: 0 });
    };

    return (
        <div className="h-screen w-full bg-[#050614] text-white flex flex-col items-center justify-center p-3 lg:p-4 selection:bg-indigo-600 overflow-hidden relative font-['Outfit']">

            {/* Ultra-Vibrant Background Design */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[#050614]" />
                <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

                {/* HUD Grid */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="z-10 w-full max-w-[1400px] flex flex-row items-center justify-between gap-4 lg:gap-14 px-4">

                {/* Left: Diagnostics */}
                <SidePanel title="Diagnostic Logs" side="left">
                    <div className="space-y-3 pt-1">
                        {events.map((e, i) => (
                            <div key={i} className={`font-mono text-[11px] border-l-2 pl-4 py-1 transition-all ${i === 0 ? 'border-indigo-400 text-indigo-100 bg-white/5 shadow-[0_0_15px_rgba(129,140,248,0.2)]' : 'border-white/5 text-white/20'}`}>
                                {e}
                            </div>
                        ))}
                    </div>
                </SidePanel>

                {/* Center: Logic Engine */}
                <main className="flex-1 flex flex-col items-center justify-center">
                    <Logo />

                    <div className="text-center mb-6">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-[1000] italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-none uppercase drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                            Ripple<span className="text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.4)]">Grid</span>
                        </h1>
                        <div className="inline-flex items-center gap-3 mt-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl">
                            <span className="flex items-center gap-2 text-[8px] font-black tracking-[0.2em] text-indigo-400 uppercase">
                                <span className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
                                Operational
                            </span>
                            <div className="w-px h-2 bg-white/10" />
                            <span className="text-[8px] font-black tracking-[0.2em] text-white/40 uppercase">Cluster Unit 3.4</span>
                        </div>
                    </div>

                    <Grid onEvent={addEvent} />
                </main>

                {/* Right: Metrics (Compact) */}
                <SidePanel title="System Logic" side="right">
                    <div className="space-y-4">
                        {/* Core Stats Overview */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center shadow-inner group hover:bg-white/10 transition-all">
                                <span className="text-[9px] text-indigo-300 block mb-0.5 font-black uppercase tracking-widest leading-none">Ops Count</span>
                                <span className="text-xl font-black text-white">{stats.clicks}</span>
                            </div>
                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center shadow-inner group hover:bg-white/10 transition-all">
                                <span className="text-[9px] text-emerald-400 block mb-0.5 font-black uppercase tracking-widest leading-none">Flux Output</span>
                                <span className="text-xl font-black text-white">{stats.ripples}</span>
                            </div>
                        </div>

                        {/* Protocol Conditions */}
                        <div className="space-y-2.5">
                            {[
                                {
                                    id: 'A',
                                    name: 'Ripple Logic',
                                    desc: 'Dec (-1) Right Node',
                                    rule: 'Trigger: Divisible by 3',
                                    constraint: 'Last column: Ignored',
                                    color: 'bg-indigo-500',
                                    glow: 'shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                                },
                                {
                                    id: 'B',
                                    name: 'Surge Logic',
                                    desc: 'Inc (+2) Below Node',
                                    rule: 'Trigger: Divisible by 5',
                                    constraint: 'Bottom row: Ignored',
                                    color: 'bg-emerald-500',
                                    glow: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                                },
                                {
                                    id: '!',
                                    name: 'Locked State',
                                    desc: 'Static - No Changes',
                                    rule: 'Trigger: Value 15+',
                                    constraint: 'Immutable Reactor',
                                    color: 'bg-rose-500',
                                    glow: 'shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                                }
                            ].map((p, i) => (
                                <div key={i} className="group relative overflow-hidden px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={`w-1 h-10 rounded-full ${p.color} ${p.glow} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <span className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Rule {p.id}: {p.name}</span>
                                                <span className={`text-[7px] font-bold px-1 py-0.5 rounded ${p.color} text-white opacity-40 group-hover:opacity-100`}>{p.id}</span>
                                            </div>
                                            <span className="text-[9px] text-white/40 block leading-tight font-medium group-hover:text-white/60 transition-colors uppercase">{p.desc}</span>

                                            <div className="mt-2 py-1.5 px-2 bg-black/40 rounded-lg border border-white/5">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[8px] font-black text-indigo-300/80 leading-none">{p.rule}</span>
                                                    <span className="text-[7px] font-medium text-white/20 italic">{p.constraint}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                </div>
                            ))}
                        </div>
                    </div>
                </SidePanel>

            </div>

            {/* Subtle HUD Footer */}
            <footer className="absolute bottom-4 left-10 right-10 flex items-center justify-between pointer-events-none opacity-20">
                <div className="h-[2px] w-24 bg-gradient-to-r from-indigo-500 to-transparent" />
                <div className="text-[7px] font-mono tracking-[0.4em] uppercase">Distributed Logic Network Node [v1.0.0]</div>
                <div className="h-[2px] w-24 bg-gradient-to-l from-indigo-500 to-transparent" />
            </footer>
        </div>
    );
}

export default App;
