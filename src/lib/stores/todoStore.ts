// src/lib/stores/todoStore.ts
import { writable } from 'svelte/store';
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

    const task = $tasks.find(task => task.id === taskId);
    if (task) {
        try {
            await updateTaskCompletion(taskId, task.completed);
        } catch (error) {
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
    if (!isValidTime(newTime)) {
        validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
        setTimeout(() => validationError.set(''), 3000); // Clear the validation message after 3 seconds
        return;
    }
    validationError.set('');
    tasks.update(currentTasks => 
        sortTasks(currentTasks.map(task =>
            task.id === taskId ? { ...task, task: newTask, time: newTime, isEditing: false } : task
        ))
    );

    try {
        await updateTaskDetails(taskId, newTask, newTime);
    } catch (error) {
        // Handle error if needed
    }
}

export function cancelEdit(taskId: string, originalTime: string) {
    validationError.set(''); // Clear the validation message
    tasks.update(currentTasks => 
        currentTasks.map(task =>
            task.id === taskId ? { ...task, time: originalTime, isEditing: false } : task
        )
    );
}