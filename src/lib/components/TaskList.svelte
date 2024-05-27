<script lang="ts">
    import { onMount } from 'svelte';
    import { tasks, fetchTasks } from '$lib/stores/todoStore';
    import TaskItem from './TaskItem.svelte';
    import TaskEditor from './TaskEditor.svelte';
    import ValidationError from './ValidationError.svelte';
    import { writable } from 'svelte/store';
    import { toggleCompletion, updateTask, cancelEdit } from '$lib/stores/todoStore';

    const validationError = writable('');

    onMount(() => {
        const unsubscribe = fetchTasks();
        return () => unsubscribe();
    });

    function toggleEditMode(taskId: string) {
        tasks.update(currentTasks => 
            currentTasks.map(task =>
                task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
            )
        );
    }
</script>

<div class="h-full p-8">
    <ValidationError message={$validationError} />
    <ul class="space-y-3">
        {#each $tasks as task (task.id)}
            <TaskItem {task} {toggleCompletion} {toggleEditMode}>
                <TaskEditor slot="editor" {task} {updateTask} {validationError} cancelEdit={() => cancelEdit(task.id, task.taskTime)} />
            </TaskItem>
        {/each}
    </ul>
</div>