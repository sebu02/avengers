"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Radar, Battery, Shield, AlertTriangle, Radio, Database,
    Navigation, Crosshair, Phone, Power, Lock, Unlock,
    MapPin, Server, Activity, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, X, User, Utensils, Plane,
    Send, MessageSquare, ChevronDown, ChevronUp, FileText, UserCheck, PlaneTakeoff, PlaneLanding, Zap, Skull, Flame, ShieldAlert, Eye, EyeOff, Menu, Target, Rocket, Settings, Fingerprint
} from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { DeploymentAnimation } from "@/components/DeploymentAnimations";
import { SecurityModal } from "./SecurityModal";

const HEROES = [
    { id: "iron-man", name: "Iron Man", color: "text-red-500", bg: "bg-red-500/20", border: "border-red-500" },
    { id: "captain-america", name: "Captain America", color: "text-blue-500", bg: "bg-blue-500/20", border: "border-blue-500" },
    { id: "thor", name: "Thor", color: "text-yellow-500", bg: "bg-yellow-500/20", border: "border-yellow-500" },
    { id: "hulk", name: "Hulk", color: "text-green-500", bg: "bg-green-500/20", border: "border-green-500" },
    { id: "black-widow", name: "Black Widow", color: "text-slate-400", bg: "bg-slate-500/20", border: "border-slate-500" },
    { id: "hawkeye", name: "Hawkeye", color: "text-purple-500", bg: "bg-purple-500/20", border: "border-purple-500" },
];

const CIA_FILES = [
    { id: "WINTER SOLDIER", type: "DOSSIER", date: "1945-PRESENT" },
    { id: "PROJECT PEGASUS", type: "RESEARCH", date: "CLASSIFIED" },
    { id: "INITIATIVE 42", type: "PROTOCOL", date: "PENDING" },
    { id: "TAHITI", type: "RECOVERY", date: "LEVEL 10" }
];

export default function HelicarrierPage() {
    // --- State Management ---
    const [fuelLevels, setFuelLevels] = useState([98, 97, 99, 96]);
    const [missileBayOpen, setMissileBayOpen] = useState(false);
    const [launching, setLaunching] = useState(false);
    const [missilePhase, setMissilePhase] = useState<'idle' | 'targeting' | 'countdown' | 'firing' | 'impact'>('idle');

    // CIA Database
    const [ciaAccess, setCiaAccess] = useState(false);
    const [ciaCode, setCiaCode] = useState("");
    const [ciaLoginStatus, setCiaLoginStatus] = useState<'IDLE' | 'CHECKING' | 'GRANTED' | 'DENIED'>('IDLE');
    const [activeFile, setActiveFile] = useState<string | null>(null);

    // Comms & AI Chat
    const [furyCallStatus, setFuryCallStatus] = useState<'IDLE' | 'CALLING' | 'CONNECTED'>('IDLE');
    const [chatMessages, setChatMessages] = useState<{ sender: string, text: string }[]>([]);
    const [chatInput, setChatInput] = useState("");
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Controls
    const [mapZoom, setMapZoom] = useState(1);
    const [landingGear, setLandingGear] = useState(false); // false = UP, true = DOWN
    const [thrusterPower, setThrusterPower] = useState(75);
    const [mapView, setMapView] = useState<'SATELLITE' | 'TACTICAL'>('SATELLITE');
    const [eyesOnlyMode, setEyesOnlyMode] = useState(false);
    const [manualOverride, setManualOverride] = useState(false);

    // Ship Systems State
    const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, rotate: 0 });
    const [isStealth, setIsStealth] = useState(false);
    const [isShields, setIsShields] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Missile Security States
    const [securityStep, setSecurityStep] = useState<'idle' | 'biometric' | 'dualkey' | 'code' | 'authorized'>('idle');
    const [authCode, setAuthCode] = useState("");
    const [key1Turned, setKey1Turned] = useState(false);
    const [key2Turned, setKey2Turned] = useState(false);

    // Alerts
    const [activeAlerts, setActiveAlerts] = useState<string[]>([]);
    const [selfDestructing, setSelfDestructing] = useState(false);
    const [thrustWarning, setThrustWarning] = useState(false);

    // Deployment
    const [deployingHero, setDeployingHero] = useState<string | null>(null);

    // --- Effects ---
    // Simulate fuel fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setFuelLevels(prev => prev.map(l => Math.max(0, Math.min(100, l + (Math.random() * 2 - 1)))));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Thrust Warning Logic
    useEffect(() => {
        if (thrusterPower > 90) {
            setThrustWarning(true);
        } else {
            setThrustWarning(false);
        }
    }, [thrusterPower]);

    // Auto-scroll chat
    useEffect(() => {
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [chatMessages, isTyping]);

    // --- Handlers ---
    const handleMissileLaunch = () => {
        if (securityStep !== 'authorized') return;
        setLaunching(true);
        setMissilePhase('targeting');

        // Targeting lock
        setTimeout(() => setMissilePhase('countdown'), 1500);

        // Countdown
        setTimeout(() => setMissilePhase('firing'), 4000);

        // Impact
        setTimeout(() => setMissilePhase('impact'), 5500);

        // Reset
        setTimeout(() => {
            setMissilePhase('idle');
            setLaunching(false);
            setMissileBayOpen(false);
            setSecurityStep('idle');
            setKey1Turned(false);
            setKey2Turned(false);
            setAuthCode("");
        }, 7500);
    };

    const handleSecurityAuth = () => {
        if (securityStep === 'idle') {
            setSecurityStep('biometric');
            setTimeout(() => setSecurityStep('dualkey'), 2000);
        } else if (securityStep === 'dualkey' && key1Turned && key2Turned) {
            setSecurityStep('code');
        } else if (securityStep === 'code' && (authCode === 'FURY' || authCode === '1945' || authCode === 'AVENGERS')) {
            setSecurityStep('authorized');
            setMissileBayOpen(true);
        }
    };

    const handleCiaLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setCiaLoginStatus('CHECKING');
        setTimeout(() => {
            if (ciaCode === "FURY" || ciaCode === "AVENGERS" || ciaCode === "admin") {
                setCiaLoginStatus('GRANTED');
            } else {
                setCiaLoginStatus('DENIED');
                setTimeout(() => setCiaLoginStatus('IDLE'), 2000);
            }
        }, 1500);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatMessages(prev => [...prev, { sender: 'AGENT', text: userMsg }]);
        setChatInput("");
        setIsTyping(true);

        // Enhanced AI Response Logic
        setTimeout(() => {
            let reply = "Classified.";
            const params = userMsg.toLowerCase();

            const professionalResponses = [
                "I don't have time for this, Agent. Report status.",
                "Send the coordinates to Hill. I want eyes on it yesterday.",
                "The Council is breathing down my neck. Don't give me excuses, give me results.",
                "Authorization confirmed. Proceed with caution.",
                "We have a situation in Sector 4. Divert course.",
                "If you compromise this channel again, you'll be flying a cargo plane to Antarctica.",
                "Avengers are assembling. Hold your position.",
                "Intel suggests a leak. Trust no one.",
                "Standby. Encrypting transmission..."
            ];

            if (params.includes('shawarma')) reply = "I know a place. Second avenue. But focus first.";
            else if (params.includes('hydra')) reply = "Cut off one head... make sure you burn the rest.";
            else if (params.includes('status')) reply = "Systems green. But I want them better than green.";
            else {
                reply = professionalResponses[Math.floor(Math.random() * professionalResponses.length)];
            }

            setChatMessages(prev => [...prev, { sender: 'FURY', text: reply }]);
            setIsTyping(false);
        }, 2000);
    };

    const toggleAlert = (alertType: string) => {
        if (activeAlerts.includes(alertType)) {
            setActiveAlerts(prev => prev.filter(a => a !== alertType));
        } else {
            setActiveAlerts(prev => [...prev, alertType]);
        }
    };


    // Remote Control Logic
    const handleMove = (dx: number, dy: number, dr: number) => {
        if (!manualOverride) return;
        setShipPosition(prev => ({
            x: Math.max(-100, Math.min(100, prev.x + dx)),
            y: Math.max(-50, Math.min(50, prev.y + dy)),
            rotate: prev.rotate + dr
        }));
    };

    return (
        <div className={clsx("h-full font-mono relative overflow-hidden flex flex-col transition-colors duration-1000", selfDestructing ? "bg-red-950" : "bg-[#050b14] text-cyan-500")}>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050b14] to-black -z-10" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 -z-10" />

            {/* HEADER / TOP BAR */}
            <header className="flex justify-between items-center p-4 border-b border-cyan-500/30 bg-black/40 backdrop-blur-md z-20">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-2 border-cyan-500 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <Shield className="w-6 h-6 text-cyan-400" />
                        </div>
                        {activeAlerts.length > 0 && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />}
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-[0.3em] text-cyan-400 uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                            HELICARRIER 64
                        </h1>
                        <p className="text-[10px] text-cyan-700 tracking-widest uppercase">BRIDGE ACCESS // LEVEL 10</p>
                    </div>
                </div>

                {/* Top Status Indicators */}
                <div className="flex gap-6">
                    <div className="text-right">
                        <div className="text-[10px] text-cyan-700 uppercase">Reactor Core</div>
                        <div className="text-lg font-bold text-cyan-400">{fuelLevels[0]}%</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-cyan-700 uppercase">Altitude</div>
                        <div className="text-lg font-bold text-cyan-400">35,000 FT</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-cyan-700 uppercase">Speed</div>
                        <div className="text-lg font-bold text-cyan-400">MACH 0.8</div>
                    </div>
                </div>

                {/* Quick Toggles */}
                <div className="flex bg-black/50 border border-cyan-900/50 rounded p-1 gap-1">
                    <button onClick={() => setEyesOnlyMode(!eyesOnlyMode)} className={clsx("p-2 rounded transition-colors", eyesOnlyMode ? "bg-red-900/50 text-red-500" : "hover:bg-cyan-900/30 text-cyan-700")}>
                        <Eye size={16} />
                    </button>
                    <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded hover:bg-cyan-900/30 text-cyan-700"><Settings size={16} /></button>
                    <button onClick={() => setSelfDestructing(!selfDestructing)} className="p-2 rounded hover:bg-red-900/30 text-red-700 hover:text-red-500"><Power size={16} /></button>
                </div>
            </header>


            {/* MAIN CONTENT GRID */}
            <div className="flex-1 grid grid-cols-12 gap-4 p-4 min-h-0 relative z-10">

                {/* LEFT: TACTICAL & COMMS */}
                <div className="col-span-3 flex flex-col gap-4 min-h-0">
                    {/* Tactical Map */}
                    <div className="flex-1 bg-black/40 border border-cyan-500/30 rounded-lg overflow-hidden relative group flex flex-col">
                        <div className="bg-cyan-950/30 p-2 border-b border-cyan-500/30 flex justify-between items-center">
                            <span className="text-xs font-bold tracking-widest text-cyan-400">TACTICAL FEED</span>
                            <div className="flex gap-1">
                                <button onClick={() => setMapView('SATELLITE')} className={clsx("text-[8px] px-1 rounded", mapView === 'SATELLITE' ? "bg-cyan-500 text-black" : "bg-black text-cyan-500")}>SAT</button>
                                <button onClick={() => setMapView('TACTICAL')} className={clsx("text-[8px] px-1 rounded", mapView === 'TACTICAL' ? "bg-cyan-500 text-black" : "bg-black text-cyan-500")}>TAC</button>
                            </div>
                        </div>
                        <div className="flex-1 relative overflow-hidden">
                            <Image
                                src={mapView === 'SATELLITE' ? "https://placehold.co/400x400/0f172a/1e293b?text=High+Alt+Surveillance" : "https://placehold.co/400x400/000000/003300?text=Grid+Overlay"}
                                alt="Map"
                                fill
                                className={clsx("object-cover opacity-60", mapView === 'TACTICAL' && "invert opacity-80")}
                            />
                            {/* Map Markers */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10 shadow-[0_0_10px_blue]"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: 9999, repeatType: "loop" }}
                            />
                            {/* Enemy Marker */}
                            <motion.div
                                className="absolute top-[30%] left-[20%] w-3 h-3 bg-red-600 rounded-sm rotate-45"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.5, repeat: 9999, repeatType: "loop" }}
                            />
                        </div>
                    </div>

                    {/* Fury Chat - Realtime */}
                    <div className="h-1/2 bg-black/40 border border-cyan-500/30 rounded-lg flex flex-col overflow-hidden">
                        <div className="bg-cyan-950/30 p-2 border-b border-cyan-500/30 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-cyan-400">DIRECTOR FURY</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2 text-xs font-mono" ref={chatScrollRef}>
                            {chatMessages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={clsx("p-2 rounded max-w-[90%]", msg.sender === 'FURY' ? "bg-cyan-900/20 border-l-2 border-cyan-500 text-cyan-100 mr-auto" : "bg-blue-900/20 border-r-2 border-blue-500 text-blue-100 ml-auto text-right")}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            {isTyping && <div className="text-[10px] text-cyan-500 animate-pulse ml-2">Director Fury is typing...</div>}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-2 border-t border-cyan-500/30 flex gap-2">
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                className="w-full bg-black/50 border border-cyan-900 rounded px-2 py-1 text-xs text-cyan-100 placeholder-cyan-800 focus:outline-none focus:border-cyan-500"
                                placeholder="Send secure message..."
                            />
                        </form>
                    </div>
                </div>

                {/* CENTER: COMMAND DECK */}
                <div className="col-span-6 flex flex-col relative group">
                    {/* Main Viewport */}
                    <div className="flex-1 bg-black/80 border-2 border-cyan-500 rounded-xl relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/20 perspective-[2000px]">

                        {/* 3D Blueprint Container */}
                        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
                            <motion.div
                                className="relative w-[600px] h-[400px] transition-all duration-300"
                                animate={{
                                    rotateX: manualOverride ? 20 : 0,
                                    rotateY: manualOverride ? (shipPosition.x / 5) : 0, // Tilt based on movement
                                    scale: isStealth ? 0.9 : 1.1,
                                    opacity: isStealth ? 0.4 : 1,
                                    filter: isStealth ? "blur(2px) grayscale(100%)" : "none",
                                    x: manualOverride ? shipPosition.x : 0,
                                    y: manualOverride ? shipPosition.y : 0,
                                    rotate: manualOverride ? shipPosition.rotate : 0
                                }}
                                transition={{ type: 'spring', stiffness: 50 }}
                            >
                                {/* Shield Effect */}
                                <AnimatePresence>
                                    {isShields && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1.05 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            className="absolute inset-0 bg-cyan-400/10 border-2 border-cyan-400/50 rounded-[50%] blur-sm z-20 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
                                        />
                                    )}
                                </AnimatePresence>

                                <Image
                                    src="/image-copy.png"
                                    alt="Command View"
                                    fill
                                    className="object-contain mix-blend-screen drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                />
                                {activeAlerts.includes('ENEMY') && (
                                    <div className="absolute top-[20%] right-[30%] w-24 h-24 border-2 border-red-500 rounded-full animate-ping flex items-center justify-center opacity-50" />
                                )}
                            </motion.div>
                        </div>

                        {/* Tactical Controls Overlay */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
                            <button
                                onClick={() => setIsStealth(!isStealth)}
                                className={clsx("p-2 border rounded backdrop-blur-md flex items-center gap-2 text-[10px] font-bold uppercase transition-all", isStealth ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-black/50 border-gray-700 text-gray-500")}
                            >
                                <EyeOff size={14} /> Stealth Mode
                            </button>
                            <button
                                onClick={() => setIsShields(!isShields)}
                                className={clsx("p-2 border rounded backdrop-blur-md flex items-center gap-2 text-[10px] font-bold uppercase transition-all", isShields ? "bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_10px_blue]" : "bg-black/50 border-gray-700 text-gray-500")}
                            >
                                <Shield size={14} /> Deflector Shields
                            </button>
                        </div>

                        {/* HUD Elements */}
                        <div className="absolute top-4 left-4 text-[10px] text-cyan-500 font-bold border border-cyan-500/30 px-2 py-1 bg-black/50 backdrop-blur-sm">
                            SYS: ONLINE <br /> CAM: 04-A
                        </div>

                        {/* Thrust Warning */}
                        <AnimatePresence>
                            {thrustWarning && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 bg-red-900/80 text-white px-8 py-4 rounded font-black text-2xl tracking-widest uppercase animate-pulse z-50 shadow-[0_0_50px_red]"
                                >
                                    Engine Overload
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Missile Launch Security Panel */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                            {/* Security Status Display */}
                            <div className="bg-black/80 border border-red-900/50 px-4 py-2 rounded backdrop-blur-md">
                                <div className="text-[8px] text-red-600 uppercase tracking-widest mb-1">Weapons Authorization</div>
                                <div className="flex gap-2 items-center">
                                    <Lock className={clsx("w-3 h-3", securityStep === 'authorized' ? "text-green-500" : "text-red-500")} />
                                    <span className={clsx("text-[10px] font-bold", securityStep === 'authorized' ? "text-green-500" : "text-red-500")}>
                                        {securityStep === 'idle' && 'LOCKED'}
                                        {securityStep === 'biometric' && 'SCANNING...'}
                                        {securityStep === 'dualkey' && 'AWAITING KEYS'}
                                        {securityStep === 'code' && 'CODE REQUIRED'}
                                        {securityStep === 'authorized' && 'AUTHORIZED'}
                                    </span>
                                </div>
                            </div>

                            {/* Authorization Button */}
                            {securityStep === 'idle' && (
                                <motion.button
                                    onClick={handleSecurityAuth}
                                    className="px-6 py-3 bg-red-900/20 border-2 border-red-600 text-red-500 rounded font-bold text-xs uppercase tracking-wider hover:bg-red-900/40 transition-all flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Fingerprint size={16} />
                                    Begin Authorization
                                </motion.button>
                            )}

                            {/* Launch Button (Only when authorized) */}
                            {securityStep === 'authorized' && (
                                <motion.button
                                    onClick={handleMissileLaunch}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-20 h-20 rounded-full border-4 border-red-600 bg-red-900/50 flex items-center justify-center transition-all hover:bg-red-800/70 hover:scale-110 shadow-[0_0_30px_rgba(220,38,38,0.5)] backdrop-blur-md"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Rocket size={40} className={launching ? "animate-bounce" : ""} />
                                </motion.button>
                            )}
                        </div>

                        {/* Scanninglines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                    </div>
                </div>

                {/* RIGHT: SYSTEMS & CONTROL */}
                <div className="col-span-3 flex flex-col gap-4 min-h-0">

                    {/* Flight Systems Panel */}
                    <div className="bg-black/40 border border-cyan-500/30 rounded-lg p-4">
                        <h3 className="text-xs font-bold tracking-widest text-cyan-400 mb-4 flex items-center gap-2"><Server size={14} /> FLIGHT SYSTEMS</h3>

                        {/* Landing Gear Custom Animation */}
                        <div className="mb-6">
                            <div className="flex justify-between text-[10px] text-cyan-600 mb-2 uppercase font-bold">Landing Gear</div>
                            <div
                                onClick={() => setLandingGear(!landingGear)}
                                className="w-full h-12 bg-black border border-cyan-900 relative rounded overflow-hidden cursor-pointer group"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-900/50" /> {/* Ground */}
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2"
                                    animate={{ bottom: landingGear ? 4 : 20 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-4 bg-cyan-700 rounded-t-sm" /> {/* Hull */}
                                        <motion.div
                                            className="w-1 bg-gray-500"
                                            animate={{ height: landingGear ? 10 : 0 }}
                                        />
                                        <motion.div
                                            className="w-4 h-1 bg-gray-400 rounded-full"
                                            animate={{ opacity: landingGear ? 1 : 0 }}
                                        />
                                    </div>
                                </motion.div>
                                <div className={clsx("absolute top-2 right-2 text-[8px] font-bold px-1 rounded", landingGear ? "bg-green-500 text-black" : "bg-red-500 text-black")}>
                                    {landingGear ? "DEPLOYED" : "RETRACTED"}
                                </div>
                            </div>
                        </div>

                        {/* Thruster Custom Animation */}
                        <div className="mb-6">
                            <div className="flex justify-between text-[10px] text-cyan-600 mb-2 uppercase font-bold">
                                <span>Main Thrusters</span>
                                <span className={thrustWarning ? "text-red-500 animate-pulse" : "text-cyan-400"}>{thrusterPower}%</span>
                            </div>
                            <div className="h-32 bg-black border border-cyan-900 rounded relative overflow-hidden flex items-end justify-center gap-2 px-4 pb-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-1/4 h-full bg-gray-900/30 relative overflow-hidden rounded-b">
                                        <motion.div
                                            className={clsx("w-full absolute bottom-0 rounded-t blur-md opacity-80", thrustWarning ? "bg-red-500" : "bg-cyan-400")}
                                            animate={{ height: `${thrusterPower}%` }}
                                            transition={{ type: "spring", bounce: 0 }}
                                        >
                                            <div className="w-full h-full bg-white/20 animate-pulse" />
                                        </motion.div>
                                    </div>
                                ))}
                                <input
                                    type="range" min="0" max="100" value={thrusterPower}
                                    onChange={(e) => setThrusterPower(parseInt(e.target.value))}
                                    className="absolute inset-0 opacity-0 cursor-ns-resize"
                                    aria-label="Adjust Thrusters"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Remote Control Panel */}
                    <div className="flex-1 bg-black/40 border border-cyan-500/30 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs font-bold tracking-widest text-cyan-400 flex items-center gap-2"><Navigation size={14} /> REMOTE NAV</h3>
                            <button
                                onClick={() => setManualOverride(!manualOverride)}
                                className={clsx("text-[8px] px-2 py-1 rounded border font-bold transition-all", manualOverride ? "bg-yellow-500 text-black border-yellow-500" : "bg-transparent text-cyan-700 border-cyan-900")}
                            >
                                {manualOverride ? "MANUAL" : "AUTO"}
                            </button>
                        </div>

                        <div className={clsx("grid grid-cols-3 gap-2 aspect-square max-w-[200px] mx-auto transition-opacity duration-300", manualOverride ? "opacity-100" : "opacity-30 pointer-events-none")}>
                            <div />
                            <ControlBtn icon={ArrowUp} onClick={() => handleMove(0, -20, 0)} />
                            <div />
                            <ControlBtn icon={ArrowLeft} onClick={() => handleMove(-20, 0, -5)} />
                            <div className="bg-cyan-900/20 rounded border border-cyan-500/30 flex items-center justify-center">
                                <div className={clsx("w-2 h-2 rounded-full", isStealth ? "bg-gray-500" : "bg-cyan-500 animate-ping")} />
                            </div>
                            <ControlBtn icon={ArrowRight} onClick={() => handleMove(20, 0, 5)} />
                            <div />
                            <ControlBtn icon={ArrowDown} onClick={() => handleMove(0, 20, 0)} />
                            <div />
                        </div>
                    </div>

                    {/* CIA & Strike Team */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* CIA Access Button - RESTORED */}
                        <div
                            className="bg-black/40 border border-cyan-500/30 p-2 rounded-lg cursor-pointer hover:border-cyan-400 transition-colors flex flex-col items-center justify-center gap-2 group"
                            onClick={() => setCiaAccess(true)}
                        >
                            <Database className="w-6 h-6 text-cyan-500 group-hover:text-cyan-300" />
                            <span className="text-[8px] font-bold text-cyan-400 tracking-widest text-center">CIA ARCHIVES</span>
                        </div>

                        {/* Simplified Avenger Status (linked to dialog) */}
                        <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-2 flex flex-col items-center justify-center gap-2">
                            <Zap className="w-6 h-6 text-blue-400" />
                            <span className="text-[8px] font-bold text-blue-400 tracking-widest text-center">STRIKE TEAM</span>
                        </div>
                    </div>

                    {/* Quick Avenger Deploy - Futuristic */}
                    <div className="bg-gradient-to-br from-blue-950/40 to-purple-950/40 border border-blue-500/50 rounded-xl p-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        <div className="text-[10px] font-bold text-blue-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                            <Zap size={12} className="animate-pulse" />
                            AVENGERS INITIATIVE
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {HEROES.map((hero, index) => (
                                <motion.button
                                    key={hero.id}
                                    onClick={() => setDeployingHero(hero.id)}
                                    className="relative group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {/* Hexagonal Background */}
                                    <div className={clsx(
                                        "relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-300",
                                        hero.bg,
                                        "border-2",
                                        hero.border,
                                        "group-hover:shadow-[0_0_20px] group-hover:border-opacity-100"
                                    )}
                                        style={{
                                            boxShadow: `0 0 15px ${hero.color.replace('text-', 'rgba(').replace('-500', ', 0.3)')}`
                                        }}
                                    >
                                        {/* Animated Corner Lines */}
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50" />
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/50" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/50" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50" />

                                        {/* Pulsing Background */}
                                        <motion.div
                                            className={clsx("absolute inset-0", hero.color.replace('text-', 'bg-'), "opacity-20")}
                                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                                        />

                                        {/* Hero Icon/Indicator */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {hero.id === 'iron-man' && <Zap className={clsx("w-8 h-8", hero.color)} />}
                                            {hero.id === 'captain-america' && <Shield className={clsx("w-8 h-8", hero.color)} />}
                                            {hero.id === 'thor' && <Zap className={clsx("w-8 h-8", hero.color)} />}
                                            {hero.id === 'hulk' && <Activity className={clsx("w-8 h-8", hero.color)} />}
                                            {hero.id === 'black-widow' && <Target className={clsx("w-8 h-8", hero.color)} />}
                                            {hero.id === 'hawkeye' && <Crosshair className={clsx("w-8 h-8", hero.color)} />}
                                        </div>

                                        {/* Scan Line Effect */}
                                        <motion.div
                                            className="absolute inset-x-0 h-[2px] bg-white/50"
                                            animate={{ top: ['0%', '100%'] }}
                                            transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                                        />
                                    </div>

                                    {/* Hero Name Label */}
                                    <div className={clsx(
                                        "absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-bold px-2 py-0.5 rounded whitespace-nowrap",
                                        "bg-black/80 border backdrop-blur-sm",
                                        hero.border,
                                        hero.color
                                    )}>
                                        {hero.name.toUpperCase()}
                                    </div>

                                    {/* Status Indicator */}
                                    <motion.div
                                        className={clsx("absolute top-1 right-1 w-2 h-2 rounded-full", hero.color.replace('text-', 'bg-'))}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: 9999, repeatType: "loop" }}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODALS --- */}

            {/* Avenger Deployment Dialog */}
            <AnimatePresence>
                {deployingHero && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-black border border-cyan-500 w-full max-w-md h-[400px] rounded-lg relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.5)]"
                        >
                            <button
                                onClick={() => setDeployingHero(null)}
                                className="absolute top-2 right-2 z-50 text-cyan-500 hover:text-white bg-black/50 rounded-full p-1"
                            >
                                <X size={20} />
                            </button>
                            <div className="w-full h-full">
                                <DeploymentAnimation
                                    heroId={deployingHero}
                                    onComplete={() => console.log('Deployment cycle complete for', deployingHero)}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CIA Access Modal - RESTORED & ENHANCED */}
            <AnimatePresence>
                {ciaAccess && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setCiaAccess(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-cyan-500 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_20px_rgba(0,0,0,1)] font-mono flex flex-col max-h-[80vh]"
                        >
                            {/* Modal Header */}
                            <div className="bg-cyan-950/30 p-4 border-b border-cyan-500/30 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2 text-cyan-400 text-sm tracking-[0.2em] uppercase font-bold">
                                    <Lock className="w-4 h-4" /> CIA Restricted Mainframe
                                </div>
                                <button onClick={() => setCiaAccess(false)}><X className="w-5 h-5 text-cyan-600 hover:text-white hover:rotate-90 transition-all" /></button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 overflow-y-auto min-h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05),transparent)]">
                                {ciaLoginStatus === 'GRANTED' ? (
                                    activeFile ? (
                                        // FILE VIEW
                                        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                                            <button onClick={() => setActiveFile(null)} className="text-xs text-cyan-500 hover:text-white mb-6 flex items-center gap-2 px-3 py-1 border border-cyan-500/30 rounded w-fit hover:bg-cyan-500/20 transition-colors">
                                                <ArrowLeft size={12} /> BACK TO INDEX
                                            </button>
                                            <div className="border border-red-900/50 bg-red-950/10 p-8 rounded relative overflow-hidden">
                                                <div className="absolute top-4 right-4 text-red-500/20 border-2 border-red-500/20 rounded p-2 text-xs -rotate-12 uppercase font-black border-dashed">Top Secret</div>
                                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-5 mix-blend-overlay" />
                                                <h3 className="text-2xl text-red-500 font-black mb-6 uppercase tracking-wider flex items-center gap-3">
                                                    <FileText /> SUBJECT: {activeFile}
                                                </h3>
                                                <div className="space-y-6 text-gray-300 text-sm font-serif leading-relaxed relative z-10">
                                                    <p>INTELLIGENCE REPORT #892-A // CLEARANCE LEVEL 8</p>
                                                    <div className="w-full h-px bg-red-900/30 mb-4" />
                                                    <p>
                                                        Analysis of <span className="bg-black px-1 text-transparent select-none cursor-help" title="REDACTED">REDACTED</span> confirms the presence of enhanced individuals in the sector.
                                                        Primary objective remains the containment of the Tesseract energy signature.
                                                    </p>
                                                    <p>
                                                        Director Fury has authorized <span className="text-red-400 font-bold">INITIATIVE ZERO</span> in event of containment failure.
                                                        All agents are to report to designated safe zones immediately.
                                                    </p>
                                                    <p className="italic text-gray-500 mt-8">
                                                        "The world is filling up with people who can't be matched, they can't be controlled..."
                                                    </p>
                                                    <div className="border-t border-red-900/30 pt-4 mt-8 text-[10px] text-red-700 uppercase flex justify-between">
                                                        <span>Destruction mandatory after reading</span>
                                                        <span>Auth: N. Fury</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // FILE LIST
                                        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
                                            {CIA_FILES.map(file => (
                                                <div
                                                    key={file.id}
                                                    onClick={() => setActiveFile(file.id)}
                                                    className="bg-black/40 border border-cyan-800 p-4 rounded hover:bg-cyan-900/20 hover:border-cyan-400 cursor-pointer group transition-all hover:scale-[1.02] relative overflow-hidden"
                                                >
                                                    <div className="absolute top-0 right-0 p-1 bg-cyan-900/30 rounded-bl text-[8px] text-cyan-500">{file.date}</div>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <FileText className="text-cyan-600 group-hover:text-cyan-400 w-8 h-8" />
                                                        <span className="text-[9px] border border-cyan-900 px-1 py-0.5 rounded text-cyan-700 uppercase">{file.type}</span>
                                                    </div>
                                                    <div className="font-bold text-cyan-500 group-hover:text-cyan-300 tracking-wider">{file.id}</div>
                                                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    // LOGIN FORM
                                    <form onSubmit={handleCiaLogin} className="space-y-6 max-w-xs mx-auto text-center mt-10">
                                        <div className="w-24 h-24 mx-auto bg-cyan-900/10 rounded-full flex items-center justify-center mb-8 animate-pulse border border-cyan-500/30 relative">
                                            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
                                            <Fingerprint className="w-12 h-12 text-cyan-600" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-cyan-600 text-xs tracking-[0.2em] uppercase font-bold">Biometric Mismatch</p>
                                            <p className="text-[10px] text-cyan-800">ENTER OVERRIDE PASSCODE</p>
                                        </div>
                                        <input
                                            type="password"
                                            value={ciaCode}
                                            onChange={(e) => setCiaCode(e.target.value)}
                                            className="w-full bg-black/50 border border-cyan-800 text-cyan-400 p-4 text-center tracking-[0.5em] focus:outline-none focus:border-cyan-400 transition-colors rounded text-xl"
                                            placeholder="••••••"
                                            autoFocus
                                        />
                                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 w-full py-4 text-black font-black tracking-[0.2em] text-xs rounded transition-all hover:shadow-[0_0_20px_cyan]">
                                            AUTHENTICATE
                                        </button>
                                        <div className="pt-8">
                                            <div className="flex items-center justify-center gap-2 text-[9px] text-red-500/80 animate-pulse">
                                                <AlertTriangle size={12} />
                                                UNAUTHORIZED ACCESS IS TREASON
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Ship Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-cyan-500 w-full max-w-lg rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                        >
                            <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center bg-cyan-950/30">
                                <h2 className="text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Settings size={18} /> Ship Configuration
                                </h2>
                                <button onClick={() => setIsSettingsOpen(false)}><X size={18} className="text-cyan-600 hover:text-white" /></button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-cyan-600 uppercase font-bold">Cockpit Lighting</label>
                                    <div className="flex gap-2">
                                        {['AUTO', 'DIM', 'BRIGHT', 'RED ALERT'].map(mode => (
                                            <button key={mode} className="flex-1 bg-black/40 border border-cyan-800 text-[10px] text-cyan-400 py-2 rounded hover:bg-cyan-900/40">{mode}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-cyan-600 uppercase font-bold">Audio Feedback</label>
                                    <input type="range" className="w-full h-1 bg-cyan-900/50 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-cyan-600 uppercase font-bold">Autopilot Aggression</label>
                                    <div className="w-full bg-black/40 p-2 rounded border border-cyan-900/50 text-cyan-500 text-xs font-mono">
                                        CURRENT: LEVEL 5 (STANDARD)
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-cyan-900/30 flex justify-end gap-2">
                                    <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-xs text-cyan-600 hover:text-cyan-400">CANCEL</button>
                                    <button onClick={() => setIsSettingsOpen(false)} className="px-6 py-2 bg-cyan-600 text-black text-xs font-bold rounded hover:bg-cyan-500">SAVE CHANGES</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Missile Launch Animation - EPIC */}
            <AnimatePresence>
                {missilePhase !== 'idle' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center font-mono overflow-hidden"
                    >
                        {/* Tech Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

                        {/* TARGETING PHASE */}
                        {missilePhase === 'targeting' && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative z-10 text-center"
                            >
                                <div className="relative w-96 h-96 mx-auto mb-8">
                                    {/* Crosshair rings */}
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-0 border-2 border-red-500 rounded-full"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.8, 0, 0.8]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: 9999,
                                                repeatType: "loop",
                                                delay: i * 0.3
                                            }}
                                        />
                                    ))}
                                    <Target className="w-full h-full text-red-500 animate-pulse" />
                                    <motion.div
                                        className="absolute inset-0 border-4 border-red-500"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                                    >
                                        <div className="absolute top-0 left-1/2 w-1 h-8 bg-red-500 -translate-x-1/2" />
                                        <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-red-500 -translate-x-1/2" />
                                        <div className="absolute left-0 top-1/2 h-1 w-8 bg-red-500 -translate-y-1/2" />
                                        <div className="absolute right-0 top-1/2 h-1 w-8 bg-red-500 -translate-y-1/2" />
                                    </motion.div>
                                </div>
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.5, repeat: 9999, repeatType: "loop" }}
                                    className="text-red-500 text-2xl font-black tracking-[0.5em]"
                                >
                                    ACQUIRING TARGET
                                </motion.div>
                                <div className="mt-4 text-red-400 text-sm">LOCK STATUS: 47% ... 68% ... 89%</div>
                            </motion.div>
                        )}

                        {/* COUNTDOWN PHASE */}
                        {missilePhase === 'countdown' && (
                            <motion.div
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative z-10 text-center"
                            >
                                <motion.div className="text-red-500 text-sm tracking-[0.3em] mb-4">TARGET LOCKED</motion.div>
                                <div className="w-64 h-64 mx-auto relative mb-8 flex items-center justify-center">
                                    <motion.div
                                        className="absolute inset-0 border-8 border-red-600 rounded-full"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            borderColor: ['#dc2626', '#ef4444', '#dc2626']
                                        }}
                                        transition={{ duration: 1, repeat: 9999, repeatType: "loop" }}
                                    />
                                    <motion.div
                                        className="text-9xl font-black text-red-500"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: 9999, repeatType: "loop" }}
                                    >
                                        3
                                    </motion.div>
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 0.5, repeat: 9999 }}
                                    className="text-red-500 text-xl font-black tracking-[0.5em]"
                                >
                                    LAUNCH SEQUENCE INITIATED
                                </motion.div>
                            </motion.div>
                        )}

                        {/* FIRING PHASE */}
                        {missilePhase === 'firing' && (
                            <div className="relative w-full h-full">
                                {/* Missile trail */}
                                <motion.div
                                    className="absolute left-1/2 w-4 h-32 bg-gradient-to-b from-orange-500 via-red-500 to-yellow-400 rounded-full blur-sm"
                                    initial={{ bottom: '10%', opacity: 0 }}
                                    animate={{
                                        bottom: '100%',
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{ duration: 1.5, ease: "easeIn" }}
                                />
                                {/* Missile body */}
                                <motion.div
                                    className="absolute left-1/2 -translate-x-1/2"
                                    initial={{ bottom: '10%' }}
                                    animate={{ bottom: '100%' }}
                                    transition={{ duration: 1.5, ease: "easeIn" }}
                                >
                                    <Rocket className="w-12 h-12 text-red-600 rotate-180" />
                                </motion.div>
                                {/* Launch flash */}
                                <motion.div
                                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500 rounded-full blur-3xl"
                                    animate={{
                                        scale: [0, 2, 0],
                                        opacity: [0, 0.8, 0]
                                    }}
                                    transition={{ duration: 1 }}
                                />
                                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-orange-500 text-2xl font-black tracking-[0.5em]">
                                    FIRING
                                </div>
                            </div>
                        )}

                        {/* IMPACT PHASE */}
                        {missilePhase === 'impact' && (
                            <motion.div
                                className="relative w-full h-full flex items-center justify-center"
                                animate={{
                                    x: [0, -10, 10, -5, 5, 0],
                                    y: [0, 5, -5, 3, -3, 0]
                                }}
                                transition={{ duration: 0.5, repeat: 3 }}
                            >
                                {/* Explosion rings */}
                                {[0, 0.2, 0.4, 0.6].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-32 h-32 border-8 border-orange-500 rounded-full"
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{
                                            scale: [0, 8],
                                            opacity: [1, 0],
                                            borderColor: ['#f97316', '#ef4444', '#7c2d12']
                                        }}
                                        transition={{ duration: 2, delay }}
                                    />
                                ))}
                                {/* Flash */}
                                <motion.div
                                    className="absolute inset-0 bg-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0, 0.5, 0] }}
                                    transition={{ duration: 1, times: [0, 0.1, 0.2, 0.5, 1] }}
                                />
                                {/* Fire burst */}
                                <motion.div
                                    className="absolute w-96 h-96 bg-gradient-radial from-orange-500 via-red-600 to-transparent rounded-full blur-2xl"
                                    animate={{
                                        scale: [0, 3, 2],
                                        opacity: [1, 0.8, 0]
                                    }}
                                    transition={{ duration: 2 }}
                                />
                                <Flame className="w-64 h-64 text-orange-600 absolute animate-pulse" />
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-red-600 text-4xl font-black tracking-[0.5em] z-10 drop-shadow-[0_0_20px_rgba(220,38,38,1)]"
                                >
                                    TARGET DESTROYED
                                </motion.div>
                            </motion.div>
                        )}

                        {/* HUD Overlay */}
                        <div className="absolute top-8 left-8 text-red-500 text-xs font-mono space-y-1 opacity-70">
                            <div>MISSILE SYS: ACTIVE</div>
                            <div>WARHEAD: ARMED</div>
                            <div>TRAJECTORY: LOCKED</div>
                            <div>YIELD: 500KT</div>
                        </div>
                        <div className="absolute top-8 right-8 text-red-500 text-xs font-mono text-right space-y-1 opacity-70">
                            <div>RANGE: 2,400 NM</div>
                            <div>SPEED: MACH 3.2</div>
                            <div>ALT: 45,000 FT</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Security Authorization Modal */}
            <AnimatePresence>
                <SecurityModal
                    securityStep={securityStep}
                    authCode={authCode}
                    setAuthCode={setAuthCode}
                    key1Turned={key1Turned}
                    setKey1Turned={setKey1Turned}
                    key2Turned={key2Turned}
                    setKey2Turned={setKey2Turned}
                    handleSecurityAuth={handleSecurityAuth}
                />
            </AnimatePresence>

        </div>
    );
}

const ControlBtn = ({ icon: Icon, onClick }: { icon: any, onClick?: () => void }) => (
    <button onClick={onClick} className="bg-black/50 border border-cyan-500/30 rounded flex items-center justify-center hover:bg-cyan-500/20 active:bg-cyan-500/40 text-cyan-400 transition-colors active:scale-95">
        <Icon size={20} />
    </button>
);
