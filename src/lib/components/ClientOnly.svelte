<!-- src/lib/components/ClientOnly.svelte -->
<script>
    export let fallback = null;
  </script>
  
{#if typeof window !== 'undefined'}
<slot />
{:else}
{fallback}
{/if}