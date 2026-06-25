import { create } from 'axios';

const api = create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
});

export default api