import { create } from 'axios';

const authAPI = create({
    baseURL: import.meta.env.BACKEND_AUTH_API_URL || '/auth',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default authAPI;