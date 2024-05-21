<!-- <script>
    import { onMount } from 'svelte';
    import { login } from '$lib/stores/auth';

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin() {
        try {
            await login(email, password);
            errorMessage = ''; // Clear any previous error messages
        } catch (error) {
            console.error('Login error:', error); // Log the error details
            errorMessage = error.message; // Display the error message
        }
    }
</script>

<div class="p-8 shadow-lg w-96 card bg-base-100">
    <form on:submit|preventDefault={handleLogin} class="mb-3 space-y-4">
        <div class="form-control">
            <label for="email" class="label">Email</label>
            <input id="email" class="w-full max-w-xs input input-bordered" type="email" bind:value={email} placeholder="Email" required aria-required="true"/>
        </div>
        <div class="form-control">
            <label for="password" class="label">Password</label>
            <input id="password" class="w-full max-w-xs input input-bordered" type="password" bind:value={password} placeholder="Password" required aria-required="true"/>
        </div>
        <button class="w-full mt-4 btn btn-secondary" type="submit">Login</button>
        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}
    </form>
</div>

<style>
    .error {
        color: red;
    }
</style> -->

<script>
    import { onMount } from 'svelte';
    import { login } from '$lib/stores/auth';

    let email = '';
    let password = '';
    let errorMessage = '';

    async function handleLogin() {
        try {
            await login(email, password);
            errorMessage = ''; // Clear any previous error messages
        } catch (error) {
            console.error('Login error:', error); // Log the error details
            errorMessage = error.message; // Display the error message
        }
    }
</script>

<div class="p-8 shadow-lg w-96 card bg-base-100">
    <form on:submit|preventDefault={handleLogin} class="mb-3 space-y-4">
        <div class="form-control">
            <label for="email" class="label">Email</label>
            <input id="email" class="w-full max-w-xs input input-bordered" type="email" bind:value={email} placeholder="Email" required aria-required="true"/>
        </div>
        <div class="form-control">
            <label for="password" class="label">Password</label>
            <input id="password" class="w-full max-w-xs input input-bordered" type="password" bind:value={password} placeholder="Password" required aria-required="true"/>
        </div>
        <button class="w-full mt-4 btn btn-secondary" type="submit">Login</button>
        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}
    </form>
</div>

<style>
    .error {
        color: red;
    }
</style>