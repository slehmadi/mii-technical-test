import { create } from 'axios';

const authAPI = create({
    baseURL: import.meta.env.BACKEND_AUTH_API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default authAPI;