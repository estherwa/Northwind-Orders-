// components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService.ts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './OrderList.css'; // Import custom CSS

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="loading"><CircularProgress /></div>;

    return (
        <div>
            <h1>Order List</h1>
            <TableContainer component={Paper} className="order-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Ship Name</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderID}>
                                <TableCell>{order.employeeName}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.shipName}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderList;
