// components/CreateOrder.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5131/api/orders'; // Update with your API URL

const CreateOrder: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [shippers, setShippers] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [order, setOrder] = useState({
        customerID: '',
        employeeID: '',
        orderDate: '',
        requiredDate: '',
        shipperID: '',
        details: [{ productID: '', quantity: 1 }]
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace these with actual API calls
                const [customersData, employeesData, shippersData, productsData] = await Promise.all([
                    axios.get('http://localhost:5131/api/customers'),
                    axios.get('http://localhost:5131/api/employees'),
                    axios.get('http://localhost:5131/api/shippers'),
                    axios.get('http://localhost:5131/api/products'),
                ]);
                setCustomers(customersData.data);
                setEmployees(employeesData.data);
                setShippers(shippersData.data);
                setProducts(productsData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDetailChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newDetails = [...order.details];
        newDetails[index] = { ...newDetails[index], [name]: value };
        setOrder(prev => ({ ...prev, details: newDetails }));
    };

    const addDetail = () => {
        setOrder(prev => ({
            ...prev,
            details: [...prev.details, { productID: '', quantity: 1 }]
        }));
    };

    const removeDetail = (index: number) => {
        setOrder(prev => ({
            ...prev,
            details: prev.details.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, order);
            setMessage('Order created successfully!');
            setOrder({
                customerID: '',
                employeeID: '',
                orderDate: '',
                requiredDate: '',
                shipperID: '',
                details: [{ productID: '', quantity: 1 }]
            });
        } catch (error) {
            console.error('Error creating order:', error);
            setMessage('Error creating order.');
        }
    };

    return (
        <div>
            <h1>Create New Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer:</label>
                    <select name="customerID" value={order.customerID} onChange={handleChange}>
                        <option value="">Select Customer</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Employee:</label>
                    <select name="employeeID" value={order.employeeID} onChange={handleChange}>
                        <option value="">Select Employee</option>
                        {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
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
                    <select name="shipperID" value={order.shipperID} onChange={handleChange}>
                        <option value="">Select Shipper</option>
                        {shippers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <h2>Order Details</h2>
                    {order.details.map((detail, index) => (
                        <div key={index}>
                            <label>Product:</label>
                            <select name="productID" value={detail.productID} onChange={(e) => handleDetailChange(index, e)}>
                                <option value="">Select Product</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            <label>Quantity:</label>
                            <input type="number" name="quantity" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} />
                            <button type="button" onClick={() => removeDetail(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addDetail}>Add Detail</button>
                </div>
                <button type="submit">Create Order</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default CreateOrder;
