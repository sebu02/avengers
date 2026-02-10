"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    Clock, Zap, AlertTriangle, Eye, Infinity as InfinityIcon, Sparkles,
    GitBranch, Radio, Shield, Target, ChevronDown, ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function TimelinePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [phaseIn, setPhaseIn] = useState(true);
    const [glitchActive, setGlitchActive] = useState(false);

    // Parallax transforms
    const timelineScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 2]);
    const timelineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.6, 0.3]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        setTimeout(() => setPhaseIn(false), 2000);

        // Random glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
        }, 8000);

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-[400vh] bg-black overflow-hidden">
            {/* Phase-in overlay */}
            <AnimatePresence>
                {phaseIn && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            <InfinityIcon className="w-32 h-32 text-green-500" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Glitch overlay */}
            <AnimatePresence>
                {glitchActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0, 0.5, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 pointer-events-none"
                        style={{
                            background: 'repeating-linear-gradient(0deg, rgba(34, 197, 94, 0.1) 0px, transparent 2px, transparent 4px, rgba(34, 197, 94, 0.1) 6px)',
                            mixBlendMode: 'screen'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sticky background */}
            <div className="fixed inset-0">
                {/* Cosmic background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black"
                    style={{ y: bgY }}
                />

                {/* Animated stars */}
                {[...Array(100)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: 9999,
                            repeatType: "loop",
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Energy grid */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
                </div>

                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#eab308' : '#a855f7'
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: 9999,
                            repeatType: "loop",
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10">
                {/* Hero Section */}
                <section className="sticky top-0 h-screen flex items-center justify-center">
                    <div className="relative w-full max-w-6xl mx-auto px-6">
                        {/* Back button */}
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-8 left-8 px-6 py-3 bg-green-600/20 border-2 border-green-500 rounded-lg text-green-400 font-bold flex items-center gap-2 hover:bg-green-600/30 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                RETURN TO SACRED TIMELINE
                            </motion.button>
                        </Link>

                        {/* Timeline core */}
                        <motion.div
                            style={{
                                scale: timelineScale,
                                opacity: timelineOpacity
                            }}
                            className="relative"
                        >
                            {/* Central timeline branch */}
                            <TimelineBranch />

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-center relative z-20"
                            >
                                <GlitchText text="TIMELINE BRANCH" className="text-7xl font-black mb-4" />
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                                    className="text-2xl text-green-500 font-mono tracking-[0.3em]"
                                >
                                    NEXUS-7849-OMEGA
                                </motion.div>
                                <div className="mt-6 text-yellow-500 font-bold text-sm flex items-center justify-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    UNSTABLE VARIANT DETECTED
                                </div>
                            </motion.div>

                            {/* Scroll indicator */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: 9999, repeatType: "loop" }}
                                className="absolute bottom-20 left-1/2 -translate-x-1/2 text-green-500"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Data Section 1 - Timeline Analysis */}
                <section className="relative min-h-screen flex items-center justify-center py-20">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-8">
                        <TVAPanel
                            title="TEMPORAL ANALYSIS"
                            icon={Clock}
                            delay={0}
                        >
                            <DataRow label="Branch Point" value="2012.10.23.14:47:03" />
                            <DataRow label="Deviation" value="+847.3 units" status="critical" />
                            <DataRow label="Stability" value="12.4%" status="warning" />
                            <DataRow label="Nexus Events" value="47" />
                        </TVAPanel>

                        <TVAPanel
                            title="VARIANT PROFILE"
                            icon={Eye}
                            delay={0.2}
                        >
                            <DataRow label="Classification" value="OMEGA-CLASS" status="critical" />
                            <DataRow label="Threat Level" value="MAXIMUM" status="critical" />
                            <DataRow label="Reality Anchor" value="UNSTABLE" status="warning" />
                            <DataRow label="Pruning Status" value="PENDING" />
                        </TVAPanel>

                        <TVAPanel
                            title="DIMENSIONAL METRICS"
                            icon={GitBranch}
                            delay={0.4}
                        >
                            <DataRow label="Branch Integrity" value="DEGRADING" status="warning" />
                            <DataRow label="Quantum Flux" value="847.3 THz" />
                            <DataRow label="Timeline Splits" value="∞" status="critical" />
                            <DataRow label="Convergence" value="IMPOSSIBLE" />
                        </TVAPanel>

                        <TVAPanel
                            title="NEXUS SIGNATURE"
                            icon={Zap}
                            delay={0.6}
                        >
                            <DataRow label="Energy Output" value="12.4 PW" />
                            <DataRow label="Frequency" value="847.3 MHz" />
                            <DataRow label="Resonance" value="CRITICAL" status="critical" />
                            <DataRow label="Containment" value="FAILING" status="warning" />
                        </TVAPanel>
                    </div>
                </section>

                {/* Data Section 2 - Timeline Events */}
                <section className="relative min-h-screen flex items-center justify-center py-20">
                    <div className="max-w-4xl mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl font-black text-center mb-16"
                        >
                            <GlitchText text="RECORDED NEXUS EVENTS" />
                        </motion.h2>

                        <div className="space-y-6">
                            <NexusEvent
                                time="2012.10.23.14:47:03"
                                event="Initial Branch Point"
                                severity="high"
                                delay={0}
                            />
                            <NexusEvent
                                time="2012.10.23.15:12:47"
                                event="Variant Consciousness Awakening"
                                severity="critical"
                                delay={0.1}
                            />
                            <NexusEvent
                                time="2012.10.23.16:33:21"
                                event="Reality Anchor Destabilization"
                                severity="critical"
                                delay={0.2}
                            />
                            <NexusEvent
                                time="2012.10.23.18:04:59"
                                event="Multiverse Cascade Initiated"
                                severity="critical"
                                delay={0.3}
                            />
                            <NexusEvent
                                time="2012.10.23.23:59:59"
                                event="Timeline Collapse Imminent"
                                severity="critical"
                                delay={0.4}
                            />
                        </div>
                    </div>
                </section>

                {/* Final Section - Pruning Warning */}
                <section className="relative min-h-screen flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto px-6 text-center"
                    >
                        <motion.div
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(239, 68, 68, 0.5)',
                                    '0 0 60px rgba(239, 68, 68, 0.8)',
                                    '0 0 20px rgba(239, 68, 68, 0.5)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                            className="bg-red-950/30 border-4 border-red-500 rounded-2xl p-12"
                        >
                            <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                            <h2 className="text-6xl font-black text-red-500 mb-6">
                                TIMELINE PRUNING
                            </h2>
                            <p className="text-2xl text-red-400 mb-8 font-mono">
                                AUTHORIZED BY TVA DIRECTIVE 847-OMEGA
                            </p>
                            <p className="text-gray-400 mb-8">
                                This timeline branch has exceeded acceptable deviation parameters.
                                Temporal reset sequence will commence in T-minus 00:00:00
                            </p>

                            <Link href="/">
                                <TVAButton>
                                    EVACUATE TO SACRED TIMELINE
                                </TVAButton>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}

// Timeline Branch Component
const TimelineBranch = () => (
    <div className="relative h-96 flex items-center justify-center mb-20">
        {/* Main timeline */}
        <motion.div
            className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
            animate={{
                opacity: [0.5, 1, 0.5],
                boxShadow: [
                    '0 0 10px rgba(34, 197, 94, 0.5)',
                    '0 0 30px rgba(34, 197, 94, 1)',
                    '0 0 10px rgba(34, 197, 94, 0.5)'
                ]
            }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
        />

        {/* Branch lines */}
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute h-1 bg-gradient-to-r from-green-500 to-purple-500"
                style={{
                    width: `${100 + i * 50}px`,
                    left: '50%',
                    transformOrigin: 'left center',
                    rotate: `${(i - 4) * 15}deg`
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: 1,
                    opacity: [0, 0.8, 0.4],
                }}
                transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 1,
                    opacity: { duration: 2, repeat: 9999, repeatType: "loop", delay: i * 0.2 }
                }}
            />
        ))}

        {/* Central nexus point */}
        <motion.div
            className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-purple-600 flex items-center justify-center"
            animate={{
                boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(34, 197, 94, 0.8), 0 0 80px rgba(168, 85, 247, 0.6)',
                    '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)'
                ],
                rotate: 360
            }}
            transition={{
                boxShadow: { duration: 2, repeat: 9999, repeatType: "loop" },
                rotate: { duration: 20, repeat: 9999, repeatType: "loop", ease: "linear" }
            }}
        >
            <InfinityIcon className="w-16 h-16 text-white" />
        </motion.div>

        {/* Energy rings */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border-2 border-green-500"
                style={{
                    width: `${150 + i * 80}px`,
                    height: `${150 + i * 80}px`
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5]
                }}
                transition={{
                    duration: 3,
                    repeat: 9999,
                    repeatType: "loop",
                    delay: i * 0.5
                }}
            />
        ))}
    </div>
);

// Glitch Text Component
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 100);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-500 to-purple-500">
                {text}
            </span>
            {glitch && (
                <>
                    <span className="absolute top-0 left-0 text-red-500 opacity-70" style={{ transform: 'translate(-2px, -2px)' }}>
                        {text}
                    </span>
                    <span className="absolute top-0 left-0 text-cyan-500 opacity-70" style={{ transform: 'translate(2px, 2px)' }}>
                        {text}
                    </span>
                </>
            )}
        </div>
    );
};

// TVA Panel Component
const TVAPanel = ({ title, icon: Icon, children, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-black/60 border-2 border-green-500/50 rounded-xl p-6 backdrop-blur-md relative overflow-hidden group"
    >
        {/* Animated background */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
        />

        {/* Scan line */}
        <motion.div
            className="absolute inset-x-0 h-1 bg-green-500/50"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
        />

        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-green-500" />
                <h3 className="text-sm font-bold text-green-400 tracking-wider">{title}</h3>
            </div>
            <div className="space-y-2">
                {children}
            </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />
    </motion.div>
);

// Data Row Component
const DataRow = ({ label, value, status }: any) => {
    const getStatusColor = () => {
        if (status === 'critical') return 'text-red-500';
        if (status === 'warning') return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="flex justify-between items-center text-sm font-mono">
            <span className="text-gray-400">{label}:</span>
            <motion.span
                className={`font-bold ${getStatusColor()}`}
                animate={status ? { opacity: [0.7, 1, 0.7] } : {}}
                transition={status ? { duration: 1.5, repeat: 9999, repeatType: "loop" } : { duration: 0.5 }}
            >
                {value}
            </motion.span>
        </div>
    );
};

// Nexus Event Component
const NexusEvent = ({ time, event, severity, delay }: any) => {
    const getSeverityColor = () => {
        if (severity === 'critical') return 'border-red-500 bg-red-950/30';
        if (severity === 'high') return 'border-yellow-500 bg-yellow-950/30';
        return 'border-green-500 bg-green-950/30';
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ scale: 1.02, x: 10 }}
            className={`border-l-4 ${getSeverityColor()} p-4 backdrop-blur-md`}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                        className={`w-3 h-3 rounded-full ${severity === 'critical' ? 'bg-red-500' : severity === 'high' ? 'bg-yellow-500' : 'bg-green-500'}`}
                    />
                </div>
                <div className="flex-1">
                    <div className="text-xs text-gray-500 font-mono mb-1">{time}</div>
                    <div className="text-white font-bold">{event}</div>
                </div>
            </div>
        </motion.div>
    );
};

// TVA Button Component
const TVAButton = ({ children }: any) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg overflow-hidden group"
    >
        <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-500"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
        />
        <span className="relative z-10 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {children}
        </span>
    </motion.button>
);
