import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/DashboardLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "AVENGERS INITIATIVE",
    description: "S.H.I.E.L.D. Authorized Personnel Only",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Note: ThemeProvider is now inside DashboardLayout to handle the context correctly with client components
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased min-h-screen flex bg-background text-foreground overflow-hidden`}>
                <div className="flex w-full">
                    {/* The DashboardLayout handles the sidebar state and global theme */}
                    <div className="flex-1 h-screen overflow-hidden">
                        <DashboardLayout>
                            {children}
                        </DashboardLayout>
                    </div>
                </div>
            </body>
        </html>
    );
}
