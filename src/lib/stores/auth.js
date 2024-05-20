// src/lib/stores/auth.js
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

export async function register(email, password, passwordConfirm) {
  try {
    await pb.collection('users').create({ email, password, passwordConfirm });
    // Log in the user after successful registration
    await login(email, password);
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      console.error('Error response:', error.response);
    }
    throw error;
  }
}

export async function logout() {
  pb.authStore.clear();
  user.set(null); // Ensure the user store is cleared
}