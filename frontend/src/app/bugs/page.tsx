"use client";
import { useState, useEffect } from "react";
import {
    Plus, ShieldAlert, AlertCircle, RefreshCcw, X, Edit, Trash2,
    CheckCircle2, Clock, DollarSign, Hammer, User, Activity, Flame,
    TrendingDown, ShieldCheck, Map, CreditCard, Box, Zap,
    Database, Search, Target, ChevronRight, Save
} from "lucide-react";
import clsx from "clsx";
import { Bug } from "@/types";
import { getBugs, createBug, updateBug, deleteBug } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function DamageAssessmentPage() {
    const [reports, setReports] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Bug | null>(null);
    const [editingReport, setEditingReport] = useState<Bug | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState<Bug["status"]>("OPEN");

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await getBugs();
            setReports(data);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const openModal = (bug?: Bug) => {
        if (bug) {
            setEditingReport(bug);
            setTitle(bug.title);
            setDescription(bug.description || "");
            setPriority(bug.priority);
            setStatus(bug.status);
        } else {
            setEditingReport(null);
            setTitle("");
            setDescription("");
            setPriority(1);
            setStatus("OPEN");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingReport(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingReport) {
                const updated = await updateBug(editingReport.id, { title, description, priority, status });
                setReports(reports.map(r => r.id === editingReport.id ? updated : r));
            } else {
                const newReport = await createBug({ title, description, priority, status });
                setReports([...reports, newReport]);
            }
            closeModal();
            fetchReports();
        } catch (error) {
            console.error("Failed to save report", error);
        }
    };

    const getTotalDamage = () => reports.reduce((acc, curr) => acc + (curr.priority * 150000), 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-32 px-4">

            {/* COLLATERAL DAMAGE OVERVIEW */}
            <section className="bg-slate-900/80 border-2 border-orange-500/20 rounded-[40px] p-10 backdrop-blur-2xl relative overflow-hidden group shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                {/* Decorative Tech Elements */}
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <Flame size={200} className="text-orange-500" />
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <TrendingDown className="text-orange-500" size={16} />
                            <h2 className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase">Collateral Impact Study</h2>
                        </div>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-5xl font-black text-white italic tracking-tighter"
                        >
                            $ {getTotalDamage().toLocaleString()}
                        </motion.h3>
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] flex items-center gap-2">
                            <Box size={10} /> Total Estimated Property Damage
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className="flex-1 min-w-[140px] p-6 bg-orange-500/5 border border-orange-500/20 rounded-3xl group/claim relative overflow-hidden">
                            <div className="absolute inset-0 bg-orange-500/0 group-hover/claim:bg-orange-500/5 transition-colors" />
                            <span className="block text-[8px] font-black text-orange-400 uppercase tracking-widest mb-2">Active Claims</span>
                            <span className="text-3xl font-black text-white italic">{reports.filter(r => r.status === 'OPEN').length}</span>
                        </div>
                        <div className="flex-1 min-w-[140px] p-6 bg-green-500/5 border border-green-500/20 rounded-3xl group/paid relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-500/0 group-hover/paid:bg-green-500/5 transition-colors" />
                            <span className="block text-[8px] font-black text-green-400 uppercase tracking-widest mb-2">Resolved</span>
                            <span className="text-3xl font-black text-white italic">{reports.filter(r => r.status === 'RESOLVED').length}</span>
                        </div>
                    </div>

                    <div className="lg:text-right">
                        <button className="px-10 py-5 bg-white/5 border-2 border-white/10 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:bg-white/10 hover:border-orange-500/50 transition-all rounded-2xl active:scale-95 flex items-center gap-3 lg:ml-auto">
                            <Database size={16} /> Sync Tactical Log
                        </button>
                    </div>
                </div>
            </section>

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
                <div className="relative">
                    <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-5 mb-3 uppercase italic">
                        <ShieldAlert className="text-orange-500 animate-pulse" size={48} />
                        Damage <span className="text-orange-500 not-italic">Reports</span>
                    </h1>
                    <div className="flex items-center gap-4 pl-1">
                        <div className="h-0.5 w-16 bg-orange-500/50" />
                        <p className="text-[10px] text-slate-400 font-mono tracking-[0.4em] uppercase">
                            Mission-critical debriefs and property claim tracking
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-12 py-5 bg-orange-600 text-white font-black text-xs tracking-[0.3em] uppercase rounded-none hover:bg-orange-500 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(249,115,22,0.3)] group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                    + Log New Incident
                </button>
            </header>

            {loading ? (
                <div className="text-center py-40 bg-slate-900/20 rounded-[40px] border-2 border-white/5 border-dashed">
                    <RefreshCcw className="w-16 h-16 text-orange-500/20 animate-spin mx-auto mb-6" />
                    <span className="text-xs font-black tracking-[0.6em] text-slate-600 uppercase">Calculating Insurance Premiums...</span>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {reports.map((report) => (
                        <motion.div
                            key={report.id}
                            variants={cardVariants}
                            onClick={() => setSelectedReport(report)}
                            className="group relative bg-slate-900/40 border-2 border-white/5 p-8 rounded-[32px] hover:border-orange-500/40 transition-all cursor-pointer overflow-hidden backdrop-blur-md"
                        >
                            {/* Futuristic Scan Line */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-0.5 bg-orange-500/20 z-0"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Avenger Deployment Animation */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-500 z-20">
                                {report.status === 'RESOLVED' ? (
                                    <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20 italic tracking-widest">REPAIR PROTOCOL ACTIVE</span>
                                ) : (
                                    <span className="text-[8px] font-black text-orange-500 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 italic tracking-widest">AVENGER DEPLOYED</span>
                                )}
                            </div>

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className={clsx(
                                    "px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] uppercase",
                                    report.priority >= 4 ? "bg-red-500/20 text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "bg-orange-500/20 text-orange-500 border border-orange-500/30"
                                )}>
                                    SEVERITY: LVL {report.priority}
                                </div>
                                <div className="text-[10px] font-black text-white/20 uppercase font-mono tracking-widest">LOG#{report.id}</div>
                            </div>

                            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors italic relative z-10">
                                {report.title}
                            </h3>

                            <p className="text-xs text-slate-400 italic mb-10 line-clamp-3 leading-relaxed relative z-10">
                                {report.description || "No mission debrief provided for this anomaly."}
                            </p>

                            <div className="space-y-4 mb-8 relative z-10">
                                <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5 group-hover:border-orange-500/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <DollarSign size={14} className="text-green-500" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Damage</span>
                                    </div>
                                    <span className="text-sm font-black text-white italic">${(report.priority * 150000).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center bg-transparent px-4">
                                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        <User size={14} className="text-orange-500" />
                                        <span>Avenger</span>
                                    </div>
                                    <span className="text-[10px] font-black text-orange-400 uppercase italic">Classified Agent</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className={clsx("w-2 h-2 rounded-full",
                                        report.status === 'OPEN' ? "bg-orange-500 animate-pulse shadow-[0_0_10px_orange]" :
                                            report.status === 'RESOLVED' ? "bg-green-500 shadow-[0_0_10px_green]" : "bg-slate-500"
                                    )} />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.status}</span>
                                </div>
                                <ChevronRight className="text-white/10 group-hover:text-orange-500 transition-all transform group-hover:translate-x-1" size={20} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* DAMAGE DETAIL DIALOG */}
            <AnimatePresence>
                {selectedReport && (
                    <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar">
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
                                onClick={() => setSelectedReport(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                                className="relative z-10 w-full max-w-3xl bg-slate-950 border-2 border-orange-500/30 rounded-[44px] overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.15)]"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

                                <div className="p-12 space-y-10 relative">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-6 bg-orange-500 shadow-[0_0_10px_orange]" />
                                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em]">INCIDENT CASE: {selectedReport.id}</span>
                                            </div>
                                            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter max-w-md leading-none">{selectedReport.title}</h2>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => {
                                                    openModal(selectedReport);
                                                    setSelectedReport(null);
                                                }}
                                                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500 hover:text-orange-500 transition-all hover:scale-110 active:scale-95"
                                            >
                                                <Edit size={24} />
                                            </button>
                                            <button
                                                onClick={() => setSelectedReport(null)}
                                                className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                        <div className="space-y-8">
                                            <div className="p-8 bg-orange-500/5 border border-orange-500/10 rounded-[32px] relative group overflow-hidden">
                                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                                    <ShieldAlert size={60} />
                                                </div>
                                                <h4 className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] mb-4">Damage Debrief</h4>
                                                <p className="text-slate-300 font-medium text-sm leading-relaxed italic">
                                                    "{selectedReport.description || "The mission resulted in significant architectural strain. Full liability assessment is underway. Local authorities have been notified."}"
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                                                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Impact Cost</span>
                                                    <span className="text-xl font-black text-white italic">${(selectedReport.priority * 150000).toLocaleString()}</span>
                                                </div>
                                                <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                                                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Status Phase</span>
                                                    <span className="text-xl font-black text-orange-500 uppercase italic leading-none">{selectedReport.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="aspect-video bg-black/60 rounded-[32px] border border-white/10 overflow-hidden relative group">
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
                                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                                    <div className="text-center group-hover:scale-110 transition-transform">
                                                        <Target size={48} className="text-orange-500 mx-auto mb-4 animate-pulse" />
                                                        <span className="text-[10px] font-black text-orange-500/50 uppercase tracking-[0.3em]">SCAN INCIDENT COORDINATES</span>
                                                    </div>
                                                </div>
                                                {/* Decorative Scan Lines */}
                                                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                                                    {[...Array(20)].map((_, i) => (
                                                        <div key={i} className="h-[1px] w-full bg-orange-500/50 mt-2" />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <button className="flex-1 py-5 bg-orange-600 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-orange-500 transition-all rounded-[20px] shadow-[0_15px_30px_rgba(249,115,22,0.2)] flex items-center justify-center gap-3 active:scale-95">
                                                    <CreditCard size={18} /> Authorize Payment
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteBug(selectedReport.id).then(() => {
                                                            fetchReports();
                                                            setSelectedReport(null);
                                                        });
                                                    }}
                                                    className="px-6 py-5 bg-white/5 border border-white/10 text-red-500 hover:bg-red-500/10 hover:border-red-500/50 transition-all rounded-[20px] active:scale-95"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-950/20 p-6 border-t border-orange-500/10 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                            <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Insurance Uplink Secure</span>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">Encrypted Assessment Log</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* CREATE/EDIT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] overflow-y-auto custom-scrollbar">
                        <div className="min-h-full flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/95 backdrop-blur-md"
                                onClick={closeModal}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative z-10 w-full max-w-xl bg-slate-900 border-2 border-orange-500/30 p-12 space-y-10 rounded-[40px] shadow-[0_0_80px_rgba(249,115,22,0.2)]"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="text-orange-500" size={24} />
                                        <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Incident Log</h2>
                                    </div>
                                    <p className="text-[10px] text-orange-500 font-bold uppercase tracking-[0.4em] pl-1">Authorized Damage Assessment Only</p>
                                </div>

                                <form onSubmit={handleSave} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Location / Event</label>
                                        <input
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-sm focus:border-orange-500 outline-none transition-all rounded-2xl placeholder:opacity-20"
                                            placeholder="E.G. NEW YORK INVASION DAMAGE..."
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Impact Level (1-5)</label>
                                            <select value={priority} onChange={e => setPriority(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-xs focus:border-orange-500 outline-none rounded-2xl appearance-none cursor-pointer">
                                                {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>LEVEL {v} DAMAGE</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Status</label>
                                            <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-xs focus:border-orange-500 outline-none rounded-2xl appearance-none cursor-pointer">
                                                <option value="OPEN">UNDER REVIEW</option>
                                                <option value="IN_PROGRESS">FUNDS ALLOCATED</option>
                                                <option value="RESOLVED">COMPENSATED</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Incident Debrief</label>
                                        <textarea
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-sm focus:border-orange-500 outline-none transition-all rounded-2xl h-32 resize-none placeholder:opacity-20"
                                            placeholder="DESCRIBE THE PROPERTY DAMAGE OR COLLATERAL LOSS..."
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button type="submit" className="w-full py-5 bg-orange-600 text-white font-black text-xs tracking-[0.4em] uppercase hover:bg-orange-500 transition-all flex items-center justify-center gap-4 rounded-2xl shadow-[0_15px_30px_rgba(249,115,22,0.3)] active:scale-95 group">
                                            <Save size={18} className="group-hover:rotate-12 transition-transform" />
                                            Finalize Assessment
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
