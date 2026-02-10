"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Shield, Zap, Target, Activity, Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const AVENGER_THEMES = [
    { id: "default", name: "S.H.I.E.L.D.", icon: Shield, class: "" },
    { id: "ironman", name: "Iron Man", icon: Zap, class: "theme-ironman" },
    { id: "cap", name: "Capt. America", icon: Target, class: "theme-cap" },
    { id: "hulk", name: "The Hulk", icon: Activity, class: "theme-hulk" },
    { id: "thor", name: "Thor", icon: Zap, class: "theme-thor" },
    { id: "blackwidow", name: "Black Widow", icon: Target, class: "theme-blackwidow" },
];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [avengerTheme, setAvengerTheme] = useState("default");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("avenger-theme") || "default";
        setAvengerTheme(saved);
        document.body.className = document.body.className.replace(/theme-\w+/g, "").trim();
        const themeObj = AVENGER_THEMES.find(t => t.id === saved);
        if (themeObj?.class) {
            document.body.classList.add(themeObj.class);
        }
    }, []);

    const changeAvengerTheme = (id: string) => {
        setAvengerTheme(id);
        localStorage.setItem("avenger-theme", id);
        document.body.className = document.body.className.replace(/theme-\w+/g, "").trim();
        const themeObj = AVENGER_THEMES.find(t => t.id === id);
        if (themeObj?.class) {
            document.body.classList.add(themeObj.class);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group"
            >
                <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-primary" />
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Interface UI</span>
                        <span className="text-[8px] font-mono text-muted-foreground uppercase">{avengerTheme} Protocol</span>
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 w-64 mb-4 p-4 bg-card border border-border rounded-2xl shadow-2xl z-[100] grid grid-cols-2 gap-2"
                    >
                        {/* System Themes */}
                        <div className="col-span-2 border-b border-border pb-2 mb-2 flex justify-between gap-2">
                            <button onClick={() => setTheme("light")} className={clsx("flex-1 p-2 rounded-lg flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", theme === "light" ? "bg-primary text-white shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-accent/5 hover:bg-accent/10")}>
                                <Sun size={12} /> Light
                            </button>
                            <button onClick={() => setTheme("dark")} className={clsx("flex-1 p-2 rounded-lg flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-tighter transition-all", theme === "dark" ? "bg-primary text-white shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-accent/5 hover:bg-accent/10")}>
                                <Moon size={12} /> Dark
                            </button>
                        </div>

                        {/* Avenger Themes */}
                        {AVENGER_THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => changeAvengerTheme(t.id)}
                                className={clsx(
                                    "flex items-center gap-2 p-2 rounded-xl transition-all border",
                                    avengerTheme === t.id
                                        ? "bg-primary/10 border-primary text-primary"
                                        : "bg-accent/5 border-transparent hover:border-primary/30"
                                )}
                            >
                                <t.icon size={14} className={avengerTheme === t.id ? "animate-pulse" : ""} />
                                <span className="text-[9px] font-bold uppercase tracking-tight">{t.name}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
