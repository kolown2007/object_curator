<script>


    import { createEventDispatcher, onMount } from 'svelte'
    import { Modal } from 'flowbite-svelte';
    import Button from 'flowbite-svelte/Button.svelte'
  /** @type {{handleSave: any, value: any, editing?: boolean}} */
  let { handleSave, value, editing = $bindable(false) } = $props();

    let formData = $state({ ...value }) ;
    let originalData = { ...value };

    const dispatch = createEventDispatcher()

    onMount(() => {
      originalData = { ...value };
    })
  
</script>

<Modal title="Edit Object" class="bg-neutral-300" bind:open={editing} autoclose>
    {#if editing}
    <form id="editForm" method="POST" class="mt-4" >
        <input type="hidden" name="id" value={formData.id} />
        <div class="mt-4">
            <label for="artist" class="block text-white">Artist</label>
            <input id="artist" name="artist" type="text" class="mt-1 block w-full" bind:value={formData.artist} required />
        </div>
        <div>
            <label for="title" class="block text-white">Title</label>
            <input id="title" name="title" type="text" class="mt-1 block w-full" bind:value={formData.title} required />
        </div>
        <div class="mt-4">
            <label for="medium" class="block text-white">Medium</label>
            <input id="medium" name="medium" type="text" class="mt-1 block w-full" bind:value={formData.medium} required />
        </div>
        <div class="mt-4">
            <label for="size" class="block text-white">Size</label>
            <input id="size" name="size" type="text" class="mt-1 block w-full" bind:value={formData.size} required />
        </div>
        <div class="mt-4">
            <label for="year" class="block text-white">Year</label>
            <input id="year" name="year" type="number" min="1990" max="2025" step="1" class="mt-1 block w-full" bind:value={formData.year} required />
        </div>
        <div class="mt-4">
            <label for="statement" class="block text-white">Statement</label>
            <input id="statement" name="statement" type="text" class="mt-1 block w-full" bind:value={formData.statement} required />
        </div>
        <div class="mt-4 flex justify-end">
            <Button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded" on:click={handleSave}>Save</Button>
            <!-- <Button type="button" on:click={handleCancel} class="bg-gray-500 text-white py-2 px-4 rounded ml-2">Cancel</Button> -->
        </div>
    </form>
    {/if}
</Modal>

