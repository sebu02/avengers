"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "@/providers/theme-provider";
import clsx from "clsx";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <div className="flex h-screen overflow-hidden bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background relative">
                {/* Global Background Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div
                    className={clsx(
                        "transition-all duration-300 relative z-20 flex-shrink-0 bg-card border-r border-border h-full",
                        sidebarOpen ? "w-64" : "w-20"
                    )}
                >
                    <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
                </div>

                <main className="flex-1 overflow-y-auto relative z-10 transition-all duration-300">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}
