// components/OrderList.tsx
import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/orderService.ts';
import { getCustomers } from '../services/customerService.ts'; 
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import './OrderList.css';
import { getEmployees } from '../services/employeeService.ts';
import { Employee } from '../models/Employee.ts';
import { OrderDetail } from '../models/OrderDetail.ts';
import { getOrderDetails } from '../services/orderDetailService.ts';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const paginationModel = { page: 0, pageSize: 5 };
    useEffect(() => {
        const fetchOrdersAndCustomers = async () => {
            try {
                const ordersData = await getOrders();
                const customersData = await getCustomers();
                const employeesData = await getEmployees();
                const orderDetailsData = await getOrderDetails();
                setOrders(ordersData);
                setCustomers(customersData);
                setEmployees(employeesData);
                setOrderDetails(orderDetailsData);
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
        { field: 'orderID', headerName: 'Order ID', width: 130, sortable: true },
        { field: 'employeeName', headerName: 'Employee Name', width: 200, sortable: true },
        { field: 'companyName', headerName: 'Customer Name', width: 200, sortable: true },
        { field: 'shipName', headerName: 'Ship Name', width: 200, sortable: true },
        { field: 'orderDate', headerName: 'Order Date', width: 180, sortable: true },
        { field: 'totalPrice', headerName: 'Total Price', width: 150, sortable: true }
    ];

    const rows = orders.map(order => {
        const customer = customers.find(c => c.customerID === order.customerID);
        const orderDetail = orderDetails.find(od => od.orderID === order.orderID);
        const employee = employees.find(e => e.employeeID === order.employeeID); 
   
        return {
            id: order.orderID, 
            orderID: order.orderID,
            employeeName: employee ? employee.firstName : 'N/A',
            companyName: customer ? customer.companyName : 'N/A',
            shipName: order.shipName,
            orderDate: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(order.orderDate)),

            totalPrice: orderDetail ? (orderDetail.unitPrice * orderDetail.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "$" : "0"
        };
    });

    return (
        <div style={{ height: 450, width: '100%', paddingRight: '100px' }}>
            <h1>Order List</h1>
            <DataGrid
                style={{marginRight: '100px', marginLeft: '100px'}}
                rows={rows}
                columns={columns}
                getRowId={(row) => row.orderID} // Specify the unique row ID
                pageSizeOptions={[5]}
                initialState={{ pagination: { paginationModel } }}
                sortingOrder={['asc', 'desc']} // Default sorting order
            />
        </div>
    );
};

export default OrderList;
