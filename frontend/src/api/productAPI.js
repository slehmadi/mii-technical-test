import { create } from 'axios';

const productAPI = create({
    baseURL: import.meta.env.BACKEND_PRODUCT_API_URL || 'http://localhost:8001',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default productAPI;