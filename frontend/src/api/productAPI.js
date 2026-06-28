import { create } from 'axios';

const productAPI = create({
    baseURL: import.meta.env.BACKEND_PRODUCT_API_URL || '/products',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

export default productAPI;