"use client";
import { motion } from "framer-motion";
import { Wrench, Zap, Activity } from "lucide-react";
import clsx from "clsx";

interface ArcReactorCardProps {
    power: number;
    onMaintenance: () => void;
}

export const ArcReactorCard = ({ power, onMaintenance }: ArcReactorCardProps) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-black/60 border-2 border-cyan-500 rounded-xl p-4 backdrop-blur-md relative overflow-hidden"
    >
        {/* Animated Background Pulse */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent"
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
        />

        {/* Energy Waves */}
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute inset-0 border-2 border-cyan-500 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 1.4]
                }}
                transition={{
                    duration: 3,
                    repeat: 9999,
                    repeatType: "loop",
                    delay: i * 1
                }}
            />
        ))}

        <div className="relative z-10">
            <h3 className="text-xs font-bold text-cyan-400 tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                ARC REACTOR
            </h3>

            {/* Reactor Visual */}
            <div className="relative w-40 h-40 mx-auto mb-4">
                {/* Outer rotating ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #06b6d4)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: 9999, repeatType: "loop", ease: "linear" }}
                />

                {/* Middle counter-rotating ring */}
                <motion.div
                    className="absolute inset-2 rounded-full"
                    style={{
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)'
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
                />

                {/* Inner core */}
                <motion.div
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(6,182,212,0.5)',
                            '0 0 40px rgba(6,182,212,0.8)',
                            '0 0 20px rgba(6,182,212,0.5)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                />

                {/* Center display */}
                <div className="absolute inset-8 rounded-full bg-slate-950 flex items-center justify-center border-2 border-cyan-500">
                    <motion.span
                        className="text-3xl font-black text-cyan-400"
                        animate={{
                            textShadow: [
                                '0 0 10px rgba(6,182,212,0.5)',
                                '0 0 20px rgba(6,182,212,1)',
                                '0 0 10px rgba(6,182,212,0.5)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                    >
                        {power}%
                    </motion.span>
                </div>

                {/* Energy beams */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 bg-cyan-500 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            transformOrigin: 'center',
                            transform: `rotate(${i * 30}deg) translateY(-70px)`,
                            height: '20px'
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            height: ['15px', '25px', '15px']
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: 9999,
                            repeatType: "loop",
                            delay: i * 0.125
                        }}
                    />
                ))}

                {/* Particle effects */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                            left: '50%',
                            top: '50%'
                        }}
                        animate={{
                            x: [0, Math.cos(i * 0.314) * 60],
                            y: [0, Math.sin(i * 0.314) * 60],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: 9999,
                            repeatType: "loop",
                            delay: i * 0.1
                        }}
                    />
                ))}
            </div>

            {/* Power Stats with animations */}
            <div className="space-y-2 text-xs mb-4">
                <StatRow label="OUTPUT" value="3 GJ/s" color="cyan" />
                <StatRow label="EFFICIENCY" value="99.7%" color="green" />
                <StatRow label="TEMPERATURE" value="2847°C" color="yellow" />
                <StatRow label="CORE STABILITY" value="OPTIMAL" color="cyan" />
            </div>

            {/* Maintenance Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMaintenance}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold text-sm relative overflow-hidden group"
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center justify-center gap-2">
                    <Wrench className="w-4 h-4" />
                    MAINTENANCE MODE
                </span>
            </motion.button>
        </div>
    </motion.div>
);

const StatRow = ({ label, value, color }: { label: string; value: string; color: string }) => (
    <motion.div
        className="flex justify-between items-center p-2 bg-slate-950/50 rounded border border-cyan-900/30"
        whileHover={{
            borderColor: `rgb(6 182 212)`,
            backgroundColor: 'rgba(6, 182, 212, 0.1)'
        }}
    >
        <span className="text-gray-400">{label}</span>
        <motion.span
            className={clsx("font-bold", `text-${color}-400`)}
            animate={{
                opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
        >
            {value}
        </motion.span>
    </motion.div>
);
