import { create } from 'axios';

const orderAPI = create({
    baseURL: import.meta.env.BACKEND_ORDER_API_URL || 'http://localhost:8002',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default orderAPI;