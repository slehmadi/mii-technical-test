import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import productServices from '../services/productService';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const data = await productServices.getProducts();

                setProducts(
                    Array.isArray(data)
                    ? data
                    : []
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <>
            <Typography variant='h4' gutterBottom>
                Product Catalog
            </Typography>

            <Grid container spacing={3}>

                {(Array.isArray(products) ? products : []).map((product) => (
                    <Grid 
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}

            </Grid>
        </>
    )
}

export default HomePage;