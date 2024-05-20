<!-- src/lib/components/NavBar.svelte -->
<script>
    import { logout } from '$lib/stores/auth';

    function handleLogout() {
        logout();
    }
</script>

<nav class="flex items-center justify-between w-full p-4 text-white bg-primary-500">
    <div class="text-lg font-bold text-primary">Clock App</div>
    <button on:click={handleLogout} class="btn btn-secondary btn-sm">Logout</button>
</nav>

<style>
    nav {
        position: sticky;
        top: 0;
        z-index: 10;
    }
</style>