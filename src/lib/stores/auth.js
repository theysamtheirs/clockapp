// src/lib/stores/auth.js

// import { writable } from 'svelte/store';
// import PocketBase from 'pocketbase';
// const pbUrl = import.meta.env.VITE_POCKETBASE_URL;

// const pb = new PocketBase(pbUrl);
// export const user = writable(pb.authStore.model);

// pb.authStore.onChange((auth) => {
//   user.set(auth.model);
// });

// export async function login(email, password) {
//   await pb.collection('users').authWithPassword(email, password);
// }

// export async function register(email, password, passwordConfirm) {
//   try {
//     await pb.collection('users').create({ email, password, passwordConfirm });
//     // Log in the user after successful registration
//     await login(email, password);
//   } catch (error) {
//     console.error('Registration error:', error);
//     if (error.response) {
//       console.error('Error response:', error.response);
//     }
//     throw error;
//   }
// }



// export async function logout() {
//   pb.authStore.clear();
//   user.set(null); // Ensure the user store is cleared
// }

// src/lib/stores/auth.js

import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;

const pb = new PocketBase(pbUrl);
export const user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  user.set(auth.model);
});

export async function login(email, password) {
  await pb.collection('users').authWithPassword(email, password);
}

// Adjusted function to add default tasks for a new user
async function addDefaultTasks(userId) {
    const tasksCollection = pb.collection('tasks');
    const defaultTasks = [
        { task: 'Wake up', userID: userId, completed: false, taskTime: '8:30 am' },
        { task: 'Brush teeth', userID: userId, completed: false, taskTime: '8:00 am' },
        { task: 'Get dressed', userID: userId, completed: false, taskTime: '9:00 am' },
    ];

    for (let taskData of defaultTasks) {
        await tasksCollection.create(taskData);
    }
}

export async function register(email, password, passwordConfirm) {
  try {
    // Assuming the user object returned contains the user's ID
    const newUser = await pb.collection('users').create({ email, password, passwordConfirm });
    
    // Log in the user after successful registration
    await login(email, password);
    
    // Add default tasks for the new user
    await addDefaultTasks(newUser.id);
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
