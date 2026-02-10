"use client";
import { useState, useEffect } from "react";
import { Plus, Bug as BugIcon, AlertCircle, RefreshCcw, X, Edit, Trash2, CheckCircle2, Clock, CheckCircle } from "lucide-react";
import clsx from "clsx";
import { Bug } from "@/types";
import { getBugs, createBug, updateBug, deleteBug } from "@/services/api";

export default function BugsPage() {
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBug, setEditingBug] = useState<Bug | null>(null);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState<Bug["status"]>("OPEN");

    const fetchBugs = async () => {
        setLoading(true);
        try {
            const data = await getBugs();
            setBugs(data);
        } catch (error) {
            console.error("Failed to fetch bugs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    const openModal = (bug?: Bug) => {
        if (bug) {
            setEditingBug(bug);
            setTitle(bug.title);
            setDescription(bug.description || "");
            setPriority(bug.priority);
            setStatus(bug.status);
        } else {
            setEditingBug(null);
            setTitle("");
            setDescription("");
            setPriority(1);
            setStatus("OPEN");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBug(null);
        setTitle("");
        setDescription("");
        setPriority(1);
        setStatus("OPEN");
    };

    const handleSaveBug = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBug) {
                // Update existing bug
                const updated = await updateBug(editingBug.id, {
                    title,
                    description,
                    priority,
                    status,
                });
                setBugs(bugs.map((b) => (b.id === editingBug.id ? updated : b)));
            } else {
                // Create new bug
                const newBug = await createBug({
                    title,
                    description,
                    priority,
                    status,
                });
                setBugs([...bugs, newBug]);
            }
            closeModal();
        } catch (error) {
            console.error("Failed to save bug", error);
        }
    };

    const handleDeleteBug = async (id: number) => {
        if (!confirm("Are you sure you want to delete this bug report?")) return;
        try {
            await deleteBug(id);
            setBugs(bugs.filter((b) => b.id !== id));
        } catch (error) {
            console.error("Failed to delete bug", error);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: Bug["status"]) => {
        try {
            const updated = await updateBug(id, { status: newStatus });
            setBugs(bugs.map((b) => (b.id === id ? updated : b)));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const getSeverityLabel = (p: number) => {
        if (p >= 5) return "CRITICAL";
        if (p >= 4) return "HIGH";
        if (p >= 3) return "MEDIUM";
        return "LOW";
    };

    const getSeverityColor = (p: number) => {
        if (p >= 5) return "bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/30";
        if (p >= 4) return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-500/30";
        if (p >= 3) return "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30";
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/30";
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case "OPEN": return "bg-emerald-500";
            case "IN_PROGRESS": return "bg-blue-500";
            case "RESOLVED": return "bg-purple-500";
            case "CLOSED": return "bg-gray-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <header className="flex items-center justify-between border-b border-destructive/20 pb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-widest text-foreground mb-2 flex items-center gap-3">
                        <span className="w-3 h-8 bg-destructive block animate-pulse" />
                        Threat Containment
                    </h1>
                    <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider pl-6">Identify, Isolate, Neutralize.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-destructive/90 hover:bg-destructive text-destructive-foreground px-6 py-3 rounded-none flex items-center gap-2 transition-all hover:tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-white/10 uppercase font-bold text-xs tracking-wider"
                >
                    <AlertCircle className="w-4 h-4" />
                    Log Anomaly
                </button>
            </header>

            {loading ? (
                <div className="text-center py-12 text-muted-foreground flex items-center justify-center gap-2">
                    <RefreshCcw className="w-5 h-5 animate-spin" /> Loading bugs...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bugs.map((bug) => (
                        <div key={bug.id} className="group bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl hover:border-primary/50 transition-all hover:-translate-y-1 relative">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openModal(bug)}
                                    className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
                                    title="Edit Bug"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteBug(bug.id)}
                                    className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive transition-colors"
                                    title="Delete Bug"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex justify-between items-start mb-4 pr-16">
                                <span className={clsx("px-3 py-1 rounded-full text-xs font-semibold", getSeverityColor(bug.priority))}>
                                    {getSeverityLabel(bug.priority)}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors pr-8">
                                {bug.title}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-6 line-clamp-3 min-h-[60px]">
                                {bug.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <div className={clsx("w-2 h-2 rounded-full", getStatusColor(bug.status))} />

                                    <select
                                        value={bug.status}
                                        onChange={(e) => handleStatusUpdate(bug.id, e.target.value as Bug["status"])}
                                        className="bg-transparent border-none p-0 text-xs font-medium focus:ring-0 cursor-pointer hover:text-foreground transition-colors"
                                    >
                                        <option value="OPEN">Open</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                        <option value="CLOSED">Closed</option>
                                    </select>
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(bug.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {bugs.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground bg-card/30 rounded-2xl border border-dashed border-border">
                            <CheckCircle2 className="w-12 h-12 mb-4 text-green-500/50" />
                            <p className="text-lg font-medium">No bugs reported yet!</p>
                            <p className="text-sm">Your code is working perfectly (or no one has tested it yet).</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-foreground">
                                {editingBug ? "Edit Bug" : "Report a Bug"}
                            </h2>
                            <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveBug} className="space-y-4">
                            <div>
                                <label className="block text-sm text-muted-foreground mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Login page crashing on mobile"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-1">Priority</label>
                                    <select
                                        className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                        value={priority}
                                        onChange={(e) => setPriority(Number(e.target.value))}
                                    >
                                        <option value={1}>1 - Low</option>
                                        <option value={2}>2 - Low-Medium</option>
                                        <option value={3}>3 - Medium</option>
                                        <option value={4}>4 - High</option>
                                        <option value={5}>5 - Critical</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-1">Status</label>
                                    <select
                                        className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as Bug["status"])}
                                    >
                                        <option value="OPEN">Open</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                        <option value="CLOSED">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-muted-foreground mb-1">Description</label>
                                <textarea
                                    className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the issue in detail..."
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground font-medium py-2 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-colors shadow-lg shadow-primary/20"
                                >
                                    {editingBug ? "Update Bug" : "Submit Report"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
