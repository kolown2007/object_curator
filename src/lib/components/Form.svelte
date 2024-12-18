<script>
    import { Button, Modal } from 'flowbite-svelte';
    /** @type {{defaultModal?: boolean, submitForm: any}} */
    let { defaultModal = $bindable(false), submitForm } = $props();
</script>



<Modal title="add object" class="bg-neutral-300" bind:open={defaultModal} autoclose>
    <form id="myForm" method="POST" class="mt-4">
        <div class="mt-4">
            <label for="artist" class="block text-white">Artist</label>
            <input id="artist" name="artist" type="text" class="mt-1 block w-full" required />
        </div>
        <div>
            <label for="title" class="block text-white">Title</label>
            <input id="title" name="title" type="text" class="mt-1 block w-full" required />
        </div>
        <div class="mt-4">
            <label for="medium" class="block text-white">Medium</label>
            <input id="medium" name="medium" type="text" class="mt-1 block w-full" required />
        </div>
        <div class="mt-4">
            <label for="size" class="block text-white">Size</label>
            <input id="size" name="size" type="text" class="mt-1 block w-full" required />
        </div>
        <div class="mt-4">
            <label for="year" class="block text-white">Year</label>
            <input id="year" name="year" type="number" min="1990" max="2025" step="1"  class="mt-1 block w-full" required />
        </div>
        <div class="mt-4">
            <label for="statement" class="block text-white">Statement</label>
            <input id="statement" name="statement" type="text" class="mt-1 block w-full" required />
        </div>
    </form>

    {#snippet footer()}
    
            <button type="button" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onclick={submitForm}>Add</button>
        
    {/snippet}
</Modal>