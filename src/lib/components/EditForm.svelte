<script lang="ts">
    import { run, preventDefault } from 'svelte/legacy';

    import { Modal, Button } from 'flowbite-svelte';
    import { createEventDispatcher, onMount } from 'svelte';
    
    
    type Item = {
        id: number | null;
        artist: string;
        title: string;
        medium: string;
        size: string;
        year: number | null;
        statement: string;
    };
    
    
    interface Props {
        editModalOpen?: boolean;
        item?: Item;
        onSave: (item: Item) => void;
    }

    let { editModalOpen = $bindable(false), item = {
        id: null,
        artist: '',
        title: '',
        medium: '',
        size: '',
        year: null,
        statement: ''
    }, onSave }: Props = $props();
    const dispatch = createEventDispatcher();
    let formData = $state({ ...item });
    let originalData = $state({ ...item });

    // Update formData whenever item changes
    run(() => {
        if (item) {
            formData = { ...item };
            originalData = { ...item };
        }
    });

    onMount(() => {
        originalData = { ...item };
    });

    function handleSave() {
        if (JSON.stringify(formData) !== JSON.stringify(originalData)) {
            onSave(formData);
            dispatch('submit', formData);
        }
        editModalOpen = false;
    }

    function handleCancel() {
        formData = { ...originalData };
        editModalOpen = false;
    }


</script>

<Modal title="Edit Object" bind:open={editModalOpen} autoclose >
    <form class="mt-4" onsubmit={preventDefault(handleSave)}>
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
            <Button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</Button>
            <Button type="button" on:click={handleCancel} class="bg-gray-500 text-white py-2 px-4 rounded ml-2">Cancel</Button>
        </div>
    </form>
</Modal>




