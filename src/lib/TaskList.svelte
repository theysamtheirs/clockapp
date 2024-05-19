<script>
    import { writable } from 'svelte/store';
    import Icon from '@iconify/svelte';
  
    // Dummy data for 10 tasks
    const tasks = [
      { id: 1, task: 'Eat Breakfast', time: '09:00 am', completed: false, isEditing: false },
      { id: 2, task: 'Drink Water', time: '10:30 am', completed: false, isEditing: false },
      { id: 3, task: 'Go for a Walk', time: '11:45 am', completed: false, isEditing: false },
      { id: 4, task: 'Shower', time: '01:00 pm', completed: false, isEditing: false },
      { id: 5, task: 'Drink Tea', time: '02:15 pm', completed: false, isEditing: false },
      { id: 6, task: 'Eat Lunch', time: '03:30 pm', completed: false, isEditing: false },
      { id: 7, task: 'Drink Coffee', time: '04:45 pm', completed: false, isEditing: false },
      { id: 8, task: 'Go for a Run', time: '06:00 pm', completed: false, isEditing: false },
      { id: 9, task: 'Drink Beer', time: '07:15 pm', completed: false, isEditing: false },
      { id: 10, task: 'Brush Teeth', time: '08:30 pm', completed: false, isEditing: false },
    ];
  
    // Store to hold tasks
    const todoStore = writable(tasks);
    const validationError = writable('');
  
    // Function to parse time strings
    function parseTime(timeStr) {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'pm' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'am' && hours === '12') {
        hours = '00';
      }
      return new Date(`1970-01-01T${hours}:${minutes}:00`);
    }
  
    // Function to sort tasks by time
    function sortTasks(tasks) {
      return tasks.slice().sort((a, b) => parseTime(a.time) - parseTime(b.time));
    }
  
    // Function to validate time format
    function isValidTime(timeStr) {
      const timePattern = /^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
      return timePattern.test(timeStr);
    }
  
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
  
    // Function to update task details and re-sort tasks
    function updateTask(taskId, newTask, newTime) {
      if (!isValidTime(newTime)) {
        validationError.set('Invalid time format. Please use HH:MM am/pm.');
        return;
      }
      validationError.set('');
      $todoStore = sortTasks($todoStore.map(task =>
        task.id === taskId ? { ...task, task: newTask, time: newTime, isEditing: false } : task
      ));
    }
  </script>
  
  <div class="h-full p-8">
    {#if $validationError}
      <div class="mb-4 text-red-500">{$validationError}</div>
    {/if}
    <ul class="space-y-3">
      {#each $todoStore as task (task.id)}
        <li class="flex items-center justify-between p-2 pl-4 transition bg-white rounded-s hover:scale-105 hover:cursor-pointer">
          {#if task.isEditing}
            <div class="flex justify-center pt-2 space-x-2">
              <input type="text" bind:value={task.time} class="text-gray-600 rounded-sm max-w-28 input " />
              <input type="text" bind:value={task.task} class="w-full text-gray-600 rounded-sm input" />
              <button on:click={() => updateTask(task.id, task.task, task.time)} class="mb-2 btn btn-square btn-primary btn-outline">
                <Icon icon="fluent:save-16-regular" width="28" height="28"></Icon>
              </button>
            </div>
          {:else}
            <div class="flex items-center space-x-6">
              <span class="inline-block text-sm text-gray-800 min-w-16 {task.completed ? 'opacity-30 line-through' : ''}">{task.time}</span>
              <p class="text-center inline-block text-gray-700 font-medium text-2xl {task.completed ? 'opacity-60 line-through' : ''}">{task.task}</p>
            </div>
            <div class="flex items-center justify-center">
              <button on:click={() => toggleEditMode(task.id)} class="btn btn-square btn-ghost {task.completed ? 'opacity-5 hidden' : ''}">
                <Icon icon="fluent:edit-12-regular" width="20" height="20"></Icon>
              </button>
              <button on:click={() => toggleCompletion(task.id)} class="btn btn-square btn-secondary btn-ghost">
                {#if task.completed}
                  <Icon icon="octicon:check-circle-fill-16" width="28" height="28"></Icon>
                {:else}
                  <Icon icon="octicon:check-circle-24" width="28" height="28"></Icon>
                {/if}
              </button>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>