"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu, Zap, Shield, Radio, Wifi, Activity, Heart, Brain, Eye,
    Phone, DollarSign, Building, Globe, Clock, Users, Target,
    AlertTriangle, CheckCircle, TrendingUp, TrendingDown, BarChart3,
    PieChart, Rocket, Wrench, Package, MessageSquare, Send, Mic,
    Volume2, Settings, Power, Lock, Unlock, Flame, Snowflake,
    Wind, Droplet, Sparkles, Star, Crown, Skull, User, MapPin,
    Gauge, Layers, Hexagon, Circle, Square, Triangle, Octagon, X
} from "lucide-react";
import clsx from "clsx";
import { ArcReactorCard } from "./ArcReactor";
import { QuickActionsCard } from "./QuickActions";
import { FinancialCard } from "./FinancialCard";
import { MaintenanceModal, HappyCallModal, USControlModal, StarkIndustriesModal, ManageAccountsModal } from "./JarvisModals";
import { SuitDeploymentAnimations } from "./SuitAnimations";

// Iron Man Suits Database with unique icons
const IRON_MAN_SUITS = [
    {
        id: "mark-85",
        name: "Mark 85",
        status: "ACTIVE",
        power: 100,
        damage: 0,
        special: "Nano-Tech",
        color: "red",
        icon: Hexagon,
        description: "The ultimate armor with lightning refocuser and energy blade capabilities."
    },
    {
        id: "mark-50",
        name: "Mark 50",
        status: "STANDBY",
        power: 95,
        damage: 15,
        special: "Bleeding Edge",
        color: "red",
        icon: Octagon,
        description: "Bleeding Edge nano-technology armor from the Infinity War."
    },
    {
        id: "mark-42",
        name: "Mark 42",
        status: "REPAIR",
        power: 60,
        damage: 45,
        special: "Extremis",
        color: "orange",
        icon: Triangle,
        description: "Autonomous prehensile propulsion suit with independent piece control."
    },
    {
        id: "hulkbuster",
        name: "Hulkbuster",
        status: "READY",
        power: 100,
        damage: 0,
        special: "Heavy Assault",
        color: "orange",
        icon: Square,
        description: "Veronica deployment system for Hulk-level threat containment."
    },
    {
        id: "stealth",
        name: "Stealth Suit",
        status: "ACTIVE",
        power: 88,
        damage: 5,
        special: "Cloaking",
        color: "slate",
        icon: Circle,
        description: "Advanced optical camouflage for covert operations."
    },
    {
        id: "space",
        name: "Space Armor",
        status: "STANDBY",
        power: 92,
        damage: 10,
        special: "Zero-G",
        color: "blue",
        icon: Star,
        description: "Designed for extraterrestrial combat and space travel."
    },
];

// Enemies Database
const ENEMIES = [
    { name: "Obadiah Stane", threat: "NEUTRALIZED", lastSeen: "2008", status: "Deceased" },
    { name: "Ivan Vanko", threat: "NEUTRALIZED", lastSeen: "2010", status: "Deceased" },
    { name: "Aldrich Killian", threat: "NEUTRALIZED", lastSeen: "2013", status: "Deceased" },
    { name: "Ultron", threat: "ACTIVE", lastSeen: "2015", status: "Fragments Detected" },
    { name: "Thanos", threat: "NEUTRALIZED", lastSeen: "2023", status: "Deceased" },
];

// Inventory Items
const INVENTORY = [
    { name: "Arc Reactors", quantity: 47, status: "OPTIMAL" },
    { name: "Repulsor Units", quantity: 156, status: "OPTIMAL" },
    { name: "Nano-Particles", quantity: 2847000, status: "LOW" },
    { name: "Unibeam Cores", quantity: 12, status: "OPTIMAL" },
    { name: "Flight Stabilizers", quantity: 89, status: "OPTIMAL" },
];

export default function JarvisPage() {
    const [selectedAI, setSelectedAI] = useState<'jarvis' | 'friday'>('jarvis');
    const [chatMessages, setChatMessages] = useState<any[]>([
        { sender: 'jarvis', text: 'Good evening, Sir. All systems operational.' }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [arcReactorPower, setArcReactorPower] = useState(97);
    const [selectedSuit, setSelectedSuit] = useState<string | null>(null);
    const [deployingSuit, setDeployingSuit] = useState<string | null>(null);
    const [showTimeTravel, setShowTimeTravel] = useState(false);
    const [showMaintenance, setShowMaintenance] = useState(false);
    const [showHappyCall, setShowHappyCall] = useState(false);
    const [showUSControl, setShowUSControl] = useState(false);
    const [showStarkIndustries, setShowStarkIndustries] = useState(false);
    const [showManageAccounts, setShowManageAccounts] = useState(false);
    const [bankBalance, setBankBalance] = useState(12847500000);
    const [stockPrice, setStockPrice] = useState(487.32);
    const chatScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        setChatMessages(prev => [...prev, { sender: 'user', text: inputMessage }]);

        setTimeout(() => {
            const responses = selectedAI === 'jarvis'
                ? [
                    "Right away, Sir.",
                    "Certainly, Mr. Stark.",
                    "Processing your request.",
                    "Systems updated, Sir.",
                    "As you wish."
                ]
                : [
                    "On it, boss!",
                    "You got it!",
                    "Already done!",
                    "Consider it handled.",
                    "No problem!"
                ];
            setChatMessages(prev => [...prev, {
                sender: selectedAI,
                text: responses[Math.floor(Math.random() * responses.length)]
            }]);
        }, 1000);

        setInputMessage("");
    };

    const deploySuit = (suitId: string) => {
        setDeployingSuit(suitId);
        setTimeout(() => setDeployingSuit(null), 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-yellow-950 p-6 font-mono relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Arc Reactor Glow */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
            />

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 mb-6"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="relative"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: 9999, repeatType: "loop", ease: "linear" }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.8)]">
                                <Cpu className="w-8 h-8 text-white" />
                            </div>
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-cyan-500"
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                                transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                            />
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-red-500">
                                {selectedAI === 'jarvis' ? 'J.A.R.V.I.S.' : 'F.R.I.D.A.Y.'}
                            </h1>
                            <p className="text-xs text-cyan-600 tracking-[0.3em]">
                                {selectedAI === 'jarvis'
                                    ? 'JUST A RATHER VERY INTELLIGENT SYSTEM'
                                    : 'FEMALE REPLACEMENT INTELLIGENT DIGITAL ASSISTANT YOUTH'}
                            </p>
                        </div>
                    </div>

                    {/* AI Selector */}
                    <div className="flex gap-2 bg-black/60 p-1.5 rounded-xl border border-cyan-500/30 self-start md:self-auto">
                        <button
                            onClick={() => setSelectedAI('jarvis')}
                            className={clsx(
                                "flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg font-bold text-[10px] md:text-sm transition-all",
                                selectedAI === 'jarvis'
                                    ? "bg-cyan-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                                    : "bg-transparent text-gray-400 hover:text-cyan-400"
                            )}
                        >
                            JARVIS
                        </button>
                        <button
                            onClick={() => setSelectedAI('friday')}
                            className={clsx(
                                "flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg font-bold text-[10px] md:text-sm transition-all",
                                selectedAI === 'friday'
                                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                                    : "bg-transparent text-gray-400 hover:text-purple-400"
                            )}
                        >
                            FRIDAY
                        </button>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Arc Reactor Status */}
                    <ArcReactorCard
                        power={arcReactorPower}
                        onMaintenance={() => setShowMaintenance(true)}
                    />

                    {/* Quick Actions */}
                    <QuickActionsCard
                        onTimeTravel={() => setShowTimeTravel(true)}
                        onCallHappy={() => setShowHappyCall(true)}
                        onUSControl={() => setShowUSControl(true)}
                        onStarkIndustries={() => setShowStarkIndustries(true)}
                    />

                    {/* Enemies List */}
                    <EnemiesCard enemies={ENEMIES} />
                </div>

                {/* Center Column */}
                <div className="lg:col-span-6 space-y-6">
                    {/* AI Chat */}
                    <AIChatCard
                        selectedAI={selectedAI}
                        messages={chatMessages}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        sendMessage={sendMessage}
                        chatScrollRef={chatScrollRef}
                    />

                    {/* Iron Man Suits */}
                    <SuitsCard
                        suits={IRON_MAN_SUITS}
                        selectedSuit={selectedSuit}
                        setSelectedSuit={setSelectedSuit}
                        deploySuit={deploySuit}
                    />

                    {/* Inventory */}
                    <InventoryCard inventory={INVENTORY} />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-3 space-y-6 order-last lg:order-none">
                    {/* Financial Dashboard */}
                    <FinancialCard
                        balance={bankBalance}
                        stockPrice={stockPrice}
                        onManageAccounts={() => setShowManageAccounts(true)}
                    />

                    {/* Control Panel */}
                    <ControlPanelCard />

                    {/* Stats */}
                    <StatsCard />
                </div>
            </div>

            {/* Suit Deployment Animation */}
            <AnimatePresence>
                {deployingSuit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black"
                    >
                        <SuitDeploymentAnimations suit={IRON_MAN_SUITS.find(s => s.id === deployingSuit)!} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* All Modals */}
            <AnimatePresence>
                {showTimeTravel && <TimeTravelModal onClose={() => setShowTimeTravel(false)} />}
                {showMaintenance && <MaintenanceModal onClose={() => setShowMaintenance(false)} />}
                {showHappyCall && <HappyCallModal onClose={() => setShowHappyCall(false)} />}
                {showUSControl && <USControlModal onClose={() => setShowUSControl(false)} />}
                {showStarkIndustries && <StarkIndustriesModal onClose={() => setShowStarkIndustries(false)} />}
                {showManageAccounts && <ManageAccountsModal onClose={() => setShowManageAccounts(false)} />}
            </AnimatePresence>
        </div>
    );
}

// Enemies Card
const EnemiesCard = ({ enemies }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/60 border-2 border-red-500 rounded-xl p-4 backdrop-blur-md"
    >
        <h3 className="text-xs font-bold text-red-400 tracking-wider mb-4 flex items-center gap-2">
            <Skull className="w-4 h-4" />
            KNOWN THREATS
        </h3>

        <div className="space-y-2 max-h-64 overflow-y-auto">
            {enemies.map((enemy: any, i: number) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2 bg-red-950/30 border border-red-900/50 rounded text-[10px]"
                >
                    <div className="font-bold text-white">{enemy.name}</div>
                    <div className="flex justify-between mt-1">
                        <span className="text-gray-400">Status:</span>
                        <span className={clsx(
                            "font-bold",
                            enemy.threat === 'NEUTRALIZED' ? 'text-green-500' : 'text-red-500'
                        )}>{enemy.threat}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

// AI Chat Card
const AIChatCard = ({ selectedAI, messages, inputMessage, setInputMessage, sendMessage, chatScrollRef }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
            "bg-black/60 border-2 rounded-xl p-4 backdrop-blur-md",
            selectedAI === 'jarvis' ? 'border-cyan-500' : 'border-purple-500'
        )}
    >
        <h3 className={clsx(
            "text-xs font-bold tracking-wider mb-4 flex items-center gap-2",
            selectedAI === 'jarvis' ? 'text-cyan-400' : 'text-purple-400'
        )}>
            <MessageSquare className="w-4 h-4" />
            AI ASSISTANT
        </h3>

        {/* Chat Messages */}
        <div ref={chatScrollRef} className="h-64 overflow-y-auto mb-4 space-y-2">
            {messages.map((msg: any, i: number) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={clsx(
                        "p-3 rounded-lg max-w-[80%]",
                        msg.sender === 'user'
                            ? 'ml-auto bg-blue-600 text-white'
                            : selectedAI === 'jarvis'
                                ? 'bg-cyan-600/20 border border-cyan-500/50 text-cyan-100'
                                : 'bg-purple-600/20 border border-purple-500/50 text-purple-100'
                    )}
                >
                    <div className="text-xs">{msg.text}</div>
                </motion.div>
            ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Message ${selectedAI === 'jarvis' ? 'JARVIS' : 'FRIDAY'}...`}
                className={clsx(
                    "flex-1 bg-black/50 border-2 px-4 py-2 rounded-lg text-sm focus:outline-none transition-all",
                    selectedAI === 'jarvis'
                        ? 'border-cyan-500/50 text-cyan-100 focus:border-cyan-500'
                        : 'border-purple-500/50 text-purple-100 focus:border-purple-500'
                )}
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                className={clsx(
                    "px-4 py-2 rounded-lg font-bold text-white transition-all",
                    selectedAI === 'jarvis' ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-purple-600 hover:bg-purple-500'
                )}
            >
                <Send className="w-4 h-4" />
            </motion.button>
        </div>
    </motion.div>
);

// Suits Card
const SuitsCard = ({ suits, selectedSuit, setSelectedSuit, deploySuit }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/60 border-2 border-red-500 rounded-xl p-4 backdrop-blur-md"
    >
        <h3 className="text-xs font-bold text-red-400 tracking-wider mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            IRON MAN SUITS
        </h3>

        <div className="grid grid-cols-3 gap-3">
            {suits.map((suit: any, i: number) => (
                <motion.div
                    key={suit.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedSuit(selectedSuit === suit.id ? null : suit.id)}
                    className={clsx(
                        "p-3 rounded-lg border-2 cursor-pointer transition-all relative overflow-hidden",
                        selectedSuit === suit.id
                            ? `border-${suit.color}-500 bg-${suit.color}-500/20`
                            : 'border-gray-700 bg-black/30 hover:border-gray-500'
                    )}
                >
                    {/* Suit Icon */}
                    <div className={clsx("w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center", `bg-${suit.color}-500/20 border-2 border-${suit.color}-500`)}>
                        <Shield className={clsx("w-6 h-6", `text-${suit.color}-500`)} />
                    </div>

                    {/* Suit Name */}
                    <div className="text-[10px] font-bold text-white text-center mb-1">{suit.name}</div>

                    {/* Status */}
                    <div className={clsx(
                        "text-[8px] font-bold text-center mb-2",
                        suit.status === 'ACTIVE' ? 'text-green-500' :
                            suit.status === 'READY' ? 'text-cyan-500' :
                                suit.status === 'STANDBY' ? 'text-yellow-500' : 'text-red-500'
                    )}>
                        {suit.status}
                    </div>

                    {/* Power Bar */}
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden mb-2">
                        <motion.div
                            className={`h-full bg-${suit.color}-500`}
                            initial={{ width: 0 }}
                            animate={{ width: `${suit.power}%` }}
                            transition={{ delay: i * 0.1 + 0.5 }}
                        />
                    </div>

                    {/* Deploy Button */}
                    {selectedSuit === suit.id && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                deploySuit(suit.id);
                            }}
                            className={clsx(
                                "w-full py-1 rounded text-[8px] font-bold text-white transition-all",
                                `bg-${suit.color}-600 hover:bg-${suit.color}-500`
                            )}
                        >
                            DEPLOY
                        </motion.button>
                    )}
                </motion.div>
            ))}
        </div>
    </motion.div>
);

// Inventory Card
const InventoryCard = ({ inventory }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/60 border-2 border-yellow-500 rounded-xl p-4 backdrop-blur-md"
    >
        <h3 className="text-xs font-bold text-yellow-400 tracking-wider mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            INVENTORY
        </h3>

        <div className="space-y-2">
            {inventory.map((item: any, i: number) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2 bg-yellow-950/20 border border-yellow-900/50 rounded"
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className={clsx(
                            "text-[8px] font-bold px-2 py-0.5 rounded",
                            item.status === 'OPTIMAL' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                        )}>
                            {item.status}
                        </span>
                    </div>
                    <div className="text-[10px] text-yellow-400 font-bold">{item.quantity.toLocaleString()} units</div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

// Control Panel Card
const ControlPanelCard = () => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/60 border-2 border-blue-500 rounded-xl p-4 backdrop-blur-md"
    >
        <h3 className="text-xs font-bold text-blue-400 tracking-wider mb-4">CONTROL PANEL</h3>

        <div className="space-y-2">
            <ControlButton icon={Shield} label="DEFENSE GRID" active={true} />
            <ControlButton icon={Zap} label="POWER SYSTEMS" active={true} />
            <ControlButton icon={Radio} label="COMMUNICATIONS" active={true} />
            <ControlButton icon={Eye} label="SURVEILLANCE" active={false} />
        </div>
    </motion.div>
);

const ControlButton = ({ icon: Icon, label, active }: any) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={clsx(
            "w-full p-2 rounded-lg border-2 transition-all flex items-center gap-2",
            active
                ? 'border-green-500 bg-green-500/10 text-green-500'
                : 'border-gray-700 bg-black/30 text-gray-500'
        )}
    >
        <Icon className="w-4 h-4" />
        <span className="text-xs font-bold flex-1 text-left">{label}</span>
        <div className={clsx("w-2 h-2 rounded-full", active ? 'bg-green-500 animate-pulse' : 'bg-gray-500')} />
    </motion.button>
);

// Stats Card
const StatsCard = () => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/60 border-2 border-purple-500 rounded-xl p-4 backdrop-blur-md"
    >
        <h3 className="text-xs font-bold text-purple-400 tracking-wider mb-4">STATISTICS</h3>

        <div className="space-y-3">
            <StatItem label="MISSIONS" value="847" color="cyan" />
            <StatItem label="SAVES" value="12,847" color="green" />
            <StatItem label="FLIGHT HOURS" value="4,521" color="blue" />
            <StatItem label="REPAIRS" value="234" color="yellow" />
        </div>
    </motion.div>
);

const StatItem = ({ label, value, color }: any) => (
    <div className="flex justify-between items-center">
        <span className="text-[10px] text-gray-400">{label}</span>
        <span className={clsx("text-sm font-black", `text-${color}-500`)}>{value}</span>
    </div>
);

// Time Travel Modal
const TimeTravelModal = ({ onClose }: any) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-purple-600 rounded-xl p-8 max-w-2xl w-full"
        >
            <h2 className="text-3xl font-black text-purple-500 mb-6 text-center">QUANTUM TIME TRAVEL</h2>

            {/* Time Loop Visual */}
            <div className="relative h-64 mb-6">
                <motion.div
                    className="absolute inset-0 border-4 border-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: 9999, repeatType: "loop", ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-8 border-4 border-cyan-500 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: 9999, repeatType: "loop", ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-16 border-4 border-blue-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: 9999, repeatType: "loop", ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Clock className="w-32 h-32 text-purple-500" />
                </div>
            </div>

            {/* Year Selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[2012, 2014, 2018, 2023, 2025, 2030].map((year) => (
                    <motion.button
                        key={year}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-all"
                    >
                        {year}
                    </motion.button>
                ))}
            </div>

            <button
                onClick={onClose}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-all"
            >
                CLOSE
            </button>
        </motion.div>
    </motion.div>
);
