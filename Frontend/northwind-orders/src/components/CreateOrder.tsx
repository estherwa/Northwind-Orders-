// components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService.ts';
import { getCustomers } from '../services/customerService.ts'; 
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
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
    const columns: GridColDef[] = [
        { field: 'orderID', headerName: 'Order ID', width: 250, sortable: true },
        { field: 'employeeName', headerName: 'Employee Name', width: 300, sortable: true },
        { field: 'companyName', headerName: 'Customer Name', width: 300, sortable: true },
        { field: 'shipName', headerName: 'Ship Name', width: 250, sortable: true },
        { field: 'orderDate', headerName: 'Order Date', width: 250, sortable: true },
        { field: 'totalPrice', headerName: 'Total Price', width: 250, sortable: true }
    ];

    
    const rows = orders.map(order => {
        const customer = customers.find(c => c.customerID === order.customerID);
        return {
            id: order.orderID, // DataGrid requires 'id' field for unique row identification
            orderID: order.orderID,
            employeeName: order.employeeName,
            companyName: customer ? customer.companyName : 'N/A',
            shipName: order.shipName,
            orderDate: order.orderDate,
            totalPrice: order.totalPrice
        };
    });

    return (
        <div style={{ height: 450, width: '100%' }}>
            <h1>Order List</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.orderID} // Specify the unique row ID
                sortingOrder={['asc', 'desc']} // Default sorting order
            />
        </div>
    );
};

export default OrderList;
