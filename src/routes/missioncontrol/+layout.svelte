<script lang="ts">
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
  </script>
  
  <Header user={$page.data.user} />
  <slot />