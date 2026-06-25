import { Grid, Typography } from '@mui/material';

import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

function HomePage() {
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