"use client";
import { useEffect, useState } from "react";
import { Bug, CheckSquare, Clock, AlertTriangle, RefreshCcw } from "lucide-react";
import { getTasks, getBugs } from "@/services/api";
import { Task, Bug as BugType } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [bugs, setBugs] = useState<BugType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksData, bugsData] = await Promise.all([getTasks(), getBugs()]);
                setTasks(tasksData);
                setBugs(bugsData);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const activeTasks = tasks.filter(t => t.status !== "DONE").length;
    const activeBugs = bugs.filter(b => b.status !== "RESOLVED" && b.status !== "CLOSED").length;
    const criticalBugs = bugs.filter(b => b.priority >= 5 && b.status !== "RESOLVED" && b.status !== "CLOSED").length;

    // Recent activity: Combine tasks and bugs, sort by created_at desc
    const recentActivity = [
        ...tasks.map(t => ({ type: 'task', date: new Date(t.created_at || Date.now()), title: t.title, id: t.id })),
        ...bugs.map(b => ({ type: 'bug', date: new Date(b.created_at || Date.now()), title: b.title, id: b.id }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground gap-2">
                <RefreshCcw className="w-6 h-6 animate-spin" /> Loading dashboard...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="relative overflow-hidden mb-12">
                <div className="absolute top-0 left-0 w-64 h-1 bg-gradient-to-r from-primary to-transparent" />
                <h1 className="text-4xl font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-blue-600 mb-2">
                    Mission Status
                </h1>
                <p className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
                    <span className="text-primary mr-2">●</span>
                    Welcome back, Agent. Systems Operational.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Missions"
                    value={activeTasks}
                    change={`${tasks.length} total assignments`}
                    icon={CheckSquare}
                    color="cyan"
                    gradient="from-cyan-500 to-blue-500"
                />
                <StatCard
                    title="Detected Threats"
                    value={activeBugs}
                    change={`${bugs.length} total anomalies`}
                    icon={Bug}
                    color="red"
                    gradient="from-red-500 to-rose-600"
                />
                <StatCard
                    title="Intel Feed"
                    value={recentActivity.length}
                    change="Last 24h Activity"
                    icon={Clock}
                    color="amber"
                    gradient="from-amber-400 to-orange-500"
                />
                <StatCard
                    title="Critical Alerts"
                    value={criticalBugs}
                    change="Immediate Action Required"
                    icon={AlertTriangle}
                    color="purple"
                    gradient="from-purple-500 to-pink-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card/40 rounded-xl p-6 border border-primary/20 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock className="w-24 h-24 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-foreground border-b border-primary/20 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Recent Intelligence
                    </h2>
                    <div className="space-y-4 relative z-10">
                        {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                            <div key={`${item.type}-${item.id}-${i}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'bug' ? 'bg-red-500/10 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'}`}>
                                    {item.type === 'bug' ? <Bug className="w-5 h-5" /> : <CheckSquare className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        <span className={item.type === 'bug' ? 'text-red-400 font-bold uppercase text-[10px] mr-2' : 'text-cyan-400 font-bold uppercase text-[10px] mr-2'}>
                                            [{item.type === 'bug' ? 'THREAT' : 'TASK'}]
                                        </span>
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-mono">{formatDistanceToNow(item.date, { addSuffix: true })}</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-muted-foreground text-sm font-mono">No recent intelligence gathered.</p>
                        )}
                    </div>
                </div>

                <div className="bg-card/40 rounded-xl p-6 border border-primary/20 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckSquare className="w-24 h-24 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold uppercase tracking-wider mb-6 text-foreground border-b border-primary/20 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        Active Directives
                    </h2>
                    <div className="space-y-3 relative z-10">
                        {tasks.filter(t => t.status !== "DONE").slice(0, 5).map((t) => (
                            <div key={t.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-white/5 hover:border-primary/30 transition-all">
                                <div className={`w-1.5 h-1.5 rounded-full ${t.priority >= 3 ? 'bg-orange-500 box-shadow-orange' : 'bg-cyan-500 box-shadow-cyan'}`} />
                                <span className="text-sm text-foreground truncate font-medium">{t.title}</span>
                                <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                    PRIORITY-{t.priority}
                                </span>
                            </div>
                        ))}
                        {tasks.filter(t => t.status !== "DONE").length === 0 && (
                            <p className="text-muted-foreground text-sm font-mono">All directives completed. Standby for new orders.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon: Icon, color, gradient }: any) {
    return (
        <div className="relative overflow-hidden bg-card/40 p-6 rounded-xl border border-primary/10 backdrop-blur-sm hover:translate-y-[-2px] transition-all duration-300 group hover:border-primary/30 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]">
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-1 opacity-70 group-hover:opacity-100 transition-opacity">{title}</p>
                    <h3 className="text-3xl font-black text-foreground tracking-tight">{value}</h3>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                </div>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide relative z-10">
                <span className="text-primary mr-1">►</span> {change}
            </p>

            {/* Background Tech Detail */}
            <div className="absolute -bottom-4 -right-4 text-primary/5 transform rotate-12 scale-150 group-hover:scale-125 transition-transform duration-500">
                <Icon className="w-24 h-24" />
            </div>
        </div>
    );
}
