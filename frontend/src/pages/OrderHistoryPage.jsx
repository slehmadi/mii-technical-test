import { 
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    Divider
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import orderService from '../services/orderService';

function OrderHistoryPage() {
    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const data = await orderService.getOrders(user.id);

                setOrders(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>
    }

    return(
        <>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>

            <Stack spacing={3}>
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardContent>
                            <Typography variant="h6">
                                Order #
                                {order.id}
                            </Typography>

                            <Typography>
                                Date:
                                {" "}
                                {order.created_at}
                            </Typography>

                            <Chip
                                label={order.status}
                                sx={{ mt: 1, mb: 2 }}
                            />

                            <Divider sx={{ mb: 2 }} />

                            <Typography variant="subtitle1">
                                Items
                            </Typography>

                            {
                                order.items.map((item, index) => (
                                    <Typography key={index}>
                                        •
                                        {" "}
                                        {item.product_name}
                                        {" "}
                                        x
                                        {" "}
                                        {item.quantity}
                                    </Typography>
                                ))
                            }

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6">
                                Total:
                                {" "}
                                Rp
                                {" "}
                                {order.total_price.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </>
    );
}

export default OrderHistoryPage;