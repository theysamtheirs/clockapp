import PocketBase from 'pocketbase';
import { VITE_POCKETBASE_URL } from '$env/static/private';

// const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const pb = new PocketBase(VITE_POCKETBASE_URL);

export default pb;
