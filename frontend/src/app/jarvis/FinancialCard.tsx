"use client";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, TrendingUp, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface FinancialCardProps {
    balance: number;
    stockPrice: number;
    onManageAccounts: () => void;
}

export const FinancialCard = ({ balance: initialBalance, stockPrice, onManageAccounts }: FinancialCardProps) => {
    const [balance, setBalance] = useState(initialBalance);
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [showIncrease, setShowIncrease] = useState(false);
    const [increaseAmount, setIncreaseAmount] = useState(0);

    const handleIncreaseBalance = () => {
        const increase = Math.floor(Math.random() * 500000000) + 100000000; // $100M - $600M
        setIncreaseAmount(increase);
        setIsIncreasing(true);
        setShowIncrease(true);

        // Animate balance increase
        const steps = 50;
        const increment = increase / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setBalance(prev => prev + increment);

            if (currentStep >= steps) {
                clearInterval(interval);
                setIsIncreasing(false);
                setTimeout(() => setShowIncrease(false), 2000);
            }
        }, 30);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/60 border-2 border-green-500 rounded-xl p-4 backdrop-blur-md relative overflow-hidden"
        >
            {/* Animated money background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: 9999, repeatType: "loop" }}
            />

            {/* Money rain effect when increasing */}
            <AnimatePresence>
                {isIncreasing && (
                    <>
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-green-500 font-bold text-xl"
                                initial={{
                                    x: `${Math.random() * 100}%`,
                                    y: -20,
                                    opacity: 1
                                }}
                                animate={{
                                    y: '120%',
                                    opacity: 0,
                                    rotate: Math.random() * 360
                                }}
                                transition={{
                                    duration: 2,
                                    delay: i * 0.1
                                }}
                            >
                                $
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

            <div className="relative z-10">
                <h3 className="text-xs font-bold text-green-400 tracking-wider mb-4 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    FINANCIALS
                </h3>

                <div className="space-y-4">
                    {/* Bank Balance */}
                    <div className="relative">
                        <div className="text-[10px] text-gray-400 mb-1">BANK BALANCE</div>
                        <motion.div
                            className="text-2xl font-black text-green-500 relative"
                            animate={isIncreasing ? {
                                textShadow: [
                                    '0 0 10px rgba(34,197,94,0.5)',
                                    '0 0 30px rgba(34,197,94,1)',
                                    '0 0 10px rgba(34,197,94,0.5)'
                                ]
                            } : {}}
                            transition={{ duration: 0.5, repeat: isIncreasing ? Infinity : 0, repeatType: "loop" }}
                        >
                            ${(balance / 1000000000).toFixed(2)}B
                        </motion.div>

                        {/* Increase indicator */}
                        <AnimatePresence>
                            {showIncrease && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, y: -30, scale: 1 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    className="absolute top-0 right-0 flex items-center gap-1 text-green-400 font-bold"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>${(increaseAmount / 1000000).toFixed(0)}M</span>
                                    <Sparkles className="w-4 h-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Stock Price */}
                    <div>
                        <div className="text-[10px] text-gray-400 mb-1">STARK INDUSTRIES</div>
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="text-xl font-black text-white"
                                animate={{
                                    textShadow: [
                                        '0 0 5px rgba(255,255,255,0.3)',
                                        '0 0 10px rgba(255,255,255,0.6)',
                                        '0 0 5px rgba(255,255,255,0.3)'
                                    ]
                                }}
                                transition={{ duration: 2, repeat: 9999, repeatType: "loop" }}
                            >
                                ${stockPrice}
                            </motion.div>
                            <motion.div
                                className="flex items-center text-green-500 text-xs"
                                animate={{ y: [-2, 2, -2] }}
                                transition={{ duration: 1.5, repeat: 9999, repeatType: "loop" }}
                            >
                                <TrendingUp className="w-4 h-4" />
                                +2.4%
                            </motion.div>
                        </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="h-20 flex items-end gap-1 bg-black/30 rounded-lg p-2">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t"
                                initial={{ height: 0 }}
                                animate={{
                                    height: `${40 + Math.random() * 60}%`,
                                }}
                                transition={{
                                    delay: i * 0.05,
                                    duration: 0.5,
                                    repeat: 9999,
                                    repeatType: "reverse",
                                    repeatDelay: 2
                                }}
                            />
                        ))}
                    </div>

                    {/* Manage Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleIncreaseBalance}
                        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-sm relative overflow-hidden group mb-2"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            INCREASE BALANCE
                        </span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onManageAccounts}
                        className="w-full py-3 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg font-bold text-sm relative overflow-hidden group border-2 border-green-500"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                        />
                        <span className="relative flex items-center justify-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            MANAGE ACCOUNTS
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Corner sparkles when increasing */}
            <AnimatePresence>
                {isIncreasing && (
                    <>
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute"
                                style={{
                                    top: i < 2 ? '10px' : 'auto',
                                    bottom: i >= 2 ? '10px' : 'auto',
                                    left: i % 2 === 0 ? '10px' : 'auto',
                                    right: i % 2 === 1 ? '10px' : 'auto'
                                }}
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{
                                    scale: [0, 1, 0],
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: 9999,
                                    repeatType: "loop",
                                    delay: i * 0.2
                                }}
                            >
                                <Sparkles className="w-6 h-6 text-green-400" />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
