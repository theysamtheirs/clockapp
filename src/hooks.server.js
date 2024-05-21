import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Initialize PocketBase client with the remote URL
//   const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

  const pb = new PocketBase('https://timekit.fly.dev');

  // Load the store data from the request cookie string
  pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    // Verify and refresh the loaded auth model (if any)
    if (pb.authStore.isValid) {
      await pb.collection('users').authRefresh();
    }
  } catch (_) {
    // Clear the auth store on failed refresh
    pb.authStore.clear();
  }

  const response = await resolve(event);

  // Send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append('set-cookie', pb.authStore.exportToCookie());

  return response;
}