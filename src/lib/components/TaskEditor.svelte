<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import IconWrapper from './IconWrapper.svelte';
    import { updateTask as storeUpdateTask } from '../stores/todoStore';
    import { isValidTime, normalizeTime } from '../utils/timeUtils';
    export let task;
    export let updateTask;
    export let validationError;
    export let cancelEdit;

    let originalTime;

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            task.taskTime = originalTime; // Restore original time before canceling
            cancelEdit(task.id, originalTime);
        } else if (event.key === 'Enter') {
            handleUpdateTask(task.id, task.task, task.taskTime);
        }
    }

    function handleUpdateTask(taskId, newTask, newTime) {
        console.log('handleUpdateTask called with:', { taskId, newTask, newTime }); // Debugging log
        if (!isValidTime(newTime)) {
            validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
            setTimeout(() => validationError.set(''), 3000); // Clear the validation message after 3 seconds
            return;
        }
        updateTask(taskId, newTask, newTime);
    }

    onMount(() => {
        originalTime = task.taskTime; // Store the original time when the component mounts
        document.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', handleKeydown);
    });
</script>

<!-- <div class="flex justify-center pt-2 space-x-2">
    <input type="text" bind:value={task.taskTime} class="text-gray-600 rounded-sm max-w-28 input" />
    <input type="text" bind:value={task.task} class="w-full text-gray-600 rounded-sm input" />
    <button on:click={() => {
        task.taskTime = originalTime; // Restore original time before canceling
        cancelEdit(task.id, originalTime);
    }} class="mb-2 btn btn-square btn-secondary btn-outline">
        <IconWrapper icon="mdi:cancel" width="28" height="28" />
    </button>
    <button on:click={() => {
        if (!isValidTime(task.taskTime)) {
            task.taskTime = originalTime; // Restore original time
            validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
            setTimeout(() => validationError.set(''), 3000); // Clear the validation message after 3 seconds
        } else {
            handleUpdateTask(task.id, task.task, task.taskTime);
            console.log('Update task called:', task.id, task.task, task.taskTime); // Debugging log
        }
    }} class="mb-2 btn btn-square btn-primary btn-outline">
        <IconWrapper icon="fluent:save-16-regular" width="28" height="28" />
    </button>
</div> -->

<div class="flex justify-center pt-2 space-x-2">
    <input type="text" bind:value={task.taskTime} class="text-gray-600 rounded-sm max-w-28 input" />
    <input type="text" bind:value={task.task} class="w-full text-gray-600 rounded-sm input" />
    <button on:click={() => {
        task.taskTime = originalTime; // Restore original time before canceling
        cancelEdit(task.id, originalTime);
    }} class="mb-2 btn btn-square btn-secondary btn-outline">
        <IconWrapper icon="mdi:cancel" width="28" height="28" />
    </button>
    <button on:click={() => {
        handleUpdateTask(task.id, task.task, task.taskTime);
    }} class="mb-2 btn btn-square btn-primary btn-outline">
        <IconWrapper icon="fluent:save-16-regular" width="28" height="28" />
    </button>
</div>