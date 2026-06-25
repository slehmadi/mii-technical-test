import { 
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    Divider
} from "@mui/material";

// Dummy data
import orders from "../data/orders.json";

function OrderHistoryPage() {
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
                                {order.date}
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
                                        {item.name}
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