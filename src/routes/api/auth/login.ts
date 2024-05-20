import type { RequestHandler } from '@sveltejs/kit';
import pb from '$lib/pocketbase';

export const post: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return {
            status: 200,
            body: { authData }
        };
    } catch (error) {
        return {
            status: 400,
            body: { error: error.message }
        };
    }
};
