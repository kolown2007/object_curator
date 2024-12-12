// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handle as authHandle } from './auth';

const protectedRoutes: Handle = async ({ event, resolve }) => {
    const protectedPaths = [
        '/missioncontrol',
        '/admin',
        '/api'
    ];

    const isProtectedRoute = protectedPaths.some(path => 
        event.url.pathname.startsWith(path)
    );

    if (isProtectedRoute) {
        // Match layout server auth check pattern
        const session = await event.locals.auth();
        if (!session) {
            throw redirect(303, '/auth/signin');
        }
    }

    return await resolve(event);
};

// authHandle must come first to setup auth context
export const handle = sequence(authHandle, protectedRoutes);