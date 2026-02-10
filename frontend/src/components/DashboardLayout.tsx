"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ShutdownOverlay from "./ShutdownOverlay";
import { ThemeProvider } from "@/providers/theme-provider";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <div className="flex h-screen overflow-hidden bg-background text-foreground relative transition-all duration-700">
                {/* Global Background Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.15),transparent_70%)] pointer-events-none" />

                <ShutdownOverlay isTriggered={isShuttingDown} onComplete={() => setIsShuttingDown(false)} />

                {/* Mobile Header */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-b border-border z-[60] flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                            <span className="text-primary font-black text-xs">A</span>
                        </div>
                        <h1 className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 uppercase">
                            Avengers
                        </h1>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Desktop Sidebar */}
                <div
                    className={clsx(
                        "hidden lg:block transition-all duration-300 relative z-20 flex-shrink-0 bg-card border-r border-border h-full",
                        sidebarOpen ? "w-64" : "w-20"
                    )}
                >
                    <Sidebar
                        isOpen={sidebarOpen}
                        toggle={() => setSidebarOpen(!sidebarOpen)}
                        onShutdown={() => setIsShuttingDown(true)}
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="lg:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-card border-r border-border z-[80]"
                            >
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <Sidebar
                                    isOpen={true}
                                    toggle={() => setMobileMenuOpen(false)}
                                    isMobile
                                    onShutdown={() => {
                                        setMobileMenuOpen(false);
                                        setIsShuttingDown(true);
                                    }}
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <main className={clsx(
                    "flex-1 overflow-y-auto relative z-10 transition-all duration-300",
                    isMobile ? "pt-16" : "pt-0"
                )}>
                    <motion.div
                        animate={isShuttingDown ? { opacity: 0, scale: 0.95, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1 }}
                        className={clsx(
                            "transition-all duration-300",
                            isMobile ? "p-4" : "p-8"
                        )}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </ThemeProvider>
    );
}
