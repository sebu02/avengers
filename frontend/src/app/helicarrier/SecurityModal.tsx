"use client";
import { motion } from "framer-motion";
import { Fingerprint, AlertTriangle } from "lucide-react";
import clsx from "clsx";

interface SecurityModalProps {
    securityStep: 'idle' | 'biometric' | 'dualkey' | 'code' | 'authorized';
    authCode: string;
    setAuthCode: (code: string) => void;
    key1Turned: boolean;
    setKey1Turned: (turned: boolean) => void;
    key2Turned: boolean;
    setKey2Turned: (turned: boolean) => void;
    handleSecurityAuth: () => void;
}

export const SecurityModal = ({
    securityStep,
    authCode,
    setAuthCode,
    key1Turned,
    setKey1Turned,
    key2Turned,
    setKey2Turned,
    handleSecurityAuth
}: SecurityModalProps) => {
    if (securityStep === 'idle' || securityStep === 'authorized') return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center font-mono"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 border-2 border-red-600 rounded-xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(220,38,38,0.3)]"
            >
                <div className="text-center mb-6">
                    <div className="text-red-600 text-xs uppercase tracking-[0.3em] mb-2">Nuclear Weapons Authorization</div>
                    <div className="text-white text-2xl font-black">SECURITY PROTOCOL</div>
                </div>

                {/* BIOMETRIC SCAN */}
                {securityStep === 'biometric' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="relative w-48 h-48 mx-auto">
                            <motion.div
                                className="absolute inset-0 border-4 border-red-500 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: 9999, repeatType: "loop", ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-4 border-2 border-red-400 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: 9999, repeatType: "loop", ease: "linear" }}
                            />
                            <Fingerprint className="absolute inset-0 m-auto w-24 h-24 text-red-500" />
                            <motion.div
                                className="absolute inset-0 bg-red-500/20 rounded-full"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 1.5, repeat: 9999, repeatType: "loop" }}
                            />
                        </div>
                        <div className="text-center">
                            <div className="text-red-500 text-sm font-bold animate-pulse">SCANNING BIOMETRICS</div>
                            <div className="text-gray-500 text-xs mt-2">Verifying retinal pattern...</div>
                            <div className="text-gray-500 text-xs">Analyzing fingerprint...</div>
                        </div>
                    </motion.div>
                )}

                {/* DUAL KEY SYSTEM */}
                {securityStep === 'dualkey' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center text-green-500 text-sm mb-4">✓ BIOMETRIC VERIFIED</div>
                        <div className="text-white text-center text-xs uppercase tracking-wider mb-6">
                            Turn Both Keys Simultaneously
                        </div>
                        <div className="flex justify-center gap-12">
                            {/* Key 1 */}
                            <div className="text-center">
                                <div className="text-[10px] text-gray-500 mb-2">KEY 1</div>
                                <motion.button
                                    onClick={() => setKey1Turned(!key1Turned)}
                                    animate={{ rotate: key1Turned ? 90 : 0 }}
                                    className={clsx(
                                        "w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all",
                                        key1Turned ? "border-green-500 bg-green-900/30 shadow-[0_0_20px_green]" : "border-red-600 bg-red-900/30"
                                    )}
                                >
                                    <div className="w-2 h-8 bg-white rounded-full" />
                                </motion.button>
                                <div className={clsx("text-[10px] mt-2 font-bold", key1Turned ? "text-green-500" : "text-red-500")}>
                                    {key1Turned ? "TURNED" : "LOCKED"}
                                </div>
                            </div>

                            {/* Key 2 */}
                            <div className="text-center">
                                <div className="text-[10px] text-gray-500 mb-2">KEY 2</div>
                                <motion.button
                                    onClick={() => setKey2Turned(!key2Turned)}
                                    animate={{ rotate: key2Turned ? 90 : 0 }}
                                    className={clsx(
                                        "w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all",
                                        key2Turned ? "border-green-500 bg-green-900/30 shadow-[0_0_20px_green]" : "border-red-600 bg-red-900/30"
                                    )}
                                >
                                    <div className="w-2 h-8 bg-white rounded-full" />
                                </motion.button>
                                <div className={clsx("text-[10px] mt-2 font-bold", key2Turned ? "text-green-500" : "text-red-500")}>
                                    {key2Turned ? "TURNED" : "LOCKED"}
                                </div>
                            </div>
                        </div>
                        {key1Turned && key2Turned && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={handleSecurityAuth}
                                className="w-full py-3 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-all"
                            >
                                PROCEED TO FINAL AUTHORIZATION
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* CODE ENTRY */}
                {securityStep === 'code' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center space-y-1 mb-4">
                            <div className="text-green-500 text-sm">✓ BIOMETRIC VERIFIED</div>
                            <div className="text-green-500 text-sm">✓ DUAL-KEY CONFIRMED</div>
                        </div>
                        <div className="text-white text-center text-xs uppercase tracking-wider mb-6">
                            Enter Authorization Code
                        </div>
                        <input
                            type="password"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            className="w-full bg-black/50 border-2 border-red-600 text-red-500 p-4 text-center tracking-[0.5em] focus:outline-none focus:border-red-400 transition-colors rounded text-xl font-mono"
                            placeholder="••••••"
                            autoFocus
                            maxLength={10}
                        />
                        <div className="text-[10px] text-gray-500 text-center">
                            Hint: Director's name, Year of founding, or Team name
                        </div>
                        <button
                            onClick={handleSecurityAuth}
                            className="w-full py-3 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-all uppercase tracking-wider"
                        >
                            Verify Code
                        </button>
                        <div className="flex items-center justify-center gap-2 text-[10px] text-orange-500 animate-pulse">
                            <AlertTriangle size={12} />
                            FINAL AUTHORIZATION STEP
                        </div>
                    </motion.div>
                )}

                {/* Warning Footer */}
                <div className="mt-8 pt-4 border-t border-red-900/30 text-center">
                    <div className="text-[8px] text-red-700 uppercase tracking-widest">
                        Unauthorized access is a federal crime
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
