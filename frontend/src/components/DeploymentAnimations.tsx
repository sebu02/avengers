import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, Target, Shield, Activity, Crosshair, Radar, Rocket, Fingerprint, Eye } from "lucide-react";

interface DeploymentAnimationProps {
    heroId: string;
    onComplete: () => void;
}

export const DeploymentAnimation = ({ heroId, onComplete }: DeploymentAnimationProps) => {
    const [phase, setPhase] = useState<'INIT' | 'SCAN' | 'DEPLOY'>('INIT');

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('SCAN'), 1000);
        const timer2 = setTimeout(() => setPhase('DEPLOY'), 2500);
        const timer3 = setTimeout(onComplete, 5500); // Extended duration
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="absolute inset-0 bg-black flex items-center justify-center font-mono overflow-hidden w-full h-full">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Phase 1: Initialization */}
            {phase === 'INIT' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="relative z-10 text-cyan-500 text-center"
                >
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-ping opacity-20" />
                        <div className="w-32 h-32 border-2 border-cyan-400 rounded-full flex items-center justify-center mx-auto animate-[spin_3s_linear_infinite]">
                            <div className="w-24 h-24 border border-cyan-600 rounded-full border-dashed" />
                        </div>
                        <Fingerprint className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-black tracking-[0.5em] mb-2 uppercase">Authenticating</h2>
                    <p className="text-xs text-cyan-700">SHIELD CLEARANCE LEVEL 8 REQUIRED</p>
                </motion.div>
            )}

            {/* Phase 2: Biometric Scan & Prep */}
            {phase === 'SCAN' && (
                <motion.div className="absolute inset-0 flex items-center justify-center z-20">
                    <motion.div
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="w-full bg-cyan-900/20 border-y border-cyan-500/50 absolute top-0"
                    />
                    <div className="relative z-30 text-center">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-widest uppercase mb-4">
                            {heroId.replace('-', ' ')}
                        </div>
                        <div className="flex justify-center gap-4 text-xs text-cyan-400 font-bold">
                            <span className="border border-cyan-500/30 px-2 py-1 bg-black/50">ARMOR: 100%</span>
                            <span className="border border-cyan-500/30 px-2 py-1 bg-black/50">WEAPONS: ONLINE</span>
                            <span className="border border-cyan-500/30 px-2 py-1 bg-black/50">VITALS: STABLE</span>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Phase 3: Hero Specific Action */}
            {phase === 'DEPLOY' && (
                <motion.div className="absolute inset-0 z-30">
                    <HeroSequence heroId={heroId} />
                </motion.div>
            )}

            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[4px] border-cyan-900/10 rounded-3xl" />
            <div className="absolute top-10 left-10 text-[10px] text-cyan-800 font-bold">
                SEQ: {Math.random().toString(36).substring(7).toUpperCase()}<br />
                T-MINUS: {(5.5 - (phase === 'INIT' ? 0 : phase === 'SCAN' ? 1.5 : 3)).toFixed(2)}s
            </div>
        </div>
    );
};

const HeroSequence = ({ heroId }: { heroId: string }) => {
    switch (heroId) {
        case "iron-man":
            return <IronManFrame />;
        case "captain-america":
            return <CapFrame />;
        case "thor":
            return <ThorFrame />;
        case "hulk":
            return <HulkFrame />;
        case "black-widow":
            return <WidowFrame />;
        case "hawkeye":
            return <HawkeyeFrame />;
        default:
            return <div className="text-white text-center mt-64">DEPLOYING...</div>;
    }
};

const IronManFrame = () => (
    <div className="h-full w-full flex items-center justify-center bg-red-950/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="relative z-10"
        >
            <div className="w-64 h-64 border-4 border-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_red] bg-black/50 backdrop-blur-md">
                <div className="w-48 h-48 border-2 border-red-400 rounded-full animate-spin-slow border-dashed" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-cyan-400 rounded-full shadow-[0_0_80px_cyan] animate-pulse" />
                </div>
            </div>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-8"
            >
                <div className="text-red-500 font-black text-6xl tracking-tighter uppercase italic">MARK 85</div>
                <div className="text-cyan-400 text-sm tracking-[1em] uppercase mt-2">Repulsors Primed</div>
            </motion.div>
        </motion.div>

        {/* HUD UI */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-50">
                <circle cx="50%" cy="50%" r="300" stroke="cyan" strokeWidth="1" fill="none" strokeDasharray="10 20" className="animate-[spin_10s_linear_infinite]" />
                <path d="M0,50% L100%,50%" stroke="cyan" strokeWidth="0.5" />
                <path d="M50%,0 L50%,100%" stroke="cyan" strokeWidth="0.5" />
            </svg>
        </div>
    </div>
);

const CapFrame = () => (
    <div className="h-full w-full flex items-center justify-center bg-blue-950/30 relative">
        <motion.div
            initial={{ x: -1500, rotate: -720 }}
            animate={{ x: 0, rotate: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="z-10"
        >
            <div className="w-80 h-80 rounded-full bg-white flex items-center justify-center shadow-[0_10px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                <div className="absolute inset-0 border-[40px] border-red-600 rounded-full" />
                <div className="absolute inset-0 border-[40px] border-transparent rounded-full" /> {/* Spacer */}
                <div className="w-48 h-48 bg-blue-700 rounded-full flex items-center justify-center shadow-inner">
                    <div className="text-white text-9xl font-black mt-[-10px]">★</div>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent skew-x-12" />
            </div>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="absolute bottom-20 text-white font-black uppercase text-5xl tracking-widest drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
        >
            Stand Together
        </motion.div>
    </div>
);

const ThorFrame = () => (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Lightning flashes */}
        <motion.div
            animate={{ opacity: [0, 1, 0, 0.5, 0] }}
            transition={{ duration: 0.2, repeat: 9999, repeatType: "loop", repeatDelay: 0.5 }}
            className="absolute inset-0 bg-white"
        />
        <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="z-10 relative"
        >
            <Zap className="w-96 h-96 text-yellow-400 drop-shadow-[0_0_50px_yellow]" />
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.1, repeat: 9999, repeatType: "loop" }}
                className="absolute inset-0 bg-yellow-400 mix-blend-overlay blur-xl"
            />
        </motion.div>
        <div className="absolute bottom-10 left-0 right-0 text-center">
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 uppercase tracking-tighter">THUNDER</div>
        </div>
    </div>
);

const HulkFrame = () => (
    <div className="h-full w-full bg-green-950 flex items-center justify-center relative overflow-hidden">
        <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
            transition={{ duration: 0.2, repeat: 9999, repeatType: "loop" }}
            className="z-10 flex flex-col items-center"
        >
            <div className="text-[200px] font-black text-green-500 leading-none drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]">HULK</div>
            <div className="text-[150px] font-black text-white leading-none -mt-10 rotate-[-5deg] drop-shadow-[0_10px_0_rgba(0,0,0,0.5)]">SMASH</div>
        </motion.div>
        {/* Cracks */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cracked-ground.png')]" />
    </div>
);

const WidowFrame = () => (
    <div className="h-full w-full bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: 9999, repeatType: "loop" }}
                className="w-[600px] h-[600px] border border-red-900/30 rounded-full border-dashed"
            />
        </div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="z-10 text-center"
        >
            <div className="w-32 h-32 mx-auto mb-8 relative">
                <div className="absolute inset-0 border-t-2 border-red-600 rounded-full animate-spin" />
                <Fingerprint className="w-full h-full text-red-600 p-4" />
            </div>
            <div className="text-red-600 font-mono tracking-[1em] text-lg uppercase bg-black px-4 py-2 border border-red-600/50">
                Lethal Force
            </div>
        </motion.div>
    </div>
);

const HawkeyeFrame = () => (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <motion.div
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-[80vw] h-[80vw] border border-purple-500/20 rounded-full"
            />
            <motion.div
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-[60vw] h-[60vw] border border-purple-500/20 rounded-full absolute"
            />
        </motion.div>

        <motion.div
            initial={{ scale: 5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="z-10 relative"
        >
            <Target className="w-48 h-48 text-purple-500" />
            <motion.div
                className="absolute inset-0 border-4 border-purple-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: 9999, repeatType: "loop" }}
            />
        </motion.div>

        <div className="absolute bottom-20 flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
                <motion.div
                    key={i}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="w-4 h-16 bg-purple-900 border border-purple-500 rounded-t"
                />
            ))}
        </div>
    </div>
);
