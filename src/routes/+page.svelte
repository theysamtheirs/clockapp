<!-- src/routes/+page.svelte -->
<script lang="ts">
    import Clock from "$lib/components/Clock.svelte";
    import TaskList from "$lib/components/TaskList.svelte";
    import { user, logout } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import Registration from '$lib/components/Registration.svelte';
    import Login from '$lib/components/Login.svelte';
    import NavBar from '$lib/components/NavBar.svelte'; // Import NavBar

    let isRegistering = false;

    function handleLogout() {
        logout();
    }

    $: isAuthenticated = $user !== null;
</script>

<div class="flex flex-col font-sans sm:h-screen">
    {#if isAuthenticated}
        <NavBar /> <!-- Add NavBar here -->
        <div class="flex flex-col w-full h-full md:flex-row">
            <div class="sticky w-full py-12 overflow-auto bg-gray-200 md:w-1/2">
                <Clock />
            </div>
            <div class="w-full overflow-auto bg-gray-100 md:w-1/2">
                <TaskList />
            </div>
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center w-full h-full">
            {#if isRegistering}
                <Registration/>
                <button class="mt-4" on:click={() => isRegistering = false}>Already have an account? Login</button>
            {:else}
                <Login/>
                <button class="mt-4" on:click={() => isRegistering = true}>Don't have an account? Register</button>
            {/if}
        </div>
    {/if}
</div>