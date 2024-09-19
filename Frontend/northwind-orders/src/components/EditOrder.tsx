// components/EditOrder.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders'; // Update with your API URL

const EditOrder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<any>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };
        fetchOrder();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/${id}`, order);
            setMessage('Order updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating order:', error);
            setMessage('Error updating order.');
        }
    };

    if (!order) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer:</label>
                    <input type="text" name="customerID" value={order.customerID} onChange={handleChange} />
                </div>
                <div>
                    <label>Employee:</label>
                    <input type="text" name="employeeID" value={order.employeeID} onChange={handleChange} />
                </div>
                <div>
                    <label>Order Date:</label>
                    <input type="date" name="orderDate" value={order.orderDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Required Date:</label>
                    <input type="date" name="requiredDate" value={order.requiredDate} onChange={handleChange} />
                </div>
                <div>
                    <label>Shipper:</label>
                    <input type="text" name="shipperID" value={order.shipperID} onChange={handleChange} />
                </div>
                <button type="submit">Update Order</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default EditOrder;
