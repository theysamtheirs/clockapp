<script>
    import IconWrapper from './IconWrapper.svelte';
    export let task;
    export let toggleCompletion;
    export let toggleEditMode;
</script>

<li class="flex items-center justify-between p-2 pl-4 transition bg-white rounded-s hover:scale-105 hover:cursor-pointer">
    {#if task.isEditing}
        <slot name="editor"></slot>
    {:else}
        <div class="flex items-center space-x-6">
            <span class="inline-block text-sm text-gray-800 min-w-16 {task.completed ? 'opacity-30 line-through' : ''}">{task.taskTime}</span>
            <p class="text-center inline-block text-gray-700 font-medium text-2xl {task.completed ? 'opacity-60 line-through' : ''}">{task.task}</p>
        </div>
        <div class="flex items-center justify-center">
            <button on:click={() => toggleEditMode(task.id)} class="btn btn-square btn-ghost {task.completed ? 'opacity-5 hidden' : ''}">
                <IconWrapper icon="fluent:edit-12-regular" width="20" height="20" />
            </button>
            <button on:click={() => toggleCompletion(task.id)} class="btn btn-square btn-secondary btn-ghost">
                {#if task.completed}
                    <IconWrapper icon="octicon:check-circle-fill-16" width="28" height="28" />
                {:else}
                    <IconWrapper icon="octicon:check-circle-24" width="28" height="28" />
                {/if}
            </button>
        </div>
    {/if}
</li>