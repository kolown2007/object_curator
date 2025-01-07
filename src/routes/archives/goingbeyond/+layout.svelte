<script lang="ts">
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import SideBar from '$lib/components/SideBar.svelte';

    const objectcount = $derived($page.data.objectcount || 0);
    const items = $derived($page.data.data || []);
  

    let { children } = $props();
  
  </script>
  
  <div >
    <Header user={$page.data.user} />
    <SideBar {items} {objectcount}  />
 
  </div>
  {@render children?.()}