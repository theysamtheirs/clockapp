<script lang="ts">
    import Clock from "$lib/Clock.svelte";
    import TaskList from "$lib/TaskList.svelte";
</script>

<div class="flex flex-col h-screen font-sans md:flex-row">
    <div class="w-full overflow-auto bg-gray-200 md:w-1/2">
      <Clock />
    </div>
    <div class="w-full overflow-auto bg-gray-100 md:w-1/2">
      <TaskList />
    </div>
</div>
