<script>
  import { writable } from 'svelte/store';
  import TaskItem from './TaskItem.svelte';
  import TaskEditor from './TaskEditor.svelte';
  import ValidationError from './ValidationError.svelte';
  import { parseTime, sortTasks, isValidTime } from '../utils/timeUtils';
  import tasks from '../data/tasks.json'; // Import the tasks array
  
  const todoStore = writable(tasks);
  const validationError = writable('');
  
    function toggleCompletion(taskId) {
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
    }
  
    function toggleEditMode(taskId) {
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
      );
    }
  
    function updateTask(taskId, newTask, newTime) {
      if (!isValidTime(newTime)) {
        validationError.set('Invalid time format. Please use HH:MM am/pm. Try again.');
        setTimeout(() => validationError.set(''), 3000); // Clear the validation message after 3 seconds
        return;
      }
      validationError.set('');
      $todoStore = sortTasks($todoStore.map(task =>
        task.id === taskId ? { ...task, task: newTask, time: newTime, isEditing: false } : task
      ));
    }
  
    function cancelEdit(taskId, originalTime) {
      validationError.set(''); // Clear the validation message
      $todoStore = $todoStore.map(task =>
        task.id === taskId ? { ...task, time: originalTime, isEditing: false } : task
      );
    }
  </script>

<div class="h-full p-8">
    <ValidationError message={$validationError} />
    <ul class="space-y-3">
      {#each $todoStore as task (task.id)}
        <TaskItem {task} {toggleCompletion} {toggleEditMode}>
          <TaskEditor slot="editor" {task} {updateTask} {validationError} cancelEdit={() => cancelEdit(task.id, task.time)} />
        </TaskItem>
      {/each}
    </ul>
  </div>