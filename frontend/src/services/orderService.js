import orderAPI from '../api/orderAPI';

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