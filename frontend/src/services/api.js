import { create } from 'axios';

const api = create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api