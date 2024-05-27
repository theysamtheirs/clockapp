// src/lib/stores/todoStore.ts
import { writable, get } from 'svelte/store';
import PocketBase from 'pocketbase';
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(pbUrl);
import { fetchTasksFromAPI, updateTaskCompletion, updateTaskDetails } from '../api/tasks';
import { sortTasks, isValidTime } from '../utils/timeUtils';

export const tasks = writable([]);
export const validationError = writable('');

export async function fetchTasks() {
    const fetchedTasks = await fetchTasksFromAPI();
    tasks.set(fetchedTasks);
}

export async function toggleCompletion(taskId: string) {
    tasks.update(currentTasks => 
        currentTasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        )
    );

    const currentTasks = get(tasks);
    const task = currentTasks.find(task => task.id === taskId);
    if (task) {
        try {
            await pb.collection('tasks').update(taskId, { completed: task.completed });
            console.log('Task completion updated successfully:', task); // Debugging log
        } catch (error) {
            console.error('Error updating task completion:', error);
            // Revert the local state if the API call fails
            tasks.update(currentTasks => 
                currentTasks.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
        }
    }
}

export async function updateTask(taskId: string, newTask: string, newTime: string) {
    console.log('updateTask called with:', { taskId, newTask, newTime }); // Entry log

    const currentTasks = get(tasks);
    const task = currentTasks.find(task => task.id === taskId);

    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }

    // Only validate the time if it has been changed
    if (task.taskTime !== newTime && !isValidTime(newTime)) {
        console.log('Invalid time format:', newTime); // Log validation check
        validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
        setTimeout(() => validationError.set(''), 3000); // Clear the validation message after 3 seconds
        return;
    }

    validationError.set('');
    console.log('Current tasks before update:', currentTasks); // Log before state update

    tasks.update(currentTasks => 
        sortTasks(currentTasks.map(task =>
            task.id === taskId ? { ...task, task: newTask, taskTime: newTime, isEditing: false } : task
        ))
    );

    const updatedTasks = get(tasks);
    console.log('Tasks after update:', updatedTasks); // Log after state update

    try {
        const data = {
            task: newTask,
            taskTime: newTime
        };
        console.log('Making API call with data:', data); // Log before API call
        const response = await updateTaskDetails(taskId, newTask, newTime); // Ensure correct function call
        console.log('Task updated successfully:', response); // Log API response
    } catch (error) {
        console.error('Error updating task details:', error); // Log API error
    }
}

export function cancelEdit(taskId: string, originalTime: string) {
    validationError.set(''); // Clear the validation message
    tasks.update(currentTasks => 
        currentTasks.map(task =>
            task.id === taskId ? { ...task, taskTime: originalTime, isEditing: false } : task
        )
    );
}