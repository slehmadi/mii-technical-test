import productAPI from '../api/productAPI';

const productServices = {

    // Get all products
    getProducts: async () => {
        const response = await productAPI.get("/products");

        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await productAPI.get(`/products/${id}`);

        return response.data;
    }
}

export default productServices;