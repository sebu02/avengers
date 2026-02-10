"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Rocket, Zap, Target, Crosshair, Shield, Skull, Flame, Eye,
    Radio, Satellite, Wifi, Activity, AlertTriangle, Lock, Unlock,
    ChevronDown, ChevronUp, Play, Pause, RotateCw, Users, Plane,
    Siren, ShieldAlert, Radar, Gauge, TrendingUp, MapPin, Globe
} from "lucide-react";
import clsx from "clsx";

// Weapons Arsenal Database
const WEAPONS = [
    {
        id: "missile-launcher",
        name: "Jericho Missile System",
        category: "BALLISTIC",
        status: "ARMED",
        readyTime: 45,
        range: "500 km",
        damage: 9500,
        impact: "CATASTROPHIC",
        kills: 0,
        targets: ["Chitauri Army", "HYDRA Bases", "Ultron Drones"],
        description: "Stark Industries' most devastating conventional weapon. Multiple warhead delivery system.",
        specs: {
            warheads: 16,
            yield: "500 tons TNT equivalent",
            guidance: "AI-Assisted Targeting",
            speed: "Mach 3.5"
        },
        color: "red",
        icon: Rocket,
        threat: "EXTREME"
    },
    {
        id: "hulkbuster",
        name: "Hulkbuster Mark XLIV",
        category: "ARMOR",
        status: "STANDBY",
        readyTime: 120,
        range: "Melee - 50m",
        damage: 8500,
        impact: "DEVASTATING",
        kills: 0,
        targets: ["Hulk", "Abomination", "Titan-Class Threats"],
        description: "Heavy-duty armor designed to contain and neutralize Hulk-level threats.",
        specs: {
            height: "11 feet",
            weight: "1,700 lbs",
            power: "Arc Reactor Mk. 50",
            strength: "Class 100+"
        },
        color: "orange",
        icon: Shield,
        threat: "HIGH"
    },
    {
        id: "spider-suit",
        name: "Iron Spider Armor",
        category: "ENHANCED SUIT",
        status: "READY",
        readyTime: 15,
        range: "Urban Combat",
        damage: 3500,
        impact: "PRECISION",
        kills: 0,
        targets: ["Street-Level Threats", "Tech Villains", "Drones"],
        description: "Stark-designed suit with mechanical waldoes and advanced web systems.",
        specs: {
            waldoes: "4 Mechanical Arms",
            webbing: "Nano-tech Enhanced",
            ai: "Karen AI Assistant",
            special: "Instant Kill Mode"
        },
        color: "blue",
        icon: Activity,
        threat: "MODERATE"
    },
    {
        id: "torpedo",
        name: "Mk. 48 ADCAP Torpedo",
        category: "NAVAL",
        status: "ARMED",
        readyTime: 30,
        range: "50 km underwater",
        damage: 7500,
        impact: "CRITICAL",
        kills: 0,
        targets: ["Submarines", "Naval Vessels", "Underwater Bases"],
        description: "Advanced capability torpedo with acoustic homing and wire guidance.",
        specs: {
            warhead: "650 lbs HBX",
            speed: "55 knots",
            depth: "1,200 meters",
            guidance: "Active/Passive Sonar"
        },
        color: "cyan",
        icon: Wifi,
        threat: "HIGH"
    },
    {
        id: "super-soldier",
        name: "Super Soldier Serum",
        category: "ENHANCEMENT",
        status: "RESTRICTED",
        readyTime: 0,
        range: "N/A",
        damage: 5000,
        impact: "TRANSFORMATIVE",
        kills: 0,
        targets: ["Personnel Enhancement"],
        description: "Erskine's formula for creating peak human specimens. Highly classified.",
        specs: {
            strength: "+800%",
            speed: "+600%",
            healing: "Enhanced",
            duration: "Permanent"
        },
        color: "purple",
        icon: Users,
        threat: "CLASSIFIED"
    },
    {
        id: "nuclear-bomb",
        name: "W87 Thermonuclear Warhead",
        category: "WMD",
        status: "LOCKED",
        readyTime: 300,
        range: "Intercontinental",
        damage: 99999,
        impact: "APOCALYPTIC",
        kills: 0,
        targets: ["Extinction-Level Threats", "Alien Motherships"],
        description: "Last resort weapon. Requires dual authorization from Director and World Security Council.",
        specs: {
            yield: "475 kilotons",
            blast: "15 km radius",
            fallout: "Extended",
            authorization: "Level 10 Required"
        },
        color: "red",
        icon: Skull,
        threat: "OMEGA"
    },
    {
        id: "laser-system",
        name: "Helicarrier Defense Grid",
        category: "ENERGY WEAPON",
        status: "ONLINE",
        readyTime: 5,
        range: "20 km",
        damage: 6500,
        impact: "PRECISION",
        kills: 0,
        targets: ["Aircraft", "Missiles", "Drones"],
        description: "Directed energy weapon system for point defense and anti-aircraft operations.",
        specs: {
            power: "50 Megawatts",
            cooldown: "0.5 seconds",
            accuracy: "99.7%",
            tracking: "Multi-target"
        },
        color: "green",
        icon: Zap,
        threat: "MODERATE"
    },
    {
        id: "orbital-cannon",
        name: "Project Insight Orbital Platform",
        category: "SPACE WEAPON",
        status: "STANDBY",
        readyTime: 180,
        range: "Global",
        damage: 15000,
        impact: "CATASTROPHIC",
        kills: 0,
        targets: ["Strategic Targets", "Carrier Groups", "Fortified Positions"],
        description: "Satellite-based kinetic bombardment system. Tungsten rods from orbit.",
        specs: {
            altitude: "400 km",
            projectile: "Tungsten Rod",
            velocity: "Mach 10",
            impact: "Equivalent to tactical nuke"
        },
        color: "purple",
        icon: Satellite,
        threat: "EXTREME"
    },
    {
        id: "proton-blaster",
        name: "Photon Cannon Array",
        category: "ENERGY WEAPON",
        status: "CHARGING",
        readyTime: 90,
        range: "100 km",
        damage: 12000,
        impact: "DEVASTATING",
        kills: 0,
        targets: ["Capital Ships", "Leviathans", "Titan-Class"],
        description: "Experimental photon-based weapon system derived from Tesseract technology.",
        specs: {
            energy: "Tesseract-Derived",
            beam: "Sustained/Pulse Mode",
            penetration: "All known materials",
            cooldown: "60 seconds"
        },
        color: "cyan",
        icon: Eye,
        threat: "EXTREME"
    },
    {
        id: "edith-drones",
        name: "E.D.I.T.H. Drone Network",
        category: "AUTONOMOUS",
        status: "READY",
        readyTime: 10,
        range: "Global",
        damage: 4500,
        impact: "COORDINATED",
        kills: 0,
        targets: ["Multiple Simultaneous Threats", "Surveillance", "Precision Strikes"],
        description: "Even Dead I'm The Hero - Stark's autonomous drone defense network.",
        specs: {
            units: "5,000+ Drones",
            ai: "Advanced Tactical AI",
            weapons: "Missiles, Lasers, EMP",
            coordination: "Swarm Intelligence"
        },
        color: "blue",
        icon: Radar,
        threat: "HIGH"
    }
];

export default function WeaponryPage() {
    const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
    const [launchingWeapon, setLaunchingWeapon] = useState<string | null>(null);
    const [authCode, setAuthCode] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingLaunch, setPendingLaunch] = useState<string | null>(null);

    const initiateWeaponLaunch = (weaponId: string) => {
        const weapon = WEAPONS.find(w => w.id === weaponId);
        if (weapon?.status === "LOCKED" || weapon?.threat === "OMEGA" || weapon?.threat === "EXTREME") {
            setPendingLaunch(weaponId);
            setShowAuthModal(true);
        } else {
            launchWeapon(weaponId);
        }
    };

    const launchWeapon = (weaponId: string) => {
        setLaunchingWeapon(weaponId);
        setShowAuthModal(false);
        setAuthCode("");

        setTimeout(() => {
            setLaunchingWeapon(null);
            setPendingLaunch(null);
        }, 8000);
    };

    const handleAuth = () => {
        if (authCode === "STARK" || authCode === "FURY" || authCode === "AVENGERS") {
            if (pendingLaunch) {
                launchWeapon(pendingLaunch);
            }
        }
    };

    const getThreatColor = (threat: string) => {
        switch (threat) {
            case "OMEGA": return "text-red-600 border-red-600 bg-red-600/10";
            case "EXTREME": return "text-orange-500 border-orange-500 bg-orange-500/10";
            case "HIGH": return "text-yellow-500 border-yellow-500 bg-yellow-500/10";
            case "MODERATE": return "text-blue-500 border-blue-500 bg-blue-500/10";
            case "CLASSIFIED": return "text-purple-500 border-purple-500 bg-purple-500/10";
            default: return "text-gray-500 border-gray-500 bg-gray-500/10";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "READY": return "bg-green-500";
            case "ARMED": return "bg-yellow-500 animate-pulse";
            case "ONLINE": return "bg-cyan-500";
            case "CHARGING": return "bg-blue-500";
            case "STANDBY": return "bg-gray-500";
            case "LOCKED": return "bg-red-500";
            case "RESTRICTED": return "bg-purple-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-6 font-mono relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Scanning Lines */}
            <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: 9999, repeatType: "loop", ease: "linear" }}
            />

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 mb-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <Target className="w-12 h-12 text-cyan-500 animate-pulse" />
                            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                                WEAPONS ARSENAL
                            </h1>
                        </div>
                        <p className="text-xs text-cyan-600 tracking-[0.3em] ml-16">STARK INDUSTRIES DEFENSE SYSTEMS</p>
                    </div>

                    {/* Arsenal Status */}
                    <div className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldAlert className="w-5 h-5 text-cyan-500" />
                            <span className="text-sm font-bold text-cyan-400">DEFENSE GRID ACTIVE</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-[10px]">
                            <div className="text-center">
                                <div className="text-gray-400">SYSTEMS</div>
                                <div className="text-white font-bold text-lg">{WEAPONS.length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400">READY</div>
                                <div className="text-green-500 font-bold text-lg">{WEAPONS.filter(w => w.status === 'READY' || w.status === 'ARMED').length}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400">DEPLOYED</div>
                                <div className="text-cyan-500 font-bold text-lg">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                {WEAPONS.map((weapon, index) => (
                    <WeaponCard
                        key={weapon.id}
                        weapon={weapon}
                        index={index}
                        isSelected={selectedWeapon === weapon.id}
                        onSelect={() => setSelectedWeapon(selectedWeapon === weapon.id ? null : weapon.id)}
                        onLaunch={() => initiateWeaponLaunch(weapon.id)}
                        getThreatColor={getThreatColor}
                        getStatusColor={getStatusColor}
                    />
                ))}
            </div>

            {/* Launch Animation Modal */}
            <AnimatePresence>
                {launchingWeapon && (
                    <LaunchAnimation
                        weapon={WEAPONS.find(w => w.id === launchingWeapon)!}
                    />
                )}
            </AnimatePresence>

            {/* Authorization Modal */}
            <AnimatePresence>
                {showAuthModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-slate-900 border-2 border-red-600 rounded-xl p-8 max-w-md w-full"
                        >
                            <div className="text-center mb-6">
                                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                                <h2 className="text-2xl font-black text-red-500 mb-2">AUTHORIZATION REQUIRED</h2>
                                <p className="text-sm text-gray-400">This weapon requires director-level clearance</p>
                            </div>

                            <input
                                type="password"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                placeholder="Enter Authorization Code"
                                className="w-full bg-black/50 border-2 border-red-600 text-red-500 p-4 text-center tracking-[0.5em] focus:outline-none focus:border-red-400 transition-colors rounded text-xl font-mono mb-4"
                                autoFocus
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowAuthModal(false);
                                        setPendingLaunch(null);
                                        setAuthCode("");
                                    }}
                                    className="flex-1 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-all"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleAuth}
                                    className="flex-1 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-all"
                                >
                                    AUTHORIZE
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Weapon Card Component
const WeaponCard = ({ weapon, index, isSelected, onSelect, onLaunch, getThreatColor, getStatusColor }: any) => {
    const IconComponent = weapon.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
        >
            <div className={clsx(
                "bg-gradient-to-br from-slate-900 to-slate-800 border-2 rounded-xl overflow-hidden transition-all duration-300",
                isSelected ? "border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]" : "border-cyan-900/30 hover:border-cyan-700"
            )}>
                {/* Header */}
                <div className="relative p-4 border-b border-cyan-900/30 bg-black/40">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className={clsx("p-3 rounded-lg border-2 bg-black/50", `border-${weapon.color}-500`)}>
                                <IconComponent className={clsx("w-6 h-6", `text-${weapon.color}-500`)} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white">{weapon.name}</h3>
                                <p className="text-xs text-gray-400">{weapon.category}</p>
                            </div>
                        </div>

                        {/* Threat Badge */}
                        <div className={clsx("px-3 py-1 rounded-full text-[10px] font-black border-2", getThreatColor(weapon.threat))}>
                            {weapon.threat}
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2">
                        <div className={clsx("w-2 h-2 rounded-full", getStatusColor(weapon.status))} />
                        <span className="text-[10px] text-cyan-400 font-bold">{weapon.status}</span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="relative p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1">DAMAGE</div>
                            <div className="text-sm font-bold text-red-500">{weapon.damage.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1">RANGE</div>
                            <div className="text-sm font-bold text-cyan-400">{weapon.range}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1">IMPACT</div>
                            <div className="text-sm font-bold text-orange-500">{weapon.impact}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 mb-1">READY TIME</div>
                            <div className="text-sm font-bold text-green-500">{weapon.readyTime}s</div>
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
                            <div className="p-4 bg-black/60 border-t border-cyan-900/30 space-y-4">
                                {/* Description */}
                                <div>
                                    <div className="text-[10px] text-gray-400 mb-1">DESCRIPTION</div>
                                    <p className="text-xs text-gray-300">{weapon.description}</p>
                                </div>

                                {/* Specifications */}
                                <div>
                                    <div className="text-[10px] text-gray-400 mb-2">SPECIFICATIONS</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(weapon.specs).map(([key, value]) => (
                                            <div key={key} className="bg-slate-800/50 p-2 rounded">
                                                <div className="text-[9px] text-gray-500 uppercase">{key}</div>
                                                <div className="text-[10px] text-white font-bold">{value as string}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Target Types */}
                                <div>
                                    <div className="text-[10px] text-gray-400 mb-2">EFFECTIVE AGAINST</div>
                                    <div className="flex flex-wrap gap-2">
                                        {weapon.targets.map((target: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-2 py-1 bg-red-500/20 border border-red-500/50 rounded text-[10px] text-red-400 font-bold"
                                            >
                                                {target}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Launch Button */}
                                <motion.button
                                    onClick={onLaunch}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={weapon.status === "LOCKED" && weapon.threat === "OMEGA"}
                                    className={clsx(
                                        "w-full py-3 rounded-lg font-black text-sm text-white transition-all flex items-center justify-center gap-2",
                                        weapon.status === "LOCKED" && weapon.threat === "OMEGA"
                                            ? "bg-gray-700 cursor-not-allowed"
                                            : "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
                                    )}
                                >
                                    <Play className="w-4 h-4" />
                                    {weapon.status === "LOCKED" ? "REQUIRES AUTHORIZATION" : "DEPLOY WEAPON"}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Launch Animation Component
const LaunchAnimation = ({ weapon }: { weapon: any }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Weapon-Specific Launch Animation */}
            {weapon.id === "missile-launcher" && <MissileLaunchAnim />}
            {weapon.id === "hulkbuster" && <HulkbusterDeployAnim />}
            {weapon.id === "spider-suit" && <SpiderSuitAnim />}
            {weapon.id === "torpedo" && <TorpedoLaunchAnim />}
            {weapon.id === "super-soldier" && <SuperSoldierAnim />}
            {weapon.id === "nuclear-bomb" && <NuclearLaunchAnim />}
            {weapon.id === "laser-system" && <LaserSystemAnim />}
            {weapon.id === "orbital-cannon" && <OrbitalCannonAnim />}
            {weapon.id === "proton-blaster" && <ProtonBlasterAnim />}
            {weapon.id === "edith-drones" && <EdithDronesAnim />}
        </motion.div>
    );
};

// Individual Weapon Animations
const MissileLaunchAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -1000, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4 }}
            className="absolute"
        >
            <Rocket className="w-32 h-32 text-red-500" />
            <motion.div
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-4 h-40 bg-gradient-to-b from-orange-500 via-red-500 to-transparent"
                animate={{ height: [40, 60, 40] }}
                transition={{ duration: 0.3, repeat: 9999, repeatType: "loop" }}
            />
        </motion.div>
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="text-red-500 text-6xl font-black"
        >
            IMPACT
        </motion.div>
    </div>
);

const HulkbusterDeployAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, rotate: i * 45 }}
                animate={{ scale: 1, rotate: i * 45 }}
                transition={{ delay: i * 0.2 }}
                className="absolute w-32 h-32 border-4 border-orange-500 rounded-lg"
            />
        ))}
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.5 }}
        >
            <Shield className="w-64 h-64 text-orange-500" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-orange-500 text-4xl font-black"
        >
            HULKBUSTER DEPLOYED
        </motion.div>
    </div>
);

const SpiderSuitAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-950 to-red-950">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                style={{ left: `${i * 5}%`, transform: `rotate(${i * 18}deg)` }}
            />
        ))}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
        >
            <Activity className="w-48 h-48 text-blue-500" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-20 text-blue-500 text-4xl font-black"
        >
            IRON SPIDER ACTIVE
        </motion.div>
    </div>
);

const TorpedoLaunchAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-cyan-950 to-blue-950">
        <motion.div
            initial={{ x: -500 }}
            animate={{ x: 500 }}
            transition={{ duration: 3 }}
            className="absolute"
        >
            <Wifi className="w-24 h-24 text-cyan-500 rotate-90" />
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-500 rounded-full"
                    style={{ left: -i * 10, top: 10 }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                />
            ))}
        </motion.div>
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 0] }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute right-20 w-32 h-32 border-4 border-cyan-500 rounded-full"
        />
    </div>
);

const SuperSoldierAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
        >
            <Users className="w-48 h-48 text-purple-500" />
        </motion.div>
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-64 h-64 border-2 border-purple-500 rounded-full"
                animate={{ scale: [1, 2], opacity: [1, 0] }}
                transition={{ delay: i * 0.5, duration: 1.5, repeat: 9999, repeatType: "loop" }}
            />
        ))}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-20 text-purple-500 text-4xl font-black"
        >
            ENHANCEMENT ACTIVE
        </motion.div>
    </div>
);

const NuclearLaunchAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-red-950">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 3] }}
            transition={{ duration: 4 }}
            className="absolute w-32 h-32 bg-orange-500 rounded-full blur-3xl"
        />
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 2] }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute w-64 h-64 border-8 border-red-500 rounded-full"
        />
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: -200 }}
            transition={{ delay: 1, duration: 2 }}
        >
            <Skull className="w-32 h-32 text-red-500" />
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute text-red-500 text-6xl font-black animate-pulse"
        >
            CRITICAL
        </motion.div>
    </div>
);

const LaserSystemAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.3, duration: 0.2 }}
                className="absolute h-2 w-full bg-green-500"
                style={{ top: `${20 + i * 15}%` }}
            />
        ))}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
        >
            <Zap className="w-48 h-48 text-green-500" />
        </motion.div>
    </div>
);

const OrbitalCannonAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-purple-950 to-black">
        <motion.div
            initial={{ y: -500 }}
            animate={{ y: 500 }}
            transition={{ duration: 2 }}
        >
            <Satellite className="w-32 h-32 text-purple-500" />
        </motion.div>
        <motion.div
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute w-4 bg-purple-500 blur-sm"
        />
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 3, opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 w-32 h-32 bg-purple-500 rounded-full blur-2xl"
        />
    </div>
);

const ProtonBlasterAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
        >
            <Eye className="w-64 h-64 text-cyan-500" />
        </motion.div>
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute h-8 bg-cyan-500 blur-md"
        />
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-500 rounded-full"
                animate={{
                    x: [0, (Math.random() - 0.5) * 1000],
                    y: [0, (Math.random() - 0.5) * 1000],
                    opacity: [1, 0]
                }}
                transition={{ delay: 1.5 + i * 0.05, duration: 1 }}
            />
        ))}
    </div>
);

const EdithDronesAnim = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                    scale: 1,
                    x: Math.cos(i * 0.5) * 300,
                    y: Math.sin(i * 0.5) * 300
                }}
                transition={{ delay: i * 0.05, duration: 1 }}
            >
                <Radar className="w-6 h-6 text-blue-500" />
            </motion.div>
        ))}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute text-blue-500 text-4xl font-black"
        >
            E.D.I.T.H. DEPLOYED
        </motion.div>
    </div>
);
