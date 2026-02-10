import axios from 'axios';
import { Task, Bug } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getTasks = async () => {
    const response = await api.get<Task[]>('/tasks/');
    return response.data;
};

export const createTask = async (task: Partial<Task>) => {
    const response = await api.post<Task>('/tasks/', task);
    return response.data;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
    const response = await api.patch<Task>(`/tasks/${id}`, task);
    return response.data;
};

export const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
};

export const getBugs = async () => {
    const response = await api.get<Bug[]>('/bugs/');
    return response.data;
};

export const createBug = async (bug: Partial<Bug>) => {
    const response = await api.post<Bug>('/bugs/', bug);
    return response.data;
};

export const updateBug = async (id: number, bug: Partial<Bug>) => {
    const response = await api.patch<Bug>(`/bugs/${id}`, bug);
    return response.data;
};

export const deleteBug = async (id: number) => {
    await api.delete(`/bugs/${id}`);
};

export default api;
