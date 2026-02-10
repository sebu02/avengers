"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Globe, Clock, Building } from "lucide-react";
import { useState } from "react";

interface QuickActionsCardProps {
    onTimeTravel: () => void;
    onCallHappy: () => void;
    onUSControl: () => void;
    onStarkIndustries: () => void;
}

export const QuickActionsCard = ({
    onTimeTravel,
    onCallHappy,
    onUSControl,
    onStarkIndustries
}: QuickActionsCardProps) => {
    const [activeAction, setActiveAction] = useState<string | null>(null);

    const handleAction = (action: string, callback: () => void) => {
        setActiveAction(action);
        setTimeout(() => {
            callback();
            setActiveAction(null);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/60 border-2 border-purple-500 rounded-xl p-4 backdrop-blur-md relative overflow-hidden"
        >
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
            />

            <h3 className="text-xs font-bold text-purple-400 tracking-wider mb-4 relative z-10">QUICK ACTIONS</h3>

            <div className="grid grid-cols-2 gap-3 relative z-10">
                <ActionButton
                    icon={Phone}
                    label="CALL HAPPY"
                    color="green"
                    isActive={activeAction === 'happy'}
                    onClick={() => handleAction('happy', onCallHappy)}
                    animation="ring"
                />
                <ActionButton
                    icon={Globe}
                    label="CONTROL US"
                    color="red"
                    isActive={activeAction === 'us'}
                    onClick={() => handleAction('us', onUSControl)}
                    animation="spin"
                />
                <ActionButton
                    icon={Clock}
                    label="TIME TRAVEL"
                    color="purple"
                    isActive={activeAction === 'time'}
                    onClick={() => handleAction('time', onTimeTravel)}
                    animation="pulse"
                />
                <ActionButton
                    icon={Building}
                    label="STARK IND."
                    color="yellow"
                    isActive={activeAction === 'stark'}
                    onClick={() => handleAction('stark', onStarkIndustries)}
                    animation="bounce"
                />
            </div>
        </motion.div>
    );
};

interface ActionButtonProps {
    icon: any;
    label: string;
    color: string;
    isActive: boolean;
    onClick: () => void;
    animation: 'ring' | 'spin' | 'pulse' | 'bounce';
}

const ActionButton = ({ icon: Icon, label, color, isActive, onClick, animation }: ActionButtonProps) => {
    const getColorClasses = (color: string) => {
        const colors: any = {
            green: { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-500', glow: 'shadow-green-500' },
            red: { border: 'border-red-500', bg: 'bg-red-500', text: 'text-red-500', glow: 'shadow-red-500' },
            purple: { border: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-500', glow: 'shadow-purple-500' },
            yellow: { border: 'border-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-500', glow: 'shadow-yellow-500' },
        };
        return colors[color];
    };

    const colors = getColorClasses(color);

    const getAnimation = () => {
        switch (animation) {
            case 'ring':
                return {
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.5, repeat: isActive ? 9999 : 0, repeatType: "loop" as const }
                };
            case 'spin':
                return {
                    rotate: isActive ? 360 : 0,
                    transition: { duration: 1, repeat: isActive ? 9999 : 0, repeatType: "loop" as const, ease: "linear" }
                };
            case 'pulse':
                return {
                    scale: isActive ? [1, 1.2, 1] : 1,
                    transition: { duration: 0.5, repeat: isActive ? 9999 : 0, repeatType: "loop" as const }
                };
            case 'bounce':
                return {
                    y: isActive ? [0, -10, 0] : 0,
                    transition: { duration: 0.5, repeat: isActive ? 9999 : 0, repeatType: "loop" as const }
                };
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`p-4 rounded-lg border-2 transition-all relative overflow-hidden group ${colors.border} ${colors.bg}/10 hover:${colors.bg}/20`}
        >
            {/* Animated background sweep */}
            <motion.div
                className={`absolute inset-0 ${colors.bg}/20`}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
            />

            {/* Glow effect when active */}
            <AnimatePresence>
                {isActive && (
                    <>
                        <motion.div
                            className={`absolute inset-0 ${colors.bg}/30 blur-xl`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, repeat: 9999, repeatType: "loop" }}
                        />

                        {/* Ripple effect */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute inset-0 border-2 ${colors.border} rounded-lg`}
                                initial={{ opacity: 0.5, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.5 }}
                                transition={{ duration: 1, delay: i * 0.3, repeat: 9999, repeatType: "loop" }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>

            {/* Icon with custom animation */}
            <motion.div
                animate={getAnimation()}
                className="relative z-10"
            >
                <Icon className={`w-7 h-7 mx-auto mb-2 ${colors.text}`} />
            </motion.div>

            {/* Label */}
            <div className={`text-[9px] font-bold ${colors.text} relative z-10`}>
                {label}
            </div>

            {/* Particle effects when active */}
            <AnimatePresence>
                {isActive && (
                    <>
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-1 h-1 ${colors.bg} rounded-full`}
                                initial={{
                                    x: '50%',
                                    y: '50%',
                                    opacity: 1
                                }}
                                animate={{
                                    x: `${50 + Math.cos(i * 0.785) * 100}%`,
                                    y: `${50 + Math.sin(i * 0.785) * 100}%`,
                                    opacity: 0
                                }}
                                transition={{ duration: 1, repeat: 9999, repeatType: "loop" }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
