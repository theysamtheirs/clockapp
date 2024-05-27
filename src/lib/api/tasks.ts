// src/lib/api/tasks.ts
import PocketBase from 'pocketbase';
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(pbUrl);

export async function fetchTasksFromAPI() {
    try {
        const records = await pb.collection('tasks').getFullList();
        return records;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export async function updateTaskCompletion(taskId: string, completed: boolean) {
    try {
        const record = await pb.collection('tasks').update(taskId, { completed });
        return record;
    } catch (error) {
        console.error('Error updating task completion:', error);
        throw error;
    }
}

export async function updateTaskDetails(taskId: string, newTask: string, newTime: string) {
    try {
        const record = await pb.collection('tasks').update(taskId, { task: newTask, time: newTime });
        return record;
    } catch (error) {
        console.error('Error updating task details:', error);
        throw error;
    }
}