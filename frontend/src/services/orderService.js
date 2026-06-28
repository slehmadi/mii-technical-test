import orderAPI from '../api/orderAPI';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const orderService = {
    getOrders: async (id) => {
        const response = await orderAPI.get(`/orders/user/${id}`);

        return response.data;
    },

    createOrder: async (orderData) => {
        const response = await orderAPI.post("/orders", orderData);

        return response.data;
    }
};

export default orderService;