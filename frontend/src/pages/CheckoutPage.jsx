import { 
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    Stack,
    Divider,
    Alert
} from "@mui/material";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../contexts/CartContext";

function CheckoutPage() {
    const navigate = useNavigate();

    const {
        cartItems,
        totalPrice,
        clearCart
    } = useContext(CartContext);

    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        // Replace with Axios later
        console.log({
            customer: formData,
            items: cartItems,
            totalPrice
        });

        clearCart();

        setSuccess(true);

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    if (cartItems.length === 0 && !success) {
        return (
            <Typography variant="h5">
                Cart is empty
            </Typography>
        );
    }

    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Checkout
                    </Typography>
                    {
                        success && (
                            <Alert severity="success">
                                Order created successfully.
                                Redirecting...
                            </Alert>
                        )
                    }
                    <form onSubmit={handleCheckout}>
                        <Stack spacing={2}>
                            <TextField
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                            />

                            <TextField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                            >
                                Place Order
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Order Summary
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {
                        cartItems.map((item) => (
                            <Typography key={item.id}>
                                {item.name}
                                {" "}
                                x
                                {" "}
                                {item.quantity}

                                <br />

                                Rp
                                {" "}
                                {
                                    (item.price * item.quantity).toLocaleString()
                                }
                            </Typography>
                        ))
                    }

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6">
                        Total:
                        {" "}
                        Rp
                        {" "}
                        {totalPrice.toLocaleString()}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default CheckoutPage;