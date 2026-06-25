import { 
    Button,
    Stack,
    Typography
} from "@mui/material";

import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function QuantitySelector({ product }) {
    const {
        addToCart,
        decreaseItemQuantity,
        getProductQuantity
    } = useContext(CartContext);

    const quantity = getProductQuantity(product.id)

    if (quantity === 0) {
        return (
            <Button variant="contained" onClick={() => addToCart(product)}>
                Add to Cart
            </Button>
        );
    }

    return (
        <Stack
            direction='row'
            spacing={1}
            alignItems='center'
        >
            <Button variant="outlined" onClick={() => decreaseItemQuantity(product.id)}>
                -
            </Button>

            <Typography>
                Order: {quantity}
            </Typography>

            <Button variant="outlined" onClick={() => addToCart(product)}>
                +
            </Button>
        </Stack>
    );
}

export default QuantitySelector;