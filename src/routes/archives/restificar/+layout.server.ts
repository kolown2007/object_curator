import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()

  if (session?.user?.email) {
    // Get user permissions from session
    const userPermissions = session.user.permissions || []
    
    return {
      session,
      user: {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        permissions: userPermissions
      }
    }
  }

  return {
    session: null,
    user: null
  }
}