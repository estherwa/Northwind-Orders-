// components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService.ts';
import { getCustomers } from '../services/customerService.ts'; // Import the getCustomers function
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './OrderList.css';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrdersAndCustomers = async () => {
            try {
                const ordersData = await getOrders();
                const customersData = await getCustomers();
                setOrders(ordersData);
                setCustomers(customersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndCustomers();
    }, []);

    if (loading) return <div className="loading"><CircularProgress /></div>;

    return (
        <div>
            <h1>Order List</h1>
            <TableContainer component={Paper} className="order-table">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Ship Name</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            const customer = customers.find(c => c.customerID === order.customerID);
                            return (
                                <TableRow key={order.orderID}>
                                    <TableCell>{order.orderID}</TableCell>
                                    <TableCell>{order.employeeName}</TableCell>
                                    <TableCell>{customer ? customer.companyName : 'N/A'}</TableCell>
                                    <TableCell>{order.shipName}</TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>{order.totalPrice}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderList;
