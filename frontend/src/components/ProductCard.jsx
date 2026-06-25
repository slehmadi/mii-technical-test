import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material';

import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    <Card>
        <CardMedia 
            component='img' 
            height="220" 
            image={
                product.image_url || "https://placehold.co/300x220"
            } 
        />
        <CardContent>
            <Typography variant='h6'>
                {product.name}
            </Typography>
            <Typography variant='body2'>
                {product.description}
            </Typography>
            <Typography variant='h6' sx={{ mt: 2 }}>
                Rp {product.price.toLocaleString()}
            </Typography>
        </CardContent>
        <CardActions>
            <Button component={Link} to={`/products/${product.id}`} >
                Detail
            </Button>
            <Button variant='contained'>
                Add to Cart
            </Button>
        </CardActions>
    </Card>
}