import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  user.set(auth.model);
});

export async function login(email, password) {
  await pb.collection('users').authWithPassword(email, password);
}

export async function logout() {
  pb.authStore.clear();
}