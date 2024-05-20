<!-- src/lib/components/Registration.svelte -->
<script>
    import { register } from '$lib/stores/auth';
  
    let email = '';
    let password = '';
    let passwordConfirm = ''; // Add passwordConfirm field
    let errorMessage = '';
  
    async function handleRegister() {
      if (password !== passwordConfirm) {
        errorMessage = 'Passwords do not match';
        return;
      }
  
      try {
        await register(email, password, passwordConfirm);
        errorMessage = ''; // Clear any previous error messages
      } catch (error) {
        console.error('Registration error:', error); // Log the error details
        errorMessage = error.message; // Display the error message
      }
    }
  </script>
  
  <div class="p-8 shadow-lg w-96 card bg-base-100">
    <script>
        import { handleRegister } from './yourScript.js'; // Ensure you have this script file
        let email = '';
        let password = '';
        let passwordConfirm = '';
        let errorMessage = '';
      
        async function handleRegister() {
          // Your registration logic here
        }
      </script>
      
      <form on:submit|preventDefault={handleRegister} class="mb-3 space-y-4">
        <div class="form-control">
          <label for="email" class="label">Email</label>
          <input id="email" class="w-full max-w-xs input input-bordered" type="email" bind:value={email} placeholder="Email" required aria-required="true"/>
        </div>
        <div class="form-control">
          <label for="password" class="label">Password</label>
          <input id="password" class="w-full max-w-xs input input-bordered" type="password" bind:value={password} placeholder="Password" required aria-required="true"/>
        </div>
        <div class="form-control">
          <label for="password-confirm" class="label">Confirm Password</label>
          <input id="password-confirm" class="w-full max-w-xs input input-bordered" type="password" bind:value={passwordConfirm} placeholder="Confirm Password" required aria-required="true"/>
        </div>
        <button class="w-full mt-4 btn btn-secondary" type="submit">Register</button>
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