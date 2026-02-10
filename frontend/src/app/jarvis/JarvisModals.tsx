"use client";
import { motion } from "framer-motion";
import { X, Phone, Globe, Building, DollarSign, Wrench, CheckCircle, AlertTriangle } from "lucide-react";

// Maintenance Modal
export const MaintenanceModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-cyan-600 rounded-xl p-8 max-w-2xl w-full relative"
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-cyan-500 mb-6">ARC REACTOR MAINTENANCE</h2>

            <div className="space-y-4 mb-6">
                <MaintenanceItem label="Core Temperature" value="2847°C" status="OPTIMAL" />
                <MaintenanceItem label="Palladium Levels" value="98%" status="OPTIMAL" />
                <MaintenanceItem label="Energy Output" value="3 GJ/s" status="OPTIMAL" />
                <MaintenanceItem label="Shielding Integrity" value="100%" status="OPTIMAL" />
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-500"
            >
                COMPLETE MAINTENANCE
            </motion.button>
        </motion.div>
    </motion.div>
);

const MaintenanceItem = ({ label, value, status }: any) => (
    <div className="flex justify-between items-center p-3 bg-cyan-950/20 border border-cyan-900/50 rounded">
        <span className="text-sm text-gray-300">{label}</span>
        <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-cyan-400">{value}</span>
            <span className="text-xs text-green-500 font-bold">{status}</span>
        </div>
    </div>
);

// Happy Call Modal
export const HappyCallModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-green-600 rounded-xl p-8 max-w-md w-full text-center"
        >
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 9999, repeatType: "loop", repeatDelay: 1 }}
            >
                <Phone className="w-24 h-24 text-green-500 mx-auto mb-6" />
            </motion.div>

            <h2 className="text-2xl font-black text-green-500 mb-4">CALLING HAPPY HOGAN</h2>
            <p className="text-gray-400 mb-6">Connecting to secure line...</p>

            <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500">
                    END CALL
                </button>
            </div>
        </motion.div>
    </motion.div>
);

// US Control Modal
export const USControlModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-red-600 rounded-xl p-8 max-w-3xl w-full"
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-red-500 mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8" />
                US DEFENSE CONTROL
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <ControlItem label="NORAD Status" value="ACTIVE" color="green" />
                <ControlItem label="Defense Grid" value="ONLINE" color="green" />
                <ControlItem label="Satellite Network" value="OPERATIONAL" color="cyan" />
                <ControlItem label="Emergency Protocol" value="STANDBY" color="yellow" />
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600"
            >
                CLOSE
            </motion.button>
        </motion.div>
    </motion.div>
);

const ControlItem = ({ label, value, color }: any) => (
    <div className="p-4 bg-black/50 border border-gray-700 rounded-lg">
        <div className="text-xs text-gray-400 mb-1">{label}</div>
        <div className={`text-lg font-bold text-${color}-500`}>{value}</div>
    </div>
);

// Stark Industries Modal
export const StarkIndustriesModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-yellow-600 rounded-xl p-8 max-w-3xl w-full"
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-yellow-500 mb-6 flex items-center gap-3">
                <Building className="w-8 h-8" />
                STARK INDUSTRIES
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <CompanyMetric label="Revenue" value="$487B" />
                <CompanyMetric label="Employees" value="47,284" />
                <CompanyMetric label="R&D Budget" value="$84B" />
                <CompanyMetric label="Patents" value="12,847" />
                <CompanyMetric label="Facilities" value="284" />
                <CompanyMetric label="Market Cap" value="$2.4T" />
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-500"
            >
                CLOSE
            </motion.button>
        </motion.div>
    </motion.div>
);

const CompanyMetric = ({ label, value }: any) => (
    <div className="p-4 bg-yellow-950/20 border border-yellow-900/50 rounded-lg text-center">
        <div className="text-xs text-gray-400 mb-1">{label}</div>
        <div className="text-xl font-bold text-yellow-500">{value}</div>
    </div>
);

// Manage Accounts Modal
export const ManageAccountsModal = ({ onClose }: { onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border-2 border-green-600 rounded-xl p-8 max-w-2xl w-full"
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-green-500 mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8" />
                BANK ACCOUNTS
            </h2>

            <div className="space-y-3 mb-6">
                <AccountItem name="Personal Account" balance="$8.4B" />
                <AccountItem name="Stark Industries" balance="$487B" />
                <AccountItem name="Avengers Fund" balance="$12.8B" />
                <AccountItem name="R&D Reserve" balance="$84B" />
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500"
            >
                CLOSE
            </motion.button>
        </motion.div>
    </motion.div>
);

const AccountItem = ({ name, balance }: any) => (
    <div className="flex justify-between items-center p-4 bg-green-950/20 border border-green-900/50 rounded-lg">
        <span className="text-sm font-bold text-white">{name}</span>
        <span className="text-xl font-black text-green-500">{balance}</span>
    </div>
);
