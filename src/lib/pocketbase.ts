import PocketBase from 'pocketbase';

// const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const pb = new PocketBase('https://timekit.fly.dev');

export default pb;
