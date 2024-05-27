import { writable, get } from 'svelte/store';
import PocketBase from 'pocketbase';
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(pbUrl);
import { fetchTasksFromAPI } from '../api/tasks';
import { sortTasks, normalizeTime, isValidTime } from '../utils/timeUtils';

export const tasks = writable([]);
export const validationError = writable('');

export async function fetchTasks() {
    try {
        const fetchedTasks = await fetchTasksFromAPI();
        tasks.set(sortTasks(fetchedTasks)); // Ensure tasks are sorted when fetched
        console.log('Fetched and sorted tasks:', fetchedTasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

export async function updateTask(taskId: string, newTask: string, newTime: string) {
    console.log('updateTask called with:', { taskId, newTask, newTime }); // Entry log

    const currentTasks = get(tasks);
    console.log('Current tasks:', currentTasks); // Log current tasks

    const task = currentTasks.find(task => task.id === taskId);
    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }

    // Validate the time before normalizing it
    console.log('Validating time:', newTime); // Log validation check
    if (!isValidTime(newTime)) {
        console.log('Invalid time format:', newTime); // Log validation check
        alert('Invalid time format. Please use HH:MM am/pm. Try again.');
        return;
    }

    // Normalize the time for sorting purposes
    const normalizedTime = normalizeTime(newTime);
    console.log('normalizeTime:', newTime, normalizedTime); // Log normalization

    // Update the task in the PocketBase database with the original time
    try {
        await pb.collection('tasks').update(taskId, {
            task: newTask,
            taskTime: newTime, // Send the original time to the database
            isEditing: false
        });
        console.log('Task updated in database:', { taskId, newTask, newTime });

        // Update the task in the Svelte store with the original time
        tasks.update(currentTasks => 
            currentTasks.map(task =>
                task.id === taskId ? { ...task, task: newTask, taskTime: newTime, isEditing: false } : task
            )
        );

        // Sort tasks after updating the store
        tasks.update(currentTasks => sortTasks(currentTasks.map(task => ({
            ...task,
            normalizedTime: normalizeTime(task.taskTime) // Add normalized time for sorting
        }))));

        const updatedTasks = get(tasks);
        console.log('Tasks after update and sort:', updatedTasks); // Log after state update
    } catch (error) {
        console.error('Error updating task in database:', error);
        alert('Error updating task. Please try again.');
    }
}


export function cancelEdit(taskId: string, originalTime: string) {
    validationError.set(''); // Clear the validation message
    tasks.update(currentTasks => 
        sortTasks(currentTasks.map(task =>
            task.id === taskId ? { ...task, taskTime: originalTime, isEditing: false } : task
        ))
    );
    console.log('Edit cancelled for task:', taskId);
}

export async function toggleCompletion(taskId: string) {
    console.log('toggleCompletion called with:', taskId); // Entry log

    const currentTasks = get(tasks);
    const task = currentTasks.find(task => task.id === taskId);
    if (!task) {
        console.error('Task not found:', taskId);
        return;
    }

    // Toggle the completion status
    const updatedCompletionStatus = !task.completed;

    // Update the task in the PocketBase database
    try {
        await pb.collection('tasks').update(taskId, {
            completed: updatedCompletionStatus
        });
        console.log('Task completion status updated in database:', { taskId, completed: updatedCompletionStatus });

        // Update the task in the Svelte store
        tasks.update(currentTasks => 
            currentTasks.map(task =>
                task.id === taskId ? { ...task, completed: updatedCompletionStatus } : task
            )
        );

        const updatedTasks = get(tasks);
        console.log('Tasks after toggle completion:', updatedTasks); // Log after state update
    } catch (error) {
        console.error('Error updating task completion status in database:', error);
        alert('Error updating task completion status. Please try again.');
    }
}
