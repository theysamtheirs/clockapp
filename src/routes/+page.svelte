<script lang="ts">
    import Clock from "$lib/components/Clock.svelte";
    import TaskList from "$lib/components/TaskList.svelte";
</script>

<div class="flex flex-col font-sans sm:h-screen md:flex-row">
    <div class="sticky w-full py-12 overflow-auto bg-gray-200 md:w-1/2">
        <Clock />
    </div>
    <div class="w-full overflow-auto bg-gray-100 md:w-1/2">
        <TaskList />
    </div>
</div>
