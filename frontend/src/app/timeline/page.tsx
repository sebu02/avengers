"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    Clock, Zap, AlertTriangle, Eye, Infinity as InfinityIcon, Sparkles,
    GitBranch, Radio, Shield, Target, ChevronDown, ArrowLeft,
    Layers, Cpu, Activity, Share2, Locate, Terminal, Power
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// --- Data & Types ---

const TIME_HEIST_LOCATIONS = [
    {
        id: "ny-2012",
        name: "New York City",
        year: 2012,
        objective: "Space, Mind & Time Stones",
        status: "SUCCESS",
        color: "blue",
        coordinates: "40.7128° N, 74.0060° W"
    },
    {
        id: "nj-1970",
        name: "Camp Lehigh",
        year: 1970,
        objective: "Space Stone & Pym Particles",
        status: "SUCCESS",
        color: "emerald",
        coordinates: "40.5056° N, 74.4022° W"
    },
    {
        id: "asgard-2013",
        name: "Asgard",
        year: 2013,
        objective: "Reality Stone (Aether)",
        status: "SUCCESS",
        color: "yellow",
        coordinates: "90.0000° N, 0.0000° E"
    },
    {
        id: "morag-2014",
        name: "Morag",
        year: 2014,
        objective: "Power Stone",
        status: "SUCCESS",
        color: "purple",
        coordinates: "0.2312° S, 12.4211° E"
    },
    {
        id: "vormir-2014",
        name: "Vormir",
        year: 2014,
        objective: "Soul Stone",
        status: "COSTLY",
        color: "orange",
        coordinates: "CLASSIFIED"
    }
];

const NEXUS_EVENTS = [
    {
        id: "loki-branch",
        title: "Loki Variant Escape",
        year: "2012",
        severity: "CRITICAL",
        description: "Subject L-1130 escaped with Tesseract during Avengers Time Heist.",
        icon: Zap
    },
    {
        id: "steve-dance",
        title: "The Final Dance",
        year: "1949",
        severity: "STABLE",
        description: "Captain America returned to lived a full life. Closed loop confirmed.",
        icon: Shield
    },
    {
        id: "strange-spell",
        title: "Multiverse Fracture",
        year: "2024",
        severity: "OMEGA",
        description: "Peter Parker / Strange spell interaction caused cross-dimensional bleed.",
        icon: Eye
    },
    {
        id: "kang-emergence",
        title: "The Conqueror Rise",
        year: "REDACTED",
        severity: "UNKNOWN",
        description: "Multiple Kang variants detected across temporal streams.",
        icon: Share2
    }
];

// --- Sub-components ---

const GlowingCard = ({ children, color = "cyan", className = "", delay = 0 }: any) => {
    const colorClasses: Record<string, string> = {
        cyan: "from-cyan-500/20 to-blue-500/10 border-cyan-500/50 hover:border-cyan-400",
        red: "from-red-500/20 to-orange-500/10 border-red-500/50 hover:border-red-400",
        purple: "from-purple-500/20 to-pink-500/10 border-purple-500/50 hover:border-purple-400",
        emerald: "from-emerald-500/20 to-teal-500/10 border-emerald-500/50 hover:border-emerald-400",
        yellow: "from-yellow-500/20 to-amber-500/10 border-yellow-500/50 hover:border-yellow-400",
        orange: "from-orange-500/20 to-red-500/10 border-orange-500/50 hover:border-orange-400",
        blue: "from-blue-500/20 to-indigo-500/10 border-blue-500/50 hover:border-blue-400"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className={clsx(
                "relative p-6 rounded-2xl border-2 bg-gradient-to-br backdrop-blur-xl group transition-all duration-500",
                colorClasses[color],
                className
            )}
        >
            {/* Animated Glow */}
            <div className={clsx(
                "absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r",
                color === 'cyan' && 'from-cyan-500 to-blue-500',
                color === 'red' && 'from-red-500 to-orange-500',
                color === 'purple' && 'from-purple-500 to-pink-500',
                color === 'emerald' && 'from-emerald-500 to-teal-500',
                color === 'yellow' && 'from-yellow-500 to-amber-500',
                color === 'orange' && 'from-orange-500 to-red-500',
                color === 'blue' && 'from-blue-500 to-indigo-500'
            )} />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};

const TimelineGraph = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 1000 400" className="opacity-80">
                {/* Deflection Branches */}
                <motion.path
                    d="M 0 200 L 400 200 Q 500 200 600 100 L 900 100"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, delay: 1, repeat: 9999, repeatDelay: 5 }}
                />
                <motion.path
                    d="M 400 200 Q 500 200 600 300 L 900 300"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, delay: 1.5, repeat: 9999, repeatDelay: 5 }}
                />
                <motion.path
                    d="M 600 200 Q 650 200 700 150 L 900 150"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 2, repeat: 9999, repeatDelay: 5 }}
                />

                {/* Main Sacred Timeline */}
                <motion.path
                    d="M 0 200 L 1000 200"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="5"
                    strokeDasharray="10, 5"
                    animate={{ strokeDashoffset: -100 }}
                    transition={{ duration: 10, repeat: 9999, ease: "linear" }}
                />

                {/* Nodes */}
                <motion.circle cx="400" cy="200" r="8" fill="#22c55e" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: 9999, duration: 2 }} />
                <motion.circle cx="550" cy="150" r="6" fill="#a855f7" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: 9999, duration: 2, delay: 0.5 }} />
                <motion.circle cx="700" cy="250" r="6" fill="#ef4444" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: 9999, duration: 2, delay: 1 }} />
            </svg>

            {/* Holographic labels */}
            <div className="absolute top-[25%] right-[20%] text-[10px] text-purple-400 font-bold tracking-widest bg-purple-950/30 px-2 py-1 rounded border border-purple-500/30 backdrop-blur-sm">
                VARIANT_STREAM_78-A
            </div>
            <div className="absolute bottom-[25%] right-[15%] text-[10px] text-red-400 font-bold tracking-widest bg-red-950/30 px-2 py-1 rounded border border-red-500/30 backdrop-blur-sm">
                CRITICAL_NEXUS_B
            </div>
            <div className="absolute top-[50%] left-[5%] text-[10px] text-green-400 font-bold tracking-widest bg-green-950/30 px-2 py-1 rounded border border-green-500/30 backdrop-blur-sm">
                SACRED_TIMELINE_STABLE
            </div>
        </div>
    );
};

// --- Main Page ---

export default function TimelinePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [isJumping, setIsJumping] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<{ x: number, y: number, size: number, color: string }[]>([]);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Generate stable random particles once on mount
        const initialParticles = Array.from({ length: 40 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7'
        }));
        setParticles(initialParticles);

        return () => clearInterval(timer);
    }, []);

    const handleTimeJump = () => {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 3000);
    };

    if (!mounted) return <div className="min-h-screen bg-slate-950" />;

    return (
        <div ref={containerRef} className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
            {/* Background Layers */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8),rgba(15,23,42,0.8)),url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                {/* Floating Quantum Particles */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            boxShadow: `0 0 10px ${p.color}`
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: 9999,
                            delay: Math.random() * 5
                        }}
                    />
                ))}

                {/* Animated Grid */}
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '100px 100px']
                    }}
                    transition={{
                        duration: 10,
                        repeat: 9999,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Time Jump Overlay */}
            <AnimatePresence>
                {isJumping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 100], opacity: [1, 0] }}
                            transition={{ duration: 2, ease: "easeIn" }}
                            className="w-10 h-10 bg-cyan-400 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-6xl font-black text-slate-900 tracking-[1em]"
                            >
                                JUMPING
                            </motion.h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 p-8 max-w-[1600px] mx-auto">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
                                <Clock className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 uppercase">
                                    TEMPORAL CONTROL CENTER
                                </h1>
                                <p className="text-[8px] md:text-[10px] text-cyan-700 tracking-[0.4em] uppercase font-bold">
                                    Stark Industries // TVA Joint Division
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="w-full md:w-auto text-left md:text-right flex flex-col items-start md:items-end gap-2">
                        <div className="bg-black/40 border border-slate-800 rounded-xl px-4 py-2 backdrop-blur-md">
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Local Phase Time</div>
                            <div className="text-xl md:text-2xl font-black text-cyan-400 leading-none">
                                {currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-red-600/20 border border-red-500 text-red-500 text-[10px] font-black rounded uppercase"
                            >
                                Emergency Reset
                            </motion.button>
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-1 bg-blue-600/20 border border-blue-500 text-blue-500 text-[10px] font-black rounded uppercase"
                                >
                                    Exit UI
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Controls & Status */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Dimensional Status */}
                        <GlowingCard color="cyan">
                            <h3 className="text-xs font-black tracking-[0.2em] mb-4 flex items-center gap-2 text-cyan-400">
                                <Cpu size={14} /> DIMENSIONAL STATUS
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Stability Index</span>
                                    <span className="text-emerald-400 font-bold">94.2%</span>
                                </div>
                                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: "94.2%" }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Quantum Flux</span>
                                    <span className="text-yellow-400 font-bold">12.4 THz</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Universe Coords</span>
                                    <span className="text-cyan-400 font-bold">Earth-616</span>
                                </div>
                            </div>
                        </GlowingCard>

                        {/* Heist Protocol Controls */}
                        <div className="bg-black/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                            <h3 className="text-xs font-black tracking-[0.2em] mb-6 flex items-center gap-2 text-cyan-400">
                                <Locate size={14} /> HEIST PROTOCOLS
                            </h3>
                            <div className="space-y-4">
                                <motion.button
                                    onClick={handleTimeJump}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all"
                                >
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative flex items-center justify-center gap-3">
                                        <Power className="w-5 h-5 text-white" />
                                        <span className="text-sm font-black text-white uppercase tracking-widest">Initiate Time Jump</span>
                                    </div>
                                </motion.button>

                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-black text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all uppercase tracking-wider">
                                        Scan Timeline
                                    </button>
                                    <button className="py-2 bg-slate-900 border border-slate-800 rounded-lg text-[8px] font-black text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all uppercase tracking-wider">
                                        Pym Level Check
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Alerts */}
                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                            <h3 className="text-xs font-black tracking-[0.2em] mb-4 flex items-center gap-2 text-red-500">
                                <AlertTriangle size={14} /> RECENT LOGS
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { msg: "Nexus detection in Earth-1610", time: "2m ago" },
                                    { msg: "Variant Loki escaped custody", time: "15m ago" },
                                    { msg: "Quantum Tunnel calibrated", time: "1h ago" }
                                ].map((alert, i) => (
                                    <div key={i} className="flex justify-between items-start gap-4">
                                        <span className="text-[10px] text-slate-400 leading-tight">{alert.msg}</span>
                                        <span className="text-[8px] text-slate-600 whitespace-nowrap">{alert.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CENTER COLUMN: Multiverse Map */}
                    <div className="lg:col-span-6 flex flex-col gap-8">
                        {/* Main Visualization */}
                        <div className="bg-black/60 border border-slate-800 rounded-[2.5rem] p-4 md:p-8 backdrop-blur-md relative overflow-hidden min-h-[400px] md:h-[600px] flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 relative z-10">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-black text-cyan-400 tracking-tighter uppercase italic flex items-center gap-3">
                                        <GitBranch className="w-5 h-5 md:w-6 md:h-6" /> Multiverse Temporal Grid
                                    </h2>
                                    <p className="text-[10px] text-slate-500 tracking-[0.2em] uppercase font-bold">Real-time branch analysis active</p>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-400 uppercase">Live Feed</span>
                                </div>
                            </div>

                            <div className="flex-1 relative min-h-[300px]">
                                <TimelineGraph />

                                {/* Overlay Stats */}
                                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 grid grid-cols-2 gap-2 md:gap-4">
                                    <div className="bg-black/60 border border-white/10 p-2 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md">
                                        <div className="text-[7px] md:text-[8px] text-slate-500 uppercase font-black mb-1">Active Branches</div>
                                        <div className="text-base md:text-2xl font-black text-white tracking-widest leading-none">42,847</div>
                                    </div>
                                    <div className="bg-black/60 border border-white/10 p-2 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md">
                                        <div className="text-[7px] md:text-[8px] text-slate-500 uppercase font-black mb-1">Reality Index</div>
                                        <div className="text-base md:text-2xl font-black text-white tracking-widest leading-none">0.9984</div>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Scanlines */}
                            <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-[2.5rem] pointer-events-none" />
                            <motion.div
                                className="absolute inset-x-0 h-[100px] bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"
                                animate={{ y: [-100, 600] }}
                                transition={{ duration: 4, repeat: 9999, ease: "linear" }}
                            />
                        </div>

                        {/* Nexus Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {NEXUS_EVENTS.map((event, i) => (
                                <GlowingCard key={event.id} color={event.severity === 'OMEGA' ? 'red' : event.severity === 'CRITICAL' ? 'orange' : 'cyan'} delay={i * 0.1}>
                                    <div className="flex items-start gap-4">
                                        <div className={clsx(
                                            "p-3 rounded-xl border",
                                            event.severity === 'OMEGA' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
                                                event.severity === 'CRITICAL' ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' :
                                                    'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                        )}>
                                            <event.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[8px] font-black bg-white/10 px-1.5 py-0.5 rounded text-white/50">{event.year}</span>
                                                <h4 className="text-xs font-black text-white uppercase">{event.title}</h4>
                                            </div>
                                            <p className="text-[10px] text-slate-400 leading-relaxed font-sans">{event.description}</p>
                                        </div>
                                    </div>
                                </GlowingCard>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Heist Details */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-black/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-md h-full">
                            <h3 className="text-xs font-black tracking-[0.2em] mb-6 flex items-center gap-2 text-cyan-400">
                                <Target size={14} /> TIME HEIST LOG
                            </h3>
                            <div className="space-y-4">
                                {TIME_HEIST_LOCATIONS.map((loc, i) => (
                                    <motion.div
                                        key={loc.id}
                                        initial={{ x: 30, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative"
                                    >
                                        <div className="relative z-10 p-4 border border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 transition-all border-l-4 border-l-cyan-500">
                                            <div className="flex justify-between items-start mb-2">
                                                <h5 className="text-xs font-black text-white uppercase">{loc.name}</h5>
                                                <span className={clsx(
                                                    "text-[8px] font-black px-1.5 py-0.5 rounded",
                                                    loc.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                                                )}>{loc.status}</span>
                                            </div>
                                            <div className="text-[9px] text-slate-500 space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Year Index:</span>
                                                    <span className="text-slate-300 font-bold">{loc.year}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Objective:</span>
                                                    <span className="text-cyan-400 font-bold">{loc.objective}</span>
                                                </div>
                                            </div>
                                            {/* Coordinates footer */}
                                            <div className="mt-3 pt-3 border-t border-slate-800 overflow-hidden">
                                                <div className="text-[7px] text-slate-600 font-bold tracking-widest truncate">
                                                    {loc.coordinates}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Hover line */}
                                        <motion.div
                                            className="absolute -left-1 top-0 bottom-0 w-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="heist-line"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Final Mission Overview */}
                            <div className="mt-8 p-6 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-2xl relative overflow-hidden">
                                <Sparkles className="absolute -top-2 -right-2 text-cyan-500/50 w-12 h-12" />
                                <h4 className="text-xs font-black text-cyan-400 uppercase mb-2">Whatever It Takes</h4>
                                <p className="text-[10px] text-slate-400 italic">
                                    "Whatever it takes, Steve. We're going to get them back."
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer HUD */}
                <footer className="mt-12 flex justify-between items-center text-[10px] text-slate-600 font-bold tracking-widest border-t border-slate-900 pt-8">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-cyan-500" />
                            <span>ENCRYPTED_LINK_ESTABLISHED</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Layers size={12} className="text-purple-500" />
                            <span>TIMELINE_OVERLAY_V2.4</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>SYNC_COMPLETE</span>
                        </div>
                        <span>© 2026 STARK INDUSTRIES / TVA PARTNERSHIP</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}

