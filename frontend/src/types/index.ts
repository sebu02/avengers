export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: number;
    due_date?: string;
    created_at: string;
    updated_at: string;
}

export interface Bug {
    id: number;
    title: string;
    description?: string;
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
    priority: number;
    reported_by?: string;
    created_at: string;
    updated_at: string;
}

export interface Stat {
    title: string;
    value: string | number;
    change: string;
    icon: any;
    color: string;
}
