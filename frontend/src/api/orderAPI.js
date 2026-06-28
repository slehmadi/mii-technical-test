import { create } from 'axios';

const orderAPI = create({
    baseURL: import.meta.env.BACKEND_ORDER_API_URL || '/api/orders',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default orderAPI;