"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone, Radio, Satellite, Signal, Zap, Shield,
    Users, Globe, Eye, Radar,
    MessageSquare, Video, Mic, MicOff, PhoneOff, Volume2,
    CheckCircle, Loader, Sparkles, Crown
} from "lucide-react";
import clsx from "clsx";

// Contact Groups (UNCHANGED)
const CONTACT_GROUPS = [
    {
        id: "avengers",
        name: "Avengers",
        icon: Zap,
        color: "blue",
        members: [
            { id: "iron-man", name: "Iron Man", status: "online", color: "red" },
            { id: "captain-america", name: "Captain America", status: "online", color: "blue" },
            { id: "thor", name: "Thor", status: "away", color: "yellow" },
            { id: "hulk", name: "Hulk", status: "online", color: "green" },
            { id: "black-widow", name: "Black Widow", status: "busy", color: "slate" },
            { id: "hawkeye", name: "Hawkeye", status: "online", color: "purple" }
        ]
    },
    {
        id: "shield",
        name: "S.H.I.E.L.D.",
        icon: Shield,
        color: "cyan",
        members: [
            { id: "nick-fury", name: "Director Fury", status: "online", color: "slate" },
            { id: "maria-hill", name: "Agent Hill", status: "online", color: "blue" },
            { id: "phil-coulson", name: "Agent Coulson", status: "away", color: "cyan" }
        ]
    },
    {
        id: "guardians",
        name: "Guardians of Galaxy",
        icon: Sparkles,
        color: "purple",
        members: [
            { id: "star-lord", name: "Star-Lord", status: "offline", color: "red" },
            { id: "gamora", name: "Gamora", status: "offline", color: "green" },
            { id: "rocket", name: "Rocket", status: "offline", color: "orange" },
            { id: "groot", name: "Groot", status: "offline", color: "green" }
        ]
    },
    {
        id: "wakanda",
        name: "Wakanda",
        icon: Crown,
        color: "purple",
        members: [
            { id: "black-panther", name: "Black Panther", status: "online", color: "purple" },
            { id: "shuri", name: "Shuri", status: "online", color: "purple" },
            { id: "okoye", name: "Okoye", status: "busy", color: "red" }
        ]
    },
    {
        id: "mystic-arts",
        name: "Mystic Arts",
        icon: Eye,
        color: "orange",
        members: [
            { id: "dr-strange", name: "Dr. Strange", status: "away", color: "orange" },
            { id: "wong", name: "Wong", status: "online", color: "yellow" }
        ]
    }
];

export default function CommunicationsPage() {

    // ✅ build-safe mount + viewport
    const [mounted, setMounted] = useState(false);
    const [viewport, setViewport] = useState({ w: 0, h: 0 });
    const [particles, setParticles] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        const w = window.innerWidth;
        const h = window.innerHeight;
        setViewport({ w, h });

        setParticles(
            Array.from({ length: 20 }).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h
            }))
        );
    }, []);

    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [activeCall, setActiveCall] = useState<any>(null);
    const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [scanningSignal, setScanningSignal] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanningSignal(p => !p);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const initiateCall = (member: any) => {
        setActiveCall(member);
        setCallStatus('connecting');
        setTimeout(() => setCallStatus('connected'), 3000);
    };

    const endCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            setActiveCall(null);
            setCallStatus('idle');
        }, 1000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'bg-green-500';
            case 'away': return 'bg-yellow-500';
            case 'busy': return 'bg-red-500';
            case 'offline': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 p-6 font-mono relative overflow-hidden">

            {/* background grid — unchanged */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

            {/* ✅ SAFE particles */}
            {mounted && particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{ x: p.x, y: p.y }}
                    animate={{
                        x: Math.random() * viewport.w,
                        y: Math.random() * viewport.h,
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 5 + Math.random() * 5, repeat: 9999 }}
                />
            ))}

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative z-10 mb-8"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-2 uppercase italic">
                            COMMUNICATIONS HUB
                        </h1>
                        <p className="text-[10px] text-cyan-600 tracking-[0.3em]">SECURE QUANTUM ENCRYPTED CHANNEL</p>
                    </div>

                    {/* Signal Strength Indicator */}
                    <div className="flex items-center gap-4 self-start md:self-auto bg-black/40 p-3 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2">
                            <Satellite className={clsx("w-5 h-5", scanningSignal ? "text-green-500" : "text-cyan-500")} />
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-green-500 rounded-full"
                                        animate={{ height: [4, 8 + i * 2, 4] }}
                                        transition={{ duration: 1, repeat: 9999, repeatType: "loop", delay: i * 0.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="text-[10px] text-green-500 font-bold">SIGNAL: STRONG</div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                {/* Left Sidebar - Contact Groups */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md">
                        <h2 className="text-xs font-bold text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Users size={14} />
                            CONTACT GROUPS
                        </h2>

                        <div className="space-y-2">
                            {CONTACT_GROUPS.map((group, index) => (
                                <motion.button
                                    key={group.id}
                                    onClick={() => setSelectedGroup(group.id)}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={clsx(
                                        "w-full p-3 rounded-lg border-2 transition-all duration-300 group relative overflow-hidden",
                                        selectedGroup === group.id
                                            ? `border-${group.color}-500 bg-${group.color}-500/20`
                                            : "border-gray-700 bg-black/20 hover:border-cyan-500/50"
                                    )}
                                >
                                    {/* Animated Background */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r from-${group.color}-500/0 via-${group.color}-500/20 to-${group.color}-500/0`}
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                                    />

                                    <div className="relative flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${group.color}-500/20 border border-${group.color}-500/50`}>
                                            <group.icon className={`w-5 h-5 text-${group.color}-400`} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-bold text-white">{group.name}</div>
                                            <div className="text-[10px] text-gray-400">{group.members.length} members</div>
                                        </div>
                                        <div className={clsx(
                                            "w-2 h-2 rounded-full",
                                            group.members.some(m => m.status === 'online') ? "bg-green-500 animate-pulse" : "bg-gray-500"
                                        )} />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Global Status */}
                    <div className="bg-black/40 border border-green-500/30 rounded-xl p-4 backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-3">
                            <Globe className="w-4 h-4 text-green-400 animate-spin" style={{ animationDuration: '10s' }} />
                            <span className="text-[10px] font-bold text-green-400 tracking-wider">GLOBAL STATUS</span>
                        </div>
                        <div className="space-y-2 text-[10px]">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Online</span>
                                <span className="text-green-400 font-bold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Away</span>
                                <span className="text-yellow-400 font-bold">3</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Offline</span>
                                <span className="text-gray-500 font-bold">4</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Members List */}
                <div className="lg:col-span-6">
                    <AnimatePresence mode="wait">
                        {selectedGroup ? (
                            <motion.div
                                key={selectedGroup}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-md"
                            >
                                <h2 className="text-xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                                    {(() => {
                                        const group = CONTACT_GROUPS.find(g => g.id === selectedGroup);
                                        const IconComponent = group?.icon;
                                        return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
                                    })()}
                                    {CONTACT_GROUPS.find(g => g.id === selectedGroup)?.name}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CONTACT_GROUPS.find(g => g.id === selectedGroup)?.members.map((member, index) => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative group"
                                        >
                                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500/30 rounded-xl p-4 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                                {/* Holographic Scan Line */}
                                                <motion.div
                                                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                                                    animate={{ top: ['0%', '100%'] }}
                                                    transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
                                                />

                                                {/* Avatar */}
                                                <div className="relative w-20 h-20 mx-auto mb-3">
                                                    <motion.div
                                                        className={`absolute inset-0 rounded-full bg-${member.color}-500/20 border-2 border-${member.color}-500`}
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 10, repeat: 9999, repeatType: "loop", ease: "linear" }}
                                                    />
                                                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                                        <span className="text-2xl font-black text-white">
                                                            {member.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                    {/* Status Indicator */}
                                                    <motion.div
                                                        className={clsx("absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-900", getStatusColor(member.status))}
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                                                    />
                                                </div>

                                                {/* Name & Status */}
                                                <div className="text-center mb-4">
                                                    <div className="text-sm font-bold text-white mb-1">{member.name}</div>
                                                    <div className={clsx(
                                                        "text-[10px] font-bold uppercase",
                                                        member.status === 'online' ? "text-green-400" :
                                                            member.status === 'away' ? "text-yellow-400" :
                                                                member.status === 'busy' ? "text-red-400" : "text-gray-500"
                                                    )}>
                                                        {member.status}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <motion.button
                                                        onClick={() => initiateCall(member)}
                                                        disabled={member.status === 'offline'}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={clsx(
                                                            "flex-1 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all",
                                                            member.status === 'offline'
                                                                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                                                : "bg-green-600 text-white hover:bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                                        )}
                                                    >
                                                        <Phone size={14} />
                                                        CALL
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all"
                                                    >
                                                        <MessageSquare size={14} />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-black/40 border border-cyan-500/30 rounded-xl p-12 backdrop-blur-md flex flex-col items-center justify-center h-full"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: 9999, repeatType: "loop", ease: "linear" }}
                                >
                                    <Radar className="w-32 h-32 text-cyan-500/30 mb-6" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-cyan-600 mb-2">Select a Contact Group</h3>
                                <p className="text-sm text-gray-500">Choose a group from the left to view members</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Sidebar - Active Communications */}
                <div className="lg:col-span-3 space-y-4 order-last lg:order-none">
                    <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 backdrop-blur-md">
                        <h2 className="text-xs font-bold text-purple-400 tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Radio size={14} className="animate-pulse" />
                            ACTIVE COMMS
                        </h2>

                        {activeCall ? (
                            <div className="text-center text-xs text-gray-400">
                                <div className="mb-2">Active call with</div>
                                <div className="text-white font-bold">{activeCall.name}</div>
                            </div>
                        ) : (
                            <div className="text-center text-xs text-gray-500">
                                No active communications
                            </div>
                        )}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md">
                        <h2 className="text-xs font-bold text-cyan-400 tracking-[0.2em] mb-4">RECENT ACTIVITY</h2>
                        <div className="space-y-3">
                            {[
                                { name: "Iron Man", action: "Missed call", time: "2m ago", color: "red" },
                                { name: "Director Fury", action: "Message sent", time: "15m ago", color: "slate" },
                                { name: "Black Widow", action: "Call ended", time: "1h ago", color: "slate" }
                            ].map((activity, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 text-[10px]"
                                >
                                    <div className={`w-2 h-2 rounded-full bg-${activity.color}-500`} />
                                    <div className="flex-1">
                                        <div className="text-white font-bold">{activity.name}</div>
                                        <div className="text-gray-500">{activity.action}</div>
                                    </div>
                                    <div className="text-gray-600">{activity.time}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call Interface Modal */}
            <AnimatePresence>
                {activeCall && callStatus !== 'idle' && (
                    <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar">
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                                onClick={endCall}
                            />
                            <CallInterface
                                member={activeCall}
                                status={callStatus}
                                isMuted={isMuted}
                                isVideoOn={isVideoOn}
                                onMuteToggle={() => setIsMuted(!isMuted)}
                                onVideoToggle={() => setIsVideoOn(!isVideoOn)}
                                onEndCall={endCall}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Call Interface Component
const CallInterface = ({ member, status, isMuted, isVideoOn, onMuteToggle, onVideoToggle, onEndCall }: any) => {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-10 w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-cyan-500 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.5)]"
        >
            {/* Video Feed Area */}
            <div className="relative h-96 bg-black flex items-center justify-center">
                {status === 'connecting' ? (
                    <div className="text-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                            className="mb-4"
                        >
                            <Loader className="w-16 h-16 text-cyan-500 mx-auto" />
                        </motion.div>
                        <div className="text-cyan-400 text-xl font-bold mb-2">Connecting to {member.name}...</div>
                        <div className="text-gray-500 text-sm">Establishing secure quantum link</div>
                    </div>
                ) : status === 'connected' ? (
                    <div className="relative w-full h-full">
                        {/* Simulated Video Feed */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                            <motion.div
                                className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
                                animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
                                transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-6xl font-black text-white mb-4">
                                    {member.name.charAt(0)}
                                </div>
                                <div className="text-white text-2xl font-bold">{member.name}</div>
                                <div className="text-green-400 text-sm flex items-center justify-center gap-2 mt-2">
                                    <motion.div
                                        className="w-2 h-2 bg-green-500 rounded-full"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: 9999, repeatType: "loop" }}
                                    />
                                    Connected
                                </div>
                            </div>
                        </div>
                        {/* Connection Quality Indicator */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-lg flex items-center gap-2">
                            <Signal className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-400 font-bold">HD</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <div className="text-white text-xl font-bold">Call Ended</div>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-900/50 border-t border-cyan-500/30">
                <div className="flex items-center justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onMuteToggle}
                        className={clsx(
                            "p-4 rounded-full transition-all",
                            isMuted ? "bg-red-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                        )}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onVideoToggle}
                        className={clsx(
                            "p-4 rounded-full transition-all",
                            !isVideoOn ? "bg-red-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
                        )}
                    >
                        <Video size={24} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onEndCall}
                        className="p-6 rounded-full bg-red-600 text-white hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                    >
                        <PhoneOff size={28} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 rounded-full bg-slate-700 text-white hover:bg-slate-600 transition-all"
                    >
                        <Volume2 size={24} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
