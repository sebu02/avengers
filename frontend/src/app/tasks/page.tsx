"use client";
import { useState, useEffect } from "react";
import {
    Plus, Trash2, Edit2, CheckCircle, RefreshCcw, X, Save,
    Target, Zap, Shield, User, BarChart3, Clock, ChevronRight,
    Search, Filter, MessageSquare, AlertTriangle
} from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";
import { Task } from "@/types";
import { getTasks, createTask, updateTask, deleteTask as apiDeleteTask } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

const HEROES = [
    { name: "IRON MAN", color: "text-red-500", progress: 65, missions: 12, power: "Arc Reactor", loc: "Stark Tower" },
    { name: "BLACK WIDOW", color: "text-slate-400", progress: 92, missions: 45, power: "Espionage", loc: "Classified" },
    { name: "CAPTAIN AMERICA", color: "text-blue-500", progress: 88, missions: 30, power: "Super Soldier", loc: "Brooklyn" },
];

export default function MissionsPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState<Task | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Form State
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">("TODO");

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const openModal = (task?: Task) => {
        if (task) {
            setEditingTask(task);
            setTitle(task.title);
            setPriority(task.priority || 1);
            setStatus(task.status);
        } else {
            setEditingTask(null);
            setTitle("");
            setPriority(1);
            setStatus("TODO");
        }
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    }

    const handleSave = async () => {
        if (!title.trim()) return;
        try {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, { title, priority, status });
                setTasks(tasks.map(t => t.id === editingTask.id ? updated : t));
            } else {
                const newTask = await createTask({ title, status, priority });
                setTasks([...tasks, newTask]);
            }
            closeModal();
        } catch (error) {
            console.error("Failed to save task", error);
        }
    }

    const toggleStatus = async (task: Task) => {
        const newStatus = task.status === "DONE" ? "TODO" : "DONE";
        try {
            const updated = await updateTask(task.id, { status: newStatus });
            setTasks(tasks.map(t => t.id === task.id ? updated : t));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-32 px-4">

            {/* HERO PERFORMANCE TRACKER */}
            <section className="bg-slate-900/60 border border-cyan-500/20 rounded-[32px] p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <BarChart3 size={150} />
                </div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <BarChart3 className="text-cyan-500" size={24} />
                    </div>
                    <h2 className="text-sm font-black tracking-[0.4em] text-white uppercase italic">Avenger Performance Metrics</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {HEROES.map((hero, i) => (
                        <motion.div
                            key={hero.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group/hero"
                        >
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className={`text-xs font-black ${hero.color} tracking-widest uppercase mb-1`}>{hero.name}</h3>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{hero.missions} Deployments • {hero.loc}</p>
                                </div>
                                <span className="text-sm font-black font-mono text-white italic">{hero.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${hero.progress}%` }}
                                    className={clsx("h-full rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)]", hero.color.replace('text-', 'bg-'))}
                                />
                            </div>
                            <div className="flex justify-between items-center opacity-0 group-hover/hero:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black text-slate-500 uppercase">Core: {hero.power}</span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
                                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-75" />
                                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MISSION LIST HEADER */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
                <div className="relative">
                    <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4 mb-3 uppercase italic">
                        <Target className="text-cyan-500 animate-pulse" size={44} />
                        Active <span className="text-cyan-500 not-italic">Missions</span>
                    </h1>
                    <div className="flex items-center gap-4 pl-1">
                        <div className="h-0.5 w-12 bg-cyan-500/50" />
                        <p className="text-[10px] text-slate-400 font-mono tracking-[0.3em] uppercase">
                            Strategic directives for earth's mightiest heroes
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="relative hidden md:block group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
                        <input
                            placeholder="SEARCH ENCRYPTED LOGS..."
                            className="bg-slate-900/50 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-[10px] font-black tracking-widest text-white focus:border-cyan-500/50 outline-none w-64 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="px-10 py-4 bg-cyan-600 text-white font-black text-xs tracking-[0.3em] uppercase rounded-none hover:bg-cyan-500 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-3 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                        <Plus size={18} /> Issue Directive
                    </button>
                </div>
            </header>

            {/* MISSIONS GRID */}
            {loading ? (
                <div className="text-center py-40 bg-slate-900/20 rounded-3xl border border-white/5 border-dashed">
                    <RefreshCcw className="w-12 h-12 text-cyan-500/40 animate-spin mx-auto pb-4" />
                    <span className="text-xs font-black tracking-[0.5em] text-slate-500 uppercase">Synchronizing with JARVIS Network...</span>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6"
                >
                    {tasks.map((task, i) => (
                        <motion.div
                            key={task.id}
                            variants={itemVariants}
                            onClick={() => setSelectedMission(task)}
                            className={clsx(
                                "group relative flex flex-col md:flex-row md:items-center gap-8 p-8 bg-slate-900/40 border border-white/5 hover:border-cyan-500/40 transition-all cursor-pointer rounded-2xl overflow-hidden backdrop-blur-sm",
                                task.status === 'DONE' && "opacity-50 hover:opacity-80"
                            )}
                        >
                            {/* Animated Background Pulse */}
                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-500" />

                            {/* Status Stripe */}
                            <div className={clsx(
                                "absolute top-0 left-0 w-1.5 h-full transition-all duration-300 group-hover:w-2",
                                task.priority >= 3 ? "bg-red-500 shadow-[0_0_15px_red]" : "bg-cyan-500 shadow-[0_0_15px_cyan]"
                            )} />

                            {/* Avenger Deployment Animation */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-500">
                                <span className="text-[8px] font-black text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 italic tracking-widest">AVENGER DEPLOYED</span>
                            </div>

                            <div className="flex-1 flex items-start gap-6 relative z-10">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleStatus(task);
                                    }}
                                    className={clsx(
                                        "w-14 h-14 shrink-0 border-2 rounded-xl flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12",
                                        task.status === 'DONE' ? "bg-cyan-500 border-cyan-500 text-black scale-110 shadow-[0_0_20px_cyan]" : "border-white/10 text-transparent hover:border-cyan-500/50 hover:bg-cyan-500/5"
                                    )}
                                >
                                    <CheckCircle size={24} className={task.status === 'DONE' ? 'opacity-100' : 'opacity-0'} />
                                </button>

                                <div className="space-y-3">
                                    <h3 className="text-xl font-black text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors italic">{task.title}</h3>
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase group-hover:text-slate-300 transition-colors">
                                            <Clock size={12} className="text-cyan-500" />
                                            {format(new Date(task.created_at || Date.now()), "HH:mm • dd MMM")}
                                        </div>
                                        <div className={clsx(
                                            "flex items-center gap-2 text-[10px] font-black uppercase px-3 py-1 rounded-full",
                                            task.priority >= 3 ? "text-red-500 bg-red-500/10 border border-red-500/20" : "text-cyan-500 bg-cyan-500/10 border border-cyan-500/20"
                                        )}>
                                            <Zap size={10} className="fill-current" />
                                            Priority Level {task.priority}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                                            <AlertTriangle size={10} />
                                            STABILIZATION: ACTIVE
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ASSIGNED HERO */}
                            <div className="flex items-center gap-4 md:border-l-2 border-white/5 md:pl-10 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-0.5">Assigned Agent</p>
                                    <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">{HEROES[i % HEROES.length].name}</p>
                                </div>
                                <ChevronRight className="text-white/10 group-hover:text-cyan-500 transition-colors ml-4 md:opacity-0 group-hover:opacity-100" />
                            </div>

                            {/* HIDDEN TECH OVERLAY */}
                            <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                <Shield size={100} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* MISSION DETAIL DIALOG */}
            <AnimatePresence>
                {selectedMission && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                            onClick={() => setSelectedMission(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 30 }}
                            className="relative w-full max-w-3xl bg-slate-950 border-2 border-cyan-500/30 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.2)]"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

                            <div className="p-12 space-y-10">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-6 bg-cyan-500 shadow-[0_0_10px_cyan]" />
                                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">MISSION DEBRIEF: {selectedMission.id}</span>
                                        </div>
                                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter max-w-md">{selectedMission.title}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                openModal(selectedMission);
                                                setSelectedMission(null);
                                            }}
                                            className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500 hover:text-cyan-500 transition-all hover:scale-105"
                                        >
                                            <Edit2 size={24} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedMission(null)}
                                            className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-all hover:scale-105"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="space-y-8">
                                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                                <Target size={60} />
                                            </div>
                                            <h4 className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-4">Tactical Intelligence</h4>
                                            <p className="text-slate-300 font-medium text-sm leading-relaxed italic">
                                                "Current satellite scans indicate fluctuating energy readings in this sector. Assigned operatives are advised to proceed with extreme caution. Standard engagement protocols apply."
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-5 bg-black/40 border border-white/10 rounded-2xl">
                                                <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Alert Level</span>
                                                <span className={clsx("text-lg font-black uppercase italic", selectedMission.priority >= 3 ? "text-red-500" : "text-cyan-500")}>
                                                    {selectedMission.priority >= 3 ? "CRITICAL" : "STANDARD"}
                                                </span>
                                            </div>
                                            <div className="p-5 bg-black/40 border border-white/10 rounded-2xl">
                                                <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Status</span>
                                                <span className="text-lg font-black text-white uppercase italic">{selectedMission.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="aspect-square bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10" />
                                            <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${selectedMission.id}`} className="w-full h-full object-cover opacity-20 grayscale" alt="Tactical Map" />
                                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                                <div className="text-center group-hover:scale-105 transition-transform">
                                                    <Search className="text-cyan-500 mx-auto mb-3 animate-pulse" size={40} />
                                                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">ACCESS TACTICAL MAP</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button className="flex-1 py-4 bg-white/5 border border-white/10 text-[10px] font-black text-white hover:bg-white/10 transition-all rounded-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                                <MessageSquare size={14} /> Team Comm
                                            </button>
                                            <button
                                                onClick={() => {
                                                    apiDeleteTask(selectedMission.id).then(() => {
                                                        fetchTasks();
                                                        setSelectedMission(null);
                                                    });
                                                }}
                                                className="px-6 py-4 border-2 border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all rounded-2xl"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-950/20 p-6 border-t border-cyan-500/10 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest italic">Uplink Secured</span>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{format(new Date(), "yyyy-MM-dd HH:mm:ss")}</span>
                                </div>
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">End of Directive</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* EDIT/CREATE MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={closeModal} />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative w-full max-w-xl bg-slate-900 border-2 border-cyan-500/30 p-12 space-y-10 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.3)]"
                        >
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">Tactical Briefing</h2>
                                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.3em]">Authorized Command Only</p>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Directive Title</label>
                                    <input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-sm focus:border-cyan-500 outline-none transition-all rounded-xl placeholder:text-white/10"
                                        placeholder="ENCRYPTED TITLE REQUIRED..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Threat Assessment</label>
                                        <select value={priority} onChange={e => setPriority(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-xs focus:border-cyan-500 outline-none rounded-xl appearance-none cursor-pointer">
                                            <option value={1}>LEVEL 1: ROUTINE</option>
                                            <option value={2}>LEVEL 2: URGENT</option>
                                            <option value={3}>LEVEL 3: CRITICAL</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest pl-1">Deployment Phase</label>
                                        <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full bg-black/50 border border-white/10 p-5 text-white font-mono text-xs focus:border-cyan-500 outline-none rounded-xl appearance-none cursor-pointer">
                                            <option value="TODO">WAITING</option>
                                            <option value="IN_PROGRESS">DEPLOYED</option>
                                            <option value="DONE">SUCCESS</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        onClick={handleSave}
                                        className="w-full py-5 bg-cyan-600 text-white font-black text-xs tracking-[0.4em] uppercase hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 rounded-xl shadow-[0_10px_30px_rgba(6,182,212,0.2)] active:scale-95 group"
                                    >
                                        <Save size={18} className="group-hover:rotate-12 transition-transform" />
                                        {editingTask ? "Update Briefing" : "Issue Mission"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
