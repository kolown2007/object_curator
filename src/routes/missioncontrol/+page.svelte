<!-- src/routes/missioncontrol/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { Card } from 'flowbite-svelte';
</script>

<main class=" h-screen flex flex-col items-center justify-center">
 
  
  {#if $page.data.user}
  
    <h2 class="text-xl font-semibold dark:text-white">{$page.data.user.name}</h2>
   
    <br>
    <br>
    <p class="text-gray-600 dark:text-white">Projects:</p>
    <br>
    <ul class="list-disc list-inside">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {#each $page.data.user.permissions.filter((permission: string) => permission !== '/missioncontrol') as permission}
      <Card class="max-w-sm">
        <a href={permission} class="text-green-500 text-xl">{permission}</a>
        </Card> 
      
      {/each}
    </div>
    </ul>
 
{:else}
  <p class="text-red-500">You do not have access to this page.</p>
{/if}
</main>