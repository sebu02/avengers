"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Power } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ShutdownOverlayProps {
    isTriggered: boolean;
    onComplete: () => void;
}

export default function ShutdownOverlay({ isTriggered, onComplete }: ShutdownOverlayProps) {
    const [step, setStep] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (isTriggered) {
            // Sequence of events
            const timer1 = setTimeout(() => setStep(1), 1000); // System closing
            const timer2 = setTimeout(() => setStep(2), 3000); // Motivational message
            const timer3 = setTimeout(() => setStep(3), 6000); // Final credits / Restart
            const timer4 = setTimeout(() => {
                onComplete();
                router.push("/");
            }, 8500);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
            };
        }
    }, [isTriggered, onComplete, router]);

    if (!isTriggered) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background Noise/Static Effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUPr9WUM/giphy.gif')] bg-repeat" />

                {/* Step 1: System Shutdown Sequence */}
                {step === 0 && (
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center space-y-6"
                    >
                        <Power className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto animate-pulse" />
                        <h2 className="text-lg md:text-2xl font-black text-red-600 tracking-[0.3em] md:tracking-[0.5em] uppercase italic">Initiating Shutdown</h2>
                        <div className="w-48 md:w-64 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, ease: "linear" }}
                                className="h-full bg-red-600"
                            />
                        </div>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <Lock className="w-10 h-10 md:w-12 md:h-12 text-cyan-500 mx-auto mb-4" />
                        <p className="text-cyan-500 font-mono text-[10px] md:text-xs tracking-widest uppercase">Encryption Level 9 Active</p>
                        <h1 className="text-2xl md:text-4xl font-black text-white italic tracking-tighter uppercase">Closing Secure Uplink...</h1>
                        <p className="text-slate-500 text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em]">JARVIS standing by for further instructions.</p>
                    </motion.div>
                )}

                {/* Step 2: Motivational Quote */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-2xl px-8"
                    >
                        <Shield className="w-16 h-16 md:w-20 md:h-20 text-white/20 mx-auto mb-8 animate-spin-slow" />
                        <motion.h2
                            initial={{ letterSpacing: "0.1em", opacity: 0 }}
                            animate={{ letterSpacing: "0.3em", opacity: 1 }}
                            transition={{ duration: 2 }}
                            className="text-xl md:text-5xl font-black text-white italic uppercase tracking-[0.3em] md:tracking-[0.5em] leading-tight mb-6"
                        >
                            The Avengers Will Assemble Again
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 1 }}
                            className="text-white text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase"
                        >
                            Part of the journey is the end.
                        </motion.p>
                    </motion.div>
                )}

                {/* Step 3: Final Cinematic Credits */}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-12"
                    >
                        <div className="space-y-6">
                            <h3 className="text-cyan-500 text-[8px] md:text-[10px] font-black tracking-[0.5em] md:tracking-[0.8em] uppercase italic opacity-50">Protocol: S.H.I.E.L.D.</h3>
                            <motion.div
                                animate={{ filter: ["drop-shadow(0 0 0px #06b6d4)", "drop-shadow(0 0 20px #06b6d4)", "drop-shadow(0 0 0px #06b6d4)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex flex-col items-center gap-4"
                            >
                                <Shield className="w-16 h-16 md:w-24 md:h-24 text-white" />
                                <h1 className="text-3xl md:text-7xl font-black text-white tracking-[0.1em] md:tracking-[0.2em] italic uppercase">AVENGERS</h1>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3 }}
                            className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full max-w-4xl mx-auto"
                        />
                        <div className="space-y-4">
                            <p className="text-[10px] text-slate-500 font-mono tracking-[0.4em] uppercase">System successfully archived.</p>
                            <p className="text-xs text-white font-black tracking-[0.3em] uppercase animate-pulse italic">Rebooting Strategic Command Center...</p>
                        </div>
                    </motion.div>
                )}

                {/* Glitch Overlay Effect */}
                <motion.div
                    animate={{
                        opacity: [0, 0.1, 0, 0.05, 0],
                        x: [0, -4, 4, -2, 0],
                        y: [0, 1, -1, 0, 0]
                    }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-cyan-500 mix-blend-overlay pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 w-full animate-scan" style={{ top: '-10%' }} />
            </motion.div>
        </AnimatePresence>
    );
}
