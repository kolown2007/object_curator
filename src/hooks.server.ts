// filepath: /c:/Users/Barry/Documents/W_A/object-curator/src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import { db } from '$lib/server/user_db';
import { user } from '$lib/schema/googleauth';
import { eq } from "drizzle-orm";
import { env } from '$env/dynamic/private';

const authHandle = SvelteKitAuth({
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET
    })
  ],
  trustHost: true,
  secret: env.AUTH_SECRET,
  callbacks: {
    signIn: async ({ profile }) => {
      const email = profile?.email ?? "";
      const userRecord = await db.select({
        email: user.email,
        access: user.access
      }).from(user).where(eq(user.email, email)).get();
      return !!userRecord;
    },
    session: async ({ session }) => {
      if (session?.user?.email) {
        const userRecord = await db.select({
          email: user.email,
          access: user.access
        }).from(user).where(eq(user.email, session.user.email)).get();
        if (userRecord) {
          return {
            ...session,
            user: {
              ...session.user,
              permissions: JSON.parse(userRecord.access)  // Parse access JSON array
            }
          };
        }
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl + '/missioncontrol';
    }
  }
});

const protectedRoutes: Handle = async ({ event, resolve }) => {
  const protectedPaths = [
    '/archives',
    '/objects',
  ];

  const isProtectedRoute = protectedPaths.some(path => 
    event.url.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    const session = await event.locals.auth();
    if (!session) {
      throw redirect(303, '/auth/signin');
    }
  }

  return await resolve(event);
};

// authHandle must come first to setup auth context
export const handle = sequence(authHandle.handle, protectedRoutes);