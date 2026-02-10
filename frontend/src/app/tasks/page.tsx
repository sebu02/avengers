"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, CheckCircle, Circle, RefreshCcw, X, Save } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";
import { Task } from "@/types";
import { getTasks, createTask, updateTask, deleteTask as apiDeleteTask } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleSave = async () => {
        if (!title.trim()) return;

        try {
            if (editingTask) {
                const updated = await updateTask(editingTask.id, {
                    title,
                    priority,
                    status
                });
                setTasks(tasks.map((t) => (t.id === editingTask.id ? updated : t)));
            } else {
                const newTask = await createTask({
                    title,
                    status,
                    priority,
                });
                setTasks([...tasks, newTask]);
            }
            closeModal();
        } catch (error) {
            console.error("Failed to save task", error);
        }
    };

    const toggleStatus = async (task: Task) => {
        const newStatus = task.status === "DONE" ? "TODO" : "DONE";
        try {
            const updated = await updateTask(task.id, { status: newStatus });
            setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
        } catch (error) {
            console.error("Failed to update task status", error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!confirm("Confirm directive cancellation?")) return;
        try {
            await apiDeleteTask(id);
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 relative">
            <header className="flex items-center justify-between border-b border-primary/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-widest text-foreground mb-2 flex items-center gap-3">
                        <span className="w-3 h-8 bg-primary block" />
                        Active Missions
                    </h1>
                    <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider pl-6">Execute directives with extreme prejudice.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-primary/90 hover:bg-primary text-primary-foreground px-6 py-3 rounded-none flex items-center gap-2 transition-all hover:tracking-widest shadow-[0_0_15px_rgba(14,165,233,0.3)] border border-white/10 uppercase font-bold text-xs tracking-wider"
                >
                    <Plus className="w-4 h-4" />
                    New Order
                </button>
            </header>

            {loading ? (
                <div className="text-center py-12 text-muted-foreground flex items-center justify-center gap-2 font-mono uppercase tracking-widest">
                    <RefreshCcw className="w-5 h-5 animate-spin" /> Retrieving Directives...
                </div>
            ) : (
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={task.id}
                            className={clsx(
                                "group flex items-center gap-4 p-4 rounded-none border-l-4 transition-all bg-card/40 backdrop-blur-sm hover:bg-card/60",
                                task.status === "DONE"
                                    ? "border-green-500/50 opacity-60"
                                    : "border-primary shadow-[0_0_10px_rgba(14,165,233,0.1)]"
                            )}
                        >
                            <button
                                onClick={() => toggleStatus(task)}
                                className={clsx(
                                    "w-6 h-6 rounded-sm flex items-center justify-center transition-colors border",
                                    task.status === "DONE"
                                        ? "bg-green-500/20 border-green-500 text-green-500"
                                        : "bg-transparent border-primary/50 text-transparent hover:border-primary hover:text-primary/50"
                                )}
                            >
                                <CheckCircle className="w-4 h-4" />
                            </button>

                            <div className="flex-1">
                                <h3 className={clsx("font-bold uppercase tracking-wide transition-all", task.status === "DONE" ? "line-through text-muted-foreground" : "text-foreground")}>
                                    {task.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider flex gap-4">
                                    <span>Priority: <span className="text-primary">{task.priority}</span></span>
                                    <span>Issued: {format(new Date(task.created_at || new Date()), "HH:mm | dd MMM yyyy")}</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openModal(task)}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/30"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors border border-transparent hover:border-destructive/30"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {tasks.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground font-mono uppercase tracking-widest border border-dashed border-primary/20 p-8">
                            No active directives found. Standby for orders.
                        </div>
                    )}
                </div>
            )}

            {/* Edit/Create Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative z-60 bg-slate-900 border border-primary/30 w-full max-w-lg shadow-[0_0_50px_rgba(14,165,233,0.15)]"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />

                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-6 bg-primary block" />
                                    {editingTask ? "Update Directive" : "New Order"}
                                </h2>
                                <button onClick={closeModal} className="text-muted-foreground hover:text-primary transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase text-muted-foreground tracking-widest">Directive Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-slate-950 border border-primary/20 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                                        placeholder="ENTER MISSION OBJECTIVE"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase text-muted-foreground tracking-widest">Priority Level</label>
                                        <select
                                            value={priority}
                                            onChange={(e) => setPriority(Number(e.target.value))}
                                            className="w-full bg-slate-950 border border-primary/20 p-3 text-sm focus:border-primary focus:outline-none font-mono"
                                        >
                                            <option value={1}>LEVEL 1 (ROUTINE)</option>
                                            <option value={2}>LEVEL 2 (URGENT)</option>
                                            <option value={3}>LEVEL 3 (CRITICAL)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase text-muted-foreground tracking-widest">Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value as "TODO" | "IN_PROGRESS" | "DONE")}
                                            className="w-full bg-slate-950 border border-primary/20 p-3 text-sm focus:border-primary focus:outline-none font-mono"
                                        >
                                            <option value="TODO">PENDING</option>
                                            <option value="IN_PROGRESS">ACTIVE</option>
                                            <option value="DONE">COMPLETED</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/50 py-4 uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Confirm Directive
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
