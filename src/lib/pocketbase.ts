import PocketBase from 'pocketbase';
const pbUrl = import.meta.env.VITE_POCKETBASE_URL;

const pb = new PocketBase(pbUrl);

export default pb;