import products from '../data/products.json'

const productServices = {

    // Get all products
    getProducts: async() => {
        return Promise.resolve(products)
    },

    // Get product by ID
    getProductById: async(id) => {
        const product = products.find(
            (item) => item.id === Number(id)
        );

        return Promise.resolve(product)
    }
}

export default productServices;