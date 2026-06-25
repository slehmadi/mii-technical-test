import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const data = await getProducts();

            setProducts(data)
        };

        fetchProducts();
    }, []);

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