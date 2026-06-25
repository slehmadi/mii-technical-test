import { 
    Typography,
    Box,
    Card,
    CardMedia,
    Grid,
    Divider
} from '@mui/material'

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productServices from '../services/productService';
import QuantitySelector from '../components/QuantitySelector';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const data = await productServices.getProductById(id);

                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    if (!product) {
        <Typography variant='h5'>
            Product not found
        </Typography>
    }
    
    return (
        <Card sx={{ p: 4 }}>
            <Grid container spacing={4}>
                <Grid sx={{ xs: 12, md: 5}}>
                    <CardMedia 
                        component={"img"}
                        image={
                            product.image_url || "https://placehold.co/600x400"
                        }
                        sx={{ borderRadius: 2 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 7}}>
                    <Typography variant='h4' gutterBottom>
                        {product.name}
                    </Typography>

                    <Typography variant='h5' color='primary' gutterBottom>
                        Rp{" "}
                        {product.price.toLocaleString()}
                    </Typography>

                    <Typography variant='body1' gutterBottom>
                        Category:
                        {" "}
                        {product.category}
                    </Typography>

                    <Divider sx={{ my: 2}} />

                    <Typography variant='body1' sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <QuantitySelector product={product} />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProductPage;