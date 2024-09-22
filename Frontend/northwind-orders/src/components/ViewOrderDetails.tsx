// components/ViewOrderDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5131/api/orders'; // Update with your API URL

const ViewOrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<any>(null);
    const [message, setMessage] = useState('');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).replace(/(\d+)(?=\w+)/, '$1th');
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setMessage('Error fetching order details.');
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (!order) return <div>Loading...</div>;

    return (
        <div>
            <h1>Order Details</h1>
            {message && <p>{message}</p>}
            <div>
                <h2>Order Information</h2>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Employee:</strong> {order.employeeName}</p>
                <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                <p><strong>Required Date:</strong> {formatDate(order.requiredDate)}</p>
                <p><strong>Shipper:</strong> {order.shipperName}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice}</p>
            </div>
            <div>
                <h2>Order Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.details.map((detail: any, index: number) => (
                            <tr key={index}>
                                <td>{detail.productName}</td>
                                <td>{detail.quantity}</td>
                                <td>${detail.unitPrice.toFixed(2)}</td>
                                <td>${(detail.quantity * detail.unitPrice).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrderDetails;
