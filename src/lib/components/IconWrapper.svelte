<!-- src/lib/components/IconWrapper.svelte -->
<script>
    import { onMount } from 'svelte';
    import ClientOnly from './ClientOnly.svelte';
    let Icon;
  
    onMount(async () => {
      const module = await import('@iconify/svelte');
      Icon = module.default;
    });
  
    export let icon;
    export let width;
    export let height;
  </script>
  
  <ClientOnly>
    {#if Icon}
      <svelte:component this={Icon} {icon} {width} {height} />
    {/if}
  </ClientOnly>