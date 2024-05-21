// import type { RequestHandler } from '@sveltejs/kit';
// import pb from '$lib/pocketbase';

// export const post: RequestHandler = async ({ request }) => {
//     const { email, password } = await request.json();

//     try {
//         const user = await pb.collection('users').create({ email, password });
//         return {
//             status: 201,
//             body: { user }
//         };
//     } catch (error) {
//         return {
//             status: 400,
//             body: { error: error.message }
//         };
//     }
// };

import type { RequestHandler } from '@sveltejs/kit';
import pb from '$lib/pocketbase';

export const post: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    try {
        const user = await pb.collection('users').create({ email, password });
        // Log in the user after successful registration
        const authData = await pb.collection('users').authWithPassword(email, password);
        return {
            status: 201,
            headers: {
                'set-cookie': pb.authStore.exportToCookie()
            },
            body: { user, authData }
        };
    } catch (error) {
        return {
            status: 400,
            body: { error: error.message }
        };
    }
};