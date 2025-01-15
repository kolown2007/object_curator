<script lang="ts">
    import { enhance } from '$app/forms';
    export let data: {
        projects: { id: number; title: string; description: string | null; startDate: string | null; endDate: string | null; progress: number | null; }[];
        phases: { projectId: number; name: string; order: number; }[];
    };
    export const form = null;
    
    let expandedProject: number | null = null;
    
    function toggleProject(projectId: number) {
        expandedProject = expandedProject === projectId ? null : projectId;
    }
</script>

<div class="container mx-auto p-4">
    <!-- ...existing project creation form... -->
    <div>
        <button 
            class="mb-4 text-blue-500 flex items-center gap-2"
            on:click={() => expandedProject = expandedProject === -1 ? null : -1}
        >
            {expandedProject === -1 ? '▼' : '▶'} New Project
        </button>

        {#if expandedProject === -1}
            <form method="POST" action="?/createProject" use:enhance class="bg-white p-4 rounded-lg shadow">
                <div class="space-y-4">
                    <div>
                        <label for="title" class="block text-sm font-medium text-gray-700">Project Title</label>
                        <input type="text" id="title" name="title" required class="mt-1 w-full p-2 border rounded">
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" name="description" rows="3" class="mt-1 w-full p-2 border rounded"></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
                            <input type="date" id="startDate" name="startDate" class="mt-1 w-full p-2 border rounded">
                        </div>
                        <div>
                            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
                            <input type="date" id="endDate" name="endDate" class="mt-1 w-full p-2 border rounded">
                        </div>
                    </div>
                    <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Create Project
                    </button>
                </div>
            </form>
        {/if}
    </div>

    <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Projects</h2>
        <div class="grid gap-4">
            {#each data.projects as project}
                <div class="bg-white p-4 rounded-lg shadow">
                    <div class="flex justify-between items-center">
                        <h3 class="font-bold">{project.title}</h3>
                        <button 
                            class="text-blue-500"
                            on:click={() => toggleProject(project.id)}
                        >
                            {expandedProject === project.id ? '▼' : '▶'}
                        </button>
                    </div>
                    <p class="text-gray-600">{project.description}</p>

                    {#if expandedProject === project.id}
                        <div class="mt-4 pl-4 border-l-2 border-blue-200">
                            <form 
                                method="POST" 
                                action="?/createPhase" 
                                use:enhance 
                                class="mb-4"
                            >
                                <input type="hidden" name="projectId" value={project.id}>
                                <div class="flex gap-2">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Phase name"
                                        class="flex-1 p-2 border rounded"
                                        required
                                    >
                                    <input 
                                        type="number" 
                                        name="order" 
                                        placeholder="Order"
                                        class="w-20 p-2 border rounded"
                                        required
                                    >
                                    <button 
                                        type="submit"
                                        class="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Add Phase
                                    </button>
                                </div>
                            </form>

                            <div class="space-y-2">
                                {#each data.phases.filter(p => p.projectId === project.id) as phase}
                                    <div class="bg-gray-50 p-2 rounded">
                                        <span class="font-medium">{phase.name}</span>
                                        <span class="text-gray-500 ml-2">Order: {phase.order}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</div>