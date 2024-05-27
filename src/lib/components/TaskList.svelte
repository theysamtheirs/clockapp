<script lang="ts">
    import { onMount } from 'svelte';
    import { tasks, fetchTasks, updateTask, toggleCompletion, cancelEdit, validationError } from '../stores/todoStore';
    import TaskItem from './TaskItem.svelte';
    import TaskEditor from './TaskEditor.svelte';
    import ValidationError from './ValidationError.svelte';

    onMount(() => {
        fetchTasks();
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