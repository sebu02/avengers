"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, CheckSquare, Bug, Settings, LogOut, Users, Plane,
    ChevronLeft, ChevronRight, Radio, Lock, Target, Cpu, GitBranch, ShieldAlert,
    Shield
} from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

const navItems = [
    { href: "/", label: "Avengers Command", icon: LayoutDashboard },
    { href: "/tasks", label: "Missions", icon: Target },
    { href: "/bugs", label: "Damage Reports", icon: ShieldAlert },
    { href: "/team", label: "Team Status", icon: Users },
    { href: "/helicarrier", label: "Helicarrier Ops", icon: Plane },
    { href: "/communications", label: "Communications", icon: Radio },
    { href: "/arsenal", label: "Weapons Arsenal", icon: Target },
    { href: "/jarvis", label: "JARVIS Control", icon: Cpu },
    { href: "/timeline", label: "Timeline Branch", icon: GitBranch },
    { href: "/prison", label: "The Raft", icon: Lock },
    { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
    isMobile?: boolean;
    onShutdown?: () => void;
}

export default function Sidebar({ isOpen, toggle, isMobile = false, onShutdown }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={clsx(
                "h-full bg-card flex flex-col transition-all duration-300",
                isOpen ? "w-full p-6" : "w-full p-4"
            )}
        >
            <div className="flex items-center gap-3 mb-10 relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-primary/50 shrink-0">
                    <Shield className="text-primary w-6 h-6 animate-pulse" />
                </div>

                <div className={clsx("overflow-hidden transition-all duration-300", isOpen ? "opacity-100 w-auto" : "opacity-0 w-0")}>
                    <h1 className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-600 uppercase whitespace-nowrap">
                        Avengers
                        <span className="block text-[10px] tracking-[0.2em] text-muted-foreground font-medium">Initiative</span>
                    </h1>
                </div>

                {!isMobile && (
                    <button
                        onClick={toggle}
                        className="absolute -right-10 top-1 bg-card border border-border rounded-full p-1 shadow-md hover:bg-accent transition-colors z-50 transform hover:scale-110"
                    >
                        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </button>
                )}
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                                if (isMobile) toggle();
                            }}
                            className={clsx(
                                "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden",
                                isActive
                                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(14,165,233,0.1)]"
                                    : "text-muted-foreground hover:bg-primary/5 hover:text-foreground border border-transparent",
                                !isOpen && "justify-center"
                            )}
                            title={!isOpen ? item.label : undefined}
                        >
                            {isActive && isOpen && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50"
                                />
                            )}
                            <item.icon
                                className={clsx(
                                    "w-5 h-5 z-10 transition-transform duration-300 shrink-0",
                                    isActive ? "drop-shadow-[0_0_5px_rgba(14,165,233,0.8)] scale-110" : "group-hover:scale-110"
                                )}
                            />

                            <span
                                className={clsx(
                                    "font-medium tracking-wide z-10 uppercase text-[10px] whitespace-nowrap transition-all duration-300",
                                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 absolute"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className={clsx("pt-6 border-t border-white/5 mt-auto bg-gradient-to-t from-primary/5 to-transparent", !isOpen && "flex justify-center")}>
                <button
                    onClick={() => {
                        if (onShutdown) onShutdown();
                    }}
                    className={clsx(
                        "flex items-center gap-3 text-muted-foreground hover:text-red-500 transition-all rounded-xl hover:bg-red-500/10 p-3 group relative overflow-hidden",
                        isOpen ? "w-full" : "justify-center"
                    )}
                >
                    <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors" />
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {isOpen && (
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest">System Shutdown</span>
                            <span className="text-[8px] font-mono text-slate-500 uppercase">Clear Local Cache</span>
                        </div>
                    )}
                </button>
                {isOpen && (
                    <div className="mt-4 flex items-center gap-2 px-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_green]" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Uplink: Secure • Level 7 Clearance</span>
                    </div>
                )}
            </div>
        </aside>
    );
}
