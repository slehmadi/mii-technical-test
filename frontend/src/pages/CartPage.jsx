import { 
    Typography,
    Card,
    CardContent,
    Button,
    Stack
} from '@mui/material'

import { use, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        clearCart,
        totalPrice
    } = useContext(CartContext);

    return (
        <>
            <Typography variant='h4' gutterBottom> Shopping Cart</Typography>

            {cartItems.length === 0 && (
                <Typography>
                    Cart is empty
                </Typography>
            )}

            <Stack spacing={2}>
                {cartItems.map((item) => (
                    <Card key={item.id}>
                        <CardContent>
                            <Typography variant='h6'>{item.name}</Typography>
                            <Typography>
                                Quantity:
                                {" "}
                                {item.quantity}
                            </Typography>

                            <Typography>
                                Price:
                                {" "}
                                Rp
                                {" "}
                                {item.price.toLocaleString()}
                            </Typography>

                            <Button
                                color='error'
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Stack>

            <Typography variant='h5' sx={{ mt:3 }}>
                Total:
                {" "}
                Rp
                {" "}
                {totalPrice.toLocaleString()}
            </Typography>

            {cartItems.length > 0 && (
                <Button
                    sx={{ mt:2 }}
                    variant='contained'
                    color='error'
                    onClick={clearCart}
                >
                    Clear Cart
                </Button>
            )}
        </>
    );
}

export default CartPage;