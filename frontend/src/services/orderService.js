import orders from '../data/orders.json'

const orderService = {
    getOrders: async() => {
        return Promise.resolve(orders);
    }
};

export default orderService;