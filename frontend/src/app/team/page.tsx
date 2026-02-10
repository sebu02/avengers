"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Activity, LocateFixed, Target, User } from "lucide-react";
import clsx from "clsx";
import { DeploymentAnimation } from "@/components/DeploymentAnimations";
import AvengerInventory from "@/components/AvengerInventory";

const avengers = [
    {
        id: "iron-man",
        name: "Tony Stark",
        alias: "Iron Man",
        role: "Tech Consultant / Armored Avenger",
        status: "Active",
        image: "https://placehold.co/400x500/991b1b/FFF?text=Iron+Man",
        color: "from-red-600 to-yellow-500",
        icon: Shield,
        stats: { strength: 85, intelligence: 100, speed: 90, tech: 100 }
    },
    {
        id: "captain-america",
        name: "Steve Rogers",
        alias: "Captain America",
        role: "Team Leader / Super Soldier",
        status: "Active",
        image: "https://placehold.co/400x500/1e40af/FFF?text=Captain+America",
        color: "from-blue-700 to-red-600",
        icon: Shield,
        stats: { strength: 90, intelligence: 85, speed: 80, combat: 100 }
    },
    {
        id: "thor",
        name: "Thor Odinson",
        alias: "God of Thunder",
        role: "Asgardian Warrior",
        status: "Off-World",
        image: "https://placehold.co/400x500/581c87/FFF?text=Thor",
        color: "from-slate-700 to-yellow-400",
        icon: Zap,
        stats: { strength: 100, intelligence: 70, speed: 95, magic: 90 }
    },
    {
        id: "hulk",
        name: "Bruce Banner",
        alias: "The Hulk",
        role: "Scientist / Heavy Hitter",
        status: "Lab Containment",
        image: "https://placehold.co/400x500/15803d/FFF?text=Hulk",
        color: "from-green-700 to-green-500",
        icon: Activity,
        stats: { strength: 100, intelligence: 100, speed: 75, rage: 100 }
    },
    {
        id: "black-widow",
        name: "Natasha Romanoff",
        alias: "Black Widow",
        role: "Master Spy / Assassin",
        status: "Deep Cover",
        image: "https://placehold.co/400x500/0f172a/FFF?text=Black+Widow",
        color: "from-slate-900 to-red-600",
        icon: LocateFixed,
        stats: { strength: 60, intelligence: 90, speed: 85, stealth: 100 }
    },
    {
        id: "hawkeye",
        name: "Clint Barton",
        alias: "Hawkeye",
        role: "Marksman / Tactician",
        status: "Active",
        image: "https://placehold.co/400x500/6b21a8/FFF?text=Hawkeye",
        color: "from-purple-800 to-slate-800",
        icon: Target,
        stats: { strength: 65, intelligence: 80, speed: 80, accuracy: 100 }
    }
];



export default function TeamPage() {
    const [selectedHero, setSelectedHero] = useState<typeof avengers[0] | null>(null);
    const [deploying, setDeploying] = useState(false);
    const [view, setView] = useState<'PROFILE' | 'INVENTORY'>('PROFILE');

    const handleDeploy = () => {
        setDeploying(true);
    };

    const handleAnimationComplete = () => {
        setDeploying(false);
        setSelectedHero(null);
        setView('PROFILE');
    };

    const openHero = (hero: typeof avengers[0]) => {
        setSelectedHero(hero);
        setView('PROFILE');
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="relative overflow-hidden mb-12 border-b border-primary/20 pb-6">
                <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-primary to-transparent animate-pulse" />
                <h1 className="text-4xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-cyan-500 mb-2 flex items-center gap-4">
                    <Shield className="w-10 h-10 text-primary" />
                    Avengers Roster
                </h1>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase pl-14">
                    Authorized Personnel Identification | Level 7 Clearance
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {avengers.map((hero, index) => (
                    <motion.div
                        key={hero.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-card/40 border border-t-2 border-primary/20 backdrop-blur-md rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]"
                    >
                        {/* Top Accent Line */}
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${hero.color}`} />

                        <div className="relative h-64 overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-b ${hero.color} opacity-20 group-hover:opacity-30 transition-opacity z-10`} />

                            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-muted-foreground relative z-0">
                                <Image
                                    src={hero.image}
                                    alt={hero.alias}
                                    fill
                                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-20">
                                <h3 className="text-2xl font-black uppercase italic tracking-wider text-white drop-shadow-md">
                                    {hero.alias}
                                </h3>
                                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                                    {hero.name}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <hero.icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-xs font-mono text-muted-foreground uppercase">{hero.role}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs uppercase font-bold text-muted-foreground">
                                    <span>Status</span>
                                    <span className={clsx(
                                        hero.status === "Active" ? "text-green-500" :
                                            hero.status === "Off-World" ? "text-purple-400" :
                                                "text-yellow-500"
                                    )}>
                                        [{hero.status.toUpperCase()}]
                                    </span>
                                </div>
                                <div className="w-full bg-secondary/50 h-1 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${hero.color} w-full animate-pulse`} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-2">
                                {Object.entries(hero.stats).map(([stat, value]) => (
                                    <div key={stat} className="bg-secondary/20 p-2 rounded border border-white/5">
                                        <div className="text-[10px] uppercase text-muted-foreground mb-1">{stat}</div>
                                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-primary/70 rounded-full`}
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => openHero(hero)}
                                className="w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 text-xs font-bold uppercase py-2 tracking-widest transition-all hover:tracking-[0.2em] relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10">Access File</span>
                                <div className="absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Access File Modal */}
            <AnimatePresence>
                {selectedHero && (
                    <div className="fixed inset-0 z-[110] overflow-y-auto custom-scrollbar">
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                                onClick={() => !deploying && setSelectedHero(null)}
                            />
                            <motion.div
                                layoutId={`card-${selectedHero.id}`}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative z-10 w-full max-w-5xl bg-slate-950 border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.2)] flex flex-col md:flex-row max-h-[90vh]"
                            >
                                {/* Decorative Tech Lines */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                                {/* Full Screen Deployment Animation Overlay */}
                                {deploying && (
                                    <DeploymentAnimation
                                        heroId={selectedHero.id}
                                        onComplete={handleAnimationComplete}
                                    />
                                )}

                                {!deploying && (
                                    <button
                                        onClick={() => setSelectedHero(null)}
                                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:text-primary transition-colors border border-white/10"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}

                                {/* Image Section */}
                                <div className="w-full md:w-5/12 relative bg-slate-900 overflow-hidden min-h-[300px] md:min-h-full border-r border-white/5 shrink-0">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedHero.color} opacity-20`} />
                                    <Image
                                        src={selectedHero.image}
                                        alt={selectedHero.alias}
                                        fill
                                        className="object-cover opacity-90"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-10">
                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-4xl font-black uppercase italic tracking-wider text-white"
                                        >
                                            {selectedHero.alias}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-primary font-mono text-sm tracking-[0.2em] mt-2 uppercase"
                                        >
                                            Real Name: {selectedHero.name}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* Data Section */}
                                <div className="w-full md:w-7/12 p-8 overflow-y-auto bg-slate-950/95 relative flex flex-col">

                                    {/* Tabs */}
                                    <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
                                        <button
                                            onClick={() => setView('PROFILE')}
                                            className={clsx(
                                                "uppercase font-mono text-sm tracking-widest pb-2 border-b-2 transition-all",
                                                view === 'PROFILE' ? "border-primary text-white" : "border-transparent text-muted-foreground hover:text-white"
                                            )}
                                        >
                                            Profile Stats
                                        </button>
                                        <button
                                            onClick={() => setView('INVENTORY')}
                                            className={clsx(
                                                "uppercase font-mono text-sm tracking-widest pb-2 border-b-2 transition-all",
                                                view === 'INVENTORY' ? "border-primary text-white" : "border-transparent text-muted-foreground hover:text-white"
                                            )}
                                        >
                                            Gear & Loadout
                                        </button>
                                    </div>

                                    {view === 'PROFILE' ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                            <div>
                                                <h3 className="text-sm font-mono text-primary/70 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <Shield className="w-4 h-4" />
                                                    S.H.I.E.L.D. Profile
                                                </h3>
                                                <div className="grid grid-cols-2 gap-4 text-sm border-l-2 border-primary/20 pl-4">
                                                    <div>
                                                        <span className="block text-muted-foreground text-xs uppercase">Role</span>
                                                        <span className="text-white font-medium">{selectedHero.role}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-muted-foreground text-xs uppercase">Clearance</span>
                                                        <span className="text-white font-medium">Level 8</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-muted-foreground text-xs uppercase">Status</span>
                                                        <span className={clsx("font-bold",
                                                            selectedHero.status === "Active" ? "text-green-500" :
                                                                selectedHero.status === "Off-World" ? "text-purple-400" : "text-yellow-500"
                                                        )}>{selectedHero.status}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-muted-foreground text-xs uppercase">ID</span>
                                                        <span className="text-white font-mono">AV-{selectedHero.id.substring(0, 3).toUpperCase()}-99</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-mono text-primary/70 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <Activity className="w-4 h-4" />
                                                    Power Grid
                                                </h3>
                                                <div className="space-y-4">
                                                    {Object.entries(selectedHero.stats).map(([stat, value], i) => (
                                                        <div key={stat}>
                                                            <div className="flex justify-between text-xs uppercase mb-1">
                                                                <span className="text-muted-foreground">{stat}</span>
                                                                <span className="text-primary font-mono">{value}%</span>
                                                            </div>
                                                            <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${value}%` }}
                                                                    transition={{ delay: 0.4 + (i * 0.1), duration: 1 }}
                                                                    className={`h-full bg-gradient-to-r ${selectedHero.color}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="border-t border-white/10 pt-6">
                                                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">Capabilities</h3>
                                                <p className="text-sm text-gray-400 leading-relaxed font-mono">
                                                    Subject demonstrates exceptional abilities consistent with [REDACTED] classification. Recommended for high-priority missions requiring specialized intervention.
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <AvengerInventory heroId={selectedHero.id} color={selectedHero.color} />
                                    )}

                                    <div className="mt-auto pt-6">
                                        <button
                                            onClick={handleDeploy}
                                            disabled={deploying}
                                            className="w-full py-4 border border-primary/30 text-primary uppercase font-bold tracking-[0.2em] hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Target className="w-4 h-4" />
                                            Initiate Deployment
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
