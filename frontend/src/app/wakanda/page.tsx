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
interface VibraniumNode {
    id: string;
    level: number;
    status: 'active' | 'processing' | 'full';
    purity: number;
}

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
                <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={clsx(
                            "relative z-10 w-full max-w-2xl bg-slate-900 border overflow-hidden rounded-[2.5rem] shadow-2xl",
                            accentColor === "purple" ? "border-purple-500/30" : "border-yellow-500/30"
                        )}
                    >
                        {/* Futuristic Scanning Overlay */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className={clsx(
                                    "absolute w-full h-[2px] opacity-30",
                                    accentColor === "purple" ? "bg-purple-500 shadow-[0_0_20px_purple]" : "bg-yellow-500 shadow-[0_0_20px_yellow]"
                                )}
                            />
                        </div>

                        <div className="p-8 space-y-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "p-3 rounded-2xl",
                                        accentColor === "purple" ? "bg-purple-500/20 text-purple-400" : "bg-yellow-500/20 text-yellow-400"
                                    )}>
                                        {icon}
                                    </div>
                                    <h2 className="text-2xl font-black text-white italic uppercase tracking-wider">{title}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="custom-scrollbar">
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

    useEffect(() => {
        if (!isDeploying) return;
        const interval = setInterval(() => {
            setKineticEnergy(prev => (prev < 100 ? prev + 2 : 0));
        }, 50);
        return () => clearInterval(interval);
    }, [isDeploying]);

    const merchandise: Product[] = [
        { id: 1, name: "Kimoyo Beads", price: "450 V-Credits", description: "Advanced communication & medical scanning array.", image: "📿", specs: ["Neural Link v4.2", "Global Satellite Uplink", "Heartbeat Monitor"] },
        { id: 2, name: "Vibranium Spear", price: "2800 V-Credits", description: "Standard Dora Milaje issue. Collapsible.", image: "🛡️", specs: ["Kinetic Recharge", "Sonic Frequency Tuner", "Retractable Design"] },
        { id: 3, name: "Bashenga's Mantle", price: "5000 V-Credits", description: "High-grade kinetic energy woven fabric.", image: "🧥", specs: ["Energy Redirection", "Stealth Coating", "Custom Fit Tuning"] },
        { id: 4, name: "Remote Pilot Array", price: "1200 V-Credits", description: "Shuri-tech vehicle remote control interface.", image: "👓", specs: ["Hyper-HUD", "Low Latency Control", "Auto-Stabilize"] },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="relative h-[400px] w-full rounded-[3rem] overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-12 left-12 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-purple-400 font-black tracking-[0.4em] uppercase text-xs"
                    >
                        <Shield className="w-4 h-4 animate-pulse" />
                        Kingdom Control Center
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8]"
                    >
                        Wakanda <br /><span className="text-purple-500">Mainframe</span>
                    </motion.h1>
                </div>

                <div className="absolute top-10 right-10">
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3 group hover:bg-purple-600 transition-all">
                        <Radio className="w-4 h-4 text-purple-400 group-hover:text-white" />
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Broadcast Alert</span>
                    </button>
                </div>
            </div>

            {/* Main Tabs Navigation */}
            <div className="flex flex-wrap gap-3 p-2 bg-slate-900/60 backdrop-blur-xl rounded-[2rem] border border-white/5 w-fit">
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
                            "flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em]",
                            activeSection === tab.id
                                ? "bg-purple-600 text-white shadow-[0_0_30px_rgba(147,51,234,0.5)] scale-105"
                                : "text-slate-500 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <main className="grid grid-cols-1 gap-8 relative">
                <AnimatePresence mode="wait">
                    {/* LAB & TECH */}
                    {activeSection === 'tech' && (
                        <motion.div
                            key="tech"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >
                            <div className="lg:col-span-2 bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 space-y-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%)]" />
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Vibranium Mines</h2>
                                        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Global Purity Index: 99.98%</p>
                                    </div>
                                    <button
                                        onClick={() => setShowMiningDialog(true)}
                                        className="p-4 bg-purple-600 text-white rounded-2xl hover:scale-110 transition-transform shadow-[0_10px_20px_rgba(147,51,234,0.3)]"
                                    >
                                        <Activity size={20} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {['MT-1 ALPHA', 'MT-2 BETA', 'MT-3 GAMMA'].map((id) => (
                                        <div key={id} className="p-6 bg-black/40 rounded-[2rem] border border-white/5 space-y-4 hover:border-purple-500/50 transition-colors">
                                            <span className="text-[10px] font-black text-purple-400 tracking-widest">{id}</span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        animate={{ width: ['40%', '80%', '40%'] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                        className="h-full bg-purple-500 shadow-[0_0_10px_purple]"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-mono text-white">72%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-b from-purple-900/40 to-slate-900/40 p-10 rounded-[2.5rem] border border-purple-500/20 flex flex-col items-center justify-center text-center space-y-6">
                                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                                    <FlaskConical className="w-16 h-16 text-purple-400 mb-4" />
                                </motion.div>
                                <h3 className="text-xl font-black text-white uppercase">Neural Science</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Advanced Kimoyo research facility for deep-neural synchronization.
                                </p>
                                <button className="w-full py-4 bg-white/5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors">
                                    Access Archives
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* SUIT INTERFACE */}
                    {activeSection === 'suit' && (
                        <motion.div
                            key="suit"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-slate-900/40 p-12 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center min-h-[600px] gap-12 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />

                            {/* Suit Visualizer Container */}
                            <div className="relative group">
                                <motion.div
                                    animate={isDeploying ? {
                                        scale: [1, 1.1, 1],
                                        filter: ["drop-shadow(0 0 0px purple)", "drop-shadow(0 0-40px purple)", "drop-shadow(0 0 0px purple)"]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Shield className={clsx(
                                        "w-48 h-48 md:w-64 md:h-64 transition-all duration-1000",
                                        isDeploying ? "text-purple-500 scale-110" : "text-slate-800"
                                    )} />
                                </motion.div>

                                {/* Kinetic Field Ripples */}
                                <AnimatePresence>
                                    {isDeploying && Array.from({ length: 4 }).map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: [0.5, 3], opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.75 }}
                                            className="absolute inset-0 border-[3px] border-purple-500/50 rounded-full"
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col items-center gap-8 w-full max-w-xl">
                                <div className="w-full space-y-4">
                                    <div className="flex justify-between text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
                                        <span>Kinetic Reservoir</span>
                                        <span>{kineticEnergy}%</span>
                                    </div>
                                    <div className="h-4 bg-black/60 rounded-full p-1 border border-white/10 overflow-hidden shadow-inner">
                                        <motion.div
                                            animate={{ width: `${kineticEnergy}%` }}
                                            className="h-full bg-gradient-to-r from-purple-800 via-purple-500 to-white rounded-full shadow-[0_0_20px_purple]"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDeploying(!isDeploying)}
                                    className={clsx(
                                        "px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all duration-500",
                                        isDeploying
                                            ? "bg-purple-600 text-white shadow-[0_0_50px_rgba(147,51,234,0.6)] scale-110"
                                            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                    )}
                                >
                                    {isDeploying ? "Armor: Active" : "Deploy Panther Habit"}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* RITUAL COMBAT */}
                    {activeSection === 'king' && (
                        <motion.div
                            key="king"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 min-h-[600px] flex flex-col items-center justify-center gap-12 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069')] opacity-5 grayscale" />
                            <div className="text-center space-y-6 relative z-10">
                                <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Combat Ceremony</h1>
                                <p className="text-slate-400 max-w-lg mx-auto text-sm font-medium leading-relaxed">
                                    Initiating traditional challenge sequence. Environmental dampeners set to 0.
                                </p>
                            </div>

                            <div className="flex items-center gap-8 md:gap-24 relative z-10">
                                <motion.div
                                    animate={ritualCombatStatus ? { x: [0, 50, 0], scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-40 h-60 bg-purple-900/30 border-2 border-purple-500/50 rounded-[2.5rem] flex items-center justify-center text-5xl font-black text-purple-200 italic shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                >
                                    KING
                                </motion.div>
                                <div className="text-4xl font-black text-white italic animate-pulse">VS</div>
                                <motion.div
                                    animate={ritualCombatStatus ? { x: [0, -50, 0], scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                    className="w-40 h-60 bg-slate-800/30 border-2 border-slate-500/50 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-slate-300 italic shadow-[0_0_30px_rgba(100,100,100,0.2)]"
                                >
                                    FOE
                                </motion.div>
                            </div>

                            <button
                                onClick={() => setRitualCombatStatus(!ritualCombatStatus)}
                                className={clsx(
                                    "px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] transition-all relative z-10",
                                    ritualCombatStatus ? "bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.5)]" : "bg-yellow-600/20 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-600/30"
                                )}
                            >
                                {ritualCombatStatus ? "End Conflict" : "Face Your King"}
                            </button>
                        </motion.div>
                    )}

                    {/* BAZAAR */}
                    {activeSection === 'trading' && (
                        <motion.div
                            key="trading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {merchandise.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -10 }}
                                    className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 space-y-6 group cursor-pointer hover:border-purple-500/40 hover:bg-slate-900/80 transition-all shadow-xl"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    <div className="h-48 bg-black/60 rounded-[2rem] flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-700 shadow-inner">
                                        {item.image}
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black text-white italic group-hover:text-purple-400 transition-colors uppercase tracking-tighter">{item.name}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-mono font-bold text-purple-400">{item.price}</span>
                                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-purple-600 transition-colors">
                                                <ArrowRight size={18} className="text-white" />
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
                            className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 min-h-[650px] relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] opacity-20 grayscale brightness-[0.3] group-hover:scale-105 transition-transform duration-[5s]" />
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <div className="absolute top-12 left-12 space-y-2">
                                    <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Tactical Overlay</h2>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-[8px] font-black text-green-500 tracking-[0.2em] uppercase">Borders Hold</div>
                                        <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-[8px] font-black text-blue-500 tracking-[0.2em] uppercase">Stealth: 100%</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowMapOverlay(true)}
                                    className="group relative flex flex-col items-center"
                                >
                                    <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
                                    <div className="w-56 h-56 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(147,51,234,0.6)] border-[4px] border-white group-hover:scale-110 transition-transform">
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

            {/* Product Details Dialog */}
            <WakandaDialog
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                title={selectedProduct?.name || "Product Info"}
                icon={<ShoppingBag size={24} />}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="h-64 bg-black/40 rounded-[2rem] flex items-center justify-center text-9xl">
                        {selectedProduct?.image}
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Shuri-Tech Certified</span>
                            <h3 className="text-3xl font-black text-white italic uppercase">{selectedProduct?.price}</h3>
                        </div>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">{selectedProduct?.description}</p>
                        <div className="grid grid-cols-1 gap-3">
                            {selectedProduct?.specs?.map((spec) => (
                                <div key={spec} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                                    {spec}
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg">Purchase License</button>
                    </div>
                </div>
            </WakandaDialog>

            {/* Mining Status Dialog */}
            <WakandaDialog
                isOpen={showMiningDialog}
                onClose={() => setShowMiningDialog(false)}
                title="Telemetry Overhaul"
                icon={<Activity size={24} />}
            >
                <div className="space-y-8">
                    <p className="text-slate-400 text-sm font-medium leading-relaxed"> Mt. Bashenga is currently operating at maximum efficiency. Vibranium resonance detected in the Lower Mantle.</p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Stability", value: "98.4%", icon: Wind },
                            { label: "Purity", value: "99.98%", icon: Zap },
                            { label: "Neural link", value: "Active", icon: Radio },
                            { label: "Reserve", value: "Optimal", icon: Database },
                        ].map((stat) => (
                            <div key={stat.label} className="p-6 bg-white/5 rounded-[1.5rem] border border-white/5 flex flex-col items-center gap-2">
                                <stat.icon size={20} className="text-purple-400" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                <span className="text-lg font-black text-white italic">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </WakandaDialog>

            {/* Map Interaction Dialog */}
            <WakandaDialog
                isOpen={showMapOverlay}
                onClose={() => setShowMapOverlay(false)}
                title="Territory Scan"
                icon={<Globe size={24} />}
            >
                <div className="space-y-8">
                    <div className="h-64 bg-black/40 rounded-[2rem] relative overflow-hidden flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[500px] h-[500px] border border-purple-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[300px] h-[300px] border border-purple-500/10 rounded-full"
                        />
                        <Globe className="w-32 h-32 text-purple-600/50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] animate-pulse">Scanning Borders...</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Golden City', 'Warrior\'s Falls', 'Jabari Lands', 'River Tribe'].map(loc => (
                            <div key={loc} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-purple-600/10 transition-colors">
                                <span className="text-sm font-black text-white uppercase">{loc}</span>
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_green]" />
                            </div>
                        ))}
                    </div>
                </div>
            </WakandaDialog>

            {/* Footer Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/5">
                {[
                    { label: "Border Shields", value: "Functional", icon: Shield, color: "text-green-500" },
                    { label: "Kinetic Charge", value: `${kineticEnergy}%`, icon: Zap, color: "text-purple-500" },
                    { label: "Heartbeat Sync", value: "Optimal", icon: HeartPulse, color: "text-red-500" },
                    { label: "Sat-Uplink", value: "Encrypted", icon: Radio, color: "text-blue-500" },
                ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4 group cursor-help">
                        <div className={clsx("p-4 rounded-2xl bg-white/5 transition-all group-hover:scale-110", stat.color)}>
                            <stat.icon size={22} />
                        </div>
                        <div>
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-sm font-black text-white uppercase italic tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
