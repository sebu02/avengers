"use client";
import { useEffect, useState } from "react";
import {
    Shield, Globe, AlertOctagon, Users, Zap, Clock,
    ArrowRight, MessageSquare, Newspaper, Activity, Heart,
    X, Radio, Crosshair, TrendingUp, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// Mock Data for the Avengers Theme
const NEWS_FEED = [
    { id: 1, title: "CHITAURI REMAINS FOUND IN SOKOVIA", time: "2m ago", category: "INTEL", detail: "Scavengers found intact power cells. SHIELD Hazmat dispatched to secure the site." },
    { id: 2, title: "WAKANDA OPENS NEW OUTREACH CENTER", time: "15m ago", category: "GLOBAL", detail: "King T'Challa announces new vibranium-based medical tech for public use." },
    { id: 3, title: "UNUSUAL ENERGY SIGNATURE IN NEW MEXICO", time: "1h ago", category: "ALERT", detail: "Bifrost-like readings detected. Monitoring for Asgardian activity." },
];

const INVASIONS = [
    { id: 1, location: "LONDON", status: "CONTAINED", threat: "LOW", icon: "🇬🇧", intel: "Minor skirmish with rogue Kree scouts. Situation stabilized by locally stationed agents." },
    { id: 2, location: "NEW YORK", status: "ACTIVE", threat: "CRITICAL", icon: "🇺🇸", intel: "Portal opening detected above Stark Tower. All flight capable Avengers requested immediately." },
    { id: 3, location: "HONG KONG", status: "MONITORING", threat: "MEDIUM", icon: "🇭🇰", intel: "Shadowy figures seen near the Sanctum. Magic signatures fluctuating." },
];

const DISTRESS_CALLS = [
    { id: 1, caller: "Zone A-4", message: "Building collapse after tremor", severity: "HIGH", coordinates: "40.7128° N, 74.0060° W" },
    { id: 2, caller: "Sector 7", message: "Strange lights in the outskirts", severity: "LOW", coordinates: "34.0522° N, 118.2437° W" },
];

const HERO_STATUS = [
    { name: "IRON MAN", status: "REFUELING", energy: 45, icon: <Zap className="text-yellow-400" />, bio: "Tony Stark currently optimizing Mark 85 armor at the compound." },
    { name: "THOR", status: "ASGARD", energy: 100, icon: <Zap className="text-blue-400" />, bio: "Handling Realm duties. Available for cosmic-level threats only." },
    { name: "CAPTAIN AMERICA", status: "ON MISSION", energy: 85, icon: <Shield className="text-red-400" />, bio: "Steve Rogers leading a tactical strike in Eastern Europe." },
    { name: "HULK", status: "ENRAGED", energy: 100, icon: <Activity className="text-green-500" />, bio: "Bruce Banner under high stress. Containment field active." },
];

export default function AvengersDashboard() {
    const [selectedItem, setSelectedItem] = useState<{ type: string, data: any } | null>(null);

    return (
        <div className="space-y-6 pb-20">
            {/* TOP HEADER - COMMAND CENTER */}
            <header className="relative p-8 rounded-2xl bg-slate-900/50 border border-cyan-500/20 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <Shield className="w-32 h-32 text-cyan-500" />
                </div>
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_cyan]" />
                        <span className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">Strategic Homeland Intervention Enforcement and Logistics Division</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 italic uppercase">AVENGERS <span className="text-cyan-500 not-italic">COMMAND</span></h1>
                    <p className="text-slate-400 font-mono text-xs uppercase tracking-widest max-w-2xl leading-relaxed">
                        Global threat monitoring system fully operational. All Avengers on standby. Data encryption level 9 active.
                    </p>
                </div>

                <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                    {["CORE: ONLINE", "NETWORK: STABLE", "UPLINK: ACTIVE", "SATELLITE: LOCKED"].map((s, i) => (
                        <motion.div
                            key={s}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-[8px] font-bold text-cyan-400 rounded-sm whitespace-nowrap"
                        >
                            {s}
                        </motion.div>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN: GLOBAL MONITOR */}
                <div className="lg:col-span-8 space-y-6">

                    {/* ALIEN INVASION MONITOR */}
                    <section className="bg-slate-900/40 border border-red-500/20 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl">
                        <div className="bg-red-950/20 p-4 border-b border-red-500/20 flex justify-between items-center relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-red-500/5"
                                animate={{ opacity: [0, 0.2, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <h2 className="text-xs font-black tracking-widest text-red-500 flex items-center gap-2 relative z-10">
                                <AlertOctagon size={14} className="animate-pulse" /> ALIEN INVASION MONITOR
                            </h2>
                            <span className="text-[8px] font-mono text-red-500/60 uppercase relative z-10">Real-time Satellite Feed</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {INVASIONS.map((inv, i) => (
                                <motion.div
                                    key={inv.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedItem({ type: 'PORTAL ACTIVITY', data: inv })}
                                    className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-red-500/40 transition-all group cursor-pointer hover:bg-black/60 active:scale-95"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-2xl group-hover:scale-125 transition-transform">{inv.icon}</span>
                                        <span className={clsx(
                                            "text-[8px] font-bold px-2 py-0.5 rounded",
                                            inv.threat === 'CRITICAL' ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-white/60"
                                        )}>
                                            {inv.threat}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">{inv.location}</h3>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{inv.status}</p>
                                        <div className="h-1 w-1 rounded-full bg-cyan-500 animate-pulse" />
                                        <span className="text-[7px] font-black text-white/20 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">AVENGER DEPLOYED</span>
                                    </div>
                                    <div className="mt-4 h-1.5 w-full bg-white/5 overflow-hidden rounded-full">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: inv.status === 'ACTIVE' ? "100%" : "30%" }}
                                            className={clsx("h-full", inv.status === 'ACTIVE' ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-cyan-500")}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* GLOBAL NEWS FEED */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden shadow-xl">
                            <h2 className="text-xs font-black tracking-widest text-cyan-500 flex items-center gap-2 mb-6 uppercase">
                                <Newspaper size={14} /> Avenger Intel News
                            </h2>
                            <div className="space-y-4">
                                {NEWS_FEED.map((news, i) => (
                                    <motion.div
                                        key={news.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        onClick={() => setSelectedItem({ type: 'INTEL BRIEF', data: news })}
                                        className="border-l-2 border-cyan-500/30 pl-4 py-2 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[8px] font-bold text-cyan-400 bg-cyan-400/10 px-1 uppercase">{news.category}</span>
                                            <span className="text-[8px] text-slate-500 font-mono italic">{news.time}</span>
                                        </div>
                                        <p className="text-xs font-black text-white leading-snug uppercase tracking-wide group-hover:translate-x-1 transition-transform">{news.title}</p>
                                    </motion.div>
                                ))}
                            </div>
                            <button
                                onClick={() => setSelectedItem({ type: 'ARCHIVE', data: { title: "MISSION ARCHIVES", detail: "Deep encryption prevents full access. Only recent logs available." } })}
                                className="mt-6 text-[10px] font-black text-cyan-500 hover:text-cyan-400 flex items-center gap-1 uppercase tracking-widest group bg-transparent border-none outline-none"
                            >
                                View Full Archive <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </section>

                        <section className="bg-slate-900/40 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                            <h2 className="text-xs font-black tracking-widest text-purple-500 flex items-center gap-2 mb-6 uppercase">
                                <Heart size={14} /> Civilian Distress
                            </h2>
                            <div className="space-y-4">
                                {DISTRESS_CALLS.map((call, i) => (
                                    <motion.div
                                        key={call.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        onClick={() => setSelectedItem({ type: 'RESCUE LOG', data: call })}
                                        className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg group hover:bg-purple-500/20 transition-all cursor-pointer"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-purple-400 tracking-tighter uppercase">{call.caller}</span>
                                            <div className={clsx("w-2 h-2 rounded-full shadow-[0_0_8px]", call.severity === 'HIGH' ? "bg-red-500 shadow-red-500" : "bg-yellow-500 shadow-yellow-500")} />
                                        </div>
                                        <p className="text-xs text-slate-300 italic font-medium leading-relaxed group-hover:text-white transition-colors">"{call.message}"</p>
                                    </motion.div>
                                ))}
                            </div>
                            <button
                                onClick={() => setSelectedItem({ type: 'RESCUE CHANNELS', data: { title: "CHANNEL OVERRIDE", detail: "Connecting to global emergency frequencies... All feeds active." } })}
                                className="mt-6 w-full py-3 bg-purple-500/10 border border-purple-500/30 text-[10px] font-black text-purple-400 rounded-lg uppercase tracking-widest hover:bg-purple-500/20 transition-all active:scale-[0.98]"
                            >
                                Open Rescue Channels
                            </button>
                        </section>
                    </div>
                </div>

                {/* RIGHT COLUMN: HERO READINESS */}
                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm sticky top-6 shadow-2xl">
                        <h2 className="text-xs font-black tracking-widest text-cyan-500 flex items-center gap-2 mb-8 uppercase">
                            <Users size={14} /> Avenger Readiness
                        </h2>
                        <div className="space-y-6">
                            {HERO_STATUS.map((hero, i) => (
                                <motion.div
                                    key={hero.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedItem({ type: 'HERO DATA', data: hero })}
                                    className="space-y-3 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                                                {hero.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-black text-white uppercase tracking-wider">{hero.name}</h3>
                                                <p className="text-[8px] text-slate-500 font-mono tracking-widest uppercase mt-0.5">{hero.status}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded italic">{hero.energy}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${hero.energy}%` }}
                                            className={clsx(
                                                "h-full rounded-full transition-all duration-1000",
                                                hero.energy > 80 ? "bg-cyan-500 shadow-[0_0_10px_cyan]" :
                                                    hero.energy > 30 ? "bg-yellow-500 shadow-[0_0_10px_yellow]" : "bg-red-500 shadow-[0_0_10px_red]"
                                            )}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 p-5 border border-cyan-500/20 bg-black/40 rounded-2xl group/map transform transition-all hover:scale-[1.02]">
                            <div className="flex items-center gap-2 mb-4">
                                <Radio size={14} className="text-cyan-500 animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Heatmap</span>
                            </div>
                            <div className="aspect-square bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden border border-white/10">
                                <Globe className="text-white/5 w-3/4 h-3/4 animate-spin-slow" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
                                {[[40, 30, 'red'], [35, 60, 'yellow'], [65, 50, 'cyan']].map(([t, l, c], idx) => (
                                    <div
                                        key={idx}
                                        style={{ top: `${t}%`, left: `${l}%` }}
                                        className={clsx("absolute w-3 h-3 rounded-full animate-ping shadow-[0_0_10px]",
                                            c === 'red' ? "bg-red-500 shadow-red-500" :
                                                c === 'yellow' ? "bg-yellow-500 shadow-yellow-500" : "bg-cyan-500 shadow-cyan-500"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* INTERACTIVE DIALOG OVERLAY */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setSelectedItem(null)}
                        />
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-2xl bg-slate-950 border-2 border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.3)]"
                            >
                                {/* Header Tech Details */}
                                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

                                <div className="p-10 space-y-8 relative">
                                    <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full ring-1 ring-white/10">
                                        <X size={20} />
                                    </button>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-6 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">{selectedItem.type} SUMMARY</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter" >
                                            {selectedItem.data.title || selectedItem.data.location || selectedItem.data.name || "INTEL FEED"}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                                    <Info size={40} className="text-cyan-500" />
                                                </div>
                                                <p className="text-slate-300 font-medium text-sm leading-relaxed relative z-10 italic">
                                                    "{selectedItem.data.detail || selectedItem.data.intel || selectedItem.data.bio || selectedItem.data.message || "No further tactical data provided at this interval."}"
                                                </p>
                                            </div>

                                            {(selectedItem.data.status || selectedItem.data.energy) && (
                                                <div className="flex items-center gap-4">
                                                    {selectedItem.data.status && (
                                                        <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                                            <span className="text-[8px] font-black text-cyan-500 uppercase block mb-0.5">Current Status</span>
                                                            <span className="text-xs font-black text-white uppercase">{selectedItem.data.status}</span>
                                                        </div>
                                                    )}
                                                    {selectedItem.data.energy && (
                                                        <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                                            <span className="text-[8px] font-black text-yellow-500 uppercase block mb-0.5">Energy Reserve</span>
                                                            <span className="text-xs font-black text-white uppercase">{selectedItem.data.energy}%</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="aspect-video bg-black/60 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
                                                <Crosshair className="text-cyan-500/20 absolute z-0 animate-spin-slow" size={100} />
                                                <span className="text-[10px] font-black text-cyan-500/40 uppercase absolute bottom-4 tracking-widest z-20">ENCRYPTED SENSORS ACTIVE</span>
                                                {selectedItem.data.coordinates && (
                                                    <div className="text-[10px] font-mono text-cyan-400 z-20 bg-black/40 px-3 py-1 border border-cyan-400/20 rounded-full">
                                                        COORD: {selectedItem.data.coordinates}
                                                    </div>
                                                )}
                                            </div>

                                            <button className="w-full py-4 bg-cyan-500 text-black font-black text-xs tracking-widest uppercase hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] group active:scale-95">
                                                <Activity size={16} className="group-hover:rotate-12 transition-transform" /> ANALYZE TACTICAL DATA
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Stat Bar */}
                                <div className="bg-cyan-950/20 p-4 border-t border-cyan-500/20 flex justify-between items-center">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">JARVIS CONNECTED</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={10} className="text-cyan-500" />
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">LIVE BITRATE: 1.4 TBPS</span>
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-mono text-slate-600 uppercase" >ACCESS LEVEL: RED-DELTA</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
