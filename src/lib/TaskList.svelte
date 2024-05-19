<script>
    import { writable } from 'svelte/store';
    import Icon from '@iconify/svelte';
  
    // Dummy data for 10 tasks
    const tasks = [
      { id: 1, task: 'Task 1', time: '09:00 am', completed: false, isEditing: false },
      { id: 2, task: 'Task 2', time: '10:30 am', completed: false, isEditing: false },
      { id: 3, task: 'Task 3', time: '11:45 am', completed: false, isEditing: false },
      { id: 4, task: 'Task 4', time: '01:00 pm', completed: false, isEditing: false },
      { id: 5, task: 'Task 5', time: '02:15 pm', completed: false, isEditing: false },
      { id: 6, task: 'Task 6', time: '03:30 pm', completed: false, isEditing: false },
      { id: 7, task: 'Task 7', time: '04:45 pm', completed: false, isEditing: false },
      { id: 8, task: 'Task 8', time: '06:00 pm', completed: false, isEditing: false },
      { id: 9, task: 'Task 9', time: '07:15 pm', completed: false, isEditing: false },
      { id: 10, task: 'Task 10', time: '08:30 pm', completed: false, isEditing: false },
    ];
  
    // Store to hold tasks
    const todoStore = writable(tasks);
  
    // Function to toggle task completion
    function toggleCompletion(taskId) {
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    }
  
    // Function to toggle edit mode
    function toggleEditMode(taskId) {
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      );
    }
  
    // Function to update task details
    function updateTask(taskId, newTask, newTime) {
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, task: newTask, time: newTime, isEditing: false } : task
      );
    }
  </script>
  
  <div class="h-full p-8">
    <ul class="space-y-3">
      {#each $todoStore as task (task.id)}
        <li class="flex items-center justify-between p-2 transition bg-white rounded-s hover:scale-105 hover:cursor-pointer">
          {#if task.isEditing}
            <div class="flex items-center space-x-4">
              <input type="text" bind:value={task.time} class="text-gray-600 rounded-sm min-w-28 input input-sm" />
              <input type="text" bind:value={task.task} class="text-gray-600 rounded-sm input input-sm" />
            </div>
            <button on:click={() => updateTask(task.id, task.task, task.time)} class="mb-2 btn btn-square btn-sm btn-primary">
            
            <Icon icon="bi:check-lg" class="text-gray-600" />
            </button>
          {:else}
            <div class="flex items-center space-x-6">
              <span class="inline-block text-sm text-gray-800 min-w-16">{task.time}</span>
              <p class="text-center inline-block text-gray-700 font-medium {task.completed ? 'opacity-5 line-through' : ''}">{task.task}</p>
            </div>
            <div>

                <button on:click={() => toggleEditMode(task.id)} class="btn btn-square btn-sm btn-ghost">                <Icon icon="bi:pencil-square" class="" />
                
                </button>
                
                          <button on:click={() => toggleCompletion(task.id)} class="rounded-sm btn btn-sm btn-outline btn-secondary">
                {task.completed ? 'Undo' : 'Done'}
                          </button>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  