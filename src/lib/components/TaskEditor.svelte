<script>
    import { onMount, onDestroy } from 'svelte';
    import IconWrapper from './IconWrapper.svelte';
    import { get } from 'svelte/store';
    export let task;
    export let updateTask;
    export let cancelEdit;
    export let validationError;
  
    let originalTime;
  
    function handleKeydown(event) {
        if (event.key === 'Escape') {
            task.taskTime = originalTime; // Restore original time before canceling
            cancelEdit(task.id, originalTime);
        } else if (event.key === 'Enter') {
            if (!isValidTime(task.taskTime)) {
                task.taskTime = originalTime; // Restore original time
                validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
            } else {
                updateTask(task.id, task.task, task.taskTime);
                console.log('Update task called:', task.id, task.task, task.taskTime); // Debugging log
            }
        }
    }
  
    onMount(() => {
        originalTime = task.taskTime; // Store the original time when the component mounts
        document.addEventListener('keydown', handleKeydown);
    });
  
    onDestroy(() => {
        document.removeEventListener('keydown', handleKeydown);
    });
  
    function isValidTime(time) {
        // Implement your time validation logic here
        const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
        return timePattern.test(time);
    }
</script>

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
        if (!isValidTime(task.taskTime)) {
            task.taskTime = originalTime; // Restore original time
            validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
        } else {
            updateTask(task.id, task.task, task.taskTime);
            console.log('Update task called:', task.id, task.task, task.taskTime); // Debugging log
        }
    }} class="mb-2 btn btn-square btn-primary btn-outline">
        <IconWrapper icon="fluent:save-16-regular" width="28" height="28" />
    </button>
</div>