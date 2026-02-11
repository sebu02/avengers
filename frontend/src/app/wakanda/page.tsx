"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap, Shield, Globe, Map as MapIcon, ShoppingBag,
    Sword, Battery, Database, Activity, Cpu,
    Crosshair, ArrowRight, Layers, Box, Info, X,
    Wind, FlaskConical, HeartPulse, Radio
} from "lucide-react";
import clsx from "clsx";

// Types
interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    specs?: string[];
}

interface WakandaDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    accentColor?: string;
}

const WakandaDialog = ({ isOpen, onClose, title, icon, children, accentColor = "purple" }: WakandaDialogProps) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[2000] overflow-y-auto custom-scrollbar">
                <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 100 }}
                        className={clsx(
                            "relative z-10 w-full max-w-2xl bg-[#0a0a0c] border overflow-hidden rounded-[2rem] md:rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]",
                            accentColor === "purple" ? "border-purple-500/30" : "border-yellow-500/30"
                        )}
                    >
                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
                            <motion.div
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className={clsx(
                                    "absolute w-full h-[50%] blur-3xl",
                                    accentColor === "purple" ? "bg-purple-600/10" : "bg-yellow-600/10"
                                )}
                            />
                        </div>

                        <div className="p-6 md:p-10 space-y-8 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "p-4 rounded-2xl shadow-inner",
                                        accentColor === "purple" ? "bg-purple-950/50 text-purple-400 border border-purple-500/20" : "bg-yellow-950/50 text-yellow-400 border border-yellow-500/20"
                                    )}>
                                        {icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{title}</h2>
                                        <p className="text-[8px] md:text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">Authorized Access Only</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 hover:bg-white/5 rounded-full transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/10 active:scale-95"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="custom-scrollbar max-h-[70vh] overflow-y-auto pr-2">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        )}
    </AnimatePresence>
);

export default function WakandaPage() {
    const [activeSection, setActiveSection] = useState<'tech' | 'map' | 'trading' | 'suit' | 'king'>('tech');
    const [kineticEnergy, setKineticEnergy] = useState(0);
    const [isDeploying, setIsDeploying] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [ritualCombatStatus, setRitualCombatStatus] = useState(false);
    const [showMiningDialog, setShowMiningDialog] = useState(false);
    const [showMapOverlay, setShowMapOverlay] = useState(false);
    const [isStealthMode, setIsStealthMode] = useState(false);
    const [sonicStability, setSonicStability] = useState(98.4);

    useEffect(() => {
        if (!isDeploying) return;
        const interval = setInterval(() => {
            setKineticEnergy(prev => (prev < 100 ? prev + 2 : 0));
        }, 50);
        return () => clearInterval(interval);
    }, [isDeploying]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSonicStability(prev => {
                const change = (Math.random() - 0.5) * 0.2;
                return Math.max(95, Math.min(99.9, prev + change));
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const merchandise: Product[] = [
        { id: 1, name: "Kimoyo Beads", price: "450 V-Credits", description: "Advanced communication & medical scanning array.", image: "📿", specs: ["Neural Link v4.2", "Global Satellite Uplink", "Heartbeat Monitor"] },
        { id: 2, name: "Vibranium Spear", price: "2800 V-Credits", description: "Standard Dora Milaje issue. Collapsible.", image: "🛡️", specs: ["Kinetic Recharge", "Sonic Frequency Tuner", "Retractable Design"] },
        { id: 3, name: "Bashenga's Mantle", price: "5000 V-Credits", description: "High-grade kinetic energy woven fabric.", image: "🧥", specs: ["Energy Redirection", "Stealth Coating", "Custom Fit Tuning"] },
        { id: 4, name: "Remote Pilot Array", price: "1200 V-Credits", description: "Shuri-tech vehicle remote control interface.", image: "👓", specs: ["Hyper-HUD", "Low Latency Control", "Auto-Stabilize"] },
    ];

    return (
        <div className={clsx(
            "min-h-screen pb-20 space-y-8 md:space-y-12 animate-in fade-in duration-700 transition-colors duration-1000",
            isStealthMode ? "bg-[#020205] text-purple-100" : "bg-transparent"
        )}>
            {/* Background Vibranium Flow Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                        opacity: isStealthMode ? [0.1, 0.3, 0.1] : [0.05, 0.1, 0.05]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] scale-150"
                />
            </div>

            {/* Header Section with Parallax */}
            <div className="relative h-[450px] md:h-[600px] w-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.6)] z-10">
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className={clsx(
                        "absolute inset-0 bg-cover bg-center transition-all duration-[2000ms]",
                        isStealthMode ? "grayscale brightness-50 contrast-125" : "grayscale-0"
                    )}
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070')" }}
                />
                <div className={clsx(
                    "absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-[#0a0a10]/60 to-transparent transition-colors duration-1000",
                    isStealthMode ? "from-black via-purple-950/20" : ""
                )} />

                {/* Tribal Border SVG Overlay */}
                <div className="absolute inset-0 border-[20px] md:border-[40px] border-white/[0.03] pointer-events-none" style={{ maskImage: "url('https://www.transparenttextures.com/patterns/az-subtle.png')" }} />

                <div className="absolute bottom-10 left-8 md:bottom-20 md:left-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className={clsx("w-3 h-3 rounded-full animate-pulse shadow-lg", isStealthMode ? "bg-purple-400 shadow-purple-500" : "bg-purple-600 shadow-purple-900")} />
                        <span className="text-purple-400 font-black tracking-[0.5em] uppercase text-[10px] md:text-xs">
                            {isStealthMode ? "CLOAKED PROTOCOL ACTIVE" : "KINGDOM CONTROL CENTER"}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-[10rem] font-black text-white italic tracking-tighter uppercase leading-[0.8] select-none"
                    >
                        {isStealthMode ? "GHOST" : "WAKANDA"} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-600 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                            {isStealthMode ? "OPERATIVE" : "MAINFRAME"}
                        </span>
                    </motion.h1>
                </div>

                {/* Kimoyo Bead Stealth Toggle */}
                <div className="absolute top-10 right-10 flex flex-col items-end gap-6">
                    <div className="flex gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                onClick={() => i === 0 && setIsStealthMode(!isStealthMode)}
                                className={clsx(
                                    "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl backdrop-blur-3xl",
                                    i === 0 && isStealthMode ? "bg-purple-600 border-purple-400 text-white" : "bg-black/60 border-white/10 text-slate-400 hover:text-white"
                                )}
                            >
                                {i === 0 ? <Shield size={24} className={isStealthMode ? "animate-pulse" : ""} /> : <Cpu size={18} />}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrolling News Ticker */}
            <div className="bg-black/40 border-y border-white/5 py-3 overflow-hidden backdrop-blur-md relative z-10">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex gap-20 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 italic"
                >
                    <span>Vibranium extraction targets reached in sector 4.</span>
                    <span className="text-purple-500">Global peace initiatives verified.</span>
                    <span>New transport hub opening in Golden City.</span>
                    <span className="text-yellow-500">Annual Challenge Ceremony scheduled for tomorrow.</span>
                    <span>Sonic dampeners holding steady at 100%.</span>
                </motion.div>
            </div>

            {/* Mobile-Friendly Tabs Navigation */}
            <div className="overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 relative z-10">
                <div className="flex gap-2 p-1.5 bg-[#0a0a0f]/80 backdrop-blur-3xl rounded-3xl border border-white/5 w-fit min-w-full md:min-w-0">
                    {[
                        { id: 'tech', label: 'Lab', icon: FlaskConical },
                        { id: 'suit', label: 'Suit', icon: Zap },
                        { id: 'map', label: 'Map', icon: Globe },
                        { id: 'king', label: 'Ritual', icon: Sword },
                        { id: 'trading', label: 'Bazaar', icon: ShoppingBag },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id as any)}
                            className={clsx(
                                "flex items-center flex-1 md:flex-none gap-3 px-6 md:px-10 py-4 md:py-5 rounded-2xl transition-all font-black text-[9px] md:text-xs uppercase tracking-[0.3em] whitespace-nowrap active:scale-95",
                                activeSection === tab.id
                                    ? "bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-[0_10px_30px_rgba(147,51,234,0.4)] border-t border-white/20"
                                    : "text-slate-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <tab.icon className={clsx("w-4 h-4", activeSection === tab.id ? "animate-pulse" : "")} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="grid grid-cols-1 gap-8 relative z-10">
                <AnimatePresence mode="wait">
                    {/* LAB & TECHSection */}
                    {activeSection === 'tech' && (
                        <motion.div
                            key="tech"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10"
                        >
                            <div className="lg:col-span-2 bg-[#0c0c14]/80 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-white/5 space-y-8 md:space-y-12 relative overflow-hidden group shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />

                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="space-y-3">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                                            <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Sonic Stabilizers Active</span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">Mount Bashenga</h2>
                                        <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Sector 07-B // Core Stability: {sonicStability.toFixed(1)}%</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setShowMiningDialog(true)}
                                            className="p-5 md:p-6 bg-purple-600 text-white rounded-[2rem] hover:scale-105 transition-all shadow-xl active:scale-95"
                                        >
                                            <Activity size={24} className="animate-pulse" />
                                        </button>
                                    </div>
                                </div>

                                {/* Live Sonic Frequency Waveform */}
                                <div className="h-40 bg-black/40 rounded-[2.5rem] border border-white/5 flex items-center justify-center gap-1.5 px-10 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse" />
                                    {Array.from({ length: 40 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                height: [
                                                    `${20 + Math.random() * 60}%`,
                                                    `${10 + Math.random() * 80}%`,
                                                    `${20 + Math.random() * 60}%`
                                                ],
                                                backgroundColor: i % 2 === 0 ? '#a855f7' : '#6366f1'
                                            }}
                                            transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                            className="w-1 md:w-2 rounded-full opacity-40"
                                        />
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                                    {['MT-1 ALPHA', 'MT-2 BETA', 'MT-3 GAMMA'].map((id, idx) => (
                                        <motion.div
                                            key={id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="p-8 bg-black/60 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-purple-500/50 transition-all group/node relative overflow-hidden"
                                        >
                                            <span className="text-[10px] font-black text-purple-500/60 tracking-[0.4em] uppercase">{id}</span>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-2xl font-black text-white italic">72<span className="text-xs text-purple-500 ml-1">%</span></span>
                                                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Active</span>
                                                </div>
                                                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                                                    <motion.div
                                                        animate={{ width: ['40%', '80%', '40%'] }}
                                                        transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                                                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-tr from-[#0f0f1a] to-indigo-950/20 p-8 md:p-14 rounded-[3rem] md:rounded-[4.5rem] border border-purple-500/30 flex flex-col items-center justify-center text-center space-y-8 shadow-2xl relative overflow-hidden"
                                >
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-10 -right-10 w-40 h-40 border border-purple-500/10 rounded-full" />
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30">
                                        <FlaskConical className="w-10 h-10 md:w-14 md:h-14 text-purple-400" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">Neural Lab</h3>
                                        <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
                                            Kimoyo bead synchronization diagnostic protocols.
                                        </p>
                                    </div>
                                    <button className="w-full py-5 bg-white/5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-purple-600 transition-all">
                                        Enter Core
                                    </button>
                                </motion.div>

                                <div className="bg-[#0c0c14]/40 p-10 rounded-[3rem] border border-white/5 space-y-6">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dora Milaje Update</h4>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center text-red-500">
                                            <Sword size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase">New recruit verified</p>
                                            <p className="text-[8px] text-slate-500 uppercase">Training starts in 04:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* SUIT INTERFACE Section */}
                    {activeSection === 'suit' && (
                        <motion.div
                            key="suit"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#08080c]/80 p-8 md:p-20 rounded-[3rem] md:rounded-[5rem] border border-white/5 flex flex-col items-center justify-center min-h-[600px] md:min-h-[750px] gap-12 md:gap-20 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_70%)]" />

                            <div className="relative z-10 text-center space-y-3">
                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Panther Habit</h2>
                                <p className="text-[10px] md:text-xs text-purple-400 font-bold uppercase tracking-[0.5em] animate-pulse">Ready for Initialization</p>
                            </div>

                            <div className="relative group p-10 md:p-20">
                                <motion.div
                                    animate={isDeploying ? {
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, -2, 0],
                                        filter: ["drop-shadow(0 0 20px rgba(168,85,247,0.3))", "drop-shadow(0 0 60px rgba(168,85,247,0.8))", "drop-shadow(0 0 20px rgba(168,85,247,0.3))"]
                                    } : {}}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-20"
                                >
                                    <Shield className={clsx(
                                        "w-40 h-40 md:w-80 md:h-80 transition-all duration-[1500ms]",
                                        isDeploying ? "text-purple-500" : "text-white/10"
                                    )} />
                                </motion.div>

                                <AnimatePresence>
                                    {isDeploying && Array.from({ length: 5 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.2, opacity: 0 }}
                                            animate={{ scale: [0.2, 3.5], opacity: [0, 0.4, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                                            className="absolute inset-0 m-auto w-full h-full border-[2px] border-purple-500/40 rounded-full z-10"
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col items-center gap-10 w-full max-w-2xl relative z-10">
                                <div className="w-full space-y-6">
                                    <div className="flex justify-between items-end px-2">
                                        <div className="space-y-1">
                                            <span className="text-[9px] md:text-xs font-black text-purple-400/60 uppercase tracking-widest block">Kinetic Charge Status</span>
                                            <span className="text-3xl md:text-5xl font-black text-white italic tracking-tighter">{kineticEnergy}<span className="text-xl">%</span></span>
                                        </div>
                                    </div>
                                    <div className="h-4 md:h-6 bg-black/80 rounded-full p-1 border border-white/10 overflow-hidden shadow-2xl flex items-center">
                                        <motion.div
                                            animate={{ width: `${kineticEnergy}%` }}
                                            className="h-full bg-gradient-to-r from-purple-900 via-purple-500 to-indigo-300 rounded-full relative overflow-hidden"
                                        >
                                            <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-white/20 skew-x-[-20deg]" />
                                        </motion.div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDeploying(!isDeploying)}
                                    className={clsx(
                                        "w-full md:w-auto px-16 py-6 md:py-8 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.5em] transition-all duration-700 active:scale-95",
                                        isDeploying ? "bg-purple-600 text-white shadow-xl" : "bg-white/5 text-white/50"
                                    )}
                                >
                                    {isDeploying ? "Disengage Habit" : "Initialize Deployment"}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* RITUAL COMBAT Section */}
                    {activeSection === 'king' && (
                        <motion.div
                            key="king"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-[#0c0c14]/80 p-8 md:p-20 rounded-[3.5rem] md:rounded-[6rem] border border-white/5 min-h-[600px] md:min-h-[850px] flex flex-col items-center justify-center gap-12 md:gap-20 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />

                            <div className="text-center space-y-4 md:space-y-8 relative z-10">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                                    <Sword className="w-3 h-3 text-yellow-500" />
                                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Challenge Protocol Active</span>
                                </div>
                                <h1 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none py-2">Challenge Ceremony</h1>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32 relative z-10 w-full justify-center">
                                <motion.div
                                    animate={ritualCombatStatus ? { x: [0, 60, 0], scale: [1, 1.15, 1] } : {}}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-full md:w-56 h-72 md:h-96 bg-purple-900/20 border-2 border-purple-500/40 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-white shadow-2xl relative overflow-hidden"
                                >
                                    <Shield className="w-16 h-16 md:w-24 md:h-24 text-purple-400 mb-4" />
                                    <span className="text-4xl md:text-6xl font-black italic tracking-tighter">KING</span>
                                </motion.div>

                                <div className="relative">
                                    <div className="text-5xl md:text-8xl font-black text-white italic opacity-20 select-none">VS</div>
                                </div>

                                <motion.div
                                    animate={ritualCombatStatus ? { x: [0, -60, 0], scale: [1, 1.15, 1] } : {}}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                    className="w-full md:w-56 h-72 md:h-96 bg-slate-900/40 border-2 border-slate-500/30 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-slate-300 shadow-2xl relative overflow-hidden"
                                >
                                    <Sword className="w-16 h-16 md:w-24 md:h-24 text-slate-500 mb-4" />
                                    <span className="text-4xl md:text-6xl font-black italic tracking-tighter">FOE</span>
                                </motion.div>
                            </div>

                            <button
                                onClick={() => setRitualCombatStatus(!ritualCombatStatus)}
                                className={clsx(
                                    "w-full md:w-auto px-20 py-8 md:py-10 rounded-full font-black text-sm uppercase tracking-[0.5em] transition-all duration-700 relative z-10 active:scale-95",
                                    ritualCombatStatus ? "bg-red-600 text-white" : "bg-yellow-600 text-black"
                                )}
                            >
                                {ritualCombatStatus ? "Yield Conflict" : "Face Traditional Challenge"}
                            </button>
                        </motion.div>
                    )}

                    {/* BAZAAR Section */}
                    {activeSection === 'trading' && (
                        <motion.div
                            key="trading"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10"
                        >
                            {merchandise.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="bg-[#0b0b14]/60 p-8 rounded-[3rem] border border-white/5 space-y-8 group cursor-pointer hover:border-purple-500/40 hover:bg-slate-900/80 transition-all shadow-2xl relative overflow-hidden active:scale-95"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    <div className="h-56 bg-gradient-to-br from-black/80 to-slate-900 rounded-[2.5rem] flex items-center justify-center text-[100px] md:text-[120px] group-hover:scale-110 transition-transform duration-700 shadow-inner group-hover:rotate-6">
                                        {item.image}
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white italic group-hover:text-purple-400 leading-none uppercase tracking-tighter">{item.name}</h3>
                                            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">{item.specs?.[0]}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                                <span className="text-xs font-black text-purple-400 tracking-tighter">{item.price}</span>
                                            </div>
                                            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-purple-600 transition-all">
                                                <ArrowRight size={20} className="text-white group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* KINGDOM MAP */}
                    {activeSection === 'map' && (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 min-h-[650px] relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] opacity-20 grayscale brightness-[0.3]" />
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <div className="absolute top-12 left-12 space-y-2 text-left">
                                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Tactical Overlay</h2>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-[8px] font-black text-green-500 tracking-[0.2em] uppercase">Borders Hold</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowMapOverlay(true)}
                                    className="group relative flex flex-col items-center"
                                >
                                    <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
                                    <div className="w-56 h-56 bg-purple-600 rounded-full flex items-center justify-center shadow-xl border-[4px] border-white group-hover:scale-110 transition-transform">
                                        <MapIcon className="w-24 h-24 text-white" />
                                    </div>
                                    <span className="mt-8 text-xs font-black text-white uppercase tracking-[0.5em] animate-pulse">Expand Strategy Map</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* DIALOGS FOR BUTTON CLICKS */}

            {/* Product Details Dialog Section */}
            <WakandaDialog
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                title={selectedProduct?.name || "Product Info"}
                icon={<ShoppingBag size={24} />}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="h-72 md:h-96 bg-black/40 rounded-[3rem] flex items-center justify-center text-[150px] md:text-[200px] shadow-inner relative overflow-hidden group/product">
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent" />
                        <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative z-10">{selectedProduct?.image}</motion.span>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
                                <Shield className="w-3 h-3 text-purple-400" />
                                <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Wakanda Design Group</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase leading-none tracking-tighter">{selectedProduct?.price}</h3>
                        </div>
                        <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-4 border-purple-600 pl-6">"{selectedProduct?.description}"</p>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Integrated Sub-Systems</span>
                            <div className="grid grid-cols-1 gap-3">
                                {selectedProduct?.specs?.map((spec) => (
                                    <div key={spec} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group/spec hover:bg-white/10 transition-all">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 group-hover/spec:scale-150 transition-transform shadow-[0_0_10px_purple]" />
                                        <span className="text-xs md:text-sm font-bold text-slate-300">{spec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="w-full py-6 md:py-8 bg-purple-600 text-white rounded-[2rem] font-black text-xs md:text-sm uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] transition-all">Initialize Acquisition</button>
                    </div>
                </div>
            </WakandaDialog>

            {/* Mining Status Dialog Section */}
            <WakandaDialog
                isOpen={showMiningDialog}
                onClose={() => setShowMiningDialog(false)}
                title="Vibranium Telemetry"
                icon={<Activity size={24} />}
            >
                <div className="space-y-10">
                    <div className="p-6 md:p-8 bg-purple-950/20 border border-purple-500/10 rounded-[2rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full bg-purple-400" />
                        </div>
                        <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed italic pr-10">
                            "Mt. Bashenga core stability is holding at {sonicStability.toFixed(1)}%. Harmonic resonance detected in the lower strata."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {[
                            { label: "Stability", value: `${sonicStability.toFixed(1)}%`, icon: Wind, color: "text-blue-400" },
                            { label: "Purity", value: "99.98%", icon: Zap, color: "text-purple-400" },
                            { label: "Neural link", value: "Active", icon: Radio, color: "text-green-400" },
                            { label: "Reserve", value: "High", icon: Database, color: "text-yellow-400" },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="p-6 md:p-8 bg-white/5 rounded-[2rem] border border-white/5 flex flex-col items-center gap-3 transition-colors text-center shadow-lg"
                            >
                                <div className={clsx("p-3 md:p-4 rounded-2xl bg-black/40 mb-1", stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{stat.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                        Full Diagnostic Report
                    </button>
                </div>
            </WakandaDialog>

            {/* Map Interaction Dialog Section */}
            <WakandaDialog
                isOpen={showMapOverlay}
                onClose={() => setShowMapOverlay(false)}
                title="Sovereign Scan"
                icon={<Globe size={24} />}
            >
                <div className="space-y-10">
                    <div className="h-72 md:h-[400px] bg-black/60 rounded-[3rem] relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[600px] h-[600px] border border-purple-500/10 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] border border-purple-500/5 rounded-full"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full blur-md animate-pulse" />
                        </motion.div>

                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 bg-purple-600 blur-3xl opacity-20 rounded-full"
                            />
                            <Globe className="w-32 h-32 md:w-56 md:h-56 text-purple-600/40 relative z-10" />
                        </div>

                        <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center space-y-2">
                            <span className="text-[10px] font-black text-white italic uppercase tracking-[0.4em] animate-pulse">Scanning Borders...</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { loc: 'Golden City', status: 'Secure', color: 'bg-green-500' },
                            { loc: 'Warrior\'s Falls', status: 'Public', color: 'bg-blue-500' },
                            { loc: 'Jabari Lands', status: 'Isolated', color: 'bg-yellow-500' },
                            { loc: 'River Tribe', status: 'Secure', color: 'bg-green-500' }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.loc}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-purple-600/10 transition-all cursor-pointer active:scale-95"
                            >
                                <div className="space-y-1">
                                    <span className="text-sm md:text-lg font-black text-white uppercase italic tracking-tighter leading-none">{item.loc}</span>
                                    <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.status}</p>
                                </div>
                                <div className={clsx("w-3 h-3 md:w-4 md:h-4 rounded-full", item.color)} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </WakandaDialog>

            {/* Highly Stylish Footer Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-12 md:pt-20 border-t border-white/5 relative z-10">
                {[
                    { label: "Border Shields", value: "Functional", icon: Shield, color: "text-green-500", detail: "Level 10 Active" },
                    { label: "Kinetic Pulse", value: `${kineticEnergy}%`, icon: Zap, color: "text-purple-500", detail: "Charging Grid" },
                    { label: "Heartbeat Sync", value: "Optimal", icon: HeartPulse, color: "text-red-500", detail: "Life Signs Green" },
                    { label: "Uplink Secure", value: "Encrypted", icon: Radio, color: "text-blue-500", detail: "Quantum Channel" },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + (idx * 0.1) }}
                        className="flex items-center gap-6 p-6 md:p-8 bg-[#0c0c14]/40 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group shadow-xl"
                    >
                        <div className={clsx(
                            "p-5 md:p-7 rounded-[2rem] bg-black/60 shadow-inner relative",
                            stat.color
                        )}>
                            <stat.icon size={28} />
                            <motion.div animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-current rounded-full blur-xl" />
                        </div>
                        <div className="text-left">
                            <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none mb-2">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter mb-1">{stat.value}</p>
                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest leading-none">{stat.detail}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
