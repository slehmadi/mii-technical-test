import { useState, useEffect } from 'react';
import { cardActionAreaClasses, Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                const data = await getProducts();

                setProducts(data);
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

                {products.map((product) => (
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