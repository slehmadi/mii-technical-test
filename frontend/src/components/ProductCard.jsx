import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material';

import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);

    return(
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
                <QuantitySelector product={product} />
            </CardActions>
        </Card>
    )

}

export default ProductCard;