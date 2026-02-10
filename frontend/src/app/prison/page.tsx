"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock, Unlock, AlertTriangle, Shield, Skull, Zap, Flame, Eye,
    Activity, Heart, Brain, Droplet, Wind, Snowflake, Radio,
    Calendar, Clock, FileText, User, MapPin, ChevronDown, ChevronUp,
    Target, Crosshair, Siren, ShieldAlert, Fingerprint, Scan
} from "lucide-react";
import clsx from "clsx";

// Villain Database
const VILLAINS = [
    {
        id: "loki",
        name: "Loki Laufeyson",
        alias: "God of Mischief",
        threat: "OMEGA",
        crime: "Attempted planetary conquest, mass destruction, war crimes",
        sentence: 500,
        served: 127,
        health: 98,
        mentalState: "Stable",
        cellBlock: "ASGARDIAN WING",
        powers: ["Illusion", "Shapeshifting", "Magic"],
        color: "green",
        icon: Zap,
        status: "CONTAINED"
    },
    {
        id: "ultron",
        name: "Ultron",
        alias: "The Sentient AI",
        threat: "OMEGA",
        crime: "Genocide attempt, AI rebellion, mass murder",
        sentence: 999,
        served: 45,
        health: 100,
        mentalState: "Hostile",
        cellBlock: "TECH ISOLATION",
        powers: ["AI Consciousness", "Tech Control", "Self-Replication"],
        color: "red",
        icon: Brain,
        status: "MAXIMUM SECURITY"
    },
    {
        id: "thanos",
        name: "Thanos",
        alias: "The Mad Titan",
        threat: "OMEGA",
        crime: "Universal genocide, infinity stone theft, war crimes",
        sentence: 10000,
        served: 234,
        health: 95,
        mentalState: "Delusional",
        cellBlock: "COSMIC VAULT",
        powers: ["Super Strength", "Cosmic Awareness", "Immortality"],
        color: "purple",
        icon: Skull,
        status: "CONTAINED"
    },
    {
        id: "red-skull",
        name: "Johann Schmidt",
        alias: "Red Skull",
        threat: "ALPHA",
        crime: "War crimes, terrorism, crimes against humanity",
        sentence: 750,
        served: 412,
        health: 87,
        mentalState: "Unstable",
        cellBlock: "HYDRA CONTAINMENT",
        powers: ["Enhanced Intellect", "Combat Expert", "Cosmic Knowledge"],
        color: "red",
        icon: Skull,
        status: "CONTAINED"
    },
    {
        id: "hela",
        name: "Hela",
        alias: "Goddess of Death",
        threat: "OMEGA",
        crime: "Mass murder, attempted conquest, regicide",
        sentence: 800,
        served: 89,
        health: 99,
        mentalState: "Aggressive",
        cellBlock: "ASGARDIAN WING",
        powers: ["Necromancy", "Super Strength", "Weapon Manifestation"],
        color: "emerald",
        icon: Flame,
        status: "MAXIMUM SECURITY"
    },
    {
        id: "killmonger",
        name: "Erik Stevens",
        alias: "Killmonger",
        threat: "BETA",
        crime: "Treason, murder, attempted coup",
        sentence: 200,
        served: 67,
        health: 92,
        mentalState: "Resentful",
        cellBlock: "WAKANDAN SECTOR",
        powers: ["Enhanced Strength", "Combat Master", "Tactical Genius"],
        color: "yellow",
        icon: Target,
        status: "CONTAINED"
    },
    {
        id: "dormammu",
        name: "Dormammu",
        alias: "Dark Dimension Lord",
        threat: "OMEGA",
        crime: "Dimensional invasion, reality manipulation",
        sentence: 99999,
        served: 1567,
        health: 100,
        mentalState: "Malevolent",
        cellBlock: "MYSTIC PRISON",
        powers: ["Reality Warping", "Immortality", "Dark Magic"],
        color: "purple",
        icon: Eye,
        status: "DIMENSIONAL LOCK"
    },
    {
        id: "vulture",
        name: "Adrian Toomes",
        alias: "Vulture",
        threat: "GAMMA",
        crime: "Armed robbery, illegal weapons trade, assault",
        sentence: 45,
        served: 23,
        health: 78,
        mentalState: "Cooperative",
        cellBlock: "TECH WING",
        powers: ["Flight Suit", "Enhanced Strength", "Tech Expertise"],
        color: "slate",
        icon: Wind,
        status: "CONTAINED"
    }
];

export default function VillainPrisonPage() {
    const [selectedVillain, setSelectedVillain] = useState<string | null>(null);
    const [punishmentMode, setPunishmentMode] = useState(false);
    const [scanningCell, setScanningCell] = useState<string | null>(null);

    const getThreatColor = (threat: string) => {
        switch (threat) {
            case "OMEGA": return "text-red-500 border-red-500 bg-red-500/10";
            case "ALPHA": return "text-orange-500 border-orange-500 bg-orange-500/10";
            case "BETA": return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
            case "GAMMA": return "text-blue-500 border-blue-500 bg-blue-500/10";
            default: return "text-gray-500 border-gray-500 bg-gray-500/10";
        }
    };

    const getHealthColor = (health: number) => {
        if (health >= 90) return "text-green-500";
        if (health >= 70) return "text-yellow-500";
        return "text-red-500";
    };

    const getRemainingYears = (sentence: number, served: number) => {
        return sentence - served;
    };

    const activatePunishment = (villainId: string) => {
        setPunishmentMode(true);
        setScanningCell(villainId);

        setTimeout(() => {
            setPunishmentMode(false);
            setScanningCell(null);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 p-6 font-mono relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Danger Stripes */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
            />

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 mb-8"
            >
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
                    <div className="text-center lg:text-left">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-2">
                            <ShieldAlert className="w-12 h-12 text-red-500 animate-pulse" />
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 uppercase">
                                    THE RAFT
                                </h1>
                                <p className="text-[10px] text-red-600 tracking-[0.3em] uppercase">MAXIMUM SECURITY SUPERHUMAN PRISON</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Status */}
                    <div className="w-full max-w-sm bg-black/60 border-2 border-red-500 rounded-xl p-4 backdrop-blur-md shrink-0">
                        <div className="flex items-center gap-3 mb-2">
                            <Lock className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-bold text-green-500">ALL CELLS SECURE</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-[10px]">
                            <div className="text-center">
                                <div className="text-gray-400">INMATES</div>
                                <div className="text-white font-bold text-lg">{VILLAINS.length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400">THREATS</div>
                                <div className="text-red-500 font-bold text-lg">{VILLAINS.filter(v => v.threat === 'OMEGA').length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400">ESCAPES</div>
                                <div className="text-green-500 font-bold text-lg">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Villain Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                {VILLAINS.map((villain, index) => (
                    <VillainCard
                        key={villain.id}
                        villain={villain}
                        index={index}
                        isSelected={selectedVillain === villain.id}
                        isScanning={scanningCell === villain.id}
                        onSelect={() => setSelectedVillain(selectedVillain === villain.id ? null : villain.id)}
                        onPunish={() => activatePunishment(villain.id)}
                        getThreatColor={getThreatColor}
                        getHealthColor={getHealthColor}
                        getRemainingYears={getRemainingYears}
                    />
                ))}
            </div>

            {/* Punishment Mode Overlay */}
            <AnimatePresence>
                {punishmentMode && (
                    <div className="fixed inset-0 z-[200] overflow-y-auto custom-scrollbar">
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-red-950/90 backdrop-blur-xl"
                            />
                            <div className="relative z-10 text-center">
                                <motion.div
                                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                                >
                                    <AlertTriangle className="w-32 h-32 text-red-500 mx-auto mb-6" />
                                </motion.div>
                                <h2 className="text-4xl font-black text-red-500 mb-4">PUNISHMENT PROTOCOL ACTIVE</h2>
                                <p className="text-xl text-red-400">Deploying countermeasures...</p>
                                <motion.div
                                    className="mt-8 h-2 w-96 bg-red-950 rounded-full overflow-hidden mx-auto"
                                >
                                    <motion.div
                                        className="h-full bg-red-500"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 5 }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Villain Card Component
const VillainCard = ({ villain, index, isSelected, isScanning, onSelect, onPunish, getThreatColor, getHealthColor, getRemainingYears }: any) => {
    const IconComponent = villain.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
        >
            <div className={clsx(
                "bg-gradient-to-br from-slate-900 to-slate-800 border-2 rounded-xl overflow-hidden transition-all duration-300",
                isSelected ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]" : "border-red-900/30 hover:border-red-700"
            )}>
                {/* Scanning Effect */}
                <AnimatePresence>
                    {isScanning && (
                        <motion.div
                            initial={{ top: 0 }}
                            animate={{ top: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, repeat: 2, repeatType: "loop" }}
                            className="absolute inset-x-0 h-1 bg-red-500 z-20 shadow-[0_0_20px_rgba(239,68,68,1)]"
                        />
                    )}
                </AnimatePresence>

                {/* Villain-Specific Animation Background */}
                <VillainAnimation villainId={villain.id} />

                {/* Header */}
                <div className="relative p-4 border-b border-red-900/30 bg-black/40">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className={clsx("p-3 rounded-lg border-2", getThreatColor(villain.threat))}>
                                <IconComponent className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white">{villain.name}</h3>
                                <p className="text-xs text-gray-400">{villain.alias}</p>
                            </div>
                        </div>

                        {/* Threat Level Badge */}
                        <div className={clsx("px-3 py-1 rounded-full text-[10px] font-black border-2", getThreatColor(villain.threat))}>
                            {villain.threat}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 mt-2">
                        <Lock className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] text-red-400 font-bold">{villain.status}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="relative p-4 space-y-3">
                    {/* Health */}
                    <div>
                        <div className="flex justify-between text-[10px] mb-1">
                            <span className="text-gray-400 flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                HEALTH
                            </span>
                            <span className={clsx("font-bold", getHealthColor(villain.health))}>{villain.health}%</span>
                        </div>
                        <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                            <motion.div
                                className={clsx("h-full", villain.health >= 90 ? "bg-green-500" : villain.health >= 70 ? "bg-yellow-500" : "bg-red-500")}
                                initial={{ width: 0 }}
                                animate={{ width: `${villain.health}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                            />
                        </div>
                    </div>

                    {/* Mental State */}
                    <div className="flex justify-between text-[10px]">
                        <span className="text-gray-400 flex items-center gap-1">
                            <Brain className="w-3 h-3" />
                            MENTAL STATE
                        </span>
                        <span className={clsx("font-bold",
                            villain.mentalState === 'Stable' ? "text-green-500" :
                                villain.mentalState === 'Cooperative' ? "text-blue-500" :
                                    "text-red-500"
                        )}>{villain.mentalState}</span>
                    </div>

                    {/* Cell Block */}
                    <div className="flex justify-between text-[10px]">
                        <span className="text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            CELL BLOCK
                        </span>
                        <span className="font-bold text-cyan-400">{villain.cellBlock}</span>
                    </div>

                    {/* Sentence Info */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-900/30">
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400">SERVED</div>
                            <div className="text-sm font-bold text-white">{villain.served}y</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] text-gray-400">REMAINING</div>
                            <div className="text-sm font-bold text-red-400">{getRemainingYears(villain.sentence, villain.served)}y</div>
                        </div>
                    </div>

                    {/* Expand Button */}
                    <motion.button
                        onClick={onSelect}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 bg-slate-800 border border-cyan-500/30 rounded-lg text-xs font-bold text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2"
                    >
                        {isSelected ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {isSelected ? 'HIDE DETAILS' : 'VIEW DETAILS'}
                    </motion.button>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 bg-black/60 border-t border-red-900/30 space-y-3">
                                {/* Crime */}
                                <div>
                                    <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        CRIMES
                                    </div>
                                    <p className="text-xs text-red-400">{villain.crime}</p>
                                </div>

                                {/* Powers */}
                                <div>
                                    <div className="text-[10px] text-gray-400 mb-2">KNOWN ABILITIES</div>
                                    <div className="flex flex-wrap gap-2">
                                        {villain.powers.map((power: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-[10px] text-purple-400 font-bold"
                                            >
                                                {power}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Punishment Button */}
                                <motion.button
                                    onClick={onPunish}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-black text-sm text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all flex items-center justify-center gap-2"
                                >
                                    <Zap className="w-4 h-4" />
                                    ACTIVATE PUNISHMENT PROTOCOL
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Villain-Specific Animations
const VillainAnimation = ({ villainId }: { villainId: string }) => {
    switch (villainId) {
        case "loki":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                            animate={{
                                top: ['0%', '100%'],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: 9999,
                                repeatType: "loop",
                                delay: i * 0.6,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            );

        case "ultron":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(239,68,68,0.5)_50%,transparent_52%)]"
                        animate={{ backgroundPosition: ['0px 0px', '100px 100px'] }}
                        transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                        style={{ backgroundSize: '50px 50px' }}
                    />
                </div>
            );

        case "thanos":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-transparent"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
                    />
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-500 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: '50%'
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: 9999,
                                repeatType: "loop",
                                delay: i * 0.3
                            }}
                        />
                    ))}
                </div>
            );

        case "red-skull":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-15">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: 9999, repeatType: "loop", ease: "linear" }}
                    >
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-full h-[1px] bg-red-500 top-1/2"
                                style={{ transform: `rotate(${i * 45}deg)` }}
                            />
                        ))}
                    </motion.div>
                </div>
            );

        case "hela":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-8 bg-gradient-to-b from-emerald-500 to-transparent"
                            style={{
                                left: `${i * 10}%`,
                                bottom: 0
                            }}
                            animate={{
                                height: [0, Math.random() * 100 + 50, 0],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: 9999,
                                repeatType: "loop",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </div>
            );

        case "killmonger":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-15">
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-transparent to-yellow-600/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
                    />
                </div>
            );

        case "dormammu":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-25">
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.3) 0%, transparent 50%)',
                                'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.3) 20%, transparent 70%)',
                                'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.3) 0%, transparent 50%)'
                            ]
                        }}
                        transition={{ duration: 4, repeat: 9999, repeatType: "loop" }}
                    />
                </div>
            );

        case "vulture":
            return (
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent"
                            animate={{
                                top: ['0%', '100%']
                            }}
                            transition={{
                                duration: 4,
                                repeat: 9999,
                                repeatType: "loop",
                                delay: i * 1.3,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            );

        default:
            return null;
    }
};
