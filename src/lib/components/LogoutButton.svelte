  <script>
    import { logout } from '$lib/stores/auth';

    function handleLogout() {
      logout();
    }
  </script>

  <button on:click={handleLogout}>Logout</button>