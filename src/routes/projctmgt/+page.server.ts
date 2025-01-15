import { createProject, getProjects } from '$lib/server/projectmgt_db';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
    const projects = await getProjects();
    return { projects };
};

export const actions: Actions = {
    createProject: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        
        await createProject(title, description);
        return { success: true };
    }
};