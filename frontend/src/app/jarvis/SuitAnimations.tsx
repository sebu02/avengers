"use client";
import { motion } from "framer-motion";
import { Hexagon, Octagon, Triangle, Square, Circle, Star, Zap, Shield } from "lucide-react";

export const SuitDeploymentAnimations = ({ suit }: any) => {
    const IconComponent = suit.icon;

    switch (suit.id) {
        case "mark-85":
            return <Mark85Animation suit={suit} />;
        case "mark-50":
            return <Mark50Animation suit={suit} />;
        case "mark-42":
            return <Mark42Animation suit={suit} />;
        case "hulkbuster":
            return <HulkbusterAnimation suit={suit} />;
        case "stealth":
            return <StealthAnimation suit={suit} />;
        case "space":
            return <SpaceAnimation suit={suit} />;
        default:
            return <DefaultAnimation suit={suit} IconComponent={IconComponent} />;
    }
};

// Mark 85 - Nano-Tech Assembly
const Mark85Animation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Nano particles */}
        {[...Array(100)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-500 rounded-full"
                initial={{
                    x: Math.cos(i * 0.2) * 400,
                    y: Math.sin(i * 0.2) * 400,
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 1, 0]
                }}
                transition={{ delay: i * 0.01, duration: 2 }}
            />
        ))}

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
        >
            <Hexagon className="w-64 h-64 text-red-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-4xl font-black text-red-500"
        >
            MARK 85 DEPLOYED
        </motion.div>
    </div>
);

// Mark 50 - Bleeding Edge
const Mark50Animation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950 to-black">
        {[...Array(8)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-48 h-48 border-4 border-red-500"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                initial={{ scale: 0, rotate: i * 45 }}
                animate={{ scale: [0, 1.5, 1], rotate: i * 45 + 360 }}
                transition={{ delay: i * 0.1, duration: 1.5 }}
            />
        ))}

        <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 720 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <Octagon className="w-64 h-64 text-red-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-4xl font-black text-red-500"
        >
            BLEEDING EDGE ACTIVE
        </motion.div>
    </div>
);

// Mark 42 - Autonomous Pieces
const Mark42Animation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                initial={{
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                    rotate: Math.random() * 360
                }}
                animate={{
                    x: Math.cos(i * 0.314) * 150,
                    y: Math.sin(i * 0.314) * 150,
                    rotate: 0
                }}
                transition={{ delay: i * 0.05, duration: 1 }}
            >
                <Triangle className="w-12 h-12 text-orange-500" />
            </motion.div>
        ))}

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
        >
            <Triangle className="w-64 h-64 text-orange-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-4xl font-black text-orange-500"
        >
            MARK 42 ASSEMBLED
        </motion.div>
    </div>
);

// Hulkbuster - Heavy Assembly
const HulkbusterAnimation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-950 to-black">
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-96 h-96 border-8 border-orange-500"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ delay: i * 0.3, duration: 0.5 }}
                style={{
                    transform: `rotate(${i * 90}deg)`
                }}
            />
        ))}

        <motion.div
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1, type: "spring" }}
        >
            <Square className="w-80 h-80 text-orange-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-5xl font-black text-orange-500"
        >
            HULKBUSTER ONLINE
        </motion.div>
    </div>
);

// Stealth - Cloaking Effect
const StealthAnimation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
        <motion.div
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: 2 }}
            className="absolute inset-0 bg-gradient-to-br from-slate-700 to-transparent"
        />

        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-slate-500 rounded-full"
                animate={{
                    x: [0, (Math.random() - 0.5) * 500],
                    y: [0, (Math.random() - 0.5) * 500],
                    opacity: [0, 1, 0]
                }}
                transition={{ delay: i * 0.05, duration: 2 }}
            />
        ))}

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 1, 0.3, 1] }}
            transition={{ duration: 3 }}
        >
            <Circle className="w-64 h-64 text-slate-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-20 text-4xl font-black text-slate-400"
        >
            STEALTH MODE ACTIVE
        </motion.div>
    </div>
);

// Space Armor - Orbital Deployment
const SpaceAnimation = ({ suit }: any) => (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-950 via-purple-950 to-black">
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: 9999, repeatType: "loop", delay: Math.random() * 2 }}
            />
        ))}

        {/* Orbital rings */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute border-2 border-blue-500 rounded-full"
                style={{
                    width: `${(i + 1) * 100}px`,
                    height: `${(i + 1) * 100}px`
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10 - i, repeat: 9999, repeatType: "loop", ease: "linear" }}
            />
        ))}

        <motion.div
            initial={{ scale: 0, y: -500 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5, type: "spring" }}
        >
            <Star className="w-64 h-64 text-blue-500" />
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-20 text-4xl font-black text-blue-500"
        >
            SPACE ARMOR DEPLOYED
        </motion.div>
    </div>
);

// Default Animation
const DefaultAnimation = ({ suit, IconComponent }: any) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                className={`absolute w-32 h-32 border-4 border-${suit.color}-500 rounded-lg`}
                initial={{ scale: 0, rotate: i * 30, opacity: 0 }}
                animate={{ scale: 1, rotate: i * 30, opacity: 0.5 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-64px',
                    marginTop: '-64px'
                }}
            />
        ))}

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 1, duration: 1 }}
            className="relative z-10"
        >
            <IconComponent className={`w-64 h-64 text-${suit.color}-500`} />
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className={`absolute bottom-20 text-4xl font-black text-${suit.color}-500`}
        >
            {suit.name.toUpperCase()} DEPLOYED
        </motion.div>
    </div>
);
