import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Card, CardContent, CircularProgress } from '@mui/material';
import './ViewOrderDetails.css';

const ViewOrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const orderState = location.state?.order;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:5131/api/orders/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                const orderData = await response.json();
                setOrder(orderData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!order) {
        return <div>Order not found!</div>;
    }

    return (
        <Container className="container" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Order Details
            </Typography>
            <Card variant="outlined" className="card">
                <CardContent>
                    <Typography variant="h6" className="typography">Company Details</Typography>
                    <Typography>Company Name: {orderState?.companyName}</Typography>
                    <Typography>Customer ID: {order.customerID}</Typography>
                    <Typography>Customer Name: {order.shipName}</Typography>

                    <Typography variant="h6" className="typography">Employee Details</Typography>
                    <Typography>Employee ID: {order.employeeID}</Typography>
                    <Typography>Employee Name: {orderState?.employeeName || 'N/A'}</Typography>

                    <Typography variant="h6" className="typography">Order Date</Typography>
                    <Typography>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(order.orderDate))}</Typography>

                    <Typography variant="h6" className="typography">Shipping Details</Typography>
                    <Typography>Address: {order.shipAddress}</Typography>
                    <Typography>City: {order.shipCity}</Typography>
                    <Typography>Country: {order.shipCountry}</Typography>
                    <Typography>Postal Code: {order.shipPostalCode}</Typography>
                    <Typography>Shipping Method: {order.shipVia}</Typography>
                    <Typography>Freight: {order.freight.toFixed(2)} $</Typography>

                    <Typography  >Total Price: {orderState.totalPrice}</Typography>

                   
                    <Button variant="contained" color="primary" onClick={() => navigate(-1)} style={{ margin: '2rem auto', display: 'block' }}>
                        Go Back
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ViewOrderDetails;
