
import { db, goingbeyond } from '$lib/server/pepito_db';
import type { LayoutServerLoad } from "./$types"


const MAX_RETRIES = 5;

async function fetchDataWithRetries(retries: number = 0): Promise<any> {
    try {
        return await db.select().from(goingbeyond).all();
    } catch (error) {
        if (retries < MAX_RETRIES) {
            console.warn(`Retrying fetch data... Attempt ${retries + 1}`);
            return fetchDataWithRetries(retries + 1);
        } else {
            throw error;
        }
    }
}



export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()
  const data = await fetchDataWithRetries();
  const reversedData = data.reverse();

  if (session?.user?.email) {
    const userPermissions = session.user.permissions || []
    
    return {
      session,
      user: {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
        permissions: userPermissions
      },
      data: reversedData.slice(0, 343),
      objectcount: data.length
    }
  }

  return {
    session: null,
    user: null,
    data: [],
    objectcount: 0
  }
}