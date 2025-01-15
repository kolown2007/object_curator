<script lang="ts">
    import { enhance } from '$app/forms';
    export let data;
    export let form;
</script>

<div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Project Management</h1>

    <form 
        method="POST" 
        action="?/createProject" 
        use:enhance 
        class="bg-white p-6 rounded-lg shadow-md"
    >
        <div class="mb-4">
            <label for="title" class="block text-sm font-medium mb-1">Project Title</label>
            <input 
                type="text" 
                id="title" 
                name="title" 
                class="w-full p-2 border rounded"
                required
            >
        </div>
        
        <div class="mb-4">
            <label for="description" class="block text-sm font-medium mb-1">Description</label>
            <textarea 
                id="description" 
                name="description" 
                class="w-full p-2 border rounded"
                rows="3"
            ></textarea>
        </div>

        <button 
            type="submit" 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Create Project
        </button>
    </form>

    {#if form?.success}
        <div class="mt-4 p-4 bg-green-100 text-green-700 rounded">
            Project created successfully!
        </div>
    {/if}

    <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Existing Projects</h2>
        <div class="grid gap-4">
            {#each data.projects as project}
                <div class="bg-white p-4 rounded-lg shadow">
                    <h3 class="font-bold">{project.title}</h3>
                    <p class="text-gray-600">{project.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>