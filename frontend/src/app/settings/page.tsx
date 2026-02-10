"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="border-b border-primary/20 pb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Monitor className="w-32 h-32 text-foreground" />
                </div>
                <h1 className="text-3xl font-black uppercase tracking-widest text-foreground mb-2 flex items-center gap-3">
                    <span className="w-3 h-8 bg-accent block animate-pulse" />
                    System Configuration
                </h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider pl-6">Adjust Protocol Parameters & Interface Visualization.</p>
            </header>

            <div className="bg-card/40 border border-primary/20 backdrop-blur-md rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent" />

                <h2 className="text-lg font-bold uppercase tracking-wider mb-8 text-foreground flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    Interface Protocol
                </h2>

                <div className="space-y-6">
                    <label className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                        Select Visual Mode
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={() => setTheme("light")}
                            className={clsx(
                                "group relative overflow-hidden p-6 rounded-lg border-2 transition-all duration-300",
                                theme === "light"
                                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                                    : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-secondary/50"
                            )}
                        >
                            <div className="flex flex-col items-center gap-3 relative z-10">
                                <Sun className={clsx("w-8 h-8 transition-colors", theme === "light" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span className={clsx("font-black uppercase tracking-widest text-sm", theme === "light" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>Stark Tech</span>
                                <span className="text-[10px] uppercase font-mono text-muted-foreground opacity-70">Light Protocol</span>
                            </div>
                            {theme === "light" && <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent animate-pulse" />}
                        </button>

                        <button
                            onClick={() => setTheme("dark")}
                            className={clsx(
                                "group relative overflow-hidden p-6 rounded-lg border-2 transition-all duration-300",
                                theme === "dark"
                                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                                    : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-secondary/50"
                            )}
                        >
                            <div className="flex flex-col items-center gap-3 relative z-10">
                                <Moon className={clsx("w-8 h-8 transition-colors", theme === "dark" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span className={clsx("font-black uppercase tracking-widest text-sm", theme === "dark" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>S.H.I.E.L.D. OS</span>
                                <span className="text-[10px] uppercase font-mono text-muted-foreground opacity-70">Dark Protocol</span>
                            </div>
                            {theme === "dark" && <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent animate-pulse" />}
                        </button>

                        <button
                            onClick={() => setTheme("system")}
                            className={clsx(
                                "group relative overflow-hidden p-6 rounded-lg border-2 transition-all duration-300",
                                theme === "system"
                                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
                                    : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-secondary/50"
                            )}
                        >
                            <div className="flex flex-col items-center gap-3 relative z-10">
                                <Monitor className={clsx("w-8 h-8 transition-colors", theme === "system" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                                <span className={clsx("font-black uppercase tracking-widest text-sm", theme === "system" ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>Auto-Detect</span>
                                <span className="text-[10px] uppercase font-mono text-muted-foreground opacity-70">System Sync</span>
                            </div>
                            {theme === "system" && <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent animate-pulse" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
